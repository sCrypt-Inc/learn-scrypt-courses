# Chapter 8: Maintaining Game State

## Keep state across chained

In the UTXO model, a contract can keep state across chained transactions by storing it in the locking script. In the following example, a contract goes from `state0` to `state1`, and then to `state2`. Input in transaction 1 (`tx1`) is spending UTXO in `tx0`, and `tx2` spending `tx1`.

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/06.png?raw=true)

So how do you make sure that the locking script contains the correct state when the transaction is constructed so that the chain maintains state? This requires the use of `ScriptContext`.

## ScriptContext

In the UTXO model, the context of validation is the UTXO being spent and the spending transaction, including its inputs and outputs. In the following example, when the second of input of transaction `tx1` is spending the second output of `tx0`, the context for the smart contract in the latter output is roughly the UTXO and `tx1` circled in red.


![](https://scrypt.io/scrypt-ts/assets/images/scriptContext-a3ace5522bf62d82d20958735c13ddf4.jpg)


You can directly access [ScriptContext](https://scrypt.io/scrypt-ts/getting-started/what-is-scriptcontext) via `this.ctx` in any public method. It can be thought of as additional information that a public method gets when it is called, in addition to its function parameters. The following is a simple [counter contract](https://github.com/sCrypt-Inc/scryptTS-examples/blob/master/src/contracts/counter.ts) to show how to maintain state in the contract through `ScriptContext`. The contract implementation maintains a single state: how many times it has been called since it was deployed.

## Step 1


State properties are declared using the [decorator `@prop(true)`](https://scrypt.io/scrypt-ts/getting-started/how-to-write-a-contract#propstateful-boolean--false-decorator). You can treat the state property like a normal property: read and update it.

```ts
export class Counter extends SmartContract {
    // Stateful prop to store counters value.
    @prop(true)
    count: bigint

    constructor(count: bigint) {
        super(...arguments)
        this.count = count
    }

    @method()
    public increment() {
        // Increment counter value
        this.count++
    }
}
```

## Step 2

When you are ready to pass the new state onto the output[s] in the current spending transaction, simply call a built-in function `this.buildStateOutput()` to get the locking script containing the latest stateful properties. It is automatically generated for every stateful contract, i.e., a contract that has at least one property decorated with `@prop(true)`.


```ts
export class Counter extends SmartContract {
    // Stateful prop to store counters value.
    @prop(true)
    count: bigint

    constructor(count: bigint) {
        super(...arguments)
        this.count = count
    }

    @method()
    public increment() {
        // Increment counter value
        this.count++

        // make sure balance in the contract does not change
        const amount: bigint = this.ctx.utxo.value
        // output containing the latest state
        const output: ByteString = this.buildStateOutput(amount)
    }
}
```



## Step 3

Make sure that the output of the current transaction must contain this new state. If the `hashOutputs` hash in `ScriptContext` is the same as the hash of all outputs in the current transaction, we can be sure that the outputs of the current transaction are consistent with the outputs we built in the contract. Therefore, the updated contract state is included.


```ts
export class Counter extends SmartContract {
    // Stateful prop to store counters value.
    @prop(true)
    count: bigint

    constructor(count: bigint) {
        super(...arguments)
        this.count = count
    }

    @method()
    public increment() {
        // Increment counter value
        this.count++

        // make sure balance in the contract does not change
        const amount: bigint = this.ctx.utxo.value
        // output containing the latest state
        const output: ByteString = this.buildStateOutput(amount)
        // verify current tx has this single output
        assert(this.ctx.hashOutputs == hash256(output), 'hashOutputs mismatch')
    }
}
```

## Put it to the test

1. Update the state properties board and isAliceTurn of the TicTacToe contract to ensure the player moves the piece
2. Use `this.ctx.hashOutputs` to ensure the transaction contains the expected output