# Chapter 4: Wallet

After the contract is instantiated, it can be deployed to the Bitcoin network. But before that, we need to understand the wallet first. Because the deployment contract is to send the contract to the blockchain network through a transaction, that is, on the chain. A certain amount of Bitcoin is required as a handling fee for the chain, and a handling fee is also required for invoking the contract.

## Wallet interface

In [wallet.ts](https://github.com/sCrypt-Inc/tic-tac-toe/blob/master/src/web3/wallet.ts), we define the wallet interface that needs to be used:

```typescript
export abstract class wallet {

  network: NetWork;

  constructor(network: NetWork) {
    this.network = network;
  }

  //dApp use this api to connect to the wallet.
  abstract requestAccount(name: string, permissions: string[]): Promise<any>;

  //get wallet balance
  abstract getbalance(): Promise<number>;

  //sign raw transaction, returns unlockscript of the p2pkh input if success
  abstract signRawTransaction(rawtx: string, inputIndex: number, sigHashType: SignType, addr: string
  ): Promise<string>;

  //get signature for special input
  abstract getSignature(rawtx: string, inputIndex: number, sigHashType: SignType, addr: string
  ): Promise<string>;

  //send raw transaction, returns transaction hash if success
  abstract sendRawTransaction(rawTx: string): Promise<string>;

  //returns array of unspent transaction outputs, which total amount is more than the minAmount argument.
  abstract listUnspent(minAmount: number, options?: {
    purpose?: string
  }): Promise<UTXO[]>;

  //returns a new Bitcoin address, for receiving change.
  abstract getRawChangeAddress(options?: {
    purpose?: string
  }): Promise<string>;

  //returns a public key
  abstract getPublicKey(options?: {
    purpose?: string
  }): Promise<string>;

}
```

## DotWallet

[DotWallet](https://www.ddpurse.com) Wallet implements the wallet interface interface. For specific implementation, you can check [DotWallet.ts](https://github.com/sCrypt-Inc/tic-tac-toe/blob/master/src/web3/dotwallet.ts)

First, we need to log in to the **DotWallet** wallet, we use the login interface provided by the wallet to log in:

```javascript
    const handleAuth = (e)=>{
        new DotWallet().auth()
    }
```

After the login is successful, we can use the various wallet interfaces above.


## Put it to the test

1. Use the `getbalance` interface to get the wallet balance and display it.
