# Chapter 7: bytes slice


`bytes` represents a variable-length byte array, which can be sliced. like:

```solidity

bytes b = b'414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00';
bytes leftb = b[0:10]; 
bytes sub = b[10:20];
```

The left side of the colon `:` indicates the index at the beginning of the slice, and the right side indicates the index at the end of the slice. If the array slice starts at index `0` or until the end of the byte array, it can be ignored. like:

```solidity
bytes leftb = b[:10]; 
bytes rightb = b[10:]; 
```

## Put it to the test

1. The board is an array of 9 bytes, and each byte represents the state of a cell on the board. Refer to `getElemAt` to implement `setElemAt`.