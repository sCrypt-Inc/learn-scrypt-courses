# Chapter 9: Array



An array is a list of values of the same type.

1. Array elements are separated by commas. The array size must be an integer greater than `0`

    ```solidity
    bool[3] b = [false, false && true || false, true || (1 > 2)];
    ```

2. Omit array dimensions when declaring

    ```solidity
    int[][] f = [[11, 12, 13], [21, 22, 23]];    
    ```


##  Put it to the Test

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

Use a two-dimensional array `int[8][3] lines` to save all the above winning states. Add this array in the `win` function.