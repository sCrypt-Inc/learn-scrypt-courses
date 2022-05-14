# 第八章: 维护游戏状态

合约可以通过将其状态存储在锁定脚本中来实现链式保持状态。 在下面的例子中，合约从 `state0` 转换到 `state1`，然后到再转换到 `state2`。 交易 1（`tx1`）中的输入在 `tx0` 中花费了 UTXO，而 `tx2` 花费了 `tx1`。

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/06.png?raw=true)

下面以一个简单的[计数器合约](https://github.com/sCrypt-Inc/boilerplate/blob/7cc4ebed75412ff171d14b2cf3ec31abddb6fa00/contracts/counter.scrypt)，展示如何通过简单的步骤在合约中维护状态。

## 第一步

使用[装饰器 `@state`](https://scryptdoc.readthedocs.io/zh_CN/latest/state.html) 声明状态属性。 您可以将**状态属性**当作普通属性：读取和更新它。

```
contract Counter {

    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));
        // update counter state
        this.counter++;
    }
}
```

## 第二步

当您准备好将新状态保存到当前交易的 `output[s]` 输出中的锁定脚本时，只需调用为每个合约自动生成的内置函数 `this.getStateScript()`。

```
contract Counter {

    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));
        // update counter state
        this.counter++;
        // serialize the state of the contract
        bytes outputScript = this.getStateScript();
    }
}
```

## 第三步
确保当前交易的输出必须包含这个新状态。第三步使用上一章中的 `sighash` 原像，包含交易 `hashOutputs` (第8个字段) 中所有输出的哈希值。 如果这个哈希值与当前交易中所有输出的哈希值相同，我们可以确定当前交易的输出与我们在合约中构建的输出一致。 因此，包括更新的合约状态。


```js
contract Counter {

    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));
        // increment counter
        this.counter++;
        // serialize the state of the contract
        bytes outputScript = this.getStateScript();
        // construct an output from its locking script and satoshi amount
        bytes output = Utils.buildOutput(outputScript, amount);
        // make sure the transaction contains the expected outputs
        require(hash256(output) == SigHash.hashOutputs(txPreimage));
    }
}
```

## 实战演习

1. 更新 `TicTacToe` 合约的状态属性 `board` 和 `isAliceTurn` 以确保玩家移动了棋子