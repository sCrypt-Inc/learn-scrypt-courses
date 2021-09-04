# 第四章: 钱包

合约实例化之后，就可以部署到比特币网络了。但在那个之前，我们需要先了解一下钱包。因为部署合约是通过交易将合约发送到区块链网络，即上链。上链需要有一定的比特币作为手续费，调用合约同样也需要手续费。

## 钱包接口

在 [wallet.ts](https://github.com/sCrypt-Inc/tic-tac-toe/blob/master/src/web3/wallet.ts) 中，我们定义了需要用到的钱包接口：

```typescript
export abstract class wallet {

  network: NetWork;

  constructor(network: NetWork) {
    this.network = network;
  }

  //Dapp use this api to connect to the wallet.
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

[DotWallet](https://www.ddpurse.com) 钱包实现了该钱包接口接口。具体实现你可以查看 [DotWallet.ts](https://github.com/sCrypt-Inc/tic-tac-toe/blob/master/src/web3/dotwallet.ts)

首先我们需要登录 **DotWallet** 钱包，我们使用该钱包提供的登录接口登录：

```javascript
    const handleAuth = (e)=>{
        new DotWallet().auth()
    }
```

登录成功之后，我们就可以使用上面的各个钱包接口了。


## 实战演习

1. 使用 `getbalance` 接口获取钱包余额并展示出来。
