# 第九章: 签名验证

`move()` 函数的 `sig` 参数是玩家的签名。假如没有对签名进行验证，任何人都可以调用合约的 `move()` 方法来移动棋子。

下面例子是比特币网络中最常见的合约：支付到公钥哈希。

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
        assert(
            hash160(pubkey) == this.pubKeyHash,
            'public key hashes are not equal'
        )
        // Check the signatures validity.
        assert(this.checkSig(sig, pubkey), 'signature check failed')
    }

```

支付到公钥哈希的签名和公钥都是从解锁参数传入。`TicTacToe` 合约只有签名是从解锁参数传入，因为玩家的公钥已经存储在合约的`PubKey alice` 和 `PubKey bob` 两个属性中。


## 实战演习

1. 验证 `move()`函数 的 `sig` 签名参数。