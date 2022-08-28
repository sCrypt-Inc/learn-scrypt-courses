# Chapter 2: Integrate the circuit with `zokrates-js`

Zokrates provides a Javascript library [`zokrates-js`](https://zokrates.github.io/toolbox/zokrates_js.html) that can be used in web browsers. You can use this command to install it in your project:

```
npm install zokrates-js
```

## Wrap zero-knowledge-proof related APIs in `ZKProvider`

`zokrates-js` provides APIs which covers the whole workflow we mentioned in the previous chapter, including:

compile
setup
computeWitness
generateProof
verify

As we mentioned in the previous chapter, we’ve already finished the `compile` and `setup` process in `npm run setup`. Here we just wrap the last three APIs into a Javascript class called `ZKProvider` to provide features we need.

## ZKProvider.init()

Let us take a look at the code of the `ZKProvider.init()` function, which should be called before any other APIs. Its job is to load those static assets to the browser to build a singleton instance.
The assets files `/zk/out` and `/zk/abi.json` are the outputs of the compile process, and the `/zk/proving.key` and `/zk/verification.key` are the outputs of the setup process. 

```js
static async init() {
    if (ZKProvider.instance) return ZKProvider;
    try {
      let zokratesProvider = await initialize();
      let program = await fetch('/zk/out').then(resp => resp.arrayBuffer()).then(data => new Uint8Array(data));
      let abi = await fetch('/zk/abi.json').then(resp => resp.json());
      let proving_key = await fetch('/zk/proving.key').then(resp => resp.arrayBuffer()).then(data => new Uint8Array(data));
      let verification_key = await fetch('/zk/verification.key').then(resp => resp.json());
      ZKProvider.instance = new ZKProvider(
        zokratesProvider,
        program,
        abi,
        proving_key,
        verification_key
      );
      return ZKProvider;
    } catch (error) {
      console.log('init ZKProvider fail', error)
    }
  }
```

## Add ZKP-related logic to the firing event handlers

We created a new function called `handleFire` to process the ZKP-related logic in the game. The code looks like this:

```
const handleFire = (role, targetIdx, isHit) => {
  const isPlayerFired = role === 'player';
  const privateInputs = toPrivateInputs(isPlayerFired ? computerShips : placedShips);
  const position = indexToCoords(targetIdx);
  const publicInputs = [isPlayerFired ? computerShipsHash : placedShipsHash, position.x.toString(), position.y.toString(), isHit];

  ZKProvider
    .computeWitness(privateInputs.concat(publicInputs))
    .then(async ({ witness }) => {
      return ZKProvider.generateProof(witness);
    })
    .then(async (proof) => {
      const isVerified = await ZKProvider.verify(proof);
      return { isVerified, proof };
    })
    .catch(e => {
      console.error('zkp verify error:', e)
      return {
        isVerified: false
      }
    })
}
```

Next we have to find the fire event handlers in the game to apply this function. The game was originally designed to be a PvC(Player vs Computer) game, so there are two handlers should be modified:

Player fire event handler function `fireTorpedo` in `ComputerBoard.js`;

Computer fire event handler function `computerFire` in `Game.js`;

## Use web worker to unblock UI

After we added the `handleFire` callback to these event handlers, the UI appears to be non-responsible after every fire event. This is because generating a proof is CPU intensive and it is in the same thread that renders UI. 

A standard way to deal with this situation is to separate the code into a web worker. So we created a file named `zkp.worker.js` as below:

```js
import { ZKProvider } from './zkProvider';

self.addEventListener("message", (event) => {
  const { ctx, publicInputs, privateInputs } = event.data;
  runZKP(privateInputs, publicInputs)
    .then((res) => {
      self.postMessage({ ctx, ...res });
    });
});

// run zero knowledge proof
function runZKP(privateInputs, publicInputs) {
  return ZKProvider
    .init()
    .then(() => {
      // computer witness for fire result
      return ZKProvider.computeWitness(privateInputs.concat(publicInputs))
    })
    .then(async ({ witness }) => {
      return ZKProvider.generateProof(witness);
    })
    .then(async (proof) => {
      const isVerified = await ZKProvider.verify(proof);
      return { isVerified, proof };
    })
    .catch(e => {
      console.error('zkp.worker error:', e)
      return {
        isVerified: false
      }
    })
}

```

Then we updated the `handleFire` function to be like this:

```js
const handleFire = (role, targetIdx, isHit, newStates) => {
  const isPlayerFired = role === 'player';
  const privateInputs = toPrivateInputs(isPlayerFired ? computerShips : placedShips);
  const position = indexToCoords(targetIdx);
  const publicInputs = [isPlayerFired ? computerShipsHash : placedShipsHash, position.x.toString(), position.y.toString(), isHit];
  const zkpWorker = zkpWorkerForPlayer;

  // send message to worker
  zkpWorker.postMessage({
    // message id
    ctx: {
      role,
      targetIdx,
      isHit,
      newStates
    },
    privateInputs,
    publicInputs
  });
}
```

Initialize the worker as below:

```js
  useEffect((battleShipContract) => {
    const zkWorkers = new ZKPWorker();
    zkWorkers.addEventListener('message', zkpWorkerMsgHandler);
    setZKPWorkerForPlayer(zkWorkers);

    return (() => {
      zkWorkers.terminate();
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleShipContract]);

```

Now we have successfully unblocked the UI from ZKP-related calculations.

