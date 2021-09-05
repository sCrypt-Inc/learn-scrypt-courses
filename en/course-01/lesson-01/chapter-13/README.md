# Chapter 13: Accessing the transaction context through the preimage

## Accessing the transaction context

Use **OP_PUSH_TX** to ensure that the preimage is the preimage of the current transaction. Since the preimage contains transaction-related data, it is possible to access the context of the current transaction by accessing various fields in the preimage, such as accessing the `nLocktime` of the current transaction.

```solidity
static function nLocktimeRaw(SigHashPreimage txPreimage) : bytes {
    int l = len(txPreimage);
    return txPreimage[l - 8 : l - 4];
}

```

Access the original byte `scriptCode` of the contract called by the current transaction

```solidity
static function scriptCode(SigHashPreimage txPreimage) : bytes {
    return Util.readVarint(txPreimage[104 : ]);
}

```


##  Put it to the Test

1. Use the original byte `scriptCode` of the contract called by the current transaction to be read through the  preimage

