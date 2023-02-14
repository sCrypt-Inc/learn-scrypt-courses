# 第七章: 签名验证

部署游戏合约后，任何人都可以查看并可能与之交互。我们需要一种身份验证机制，以确保只有所需的玩家才能在轮到他们时更新合约。这使用数字签名来实现的。

下面例子是比特币网络中最常见的合约：[支付到公钥哈希](https://learnmeabitcoin.com/technical/p2pkh)(Pay to Public Key Hash: P2PKH)，即通常所说的比特币地址。

```ts
export class P2PKH extends SmartContract {
    // Address of the recipient.
    @prop()
    readonly pubKeyHash: PubKeyHash

    constructor(pubKeyHash: PubKeyHash) {
        super(...arguments)
        this.pubKeyHash = pubKeyHash
    }

    @method()
    public unlock(sig: Sig, pubkey: PubKey) {
        // Check if the passed public key belongs to the specified address.
        assert(hash160(pubkey) == this.pubKeyHash, 'public key hashes are not equal')
        // Check the signatures validity.
        assert(this.checkSig(sig, pubkey), 'signature check failed')
    }

```

`this.checkSig()` 用于根据公钥验证签名。

## 实战演习

1. 验证 `move()` 的 `sig` 参数是否与当前玩家存储在合约属性中的公钥匹配。