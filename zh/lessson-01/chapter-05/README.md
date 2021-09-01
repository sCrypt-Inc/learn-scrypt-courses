# 第五章: 公共函数和非公共函数 

sCrypt 语言的函数使用 `function` 关键字声明。

## 公共函数 （public function）

公共函数使用 `public` 修饰符修饰函数，是外部调用合约的接口。公共函数没有明确的返回类型声明和函数结尾的 `return` 语句，隐形返回 `bool` 类型，返回值为 `true`


```solidity
contract Test {
    public function unlock(int y) {


    }
    ...
}
```

## 非公共函数 （function）

非公共函数可以看做是合约的私有函数，主要目的是封装内部逻辑及代码重用。定义时需要使用冒号 `:` 来说明返回值的类型，如：

```solidity

contract Test {
    function valueOf(int x) : int {
        return x;
    }
    ...
}

```


## 实战演习

`TicTacToe` 合约中有 3 个函数：

`move` 爱丽丝（Alice）和鲍勃（Bob）各自将 X 个比特币锁定在包含上述合同的一个 UTXO 中。 接下来，他们通过调用公共函数 move() 交替玩游戏
`won` 检查是否有玩家已经赢得比赛，他将能取走所有合约锁定的赌注
`full` 如果棋盘，没人赢得比赛，则两个人平分赌注

1. 将 `move` 改为公共函数

2. 为 `won` 和 `full` 是非公共函数，为他们添加返回类型 `bool`