# 第十章: 检查原象

## 原象 (SighashPreimage)

比特币签名是对一个消息生成哈希摘要，然后对摘要进行签名。原象就是用于生成哈希摘要的消息。原象是根据当前交易推算出来的。

[原象格式](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md#digest-algorithm) 规定如下：

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


## 获取合约锁定脚本

通过 `Tx.checkPreimage` 确保原象是当前交易的原象。由于原象包含交易的相关数据，这样就能通过访问原象来访问被当前交易调用的合约的锁定脚本 `scriptCode`

```solidity
static function scriptCode(SigHashPreimage txPreimage) : bytes {
    return Util.readVarint(txPreimage[104 : ]);
}

```


## 实战演习

`TicTacToe` 合约是一个带状态的合约。通过交易不断地调用公共方法 `move`，触发合约的执行，从而更新状态。
因此必须使用 **OP_PUSH_TX** 技术来维护合约的状态。

1. 检查 `move` 方法的最后一个参数 `txPreimage` 是否当前交易的原象。

2. 获取合约的锁定脚本 `scriptCode`

