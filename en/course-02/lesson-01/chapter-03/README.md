# Chapter 3: zkSNARK-based Battleship Game


Battleship is a strategic guessing game for two players. It is played on a grid on which each player's fleet of warships are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/02.jpeg?raw=true" width="600">


## On-Chain Paradox

In an offline setting, two players sit opposite to each other and they cannot see each other’s fleet. But when playing on-chain in a smart contract, there seems a paradox.

On the one hand, we want game state transition to follow the rule of game and no player can cheat. For example, a player cannot move his fleet after placement to dodge a hit. A blockchain is ideal for this since both data and computation on it is publicly verifiable and auditable.
On the other hand, we need to keep parts of the state private to each user. But blockchain is open and transparent by nature.

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/10.jpeg?raw=true" width="600">


## zkSNARK comes to the rescue

We use zkSNARK to solve the problem. Each player first commits to his fleet location by hashing it and submitting it on chain. Using zkSNARK, a player can submit a proof of whether the opponent’s guessed coordinate is a hit or miss, against his own public hash of fleet location without disclosing it. The opponent can verify the proof is valid before any further moves. Thus we can make a fair on-chain Battleship game from it.

Note this is very different from the commit-reveal scheme we often used in smart contracts before, the location information is kept private to its owner throughout the entire game and never revealed.
