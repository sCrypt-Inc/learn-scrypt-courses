# Chapter 2: Implement the battleship circuit in Zokrates

## Design circuit

The first thing is to design the circuit for the game. Keep in mind that the purpose of the circuit is to enforce the main rules of the game which are listed as below:

- The game board is a 10*10 grid;
- There are five ships which can be placed on board in either horizontal or vertical directions, and they should be placed within the board:
    * Carrier is size of 5;
    * Battleship is size of 4;
    * Cruiser is size of 3;
    * Submarine is size of 3;
    * Destroyer is size of 2;

- Once the fleet were placed on board before a game start, they cannot be changed during the game;

- A shot represented by coordinates of (x, y) should be within the board and either hits or misses the fleet;

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/04.png?raw=true" width="600">


After confirming the rules, the next important job is to determine the inputs and outputs of the circuit, which seems to be very straightforward:

- Inputs: 
    * Private inputs: all the information about the fleet location
        * tuples of (pos_x, pos_y, direction) indicating each ship’s position on board;
    * Public inputs: all the information for a fire event
        * a committed hash of the fleet location;
        * target coordinates (pos_x, pos_y);
        * hit or miss any ship;
- Outputs: Nothing. (It will throw error if anything wrong with the inputs during proof or verification process)

## Write circuit in Zokrates

### Encode Fleet State

As discussed above, we can use a tuple of (pos_x, pos_y, orientation) to indicate a ship’s location on board, but how can we represent the whole fleet’s position state?

Note that the valid value of the position is between 0 to 9 and the orientation value is just 0 or 1. So we could just encode each of them in 4 bits, and connect them all to form a number that can represent the whole tuple. For example:

```
shipState = shipX + shipY * (1<<4) + shipOrientation * (1<<8);
```

With the same idea we can represent the whole fleet’s position state in just one `field`:

```
fleetState = carrierState + battleshipState * (1<<12) + cruiserState * (1<<24) + submarineState * (1<<36) + destroyerState * (1<<48);
```

### Mimc Hash

The next thing is to calculate the hash value of the fleet state. We choose a zkSNARK-friendly hash algorithm [`mimc7`](https://xiaohuiliu.medium.com/zk-friendly-hash-function-mimc-in-bitcoin-1236783d7f64) to do the job due to its small size in the final circuit. There are also other hash algorithms that can be used here.

We just make sure it’s the same as the declared one in public inputs:

```
assert(mimc7::<91>(shipState, 0) == shipHash);
```

### Hit or Miss

First we check whether the target position is valid:

```
assert(targetX >= 0 && targetX <= 9 && targetY >= 0 && targetY <= 9);
```

Then we can put the hit or miss logic in a help function and call it in the main:

```
def isShipHit(field x, field y, field o, field size, field targetX, field targetY) -> bool {
    return ((o == 0 && targetX == x && targetY >= y && targetY <= y + size - 1) || (o == 1 && targetY == y && targetX >= x && targetX <= x + size - 1));
}
```

The last thing is to check whether any ship got hit as declared in public inputs:

```
assert(hit == (isCarrierHit || isBattleshipHit || isCruiserHit || isSubmarineHit || isDestroyerHit));
```



## Put it to the test

Finally we get the complete circuit code as shown on the right.

Please check in `battleship.zok` that the coordinates of the shot are valid.


### Bonus Update

If you look carefully at the code we just accomplished, you may find that we do not check the validity of the ship’s position. That means one could cheat its opponent by giving an invalid ship location as private inputs at the beginning, thus the ship could never be hit. Can you update the circuit to prevent this from happening? Try and see the answer we provided.


```
def isShipWithinBoard(field x, field y, field o, field size) -> bool {
    return ((o == 0 && x >= 0 && x <= 9 && y >= 0 && y <= 10 - size) || (o == 1 && x >= 0 && x <= 10 - size && y >= 0 && y <= 9));
}

def main(…) {
    assert(isShipWithinBoard(carrierX, carrierY, carrierO, 5));
    assert(isShipWithinBoard(battleshipX, battleshipY, battleshipO, 4));
    assert(isShipWithinBoard(cruiserX, cruiserY, cruiserO, 3));
    assert(isShipWithinBoard(submarineX, submarineY, submarineO, 3));
    assert(isShipWithinBoard(destroyerX, destroyerY, destroyerO, 2));
    …
}
```


### Credits

In fact the circuit was created based on code from [this repo](https://github.com/tommymsz006/zkbattleship-circuit), with which we made some changes.

