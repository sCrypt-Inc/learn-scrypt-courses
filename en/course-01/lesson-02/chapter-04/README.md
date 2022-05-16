# Chapter 4: Integrating Wallet

Deploying the contract object `instance` to the Bitcoin network requires bitcoins. To do this, we need to access the wallet first to get bitcoins. Here we take [sensilet](https://sensilet.com) as an example to introduce how to access the wallet.


## Wallet implementation

We define some common wallet interfaces in [wallet.ts](https://github.com/sCrypt-Inc/tic-tac-toe/blob/webapp/src/web3/wallet.ts) and use sensilet to implement these interfaces. For the specific implementation, see: [sensiletwallet.ts](https://github.com/sCrypt-Inc/tic-tac-toe/blob/webapp/src/web3/sensiletwallet.ts)


## Wallet initialization

Initialize the wallet in `useEffect`. First, set up a `SensiletWallet` object for `web3`. Then call `web3.wallet.isConnected()` to save the status of whether the wallet is connected.

In the rendering code of the App, it is determined whether to render the wallet login component `Auth` or the wallet balance component `Balance` by judging the state of `states.isConnected`.

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

## Wallet login

Below is the component `Auth` that implements wallet login. When the user clicks the Sensilet button, the wallet's `requestAccount` interface is called to log in to the wallet. An authorization prompt box will appear in the wallet plugin.

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


## Wallet balance

The `Balance` component calls the `getbalance` interface of the wallet to implement the function of displaying the wallet balance.

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

## Put it to the test

1. Initialize the wallet in the `App` component.
2. Use the `requestAccount` interface in the `Auth` component to log in to the wallet
3. Use the `getbalance` interface in the `Balance` component to get the wallet balance and display it.

Refer to this [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/b792258bdd3909b9e00f788db8e62c586b182681)

