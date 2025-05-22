# Chapter 2: Integrated Wallet

Before deploying the contract, we need to connect a wallet first. We use [Panda Wallet](https://chromewebstore.google.com/detail/panda-wallet/mlbnicldlpdimbjdcncnklfempedeipj), a MetaMask-like wallet.

After installing the **Panda** wallet, click the `settings` button in the upper right corner to switch to testnet. Then copy your wallet address and go to our [faucet](https://scrypt.io/#faucet) to fund it.


<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/testcoin.gif?raw=true" width="600">

## Signer and Provider

When a user wants to sends a transaction onto the chain, our dApp would prompt the user to “sign” the transaction using their private key and be authorized to perform certain actions. The `Signer` interface is an abstraction of the entity controlling the private key. A simple signer would be a single private key, while a complex signer is a wallet.

A `Provider` is an abstraction for a Bitcoin node that you connect with when you need to interact with the blockchain, e.g., to broadcast a transaction. Whatsonchain is an example, providing access to the blockchain.

## Connect to **Panda**

After clicking the **Connect Panda** button, we initialize a `PandaSigner` and save it. We call `requestAuth()` to request to connect to the wallet. If the request is approved by the user, we now have full access to the wallet. We can, for example, call `getDefaultPubKey()` to get its public key.

```ts
const pandaLogin = async () => {
    try {
      const provider = new DefaultProvider({
          network: bsv.Networks.testnet
      });
      const signer = new PandaSigner(provider);

      signerRef.current = signer;
      
      const { isAuthenticated, error } = await signer.requestAuth()
      if (!isAuthenticated) {
        throw new Error(error)
      }

      setConnected(true);

      const alicPubkey = await signer.getDefaultPubKey();
      setAlicePubkey(toHex(alicPubkey))

      // Prompt user to switch accounts

    } catch (error) {
      console.error("pandaLogin failed", error);
      alert("pandaLogin failed")
    }
};
```

We can also call `getBalance()` to get its balance:

```ts
signer.getBalance().then(balance => 
  // UTXOs belonging to transactions in the mempool are unconfirmed
  setAliceBalance(balance.confirmed + balance.unconfirmed)
);
```

If a wallet is connected, its balance is displayed. Otherwise we show the `connect` button.

```ts
{
  isConnected ?
    <label>Balance: {alicebalance} <span> (satoshis)</span></label>
    :
    <button
      className="pure-button button-large sensilet"
      onClick={pandaLogin}
    >
      Connect Panda
    </button>
}
```



![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/connectwallet.gif?raw=true)

<center>connect wallet</center>

## Put it to the test

Call `requestAuth()` to request to connect to the wallet.
