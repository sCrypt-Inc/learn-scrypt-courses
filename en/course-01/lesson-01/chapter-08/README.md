# Chapter 8: Maintaining Game State

A contract can keep state across chained transactions by storing it in the locking script. In the following example, a contract goes from `state0` to `state1`, and then to `state2`. Input in transaction 1 (`tx1`) is spending UTXO in `tx0`, and `tx2` spending `tx1`.

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/06.png?raw=true)

The following is a simple [counter contract](https://github.com/sCrypt-Inc/boilerplate/blob/7cc4ebed75412ff171d14b2cf3ec31abddb6fa00/contracts/counter.scrypt), showing how to maintain state in the contract through simple steps.

## Step 1 

State properties are declared using the [decorator `@state`](https://scryptdoc.readthedocs.io/en/latest/state.html). You can treat the state property like a normal property: read and update it.


```js
contract Counter {

    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));
        // update counter state
        this.counter++;
    }
}
```

## Step 2

When you are ready to pass the new state onto the output[s] in the current spending transaction, simply call a built-in function `this.getStateScript()` to get the locking script containing the latest stateful properties. It is automatically generated for every stateful contract, i.e., a contract that has at least one property decorated with `@state`.

```js
contract Counter {

    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));
        // update counter state
        this.counter++;
        // serialize the state of the contract
        bytes outputScript = this.getStateScript();
    }
}
```

## Step 3

Ensure that the output of the current transaction must include this new state. 
Step 3 uses sighash preimage in the last chapter, containing the hash of all outputs in the transaction `hashOutputs` (in field 8). If this hash value is the same with the hash value of all outputs in the current transaction, we can be sure that the outputs of current transaction is consistent with the outputs we constructed in the contract. Therefore, the updated state is included.


```js
contract Counter {

    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));
        // increment counter
        this.counter++;
        // serialize the state of the contract
        bytes outputScript = this.getStateScript();
        // construct an output from its locking script and satoshi amount
        bytes output = Utils.buildOutput(outputScript, amount);
        // make sure the transaction contains the expected outputs
        require(hash256(output) == SigHash.hashOutputs(txPreimage));
    }
}
```

## Put it to the test

1. Update the state properties `board` and `isAliceTurn` of the `TicTacToe` contract to ensure the player moves the piece