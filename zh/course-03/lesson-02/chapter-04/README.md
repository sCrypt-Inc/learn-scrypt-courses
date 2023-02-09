# 第四章: 调用合约

接下来就是开始下棋了，每下一步棋，就是对合约的一次调用，并触发合约状态的改变。Web 应用程序与合约的交互主要发生在这个阶段。

调用合约需要完成以下工作:

1. 通过当前实例的 `.next()` 方法创建一个新的合约实例。使用最新的游戏数据 `gameData` 更新新实例的状态。

2. 通过 `bindTxBuilder` 方法为 `TicTacToe` 合约的 `move()` 方法添加交易构建器在交易构建器中构建调用合约的交易。

3. 最后调用合约实例上的 `methods` 公共方法来发送交易以执行区块链上的合约。

4. 完成调用后，需要把新的合约实例保存起来，以便继续调用合约。

以上几个步骤的代码实现:

```ts
// 1. create nextInstance
const current = props.contract as TicTacToe;
const nextInstance = current.next();
// update nextInstance state
Object.assign(nextInstance, Utils.toContractState(latestGameData));

// 2. bind a tx builder for move
TicTacToe.bindTxBuilder('move', async (options: BuildMethodCallTxOptions<SmartContract>, n: bigint, sig: Sig) => {
    ...
}

// 3. call contract.methods.move(...) to broadcast transaction
const {tx, next} = await current.methods.move(
    n,
    signature
);

// 4. save latest contract instance
props.setContract(next?.instance)
```

至此，我们就完成了TicTacToe合约与webapp的交互。玩家的每一次下棋动作都会在区块链上产生相应的交易。

## 实战演习

1. 游戏未结束时，需要添加一个包含游戏最新状态的输出。
2. 调用合约的公共方法，如果公共方法的某个参数是 `Sig` 类型，则需要通过回调函数来返回签名。
