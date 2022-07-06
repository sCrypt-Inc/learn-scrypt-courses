# 第四章: 集成钱包

将合约对象 `instance` 部署到比特币网络需要比特币。为此我们需要先接入钱包用来获取比特币。这里以 [sensilet](https://sensilet.com) 为例，介绍如何接入钱包。

安装完 **sensilet** 钱包后， 点击右上角的设置按钮，切换到测试网。然后复制你的钱包地址，去我们的 [水龙头](https://scrypt.io/#faucet) 领取测试网 BSV。
## 钱包实现

我们在 [wallet.ts](https://github.com/sCrypt-Inc/tic-tac-toe/blob/webapp/src/web3/wallet.ts) 中定义了一些通用的钱包接口。并使用 sensilet 来实现这些接口。具体实现见: [sensiletwallet.ts](https://github.com/sCrypt-Inc/tic-tac-toe/blob/webapp/src/web3/sensiletwallet.ts)


## 钱包初始化

在 `useEffect` 中初始化钱包。首先，为 `web3` 设置一个 `SensiletWallet` 对象。然后调用 `web3.wallet.isConnected()` 将钱包是否连接的状态保存起来。

在 App 的渲染代码中，通过判断 `states.isConnected` 状态来决定渲染钱包登入组件 `Auth` 还是钱包余额组件 `Balance`。

```javascript
return (
    <div className="App">
      <header className="App-header">
        <h2>Play Tic-Tac-Toe on Bitcoin</h2>
        ...
        {states.isConnected ? <Balance></Balance> : <Auth></Auth>}
      </header>
    </div>
  );
```

## 钱包登入
下面是实现钱包登入的组件 `Auth`。用户点击 Sensilet 按钮则调用钱包的 `requestAccount` 接口来登入钱包。钱包插件会出现授权提示框。

```js
import { web3 } from "./web3";

const Auth = (props) => {

  const sensiletLogin = async (e) => {
    try {
      const res = await web3.wallet.requestAccount("tic-tac-toe");
      if (res) {
        window.location.reload();
      }
    } catch (error) {
      console.error("requestAccount error", error);
    }
  };

  return (
    <div className="auth">
      <div>
        <button
          className="pure-button button-large sensilet"
          onClick={sensiletLogin}
        >
          Sensilet
        </button>
      </div>
    </div>
  );
};

export default Auth;
```


## 钱包余额

`Balance` 组件调用了钱包的 `getbalance` 接口，实现了展示钱包余额的功能。

```js
import { useState, useEffect } from "react";
import { web3 } from "./web3";
const Balance = (props) => {
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    if (web3.wallet) {
      web3.wallet.getbalance().then((balance) => {
        setBalance(balance);
      });
    }
  }, []);

    return (
      <div className="wallet">
        <div className="walletInfo">
          <div className="balance">
            <label>Balance: {balance} <span> (satoshis)</span></label>
          </div>
        </div>
      </div>
    );
};

export default Balance;
```

## 实战演习

1. 在 `App` 组件中初始化钱包。
2. 在 `Auth` 组件使用 `requestAccount` 接口来登入钱包
3. 在 `Balance` 组件使用 `getbalance` 接口获取钱包余额并展示出来。

参考这个 [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/b792258bdd3909b9e00f788db8e62c586b182681)
