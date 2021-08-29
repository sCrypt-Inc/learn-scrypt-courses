# 第九章: library 库


库与合约基本相同，只是它不包含任何公有函数，因此它不能被独立部署和调用。它通常用于对相关常量和静态函数进行分组。


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

## 实战演习

1. 调用 `Util` 库的公共函数 `toLEUnsigned(16, 1)`
