# 第四章: 调用合约

接下来就是开始下棋了。每下一步棋，就是对合约的一次调用，并触发合约状态的改变。Web 应用程序与合约的交互发生在这个阶段。

调用合约需要完成以下步骤:

1. 通过当前实例的 `.next()` 方法创建一个新的合约实例。将新实例的状态更新到最新。

2. 通过 `bindTxBuilder` 方法为 `TicTacToe` 合约的 `move()` 方法添加一个构建调用合约的交易 `Builder`。

3. 最后调用合约实例上的 `methods` 公共方法来发送交易以执行区块链上的合约。每个公共方法 `xxx` 在 `instance.methods.xxx` 下都有一个同名的函数。它采用相同的参数，外加一个 `MethodCallOptions` 参数。

如果公共方法的某个参数是 `Sig` 类型，则需要通过回调函数来返回签名。合约连接的 `Signer` 会使用默认私钥进行签名，并将签名结果通过回调函数的参数 `sigResponses` 返回。使用 `findSig()` 查找与一个公钥关联的签名。

通过 `MethodCallOptions` 中 `pubKeyOrAddrToSign` 可以指定 `Signer` 使用哪个公钥地址或公钥进行签名。

```ts
const { tx: callTx } = await p2pkh.methods.unlock(
    (sigResponses: SignatureResponse[]) => findSig(sigResponses, $publickey),
    $publickey,
    {
        pubKeyOrAddrToSign: $publickey
    } as MethodCallOptions<P2PKH>
);
```


4. 完成调用后，需要把新的合约实例保存起来，以便继续调用合约。

以上几个步骤的代码实现:

```ts
// 1. create nextInstance
const current = props.contract as TicTacToe;
const nextInstance = current.next();
// convert latest game data to contract state with Utils.toContractState and update nextInstance state
Object.assign(nextInstance, Utils.toContractState(latestGameData));

// 2. bind a tx builder for move
TicTacToe.bindTxBuilder('move', async (options: BuildMethodCallTxOptions<SmartContract>, n: bigint, sig: Sig) => {
    ...
}

// 3. call contract.methods.move(...) to broadcast transaction
const {tx, nexts} = await current.methods.move(
    BigInt(i),
    (sigResponses: SignatureResponse[]) => findSig(sigResponses, $publickey),
);

// 4. save latest contract instance
props.setContract(nexts?.instance)
```

至此，我们就完成了TicTacToe合约与webapp的交互。玩家的每一次下棋动作都会在链上产生相应的交易。

## 实战演习

1. 游戏未结束时，需要添加一个包含游戏最新状态的输出。
2. 调用合约的公共方法来广播调用合约的交易。
