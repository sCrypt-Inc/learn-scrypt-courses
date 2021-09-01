# 第七章: library 库


库与合约基本相同，只是它不包含任何公有函数，因此它不能被独立部署和调用。它通常用于对相关常量和 `static` 函数进行分组。


```solidity
library Util {
    static const int DataLen = 1;
    static const int StateLen = 3;

    static function toLEUnsigned(int n, int l): bytes {
        bytes m = num2bin(n, l + 1);
        return m[0 : len(m) - 1];
    }
}

```

库可以和合约定义在同一个文件。

## 实战演习

建立一个 `Util` 库，包含两个操作棋盘的函数

1. 根据索引访问棋盘状态，函数名 `getElemAt`，有两个参数： `bytes board` 和 `int index`，返回类型 `bytes`;
1. 根据索引修改棋盘状态，函数名 `setElemAt`，有三个参数： `bytes board` ， `int index`， 和 `bytes value`，返回类型 `bytes`;
