# 第七章: bytes 切片


bytes 表示一个可变长度的字节数组，可以对其进行切片操作。如：

```

bytes b = b'414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00';
bytes leftb = b[0:10]; 
bytes sub = b[10:20];
```
冒号 `:` 左边表示切片开始的索引，右边表示切片结束时的索引，如果数组切片是从索引 `0` 开始或者直到字节数组结束，可以忽略不写。如：

```
bytes leftb = b[:10]; 
bytes rightb = b[10:]; 
```

## 实战演习

1. 棋盘是有9个字节的数组，每一个字节代表棋盘上某个位置的状态。参照 `getElemAt`，实现 Util 库的`setElemAt` 函数。