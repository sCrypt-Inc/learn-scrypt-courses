# 第一章: 集成前端

完成上一节课以后，我们的井字棋 dApp 的 sCrypt 合约部分就完成了。接下来我们需要集成集成前端，这样用户可以在网页玩tic-tac-toe游戏。

## 准备

井字棋 dApp 的前端界面将使用 [Create React App](https://create-react-app.dev/) 来创建。

你可以使用 

```ts
npx create-react-app tic-tac-toe --template typescript
```

或者直接克隆我们已经创建好的[tic-tac-toe 仓库](https://github.com/sCrypt-Inc/tic-tac-toe)。该仓库的 `onlyweb` 分支包含一个未集成 `sCrypt`， 只有前端代码的井字棋游戏。我们假设你已经具备前端开发的基础知识，因此我们不会花时间来介绍这部分代码。

请克隆此项目并切换到 `onlyweb` 分支。

```
git clone -b onlyweb https://github.com/sCrypt-Inc/tic-tac-toe
```

##  安装 sCrypt 的 SDK

dApp 需要在前端页面与合约进行交互。 要做到这一点，我们将使用 sCrypt SDK —— [scryptTS](https://scrypt.io/scrypt-ts). 通过 sCrypt SDK，你就能方便地编译，测试，部署，调用合约了。

使用 `scrypt-cli` 命令行工具安装 sCrypt SDK。

```base
npx scrypt-cli init
```


或者通过 `npm` 或 `yarn` 安装。

```bash
// use NPM
npm install scrypt-ts

// use Yarn
yarn add scrypt-ts
```

通过 `npm` 或 `yarn` 安装后需要进行配置修改。参考这个[commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/42e25f3507a62231025c15b9926af5f0406a1ba4)。

## 编译合约

首先将我们上一节课编写的 `TicTacToe` 合约放到 `src/contracts` 目录下。运行以下命令编译合约:

```
npx scrypt-cli compile
```

编译成功会在合约所在目录看到输出的合约 *artifact* 文件 `tictactoe.json` 。合约 *artifact* 文件可用于初始化合约类。

通常我们需要在前端使用合约 *artifact* 文件初始化合约类。之后合约类才可用于实例化合约。


```ts
import { TicTacToe } from './contracts/tictactoe';
import artifact from './contracts/tictactoe.json';
TicTacToe.init(artifact);
```


## 实战演习

在 `index.tsx` 中导入合约 *artifact* 文件 `tictactoe.json`，并初始化合约类 `TicTacToe`。