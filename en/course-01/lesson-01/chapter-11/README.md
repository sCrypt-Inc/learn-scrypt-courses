# Chapter 11: Get Sighash Preimage

## Sighash Preimage

In generating a signature for a message in Bitcoin, the message is first hashed into a digest, which is then signed. The message signed in an input (i.e., where the resulting signature resides) is called its sighash preimage. It roughly consists the current transaction containing the input and the UTXO it spends from. In the example below, the sighash preimage of the first input in `tx1` is circled in red. Note different inputs have different sighash preimages, even if they are in the same transaction, since they spend different UTXOs.

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/05.png?raw=true)

[Its detailed format](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md#digest-algorithm) is as follows:

     1. nVersion of the transaction (4-byte little endian)
     2. hashPrevouts (32-byte hash)
     3. hashSequence (32-byte hash)
     4. outpoint (32-byte hash + 4-byte little endian) 
     5. scriptCode of the input (serialized as scripts inside CTxOuts)
     6. value of the output spent by this input (8-byte little endian)
     7. nSequence of the input (4-byte little endian)
     8. hashOutputs (32-byte hash)
     9. nLocktime of the transaction (4-byte little endian)
    10. sighash type of the signature (4-byte little endian)

## Check Sighash Preimage

A contract is in the locking script of an output, as seen in the last chapter. To check whether a sighash preimage is that of the input spending the output, simply call a standard library function [`Tx.checkPreimage`](https://scryptdoc.readthedocs.io/en/latest/contracts.html#contract-op-push-tx).

```
contract TicTacToe {

    ...
    
    public function move(int n, Sig sig, int amount, SigHashPreimage txPreimage) {
        require(Tx.checkPreimage(txPreimage));
    }
}
```