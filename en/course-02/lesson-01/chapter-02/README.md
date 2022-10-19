# Chapter 2: Zero Knowledge Proof Basics

## Zero Knowledge Proof

A zero knowledge proof lets one party (i.e., a prover), who claims to know a secret, convince another party (i.e., a verifier) that the claim is valid, whilst not revealing the secret.

## Where’s Waldo?

Finding Waldo is a game where you have to find Waldo among a sea of people that look like him.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/06.png?raw=true" width="600">

Peggy (the prover) tells Victor (the verifier) that she knows where Waldo is in a scene but she doesn’t want to show him where exactly he is. Peggy finds a large piece of cardboard and cuts a Waldo shaped hole right in the middle.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/07.png?raw=true" width="600">

She then takes the Where’s Waldo scene (which is on a piece of paper) and tapes it to the back of the cardboard so that Waldo is occupying the Waldo shaped hole in the center. Victor should stand in front of the cardboard while Peggy is taping it up.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/08.png?raw=true" width="600">

When Victor sees Waldo through the hole, he is convinced that Peggy’s claim is valid, while not knowing Waldo’s exact location. That is a zero knowledge proof.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/09.png?raw=true" width="600">


## zk-SNARKs on Bitcoin

A zk-SNARK (zero-knowledge Succinct Non-interactive ARguments of Knowledge) is a protocol designed to generate a ZKP for any mathematical function. 


The generated proof is “succinct” and “non-interactive”: a proof is only a few hundred bytes and can be verified in constant time and within a few milliseconds, without needing to ask additional questions of the prover. Together, these properties make zk-SNARKs especially suitable for blockchains, where on-chain storage and computation can be expensive and senders often go offline after sending a transaction. Anonymous cryptocurrency [Zcash](https://z.cash/technology/zksnarks.html) and the smart-contract platform [Ethereum](https://github.com/ethereum/wiki/wiki/Byzantium-Hard-Fork-changes) are among its notable early adopters, among others.

A zk-SNARK consists of the following three algorithms: 

1. Key Generation
2. Prover
3. Verifier

### 1. Key Generation

A key generator `G` takes a secret parameter `λ` and a function `C`, and produces a proving key `pk` and a verification key `vk`. Both keys are made public.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/12.png?raw=true" width="600">


`C` is a boolean function (also called a program or circuit) that takes two inputs: a public input `x` and a private input `w` (aka, witness). For example, `C` can be a function that checks if `w` is the sha256 preimage of the digest `x`.

```
C(x, w) = sha256(w) == x
```

### 2. Prover

The prover `P` takes as input the proving key `pk`, a public input `x` and a private witness `w` to produce a proof that the prover knows a witness `w` that makes `C(x, w)` evaluates to true.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/13.png?raw=true" width="600">

### 3. Verifier

The verifier `V` takes verification key `vk`, the proof, and the public input `x` and accepts the proof only if it is produced with the knowledge of witness `w`.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/14.png?raw=true" width="600">

## Implementation

When zk-SNARKs are used in blockchains, both the key and proof generation are executed off-chain. Only the general verification algorithm is run inside a smart contract on chain.

We implement the most widely used scheme [Groth16](https://eprint.iacr.org/2016/260.pdf) due to its [small proof size and fast verification](http://www.zeroknowledgeblog.com/index.php/groth16). And we also implement [PLONK](https://xiaohuiliu.medium.com/how-plonk-works-part-1-bc8050f4805e), which does not requires a new trusted setup for each circuit. 

The full code is here: 

- [Groth16](https://github.com/sCrypt-Inc/boilerplate/blob/master/contracts/zksnark.scrypt)
- [PLONK](https://github.com/sCrypt-Inc/boilerplate/blob/master/contracts/plonk.scrypt)


