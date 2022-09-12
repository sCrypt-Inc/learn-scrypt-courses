# Chapter 2: Implementing the Battleship circuit Using circom

## Design circuit

The circuit design is the same as the Zokrates.

## Writing circuits using circom

### Encode Fleet State

As mentioned above, we can use a tuple of `(pos_x, pos_y, orientation)` to represent the position of a ship in the grid, but how do we represent the positional state of the entire fleet?


Note that valid values for position are between `0` and `9`, and direction values are only `0` or `1`. So we can encode each of them as `4` bits and concatenate them all to form a number that can represent the whole tuple. E.g:

```
var val =  ships[i][0] + (ships[i][1] * 16) + (ships[i][2] * 16 * 16);
```

Using the same idea, we can represent the positional state of the entire fleet in one variable:

```
var multiplier = 1;
var sum = 0;
for (var i = 0; i < 5; i++) {
    var val =  ships[i][0] + (ships[i][1] * 16) + (ships[i][2] * 16 * 16);
    sum += val * multiplier;
    multiplier *= 16 ** 3;
}
```

### Mimc Hash

The next thing is to calculate the hash value of the fleet state. We choose a zkSNARK-friendly hash algorithm [`mimc7`](https://blog.csdn.net/freedomhero/article/details/125716173) to do the job due to its small size in the final circuit. There are also other hash algorithms that can be used here.

We just make sure it’s the same as the declared one in public inputs:

```
// import mimc library
include "../node_modules/circomlib/circuits/mimc.circom";

component mimc = MiMC7(91);
var sum = 0;
...
mimc.x_in <== sum;
mimc.k <== 0;
assert(boardHash == mimc.out);
```

### Hit or Miss

First we check whether the target position is valid:

```
// 1. validate the guess is actually valid
assert(guess[0] >= 0 && guess[0] < boardSize);
assert(guess[1] >= 0 && guess[1] < boardSize);
```

Then we can put the hit or miss logic in a help function and call it in the main:

```
function isMatch(guess, ship, len) {
  if (ship[2] == 0) { // Down
    return
      guess[0] == ship[0] &&
      guess[1] >= ship[1] &&
      guess[1] <  ship[1] + len;
  } else { // Right
    return
      guess[1] == ship[1] &&
      guess[0] >= ship[0] &&
      guess[0] <  ship[0] + len;
  }
}
```


The last thing is to check whether any ship got hit as declared in public inputs:

```
  // 3. check if it's a hit
  isHit <-- (
    isMatch(guess, ships[0], lengths[0]) ||
    isMatch(guess, ships[1], lengths[1]) ||
    isMatch(guess, ships[2], lengths[2]) ||
    isMatch(guess, ships[3], lengths[3]) ||
    isMatch(guess, ships[4], lengths[4])
  );
```


### Put it to the test

Finally we get the complete circuit code as shown on the right.

If you look carefully at the code we just accomplished, you may find that we do not check the validity of the ship’s position. That means one could cheat its opponent by giving an invalid ship location as private inputs at the beginning, thus the ship could never be hit. Can you update the circuit to prevent this from happening? Try and see the answer we provided.


### Credits

In fact the circuit was created based on code from [this repo](https://github.com/kunalmodi/battlesnark/blob/2fac2b02934ac89d48cac8af71baefd5cc8b7e32/circuits/move.circom), with which we made some changes.