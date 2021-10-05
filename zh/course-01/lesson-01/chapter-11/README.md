# 第十一章: 检查Sighash原象

## Sighash原象

比特币里使用的签名算法先对一个消息生成哈希摘要，然后对摘要进行签名。这里的消息被称为Sighash原象。这个原象主要是根据当前交易推算出来的。

[其具体格式](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md#digest-algorithm) 规定如下：

![](https://img-blog.csdnimg.cn/20200712222718698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

## 检查Sighash原象
sCrypt实现了 [OP_PUSH_TX](https://blog.csdn.net/freedomhero/article/details/107306604?spm=1001.2014.3001.5501) 算法，并把它封装成标准库函数 `Tx.checkPreimage`，用于校验传入参数是否为当前交易的Sighash原象。

```
contract OP_PUSH_TX {
    public function unlock(SigHashPreimage preimage) { 
        require(Tx.checkPreimage(preimage));
    }
}
```


## 实战演习

`TicTacToe` 合约是一个带状态的合约。通过交易不断地调用公共方法 `move`，触发合约的执行，从而更新状态。

1. 检查 `move` 方法的最后一个参数 `txPreimage` 是否当前交易的原象。
