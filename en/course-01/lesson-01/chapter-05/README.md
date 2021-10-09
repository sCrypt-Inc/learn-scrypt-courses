# Chapter 5: Function and Require Statement


## Function

Functions are declared using the `function` keyword. The main purpose of a function is to encapsulate the internal logic of the contract and code reuse. When defining a function, you need to use a colon `:` to indicate the type of return value, such as:

```

contract Test {
    function valueOf(int x) : int {
        return x;
    }
    ...
}

```


## Public Function

The public function uses the `public` modifier to modify the function, which is the interface for externally calling the contract. The public function does not have a clear return type declaration and the `return` statement at the end of the function, which implicitly returns the `bool` type, and the return value is `true`

## Require Statement

The **require statement** contains the `require` keyword and a boolean expression:

```javascript
   require(a > 0);
```

This statement checks whether the Boolean expression is true. When certain conditions are not met, an error is thrown and execution is stopped. This is similar to the `require` of the `solidity` language. The last statement of the sCrypt public function must be a **require statement**, and each public function of the contract has at least one **require statement**. If and only if all **require statements** are checked, the contract can be successfully unlocked.

```
contract Test {
    public function unlock(int y) {
        require(y == 42);
    }
    ...
}
```

## Put it to the test

There are 3 functions in the `TicTacToe` contract:

`move`:  Alice (Alice) and Bob (Bob) each lock X bitcoins in a UTXO containing the above contract. Next, they alternately play the game by calling the public function move()
`won`: Checks if any player has won the game, he will be able to take away all the bets locked in the contract
`full`: Checks whether there are pieces in all the squares of the board, if no one wins the game, the two people divide the bet equally

1. Add return type `bool` for `won` and `full` function and change `move` to a public function

2. Add a **require statement** to the public function `move`, requiring that the function parameter `n` must be greater than or equal to `0` and less than the contract's `static` property `BOARDLEN`