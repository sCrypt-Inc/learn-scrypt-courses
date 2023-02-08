# Chapter 4: Calling Contracts

The next step is to start playing chess. Every move is a call to the contract and triggers a change in the state of the contract. The interaction between the web application and the contract mainly occurs at this stage.

Calling the contract requires the following work:

1. Create a new contract instance via the `.next()` method of the current instance. Update the state of the new instance with the latest game data `gameData`.

2. Add a transaction builder to the `move()` method of the `TicTacToe` contract through the `bindTxBuilder` method to build a transaction that calls the contract.

3. Finally call the `methods` public method on the contract instance to send the transaction to execute the contract on the blockchain.

4. After the call is completed, the new contract instance needs to be saved in order to continue calling the contract.

The code implementation of the above steps:


```ts
// 1. create nextInstance
const current = props.contract as TicTacToe;
const nextInstance = current.next();
// update nextInstance state
Object.assign(nextInstance, Utils.toContractState(latestGameData));

// 2. bind a tx builder for move
TicTacToe.bindTxBuilder('move', async (options: BuildMethodCallTxOptions<SmartContract>, n: bigint, sig: Sig) => {
    ...
}

// 3. call contract.methods.move(...) to broadcast transaction
const {tx, next} = await current.methods.move(
    n,
    signature
);

// 4. save latest contract instance
props.setContract(next?.instance)
```

So far, we have completed the interaction between the TicTacToe contract and the webapp. Every chess move of a player will generate a corresponding transaction on the blockchain.

## Put it to the test

1. When the game is not over, you need to add an output that contains the latest state of the game.
2. Call the public method of the contract. If a parameter of the public method is of `Sig` type, the callback function needs to be used to return the signature.


Refer to this [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/eeb0a04d22e9d5f09155ea3dce41728dae8cb6bf)

