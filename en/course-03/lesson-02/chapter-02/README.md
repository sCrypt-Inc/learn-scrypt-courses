# Chapter 2: Integrated Wallet

Before starting to deploy the contract, we need to connect the wallet first. Here we take [sensilet](https://sensilet.com) as an example to introduce how to connect to the wallet.

After installing the **sensilet** wallet, click the settings button in the upper right corner to switch to the test network. Then copy your wallet address and go to our [faucet](https://scrypt.io/#faucet) to claim testnet BSV.


<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/testcoin.gif?raw=true" width="600">

## Signer and Provider

- `Signer` is a class that in some way directly or indirectly accesses private keys that can sign messages and transactions to authorize a user to perform some action.

- `Provider` is an abstraction for non-account-based operations on the blockchain, such as broadcasting signed transactions, and usually does not directly participate in signing transactions or data.


Usually wallets need to implement the abstract interface of `Signer`. `Signer` links a `Provider` to broadcast transactions.

```ts
signer.connect(provider);
```


## Connect **sensilet** wallet

After clicking the **Connect Sensilet** button, initialize a `SensiletSigner` and save the `signer`.

```ts
const provider = new WhatsonchainProvider(bsv.Networks.testnet);
const signer = new SensiletSigner(provider);
signerRef.current = signer;
```

## Show balance

After the connection is successful, call the `getBalance()` interface to get the wallet balance:

```ts
signer.getBalance().then(balance => 
  setBalance(balance.confirmed + balance.unconfirmed)
);
```

If a wallet is connected, the wallet balance is displayed. Otherwise show the connect button.

```ts
{
  isConnected ?
    <label>Balance: {balance} <span> (satoshis)</span></label>
    :
    <button
      className="pure-button button-large sensilet"
      onClick={sensiletLogin}
    >
      Connect Sensilet
    </button>
}
```

## Put it to the test

1. Then call the `getConnectedTarget()` interface of the wallet to request to connect to the wallet.

Refer to this [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/d3503a097c1a6ac1b28183372cd90f31868098a6)
