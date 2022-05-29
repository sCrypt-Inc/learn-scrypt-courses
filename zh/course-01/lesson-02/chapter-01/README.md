# 第一章: 编译合约


## 编译

完成上一节课以后，我们的井字棋 dApp 的 sCrypt 合约部分就完成了。接下来我们需要编译合约。

sCrpt IDE 提供一个右键[编译合约](https://scrypt-ide.readthedocs.io/zh_CN/latest/compiling.html)的功能。我们使用它来编译刚刚编写的 `TicTacToe` 合约。


## 合约描述文件 

编译合约会输出一个对应的合约描述文件 （Contract Description File) `tictactoe_release_desc.json`。合约描述文件是一个命名为 `xxx_desc.json` 的 JSON 文件。可用于在链下构建锁定脚本和解锁脚本并实例化合约。

以下是合约描述文件的结构：

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

