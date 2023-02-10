# Chapter 3: Instantiate Contract and Deploy Contract

## Instantiate the contract

We have obtained the contract class `Tictactoe` by loading the contract artifact file. When the user clicks the start button, the contract is instantiated through the `Tictactoe` contract class.


Instantiating the contract class `Tictactoe` requires the public keys of two players `alice` and `bob`. The public key can be obtained through the `getDefaultPubKey()` interface of `Signer`. Since there is only one wallet, we assume that both `alice` and `bob` use the same public key.

The following code instantiates the contract and calls `markAsGenesis()` to mark the contract as a genesis contract.

```ts
const startGame = async (amount: number) => {
  try {
    const signer = signerRef.current as SensiletSigner;

    const pubkey = await signer.getDefaultPubKey()

    const instance = new TicTacToe(
      PubKey(toHex(pubkey)),
      PubKey(toHex(pubkey)),
      true,
      [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n]
    ).markAsGenesis();

  } catch(e) {
    console.error('deploy TicTacToe failes', e)
    alert('deploy TicTacToe failes')
  }
};
```

Each contract instance has a `deploy()` method:


```ts
deploy(amount?: number, options?: {
    changeAddress?: bsv.Address | string;
    address?: bsv.Address | string;
}): Promise<TransactionResponse>;
```

- `amount`: Indicates the balance locked by the contract at the time of deployment
- `options`: It is an optional parameter, which supports custom change address, and the private key corresponding to `address` used to sign the transaction.

## Put it to the test

Call the `deploy()` method of the contract instance to deploy the contract. Before that, you need to connect a `Signer` or `Provider` first.