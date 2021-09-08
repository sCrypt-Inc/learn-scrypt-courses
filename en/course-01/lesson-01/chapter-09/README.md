# Chapter 9: Loop

sCrypt uses the `loop` keyword to define loops. The syntax is as follows:

```
loop (maxLoopCount) [: i] {
    loopBody
}
```

`maxLoopCount` must be a constant known at compile time. The loop is realized by repeating the loop body `maxLoopCount` times. `maxLoopCount` must be a compile-time constant [CTC](https://scryptdoc.readthedocs.io/en/latest/ctc.html). `i` is an induction variable, which indicates the number of cycles. For example, the following loop:


```solidity
contract Loop {
    
    static const int N = 10;
    
    public function unlock(int x) {
    
        loop (N) {
            x = x * 2;
        }
        require(x > 100);
    }
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

## Put it to the test

1. In the previous chapter, we stored all possible winning lines in the array `lines`, now we use the `loop` to loop through all the lines, to check if the player has connected pieces on the board. If there is then he wins the game.

2. In the `full` function, traverse all the grids of the board and check whether each grid is not empty.

