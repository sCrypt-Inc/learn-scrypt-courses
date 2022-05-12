# 第九章: 签名验证

`move()` 函数的 `sig` 参数是玩家的签名。由于没有对签名进行验证，任何人都可以调用合约的 `move()` 方法来移动棋子。

签名验证一般使用内置函数 `bool checkSig(Sig sig, PubKey pk)`。支付到公钥哈希是比特币网络中最常见的执行签名验证的合约。

```js
contract P2PKH {
    Ripemd160 pubKeyHash;

    public function unlock(Sig sig, PubKey pubKey) {
        require(hash160(pubKey) == this.pubKeyHash);
        require(checkSig(sig, pubKey));
    }
}
```

支付到公钥哈希的签名和公钥都是从解锁参数传入。`TicTacToe` 合约只有签名是从解锁参数传入，玩家的公钥已经存储在合约的`PubKey alice` 和 `PubKey bob` 两个属性中。


## 实战演习

1. 验证 `move()`函数 的 `sig` 签名参数。