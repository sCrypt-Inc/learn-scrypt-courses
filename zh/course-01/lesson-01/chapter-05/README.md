# 第五章: 函数和 require 语句

## 函数 （function）

函数使用 `function` 关键字声明。函数主要作用是封装合约内部逻辑及代码重用。定义函数时需要使用冒号 `:` 来说明返回值的类型。

```

contract Test {
    function valueOf(int x) : int {
        return x;
    }
    ...
}

```

## 公共函数 （public function）

公共函数使用 `public` 修饰符修饰函数，是外部调用合约的接口。公共函数没有明确的返回类型声明和函数结尾的 `return` 语句，隐形返回 `bool` 类型，返回值为 `true`。

## require 语句

**require 语句** 包含 `require` 关键字和一个布尔表达式：

```javascript
   require(a > 0);
```

该语句会检查布尔表达式是否为真。当不满足某些条件时抛出错误，并停止执行。这与 `solidity` 语言的 `require` 类似。sCrypt 公有函数的最后一个语句必须是 **require 语句** ，合约的每个公有函数至少有一个 **require 语句** 。当且仅当所有**require 语句** 都检查通过，合约才能被成功解锁。

```
contract Test {
    public function unlock(int y) {
        require(y == 42);
    }
    ...
}
```


## 实战演习

`TicTacToe` 合约中有 3 个函数：

`move` 爱丽丝（Alice）和鲍勃（Bob）各自将 X 个比特币锁定在包含上述合同的一个 UTXO 中。 接下来，他们通过调用公共函数 move() 交替玩游戏
`won` 检查是否有玩家已经赢得比赛，他将能取走所有合约锁定的赌注
`full` 检查棋盘所有格子是否都有棋子了，如果没人赢得比赛，则两个人平分赌注

1. 为 `won` 和 `full` 函数添加返回类型 `bool`; 将 `move` 改为公共函数

2. 为公共函数 `move` 添加 **require 语句**，要求函数参数 `n` 必须大于等于 `0`， 且小于合约的 `static` 属性 `BOARDLEN`

