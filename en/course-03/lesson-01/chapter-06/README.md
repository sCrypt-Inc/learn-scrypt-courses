# Chapter 6: `@method` Decorator

## `@method` decorator

Use `@method` to decorate any method that intends to run on chain.

Decorated methods can only call methods that are also decorated with `@method`. Additionally, only properties decorated with `@prop` can be accessed. Methods not decorated are just regular TypeScript class methods.

They are two types of `@method`s.

### 1. Public

Each contract must have at least one public `@method`. It is denoted with the `public` modifier and does not return any value. It is visible outside the contract and acts as the main method into the contract (like `main` in C and Java).

A public @method can be called from an external transaction. The call succeeds if it runs to completion without violating any conditions in `assert()`. Function `assert(condition: boolean, errorMsg?: string)` throws an error if the `condition` is false; otherwise it does nothing. An example is shown below.

```ts
@method()
public unlock(x: bigint) {
    // only succeeds if x is 1
    assert(1n === x, "unequal");
}
```

### 2. Non-public

Without a `public` modifier, a `@method` is internal and cannot be directly called from an external transaction.

```js
@method()
static add(x0: bigint, x1:bigint) : bigint {
    return x0 + x1;
}
```


## Put it to the test

Add methods to contract `TicTacToe`:

1. Public `@method` `move()` : Alice and Bob each locks X bitcoins in a UTXO containing contract `TicTacToe`. Next, they alternately play the game by calling `move()` with `2` parameters:

   -  `n` : `bigint`, which square to place the symbol
   -  `sig` : `Sig`, a player's signature

2. Non-public method `won()` : Check if a player has won the game. Returns `boolean` type with `1` parameter:

   -  `play` :  `bigint`, which square to place the symbol

3. Non-public method `full()` : Checks if all squares of the board have symbols. Returns `boolean` type, no parameter.


Add `assert()` in `move()`, requiring function parameter `n` must be greater than or equal to `0n` and less than `9n`.

