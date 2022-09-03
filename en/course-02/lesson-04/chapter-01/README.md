# Chapter 1: Setup battleship frontend

Since we have built the circuit and the smart contract, the next thing to do is to integrate them into a frontend so users can easily interact with the contract.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/05.png?raw=true" width="600">


## Git clone

You can get it with following command:

```
git clone https://github.com/sCrypt-Inc/zk-battleship
```

## Setup & Run

You can run the following commands to setup and run the project quickly:

```
npm install
npm start
```

If you modify the circuit or sCrypt contract, you need to run the `setup` command to generate assets again. Otherwise you do not have to run it.

```
npm run setup
```

The setup script will:
1. Compile the circuit and finish the Zokrates setup procedure;
2. Export an sCrypt verifier contract using the outcome of the first step
3. Compile the `battleship.scrypt` contract;
4. Copy all output files to `public` folder as assets;

## Prerequisites

In order to play the game, you need to:

* Install [Sensilet wallet chrome extension](https://chrome.google.com/webstore/detail/sensilet/aadkcfdlmiddiiibdnhfbpbmfcaoknkm);
* Switch to testnet mode in Sensilet.
* Deposit some test coins in the wallet from a [faucet](https://scrypt.io/#faucet);


<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/testnet.gif?raw=true" width="300">

<center>How to switch to testnet</center>
<br></br>

You can now visit `http://localhost:3000` in Chrome browser, or you could try the online version [here](https://scrypt.io/zk-battleship).

## Credits
We build the frontend based on [this project](https://github.com/diemkay/battleship).
