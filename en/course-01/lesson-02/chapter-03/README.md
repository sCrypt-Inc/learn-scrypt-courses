# Chapter 3: Data types and instantiation contracts.

## Basic data type

In the previous lesson, We introduced the basic data types of the `sCrypt` language and how to use the `sCrypt` language to instantiate contracts. So when we use **scryptlib** to interact with the contract, we also need to pass data and instantiate the contract.

For each basic data type of the `sCrypt` language, **scryptlib** has a corresponding class,
for example:

1. `int` type corresponds to `Int` class
2. `bytes` type corresponds to `Bytes` class
3. `bool` type corresponds to `Bool` class
4. `PubKey` type corresponds to `PubKey` class


The basic data type is the type supported by **scryptlib** by default. For user-defined structures or aliases, they need to be dynamically generated through `buildTypeClasses`.

```javascript
const {Person, Male, Female} = buildTypeClasses(JSON.parse(descFileContent));
```

## Instantiate a Contract

We have obtained the contract class `TictactoeContractClass` by loading the contract description file. Next, use the `new` keyword to instantiate the contract, and use `setDataPart` to set the initial state of the instance and save it.

```javascript

let c = new TictactoeContractClass(
  new PubKey(toHex(alicePubKey)),
  new PubKey(toHex(bobPubKey)),
);

c.setDataPart("00000000000000000000");

```

## Put it to the test

1. Import `PubKey` type
2. Paste the code for instantiating the contract into `fetchContract`.