# 第十五章: 更新状态和约束


# 更新状态
我们已经从合约的原始字节中解析出来合约当前的两个状态：`turn` 和 `board`。接下来我们需要更新这两个状态。

```solidity
board = Util.setElemAt(board, n, play);
turn = 1 - turn;
```


通常，更新完状态后，需要根据合约的新状态做一些业务逻辑的处理。在 `TicTacToe` 合约中，我们通过检查新状态，判断是否有人赢得比赛，或者棋盘已经满了, 则 `TicTacToe` 合约运行结束。否则 `TicTacToe` 合约继续运行。通过以下代码，我们将新状态与代码部分拼接起来，得到包含新状态的合约原始字节，并构建一个包含该合约的交易输出。

```solidity
bytes scriptCode_ = scriptCode[ : scriptLen - BOARDLEN - TURNLEN] + num2bin(1 - turn, TURNLEN) + board;
bytes output = Util.buildOutput(scriptCode_, amount);
```
  
# 约束
通过更新状态我们已经生成了带新状态的 `TicTacToe` 合约。接下来我们需要要求当前交易的输出必须包含这个新合约。那么如何确保交易的输出包含此合约呢？

由于从交易原象访问到交易上下文中所有输出脚本的哈希，即 `hashOutputs`，那么，如果该哈希值与我们在合约中构建的所有输出的哈希值一致，那我们就能确信交易的输出与我们在合约中构建的交易输出是一致，自然就包含了此合约。

通过以下代码约束了交易的输出：

```solidity
require(hash256(outputs) == Util.hashOutputs(txPreimage));
```

## 实战演习

1. 更新合约的两个状态
2. 约束交易的输出包含  `TicTacToe` 合约。