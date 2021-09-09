# 第一章: 编译合约

[sCrpt IDE](https://scrypt-ide.readthedocs.io/zh_CN/latest/compiling.html) 提供一个右键编译合约的功能。我们使用它来编译刚刚编写的 `TicTacToe` 合约。编译合约会输出一个对应的合约描述文件 （Contract Description File) `tictactoe_debug_desc.json`。以下是合约描述文件的结构：

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



有了合约描述文件，首先我们需要使用 `buildContractClass` 构建合约类：

```javascript

const json = loadDesc('tictactoe_debug_desc.json')// load Contract Description File

const TictactoeContract = buildContractClass(loadDesc('tictactoe_debug_desc.json'));

```

在 `web3.ts` 文件中，我们编写了 `loadContract`，用来从网络中加载合约描述文件。

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


## 实战演习

在`fetchContract` 函数中， 调用 `loadContract` 来加载合约描述文件。