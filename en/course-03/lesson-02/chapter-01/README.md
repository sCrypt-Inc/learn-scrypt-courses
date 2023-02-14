# Chapter 1: Add a front-end

After completing the previous lesson, the sCrypt contract portion of our TicTacToe dApp is ready. Next we need to add a front-end so that users can play the TicTacToe game in a browser.

Since the focus of this course is on sCrypt, we assume you are already familiar with front-end development, and will not cover them.

## Prepare

The front-end interface of the dApp will be created using [Create React App](https://create-react-app.dev/).

```ts
npx create-react-app tic-tac-toe --template typescript
```

Or directly clone the [tic-tac-toe repo](https://github.com/sCrypt-Inc/tic-tac-toe) that we have created. The `onlyweb` branch of this repository contains a tic-tac-toe game that does not integrate `sCrypt`, only the front-end code. We assume that you already have basic knowledge of front-end development, so we won't spend time introducing this part of the code.

Clone this project and switch to the `onlyweb` branch.

```
git clone -b onlyweb https://github.com/sCrypt-Inc/tic-tac-toe
```

##  Install the sCrypt SDK

The sCrypt SDK - [scryptTS](https://scrypt.io/scrypt-ts) enables you to easily compile, test, deploy, and call contracts.

Use the `scrypt-cli` command line tool to install the SDK.

```base
npx scrypt-cli init
```

This will also add all scaffolding needed for contract development.

## Compile the contract

First put the `TicTacToe` contract we wrote in the previous lesson into the `src/contracts` directory. Run the following command to compile the contract:

```bash
npx scrypt-cli compile
```

You should see an artifact file `tictactoe.json` in the directory where the contract is located. It can be used to initialize a contract at the front end.


```ts
import { TicTacToe } from './contracts/tictactoe';
import artifact from './contracts/tictactoe.json';
TicTacToe.init(artifact);
```


## Put it to the test

Import the contract artifact file `tictactoe.json` in `index.tsx`, and initialize the contract class `TicTacToe`.