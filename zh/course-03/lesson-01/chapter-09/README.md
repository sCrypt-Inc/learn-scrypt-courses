# Chapter 9: Declare a win or draw

## Loop

For security reasons, Bitcoin does not allow infinite loops to prevent DoS attacks. All loops must be bounded at compile time. So if you want to loop inside `@method`, you must strictly use the following format:

```ts
let sum: bigint = 0n;
for(let i = 0; i < 9; i++) {
    sum += BigInt(i);  // use `BigInt()` to convert `i` to `bigint` type
}

assert(sum === 36n);
```


## A win or draw

For the Tic-Tac-Toe game, a player wins if three of his marks are in a straight line. We enumerate all possibilities in a two-dimensional array `FixedArray<FixedArray<bigint, 3>, 8>`.

```ts
let lines: FixedArray<FixedArray<bigint, 3>, 8> = [
    [0n, 1n, 2n],
    [3n, 4n, 5n],
    [6n, 7n, 8n],
    [0n, 3n, 6n],
    [1n, 4n, 7n],
    [2n, 5n, 8n],
    [0n, 4n, 8n],
    [2n, 4n, 6n]
];
```

If no one wins after all `9` squares of the board have been occupied, it is a tie.

## Build outputs


In the last chapter, we learn that the outputs of current spending transaction can be accessed via `ScriptContext`. `TicTacToe` can contain the following three types of output during execution:


1. The game is not over: a output containing the new state and a change output
2. A player wins the game: a `P2PKH` output that pays the winner, and a change output.
3. A draw: two `P2PKH` outputs that split the contract-locked bets equally between the players and a change output.


 The `P2PKH` output can be built using `Utils.buildPublicKeyHashOutput(pkh: PubKeyHash, amount: bigint)`. The [change output](https://wiki.bitcoinsv.io/index.php/Change) can be built using `this.buildChangeOutput()`.

## Put it to the test

1. In the `win()` function iterate over the `lines` array and check if a player wins the game.
2. In the `full()` function, traverse all the squares of the board and check if it is full.
3. Add a change output to the `move()` function.
