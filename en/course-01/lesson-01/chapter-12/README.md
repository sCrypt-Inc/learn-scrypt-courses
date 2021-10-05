# Chapter 12: Contract Status

The locking script of a stateful contract is divided into data and code. The data part is the state. The code part contains the state transition rule, which is the business logic of the contract.

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/04.png?raw=true)

To manage the state, we require that the code part of the contract cannot be changed (that is, the contract rules cannot be changed), and the change of the data part (state) must comply with the state transition rules specified in the code part. Below is a simple counter contract. Its state is the number of times public function ``increment()`` has been called (initialized to 0), stored in the last byte of the locking script.


```
contract Counter {
    public function increment(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));

        // deserialize state (i.e., counter value)
        bytes scriptCode = Util.scriptCode(txPreimage);
        int scriptLen = len(scriptCode);
        // counter is at the end
        int counter = unpack(scriptCode[scriptLen - Util.DataLen :]);

        // increment counter
        counter++;

        // serialize state
        bytes outputScript = scriptCode[: scriptLen - Util.DataLen] + num2bin(counter, Util.DataLen);
        
        bytes output = Util.buildOutput(outputScript, amount);
        // ensure output is expected: amount is same with specified
        // also output script is the same with scriptCode except counter incremented
        require(hash256(output) == Util.hashOutputs(txPreimage));
    }
}
```

## Deserialization State

We have parsed the current state of the contract from the lockingScript of the contract: `counter`.
```
// deserialize state (i.e., counter value)
bytes scriptCode = Util.scriptCode(txPreimage);
int scriptLen = len(scriptCode);
// counter is at the end
int counter = unpack(scriptCode[scriptLen - Util.DataLen :]);
```


## Update State
Next we need to update this state.

```
// increment counter
counter++;
```

## Serialization State
Usually, after updating the state, it is necessary to splice the new state with the code part to obtain the lockingscript containing the new state contract, and construct a transaction output containing the contract.

```
// serialize state
bytes outputScript = scriptCode[: scriptLen - Util.DataLen] + num2bin(counter, Util.DataLen);
bytes output = Util.buildOutput(outputScript, amount);
```
  
## Constraint Transaction Output
By updating the state we have generated the `Counter` contract with the new state. Now we need to ensure that the output of the current transaction must include this new contract. How to ensure that?

Sighash preimage contains the hash of all outputs in the transaction: `hashOutputs`. If this hash value is the same with the hash value of all outputs in the current transaction, we can be sure that the outputs of current transaction is consistent with the outputs we constructed in the contract, and the contract with updated state is included.

The outputs of the current transaction are constrained by the following code:

```
// ensure output is expected: amount is same with specified
// also output script is the same with scriptCode except counter incremented
require(hash256(output) == Util.hashOutputs(txPreimage));
```