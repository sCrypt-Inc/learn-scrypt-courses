# 第十七章: 合约状态

有状态合约的锁定脚本分为数据和代码。数据部分就是状态。代码部分则包含了状态转换规则，也就是合约的商业逻辑。

![](https://img-blog.csdnimg.cn/20200712230128735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

为了管理状态，从而要求锁定脚本的代码部分不能变（即合约规则不能变），数据（状态）部分的变化则必须符合代码部分规定的状态转换规则。


## 实战演习
实现一个包含状态的计数器合约：


1. 添加下面代码从原象中解析出合约的当前状态。

```solidity
bytes scriptCode = Util.scriptCode(txPreimage);
int scriptLen = len(scriptCode);
int counter = unpack(scriptCode[scriptLen - 1 :]);
```

2. 为合约计算新的状态，并生成新状态对应的锁定脚本：
```
bytes scriptCode_ = scriptCode[: scriptLen - 1] + num2bin(counter + 1, 1);
bytes output = Util.buildOutput(scriptCode_, amount);
```

3. 最后我们添加约束，以确保交易的输出就是合约逻辑要求的输出：

```solidity
bytes hashOutputs = Util.hashOutputs(txPreimage);
require(hashOutputs == hash256(output));
```
