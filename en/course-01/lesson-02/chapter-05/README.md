# Chapter 5: Deploying the contract

After the wallet is logged in, we can use the wallet to send transaction deployment contracts.

The [web3](https://github.com/sCrypt-Inc/tic-tac-toe/blob/7ae1eb8cb46bd8315d9c7d858b6a190ba3c4c306/src/web3/web3.ts#L48) tool class also provides tool functions for deploying contracts `web3.deploy()`. The contract instance and the amount of bitcoin locked by the contract are the parameters of this function. This function will do the following:


1. Query available unspent outputs through the wallet's `listUnspent` interface. Used to pay transaction fees and locked balances for deploying contracts.
2. Build a lock script containing a contract instance as the first output of the transaction.
3. Call the `getSignature` interface of the wallet to request the wallet to sign the transaction.
4. Call the `sendRawTransaction` interface of the wallet to broadcast the transaction.


## Start the Game

After the player fills in the amount of bitcoin locked in the contract and clicks the start button, the `startGame` method in the `App` component will be called back. This function implements the function of deploying a contract instance to the Bitcoin network. After successful deployment, save the UTXO containing the contract and the initial game state to *localStorage* , and update the React state.

```js
const startGame = async (amount) => {
    if (web3.wallet && states.instance) {
      web3.deploy(states.instance, amount).then(rawTx => {
            
          ...  
      })
    }
};
```

## Put it to the test

1. Call the `web3.deploy()` function in the `startGame` function to deploy the contract. And after successful deployment save transaction to `ContractUtxos` and update game state.

Refer to this [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/6b176c69d7315a7d025c82937cb580bb9987cf87)

