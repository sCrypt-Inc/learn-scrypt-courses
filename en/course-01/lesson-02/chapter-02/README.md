# Chapter 2: Compile a contract

## Contract Description File

[sCrpt IDE](https://scrypt-ide.readthedocs.io/zh_CN/latest/compiling.html) provides a right-click function to compile contracts. We use it to compile the `TicTacToe` contract we just wrote. Compiling the contract will output a corresponding contract description file (Contract Description File) `tictactoe_release_desc.json`. The following is the structure of the contract description file:


```json
{
    "version": 8,
    "compilerVersion": "1.14.0+commit.9fdbe60",
    "contract": "TicTacToe",
    "md5": "fb6b0618f95002b289dda96a20be139e",
    "structs": [],
    "library": [],
    "alias": [
        {
            "name": "PubKeyHash",
            "type": "Ripemd160"
        }
    ],
    "abi": [
        {
            "type": "function",
            "name": "move",
            "index": 0,
            "params": [
                {
                    "name": "n",
                    "type": "int"
                },
                {
                    "name": "sig",
                    "type": "Sig"
                },
                {
                    "name": "amount",
                    "type": "int"
                },
                {
                    "name": "txPreimage",
                    "type": "SigHashPreimage"
                }
            ]
        },
        {
            "type": "constructor",
            "params": [
                {
                    "name": "alice",
                    "type": "PubKey"
                },
                {
                    "name": "bob",
                    "type": "PubKey"
                },
                {
                    "name": "isAliceTurn",
                    "type": "bool"
                },
                {
                    "name": "board",
                    "type": "int[9]"
                }
            ]
        }
    ],
    "stateProps": [
        {
            "name": "isAliceTurn",
            "type": "bool"
        },
        {
            "name": "board",
            "type": "int[9]"
        }
    ],
    "buildType": "release",
    "file": "",
    "asm": "OP_1 40 76 88 a9 ac 00 OP_1 OP_2 $__codePart__ $alice $bob $is_alice_turn $board ...",
    "hex": "5101400176018801a901ac01005152<alice><bob>615b79610 ...",
    "sources": [
    ],
    "sourceMap": [ 
    ]
}
```

With the generated contract description file above, you can build the cotnract class by running `buildContractClass` function:

```js
const MyContract = buildContractClass(JSON.parse(descFileContent));
```

Here we provide you [web3](https://github.com/sCrypt-Inc/tic-tac-toe/blob/7ae1eb8cb46bd8315d9c7d858b6a190ba3c4c306/src/web3/web3.ts) tool class. This tool class provides tool functions for the interaction between the contract and the network and the encapsulation of the wallet interface. You can directly use `web3.loadContract()` to load contract classes from the network.


## Put it to the test

1. Create a `contracts` directory under the project, and copy the `TicTacToe` contract we wrote in the previous lesson into it. Use the IDE to compile the contract description file `tictactoe_release_desc.json` and place it in the `public` directory.

2. Add the `fetchContract` function and use `web3.loadContract()` to load the contract description file.

Refer to this [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/5cf4afb31925d141c201d28355ac7ab7597eb1d7)