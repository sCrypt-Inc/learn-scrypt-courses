# 第九章: 宣布获胜或平局

## 循环

出于安全原因，比特币不允许无限循环，以防止 DoS 攻击。所有循环都必须在编译时有界。所以如果你想在 `@method` 内部循环，你必须严格使用如下格式：

```ts
let sum: bigint = 0n;
for(let i = 0; i < 9; i++) {
    sum += BigInt(i);  // use `BigInt()` to convert `i` to `bigint` type
}

assert(sum === 36n);
```


## 获胜与平局

对于 Tic-Tac-Toe 游戏，如果玩家的三个标记在一条直线上，则玩家获胜。我们在一个二维数组 `FixedArray<FixedArray<bigint, 3>, 8>` 中列举了所有的可能性。

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

如果在棋盘的所有“9” 个格子都被占据后，仍然没有人获胜，则为平局。

## 构建输出

在上一章中，我们了解到可以通过 `ScriptContext` 访问当前支出交易的输出。 `TicTacToe` 在执行过程中可以包含以下三种类型的输出：

1. 游戏未结束: 包含一个包含新状态的输出和一个找零输出
2. 有玩家赢得比赛: 包一个将合约锁定赌注打给赢家的 `P2PKH` 输出和一个找零输出。
3. 平局: 包两个将合约锁定赌注平分给玩家的 `P2PKH` 输出和一个找零输出。


使用 `Utils.buildPublicKeyHashOutput(pkh: PubKeyHash, amount: bigint)` 来构建 `P2PKH` 输出。使用 `this.buildChangeOutput()` 来构建找零输出。

## 实战演习

1. 在 `win()` 函数中遍历 `lines` 数组，检查玩家是否赢得比赛。
2. 在 `full()` 函数中遍历棋盘所有格子，检查每个格子是否为空。
3. 在 `move()` 函数中添加一个找零输出。

