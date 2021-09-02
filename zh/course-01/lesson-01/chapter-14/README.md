# 第十四章: 合约状态

有状态合约的原始字节分为数据和代码。数据部分就是状态。代码部分则包含了状态转换规则，也就是合约的业务逻辑。

![](https://img-blog.csdnimg.cn/20200712230128735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

为了管理状态，从而要求合约的代码部分不能变（即合约规则不能变），数据（状态）部分的变化则必须符合代码部分规定的状态转换规则。


## 实战演习

我们已经读取了 `TicTacToe` 的原始字节，现在我们从原始字节的数据部分解析出合约的两个状态：

1. 状态 `turn`，合约数据部分第一个字节。数据类型 `int`。表示当前轮到谁下棋
2. 状态 `board`，合约数据部分第二个字节开始，共9个字节。数据类型 `bytes`。表示棋盘状态。