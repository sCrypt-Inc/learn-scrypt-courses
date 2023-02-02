# 第十二章: 循环 

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


## 实战演习

1. 在 `win` 函数中遍历 `lines` 数组，检查玩家是否赢得比赛。
2. 在 `full` 函数中遍历棋盘所有格子，检查每个格子是否为空。

