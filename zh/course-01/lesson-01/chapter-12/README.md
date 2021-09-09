# 第十二章: 合约状态

有状态合约的锁定脚本分为数据和代码。数据部分就是状态。代码部分则包含了状态转换规则，也就是合约的业务逻辑。

![](https://img-blog.csdnimg.cn/20200712230128735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

为了管理状态，我们要求合约的代码部分不能变（即合约规则不能变），数据（状态）部分的变化则必须符合代码部分规定的状态转换规则。下面是一个简单的[计数器合约](https://github.com/sCrypt-Inc/boilerplate/blob/master/contracts/counter.scrypt)。它的状态是公共函数``increment()``被调用的次数(初始值为0)，存储在锁定脚本的最后一个字节。

```solidity
import "util.scrypt";

contract Counter {
    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));

        bytes scriptCode = Util.scriptCode(txPreimage);
        int scriptLen = len(scriptCode);

        // state (i.e., counter value) is at the end
        int counter = unpack(scriptCode[scriptLen - Util.DataLen :]);
        // increment counter
        bytes scriptCode_ = scriptCode[: scriptLen - Util.DataLen] + num2bin(counter + 1, Util.DataLen);
        bytes output = Util.buildOutput(scriptCode_, amount);
        // ensure output is expected: amount is same with specified
        // also output script is the same with scriptCode except counter incremented
        require(hash256(output) == Util.hashOutputs(txPreimage));
    }
}
```


## 更新状态
我们已经从合约的锁定脚本中解析出来合约当前的状态：`turn` 和 `board`。接下来我们需要更新这个状态。

```solidity
board = Util.setElemAt(board, n, play);
turn = 1 - turn;
```


通常，更新完状态后，需要根据合约的新状态做一些业务逻辑的处理。在 `TicTacToe` 合约中，我们通过检查新状态，判断是否有人赢得比赛，或者棋盘已经满了, 则 `TicTacToe` 合约运行结束。否则 `TicTacToe` 合约继续运行。通过以下代码，我们将新状态与代码部分拼接起来，得到包含新状态的合约锁定脚本，并构建一个包含该合约的交易输出。

```solidity
bytes scriptCode_ = scriptCode[ : scriptLen - BOARDLEN - TURNLEN] + num2bin(1 - turn, TURNLEN) + board;
bytes output = Util.buildOutput(scriptCode_, amount);
```
  
## 约束交易输出
通过更新状态我们已经生成了带新状态的 `TicTacToe` 合约。接下来我们需要要求当前交易的输出必须包含这个新合约。那么如何确保交易的输出包含此合约呢？

Sighash原象中包含当前交易所有输出脚本的哈希，即 `hashOutputs`。如果该哈希值与我们在合约中构建的所有输出的哈希值一致，那我们就能确信交易的输出与我们在合约中构建的交易输出是一致，自然就包含了此合约。

通过以下代码约束了交易的输出：

```solidity
require(hash256(outputs) == Util.hashOutputs(txPreimage));
```


## 实战演习

我们已经读取了 `TicTacToe` 的锁定脚本，现在我们从锁定脚本的数据部分解析出合约的状态并更新：

1. 状态 `turn`，合约数据部分第一个字节，表示当前轮到谁下棋。状态 `board`，合约数据部分第二个字节开始，共9个字节，表示棋盘状态。
2. 约束交易的输出包含  `TicTacToe` 合约。