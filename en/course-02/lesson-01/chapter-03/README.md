# Chapter 3: zkSNARK-based Battleship Game


Battleship is a strategic guessing game for two players. It is played on a grid on which each player's fleet of warships are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet.

![TODO]()


## Incomplete Information Problem

In an offline setting, two players sit opposite to each other and they cannot see each other’s fleet. But when playing online, especially through an on-chain smart contract, a player cannot tell the smart contract the critical information about his fleet during the game, otherwise its component will also know.  Is there any way for the contract to verify each response of moves and update the game state under this situation? In other words, can we make this game a fair incomplete information game?

## zkSNARK Solution

We use zkSNARK to solve the problem. Each player first commits to his fleet location by hashing it and submitting it on chain. Using zkSNARK, a player can submit a proof of whether the opponent’s guessed coordinate is a hit or miss, against his own public hash of fleet location without disclosing it. The opponent can verify the proof is valid before any further moves. Thus we can make a fair P2P battleship game from it.

Note this is very different from the commit-reveal scheme we often used in smart contracts before, the location information is kept private to its owner throughout the entire game.
