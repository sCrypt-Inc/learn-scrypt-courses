# 第十二章: OP_PUSH_TX

## 交易原象 (SighashPreimage)

交易原象并不是完整的当前交易数据，而是由完整的当前交易生成的原象。比特币的签名实际上是对交易的原象的哈希做签名。

[原象格式](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md#digest-algorithm)规定如下：

![](https://img-blog.csdnimg.cn/20200712222718698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

**OP_PUSH_TX** 可以用来验证原象是否是当前交易的原象。

sCrypt 实现了 **OP_PUSH_TX** 算法，并把它封装成标准合约函数 `Tx.checkPreimage`，用于校验传入参数是否为当前交易的原象。通常我们在方法的第一个语句做这个检查。

```solidity
contract OP_PUSH_TX {
    public function unlock(SigHashPreimage preimage) { 
        require(Tx.checkPreimage(preimage));
    }
}
```


## 实战演习

`TicTacToe` 合约是一个带状态的合约。通过交易不断地调用公共方法 `move`，触发合约的执行，从而更新状态。
因此必须使用 **OP_PUSH_TX** 技术来维护合约的状态。

1. 检查 `move` 方法的最后一个参数 `txPreimage` 是否当前交易的原象。

