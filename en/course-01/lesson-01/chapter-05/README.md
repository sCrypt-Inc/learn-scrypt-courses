# Chapter 5: Public and non-public functions 


## Function

The functions of the sCrypt language are declared using the `function` keyword. The main function of the function is to encapsulate the internal logic of the contract and code reuse. When defining, you need to use a colon `:` to indicate the type of return value, such as:

```solidity

contract Test {
    function valueOf(int x) : int {
        return x;
    }
    ...
}

```


## Public Function

The public function uses the `public` modifier to modify the function, which is the interface for externally calling the contract. The public function does not have a clear return type declaration and the `return` statement at the end of the function, which implicitly returns the `bool` type, and the return value is `true`


```solidity
contract Test {
    public function unlock(int y) {


    }
    ...
}
```

## Put it to the Test

There are 3 functions in the `TicTacToe` contract:

`move`:  Alice (Alice) and Bob (Bob) each lock X bitcoins in a UTXO containing the above contract. Next, they alternately play the game by calling the public function move()
`won`: Checks if any player has won the game, he will be able to take away all the bets locked in the contract
`full`: Checks whether there are pieces in all the squares of the board, if no one wins the game, the two people divide the bet equally

1. Add return type `bool` for `won` and `full` function

2. Change `move` to a public function