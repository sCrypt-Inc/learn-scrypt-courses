# 第八章: 维护游戏状态

## 链式保持状态

在 UTXO 模型中，合约可以通过将其状态存储在锁定脚本中来实现链式保持状态。 在下面的例子中，合约从 `state0` 转换到 `state1`，然后到再转换到 `state2`。 交易 1（`tx1`）中的输入在 `tx0` 中花费了 UTXO，而 `tx2` 花费了 `tx1`。

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/06.png?raw=true)

那么如何确保交易在构建时，锁定脚本包含正确的状态，以确保链式保持状态呢？这需要用到 `ScriptContext`。

## ScriptContext

在 UTXO 模型中，验证的上下文是正在花费的 UTXO 和花费交易，包括它的输入和输出。 在下面的示例中，当交易 `tx1` 的第二个输入花费 `tx0` 的第二个输出时，位于 `tx0` 第二个输出中的智能合约的上下文大致，即 [ScriptContext](https://scrypt.io/scrypt-ts/getting-started/what-is-scriptcontext)，是用红色圈出 UTXO 和用红色圈出的 `tx1`。

![](https://scrypt.io/scrypt-ts/assets/images/scriptContext-a3ace5522bf62d82d20958735c13ddf4.jpg)


您可以在任何公共方法中通过 `this.ctx` 直接访问 `ScriptContext`。 它可以被认为是公共方法在调用时获得的附加信息，除了它的函数参数。下面以一个[简单的计数器合约](https://github.com/sCrypt-Inc/scryptTS-examples/blob/master/src/contracts/counter.ts)，展示如何通过 `ScriptContext` 在合约中维护状态。该合约实现维护一个单一状态：自部署以来它被调用了多少次。

## 第一步

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

## 第二步

当您准备好将新状态保存到当前交易的 `output[s]` 输出中的锁定脚本时，只需调用为每个合约自动生成的内置函数 `this.buildStateOutput()`。

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

        // make sure balance in the contract does not change
        const amount: bigint = this.ctx.utxo.value
        // output containing the latest state
        const output: ByteString = this.buildStateOutput(amount)
    }
}
```



## 第三步
确保当前交易的输出必须包含这个新状态。 如果 `ScriptContext` 中的 `hashOutputs` 哈希值与当前交易中所有输出的哈希值相同，我们可以确定当前交易的输出与我们在合约中构建的输出一致。 因此，包括更新的合约状态。


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

        // make sure balance in the contract does not change
        const amount: bigint = this.ctx.utxo.value
        // output containing the latest state
        const output: ByteString = this.buildStateOutput(amount)
        // verify current tx has this single output
        assert(this.ctx.hashOutputs == hash256(output), 'hashOutputs mismatch')
    }
}
```

## 实战演习

1. 更新 `TicTacToe` 合约的状态属性 `board` 和 `isAliceTurn` 以确保玩家移动了棋子
2. 使用 `this.ctx.hashOutputs` 确保交易包含预期输出