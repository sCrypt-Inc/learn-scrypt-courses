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

The library can be defined in the same file as the contract, or it can be imported using the `import` keyword.

## Put it to the test

Import the `Util` library in the `TicTacToe` contract
