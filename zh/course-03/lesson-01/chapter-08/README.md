# 第八章: 维护游戏状态

## ScriptContext

在 UTXO 模型中，验证的上下文是正在花费的 UTXO 和花费交易，包括它的输入和输出。 在下面的示例中，当交易 `tx1` 的第二个输入花费 `tx0` 的第二个输出时，位于 `tx0` 第二个输出中的智能合约的上下文大致，即 [ScriptContext](https://scrypt.io/docs/how-to-write-a-contract/scriptcontext)，是用红色圈出 UTXO 和用红色圈出的 `tx1`。

![](https://scrypt.io/assets/images/scriptContext-a3ace5522bf62d82d20958735c13ddf4.jpg)


您可以在任何公共 `@method` 中通过 `this.ctx` 直接访问上下文。它可以被认为是公共方法在调用时获得的附加信息，除了它的函数参数。此上下文在 ScriptContext 接口中表示。

```ts
export interface ScriptContext {
  /** the specific UTXO spent by this transaction input */
  utxo: UTXO,
  /** double-SHA256 hash of the serialization of some/all output amount with its locking script */
  hashOutputs: ByteString,

  ...
}
```

我们这里只显示相关字段。您可以在 [此处](https://scrypt.io/docs/how-to-write-a-contract/scriptcontext) 找到完整的定义。

## 状态合约

在比特币的 UTXO 模型中，智能合约默认是一次性的和无状态的，因为包含它的 UTXO 在被花费后被销毁。 无状态允许它轻松扩展，与 [HTTP](https://stackoverflow.com/questions/5836881/stateless-protocol-and-stateful-protocol) 相同。
智能合约可以通过要求包含相同合约但具有更新状态的支出交易的输出来模拟状态，这由 ScriptContext 启用。
这类似于通过使用 cookie 使 HTTP 看起来是有状态的。

我们将输出锁定脚本中的智能合约分为两部分：代码和状态，如下所示。 代码部分包含合同的业务逻辑，该合同对状态转换规则进行编码并且必须**不**更改。 当交易花费包含旧状态的输出并创建包含新状态的新输出，同时保持合约代码完整时，就会发生状态转换。
由于新输出包含相同的合约代码，因此其支出交易也必须保留相同的代码，否则将失败。 这个交易链可以一直持续下去，因此沿着链递归地维护状态。

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/07.png?raw=true)


## 计数器合约

以下是一个简单的有状态 [counter contract](https://github.com/sCrypt-Inc/scryptTS-examples/blob/master/src/contracts/counter.ts)。合约维护一个单一的状态：自部署以来它被调用了多少次。

### 第一步

使用装饰器 `@prop(true)` 声明有状态属性 `counter`。 您可以将**有状态属性**当作普通属性：读取和更新它。

```ts
export class Counter extends SmartContract {
    // Stateful prop to store counters value.
    @prop(true)
    count: bigint

    constructor(count: bigint) {
        super(...arguments)
        this.count = count
    }

    @method()
    public increment() {
        // Increment counter value
        this.count++
    }
}
```

### 第二步

当您准备好将新状态传递到当前支出交易中的输出时，只需调用内置函数 `this.buildStateOutput(amount)` 即可创建包含新状态的输出。 它需要一个输入：输出中聪的数量。 我们在示例中保持 `satoshis` 不变。

```ts
@method()
public increment() {
    // Increment counter value
    this.count++

    // make sure balance in the contract does not change
    const amount: bigint = this.ctx.utxo.value
    // output containing the latest state
    const output: ByteString = this.buildStateOutput(amount)
}
```



### 第三步

确保当前交易的输出必须包含这个新状态。 如果我们在合约中创建的所有输出（这里只有一个输出）散列到 `ScriptContext` 中的 `hashOutputs`，我们可以确定它们是当前交易的输出。因此，包含更新的合约状态。


```ts
@method()
public increment() {
    // Increment counter value
    this.count++

    // make sure balance in the contract does not change
    const amount: bigint = this.ctx.utxo.value
    // output containing the latest state
    const output: ByteString = this.buildStateOutput(amount)
    // verify current tx has this single output
    assert(this.ctx.hashOutputs == hash256(output), 'hashOutputs mismatch')
}
```

## 实战演习

1. 在玩家移动棋子后更新状态 `board` 和 `is_alice_turn`。
2. 使用 `this.ctx.hashOutputs` 确保调用交易包含预期的状态/输出。