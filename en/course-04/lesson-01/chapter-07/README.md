# Chapter 6: BSV20-V2 
## 1. Introduction:
The **BSV20 - V2** file contains a React component named BSV20v2. 
This component is designed to facilitate the inscription of **BSV20 - V2** using the `BSV20Mint` class from the scrypt-ord library. 
Let's break down the key features of this component.

![Inscribe BSV-20 v2](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-04/5.png?raw=true)

## 2. Contract: 


```ts
import { BSV20V2 } from 'scrypt-ord'
import {
    ByteString,
    Addr,
    hash256,
    method,
    prop,
    toByteString,
    assert,
    MethodCallOptions,
    ContractTransaction,
    bsv,
} from 'scrypt-ts'

export class BSV20Mint extends BSV20V2 {
    @prop(true)
    supply: bigint

    @prop()
    lim: bigint

    constructor(
        id: ByteString,
        sym: ByteString,
        max: bigint,
        dec: bigint,
        lim: bigint
    ) {
        super(id, sym, max, dec)
        this.init(...arguments)

        this.supply = max
        this.lim = lim
    }

    @method()
    public mint(dest: Addr, amount: bigint) {
        // Check mint amount doesn't exceed maximum.
        assert(amount <= this.lim, 'mint amount exceeds maximum')
        assert(amount > 0n, 'mint amount should > 0')

        this.supply -= amount
        assert(this.supply >= 0n, 'all supply mint out')
        let outputs = toByteString('')

        if (this.supply > 0n) {
            outputs += this.buildStateOutputFT(this.supply)
        }

        // Build FT P2PKH output to dest paying specified amount of tokens.
        outputs += BSV20V2.buildTransferOutput(dest, this.id, amount)

        // Build change output.
        outputs += this.buildChangeOutput()

        assert(hash256(outputs) === this.ctx.hashOutputs, 'hashOutputs mismatch')
    }

    static async mintTxBuilder(
        current: BSV20Mint,
        options: MethodCallOptions<BSV20Mint>,
        dest: Addr,
        amount: bigint
    ): Promise<ContractTransaction> {
        const defaultAddress = await current.signer.getDefaultAddress()

        const remaining = current.supply - amount

        const tx = new bsv.Transaction().addInput(current.buildContractInput())

        const nexts: any[] = []
        const tokenId = current.getTokenId()
        if (remaining > 0n) {
            const next = current.next()

            if (!next.id) {
                next.id = toByteString(tokenId, true)
            }

            next.supply = remaining
            next.setAmt(remaining)

            tx.addOutput(
                new bsv.Transaction.Output({
                    satoshis: 1,
                    script: next.lockingScript,
                })
            )

            nexts.push({
                instance: next,
                balance: 1,
                atOutputIndex: 0,
            })
        }

        tx.addOutput(
            bsv.Transaction.Output.fromBufferReader(
                new bsv.encoding.BufferReader(
                    Buffer.from(
                        BSV20V2.buildTransferOutput(
                            dest,
                            toByteString(tokenId, true),
                            amount
                        ),
                        'hex'
                    )
                )
            )
        )

        tx.change(options.changeAddress || defaultAddress)
        return { tx, atInputIndex: 0, nexts }
    }
}
```


**Extends `BSV20V2`:** Every BSV20-v2 contract needs to inherit the `BSV20V2` base class.

**Public Function:** The BSV20-v2 protocol issues all tokens upon deployment. Implement any logical token distribution through the public methods of the contract. The `mint` method implements the simplest logic, and anyone can mint the tokens locked in the contract.

## 3. Component Breakdown:

**scrypt-ord Libraries:** Imports classes and utility functions related to **BSV20v2**, such as **BSV20V2P2PKH** for token instantiation and isBSV20v2 for checking if a given string is a valid **BSV20v2** token.


**Scrypt Libraries:** Imports functionality for handling addresses, signing transactions, and converting values to byte strings from the **scrypt-ts** library.

**React Router:** Imports **Navigate** from **react-router-dom** for programmatic navigation.

**Function Component:** Declares a functional React component named **BSV20v2** that takes **props** as its parameter.

**State Variables:** Uses the **useState** hook to declare state variables like **_symbol**, **_amount**, **_decimal**, **_icon**, and **_result**.

**Return Statement:** Returns JSX content wrapped in a Material-UI **Container** component.

**State Variables:** Declare state variables using **useState** for **symbol**, **amount**, **decimal**, and **icon**. Initial values are set to undefined.

**Event Handlers:** Define event handlers (**symbolOnChange**, **amountOnChange**, **iconOnChange**, **decimalOnChange**) to update state variables based on user input.

**Valid Input Function:** Defines a function validInput that checks if required input fields are defined, enabling or disabling the **`Mint It!`** button accordingly.

## 4. Inscribe:


**Artifact:** Imports **artifact** from `public/bsv20Mint_release_desc.json` and load it with `BSV20Mint.loadArtifact(artifact)`;

**Deploy:** Defines a function **deploy** to handle the deploying logic. The `deploy` function deploys a BSV20-v2 FT by calling `instance.deployToken()`.

**Minting:** Defines a function **mint** to handle the minting logic. 

1. Get latest contract instance by `fromUTXO` and connect a signer
2. Bind a transaction builder to call the contract by `bindTxBuilder`
3. Call contract public function `mint` to mint token.

## Put it to the test

1. Call `loadArtifact` before we new a contract instance.

2. Call `mint` method of the instance to inscribe BSV-20 v2 tokens.

-----

Complete code at [Github](https://github.com/sCrypt-Inc/inscribe/blob/learn/src/bsv20v2.tsx)

