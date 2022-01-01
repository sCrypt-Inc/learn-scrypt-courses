# Chapter 1: scryptlib

Congratulations! You've built your very first Bitcoin SV smart contract using sCrypt. Now, you will learn how to implement your contract into your Web3/dAPP application using Javascript. We are assuming that you have some basic knowledge of the front-end development.

## scryptlib

`scryptlib` is sCrypt's official Javascript SDK for integrating Bitcoin SV Smart Contract in your application. It is designed to help you quickly build a high-quality Smart Contract applications. You will be able to compile, test, deploy and call contracts through this SDK.

## Setup

`scryptlib` can be installed via `npm`.

```javascript
// use NPM
npm install scryptlib

// use Yarn
yarn add scryptlib
```

## Compile

Here's how to instantiate Tic-Tac-Toe Smart Contract and call its pujblic methods. Just like regular Javascript objects, you can simply compile new contract class `Tictactoe`, instantiate new object named `game` using the class, and call the function called `move`.

```javascript
const Tictactoe = buildContractClass(runCompile('tictactoe.scrypt'));
const game = new Tictactoe(new PubKey(toHex(publicKeyAlice)), new PubKey(toHex(publicKeyBob)));
const result = game.move(n, new Sig(toHex(sig)), 10000, preimage).verify(context)
```

## Put it to the test

First we can create a boilerplate React application with  [create-react-app](https://github.com/facebook/create-react-app).

Then, you can download `scryptlib` using commands from Setup.

In App.js, introduce `scryptlib` to your application through `import` of **nodejs**.
