# Chapter 12: Contract Status

The locking script of a stateful contract is divided into data and code. The data part is the state. The code part contains the state transition rule, which is the business logic of the contract.

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/04.png?raw=true)

To manage the state, we require that the code part of the contract cannot be changed (that is, the contract rules cannot be changed), and the change of the data part (state) must comply with the state transition rules specified in the code part. Below is a simple counter contract. Its state is the number of times public function ``increment()`` has been called (initialized to 0), stored in the last byte of the locking script.


```solidity
import "util.scrypt";

contract Counter {
    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));

        bytes scriptCode = Util.scriptCode(txPreimage);
        int scriptLen = len(scriptCode);

        // state (i.e., counter value) is at the end
        int counter = unpack(scriptCode[scriptLen - Util.DataLen :]);
        // increment counter
        bytes scriptCode_ = scriptCode[: scriptLen - Util.DataLen] + num2bin(counter + 1, Util.DataLen);
        bytes output = Util.buildOutput(scriptCode_, amount);
        // ensure output is expected: amount is same with specified
        // also output script is the same with scriptCode except counter incremented
        require(hash256(output) == Util.hashOutputs(txPreimage));
    }
}
```

## Update State

We parse the current states of the contract from the locking script: `turn` and `board`. Next we need to update these two.

```solidity
board = Util.setElemAt(board, n, play);
turn = 1 - turn;
```


Usually, after updating the state, we need to process some business logic based on the new state of the contract. In the `TicTacToe` contract, we check the new state to determine whether someone has won the game or the board is full, then the contract ends. Otherwise, the contract continues. Through the following code, we append the new state to the code part to get the locking script of the contract containing the new state, and construct a transaction with a output containing the updated contract.

```solidity
bytes scriptCode_ = scriptCode[ : scriptLen - BOARDLEN - TURNLEN] + num2bin(1 - turn, TURNLEN) + board;
bytes output = Util.buildOutput(scriptCode_, amount);
```
  
## Constraint

By updating the state we have generated the `TicTacToe` contract with the new state. We need to ensure that the output of the current transaction must include this new contract. How to ensure that?

Sighash preimage contains the hash of all outputs in the transaction: `hashOutputs`. If this hash value is the same with the hash value of all outputs in the current transaction, we can be sure that the outputs of current transaction is consistent with the outputs we constructed in the contract, and the contract with updated state is included.

The outputs of the current transaction are constrained by the following code:

```solidity
require(hash256(outputs) == Util.hashOutputs(txPreimage));
```


## Put it to the test

We have read the locking script of `TicTacToe`. Let us parse the state of the contract from the data part of locking script and update it:

1. State `turn` is the first byte of the contract data part, representing whose turn it it to play next. State `board` starts from the second byte of the contract data part and runs a total of 9 bytes, representing the status of the board.
2. Ensure one output of the current transaction contains the `TicTacToe` contract.