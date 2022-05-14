# Chapter 8: Array



An array is a list of values of the same type. Array elements are separated by commas. The array size must be a positive integer.

```
int[3] a = [0, 1, 2];
bool[3] b = [false, false && true, (1 > 2)];
int[2][3] arr2D = [[11, 12, 13], [21, 22, 23]];
int d = a[2];
int idx = 2;
// read
d = a[idx];
d = arr2D[idx][1];
// write
a[idx] = 2;
// assign to an array variable
a = arr2D[1];
```


##  Put it to the test

For the Tic-Tac-Toe game, the rule for whether a player wins the game is that there are three pieces connected in a straight line. We enumerate all the possible connections in a line:

```
0, 1, 2
3, 4, 5
6, 7, 8
0, 3, 6
1, 4, 7
2, 5, 8
0, 4, 8
2, 4, 6
```

Use a two-dimensional array `int[8][3] lines` to save all the above winning states. Add this array in the `won` function.