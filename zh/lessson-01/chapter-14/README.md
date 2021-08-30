# 第十四章: 循环 

maxLoopCount 必须是编译时已知的常量，语法如下：

```
loop (maxLoopCount) {
    loopBody
}
```

或者

```solidity
loop (maxLoopCount) : loopIndex {
    loopBody
}
```

sCrypt通过重复循环体 maxLoopCount 次来实现循环。
例如，下面的循环：

```solidity
loop (10) {
    x = x * 2;
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

1. 检查数组 `matrix` 所有值都为 0
2. 如果 `x>=8`， 则跳出循环