# Chapter 7:  Signature verification


The `sig` parameter of the `move()` function is the player's signature. If the signature is not verified, anyone can call the contract's `move()` method to move the pawn.

The following example is the most common contract in the Bitcoin network: [Pay to Public Key Hash](https://learnmeabitcoin.com/technical/p2pkh)(Pay to Public Key Hash: P2PKH), which is commonly referred to as a Bitcoin address.

```ts
export class P2PKH extends SmartContract {
    // Address of the recipient.
    @prop()
    readonly pubKeyHash: PubKeyHash

    constructor(pubKeyHash: PubKeyHash) {
        super(...arguments)
        this.pubKeyHash = pubKeyHash
    }

    @method()
    public unlock(sig: Sig, pubkey: PubKey) {
        // Check if the passed public key belongs to the specified address.
        assert(
            hash160(pubkey) == this.pubKeyHash,
            'public key hashes are not equal'
        )
        // Check the signatures validity.
        assert(this.checkSig(sig, pubkey), 'signature check failed')
    }

```

Both the signature and the public key paid to the public key hash are passed in from the methed's parameters. Only the signature of the `TicTacToe` contract is passed in from the parameters, because the player’s public key has been stored in the contract’s `PubKey alice` and `PubKey bob` properties.


## Put it to the test

1. Verify the `sig` signature parameter of the `move()` function.