# Chapter 6: Calling the contract

The next step is to start playing chess. Each chess move is a call to the contract and triggers a change in the contract state. The interaction of the web application with the contract mainly occurs in this phase.

As with the deployment contract, we use the `web3.call()` function, which provided by the [web3 tool class](https://github.com/sCrypt-Inc/tic-tac-toe/blob/7ae1eb8cb46bd8315d9c7d858b6a190ba3c4c306/src/web3/web3.ts#L71), to call the contract.

`web3.call()` The first argument is a **UTXO** containing the contract instance as the first input to construct the transaction that calls the contract. The second parameter is a callback function.

 we use [Chained APIs](https://github.com/sCrypt-Inc/scryptlib/blob/master/docs/chained_api_zh_CN.md) in the callback function of constructing a complete transaction that calls the contract. Calling a contract requires the following work:


1. Get the latest UTXO containing the contract instance from storage. as an input to the transaction.
2. Add outputs to transactions based on the state of the game and the rules of the game. During the process of adding outputs, use the `toContractState()` function to convert the game state to the contract state.

```js

let winner = calculateWinner(squares).winner;

if (winner) { // Current Player won
  let address = PlayerAddress.get(CurrentPlayer.get());

  tx.setOutput(0, (tx) => {
    return new bsv.Transaction.Output({
      script: bsv.Script.buildPublicKeyHashOut(address),
      satoshis: contractUtxo.satoshis - tx.getEstimateFee(),
    })
  })

} else if (history.length >= 9) { //board is full

  tx.setOutput(0, (tx) => {
    return new bsv.Transaction.Output({
      script: bsv.Script.buildPublicKeyHashOut(PlayerAddress.get(Player.Alice)),
      satoshis: (contractUtxo.satoshis - tx.getEstimateFee()) /2,
    })
  })
  .setOutput(1, (tx) => {
    return new bsv.Transaction.Output({
      script: bsv.Script.buildPublicKeyHashOut(PlayerAddress.get(Player.Bob)),
      satoshis: (contractUtxo.satoshis - tx.getEstimateFee()) /2,
    })
  })

} else { //continue move

  const newStates = toContractState(gameState);
  const newLockingScript = this.props.contractInstance.getNewStateScript(newStates);
  tx.setOutput(0, (tx) => {
    const amount = contractUtxo.satoshis - tx.getEstimateFee();
    return new bsv.Transaction.Output({
      script: newLockingScript,
      satoshis: amount,
    })
  })
}
```

3. Set the contract unlocking script.

```js
tx.setInputScript(0, (tx, output) => {

  const preimage = getPreimage(tx, output.script, output.satoshis)
  const privateKey = new bsv.PrivateKey.fromWIF(PlayerPrivkey.get(CurrentPlayer.get()));
  const sig = signTx(tx, privateKey, output.script, output.satoshis)
  const amount = contractUtxo.satoshis - tx.getEstimateFee();

  return this.props.contractInstance.move(i, sig, amount, preimage).toScript();
})
.seal()
```

4. As in the previous chapter, broadcast the transaction using the `sendRawTransaction` interface provided by the wallet. This is wrapped in `web3.call()`.

5. After the broadcast is successful, you need to save the called transaction and the UTXO containing the contract instance as the input for the next call. It also needs to update the game state and the state of the contract instance.

```js
const utxo = ContractUtxos.add(rawTx); // save latest utxo
GameData.update(gameState); //update game's states
this.attachState(); //update stateful contract's states
```

So far, we have completed the interaction between the `TicTacToe` contract and the webapp. Each chess action of the player generates a corresponding transaction on the blockchain.

## Put it to the test

Before sending the transaction calling the contract to the blockchain network, we can usually now locally verify that the transaction we constructed is valid. This can be done using the `verify` method provided by `scryptlib`.

Refer to this [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/dd86f0270b2ea702d17137692be3bc66b291eeaf)