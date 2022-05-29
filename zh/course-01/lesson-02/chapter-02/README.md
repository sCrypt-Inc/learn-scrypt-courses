# 第二章: 集成 scryptlib


## 准备

需要注意的是这个 APP 界面将使用 JavaScript 来写，并不是 sCrypt。React App 项目 [tic-tac-toe](https://github.com/sCrypt-Inc/tic-tac-toe) 的 `webapp` 分支包含一个只有前端代码的井字棋游戏。
请克隆此项目并切换到 `webapp` 分支。我们假设你已经具备前端开发的基础知识，因此我们不会花时间来介绍这部分代码。

```
git clone -b webapp https://github.com/sCrypt-Inc/tic-tac-toe
```

##  scryptlib
dApp 需要在前端页面与合约进行交互。 要做到这一点，我们将使用 sCrypt 官方发布的 JavaScript 库 —— [scryptlib](https://github.com/sCrypt-Inc/scryptlib).

scryptlib 用于集成以 sCrypt 语言编写的 Bitcoin SV 智能合约的 Javascript/TypeScript SDK。

通过 `scryptlib` ，你就能方便地编译，测试，部署，调用合约了。

使用 `scryptlib` 实例化和执行合约公共方法的代码看起来像:

```javascript
const Demo = buildContractClass(loadDesc('demo_desc.json'));
const demo = new Demo(7, 4);

const result = demo.add(11).verify()
assert(result.success);
```


## scryptlib 安装


`scryptlib` 可以通过 `npm` 安装。

```javascript
// use NPM
npm install scryptlib

// use Yarn
yarn add scryptlib
```

## web3 工具类

这里我们为你提供了 [web3](https://github.com/sCrypt-Inc/tic-tac-toe/blob/7ae1eb8cb46bd8315d9c7d858b6a190ba3c4c306/src/web3/web3.ts) 工具类。该工具类提供了进行合约与网络交互的工具函数以及对钱包接口的封装。你可以直接使用 `web3.loadContract()` 从网络中加载合约描述文件。


## 实战演习

1. 在工程下创建 `contracts` 目录，并将上一节课我们编写的 `TicTacToe` 合约拷贝进去。使用 IDE 编译出合约描述文件 `tictactoe_release_desc.json` 并将其放在 `public` 目录。

2. 添加 `fetchContract` 函数，使用 `web3.loadContract()` 加载合约描述文件。

参考这个 [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/5cf4afb31925d141c201d28355ac7ab7597eb1d7)