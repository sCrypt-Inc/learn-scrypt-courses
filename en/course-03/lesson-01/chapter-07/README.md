# Chapter 7:  Signature Verification

Once the game contract is deployed, anyone can view and potentially interact with it. We need a authentication mechanism to ensure only the desired player can update the contract if it's their turn. This is achieved using ditigal signatures.

The following example is the most common contract in the Bitcoin network: [Pay to Public Key Hash](https://learnmeabitcoin.com/technical/p2pkh) (P2PKH), which is commonly referred to as a Bitcoin address.

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
        assert(hash160(pubkey) == this.pubKeyHash, 'public key hashes are not equal')
        // Check the signatures validity.
        assert(this.checkSig(sig, pubkey), 'signature check failed')
    }

```
`this.checkSig()` is used to verify a signature against a public key.

## Put it to the test

1. Verify the `sig` parameter against the desired player in `move()`, identified by their public key stored in the contract's properties.