# 第一章: scryptlib

完成上一节课以后，我们的井字棋 DApp 的 sCrypt 合约部分就完成了。现在我们来做一个基本的网页好让你的用户能玩它。 要做到这一点，我们将使用 sCrypt 官方发布的 JavaScript 库 —— [scryptlib](https://github.com/sCrypt-Inc/scryptlib).


scryptlib 用于集成以 sCrypt 语言编写的 Bitcoin SV 智能合约的 Javascript/TypeScript SDK。
通过 `scryptlib` ，你就能方便地编译，测试，部署，调用合约了。

使用 `scryptlib` 实例化和调用合约公共方法的代码看起来像；

```javascript
const Tictactoe = buildContractClass(runCompile('tictactoe.scrypt'));
const game = new Tictactoe(new PubKey(toHex(publicKeyAlice)), new PubKey(toHex(publicKeyBob)));
const result = game.move(n, new Sig(toHex(sig)), 10000, preimage).verify(context)
```

## 准备

你需要学习基础 **nodejs** 知识。我们假设你已经具备这些知识。`scryptlib` 可以通过 `npm` 安装。

```javascript
// 用 NPM
npm install scryptlib

// 用 Yarn
yarn add scryptlib
```




## 实战演习

我们为你建立了一个空文件 —— tictactoe.scrypttest.js。通过 **nodejs**  的 `require` 来引入 `scryptlib`。