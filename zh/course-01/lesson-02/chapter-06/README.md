# 第六章: 调用合约

接下来就是开始下棋了，每下一步棋，就是对合约的一次调用，并触发合约状态的改变。Web 应用程序与合约的交互主要发生在这个阶段。

和部署合约一样，我们通过 [web3](https://github.com/sCrypt-Inc/tic-tac-toe/blob/7ae1eb8cb46bd8315d9c7d858b6a190ba3c4c306/src/web3/web3.ts#L71) 工具类提供的 `web3.call()` 来调用合约。

`web3.call()` 第一个参数是包含合约实例的 **UTXO**，作为构建调用合约的交易的第一个输入。第二个参数是一个回调函数。我们在
回调函数中使用[链式 APIs](https://github.com/sCrypt-Inc/scryptlib/blob/master/docs/chained_api_zh_CN.md) 来构建完整的调用合约的交易。调用合约需要完成以下工作:

1. 从存储中取出包含合约实例的最新的 UTXO。作为交易的输入。
2. 根据游戏的状态和游戏规则来给交易添加输出。添加输出的过程中， 使用 `toContractState()` 函数将游戏状态转换成合约状态。

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
3. 设置合约解锁脚本。

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

4. 与上一章一样，使用钱包提供的 `sendRawTransaction` 接口广播交易。这封装在 `web3.call()` 中。

5. 广播成功后，需要保存调用的交易和包含合约实例的UTXO, 作为下一次调用的输入。 同时还需要更新游戏状态和合约实例的状态。

```js
const utxo = ContractUtxos.add(rawTx); // save latest utxo
GameData.update(gameState); //update game's states
this.attachState(); //update stateful contract's states
```

至此，我们完成了 `TicTacToe`合约与 webapp 的交互，玩家的每个下棋动作，都产生一个区块链上的交易与之对应。

## 实战演习

在将调用合约的交易发送到区块链网络之前，我们通常可以现在本地验证我们构建的交易是否有效。这个可以使用 `scryptlib` 提供的 `verify` 方法。

参考这个 [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/dd86f0270b2ea702d17137692be3bc66b291eeaf)
