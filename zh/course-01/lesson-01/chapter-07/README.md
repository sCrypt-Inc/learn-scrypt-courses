# 第七章：获取 Sighash 原像

## Sighash 原像

在为比特币中的消息生成签名时，首先对消息生成哈希摘要，然后对摘要进行签名。 输入中被签名的哈希摘要（即结果签名所在的位置）称为其 sighash 原像。它大致由包含当前交易和它花费的 UTXO 。 在下面的示例中，`tx1` 中第一个输入的 sighash 原像用红色圈出。 请注意，不同的输入具有不同的 sighash 原像，即使它们在同一笔交易中，因为它们使用不同的 UTXO。

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/05.png?raw=true)

[其详细格式](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md#digest-algorithm) 如下:

     1. nVersion of the transaction (4-byte little endian)
     2. hashPrevouts (32-byte hash)
     3. hashSequence (32-byte hash)
     4. outpoint (32-byte hash + 4-byte little endian) 
     5. scriptCode of the input (serialized as scripts inside CTxOuts)
     6. value of the output spent by this input (8-byte little endian)
     7. nSequence of the input (4-byte little endian)
     8. hashOutputs (32-byte hash)
     9. nLocktime of the transaction (4-byte little endian)
    10. sighash type of the signature (4-byte little endian)

## 检查 Sighash 原像

如上一章所示，合约位于输出的锁定脚本中。要检查 sighash 原像是否是输入花费输出的原像，只需调用标准库 [Tx](https://scryptdoc.readthedocs.io/zh_CN/latest/contracts.html#library-tx) 合约的 `checkPreimage()` 函数。

例如，合约 `CheckLockTimeVerify` 确保合约中的币是时间锁定的，并且不能在时间达到 `matureTime` 之前花费。

```
contract CheckLockTimeVerify {
    int matureTime;

    public function spend(SigHashPreimage txPreimage) {
        // using Tx.checkPreimage() to verify txPreimage
        require(Tx.checkPreimage(txPreimage));

        require(SigHash.nLocktime(txPreimage) >= this.matureTime);
    }
}
```

## 实战演习

1. 使用 `Tx.checkPreimage()` 检查 `move()` 方法的 `txPreimage` 参数