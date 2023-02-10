# 第二章: 集成钱包

在开始部署合约之前，我们需要先连接钱包。这里以 [sensilet](https://sensilet.com) 为例，介绍如何连接钱包。

安装完 **sensilet** 钱包后， 点击右上角的设置按钮，切换到测试网。然后复制你的钱包地址，去我们的 [水龙头](https://scrypt.io/#faucet) 领取测试网 BSV。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/testcoin.gif?raw=true" width="600">

## Signer 与 Provider

- `Signer` 是访问私钥的类。私钥可以签署交易，以授权用户执行某种操作。

- `Provider` 是区块链上的操作的抽象，比如广播交易。通常不参与签署交易。


通常钱包需要实现 `Signer` 的抽象接口。`Signer` 连接一个 `Provider` 来广播交易。

```ts
signer.connect(provider);
```


## 连接 **sensilet** 钱包

点击 **Connect Sensilet** 按钮后，初始化一个 `SensiletSigner`，并将 `signer` 保存起来。之后调用钱包的 `getConnectedTarget()` 接口请求连接钱包。

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
  };
```

## 显示余额

连接成功后，调用 `getBalance()` 接口获取钱包余额:

```ts
signer.getBalance().then(balance => 
  setBalance(balance.confirmed + balance.unconfirmed)
);
```

如果已连接钱包，显示钱包余额。否则显示连接按钮。

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

## 实战演习

调用钱包的 `getConnectedTarget()` 接口请求连接钱包。
