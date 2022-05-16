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

The public function uses the `public` modifier to modify the function, which is the interface for externally calling the contract. The parameters of the public function represent the unlock parameters in the UTXO model (described in the next chapter). The public function does not have a clear return type declaration and the `return` statement at the end of the function, which implicitly returns the `bool` type, and the return value is `true`

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

`move()` : Alice and Bob each lock X bitcoins in a UTXO containing the above contract. Next, they alternately play the game by calling the public function `move()`. The public function `move()` has 4 parameters, which represent:

- `n` : where on the board to play the chess
- `sig` : the player's signature
- `amount` : the contract balance after subtracting transaction fees
- `txPreimage`: will be introduced in Chapter 7

`won()` : Check if a player has won the game, he will be able to take away all contract locked bets

`full()` : Check if all squares of the board have pieces, if no one wins the game, the two players will split the bet evenly


1. Add return type `bool` for `won()` and `full()` function and change `move()` to a public function

2. Add a **require statement** to the public function `move()`, requiring that the function parameter `n` must be greater than or equal to `0` and less than the contract's `static` property `N`