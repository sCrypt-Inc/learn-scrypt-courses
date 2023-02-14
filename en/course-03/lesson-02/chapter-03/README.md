# Chapter 3: Initialize and Deploy Contract

## Initialize the contract

We have obtained the contract class `Tictactoe` by loading the contract artifact file. When the user clicks the start button, the contract is initialized with the public keys of two players `alice` and `bob`. The public key can be obtained through the `getDefaultPubKey()` interface of `Signer`.

The following code initializes the contract and calls `markAsGenesis()` to mark the the contract is stateful and is ready to be deployed.

```ts
const startGame = async (amount: number) => {
  try {
    const signer = signerRef.current as SensiletSigner;

    const pubkey = await signer.getDefaultPubKey()

    const instance = new TicTacToe(
      PubKey(toHex(pubkey)),
      PubKey(toHex(pubkey))
    ).markAsGenesis();

  } catch(e) {
    console.error('deploy TicTacToe failes', e)
    alert('deploy TicTacToe failes')
  }
};
```

## Deploy it
Each contract instance has a `deploy()` method:


```ts
deploy(amount?: number, options?: {
    changeAddress?: bsv.Address | string;
    address?: bsv.Address | string;
}): Promise<TransactionResponse>;
```

- `amount`: how many satoshis would be locked in the contract when deployed
- `options`: an optional parameter, `changeAddress` is customed change address, and  `address`'s corresponding private key will be used to sign the transaction.

## Put it to the test

Call the `deploy()` method of the contract instance to deploy the contract. Before that, you need to connect a `Signer` or `Provider` first.