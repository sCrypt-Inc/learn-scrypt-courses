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

If you've changed the circuit or sCrypt contract, you need to use this command to generate assets again, otherwise you do not have to run it:

```
npm run setup
```

The setup script will accomplish these primary jobs:
* Compile the circuit and finish Zokrates setup procedure;
* Export the dedicated sCrypt verifier contract bound to the outcome of the first step;
* Compile the battleship.scrypt contract;
* Copy all necessary output files to `public` folder as assets;

## Play

### Prerequisites

In order to play it you should meet those two prerequisites listed as below:

* Have [sensilet chrome extension](https://chrome.google.com/webstore/detail/sensilet/aadkcfdlmiddiiibdnhfbpbmfcaoknkm) installed;
Get some testnet BSVs in the above wallet from a [faucet](https://scrypt.io/#faucet);

* You can now visit `http://localhost:3000` in chrome browser, also you could try the online version [here](https://scrypt.io/zk-battleship).

## Credits
We built the frontend based on [this project](https://github.com/diemkay/battleship).
