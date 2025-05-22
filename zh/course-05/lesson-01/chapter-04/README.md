# Chapter 4: Integrating Wallet and sCrypt Service

## 1. Loading Contract Artifact

Upon the initialization of the app, we need to load the contract artifact file. We do this in `src/index.tsx`.

```ts
import { Voting } from './contracts/voting';
import artifact from '../artifacts/voting.json';
Voting.loadArtifact(artifact);
```

## 2. Integrating Wallet 

Use the requestAuth method of the signer to request access to the wallet.

```ts
// Wallet integration code snippet
const provider = new DefaultProvider({
    network: bsv.Networks.testnet
});

const signer = new PandaSigner(provider);

// request authentication
const { isAuthenticated, error } = await signer.requestAuth();
if (!isAuthenticated) {
    // something went wrong, throw an Error with `error` message
    throw new Error(error);
}
```

## Integrating sCrypt Service

Initialize the sCrypt service and connect the signer to ScryptProvider, then your free account at [sCrypt](https://scrypt.io) to get an API Key.

## Initialize Client
You can pass the API key, along with network, to the ***Scrypt.init*** function to initialize an sCrypt client in your app at **`index.tsx`**.

```ts
import { Scrypt, bsv } from 'scrypt-ts'

Scrypt.init({
  apiKey: 'YOUR_API_KEY',
  network: bsv.Networks.testnet,
})
```

##  Get Contract Instance
```ts
// sCrypt service integration code snippet
const instance = await Scrypt.contractApi.getLatestInstance(
  Voting,
  contractId
)

// connect signer
await instance.connect(signer)
```
