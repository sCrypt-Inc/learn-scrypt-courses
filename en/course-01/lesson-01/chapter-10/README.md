# Chapter 10: Bitcoin Script

## Bitcoin UTXO Model

The bottom layer of Bitcoin uses a very special transaction model design, namely the UTXO (Unspent Transaction Outputs) model:

![UTXO](../../../../images/02.png)

UTXO model mainly includes two parts: input record and output record. The input contains the unlocking script, and the output contains the locking script.

## Script and contracts

Bitcoin Script is a stack-based scripting language. It is a set of instructions composed of opcodes. When verifying the unlocking script, connect the locking script to the back of the unlocking script to form a complete execution script.

Any behavior that spends **UTXO** can be regarded as a call of a contract: the unlocking script corresponds to the parameters of the public function, and the locking script corresponds to the function body of the public function.

![UTXO](../../../../images/01.png)

The contract is compiled into a locking script template. Instantiating a contract is actually instantiating a locking script template. When the contract is called, the unlocking parameters will be spliced with this locking script to form a complete execution script.

![UTXO](../../../../images/03.png)


Any act of spending bitcoins can be regarded as the execution of a contract. With the help of the versatility and flexible expression of the Bitcoin scripting language, arbitrarily complex contracts can be executed on the Bitcoin network.
