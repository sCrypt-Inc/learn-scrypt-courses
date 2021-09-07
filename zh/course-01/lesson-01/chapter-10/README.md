# 第十章: 检查原象与访问交易上下文

## 比特币签名验证

`OP_CHECKSIG` 是比特币签名专门用来验证 [ECDSA 签名](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) 的操作码。理论上讲，它包括两个步骤：

1. 根据当前交易计算出一个哈希值。
2. 对这个哈希值进行签名校验。

## 原象 (SighashPreimage)

交易原象并不是完整的当前交易数据，而是由完整的当前交易生成的原象。比特币的签名实际上是对交易的原象的哈希做签名。

[原象格式](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md#digest-algorithm)规定如下：

![](https://img-blog.csdnimg.cn/20200712222718698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

## 检查原象
sCrypt 实现了 [OP_PUSH_TX](https://blog.csdn.net/freedomhero/article/details/107306604?spm=1001.2014.3001.5501) 算法，并把它封装成标准合约函数 `Tx.checkPreimage`，用于校验传入参数是否为当前交易的原象。

```solidity
contract OP_PUSH_TX {
    public function unlock(SigHashPreimage preimage) { 
        require(Tx.checkPreimage(preimage));
    }
}
```


## 访问交易上下文

通过 `Tx.checkPreimage` 确保原象是当前交易的原象。由于原象包含交易的相关数据，这样就能通过访问原象中的各个字段来访问当前交易的上下文，比如访问当前交易的 `nLocktime`。

```solidity
static function nLocktimeRaw(SigHashPreimage txPreimage) : bytes {
    int l = len(txPreimage);
    return txPreimage[l - 8 : l - 4];
}

```

访问被当前交易调用的合约锁定脚本 `scriptCode`

```solidity
static function scriptCode(SigHashPreimage txPreimage) : bytes {
    return Util.readVarint(txPreimage[104 : ]);
}

```


## 实战演习

`TicTacToe` 合约是一个带状态的合约。通过交易不断地调用公共方法 `move`，触发合约的执行，从而更新状态。
因此必须使用 **OP_PUSH_TX** 技术来维护合约的状态。

1. 检查 `move` 方法的最后一个参数 `txPreimage` 是否当前交易的原象。

2. 使用通过原象读取到被当前交易调用的合约锁定脚本 `scriptCode`

