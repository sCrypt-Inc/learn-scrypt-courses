# 第十二章: 合约状态


合约的状态需要使用 `@state` 注解声明。下面是一个简单的[计数器合约](https://github.com/sCrypt-Inc/boilerplate/blob/master/contracts/counter.scrypt)。

```
import "util.scrypt";

contract Counter {
    @state
    int counter;
    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));

        this.counter++;
        bytes outputScript = this.getStateScript();
        bytes output = Util.buildOutput(outputScript, amount);
        // ensure output is expected: amount is same with specified
        // also output script is the same with scriptCode except counter incremented
        require(hash256(output) == Util.hashOutputs(txPreimage));
    }
}
```

我们使用第十章定义的 `State` 结构体，为 `TicTacToe` 合约添加一个状态属性 `state`。

```
@state
State state;
```


## 更新状态

合约执行过程中，需要更新合约的状态。

```
this.state.board = Util.setElemAt(this.state.board, n, play);
this.state.turn = 1 - this.state.turn;
```


通常，更新完状态后，使用 `getStateScript` 来获取包含最新状态的锁定脚本。

```
bytes outputScript  =  this.getStateScript();
bytes output = Util.buildOutput(outputScript, amount);
outputs = output;
```
  
## 约束交易输出
通过更新状态我们已经生成了带新状态的 `TicTacToe` 合约。接下来我们需要要求当前交易的输出必须包含这个新合约。那么如何确保交易的输出包含此合约呢？

Sighash原象中包含当前交易所有输出脚本的哈希，即 `hashOutputs`。如果该哈希值与我们在合约中构建的所有输出的哈希值一致，那我们就能确信交易的输出与我们在合约中构建的交易输出是一致，自然就包含了此合约。

通过以下代码约束了交易的输出：

```
require(hash256(outputs) == Util.hashOutputs(txPreimage));
```


## 实战演习


1. 合约的状态包含棋盘和轮流顺序，请更新 `TicTacToe`  合约的状态
2. 约束交易的输出包含 `TicTacToe` 合约。