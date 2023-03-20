# 第五章: 数据类型和 `@prop` 装饰器

## 数据类型
`TicTacToe` 合约使用的基本数据类型包括：

1. `boolean`: `true` 或者 `false`

2. `bigint`: 任意大的有符号整数

3. `PubKey`：公钥

4. `Sig`：签名

5. `ByteString`: 字节数组


如果您想了解更多数据类型，可以参考[文档](https://scrypt.io/docs/how-to-write-a-contract/#data-types)。


## 数组

`sCrypt` 只允许固定大小的数组。声明数组时，必须使用 `FixedArray<T, N>`。 `T` 是数组元素的类型，`N` 是数组大小。

```ts
let a: FixedArray<bigint, 3> = [0n, 1n, 2n];
let b: FixedArray<boolean,  3> = [false, false && true, (1n > 2n)];
```


## `@prop` 装饰器

使用这个装饰器来标记任何打算存储在链上的属性。 装饰器接受一个布尔参数。 默认情况下，它设置为 `false`，这意味着部署合约后无法更改该属性。 如果为 `true`，则该属性是所谓的 [stateful](https://scrypt.io/docs/how-to-write-a-contract/stateful-contract) 属性，其值可以在后续合约调用中更新。 `@prop` 中只能修饰[特定类型](https://scrypt.io/docs/how-to-write-a-contract/#data-types)。

没有 `@prop` 装饰器标记的成员变量是常规的 TypeScript 变量，其声明没有任何特殊要求。但是在使用 `@method` 装饰器装饰的方法中禁止访问这些成员变量。

```ts
class Test extends SmartContract {
  @prop()
  x: bigint;

  @prop(true)
  y: FixedArray<boolean, 2>;

  @prop(false)
  z: ByteString;

  // define a constant
  @prop()
  static readonly N: bigint = 3n;  // suffix `n` means bigint literal.

  constructor(x: bigint, y: FixedArray<boolean, 2>, z: ByteString) {
    super(...arguments);
    this.x = x;
    this.y = y;
    this.z = z;
  }

  @method()
  public unlock(x: bigint) {
    assert(this.x === x, "incorrect input x");
  }
}
```


## 实战演习

井字棋游戏合约支持两个玩家，需要保存两个玩家的公钥地址。

1. 添加以下合约属性：

- 添加两个无状态属性 `alice` 和 `bob`，数据类型都是 `PubKey`。
- 添加两个有状态属性:
  * `is_alice_turn`: 数据类型是 `boolean`。它表示是否轮到玩家 `alice` 下棋。
  * `board`: 数据类型是长度为 `9` 的定长数组 `FixedArray<bigint, 9>`。它表示当前棋盘各个位置的落子情况。
- 三个常量:
  * `EMPTY`，类型为 `bigint`，值为 `0n`。它表示该棋盘位置还未落子
  * `ALICE`，类型为 `bigint`，值为 `1n`。它表示该棋盘位置被玩家 `alice` 落子
  * `BOB`，类型为 `bigint`，值为 `2n`。它表示该棋盘位置被玩家 `bob` 落子

2. 在构造函数中初始化所有非静态属性。具体来说，整个棋盘一开始是空的。





