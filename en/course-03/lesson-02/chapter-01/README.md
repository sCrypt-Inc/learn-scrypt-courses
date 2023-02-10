# Chapter 1: Integrating frontend

After completing the previous lesson, the sCrypt contract portion of our Tic Tac Toe dApp is complete. Next we need to integrate the front end so that users can play the tic-tac-toe game on the web.


## Prepare

The front-end interface of the Tic Tac Toe dApp will be created using [Create React App](https://create-react-app.dev/).

```ts
npx create-react-app tic-tac-toe --template typescript
```

Or directly clone the [tic-tac-toe repo](https://github.com/sCrypt-Inc/tic-tac-toe) that we have created. The `onlyweb` branch of this repository contains a tic-tac-toe game that does not integrate `sCrypt`, only the front-end code. We assume that you already have basic knowledge of front-end development, so we won't spend time introducing this part of the code.

Clone this project and switch to the `onlyweb` branch.

```
git clone -b onlyweb https://github.com/sCrypt-Inc/tic-tac-toe
```

##  Install the sCrypt SDK

dApp needs to interact with contracts on the front-end page. To do this, we will use the sCrypt SDK - [scryptTS](https://scrypt.io/scrypt-ts). With sCrypt SDK, you can easily compile, test, deploy, and call contracts.

Use the `scrypt-cli` command line tool to install sCrypt SDK.

```base
npx scrypt-cli init
```

Or install via `npm` or `yarn`.

```bash
// use NPM
npm install scrypt-ts
// use Yarn
yarn add scrypt-ts
```


Configuration changes are required after installation via `npm` or `yarn`. Refer to this [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/42e25f3507a62231025c15b9926af5f0406a1ba4).


## Compile the contract

First put the `TicTacToe` contract we wrote in the previous lesson into the `src/contracts` directory. Run the following command to compile the contract:

```bash
npx scrypt-cli compile
```

If the compilation is successful, you will see the output contract product file `tictactoe.json` in the directory where the contract is located. Contract artifact files can be used to initialize contract classes.

Usually we need to use the contract artifact file to initialize the contract class at the front end. The contract class can then be used to instantiate contracts.


```ts
import { TicTacToe } from './contracts/tictactoe';
import artifact from './contracts/tictactoe.json';
TicTacToe.init(artifact);
```


## Put it to the test

Import the contract product file `tictactoe.json` in `index.tsx`, and initialize the contract class `TicTacToe`.