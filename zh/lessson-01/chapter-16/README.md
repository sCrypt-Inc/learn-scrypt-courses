# 第十六章: OP_PUSH_TX

## 交易原象 (SighashPreimage)

[格式](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md#digest-algorithm)规定如下：

![](https://img-blog.csdnimg.cn/20200712222718698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

**OP_PUSH_TX** 可以用来验证原象是否是当前交易的原象。

sCrypt 实现了 **OP_PUSH_TX** 算法，并把它封装成标准合约函数 `Tx.checkPreimage`，用于校验传入参数是否为当前交易的原象。

```solidity
contract OP_PUSH_TX {
    public function unlock(SigHashPreimage preimage) { 
        require(Tx.checkPreimage(preimage));
    }
}
```

由于原象包含交易的相关数据，这样就能通过访问原象中的各个字段来访问当前交易中的一些相关数据，比如当前交易的 `nLocktime`。

```solidity
static function nLocktimeRaw(SigHashPreimage preimage) : bytes {
    int l = len(preimage);
    return preimage[l - 8 : l - 4];
}
```


## 实战演习

1. 检查解锁参数 `sighashPreimage` 是否当前交易的原象。

