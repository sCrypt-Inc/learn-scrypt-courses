# Chapter 5: Integrating Wallet and sCrypt Service



#### 1. **Importing Dependencies:**
   - The file opens with strategic imports, including React, Material-UI components, and essential libraries like `scrypt-ts`. These dependencies lay the foundation for building a robust and visually appealing voting application.

#### 2. **Defining Constants and Utilities:**
   - We establish a constant, `contract_id`, representing the unique identifier of a deployed voting contract.
```bash
const contract_id = {
  /** The deployment transaction id */
  txId: "5f88721569a223b0d08795328fe45a60723d6a4e5522df743998634b68b9b617",
  /** The output index */
  outputIndex: 0,
};
```

and a utility function, `byteString2utf8`, which converts ByteStrings to UTF-8 format (it convert candidate name from bytestring to string UTF-8 format).
    
```bash
   {byteString2utf8(success.candidate)}
```

#### 3. **Enumerating Wallet Types:**
   - The `WalletType` enum is declared, providing a structured representation of different wallet options which voter can easily choose from.

```bash
enum WalletType {
  PANDA = "panda",
  TAAL = "taal",
  Sensilet = "sensilet",
}
```

#### 4. **Creating the Modal Component:**
   - The `Modal` component, a well-crafted and functional UI element, introduces a way for users to connect their wallets. It features a button to initiate the connection process and a popup offering multiple wallet choices (Panda, Taal and Sensilet).

#### 5. **Accessing Wallet:**
   - You can can easily have a clear display of voters wallet information, including address and balance.
     
```bash
const address = await signer.getDefaultAddress();
```
The inclusion of a well-designed logout button enhances the user experience.

#### 6. **Main App Component (`App`):**
   - The epicenter of our application, the `App` component, provides a sophisticated voting experience.
   - Leveraging the power of the `useEffect` hook, it easily fetches voting contract information and sets up subscriptions for real-time updates.
   - It also manages state, incorporating functions for connecting wallets, logging out, and casting votes.
   - The voting table, adorned with images of iPhone and Android, allow voters to engage in a visually stimulating and interactive voting process.
   - Dynamically renders user wallet information or a modal for wallet connection based on the user's authentication status.
   - Employs Material-UI Snackbar components to deliver user-friendly error and success messages.

#### 7. **Rendered JSX:**
   - The JSX contained within the `return` statement paints a refined canvas of the user interface. It presents an interactive tableau comprising the voting table, wallet details, wallet connection modal, and concise yet informative Snackbar messages.

# Put it to Test
- Get Address and balance from the connected wallet
- Declare an enum for panda, sensilet and taal wallets.
