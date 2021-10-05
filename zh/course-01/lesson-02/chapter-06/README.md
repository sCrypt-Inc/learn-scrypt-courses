# 第六章: 调用合约

上一章我们通过交易将合约部署到了链上。部署后我们得到一个包含合约的 **UTXO** ，我们把这个 **UTXO** 保存起来，调用合约需要用到这个 **UTXO**。

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

## 构建交易

和部署合约一样，我们通过发送交易来调用合约的公共函数 `move`。

首先我们把部署合约的得到 **UTXO** 作为交易的输入。由于我们的 `TicTacToe` 合约用到了 `OP_PUSH_TX` 技术，交易的输出必须符合合约的规则。那应该使用什么作为交易的输出呢？

一个简单方法是我们在链下根据合约的最新状态，使用与合约相同的规则进行计算。根据计算结果我们就能知道交易的输出是什么样子。比如 `calculateWinner` 方法，是不是和我们的 `TicTacToe` 合约的 `won` 方法几乎一样呢。

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

计算合约的新状态:

```javascript
let newState = this.calculateNewState(squares);
```

使用合约新状态构建交易输出:

```javascript
let outputs = [];
let amount = this.props.game.lastUtxo.satoshis - FEE;
if (winner) {
  ...

} else if (history.length >= 9) {
  ...
} else {
  //next
  outputs.push({
    satoshis: amount,
    script: this.props.contractInstance.lockingScript.toHex()
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

由于 `TicTacToe` 合约的公共函数 `move` 包含一个签名参数 `sig`，同样需要通过钱包的 `getSignature` 接口来请求钱包帮我们签名。然后再组装解锁脚本。

```javascript
let preimage = getPreimage(tx);

const addr = DotWalletAddress.get();

let sig = await web3.wallet.getSignature(toRawTx(tx), 0, SignType.ALL, addr);

let unlockScript = this.props.contractInstance.move(i, new Sig(toHex(sig)), amount, preimage).toHex();

tx.inputs[0].script = unlockScript;

```
 
## 广播交易

接下来就是广播包含包含新状态的合约的交易来调用合约的公共方法了。广播交易与上一章一样，使用钱包提供的 `sendRawTransaction` 接口。广播后我们会得到一个包含合约最新状态的 **UTXO**，需要保存起来，以供下次调用合约。


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


## 实战演习

在将调用合约的交易发送到区块链网络之前，我们通常可以现在本地验证我们构建的交易是否有效。这个可以使用 `scryptlib` 提供的 `verify` 方法。

