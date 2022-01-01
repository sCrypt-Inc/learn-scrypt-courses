# Chapter 1: scryptlib

After completing the previous lesson, the sCrypt contract part of our Tic-Tac-Toe dApp is completed.
It should be noted that this APP interface will be written in JavaScript, not sCrypt. We assume that you already have the basic knowledge of front-end development, so we won't take the time to introduce the basics of these technologies.

dApp needs to interact with the contract on the front-end page. To do this, we will use the official JavaScript SDK library released by sCrypt —— [scryptlib](https://github.com/sCrypt-Inc/scryptlib).


`scryptlib` is used to integrate Bitcoin SV smart contracts written in the sCrypt language with Javascript/TypeScript code.
With `scryptlib`, you can easily compile, test, deploy, and call contracts.

The code that uses `scryptlib` to instantiate and call the contract's public methods looks like;

```javascript
const Tictactoe = buildContractClass(runCompile('tictactoe.scrypt'));
const game = new Tictactoe(new PubKey(toHex(publicKeyAlice)), new PubKey(toHex(publicKeyBob)));
const result = game.move(n, new Sig(toHex(sig)), 10000, preimage).verify(context)
```

## Setup

`scryptlib` can be installed via `npm`.

```javascript
// use NPM
npm install scryptlib

// use Yarn
yarn add scryptlib
```

## Put it to the test


First we use [create-react-app](https://github.com/facebook/create-react-app) to create a front-end project.

In App.js. Introduce `scryptlib` through `import` of **nodejs**.
