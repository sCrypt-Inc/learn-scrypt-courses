# Chapter 1: Implement the Battleship contract

After implementing the circuit, we export a zkSNARK validator with the following command:

## 1. zokrates

```
zokrates export-verifier-scrypt
```

## 2. snarkjs

```
snarkjs zkey export scryptverifier
```

We get an sCrypt project under `verifier/`. With this verifier we can implement the Battleship contract with ZKP. We can start building the actual game logic in the contract. In our case, we can pass a board state (private) and move, and emit whether it's a hit. The contract just needs the proof to ensure the absence of cheating.


The Battleship game consists of two players: you and a computer. The Battleship contract contains four properties:

1. `player` : public key used to check the signature to confirm that you executed the contract.
2. `computer`: public key used to check the signature to confirm that the computer executed the contract.
3. `playerBoardHash` : A hash commitment of the positions and orientations of all your ships
4. `computerBoardHash` : A hash commitment of the positions and orientations of all computer’s ships

In addition to the above four properties, the contract also contains three state properties:

1. `successfulPlayerHits` : Indicates how many times you hit the battleship
2. `successfulComputerHits` : Indicates how many times the computer player has hit the ship
3. `playerTurn` : Indicates that it's your turn or the computer’s to fire


When the game starts, you and the computer each secretly place the ships and calculate the hash commitment. The contract is initialized with the hashed commitments and public keys of both players.


The contract contains a public method named `move()`. In the `move()` method, we use the zk-SNARK verifiers `verifyProof()` method to check the firing submitted by the other player.


`verifyProof()` contains four inputs and a proof:


1. Your or computer’s hash commitment.
2. `x`, `y` indicate where the player fires.
3. `hit` indicates the other party reports whether you hit or not.
4. `proof` is the proof that the other party generates for their own firing. With the verifier library and the proof provided by the other party, you can check whether the other party is honest.

If the other party provides an honest result, it will pass the check, otherwise it will fail. Afterwards, we check whether the signature of the player calling the contract is valid and update the number of times the corresponding player hit the battleship according to whether the battleship is hit, that is, we update the state properties `successfulPlayerHits` and `successfulComputerHits`. Finally we update the `playerTurn` flag. If someone hits the ships `17` times first, he wins the game and the game is over. If not, save the latest states and wait for the next move.


## Put it to the test


In summary, we have achieved the Battleship contract. In the contract we imported and called the sCrypt zk-SNARK verifier code that we exported in a previous step.



