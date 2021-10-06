# 第十二章: 维护游戏状态

合约可以通过将其状态存储在锁定脚本中来实现链式保持状态。 在下面的例子中，合约从 `state0` 转换到 `state1`，然后到再转换到 `state2`。 交易 1（`tx1`）中的输入在 `tx0` 中花费了 UTXO，而 `tx2` 花费了 `tx1`。

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/06.png?raw=true)

您可以通过这些简单的步骤在合同中维护状态。

## 第一步

使用装饰器 `@state` 声明状态属性。 您可以将 *stateful* 属性当作普通属性：读取和更新它。

```
contract TicTacToe {

    @state
    bool is_alice_turn;

    @state
    bytes board;

    ...

    public function move(int n, Sig sig, int amount, SigHashPreimage txPreimage) {

        ...
        //update states to make move
        this.board = Util.setElemAt(this.board, n, play);
        this.is_alice_turn = !this.is_alice_turn;
        ...
    }

    ...
}
```

## 第二步

当您准备好将新状态保存到当前交易的 `output[s]` 输出中的锁定脚本时，只需调用为每个合约自动生成的内置函数 `this.getStateScript()`。

```
bytes outputScript = this.getStateScript();
```

## 第三步
确保当前交易的输出必须包含这个新状态。第三步使用上一章中的 `sighash` 原像，包含交易 `hashOutputs` (第8个字段) 中所有输出的哈希值。 如果这个哈希值与当前交易中所有输出的哈希值相同，我们可以确定当前交易的输出与我们在合约中构建的输出一致。 因此，包括更新的合约状态。

以下代码演示了这种方法：

```
// construct an output from its locking script and satoshi amount
bytes output = Util.buildOutput(outputScript, amount);
// only 1 input here
require(hash256(output) == Util.hashOutputs(txPreimage));
```

## 实战演习

使用 `@state` 装饰器将以下状态添加到 `TicTacToe` 合约中。

1. 添加状态属性`board`，类型是`bytes` 和  状态属性 `is_alice_turn`，类型是 `bool`
2. 更新状态属性