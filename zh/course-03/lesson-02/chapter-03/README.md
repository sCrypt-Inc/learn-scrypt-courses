# 第三章: 实例化合约与部署合约

## 实例化合约

我们已经通过加载合约 *artifact* 文件得到了合约类 `Tictactoe`。 当用户点击开始按钮后，合约将使用两个玩家“alice”和“bob”的公钥进行初始化。 公钥可以通过 `Signer`的 `getDefaultPubKey()` 接口获取。

下面代码实例化合约并调用 `markAsGenesis()` 将合约标识为有状态合约，并准备好部署。

```ts
const startGame = async (amount: number) => {
  try {
    const signer = signerRef.current as SensiletSigner;

    const pubkey = await signer.getDefaultPubKey()

    const instance = new TicTacToe(
      PubKey(toHex(pubkey)),
      PubKey(toHex(pubkey))
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
    changeAddress?: AddressOption;
    pubKeyOrAddrToSign?: PublicKeysOrAddressesOption;
}): Promise<TransactionResponse>;
```

- `amount`: 表示部署时合约锁定的余额
- `options`: 是可选参数，支持自定义找零地址，以及指定使用的公钥地址或公钥对应的私钥来签名交易。

## 实战演习

调用合约实例的 `deploy()` 方法来部署合约。在此之前需要先连接一个 `Signer` 或者 `Provider`。