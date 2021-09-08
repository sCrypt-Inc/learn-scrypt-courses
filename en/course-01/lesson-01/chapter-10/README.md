# Chapter 10: Checking the preimage

## Preimage

Bitcoin signature is to generate a hash digest of a message, and then sign the digest. The preimage is the message used to generate the hash digest, which  is calculated based on the current transaction.

[Preimage format](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md#digest-algorithm) is as follows:

![](https://img-blog.csdnimg.cn/20200712222718698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

## Check Preimage

sCrypt implements the [OP_PUSH_TX](https://xiaohuiliu.medium.com/op-push-tx-3d3d279174c1) algorithm, and encapsulates it into the standard contract function `Tx.checkPreimage` for calibration Check whether the incoming parameter is the prepicture of the current transaction.

```solidity
contract OP_PUSH_TX {
    public function unlock(SigHashPreimage preimage) { 
        require(Tx.checkPreimage(preimage));
    }
}
```


## Get contract locking script

Use `Tx.checkPreimage` to ensure that the preimage is the preimage of the current transaction. Since the preimage contains transaction-related data, it is possible to access the locking script `scriptCode` of the contract called by the current transaction.

```solidity
static function scriptCode(SigHashPreimage txPreimage) : bytes {
    return Util.readVarint(txPreimage[104 : ]);
}

```


## Put it to the test

The `TicTacToe` contract is a stateful contract. The public function `move` is continuously called through the transaction to trigger the execution of the contract, thereby updating the state.
Therefore, **OP_PUSH_TX** technology must be used to maintain the state of the contract.

1. Check if the last parameter `txPreimage` of the `move` function is the preimage of the current transaction.

2. Get the contract's locking script `scriptCode`

