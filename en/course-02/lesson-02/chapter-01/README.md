# Chapter 1: Introduction to Zokrates

[Zokrates](https://zokrates.github.io/) is a toolbox for zkSNARK, hiding significant complexity inherent to zero-knowledge proofs (ZKP). It provides a python-like higher-level language for developers to code the computational problem they want to prove.

We extend it to generate and verify proofs on Bitcoin.

## Install 

### From binary
```
curl -Ls https://scrypt.io/scripts/setup-zokrates.sh | sh -s -
```

### From source
You can build our [extended version](https://github.com/sCrypt-Inc/zokrates) from source with the following commands:

```
git clone https://github.com/sCrypt-Inc/zokrates
cd ZoKrates
cargo +nightly build -p zokrates_cli --release
cd target/release
```

Note Zokrates itself was written in Rust Language, you may need to set up the Rust environment first before trying to build it.

## Workflow

The whole workflow is the same as the original ZoKrates, except that the verification step is done on Bitcoin. Generally speaking, it contains following steps:

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/03.png?raw=true" width="600">


### 1. Design a circuit 

Implement the circuit in the Zokrates language. For example, this simple circuit/program named factor.zok proves one knows the factorization of an integer n into two integers, without revealing the integers. The circuit has two private inputs named p and q and one public input named n. You can refer to https://zokrates.github.io/ for more information on how to use Zokrates.

```python
// p and q are factorization of n
def main(private field p, private field q, field n) {
    assert(p * q == n);
    assert(p > 1);
    assert(q > 1);
    return;
}
```

### 2. Compile the circuit

Compile the circuit with the following command:

```
zokrates compile -i my_circuit.zok
```
### 3. Setup

This generates a proving key and a verification key for this circuit.

```
zokrates setup
```
### 4. Calculating a witness

A proof attests that a prover knows some secret/private information that satisfies the original program. This secret information is called a witness. In the following example, 7 and 13 are the witnesses, as they are factors of 91.

```
zokrates compute-witness -a 7 13 91
```
### 5. Create a proof

It produces a proof, using both the proving key and the witness.

```
zokrates generate-proof
```

### 6. Export an sCrypt verifier

This outputs a smart contract file `verifier.scrypt`, containing all the necessary code to verify a proof.

```
zokrates export-verifier-scrypt
```

### 7. Verify the proof

You can verify it locally:

```
zokrates verify
```

## Put it to the test

Complete the circuit on the right to ensure that the square of the private input `x` equals `y` .