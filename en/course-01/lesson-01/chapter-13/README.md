# Chapter 13: Stateful Contract

One of the most challenging parts for sCrypt beginners is to keep internal state in a contract. We provide an elegant solution using state decorators.

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/06.png?raw=true)

## The Problem


For instance, in the counter contract in the previous chapter, we maintain a state, counter, and increase it by one every time increment() is called. We only maintain a counter here and there is already tons of boilerplate code, mostly to serialize and deserialize the state (Line 5–9 and Line 15). The core logic is just one line at Line 12. Code grows more cumbersome and error-prone when the state becomes more complex.


## The Solution: State Decorators

With the new state decorator approach, you can maintain state in a contract with three simple steps, as shown below:

1. Declare any property that is part of the state with a decorator `@state`.
2. Use the stateful property as a normal property: read and update it.
3. When you are ready to pass the state onto the `output[s]` in the spending transaction, simply call a built-in function `this.getStateScript()` (Line 11), automatically generated for every contract.


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

As you can see, this is more concise and secure than manually serializing and deserializing state. The advantage is more significant when the state grows.

## Put it to the test

Use `@state` decoration to add the following state to the `TicTacToe` contract.

1. Add state property `is_alice_turn`, type `bool`; Add state property `board`, type `bytes`
2. Update state property