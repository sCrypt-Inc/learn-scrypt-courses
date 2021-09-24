# Chapter 10: Bitcoin Script

## UTXO Model

Bitcoins are locked in outputs of transactions. To spend bitcoins in an output, a transaction has to provide a matching key in its input. Bitcoins can only be transferred to new outputs when the key can open the lock successfully. This is the so called UTXO（Unspent Transaction Outputs）model. As an example shown below, two transactions each have one input and one output. The input on the right spends the output on the left.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/02.png?raw=true" width="600">

## Bitcoin Script Language

Both lock and key are encoded in a language called [Bitcoin Script](https://wiki.bitcoinsv.io/index.php/Script). It is the instruction set for the [Bitcoin Virtual Machine](https://xiaohuiliu.medium.com/introduction-to-bitcoin-smart-contracts-9c0ea37dc757), an assembly-like low-level language. The script in the key and lock are called unlocking and locking script, respectively.

## Script and sCrypt

sCrypt is a high-level language, compiled to Script. They are analogous to Java and [Java virtual machine](https://en.wikipedia.org/wiki/Java_virtual_machine) bytecode. Specifically, sCrypt public function parameters correspond to unlocking script, its body to locking script, as shown below.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/01.png?raw=true" width="600">
