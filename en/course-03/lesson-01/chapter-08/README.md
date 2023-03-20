# Chapter 8: Maintain Game State

## ScriptContext

In the UTXO model, the context of validating a smart contract is the UTXO containing it and the transaction spending it, including its inputs and outputs. In the following example, when the second of input of transaction `tx1` is spending the second output of `tx0`, the context for the smart contract in the latter output is roughly the UTXO and `tx1` circled in red.


![](https://scrypt.io/assets/images/scriptContext-a3ace5522bf62d82d20958735c13ddf4.jpg)

You can directly access the context through `this.ctx` in any public `@method`.
It can be considered additional information a public method gets when called, besides its function parameters.
This context is expressed in the `ScriptContext` interface.

```ts
export interface ScriptContext {
  /** the specific UTXO spent by this transaction input */
  utxo: UTXO,
  /** double-SHA256 hash of the serialization of some/all output amount with its locking script */
  hashOutputs: ByteString,
}
```
We only show the relevant fields here. You can find the complete definition [here](https://scrypt.io/docs/how-to-write-a-contract/scriptcontext).


## Stateful Contracts
In Bitcoin's UTXO model, a smart contract is one-off and stateless by default, since the UTXO containing it is destroyed after being spent. Being stateless allows it to scale easily, the same as in [HTTP](https://stackoverflow.com/questions/5836881/stateless-protocol-and-stateful-protocol).
A smart contract can simulate state by requiring the output of the spending transaction containing the same contract but with the updated state, enabled by `ScriptContext`.
This is similar to making HTTP seem stateful by using cookies.

We divide a smart contract in the locking script of an output into two parts: code and state as shown below. The code part contains the business logic of a contract that encodes rules for state transition and must **NOT** change. State transition occurs when a transaction spends the output containing the old state and creates a new output containing the new state, while keeping the contract code intact.
Since the new output contains the same contract code, its spending transaction must also retain the same code, otherwise it will fail. This chain of transactions can go on and on and thus a state is maintained along the chain, recursively.
![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/07.png?raw=true)

## Counter Contract
The following is a simple stateful [counter contract](https://github.com/sCrypt-Inc/scryptTS-examples/blob/master/src/contracts/counter.ts). The contract maintains a single state: how many times it has been called since deployment.

### Step 1


Declare a property stateful by using [decorator `@prop()`](https://scrypt.io/docs/how-to-write-a-contract/#properties) with a `true` argument. You can treat the state property like a regular property: read and update it.

```ts
class Counter extends SmartContract {
    // Stateful prop to store counter value
    @prop(true)
    count: bigint

    constructor() {
        super(...arguments)
        this.count = 0
    }

    @method()
    public increment() {
        // Increment counter value
        this.count++
    }
}
```

### Step 2

When you are ready to pass the new state onto the output[s] in the current spending transaction, simply call a built-in function `this.buildStateOutput()` to create an output containing the new state. It takes an input: the number of satoshis in the output. We keep the satoshis unchanged in the example.


```ts

    @method()
    public increment() {
        // Increment counter value
        this.count++

        // make sure balance in the contract does not change
        const amount: bigint = this.ctx.utxo.value
        // output containing the latest state
        const output: ByteString = this.buildStateOutput(amount)
    }
```

### Step 3

Make sure that the output of the current transaction must contain this incremented new state. If all outputs (only a single output here) we create in the contract hashes to `hashOutputs` in `ScriptContext`, we can be sure they are the outputs of the current transaction. Therefore, the updated state is propagated.

```ts
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
```

## Put it to the test

1. Update state `board` and `is_alice_turn` after a player places the symbol.
2. Use `this.ctx.hashOutputs` to ensure the calling transaction contains the expected state/output.