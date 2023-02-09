# Chapter 9: Declare a win or draw

## Loop

For security reasons, Bitcoin does not allow infinite loops to prevent DoS attacks. All loops must be bounded at compile time. So if you want to loop inside `@method`, you must strictly use the following format:


```ts
for(let $i = 0; $i < $maxLoopCount; $i++) {
  ...
}
```

Note：

- the initial value must be `0`, the operator `<` (no `<=`), and increment `$i++` (no pre-increment `++$i`).
- `$maxLoopCount` must be a [CTC](https://scrypt.io/scrypt-ts/getting-started/how-to-write-a-contract#compile-time-constant).
- `$i` can be arbitrary name, e.g., `i`, `j`, or `k`. It can be both a number or a `bigint` type.
- `break` and `continue` are currently not allowed, but can be emulated like:

```ts
// 模拟 break
let done = false;
for (let i = 0n; i < 3n; i++) {
    if (!done) {
        x = x * 2n
        if (x >= 8n) {
            done = true
        }
    }
}
```


## A win or draw

For the Tic-Tac-Toe game, the rule for whether a player wins the game is that there are three pieces connected in a straight line. We enumerate all possible cases of connecting lines. Use a two-dimensional array `FixedArray<FixedArray<bigint, 3>, 8>` to hold all the state of winning games. Add the array in the `won` function.

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

As long as any of the above situations appear on the board, it means that a player wins the game. If no one wins, and all `9` squares of the board have been placed at this time, it is a tie.

## Build outputs


In the last chapter, we learned that the contract outputs can be constrained by the hash value of `hashOutputs` in `ScriptContext`. `TicTacToe` contains the following `3` types of output during execution:


1. The game is not over: contains a stateful output and a change output
2. The game ends and a player wins the game: includes a `P2PKH` output that pays the contract-locked bet to the winner, and a change output.
3. Game over, no player wins: Contains two `P2PKH` outputs that split the contract-locked bets equally between the players and a change output.


Among them, the [change output](https://wiki.bitcoinsv.io/index.php/Change) is also `P2PKH` output. The `P2PKH` output can be built using `Utils.buildPublicKeyHashOutput(pkh, amount)`.

## Put it to the test

1. In the `win()` function iterate over the `lines` array and check if the player won the game.
2. In the `full()` function, traverse all the grids of the chessboard and check whether each grid is empty.
3. Add a change output to the `move()` function.
