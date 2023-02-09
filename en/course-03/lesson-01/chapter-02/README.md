# Chapter 2: sCrypt overview

`sCrypt` an `embedded Domain Specific Language` ([sDSL](https://en.wikipedia.org/wiki/Domain-specific_language#External_and_Embedded_Domain_Specific_Languages)) based on TypeScript for writing smart contracts on Bitcoin SV. `Embedded` means that it is a language inside another language. `sCrypt` is strictly a subset of TypeScript, so all `sCrypt` code is valid TypeScript, but not vice versa.

We choose [TypeScript](https://www.typescriptlang.org) as the host language because it provides an easy, familiar language (JavaScript), but with type safety, making it easy to get started writing safe smart contracts. There is no need to learn a new programming language or tools, if you are already familiar with TypeScript/JavaScript.
If you're new to TypeScript, check out this helpful [introductory video](https://www.youtube.com/watch?v=ahCwqrYpIuM).


## How do Bitcoin Smart Contracts work?

Smart contracts on Bitcoin are based on the UTXO model, which is very different from an account model like Ethereum used.

### UTXO model

Each bitcoin transaction consists of some inputs and outputs.
An output contains:

- The amount of bitcoins it contains.
- bytecodes (called the locking script).

while an input contains:
- A reference to the previous transaction output.
- bytecodes (the unlocking script).

An Unspent Transaction Output (UTXO) is an output not consumed in any transaction yet. The low-level bytecode/opcode is called [Bitcoin Script](https://wiki.bitcoinsv.io/index.php/Script), which is interpreted by the [Bitcoin Virtual Machine](https://xiaohuiliu.medium.com/introduction-to-bitcoin-smart-contracts-9c0ea37dc757) (BVM).

![](https://scrypt.io/scrypt-ts/assets/images/utxo-a4cf31c29158072cdfbfae3366522ba5.jpg)

The locking script can be regarded as a boolean function `f` that specifies conditions to spend the bitcoins in the UTXO (thus the name "locking"), acting as a lock.
The unlocking script in turns provides the function arguments that makes `f` evaluates to `true`, i.e., the "key" (also called witness) needed to unlock.
Only when an input contains the “key” matching previous output’s “lock”, it can spend bitcoins contained in the output.

In [a regular Bitcoin payment](https://wiki.bitcoinsv.io/index.php/Bitcoin_Transactions#Pay_to_Public_Key_Hash_.28P2PKH.29), the locking script, containing a [Bitcoin address](https://wiki.bitcoinsv.io/index.php/Bitcoin_address), checks the spender has the right private key to produce a valid signature in the unlocking script. The expressive Script enables the locking script to specify arbitrarily more complex spending conditions, i.e., Bitcoin smart contracts.

## How does `sCrypt` work?

`sCrypt` compiles to Bitcoin Script and is used as a locking script when constructing transactions.
