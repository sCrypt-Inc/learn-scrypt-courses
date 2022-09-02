# Chapter 11: Loop

sCrypt uses the `loop` keyword to define loops. The syntax is as follows:

```
loop (maxLoopCount) [: i] {
    loopBody
}
```

`maxLoopCount` must be a constant known at compile time. `i` An [induction variable](https://scryptdoc.readthedocs.io/en/latest/loop.html#induction-variable), representing the loop index starting from 0. For example, the following loop:


```
contract Loop {
    
    static const int N = 10;
    
    public function unlock(int x) {
    
        loop (N) : i {
            x = x * 2 + i;
        }
        require(x > 100);
    }
}
```

is equivalent to:

```
x = x * 2 + 0;
x = x * 2 + 1;
x = x * 2 + 2;
x = x * 2 + 3;
x = x * 2 + 4;
x = x * 2 + 5;
x = x * 2 + 6;
x = x * 2 + 7;
x = x * 2 + 8;
x = x * 2 + 9;
```

## Put it to the test

1. In the `full` function, iterate over all the squares of the board and check whether each square is empty.