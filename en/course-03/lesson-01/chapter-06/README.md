# Chapter 6: `assert()` function and `@methed` decorator


## `assert()` function

The most commonly used built-in function is `assert(condition: boolean, msg?: string)`. It throws an error if the condition `condition` is false. A contract invocation succeeds if and only if all executed `assert()` assertions are true.

```ts
assert(a > 0n);
```


## `@methed` decorator

Use the `@method` decorator to mark any method that is intended to be run on the chain.

Like properties, smart contracts can also have two types of methods:

1. With the `@method` decorator: These methods can only call methods that are also decorated with the `@method` decorator. Additionally, only properties decorated with `@prop` can be accessed.

2. No `@method` decorator: these methods are just regular TypeScript class methods. no limit.

methods with `@methed` decorator divided into two types:

### 1. Public `@methed` methods

Every contract must have at least one public `@method` method. It is denoted with the `public` modifier and returns `void`. It is visible outside the contract and acts as the main method in the contract (like the `main` method in C and Java).

Public `@method` methods can be called from external transactions. If all `assert()` in the method meet the conditions, the call is successful. An example is shown below.

```ts
@method()
public unlock(x: bigint) {
    // only succeeds if x is 1
    assert(1n === x, "unequal");
}
```

**Note**： 

The last function call of a public `@methed` method must be an `assert()` function call, unless it is a `console.log()` call.

### 2. Non-public `@methed` methods

Without the `public` modifier, it is a non-public `@methed` method. A non-public `@methed` method is a contract internal method that can only be called within the contract class.

Non-public `@methed` methods must explicitly declare the return type. For example:

```js
@method()
static add(x0: bigint, x1:bigint) : bigint {
    return x0 + x1;
}
```


## Put it to the test

Add methods to `TicTacToe` contract:

1. Public `@methed` method `move()` : Alice and Bob each lock X bitcoins in a UTXO containing the above contract. Next, they alternately play the game by calling the public `@methed` method `move()`. There are `2` parameters, which represent:

-  `n` : type is `bigint`, indicates which position on the chessboard to play
-  `sig` : type is `Sig`, indicates the player's signature

2. Non-public `@methed` method `won()` : Checks if a player has won the game, he will be able to take away all contract-locked bets. Returns `boolean` type with `1` parameter:

-  `play` : type is `bigint`, indicates the player


3. Non-public `@methed` method `full()` : Checks if all squares of the board have pieces, and if no one wins the game, both players split the bet. Return `boolean` type, no parameters.


Add `assert()` assertion for `move()` method, requiring function parameter `n` must be greater than or equal to `0n` and less than `9n`.

