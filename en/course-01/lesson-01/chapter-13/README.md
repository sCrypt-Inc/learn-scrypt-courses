# Chapter 13: Maintain Game State

A contract can keep state across chained transactions by storing it in the locking script. In the following example, a contract goes from `state0` to `state1`, and then to `state2`. Input in transaction 1 (`tx1`) is spending UTXO in `tx0`, and `tx2` spending `tx1`.
<!-- TODO: add a pic -->

You can maintain state in a contract with three simple steps:

1. Declare any property that is part of the state with a decorator `@state`.
2. Use the stateful property as a normal property: read and update it.
3. When you are ready to pass the state onto the `output[s]` in the spending transaction, simply call a built-in function `this.getStateScript()`, automatically generated for every contract.


<!-- TODO: use tictactoe as example, with is_alice_turn as state -->
```
contract Counter {
    @state
    int counter;
    
    public function mutate(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));
   
        // mutate state
        this.counter++;

        bytes outputScript = this.getStateScript();

        bytes output = Util.buildOutput(outputScript, amount);
        require(hash256(output) == Util.hashOutputs(txPreimage));
    }
}
```

## Put it to the test

Use `@state` decoration to add the following state to the `TicTacToe` contract.

1. Add state property `is_alice_turn`, type `bool`; Add state property `board`, type `bytes`
2. Update state property