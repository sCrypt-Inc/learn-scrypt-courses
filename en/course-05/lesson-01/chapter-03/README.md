# Chapter 3: Integrating into a React App

## 1. Setting up the Project:
In this chapter, we'll create a React front-end for the voting dApp using Create React App.

```bash
npx create-react-app voting --template typescript
```

## 2. Installing the sCrypt SDK:
Install the sCrypt SDK to easily compile, test, deploy, and call the smart contract.

```bash
cd voting
npx scrypt-cli init
```

Then, we need to copy the smart contract code from the previous chapter to `src/contracts/voting.ts`.

## 3. Compiling the Contract:
Compile the contract to generate the contract artifact file.

```bash
npx scrypt-cli@latest compile
```

## 4. Contract Deployment

The sCrypt CLI has created a `deploy.ts` file in the root of our project.

This is the script that defines how our smart contract will be deployed. We must adapt it to handle our `Voting` contract.

Deploy the smart contract after some modifications to the `deploy.ts` script at the script directory.

Once finished, we can then run:
```bash
npx scrypt-cli@latest deploy
```

The contract will be deployed and our script will print out the deployment transaction ID similar to this: `5f88721569a223b0d08795328fe45a60723d6a4e5522df743998634b68b9b617`

## Put it to the test

In our app, we will let users vote on their favorite phones. For simplicity, we'll include only two candidates, `iPhone` and `Android`.
