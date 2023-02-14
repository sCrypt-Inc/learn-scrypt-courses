# Chapter 4: Calling Contracts

Now we can start playing the game. Every move is a call to the contract and triggers a change in the state of the contract. The interaction between the web application and the contract occurs at this stage.

Calling the contract requires the following steps:

1. Create a new contract instance via the `.next()` method of the current instance. Update the state of the new instance to the latest.

2. Add a transaction builder to the `move()` method of the `TicTacToe` contract through the `bindTxBuilder` method, which builds the calling transaction.

3. Finally call the `methods` public method on the contract instance to send the transaction to call the contract. Every public method `xxx` has a function of the same name under `contractInstance.methods.xxx`. It takes the same parameters, plus an `MethodCallOptions`.

If the public method has a signature parameter, a callback function is required to return the signature. The `Signer` connected to the contract will use the default private key to sign, and the signature will be returned through the parameter `sigResps` of the callback function. Use `findSig()` to find the signature associated with a public key.

Through `pubKeyOrAddrToSign` in `MethodCallOptions`, you can specify which address/public key to sign against.

```ts
const { tx: callTx } = await p2pkh.methods.unlock(
    (sigResponses: SignatureResponse[]) => findSig(sigResponses, $publickey),
    $publickey,
    {
        pubKeyOrAddrToSign: $publickey.toAddress()
    } as MethodCallOptions<P2PKH>
);
```

4. After the call is completed, the new contract instance needs to be saved, to continue calling the contract later.

The code implementation of the above steps:


```ts
// 1. create nextInstance
const current = props.contract as TicTacToe;
const nextInstance = current.next();
// convert latest game data to contract state with Utils.toContractState and update nextInstance state
Object.assign(nextInstance, Utils.toContractState(latestGameData));

// 2. bind a tx builder for move
TicTacToe.bindTxBuilder('move', async (options: BuildMethodCallTxOptions<SmartContract>, n: bigint, sig: Sig) => {
    ...
}

// 3. call contract.methods.move(...) to broadcast transaction
const {tx, next} = await current.methods.move(
    BigInt(i),
    (sigResponses: SignatureResponse[]) => findSig(sigResponses, $publickey)
);

// 4. save latest contract instance
props.setContract(next?.instance)
```

So far, we have completed the interaction between the `TicTacToe` contract and the web frond-end. Every move will prompt the player to sign and submit a transaction on the blockchain.

## Put it to the test

1. When the game is not over, you need to add an output that contains the latest state of the game.
2. Call the public method of the contract to broadcast the transaction that calls the contract.