# 第九章: 循环 

sCrypt 使用 `loop` 关键字定义循环。语法如下：

```
loop (maxLoopCount) [: i] {
    loopBody
}
```

`maxLoopCount` 必须是编译时已知的常量。`i` 是一个归纳变量[归纳变量](https://scryptdoc.readthedocs.io/zh_CN/latest/loop.html#induction-variable)，表示第几次循环。例如，下面的循环：

```solidity
contract Loop {
    
    static const int N = 10;
    
    public function unlock(int x) {
    
        loop (N) {
            x = x * 2;
        }
        require(x > 100);
    }
}
```

等价于以下展开形式：

```solidity
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
```

## 实战演习

1. 上一章我们把所有可能赢得比赛的连线存储在数组 `lines`，现在我们使用 `loop` 循环来遍历所有连线，
以检查玩家 `play` 是否在棋盘上有连成线的棋子。如果有那么他赢得比赛。

2. 在 `full` 函数中遍历棋盘所有格子，检查每个格子是否为空。

