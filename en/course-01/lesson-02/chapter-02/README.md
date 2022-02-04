# Chapter 2: Compile a contract

## Contract Description File
After importing `scryptlib`, you need a Contract Description File for your front-end application to interact with the TicTacToe Smart Contract.
You should consider installing [sCrpt IDE](https://scrypt-ide.readthedocs.io/zh_CN/latest/compiling.html) that provides a right-click button to compile contracts. Compiling the contract will output a corresponding Contract Description File `tictactoe_debug_desc.json`. The following is the structure of the contract description file:

```json
{
    "version": 5,
    "compilerVersion": "1.3.2+commit.9f2d477",
    "contract": "TicTacToe",
    "md5": "fa7a758b247de4994eca467a6adf0b9d",
    "structs": [],
    "alias": [],
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
                }
            ]
        }
    ],
    "buildType": "debug",
    "file": "file:///d:/code/tic-tac-toe/contracts/tictactoe.scrypt",
    "asm": "OP_1 40 76 88 a9 ac 00 OP_1 OP_2 $alice $bob OP_NOP OP_11 OP_PICK ...",
    "hex": "5101400176018801a901ac01005152<alice><bob>615b79610 ...",
    "sources": [
        "std",
        "d:\\code\\tic-tac-toe\\contracts\\tictactoe.scrypt"
    ],
  "sourceMap": [  //sourceMap, you need to enable sourceMap setting in sCrypt IDE, default is disabled.
    "0:76:51:76:56",
    "0:79:53:79:58",
    ...
  ]
}
```

With the generated contract description file above, you can build the cotnract class by running `buildContractClass` function:

```javascript

const json = loadDesc('tictactoe_debug_desc.json')// load Contract Description File

const TictactoeContract = buildContractClass(loadDesc('tictactoe_debug_desc.json'));

```

From the [`web3.ts`](https://github.com/sCrypt-Inc/tic-tac-toe/blob/master/src/web3/web3.ts) file, you can utilize `loadContract` to load the contract description file from the network.

```javascript
  static loadContract(url: string): Promise<{
    contractClass: typeof AbstractContract,
    types: Record<string, typeof ScryptType>
  }> {

    return axios.get(url, {
      timeout: 10000
    }).then(res => {

      return {
        contractClass: buildContractClass(res.data),
        types: buildTypeClasses(res.data)
      };
    });
  }
```

## Put it to the test

In the `fetchContract` function, call `loadContract` to load the contract description file.
