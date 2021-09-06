# Chapter 13: Contract Status

The raw bytes of a stateful contract are divided into data and code. The data part is the state. The code part contains the state transition rules, which is the business logic of the contract.

![](https://img-blog.csdnimg.cn/20200712230128735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

In order to manage the state, it requires that the code part of the contract cannot be changed (that is, the contract rules cannot be changed), and the change of the data (state) part must comply with the state transition rules specified in the code part.


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

We have read the locking script of `TicTacToe`, and now we parse the two states of the contract from the data part of locking script and update them:

1. State `turn`, the first byte of the contract data part. The data type is `int`. Indicates who is the current turn to play chess, the status is `board`, the second byte of the contract data part starts, a total of 9 bytes. The data type is `bytes`. Indicates the state of the board.
2. The output of the constraint transaction contains the `TicTacToe` contract.