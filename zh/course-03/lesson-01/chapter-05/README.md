# 第五章: scryptTS 合约


合约就是去中心化应用 (dapp) 的基本模块。每个 **scryptTS** 合约都是一个 `SmartContract` 的子类:

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
    assert(this.add(this.x, 1n) === x, "x is not the expected unlocking script");
  }

  @method()
  add(x0: bigint, x1:bigint) : bigint {
    return x0 + x1;
  }
}
```

用 `@prop()` 和 `@method()` 装饰的类成员将最终出现在区块链上，因此必须是 TypeScript 的严格子集。 既没有装饰的成员是常规的 TypeScript，不会在链上。 `scryptTS` 的显着优势在于链上和链下代码都使用相同的语言编写：TypeScript。

## 实战演习

找到 `scrypt-cli` 默认创建的 `TicTacToe` 合约。 并将默认生成的方法和属性都删除，只保留一个空类。接下来我们一步一步实现 `TicTacToe` 合约。