# 第一章: scryptlib

完成上一节课以后，我们的井字棋 DApp 的 sCrypt 合约部分就完成了。
需要注意的是这个 APP 界面将使用 JavaScript 来写，并不是 sCrypt。我们假设你已经具备前端开发的基础知识，因此我们不会花时间来介绍这些技术的基础知识。

DApp 需要在前端页面与合约进行交互。 要做到这一点，我们将使用 sCrypt 官方发布的 JavaScript 库 —— [scryptlib](https://github.com/sCrypt-Inc/scryptlib).


scryptlib 用于集成以 sCrypt 语言编写的 Bitcoin SV 智能合约的 Javascript/TypeScript SDK。
通过 `scryptlib` ，你就能方便地编译，测试，部署，调用合约了。

使用 `scryptlib` 实例化和调用合约公共方法的代码看起来像；

```javascript
const Tictactoe = buildContractClass(runCompile('tictactoe.scrypt'));
const game = new Tictactoe(new PubKey(toHex(publicKeyAlice)), new PubKey(toHex(publicKeyBob)));
const result = game.move(n, new Sig(toHex(sig)), 10000, preimage).verify(context)
```

## 准备

`scryptlib` 可以通过 `npm` 安装。

```javascript
// 用 NPM
npm install scryptlib

// 用 Yarn
yarn add scryptlib
```




## 实战演习


首先我们使用 [create-react-app](https://github.com/facebook/create-react-app) 创建一个前端项目。

在  App.js。通过 **nodejs**  的 `import` 来引入 `scryptlib`。