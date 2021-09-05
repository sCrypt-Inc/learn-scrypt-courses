# Chapter 10: Loop

sCrypt uses the `loop` keyword to define loops. The syntax is as follows:

```
loop (maxLoopCount) {
    loopBody
}
```

或者

```solidity
loop (maxLoopCount) : i {
    loopBody
}
```

`maxLoopCount` must be a constant known at compile time. The loop is realized by repeating the loop body `maxLoopCount` times. `i` is an induction variable, which indicates the number of cycles. For example, the following loop:


```solidity
loop (10) {
    x = x * 2;
}
```

It is equivalent to the following expanded form:

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

## Put it to the Test

1. In the previous chapter, we stored all possible winning lines in the array `lines`, now we use the `loop` to loop through all the lines, to check if the player has connected pieces on the board. If there is then he wins the game.

2. In the `full` function, traverse all the grids of the board and check whether each grid is not empty.

