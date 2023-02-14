# Chapter 2: Integrated Wallet

Before deploying the contract, we need to connect a wallet first. We use [sensilet](https://sensilet.com), a MetaMask-like wallet.

After installing the **sensilet** wallet, click the `settings` button in the upper right corner to switch to testnet. Then copy your wallet address and go to our [faucet](https://scrypt.io/#faucet) to fund it.


<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/testcoin.gif?raw=true" width="600">

## Signer and Provider

When a user wants to sends a transaction onto the chain, our dApp would prompt the user to “sign” the transaction using their private key and be authorized to perform certain actions. The `Signer` interface is an abstraction of the entity controlling the private key. A simple signer would be a single private key, while a complex signer is a wallet.

A `Provider` is an abstraction for a Bitcoin node that you connect with when you need to interact with the blockchain, e.g., to broadcast a transaction. Whatsonchain is an example, providing access to the blockchain.

Usually wallets need to implement the abstract interface of `Signer`. `Signer` connects a `Provider` to broadcast transactions, either in the constructor or afterwards.

```ts
// 1) at construction
const signer = new SensiletSigner(provider)
// 2) after construction
signer.connect(provider);
```


## Connect **sensilet** wallet

After clicking the **Connect Sensilet** button, we initialize a `SensiletSigner` and save it. We then call the `getConnectedTarget()` interface of the wallet to request to connect to the wallet.

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

After the connection is successful, we all the `getBalance()` interface to get the wallet balance:

```ts
signer.getBalance().then(balance => 
  // UTXOs belonging to transactions in the mempool are unconfirmed
  setBalance(balance.confirmed + balance.unconfirmed)
);
```

If a wallet is connected, its balance is displayed. Otherwise we show the connect button.

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

Call the `getConnectedTarget()` interface of the wallet to request to connect to the wallet.