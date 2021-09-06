# Chapter 15: Update State and Constraints


## Update State

We have parsed the current two states of the contract from the locking script of the contract: `turn` and `board`. Next we need to update these two states.

```solidity
board = Util.setElemAt(board, n, play);
turn = 1 - turn;
```


Usually, after updating the state, you need to do some business logic processing based on the new state of the contract. In the `TicTacToe` contract, we check the new state to determine whether someone has won the game or the board is full, then the `TicTacToe` contract ends. Otherwise, the `TicTacToe` contract continues to run. Through the following code, we spliced the new state with the code part to get the locking script of the contract containing the new state, and construct a transaction with a output containing the contract.

```solidity
bytes scriptCode_ = scriptCode[ : scriptLen - BOARDLEN - TURNLEN] + num2bin(1 - turn, TURNLEN) + board;
bytes output = Util.buildOutput(scriptCode_, amount);
```
  
## Constraint

By updating the state we have generated the `TicTacToe` contract with the new state. Next we need to require that the output of the current transaction must include this new contract. So how to ensure that the output of the transaction contains this contract?

Since the hash of all outputs in the transaction context is accessed from the preimage, that is, `hashOutputs`, then, if this hash value is consistent with the hash value of all outputs built in the contract, then we can be sure that the outputs of current transaction is consistent with the outputs we constructed in the contract, and this contract is naturally included.

The output of the transaction is constrained by the following code:

```solidity
require(hash256(outputs) == Util.hashOutputs(txPreimage));
```

## Put it to the Test

1. Update the two states of the contract
2. Constrain the outputs of this transaction to include the `TicTacToe` contract.