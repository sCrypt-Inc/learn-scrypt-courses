# Chapter 12: Contract Status

The state of the contract needs to be declared with the @state annotation. Below is a simple [counter contract](https://github.com/sCrypt-Inc/boilerplate/blob/master/contracts/counter.scrypt).


```
import "util.scrypt";

contract Counter {
    @state
    int counter;
    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));

        this.counter++;
        bytes outputScript = this.getStateScript();
        bytes output = Util.buildOutput(outputScript, amount);
        // ensure output is expected: amount is same with specified
        // also output script is the same with scriptCode except counter incremented
        require(hash256(output) == Util.hashOutputs(txPreimage));
    }
}
```

We use the `State` structure defined in Chapter 10 to add a state property `state` to the `TicTacToe` contract.


```
@state
State state;
```

## Update State

During the execution of the contract, the status of the contract needs to be updated.

```
this.state.board = Util.setElemAt(this.state.board, n, play);
this.state.turn = 1 - this.state.turn;
```


Usually, after updating the state, use `getStateScript` to get the locking script containing the latest state.

```
bytes outputScript  =  this.getStateScript();
bytes output = Util.buildOutput(outputScript, amount);
outputs = output;
```
  
## Constraint

By updating the state we have generated the `TicTacToe` contract with the new state. We need to ensure that the output of the current transaction must include this new contract. How to ensure that?

Sighash preimage contains the hash of all outputs in the transaction: `hashOutputs`. If this hash value is the same with the hash value of all outputs in the current transaction, we can be sure that the outputs of current transaction is consistent with the outputs we constructed in the contract, and the contract with updated state is included.

The outputs of the current transaction are constrained by the following code:

```
require(hash256(outputs) == Util.hashOutputs(txPreimage));
```


## Put it to the test


1. The state of the contract includes the board and turn order, please update the state of the `TicTacToe` contract
2. Ensure one output of the current transaction contains the `TicTacToe` contract.