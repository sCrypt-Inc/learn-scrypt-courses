# Chapter 3: Building the Frontend

## Setting up the Project
In this chapter, we'll create a React front-end for the voting dApp using Create React App.

```bash
npx create-react-app voting --template typescript
```

## Installing the sCrypt SDK
Install the sCrypt SDK to easily compile, test, deploy, and call the smart contract.

```bash
cd voting
npx scrypt-cli init
```

## Compiling the Contract
Compile the contract to generate the contract artifact file.

```bash
npx scrypt-cli@latest compile
```

## Contract Deployment
Deploy the smart contract after some modifications to the deploy.ts script at the script directory.

```ts
import { Name, Voting, N } from './src/contracts/voting'
import { bsv, TestWallet, DefaultProvider, toByteString, FixedArray } from 'scrypt-ts'

import * as dotenv from 'dotenv'

// Load the .env file
dotenv.config()

// Read the private key from the .env file.
// The default private key inside the .env file is meant to be used for the Bitcoin testnet.
// See https://scrypt.io/docs/bitcoin-basics/bsv/#private-keys
const privateKey = bsv.PrivateKey.fromWIF(process.env.PRIVATE_KEY || '')

// Prepare signer. 
// See https://scrypt.io/docs/how-to-deploy-and-call-a-contract/#prepare-a-signer-and-provider
const signer = new TestWallet(privateKey, new DefaultProvider({
    network: bsv.Networks.testnet
}))

async function main() {
    await Voting.compile()

    const candidateNames: FixedArray<Name, typeof N> = [
        toByteString('iPhone', true),
        toByteString('Android', true)
    ]

    const instance = new Voting(
        candidateNames
    )

    // Connect to a signer.
    await instance.connect(signer)

    // Contract deployment.
    const amount = 1
    const deployTx = await instance.deploy(amount)
    console.log('Voting contract deployed: ', deployTx.id)
}

main()
```

then run  :
```bash
npx scrypt-cli@latest deploy
```
The contract will be deployed and print out the Deploymene Transaction ID similar to this : "5f88721569a223b0d08795328fe45a60723d6a4e5522df743998634b68b9b617"

