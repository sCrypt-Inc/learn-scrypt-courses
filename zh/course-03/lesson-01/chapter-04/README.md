# 第四章: sCrypt 智能合约

## 合约基类 `SmartContract`

合约就是去中心化应用 (dapp) 的基本模块。每个 **sCrypt** 合约都是一个 `SmartContract` 的子类:

```js
import { SmartContract, method, prop, assert } from "scrypt-ts";

class Demo extends SmartContract {
  @prop()
  x: bigint;

  constructor(x: bigint) {
    super(...arguments);
    this.x = x;
  }

  @method()
  public unlock(x: bigint) {
    assert(this.add(this.x, 1n) === x, "incorrect input x");
  }

  @method()
  add(x0: bigint, x1:bigint) : bigint {
    return x0 + x1;
  }
}
```

用 `@prop()` 和 `@method()` 装饰的类成员将最终出现在区块链上，因此必须是 TypeScript 的严格子集。没有装饰的成员是常规的 TypeScript，不会在链上。 `sCrypt` 的显着优势在于链上和链下代码都使用相同的语言编写：TypeScript。

## 构造函数 `constructor`

如果智能合约包含至少有一个 `@prop`，则它必须有一个显式构造函数。

必须在构造函数中调用 `super()` 方法，并且构造函数的所有参数都应按照传递给构造函数的相同顺序传递给 `super()`。例如，

```ts
class A extends SmartContract {
  p0: bigint
  
  @prop()
  p1: bigint
  
  @prop()
  p2: boolean
  
  constructor(p0: bigint, p1: bigint, p2: boolean) {
    super(...arguments)  // same as super(p0, p1, p2)
    this.p0 = p0
    this.p1 = p1
    this.p2 = p2
  }
}
```

[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) 是一个数组，其中包含传递给该函数的参数值。 `...` 是 [spread 语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)。
