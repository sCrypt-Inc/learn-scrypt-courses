# 第一章: 课程概述

通过此课程，你将学会如何使用 [sCrypt](https://scrypt.io/scrypt-ts) 构建一个比特币上的井字棋dApp.

该应用程序非常简单。它所做的就是使用两个玩家(分别是 Alice 和 Bob)的比特币地址初始化合约，各自下注相同的金额锁定到合约中。只有赢得那个人可以取走合约里面的钱。如果最后没有人赢，则两个玩家各自可以取走一半的钱。

我们将逐步完成构建app，包括:

1. 开发环境搭建
2. 编写合约
3. App前端集成合约


## 最终的应用程序

在开始这个课程之前，你可以先试玩一下该游戏 [Go to Play](https://scrypt.io/tic-tac-toe)

井字棋游戏过程如下：

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/dapp.gif?raw=true)
