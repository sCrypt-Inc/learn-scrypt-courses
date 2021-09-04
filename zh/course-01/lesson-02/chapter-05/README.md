# 第五章: 部署合约

钱包登录好后，我们就可以使用钱包来发送交易部署合约了。

## 查询可用的未花费输出

部署合约需要生成交易，生成交易需要一个可用的未花费输出。该输出拥有的余额应该大于即将锁定在合约里面的数额。
通过钱包的 `listUnspent` 接口查询可用的未花费输出。

```javascript
    const minAmount = amountInContract + FEE;
    wallet.listUnspent(minAmount, {
      purpose: 'alice'
    }).then(async (utxos: UTXO[]) => {

    })
```


## 构建交易

有了可用的未花费输出后，我们可以用它来构建包含合约的交易。

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

交易构建好后，似乎还少一点其他的。对没错，我们还没有为交易签名呢。可是我们没有私钥，如何进行签名？

钱包提供了 `getSignature` 接口，虽然我们没有私钥，但是可以请求钱包帮忙签名。

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

完成签名并设置对应的解锁脚本后，接下来就是广播包含合约的交易来部署合约了。广播交易我们使用钱包提供的 `sendRawTransaction` 接口。

```typescript
  static async sendTx(tx: Tx): Promise<string> {
    return web3.wallet.sendRawTransaction(toRawTx(tx));
  }
```

## 实战演习

1. 交易包含两个输出脚本： 一个是合约输出，另外一个是找零输出。我们已经添加了找零输出，请添加一个包含合约的输出。

2. `getSignature` 只是返回了签名，我们需要将签名和公钥组成一个解锁脚本，然后设置到交易中。
