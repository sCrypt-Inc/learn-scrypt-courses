# 第六章: `@methed` Decorator


使用 `@method` 装饰器来标记任何打算在链上运行的方法。

被装饰的方法只能调用同样被 `@method` 装饰的方法。此外，只能访问用 `@prop` 修饰的属性。未修饰的方法只是常规的 TypeScript 类方法。

`@methed` 装饰器标记的方法分为两种:

### 1. 公共的

可以从外部调用公共 `@method` 方法。 如果调用在不违反 `assert()` 中的任何条件的情况下运行完成，则调用成功。 如果 `condition` 为假，函数 `assert(condition: boolean, errorMsg?: string)` 会抛出错误； 否则它什么都不做。 一个例子如下所示。

```ts
@method()
public unlock(x: bigint) {
    // only succeeds if x is 1
    assert(1n === x, "unequal");
}
```

### 非公共的

如果没有 `public` 修饰符的被 `@method` 装饰的方法是合约内部的，不能直接从外部交易调用。

```js
@method()
static add(x0: bigint, x1:bigint) : bigint {
    return x0 + x1;
}
```


## 实战演习

为 `TicTacToe` 合约添加 `3` 个 `@methed` 方法：

1. 公共 `@methed` 方法 `move()` : Alice 和 Bob 各自将 X 个比特币锁定在包含上述合约的一个 UTXO 中。 接下来，他们通过调用有 `2` 个参数的 `move()` 交替玩游戏:
    -  `n` : `bigint` 类型，表示在棋盘上哪个位置下棋
    -  `sig` : `Sig` 类型，表示玩家的签名
2. 非公共 `@methed` 方法 `won()` : 检查是否有玩家已经赢得比赛。返回 `boolean` 类型，有 `1` 个参数：
    -  `play` : `bigint` 类型，表示玩家
3. 非公共 `@methed` 方法 `full()` : 检查棋盘所有格子是否都有棋子了。 返回 `boolean` 类型，无参数。


为 `move` 方法 添加 `assert()` 断言，要求函数参数 `n` 必须大于等于 `0n`， 且小于 `9n`

