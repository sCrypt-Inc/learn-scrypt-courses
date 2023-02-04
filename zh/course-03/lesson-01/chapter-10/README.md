# 第十章: 宣布获胜或平局

## 循环

出于安全原因，比特币不允许无限循环，以防止 DoS 攻击。所有循环都必须在编译时有界。所以如果你想在 `@method` 内部循环，你必须严格使用如下格式：

```ts
for(let $i = 0; $i < $maxLoopCount; $i++) {
  ...
}
```

注意：

- 初始值必须为 `0`，运算符 `<`（无 `<=`），并递增 `$i++`（无预递增 `++$i`）。
- `$maxLoopCount` 必须是 [CTC](https://scrypt.io/scrypt-ts/getting-started/how-to-write-a-contract#compile-time-constant)。
- `$i` 可以是任意名称，例如 `i`、`j` 或 `k`。它可以是数字或 `bigint` 类型。
- 目前不允许 `break` 和 `continue`，但可以像这样模拟。

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


## 获胜与平局

对于井字棋游戏，是否有玩家赢得比赛的规则是棋盘上是否有三个棋子连成一条直线。

我们把所有可能的连成一条线的情况全部列举出来：

```
0, 1, 2
3, 4, 5
6, 7, 8
0, 3, 6
1, 4, 7
2, 5, 8
0, 4, 8
2, 4, 6
```

用一个二维数组 `FixedArray<FixedArray<bigint, 3>, 8>` 保存以上所有赢得比赛的状态。 在 `won` 函数中添加该数组。

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

只要棋盘上出现了以上任意一种情况，就表示有玩家赢得比赛。如果没有人获胜，而且此时棋盘的 `9` 个格子都已经落子，则为平局。



## 实战演习

1. 在 `win()` 函数中遍历 `lines` 数组，检查玩家是否赢得比赛。
2. 在 `full()` 函数中遍历棋盘所有格子，检查每个格子是否为空。

