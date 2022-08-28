# 第 2 章：零知识证明基础

## 零知识证明

零知识证明让声称知道秘密的一方（即证明者）说服另一方（即验证者）该声明是有效的，同时不泄露秘密。

## 沃尔多在哪里？

寻找沃尔多是一款游戏，您必须在一大堆长得像他的人中找到沃尔多。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/06.png?raw=true" width="600">

Peggy（证明者）告诉 Victor（验证者）她知道沃尔多在场景中的位置，但她不想告诉他沃尔多到底在哪里。Peggy找到一大块硬纸板，在中间切了一个沃尔多形状的洞。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/07.png?raw=true" width="600">

然后，她拍摄了沃尔多在哪里的场景（在一张纸上）并将其粘贴到纸板的背面，这样沃尔多就占据了中心的沃尔多形状的洞。当 Peggy 给它贴胶带时，Victor 应该站在纸板前面。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/08.png?raw=true" width="600">

当 Victor 通过洞看到沃尔多时，他确信Peggy的说法是有效的，但他不知道沃尔多的确切位置。这就是零知识证明。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/09.png?raw=true" width="600">


## 比特币上的 zk-SNARKs

zk-SNARK（零知识简洁非交互式知识论证）是一种旨在为任何数学函数生成 ZKP 的协议。

生成的证明是“简洁的”和“非交互的”：一个证明只有几百字节，可以在恒定时间内在几毫秒内得到验证，无需向证明者提出额外的问题。这些特性共同使 zk-SNARK 特别适用于区块链，其中链上存储和计算可能很昂贵，并且发送者在发送交易后经常会离线。匿名加密货币 [Zcash](https://z.cash/technology/zksnarks.html) 和智能合约平台 [Ethereum](https://github.com/ethereum/wiki/wiki/Byzantium-Hard-Fork-变化）是其值得注意的早期采用者之一。

一个 zk-SNARK 由以下三种算法组成：

1. 密钥生成算法
2. 证明者算法
3. 验证者算法

在区块链中使用 zk-SNARK 时，密钥和证明的生成都是在链下执行的。只有通用验证算法在链上智能合约中运行。

我们实现了使用最广泛的方案 [Groth16](https://eprint.iacr.org/2016/260.pdf)，因为它的[证明大小较小且可以快速验证](http://www.zeroknowledgeblog.com/index .php/groth16)。完整代码在 [这里](https://github.com/sCrypt-Inc/boilerplate/blob/master/contracts/zksnark.scrypt)。