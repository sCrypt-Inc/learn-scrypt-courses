# Chapter 7: Bytes Slice


`bytes` represents a variable-length byte array, which can be sliced.

```

bytes b = b'414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00';
bytes leftb = b[0:10]; 
bytes sub = b[10:20];
```

``b[start:end]`` returns subarray of b from index ``start`` (inclusive) to ``end`` (exclusive). ``start`` is 0 if omitted, ``end`` is length of array if omitted.

```
bytes leftb = b[:10]; 
bytes rightb = b[10:]; 
```

## Put it to the test

1. The board is an array of 9 bytes, and each byte represents the state of a cell on the board. Refer to `getElemAt` to implement the `setElemAt` function of the Util library.