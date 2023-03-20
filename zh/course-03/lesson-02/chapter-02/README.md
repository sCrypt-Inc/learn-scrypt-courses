# 第二章: 集成钱包

在开始部署合约之前，我们需要先连接钱包。这里以 [sensilet](https://sensilet.com) 为例，介绍如何连接钱包。

安装完 **sensilet** 钱包后， 点击右上角的 **设置** 按钮，切换到测试网。然后复制你的钱包地址，去我们的 [水龙头](https://scrypt.io/#faucet) 领取测试网 BSV。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/testcoin.gif?raw=true" width="600">

## Signer 与 Provider

- `Signer` 当用户想要将交易发送到链上时，我们的 dApp 会提示用户使用他们的私钥签署交易并被授权以执行某些操作。 `Signer` 接口是控制私钥的实体的抽象。 一个简单的签名者是一个私钥，而一个复杂的签名者是一个钱包。

- `Provider` 是需要与区块链交互时连接的比特币节点的抽象, 例如，广播交易。 Whatsonchain 就是一个例子，提供对区块链的访问。


## 连接 **sensilet** 钱包

点击 **Connect Sensilet** 按钮后，初始化一个 `SensiletSigner`，并将 `signer` 保存起来。之后调用`requestAuth()`连接钱包，并调用钱包的 `getDefaultPubKey()` 接口来获取两个玩家的公钥。

```ts
const sensiletLogin = async () => {
    try {
      const provider = new DefaultProvider();
      const signer = new SensiletSigner(provider);

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
      console.error("sensiletLogin failed", error);
      alert("sensiletLogin failed")
    }
};
```

## 显示余额

连接成功后，调用 `getBalance()` 接口获取钱包余额:

```ts
signer.getBalance().then(balance => 
  // UTXOs belonging to transactions in the mempool are unconfirmed
  setAliceBalance(balance.confirmed + balance.unconfirmed)
);
```

如果已连接钱包，显示钱包余额。否则显示连接按钮。

```ts
{
  isConnected ?
    <label>Balance: {alicebalance} <span> (satoshis)</span></label>
    :
    <button
      className="pure-button button-large sensilet"
      onClick={sensiletLogin}
    >
      Connect Sensilet
    </button>
}
```


![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/connectwallet.gif?raw=true)

<center>连接钱包</center>

## 实战演习

调用钱包的 `requestAuth()` 接口请求连接钱包。
