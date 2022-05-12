# 第六章: 比特币脚本语言

本章和下一章都是第八章的背景知识。

## UTXO 模型

比特币被“锁”在交易的输出中。要想在另一个交易中花费它，其输入中必须含有匹配的“钥匙”。只有钥匙能打开锁时，比特币才能被转移到新的输出中。这就是所谓的 UTXO（Unspent Transaction Outputs） 模型。如下图所示，两个交易各有一个输入和输出。右边的交易输入花费左边交易的输出。


<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/02.png?raw=true" width="600">

## 比特币脚本语言Script

锁和钥匙都是用比特币脚本语言[Script](https://wiki.bitcoinsv.io/index.php/Script)表示。它是[比特币虚拟机](https://blog.csdn.net/freedomhero/article/details/106801904)的指令集，是一种类似于汇编的低级语言。锁和钥匙里脚本分别被称为锁定脚本和解锁脚本。输出由两部分组成：锁定脚本和以 satoshis 表示的比特币数量。

## Script与sCrypt

sCrypt是一种高级语言，编译生成Script。两者的关系类似于Java和[Java虚拟机](https://en.wikipedia.org/wiki/Java_virtual_machine)的字节码。具体来说，sCrypt里公共函数的参数对应解锁脚本，公共函数的函数体对应锁定脚本，如下图所示。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/01.png?raw=true" width="600">