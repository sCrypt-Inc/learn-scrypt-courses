# Chapter 3: Integrating the sCrypt contract


## Load contract artifact file

When we ran `npm run setup` a file named `zkBattleship.json` was generated and copied to `src/contracts/`. This file is called the contract artifact and it contains a complete description of our compiled battleship contract.

We can simply import it in our React app:
```ts
import artifact from './contracts/zkBattleship.json'
```

## Instantiate and deploy the contract

We instantiate and deploy the contract every time the game starts in the `startTurn` callback function.

Because we already have our contracts artifact, we don't have to compile the contract again. We just simply load the artifact via the contract classes `loadArtifact()` method and instantiate the contract:

```ts
BattleShip.loadArtifact(artifact)

// ...

const instance = new BattleShip(
  PubKey(pubKeyPlayer),
  PubKey(pubKeyComputer),
  BigInt(playerHash),
  BigInt(computerHash),
  falseArr, falseArr,
  vk);
```


Before deploying the contract instance, we need to connect it to a [signer](https://scrypt.io/scrypt-ts/how-to-add-a-signer/). In our app we use the `SensiletSigner`, which is already built into `scrypt-ts` itself.

```ts
const provider = new WhatsonchainProvider(bsv.Networks.testnet)
const signer = new SensiletSigner(provider)

await signer.getConnectedTarget() as any

// ...

instance.connect(signer)
```

After we connected the signer to our contracts instance, we can deploy the contract:
```ts
const rawTx = await instance.deploy(amountSats);
```

After a successful deployment, we save the UTXO of the deployed contract to local storage so that the transaction can be constructed when the contract is invoked:
```ts
ContractUtxos.add(rawTx, 0, -1);

const txid = ContractUtxos.getdeploy().utxo.txId
setDeployTxid(txid)
```


## Invoke Battleship contract using a zkSNARK proof

As described in the previous chapter, whenever a player fires, we generate a zkSNARK proof, which proves whether the coordinate that was fired at was a hit or not.

First, we add different outputs to the transaction depending on the game state. If a player has already hit `17` times, the game is over. The contract sends the total balance to the winner by  adding an output containing the winner's address to the transaction. Then the contract terminates. Otherwise, we continue the contracts execution by just adding an output with our contracts code that contains updated state properties.


```js
if (nextInstance.successfulPlayerHits == 17n) {

  unsignedTx.addOutput(new bsv.Transaction.Output({
    script: bsv.Script.buildPublicKeyHashOut(pubKeyPlayer),
    satoshis: initBalance
  }))
    .change(changeAddress)

  return Promise.resolve({
    unsignedTx,
    atInputIndex: 0,
    nexts: [

    ]
  }) as Promise<BuildMethodCallTxResult<BattleShip>>

} else if (newStates.successfulComputerHits == 17n) {

  unsignedTx.addOutput(new bsv.Transaction.Output({
    script: bsv.Script.buildPublicKeyHashOut(pubKeyComputer),
    satoshis: initBalance
  }))
    .change(changeAddress)

  return Promise.resolve({
    unsignedTx,
    atInputIndex: 0,
    nexts: [

    ]
  }) as Promise<BuildMethodCallTxResult<BattleShip>>

} else {
  unsignedTx.addOutput(new bsv.Transaction.Output({
    script: nextInstance.lockingScript,
    satoshis: initBalance,
  }))
    .change(changeAddress)

  return Promise.resolve({
    unsignedTx,
    atInputIndex: 0,
    nexts: [
      {
        instance: nextInstance,
        atOutputIndex: 0,
        balance: initBalance
      }
    ]
  }) as Promise<BuildMethodCallTxResult<BattleShip>>
}
```

Next, we call the contract's `move` public function. The arguements of the `move` function include the player's signature, and the position of the firing, the result of the hit reported by the opponent, and the zkSNARK proof provided by the opponent.

```ts
const { tx: callTx } = await currentInstance.methods.move(
  (sigResponses: SignatureResponse[]) => {
    return findSig(sigResponses, pubKey)
  },
  position.x, position.y, hit, proof, initBalance,
  {
    pubKeyOrAddrToSign: pubKey,
  } as MethodCallOptions<BattleShip>
)
```

Note that the generated zkSNARK proof needs to be converted into the `Proof` type defined in our verifier contracts code.

```js
import { Proof } from './contracts/verifier'

// ...

const proof: Proof = {
  a: {
    x: BigInt(proof.proof.a[0]),
    y: BigInt(proof.proof.a[1]),
  },
  b: {
    x: {
      x: BigInt(proof.proof.b[0][0]),
      y: BigInt(proof.proof.b[0][1]),
    },
    y: {
      x: BigInt(proof.proof.b[1][0]),
      y: BigInt(proof.proof.b[1][1]),
    }
  },
  c: {
    x: BigInt(proof.proof.c[0]),
    y: BigInt(proof.proof.c[1]),
  },
}
```

## Put it to the test

1. Finish loading the contract artifact file in `WelcomeScreen.ts`.
2. Finish deploying the contract in `startTurn` function.
3. Call the deployed contracts `move` method.

