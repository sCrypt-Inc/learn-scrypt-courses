# 第二章: scryptTS 概述

## TypeScript 嵌入式领域特定语言

`scryptTS` 是一种基于 [Typescript](https://www.typescriptlang.org/) 的嵌入式领域特定语言 ([sDSL](https://en.wikipedia.org/wiki/Domain-specific_language#External_and_Embedded_Domain_Specific_Languages))，用于在比特币 SV 上编写智能合约。 嵌入式意味着它是另一种语言中的一种语言。 `scryptTS` 严格来说是 TypeScript 的子集，因此所有 `scryptTS` 代码都是有效的 TypeScript，但反之则不然。

我们选择 TypeScript 作为宿主语言，因为它提供了一种简单、熟悉的语言 (JavaScript)，但具有类型安全性，可以轻松开始编写安全的智能合约。 如果您已经熟悉 TypeScript/JavaScript，则无需学习新的编程语言或工具。 如果您是 TypeScript 的新手，请观看这个有用的介绍视频。


## 比特币智能合约如何运作？

比特币上的智能合约基于 UTXO 模型，这与以太坊使用的账户模型有很大不同。

### UTXO模型

每个比特币交易都包含一些输入和输出。一个输出则包含：

- 该输出包含的比特币数量。
- 一段计算机代码（称为锁定脚本）。

而输入则包含：

- 对先前交易输出的引用。
- 一段计算机代码（称为解锁脚本）。


未花费的交易输出 (UTXO) 是尚未在任何交易中使用的输出。底层计算机代码称为[比特币脚本](https://wiki.bitcoinsv.io/index.php/Script)。

![](https://scrypt.io/scrypt-ts/assets/images/utxo-a4cf31c29158072cdfbfae3366522ba5.jpg)


锁定脚本可以被视为一个布尔函数 `f`，它指定在 UTXO 中花费比特币的条件（因此名称为“锁定”），充当锁。解锁脚本依次提供使 `f` 计算结果为真的函数参数，即解锁所需的“密钥”（也称为见证）。只有当输入包含与先前输出的“锁”匹配的“密钥”时，它才能花费输出中包含的比特币。


在常规[比特币支付](https://wiki.bitcoinsv.io/index.php/Bitcoin_Transactions#Pay_to_Public_Key_Hash_.28P2PKH.29)中，包含[比特币地址](https://wiki.bitcoinsv.io/index.php/Bitcoin_address)的锁定脚本会检查支付者是否拥有正确的私钥，以便在解锁脚本中生成有效签名。

## scryptTS 是如何工作的？

`scryptTS` 是一种被编译成比特币脚本的高级语言。生成的类似程序集的脚本可以在构建交易时用作锁定脚本。