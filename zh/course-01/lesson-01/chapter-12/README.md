# 第十二章: 合约状态

有状态合约的锁定脚本分为数据和代码。数据部分就是状态。代码部分则包含了状态转换规则，也就是合约的业务逻辑。

![](https://img-blog.csdnimg.cn/20200712230128735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

为了管理状态，我们要求合约的代码部分不能变（即合约规则不能变），数据（状态）部分的变化则必须符合代码部分规定的状态转换规则。下面是一个简单的[计数器合约](https://github.com/sCrypt-Inc/boilerplate/blob/master/contracts/counter.scrypt)。它的状态是公共函数``increment()``被调用的次数(初始值为0)，存储在锁定脚本的最后一个字节。

```
contract Counter {
    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));

        // deserialize state (i.e., counter value)
        bytes scriptCode = Util.scriptCode(txPreimage);
        int scriptLen = len(scriptCode);
        // counter is at the end
        int counter = unpack(scriptCode[scriptLen - Util.DataLen :]);

        // increment counter
        counter++;

        // serialize state
        bytes outputScript = scriptCode[: scriptLen - Util.DataLen] + num2bin(counter, Util.DataLen);
        
        bytes output = Util.buildOutput(outputScript, amount);
        // ensure output is expected: amount is same with specified
        // also output script is the same with scriptCode except counter incremented
        require(hash256(output) == Util.hashOutputs(txPreimage));
    }
}
```


## 反序列化状态
我们已经从合约的锁定脚本中解析出来合约当前的状态：`counter`。

```
// deserialize state (i.e., counter value)
bytes scriptCode = Util.scriptCode(txPreimage);
int scriptLen = len(scriptCode);
// counter is at the end
int counter = unpack(scriptCode[scriptLen - Util.DataLen :]);
```

## 更新状态
接下来我们需要更新这个状态。

```
// increment counter
counter++;
```

## 序列化状态
通常，更新完状态后，需要将新状态与代码部分拼接起来，得到包含新状态合约的锁定脚本，并构建一个包含该合约的交易输出。

```
// serialize state
bytes outputScript = scriptCode[: scriptLen - Util.DataLen] + num2bin(counter, Util.DataLen);
bytes output = Util.buildOutput(outputScript, amount);
```
  
## 约束交易输出
通过更新状态并序列化状态，我们已经生成了带新状态的合约。接下来我们需要要求当前交易的输出必须包含这个新合约。那么如何确保交易的输出包含此合约呢？

`Sighash` 原象中包含当前交易所有输出脚本的哈希，即 `hashOutputs`。如果该哈希值与我们在合约中构建的所有输出的哈希值一致，那我们就能确信交易的输出与我们在合约中构建的交易输出是一致，自然就包含了此合约。

通过以下代码约束了交易的输出：

```
// ensure output is expected: amount is same with specified
// also output script is the same with scriptCode except counter incremented
require(hash256(output) == Util.hashOutputs(txPreimage));
```