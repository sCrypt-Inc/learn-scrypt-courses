# 第六章: `assert()` 函数 和 `@methed` 方法 


## `assert()` 函数

最常用的内置函数是 `assert(condition: boolean, msg?: string)`。 如果条件 `condition` 为假，它会抛出错误。 当且仅当所有执行的 `assert()` 断言都为真时，合约调用才会成功。 

```ts
assert(a > 0n);
```


## `@methed` 方法

使用`@method` 装饰器来标记任何打算在链上运行的方法。

与属性一样，智能合约也可以有两种方法：

1. 带有 `@method` 装饰器：这些方法只能调用同样由 `@method` 装饰器装饰的方法。此外，只能访问由 `@prop` 装饰的属性。

2. 没有 `@method` 装饰器：这些方法只是常规的 TypeScript 类方法。没有限制。

`@methed` 方法分为两种:

### 1. 公共 `@methed` 方法

每个合约必须至少有一个公共 `@method` 方法。它用 `public` 修饰符表示并且不返回任何值。它在合约外可见，并充当合约中的主要方法（如 C 和 Java 中的 `main` 方法）。

可以从外部事务调用公共 `@method` 方法。如果方法中所有 `assert()` 满足条件，则调用成功。一个例子如下所示。

```ts
@method()
public unlock(x: bigint) {
    // only succeeds if x is 1
    assert(this.add(this.x, 1n) === x, "unequal");
}
```

注意： 

公共 `@methed` 方法最后一个函数调用必须是一个 `assert()` 函数调用，除非他是一个 `console.log()` 调用。

### 非公共 `@methed` 方法

如果没有 `public` 修饰符，则是一个非公共 `@methed` 方法。非公共 `@methed` 方法是一个合约内部方法，只能在合约类中调用。

非公共 `@methed` 方法必须显示地声明类型。例如:

```js
@method()
add(x0: bigint, x1:bigint) : bigint {
    return x0 + x1;
}
```


## 实战演习

`TicTacToe` 合约中有 3 个 `@methed` 方法：

1. 公共 `@methed` 方法 `move()` : Alice 和 Bob 各自将 X 个比特币锁定在包含上述合约的一个 UTXO 中。 接下来，他们通过调用公共 `@methed` 方法 `move()` 交替玩游戏。 有 `3` 个参数，分别表示：

-  `n` : `bigint` 类型，表示在棋盘上哪个位置下棋
-  `sig` : `Sig` 类型，表示玩家的签名
-  `amount` : `bigint` 类型，表示减去交易手续费后的合约余额


2. 非公共 `@methed` 方法 `won()` : 检查是否有玩家已经赢得比赛，他将能取走所有合约锁定的赌注。返回 `boolean` 类型，有 `1` 个参数：

-  `play` : `bigint` 类型，表示玩家


3. 非公共 `@methed` 方法 `full()` : 检查棋盘所有格子是否都有棋子了，如果没人赢得比赛，则两个人平分赌注。 返回 `boolean` 类型，无参数。

1. 为 `TicTacToe` 合约 添加以方法

2. 为 `move` 方法 添加 `assert()` 断言，要求函数参数 `n` 必须大于等于 `0n`， 且小于 `9n`

