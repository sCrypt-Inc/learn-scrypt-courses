# Chapter 6: library


The library is basically the same as the contract, except that it does not contain any public functions, so it cannot be deployed and called independently. It is usually used to group related constants and `static` functions.


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

The library can be defined in the same file as the contract.

## Put it to the test

Build a `Util` library, containing two functions to manipulate the board

1. Access the board state according to the index, the function name `getElemAt`, has two parameters: `bytes board` and `int index`, the return type is `bytes`;

2. Modify the state of the board according to the index. The function name is `setElemAt`, which has three parameters: `bytes board`, `int index`, and `bytes value`, and the return type is `bytes`;
