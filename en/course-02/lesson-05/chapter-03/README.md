# Chapter 3: Integrate the circuit with `snarkjs`

Snarkjs provides a Javascript library [`snarkjs.min.js`](https://github.com/sCrypt-Inc/snarkjs#in-the-browser) that can be used in a web browser. It can be copied to the project's resources directory with this command:

```
cp node_modules/snarkjs/build/snarkjs.min.js  ./public/zk/
```

## `CircomProvider` initialization


Let's look at the code for the `CircomProvider.init()` function, which should be called before any other API. Its job is to load these static resources into the browser to build the singleton instance.
The resource file `/zk-battleship/zk/battleship.wasm` is the output of the compilation process, `/zk-battleship/zk/circuit_final.zkey` and `/zk-battleship/zk/ verification_key.json` are the output of the setup process.

```js
static async init() {
  // console.log('ZKP init...')
  if (CircomProvider.instance) return CircomProvider;
  try {
    let verification_key = await fetch('/zk/verification_key.json').then(resp => resp.json());
    CircomProvider.instance = new CircomProvider(
      "/zk/battleship.wasm",
      "/zk/circuit_final.zkey",
      verification_key
    );
    console.log('ZKP initialized.')
    return CircomProvider;
  } catch (error) {
    console.log('init CircomProvider fail', error)
  }
}
```

## Wrap zero-knowledge-proof related APIs in `CircomProvider`

The API provided by `snarkjs` covers the entire ZKP workflow we mentioned in the previous chapter, including:


**PLONK**

- Generating proof `snarkjs.plonk.fullProve()`
- Verifying proof `snarkjs.plonk.verify()`

**Groth16**

- Generating proof `snarkjs.groth16.fullProve()`
- Verifying proof `snarkjs.groth16.verify()`

We wrap the two APIs into the `CircomProvider` class.


## Add ZKP-related logic to the firing event handlers


We create a new function called `handleFire` to process the ZKP-related logic in the game. The code looks like this:

```js


function runCircom(privateInputs, publicInputs) {
  return CircomProvider
    .init()
    .then(async () => {
      return CircomProvider.generateProof({
        "boardHash": publicInputs[0],
        "guess": publicInputs.slice(1),
        "ships": privateInputs
      });
    })
    .then(async ({ proof, publicSignals, isHit }) => {
      const isVerified = await CircomProvider.verify({ proof, publicSignals });
      return { isVerified, proof, isHit };
    })
    .catch(e => {
      console.error('runCircom error:', e)
      return {
        isVerified: false
      }
    })
}

const handleFire = (role, targetIdx, isHit, newStates) => {
  const isPlayerFired = role === 'player';
  const privateInputs = toPrivateInputs(isPlayerFired ? computerShips : placedShips);
  const position = indexToCoords(targetIdx);
  const publicInputs = [isPlayerFired ? computerShipsHash : placedShipsHash, position.x, position.y];

  if (isPlayerFired) {
    setHitsProofToPlayer(new Map(hitsProofToPlayer.set(targetIdx, { status: 'pending' })));
  } else {
    setHitsProofToComputer(new Map(hitsProofToComputer.set(targetIdx, { status: 'pending' })));
  }

  runCircom(privateInputs, publicInputs)
    .then(async ({isVerified, proof, isHit }) => {
      console.log(isVerified)
      console.log(isHit)
      console.log(proof)
      ...
    });

}
```


Next we have to find the firing event handlers in the game to apply this function. The game was originally designed to be a PvC (Player vs Computer) game, so there are two handlers should be modified:

* Player firing event handler function `fireTorpedo` in `ComputerBoard.tsx`;

* Computer firing event handler function `computerFire` in `Game.tsx`;

## Use web worker to unblock UI

Since snarkjs takes less time to generate proofs, there is no need to use web workers to strip proofs of generation from the UI.

## Put it to the test

Add an implementation of generating and verifying proofs using snarkjs in `CircomProvider`