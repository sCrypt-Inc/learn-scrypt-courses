# Chapter 12: Maintain Game State

A contract can keep state across chained transactions by storing it in the locking script. In the following example, a contract goes from `state0` to `state1`, and then to `state2`. Input in transaction 1 (`tx1`) is spending UTXO in `tx0`, and `tx2` spending `tx1`.
![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/06.png?raw=true)

You can maintain state in a contract with these simple steps.

## Step 1 
Declare any property that is part of the state with a [decorator `@state`](https://scryptdoc.readthedocs.io/en/latest/state.html). You can use the *stateful* property as a normal property: read and update it.

```
contract TicTacToe {

    @state
    bool is_alice_turn;     // is Alice's turn?

    ...

    public function move(int n, Sig sig, int amount, SigHashPreimage txPreimage) {

        ...
        // take turns
        this.is_alice_turn = !this.is_alice_turn;
        ...
    }

    ...
}
```

## Step 2
When you are ready to pass the new state onto the output[s] in the current spending transaction, simply call a built-in function `this.getStateScript()` to get the locking script containing the latest stateful properties. It is automatically generated for every stateful contract, i.e., a contract that has at least one property decorated with `@state`.

```
bytes outputScript = this.getStateScript();
```

## Step 3
Ensure that the output of the current transaction must include this new state. 
Step 3 uses sighash preimage in the last chapter, containing the hash of all outputs in the transaction `hashOutputs` (in field 8). If this hash value is the same with the hash value of all outputs in the current transaction, we can be sure that the outputs of current transaction is consistent with the outputs we constructed in the contract. Therefore, the updated state is included.

The following code demonstrates this approach:

```
// construct an output from its locking script and satoshi amount
bytes output = Util.buildOutput(outputScript, amount);
// only 1 input here
require(hash256(output) == Util.hashOutputs(txPreimage));
```

## Put it to the test

Use `@state` decoration to add the following state to the `TicTacToe` contract.

1. Add state property `board`, type `bytes`
2. Update state property