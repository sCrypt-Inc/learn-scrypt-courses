# Chapter 1: scryptlib

Congratulations! You've built your very first Bitcoin SV smart contract using sCrypt. Now, you will learn how to implement your contract into your Web3/dAPP application using Javascript. We are assuming that you have some basic knowledge of the front-end development.

The `webapp` branch of the React App project [tic-tac-toe](https://github.com/sCrypt-Inc/tic-tac-toe) contains a tic-tac-toe game with only front-end code. We will start from this branch and implement a contract version of tic-tac-toe game step by step.

## scryptlib

[scryptlib](https://github.com/sCrypt-Inc/scryptlib) is sCrypt's official Javascript SDK for integrating Bitcoin SV Smart Contract in your application. It is designed to help you quickly build a high-quality Smart Contract applications. You will be able to compile, test, deploy and call contracts through this SDK.

## Setup

`scryptlib` can be installed via `npm`.

```javascript
// use NPM
npm install scryptlib

// use Yarn
yarn add scryptlib
```

## Compile

Here's how to instantiate Tic-Tac-Toe Smart Contract and call its public methods. Just like regular Javascript objects, you can simply compile new contract class `Tictactoe`, instantiate new object named `game` using the class, and call the function called `move`.

```javascript
const Demo = buildContractClass(compileContract('demo.scrypt'));
const demo = new Demo(7, 4);

const result = demo.add(11).verify()
assert(result.success);
```

## Put it to the test

Clone the React App project [tic-tac-toe](https://github.com/sCrypt-Inc/tic-tac-toe). and switch to the `webapp` branch.
