# Chapter 3: Data types and instantiation contracts.

## Basic data type

In the previous lesson, We introduced the basic data types of the `sCrypt` language and how to use the `sCrypt` language to instantiate contracts. So when we use **scryptlib** to interact with the contract, we also need to pass data and instantiate the contract.

For each basic data type of the `sCrypt` language, **scryptlib** has a corresponding class,
for example:

1. `int` type corresponds to `Int` class
2. `bool` type corresponds to `Bool` class
3. `PubKey` type corresponds to `PubKey` class


The basic data type is the type supported by **scryptlib** by default. For user-defined structures or aliases, they need to be dynamically generated through `buildTypeClasses`.

```javascript
const {Person, Male, Female} = buildTypeClasses(JSON.parse(descFileContent));
```

## Instantiate a Contract

We have obtained the contract class `TictactoeContractClass` by loading the contract description file. Next, then use the `new` keyword to instantiate the contract.

```javascript
const instance = new TictactoeContractClass(
  new PubKey(alicePubKey),
  new PubKey(bobPubKey),
  true,
  [0,0,0,0,0,0,0,0,0]  // empty board
);
```

## Put it to the test

1. Use the `TictactoeContractClass` contract class in `fetchContract` to instantiate the contract and return the instantiated contract object


Refer to this [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/47ec1328fbf63b5104c3612c955034bd736fc067)