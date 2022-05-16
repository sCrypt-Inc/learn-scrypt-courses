# 第一章: scryptlib

完成上一节课以后，我们的井字棋 dApp 的 sCrypt 合约部分就完成了。

需要注意的是这个 APP 界面将使用 JavaScript 来写，并不是 sCrypt。React App 项目 [tic-tac-toe](https://github.com/sCrypt-Inc/tic-tac-toe) 的 `webapp` 分支包含一个只有前端代码的井字棋游戏。我们将从这个分支开始，一步步实现一个合约版的井字棋游戏。
。

我们假设你已经具备前端开发的基础知识，因此我们不会花时间来介绍它。
dApp 需要在前端页面与合约进行交互。 要做到这一点，我们将使用 sCrypt 官方发布的 JavaScript 库 —— [scryptlib](https://github.com/sCrypt-Inc/scryptlib).


scryptlib 用于集成以 sCrypt 语言编写的 Bitcoin SV 智能合约的 Javascript/TypeScript SDK。
通过 `scryptlib` ，你就能方便地编译，测试，部署，调用合约了。


## scryptlib 安装


`scryptlib` 可以通过 `npm` 安装。

```javascript
// use NPM
npm install scryptlib

// use Yarn
yarn add scryptlib
```

使用 `scryptlib` 实例化和调用合约公共方法的代码看起来像:

```javascript
const Demo = buildContractClass(compileContract('demo.scrypt'));
const demo = new Demo(7, 4);

const result = demo.add(11).verify()
assert(result.success);
```


## 实战演习

克隆 React App 项目 [tic-tac-toe](https://github.com/sCrypt-Inc/tic-tac-toe)。并切换到 `webapp` 分支。