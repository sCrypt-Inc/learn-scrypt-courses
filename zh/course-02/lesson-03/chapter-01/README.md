# Chapter 1: Implement the battleship contract

After implementing the circuit, we export a zkSNARK verifier in sCrypt by following command, as in the [sixth step](https://xiaohuiliu.medium.com/create-your-first-zero-knowledge-proof-program-on-bitcoin-ec159cc501f4) in the workflow:

```
zokrates export-verifier-scrypt
```

We get a library named `verifier.scrypt`. With this verifier library, we can implement the battleship contract with ZKP. We can start building the actual game logic in the contract.

The Battleship game consists of two players: you and athe computer. The battleship contract contains four properties:

`PubKey you` :  used to check the signature to confirm that you executed the contract.
`PubKey computer`: used to check the signature to confirm that the computer executed the contract.
`int yourHash` : A hash commitment of the positions and orientations of all your ships
`int computerHash` : A hash commitment of the positions and orientations of all computer’s ships

In addition to the above four properties, the contract also contains three state properties:

`successfulYourHits` : Indicates how many times you hit the battleship
`successfulComputerHits` : Indicates how many times the computer player has hit the ship
`yourTurn` : Indicates that it's your turn or the computer’s to fire


When the game starts, you and the computer each secretly place the ships and calculate the hash commitment. The contract is initialized with the hashed commitments and public keys of both players.


The contract contains a public function named `move()`. In the `move()` function, we use the zkSNARK verifier to check the firing submitted by the other player.


```
 require(ZKNARK.verify([this.yourTurn ? this.computerHash : this.yourHash, x, y, hit ? 1 : 0], proof));
```

`ZKNARK.verify()` contains four inputs and a proof:


1. Your or computer’s hash commitment.
2. `x`, `y` indicate where the player fires.
3. `hit` indicates the other party reports whether you hit or not.
4. `proof` is the proof that the other party generates for their own firing. With the verifier library and the proof provided by the other party, you can check whether the other party is honest.

If the other party provides an honest result, it will pass the check, otherwise it will fail. Afterwards, we check whether the signature of the player calling the contract is valid and update the number of times the corresponding player hit the battleship according to whether the battleship is hit, that is, we update the state properties `successfulYourHits` and `successfulComputerHits`. Finally we update state properties `yourTurn`. If someone hits the ships `17` times first, he wins the game and the game is over. If not, save the latest states and wait for the next move.


In conclusion, we have implemented the battleship contract, including verification of zkSNARK proofs in contracts and maintenance of game state.



