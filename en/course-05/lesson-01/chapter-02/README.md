# Chapter 2: Writing the Smart Contract

## Contract Properties
In this section, we'll define the properties of the voting smart contract, such as candidate names and their votes received. We'll use sCrypt's FixedArray to represent the list of candidates.

```ts
export type Name = ByteString
export type Candidate = {
  name: Name
  votesReceived: bigint
}
export const N = 2
export type Candidates = FixedArray<Candidate, typeof N>

export class Voting extends SmartContract {
  @prop(true)
  candidates: Candidates
  // ... (constructor and methods)
}
```

## Constructor and Methods
Next, we'll initialize the contract properties in the constructor and implement the vote method to allow users to cast their votes.

```ts
constructor(names: FixedArray<Name, typeof N>) {
  super(...arguments)
  // initialize fixed array
  this.candidates = fill({
    name: toByteString(''),
    votesReceived: 0n
  }, N)
  // set names and set votes they received to 0
  for (let i = 0; i < N; i++) {
    this.candidates[i] = { name: names[i], votesReceived: 0n }
  }
}

@method()
public vote(name: Name) {
  this.increaseVotesReceived(name)
  let outputs: ByteString = this.buildStateOutput(this.ctx.utxo.value)
  outputs += this.buildChangeOutput()
  assert(this.ctx.hashOutputs === hash256(outputs), 'hashOutputs mismatch')
}

```


Congratulations! You have completed the Voting contract. Here's the final complete code at [Github](https://github.com/sCrypt-Inc/voting/blob/master/src/contracts/voting.ts).
