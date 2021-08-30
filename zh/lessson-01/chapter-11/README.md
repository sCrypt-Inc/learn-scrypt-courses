# 第十一章: bytes 切片


bytes 表示一个可变长度的字节数组，可以对于进行切片操作。如：

```solidity

bytes b = b'414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00';
bytes leftb = b[0:10]; 
bytes sub = b[10:20];
```
如果数组切片是从索引 `0` 开始，可以忽略不写。如：

```solidity
bytes leftb = b[:10]; 
```

## 实战演习

1. 取字节数组 `b` 的切片， 从索引 `3`开始，长度是 `5`。