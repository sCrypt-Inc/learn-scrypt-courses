# 第六章: require 语句

**require 语句** 包含 `require` 关键字和一个布尔表达式：

```javascript
   require(a > 0);
```

该语句会检查布尔表达式是否为真。当不满足某些条件时抛出错误，并停止执行。这与 `solidity` 语言的 `require` 类似。sCrypt 公有函数的最后一个语句必须是 **require 语句** ，合约的每个公有函数至少有一个 **require 语句** 。当且仅当所有**require 语句** 都检查通过，合约才能被成功解锁。

## 实战演习
`move` 函数的参数 `n` 代表在棋盘上落子的位置。

为公共函数 `move` 添加 **require 语句**，要求函数参数 `n` 必须大于等于 `0`， 且小于合约的 `static` 属性 `BOARDLEN`