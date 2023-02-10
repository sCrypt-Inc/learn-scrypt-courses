# 第五章: 基本数据类型和属性

## 基本数据类型
`TicTacToe` 合约使用的基本数据类型包括：

1. `boolean`: 布尔值，取值 `true` 或者 `false`

2. `bigint`: 带符号的整数

3. `PubKey`：公钥

4. `Sig`：签名


其中， `PubKey` 和 `Sig` 是 `ByteString` 类型的子类型。如果你想了解更多的基本类型，可以查看[语言参考文档](https://scrypt.io/scrypt-ts/getting-started/how-to-write-a-contract#data-types) 


## 数组

数组是相同基本类型的固定大小的值列表。数组元素使用逗号分割。当你声明一个数组时，你必须使用 `FixedArray<T, N>`。`T` 是类型，`N` 是数组大小。

```ts
let a: FixedArray<bigint, 3> = [0n, 1n, 2n];
let b: FixedArray<boolean,  3> = [false, false && true, (1n > 2n)];
let arr2D: FixedArray<FixedArray<bigint,  3> , 2>  = [[11n, 12n, 13n], [21n, 22n, 23n]];
```


## 属性

使用 `@prop(stateful: boolean = false)` 装饰器标记的成员变量称为属性。这个装饰器接受一个布尔参数。 默认情况下，它设置为 `false`，这意味着该属性在部署合约后无法更改。 如果该值为真，则该属性是所谓的有状态属性，其值可以在后续合约调用中更新。

没有 `@prop` 装饰器标记的成员变量是常规的 TypeScript 变量，其声明没有任何特殊要求。但是在使用 `@method` 装饰器装饰的方法中禁止访问这些成员变量。

属性对应的数据将被存储在区块链链上。一共有 `3` 中属性:

1. 无状态属性， 使用 `@prop()` 标记
2. 有状态属性， 使用 `@prop(true)` 标记
3. 静态属性， 使用 `@prop()` 标记， 同时带有 TypeScript 的 `static` `readonly` 修饰符

```ts
class Test extends SmartContract {
  @prop()
  x: bigint;

  @prop(true)
  y: FixedArray<boolean, 2>;

  @prop(false)
  z: ByteString;

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

井字棋游戏合约支持两个玩家，需要保存两个玩家的公钥地址。在合约运行结束后，如果游戏不是以平局结束，合约自动将锁定的比特币打给赢家。

1. 添加以下合约属性：

- 添加两个无状态属性 `alice` 和 `bob`，数据类型都是 `PubKey`。
    * `alice`: 数据类型是 `PubKey`。它表示是玩家 `alice` 的公钥。
    * `bob`: 数据类型是 `PubKey`。它表示是玩家 `bob` 的公钥。
- 添加两个有状态属性:
    * `is_alice_turn`: 数据类型是 `boolean`。它表示是否轮到玩家 `alice` 下棋。
    * `board`: 数据类型是长度为 `9` 的定长数组 `FixedArray<bigint, 9>`。它表示当前棋盘各个位置的落子情况。
- 添加静态属性 `EMPTY`，类型为 `bigint`，值为 `0n`。它表示该棋盘位置还未落子
- 添加静态属性 `ALICE`，类型为 `bigint`，值为 `1n`。它表示该棋盘位置被玩家 `alice` 落子
- 添加静态属性 `BOB`，类型为 `bigint`，值为 `2n`。它表示该棋盘位置被玩家 `bob` 落子

2. 在构造函数中初始化所有非静态属性





