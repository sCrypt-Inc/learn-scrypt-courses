# 第一章: 集成 sCrypt

完成上一节课以后，我们的井字棋 dApp 的 sCrypt 合约部分就完成了。接下来我们需要集成 sCrypt。

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

dApp 需要在前端页面与合约进行交互。 要做到这一点，我们将使用 sCrypt 官方发布的 sCrypt SDK —— [scryptTS](https://scrypt.io/scrypt-ts).

`scryptTS` 是用于集成 sCrypt 智能合约的 Javascript/TypeScript SDK。

通过 `scryptTS` ，你就能方便地编译，测试，部署，调用合约了。

`scryptTS` 可以通过 `npm` 安装。

```bash
// use NPM
npm install scrypt-ts

// use Yarn
yarn add scryptlib
```

安装完成后， 需对 Create React App 项目 做简单的配置修改。

你可以参考这个 [commit]() 进行配置修改。

或者直接使用 `scrypt-cli` 命令行工具来安装 `scryptTS`。

```base
npx scrypt-cli install
```


## 编译合约

首先将我们上一节课编写的 `TicTacToe` 合约放到 `src/contracts` 目录下。运行以下命令编译合约:

```
npx scrypt-cli compile
```

编译成功会在合约所在目录看到输出的合约制品文件 `tictactoe.json` 。合约制品文件可用于初始化合约类。

通常我们需要在前端使用合约制品文件初始化合约类。之后合约类才可用于实例化合约。


```ts
import { TicTacToe } from './contracts/tictactoe';
import artifact from './contracts/tictactoe.json';
import { MergedArtifact } from 'scrypt-ts';
TicTacToe.init(artifact as unknown as MergedArtifact);
```


## 实战演习

1. 在 `index.tsx` 中导入合约制品文件 `tictactoe.json`，并初始化合约类 `TicTacToe`

你可以参考这个 [commit]() 进行修改。
