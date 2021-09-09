# Chapter 10: Checking the preimage

## Preimage

In generating a signature for a message in Bitcoin, it is first hashed into a digest, which is then signed. The message signed is called the Sighash preimage, which is mainly calculated from the current transaction.

[Its format](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md#digest-algorithm) is as follows:

![](https://img-blog.csdnimg.cn/20200712222718698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

## Check Sighash Preimage

sCrypt has implemented the [OP_PUSH_TX](https://xiaohuiliu.medium.com/op-push-tx-3d3d279174c1) algorithm, and wraps it into a standard library function called `Tx.checkPreimage`, checking whether the passed parameter is the sighash preimage of the current transaction.

```solidity
contract OP_PUSH_TX {
    public function unlock(SigHashPreimage preimage) { 
        require(Tx.checkPreimage(preimage));
    }
}
```


## Get contract locking script

We can use `Tx.checkPreimage` to ensure that a sighash preimage is for the current transaction. Since the preimage contains transaction-related data, we can access the locking script of the contract called by the current transaction, in the `scriptCode` field.

```solidity
static function scriptCode(SigHashPreimage txPreimage) : bytes {
    return Util.readVarint(txPreimage[104 : ]);
}

```


## Put it to the test

The `TicTacToe` contract is a stateful contract. The public function `move` is continuously called through transactions to trigger the execution of the contract, thereby updating the state.

1. Check if the last parameter `txPreimage` of the `move` function is the preimage of the current transaction.

2. Get the contract's locking script `scriptCode`

