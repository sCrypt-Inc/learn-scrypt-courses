# 第二章: 编译合约

[sCrpt IDE](https://scrypt-ide.readthedocs.io/zh_CN/latest/compiling.html) 提供一个右键编译合约的功能。我们使用它来编译刚刚编写的 `TicTacToe` 合约。编译合约会输出一个对应的合约描述文件 （Contract Description File) `tictactoe_release_desc.json`。以下是合约描述文件的结构：

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

通常可以使用合约描述文件在 Javascript/TypeScript 中构建出合约类，如下所示：

```
const MyContract = buildContractClass(JSON.parse(descFileContent));
```

这里我们为你提供了 [web3](https://github.com/sCrypt-Inc/tic-tac-toe/blob/7ae1eb8cb46bd8315d9c7d858b6a190ba3c4c306/src/web3/web3.ts) 系列工具函数。你可以直接使用 `web3.loadContract()` 从网络中加载出合约类。


## 实战演习

1. 在工程下创建 `contracts` 目录，并将上一节课我们编写的 `TicTacToe` 合约拷贝进去。使用 IDE 编译出合约描述文件 `tictactoe_release_desc.json` 并将其放在 `public` 目录。

2. 添加 `fetchContract` 函数，使用 `web3.loadContract()` 加载合约描述文件。

参考这个 [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/5cf4afb31925d141c201d28355ac7ab7597eb1d7)