# Chapter 6: Call Contract

In the previous chapter, we deployed the contract to the chain through transactions. After deployment, we get a **UTXO** that contains the contract. We save this **UTXO**. Calling the contract requires this **UTXO**.

```javascript
  web3
  .deploy(contract, game.amount)
  .then(([tx, txid]) => {
    game.lastUtxo = {
      txHash: txid,
      outputIndex: 0,
      satoshis: tx.outputs[0].satoshis,
      script: tx.outputs[0].script,
    };

    game.tx = tx;
    game.deploy = txid;
    server.saveGame(game, "deployed");
    updateStart(true);
  })
  .catch((e) => {
    if (e.message === "no utxos") {
      alert("no available utxos, please fund your wallet");
    }
    console.error("deploy error", e);
  });
```

## Build Transaction

Just like deploying a contract, we call the public function `move` of the contract by sending a transaction.

First, we use the **UTXO** obtained from the deployment contract as the transaction input. Since our `TicTacToe` contract uses the `OP_PUSH_TX` technology, the output of the transaction must comply with the rules of the contract. What should be used as the output of the transaction?

A simple method is that we use the same rules as the contract to perform calculations under the chain based on the latest state of the contract. Based on the calculation results, we can know what the output of the transaction looks like. For example, the `calculateWinner` function is almost the same as the `won` function of our `TicTacToe` contract.

```javascript
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[b] && squares[c] && squares[a].label === squares[b].label && squares[a].label === squares[c].label) {
      return { winner: squares[a], winnerRow: lines[i] };
    }
  }

  return { winner: null, winnerRow: null };
};

```

Calculate the new state of the contract:

```javascript
let newState = this.calculateNewState(squares);
```

Use the new state of the contract to construct the transaction output:

```javascript
    let outputs = [];
    let amount = this.props.game.lastUtxo.satoshis - FEE;
    if (winner) {
      ...

    } else if (history.length >= 9) {
      ...
    } else {
      //next
      newLockingScript = [this.props.contractInstance.codePart.toHex(), bsv.Script.fromASM(newState).toHex()].join('');
      outputs.push({
        satoshis: amount,
        script: newLockingScript
      })
    }

    let tx = {
      inputs: [{
        utxo: this.props.game.lastUtxo,
        sequence: 0,
        script: ""
      }],
      outputs: outputs
    }

```

Since the public function `move` of the `TicTacToe` contract contains a signature parameter `sig`, it is also necessary to request the wallet to sign for us through the wallet's `getSignature` interface. Then assemble the unlocking script.

```javascript
let preimage = getPreimage(tx);

const addr = DotWalletAddress.get();

let sig = await web3.wallet.getSignature(toRawTx(tx), 0, SignType.ALL, addr);

this.props.contractInstance.setDataPart(oldState);


let unlockScript = this.props.contractInstance.move(i, new Sig(toHex(sig)), amount, preimage).toHex();

tx.inputs[0].script = unlockScript;

```
 
## Broadcast Transaction

The next step is to broadcast the transaction containing the contract with the new state to call the public functioin of the contract. Broadcast transaction is the same as the previous chapter, using the `sendRawTransaction` interface provided by the wallet. After the broadcast, we will get a **UTXO** containing the latest state of the contract, which needs to be saved for the next call to the contract.


```javascript
 web3.sendTx(tx).then(txid => {
      ...
      server.saveGame(Object.assign({}, this.props.game, {
        gameState: gameState,
        lastUtxo: {
          txHash: txid,
          outputIndex: 0,
          satoshis: tx.outputs[0].satoshis,
          script: tx.outputs[0].script
        }
      }), 'next')

      this.setState(gameState);

    }).catch(e => {
      if (e.response) {
        alert('sendTx errror: ' + e.response.data)
      }
      console.error('sendTx errror', e.response)
    })
```


##  Put it to the test

Before sending the transaction calling the contract to the blockchain network, we can usually verify locally whether the transaction we constructed is valid now. This can use the `verify` method provided by `scryptlib`.

