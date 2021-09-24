# Chapter 5: Deploying the contract

After the wallet is logged in, we can use the wallet to send transaction deployment contracts.

## Query **UTXO**

Deploying the contract requires generating transactions, and generating transactions requires an available unspent output. The balance of the output should be greater than the amount that will be locked in the contract.

Query the **UTXO** through the wallet's `listUnspent` interface.

```javascript
const minAmount = amountInContract + FEE;
wallet.listUnspent(minAmount, {
  purpose: 'alice'
}).then(async (utxos: UTXO[]) => {

})
```


## Build Transaction

With the **UTXO** available, we can use it to construct transactions that include the contract.

```javascript
          
const tx: Tx = {
  inputs: [],
  outputs: []
};

tx.outputs.push({
  script: contract.lockingScript.toHex(),
  satoshis: amountInContract 
});


//add input which using utxo from alice
tx.inputs.push(
  {
    utxo: utxos[0],
    script: '',
    sequence: 0
  }
);

```

After the transaction is structured, there seems to be a little less. That's right, we haven't signed the transaction yet. But we don't have a private key, how do we sign?

The wallet provides the `getSignature` interface. Although we don't have a private key, we can ask the wallet to help sign it.

```typescript
wallet.getSignature(toRawTx(tx), 0, SignType.ALL,changeAddress).then(signature => {
  const script = new bsv.Script()
  .add(Buffer.from(signature,'hex'))
  .add(new bsv.PublicKey(publicKey).toBuffer())
  .toHex()
  tx.inputs[0].script = script;
  return tx;
})
```

## Broadcast Transaction

After signing and setting the corresponding unlocking script, the next step is to broadcast the transaction containing the contract to deploy the contract. For broadcast transactions, we use the `sendRawTransaction` interface provided by the wallet.

```typescript
static async sendTx(tx: Tx): Promise<string> {
  return web3.wallet.sendRawTransaction(toRawTx(tx));
}
```

##  Put it to the test

1. The transaction contains two output scripts: one is the contract output, and the other is the change output. We have added the change output, please add an output that includes the contract.

2. `getSignature` just returns the signature, we need to compose an unlock script with the signature and public key, and then set it to the transaction.
