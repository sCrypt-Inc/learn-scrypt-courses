# Chapter 9: Signature Verification

The `sig` parameter of the `move()` function is the player's signature. If the signature is not verified, anyone can call the contract's `move()` method to move the piece.

The following example is the most common contract in the Bitcoin network: pay to public key hash.

```js
contract P2PKH {
    Ripemd160 pubKeyHash;

    public function unlock(Sig sig, PubKey pubKey) {
        require(hash160(pubKey) == this.pubKeyHash);
        require(checkSig(sig, pubKey));
    }
}
```

The signature and public key of pay to public key hash are both passed in from the unlock parameter. In the `TicTacToe` contract, only the signature is passed in from the unlock parameter, and the player's public key has been stored in the contract's `PubKey alice` and `PubKey bob` properties.


## Put it to the test

1. Verify the `sig` signature parameter of the `move()` function.