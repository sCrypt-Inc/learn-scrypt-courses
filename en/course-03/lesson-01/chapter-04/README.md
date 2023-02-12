# Chapter 4: sCrypt Smart Contracts

A smart contract is a class that extends the `SmartContract` base class. A simple example is shown below.

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

Class members decorated with `@prop()` and `@method()` will end up on the blockchain and thus must be a strict subset of TypeScript. Undecorated members are regular TypeScript and won't be on-chain. A significant advantage of `sCrypt` is that both on-chain and off-chain code are written in the same language: TypeScript.

## Constructor

A smart contract must have an explicit constructor if it has at least one `@prop`.

The `super()` method must be called in the constructor and all the arguments of the constructor should be passed to `super` in the same order as they are passed into the constructor. For example,


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

[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) is an array containing the values of the arguments passed to that function. `...` is the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).