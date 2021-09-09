# Chapter 9: Loop

sCrypt uses the `loop` keyword to define loops. The syntax is as follows:

```
loop (maxLoopCount) [: i] {
    loopBody
}
```

`maxLoopCount` must be a constant known at compile time. `i` is an [induction variable](https://scryptdoc.readthedocs.io/en/latest/loop.html#induction-variable), representing the loop index starting from 0. For example, the following loop:


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

is equivalent to:

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

1. In the previous chapter, we stored all possible winning lines in the array `lines`. Let us loop through all the lines, to check if there is a line a player has formed on the board. If there is, he wins the game.

2. In the `full` function, traverse all the cells of the board and check whether it is occupied.
