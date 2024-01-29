# Chapter 5: Integrating Wallet and sCrypt Service

## 1. **Importing Dependencies:**
- The file opens with  imports, including React, Material-UI components, and essential libraries like `scrypt-ts`.

## 2. **Defining Constants and Utilities:**
- We define a constant, `contract_id`, representing the unique identifier of a deployed voting contract.

```ts
const contract_id = {
  /** The deployment transaction id */
  txId: "5f88721569a223b0d08795328fe45a60723d6a4e5522df743998634b68b9b617",
  /** The output index */
  outputIndex: 0,
};
```

and a utility function, `byteString2utf8`, which converts ByteStrings to UTF-8 format (it converts the candidate name from bytestring to string UTF-8 format).
    
```ts
byteString2utf8(success.candidate)
```

## 3. **Enumerating Wallet Types:**
- The `WalletType` enum is declared, providing a structured representation of different wallet options which voter can easily choose from.

```ts
enum WalletType {
  PANDA = "panda",
  TAAL = "taal",
  Sensilet = "sensilet",
}
```

## 4. **Creating the Modal Component:**
- The `Modal` component introduces a way for users to connect their wallets. 
 It features a button to initiate the connection process and a popup offering multiple wallet choices (Panda, Taal and 
 Sensilet).

## 5. **Accessing Wallet:**
- You can can easily have a clear display of voters wallet information, including address and balance.
     
```ts
const address = await signer.getDefaultAddress();
```

## 6. **Main App Component (`App`):**
- Using the `useEffect` hook, it fetches voting contract information and sets up subscriptions for real-time updates.
- It also manages state, incorporating functions for connecting wallets, logging out, and casting votes.
- The voting table, adorned with images of iPhone and Android, allows voters to engage in the voting process.
- Employs Material-UI Snackbar components to deliver user-friendly error and success messages.

# Put it to Test
- Get Address and balance from the connected wallet.
- Declare an enum for panda, sensilet and taal wallets.
