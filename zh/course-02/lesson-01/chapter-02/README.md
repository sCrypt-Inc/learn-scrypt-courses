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


## 比特币上的 zk-SNARK

zk-SNARK（零知识简洁非交互式知识论证）是一种旨在为任何数学函数生成 ZKP 的协议。

生成的证明是“简洁的”和“非交互的”：一个证明只有几百字节，可以在恒定时间内在几毫秒内得到验证，无需向证明者提出额外的问题。这些特性共同使 zk-SNARK 特别适用于区块链，其中链上存储和计算可能很昂贵，并且发送者在发送交易后经常会离线。匿名加密货币 [Zcash](https://z.cash/technology/zksnarks.html) 和智能合约平台 [Ethereum](https://github.com/ethereum/wiki/wiki/Byzantium-Hard-Fork-changes) 是其值得注意的早期采用者之一。

一个 zk-SNARK 由以下三种算法组成：

1. 密钥生成算法
2. 证明者算法
3. 验证者算法


### 1. 密钥生成

密钥生成器 `G` 采用秘密参数 `λ` 和函数 `C`，并生成证明密钥 `pk` 和验证密钥 `vk`。两个密钥都是公开的。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/12.png?raw=true" width="600">


`C` 是一个布尔函数（也称为程序或电路），它接受两个输入：公共输入 `x` 和私有输入 `w`（又名见证人）。例如，`C` 可以是一个检查 `w` 是否是摘要 `x` 的 sha256 原像的函数。

```
C(x, w) = sha256(w) == x
```

### 2. 证明者

证明者 `P` 将证明密钥 `pk`、公共输入 `x` 和私人证人 `w` 作为输入，以生成证明者知道证人 `w` 的证明，证人 `w` 使得 `C(x, w)` 评估为真。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/13.png?raw=true" width="600">

### 3. 验证者

验证者 `V` 获取验证密钥 `vk`、证明和公共输入 `x`，并且仅当证明是根据见证人 `w` 的生成时才接受。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/14.png?raw=true" width="600">

## 实现
在区块链中使用 zk-SNARK 时，密钥和证明的生成都是在链下执行的。只有通用验证算法在链上智能合约中运行。

我们实现了使用最广泛的方案 [Groth16](https://eprint.iacr.org/2016/260.pdf)，因为它的[证明大小较小且可以快速验证](http://www.zeroknowledgeblog.com/index.php/groth16)。 我们还实现了 [PLONK](https://xiaohuiliu.medium.com/how-plonk-works-part-1-bc8050f4805e)，它不需要为每个电路进行新的可信设置。

完整代码在这里：

- [Groth16](https://github.com/sCrypt-Inc/boilerplate/blob/master/contracts/zksnark.scrypt)
- [PLONK](https://github.com/sCrypt-Inc/boilerplate/blob/master/contracts/plonk.scrypt)
