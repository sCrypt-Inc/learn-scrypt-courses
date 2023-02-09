# Chapter 2: Integrated Wallet

Before starting to deploy the contract, we need to connect the wallet first. Here we take [sensilet](https://sensilet.com) as an example to introduce how to connect to the wallet.

After installing the **sensilet** wallet, click the settings button in the upper right corner to switch to the test network. Then copy your wallet address and go to our [faucet](https://scrypt.io/#faucet) to claim testnet BSV.


<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/testcoin.gif?raw=true" width="600">

## Signer and Provider

- `Signer` is the class that accesses the private key. Private keys can sign transactions to authorize users to perform certain actions.

- `Provider` is an abstraction for operations on the blockchain, such as broadcasting transactions. Usually not involved in signing transactions.


Usually wallets need to implement the abstract interface of `Signer`. `Signer` connects a `Provider` to broadcast transactions.

```ts
signer.connect(provider);
```


## Connect **sensilet** wallet

After clicking the **Connect Sensilet** button, initialize a `SensiletSigner` and save the `signer`. Then call the `getConnectedTarget()` interface of the wallet to request to connect to the wallet.

```ts
const sensiletLogin = async () => {
    try {
        const provider = new WhatsonchainProvider(bsv.Networks.testnet);
        const signer = new SensiletSigner(provider);
        signerRef.current = signer;
        await signer.getConnectedTarget();
        setConnected(true);
    } catch (error) {
        console.error("sensiletLogin failed", error);
        alert("sensiletLogin failed")
    }
}
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

Then call the `getConnectedTarget()` interface of the wallet to request to connect to the wallet.