# Chapter 2: Zero Knowledge Proof Basics

## Zero Knowledge Proof

A zero knowledge proof lets one party (i.e., a prover), who claims to know a secret, convince another party (i.e., a verifier) that the claim is valid, whilst not revealing the secret.

## Where’s Waldo?

Finding Waldo is a game where you have to find Waldo among a sea of people that look like him.

![TODO]()

Peggy (the prover) tells Victor (the verifier) that she knows where Waldo is in a scene but she doesn’t want to show him where exactly he is. Peggy finds a large piece of cardboard and cuts a Waldo shaped hole right in the middle.

![TODO]()

She then takes the Where’s Waldo scene (which is on a piece of paper) and tapes it to the back of the cardboard so that Waldo is occupying the Waldo shaped hole in the center. Victor should stand in front of the cardboard while Peggy is taping it up.

![TODO]()

When Victor sees Waldo through the hole, he is convinced that Peggy’s claim is valid, while not knowing Waldo’s exact location. That is a zero knowledge proof.

![TODO]()


## zk-SNARKs on Bitcoin

a zk-SNARK (zero-knowledge Succinct Non-interactive ARguments of Knowledge) is a protocol designed to generate a ZKP for any mathematical function. It can proved that one knows some mathematical secret using zero knowledge proof (ZKP), without revealing the secret itself.


The generated proof is “succinct” and “non-interactive”: a proof is only a few hundred bytes and can be verified in constant time and within a few milliseconds, without needing to ask additional questions of the prover. Together, these properties make zk-SNARK especially suitable for blockchains, where on-chain storage and computation can be expensive and senders often go offline after sending a transaction. Anonymous cryptocurrency [Zcash](https://z.cash/technology/zksnarks.html) and the smart-contract platform [Ethereum](https://github.com/ethereum/wiki/wiki/Byzantium-Hard-Fork-changes) are among its notable early adopters, among others.

A zk-SNARK consists of the following three algorithms: 

1. Key Generation
2. Prover
3. Verifier

When zk-SNARKs are used in blockchains, both the key and proof generation are executed off-chain. Only the general verification algorithm is run inside a smart contract on chain.

We implement the most widely used scheme [Groth16](https://eprint.iacr.org/2016/260.pdf) due to its [small proof size and fast verification](http://www.zeroknowledgeblog.com/index.php/groth16). The full code is [here](https://github.com/sCrypt-Inc/boilerplate/blob/master/contracts/zksnark.scrypt).

