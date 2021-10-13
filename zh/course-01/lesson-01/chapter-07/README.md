# 第七章: bytes 切片


bytes 表示一个可变长度的字节数组，可以对其进行切片操作。

```

bytes b = b'414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00';
bytes leftb = b[0:10]; 
bytes sub = b[10:20];
```

``b[start:end]`` 表示从索引 ``start``（包含）到 ``end``（不包含）的 ``b`` 的子数组。``start`` 如果省略则为 ``0``，``end`` 如果省略则为数组的长度。


```
bytes leftb = b[:10]; 
bytes rightb = b[10:]; 
```

## 实战演习

1. 棋盘是有9个字节的数组，每一个字节代表棋盘上某个位置的状态。参照 `getElemAt`，实现 Util 库的`setElemAt` 函数。