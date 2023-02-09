# 第三章: 实例化合约与部署合约

## 实例化合约

我们已经通过加载合约 *artifact* 文件得到了合约类 `Tictactoe`。 当用户点击开始按钮后，通过此合约类来实例化合约。


实例化合约类 `Tictactoe` 需要两个玩家 `alice` 和 `bob` 的公钥。可以通过 `Signer` 的 `getDefaultPubKey()` 接口来获取公钥。由只有一个钱包，我们假设 `alice` 和 `bob` 都使用同一个公钥。

下面代码实例化合约并调用 `markAsGenesis()` 将合约标识为初始合约。

```ts
const startGame = async (amount: number) => {
  try {
    const signer = signerRef.current as SensiletSigner;

    const pubkey = await signer.getDefaultPubKey()

    const instance = new TicTacToe(
      PubKey(toHex(pubkey)),
      PubKey(toHex(pubkey)),
      true,
      [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n]
    ).markAsGenesis();

  } catch(e) {
    console.error('deploy TicTacToe failes', e)
    alert('deploy TicTacToe failes')
  }
};
```

每个合约实例都有一个 `deploy()` 方法:

```ts
deploy(amount?: number, options?: {
    changeAddress?: bsv.Address | string;
    address?: bsv.Address | string;
}): Promise<TransactionResponse>;
```

- `amount`: 表示部署时合约锁定的余额
- `options`: 是可选参数，支持自定义找零地址，以及使用的 `address` 对应的私钥来签名交易。

## 实战演习

调用合约实例的 `deploy()` 方法来部署合约。在此之前需要先连接一个 `Signer` 或者 `Provider`。