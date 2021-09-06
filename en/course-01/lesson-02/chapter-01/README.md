# Chapter 1: scryptlib

After completing the previous lesson, the sCrypt contract part of our Tic-Tac-Toe DApp is completed.
It should be noted that this APP interface will be written in JavaScript, not sCrypt. We assume that you already have the basic knowledge of front-end development, so we won't take the time to introduce the basics of these technologies.

DApp needs to interact with the contract on the front-end page. To do this, we will use the official JavaScript library released by sCrypt —— [scryptlib](https://github.com/sCrypt-Inc/scryptlib).


scryptlib is used to integrate the Javascript/TypeScript SDK of the Bitcoin SV smart contract written in the sCrypt language.
With `scryptlib`, you can easily compile, test, deploy, and call contracts.

The code that uses `scryptlib` to instantiate and call the contract public methods looks like;

```javascript
const Tictactoe = buildContractClass(runCompile('tictactoe.scrypt'));
const game = new Tictactoe(new PubKey(toHex(publicKeyAlice)), new PubKey(toHex(publicKeyBob)));
const result = game.move(n, new Sig(toHex(sig)), 10000, preimage).verify(context)
```

## Setup

`scryptlib` can be installed via `npm`.

```javascript
// 用 NPM
npm install scryptlib

// 用 Yarn
yarn add scryptlib
```

## Put it to the Test


First we use [create-react-app](https://github.com/facebook/create-react-app) to create a front-end project.

In App.js. Introduce `scryptlib` through `import` of **nodejs**.