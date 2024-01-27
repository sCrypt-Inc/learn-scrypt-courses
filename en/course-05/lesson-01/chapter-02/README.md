# Chapter 2: Writing the Smart Contract

## 1. Contract Properties:

Our smart contract, named `Voting`, will contain a property of sCrypt's `FixedArray`, which represents the list of candidates.

This elements of this array are of a custom type `Candidate`, which holds the candidates name and keeps track of the number of votes the candidate has received, i.e. the vote counter. Since the vale of these counters will change upon a vote, the array will be marked as a stateful property.

## 2. Constructor and Methods:

We initialize the contract properties in the constructor and implement the vote method to allow users to cast their votes.

The constructor takes in an array of candidate names. The final array for the `candidates` contract property then gets constructed, which has all the vote counters set to 0.

Our smart contract will only contain a single public method named `voting`. The method takes in the name of the selected candidate one wishes to cast a vote for. Upon a call it then increments the vote counter of the respective candidate.


## Put it to the test

1. Define the `Candidate` type used in our `candidates` array.
2. Finish the `increaseVotesReceived` private method.

You can view the final complete code at [Github](https://github.com/sCrypt-Inc/voting/blob/master/src/contracts/voting.ts).
