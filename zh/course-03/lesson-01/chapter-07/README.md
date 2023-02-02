# 第七章: 编译时常量

编译时常量，简称CTC，是一种特殊的变量，可以在编译时确定其值。其值必须是一个 `number` 字面量，不能是表达式或其它类型的值。

有 `3` 种定义 CTC 的方法：

## 一个 `number` 字面量

```ts
3;
110;
```

## 一个 `const` 变量

它的值必须是一个 `number` 字面量：

```ts
const N = 3; // valid
const M = 8; // valid
const E = 1 + 3; //invalid
```

注意，定义 CTC 时不能显示声明类型， 下面的定义是不是一个 CTC:

```ts
const N: number = 3; // invalid
```

## 一个 带有 `static` `readonly` 修饰符成员变量

定义 CTC 时不能使用 `@prop()` 装饰器标记。同样不能显示声明类型。

```ts
class X {
  static readonly N = 3; // valid
  static readonly N = 3 + 1; // invalid
  static readonly N: number = 3; // invalid
}
```

## CTC 使用场景

以下场景必须使用CTC:

1. 声明中的数组长度:

```ts
let arr1: FixedArray<bigint, N> = [1n, 2n];  // N is a const number: const N = 3;
let arr2: FixedArray<bigint, 3> = [1n, 2n, 3n];
let arr3: FixedArray<bigint, typeof Demo.N> = [1n, 2n, 3n]; // Demo.N is static readonly property
```

2. `for` 语句中的循环计数:

```ts
for(let i=0; i< 3; i++)
for(let i=0; i< N; i++)  // const N = 3;
for(let i=0; i< X.N; i++)  // static readonly N = 3;
```

## 实战演习

为 `TicTacToe` 合约添加以下 CTC:

1. 添加CTC `BOARDLEN`，值为 `9`。它表示存储棋盘状态的数组长度，井字棋游戏一共公有9个棋盘位置
2. 在有状态属性 `board` 的声明中使用 CTC `BOARDLEN`

