# Chapter 3: Integrating sCrypt contract with scryptlib

[scryptlib](https://github.com/sCrypt-Inc/scryptlib) is sCrypt's official Javascript SDK for integrating smart contracts in your application. You can compile, test, deploy and call contracts through this SDK.

We provide you [web3](https://github.com/sCrypt-Inc/zk-battleship/blob/master/src/web3/web3.ts) tooling class. This class provides tooling functions for the interaction between the contract and the network, and the implementation of the wallet interface. 

## Load contract description file

We use [the sCrypt IDE](https://scrypt-ide.readthedocs.io/en/latest/compiling.html#id3) to compile the `BattleShip` contract we just wrote, which yields a corresponding contract description file `battleship_release_desc.json`.

We use `web3.loadContractDesc()` to load the construct description file from assets in `WelcomeScreen.js`: 

```js
    async function fetchContract() {
      let desc = await web3.loadContractDesc(
        "/battleship_release_desc.json"
      );
      return desc;
    }

    fetchContract().then(desc => {
      setDesc(desc)
      setLoading(false)
    })
    .catch(e => {
      console.error('load desc error:', e)
    })
```


## Instantiate and deploy the contract

We instantiate and deploy the contract every time the game starts in the `startTurn` callback function.

With the contract description file, we can build the Battleship contract class by `buildContractClass` function. After that, we initialize the Battleship contract with players’ public keys and location hash commitments: 

```js
const BattleShip = buildContractClass(desc);

// `shipHash` is the function we added to calculate the hash commitment of the ship's position.
const playerHash = await shipHash(placedShips);
const computerHash = await shipHash(computerShips_);

const contract = new BattleShip(new PubKey(PlayerPublicKey.get(Player.You)),
      new PubKey(PlayerPublicKey.get(Player.Computer)),
      new Int(playerHash), new Int(computerHash), 0, 0, true);

// save the contract instance in React state
setBattleShipContract(contract);
```


Before deploying the contract instance, we should [integrate Wallet](https://learn.scrypt.io/en/courses/614c387bc0974f55df5af1e5/lessons/2/chapters/4). After that, we call `web3.deploy()` to deploy the contract with some initial funding:

```js
const rawTx = await web3.deploy(contract, 2000000);
ContractUtxos.add(rawTx, 0, -1);
const txid = ContractUtxos.getdeploy().utxo.txId
setDeployTxid(txid)
```

Note: after a successful deployment, we save the UTXO of the deployed contract to local storage so that the transaction can be constructed when the contract is invoked.

## Invoke Battleship contract using a zkSNARK proof

As described in the previous chapter, whenever a player fires, we generate a zkSNARK proof in `zkp.worker.js`, which proves `hit` parameter we passed in when calling the contract is correct.

We get the computed proof in the message response function called `zkpWorkerMsgHandler` of `zkp.worker.js` and use it to construct the transaction to invoke the Battleship contract.

We use the `web3.call()` function, provided by the `web3` tooling class, to call the contract and use the previously saved utxo to build the transaction.


First, we add different outputs to the transaction depending on the game state. If a player has already hit `17` times, the game is over. The contract sends the total balance to the winner by  adding an output containing the winner's address to the transaction. Then the contract terminates. Otherwise, we call the `getNewStateScript` function to get a locking script containing the latest contract state, and add an output containing this locking script to the transaction. The contract continues to run.


```js
if (newStates.successfulYourHits === 17) {

    tx.setOutput(0, (tx) => {
        const amount = contractUtxo.satoshis - tx.getEstimateFee();
        return new bsv.Transaction.Output({
        script: bsv.Script.buildPublicKeyHashOut(PlayerPrivkey.get(Player.Computer)),
        satoshis: amount,
        })
    })

} else if (newStates.successfulComputerHits === 17) {
    tx.setOutput(0, (tx) => {
        const amount = contractUtxo.satoshis - tx.getEstimateFee();

        return new bsv.Transaction.Output({
            script: bsv.Script.buildPublicKeyHashOut(PlayerPrivkey.get(Player.You)),
            satoshis: amount,
        })
    })

} else {
    tx.setOutput(0, (tx) => {
        const amount = contractUtxo.satoshis - tx.getEstimateFee();
        const newLockingScript = battleShipContract.getNewStateScript(newStates);

        return new bsv.Transaction.Output({
            script: newLockingScript,
            satoshis: amount,
        })
    })
}
```


Next, we call the contract's `move` public function. The arguements of the `move` function include the player's signature, and the position of the firing, the result of the hit or not reported by the opponent, and the zkSNARK proof provided by the opponent. At the same time, the new balance of the contract needs to be calculated.

```js
tx.setInputScript(0, (tx, output) => {
    const preimage = getPreimage(tx, output.script, output.satoshis)
    const currentTurn = !newStates.yourTurn;
    const privateKey = new bsv.PrivateKey.fromWIF(currentTurn ? PlayerPrivkey.get(Player.You) : PlayerPrivkey.get(Player.Computer));
    const sig = signTx(tx, privateKey, output.script, output.satoshis)
    const position = indexToCoords(index);

    let amount = contractUtxo.satoshis - tx.getEstimateFee();

    return battleShipContract.move(sig, position.x, position.y, hit, proof, amount, preimage).toScript();
})
```

After that, we call the `seal()` function in [Chained APIs](https://github.com/sCrypt-Inc/scryptlib/blob/master/docs/chained_api_en.md) to seal the transaction. 

Now that we have constructed the transaction in the callback function of `web3.call()`, it will broadcast the transaction and thus call the contract. We encapsulate the process of building the transaction in the `move()` function and call it in the `zkpWorkerMsgHandler` message handler.

Note that the generated zkSNARK proof needs to be converted into an sCrypt struct.

```js
const isPlayerFired = ctx.role === 'player';
const contractUtxo = ContractUtxos.getlast().utxo;
const Proof = battleShipContract.getTypeClassByType("Proof");
const G1Point = battleShipContract.getTypeClassByType("G1Point");
const G2Point = battleShipContract.getTypeClassByType("G2Point");
const FQ2 = battleShipContract.getTypeClassByType("FQ2");
contractUtxo.script = battleShipContract.lockingScript.toHex();
await move(isPlayerFired, ctx.targetIdx, contractUtxo, ctx.isHit, new Proof({
        a: new G1Point({
          x: new Int(proof.proof.a[0]),
          y: new Int(proof.proof.a[1]),
        }),
        b: new G2Point({
          x: new FQ2({
            x: new Int(proof.proof.b[0][0]),
            y: new Int(proof.proof.b[0][1]),
          }),
          y: new FQ2({
            x: new Int(proof.proof.b[1][0]),
            y: new Int(proof.proof.b[1][1]),
          })
        }),
        c: new G1Point({
          x: new Int(proof.proof.c[0]),
          y: new Int(proof.proof.c[1]),
        })
      }), ctx.newStates);
```

Now, we have implemented the deployment and called the contract, using `scryptlib`.



## Put it to the test

1. Finish loading the contract description file in `WelcomeScreen.js`.
2. Finish deploying the contract in `startTurn` function.
3. Implement the `move` function that calls the contract

