# 第 3 章：将 sCrypt 合约与 scryptlib 集成

scryptlib 是 sCrypt 的官方 Javascript SDK，用于在您的应用程序中集成智能合约。 您可以通过此 SDK 编译、测试、部署和调用合约。

我们为您提供 [web3](https://github.com/sCrypt-Inc/battleship-zkSNARK/blob/master/src/web3/web3.ts) 工具类。 该类为合约与网络的交互以及钱包接口的调用提供了工具函数。

## 加载合约描述文件

我们使用 IDE 编译我们刚刚编写的 `BattleShip` 合约。 编译合约会输出对应的合约描述文件（Contract Description File）`battleship_release_desc.json`。将合约描述文件拷贝到 `public` 资源目录。

我们使用 `web3.loadContractDesc()` 从 `WelcomeScreen.js` 中的资源文件中加载合约描述文件：

```js
    async function fetchContract() {
      let desc = await web3.loadContractDesc(
        "/battleship_release_desc.json"
      );
      return desc;
    }

    fetchContract().then(desc => {
      setDesc(desc)
      setLoading(false)
    })
    .catch(e => {
      console.error('load desc error:', e)
    })
```


## 实例化和部署合约

每次游戏开始时，我们都会在 `startTurn` 回调函数中实例化并部署合约。

有了合约描述文件，我们就可以通过 `buildContractClass` 函数来构建战舰合约类。 之后，我们用玩家的公钥和位置的哈希承诺初始化战舰合约：

```js
const BattleShip = buildContractClass(desc);

// `shipHash` is the function we added to calculate the hash commitment of the ship's position.
const playerHash = await shipHash(placedShips);
const computerHash = await shipHash(computerShips_);

const contract = new BattleShip(new PubKey(PlayerPublicKey.get(Player.You)),
      new PubKey(PlayerPublicKey.get(Player.Computer)),
      new Int(playerHash), new Int(computerHash), 0, 0, true);

// save the contract instance in React state
setBattleShipContract(contract);
```

在部署合约实例之前，我们应该先[集成钱包](https://learn.scrypt.io/en/courses/614c387bc0974f55df5af1e5/lessons/2/chapters/4)。 之后，使用一些初始资金，只需调用 `web3.deploy()` 来部署合约：

```js
const rawTx = await web3.deploy(contract, 2000000);
ContractUtxos.add(rawTx, 0, -1);
const txid = ContractUtxos.getdeploy().utxo.txId
setDeployTxid(txid)
```

注意：部署成功后，我们将部署的合约的UTXO保存到localStorage，以便合约调用时构建交易。

## 使用 zkSNARK 证明调用战舰合约

如上一章所述，每当玩家开火时，我们会在 `zkp.worker.js` 中生成一个 zkSNARK 证明，证明我们在调用合约时传入的 `hit` 参数是正确的。

我们在 `zkp.worker.js` 的名为 `zkpWorkerMsgHandler` 的消息响应函数中获取计算好的证明，并使用它来构造交易以调用战舰合约。

我们使用 web3 工具类提供的 `web3.call()` 函数来调用合约并使用之前保存的 utxo 来构建交易。


首先，我们根据游戏状态向交易添加不同的输出。 如果玩家已经击中 `17` 次，则游戏结束。通过将包含获胜者地址的输出添加到交易中，合约将锁定的余额发送给获胜者。 然后合约终止。 否则，我们调用 `getNewStateScript()` 函数来获取包含最新合约状态的锁定脚本，并将包含此锁定脚本的输出添加到交易中。 合约继续运行。

```js
if (newStates.successfulYourHits === 17) {

    tx.setOutput(0, (tx) => {
        const amount = contractUtxo.satoshis - tx.getEstimateFee();
        return new bsv.Transaction.Output({
        script: bsv.Script.buildPublicKeyHashOut(PlayerPrivkey.get(Player.Computer)),
        satoshis: amount,
        })
    })

} else if (newStates.successfulComputerHits === 17) {
    tx.setOutput(0, (tx) => {
        const amount = contractUtxo.satoshis - tx.getEstimateFee();

        return new bsv.Transaction.Output({
            script: bsv.Script.buildPublicKeyHashOut(PlayerPrivkey.get(Player.You)),
            satoshis: amount,
        })
    })

} else {
    tx.setOutput(0, (tx) => {
        const amount = contractUtxo.satoshis - tx.getEstimateFee();
        const newLockingScript = battleShipContract.getNewStateScript(newStates);

        return new bsv.Transaction.Output({
            script: newLockingScript,
            satoshis: amount,
        })
    })
}
```


接下来，我们使用合约的 `move` 公共函数。 `move` 函数的参数包括玩家的签名，射击的位置，击中或未击中的结果，以及对手提供的 zkSNARK 证明。 同时，需要计算合约的新余额。


```js
tx.setInputScript(0, (tx, output) => {
    const preimage = getPreimage(tx, output.script, output.satoshis)
    const currentTurn = !newStates.yourTurn;
    const privateKey = new bsv.PrivateKey.fromWIF(currentTurn ? PlayerPrivkey.get(Player.You) : PlayerPrivkey.get(Player.Computer));
    const sig = signTx(tx, privateKey, output.script, output.satoshis)
    const position = indexToCoords(index);

    let amount = contractUtxo.satoshis - tx.getEstimateFee();

    return battleShipContract.move(sig, position.x, position.y, hit, proof, amount, preimage).toScript();
})
```

之后，我们调用[Chained APIs](https://github.com/sCrypt-Inc/scryptlib/blob/master/docs/chained_api_zh_CN.md)中的`seal()`函数来封印交易。

现在我们已经在 `web3.call()` 的回调函数中构造了交易，接下来它会广播交易，从而调用合约。 我们将构建事务的过程封装在`move()`函数中，并在`zkpWorkerMsgHandler`消息处理程序中调用 `move()`函数。

请注意，生成的 zkSNARK 证明需要转换为 sCrypt 的结构体。

```js
const isPlayerFired = ctx.role === 'player';
const contractUtxo = ContractUtxos.getlast().utxo;
const Proof = battleShipContract.getTypeClassByType("Proof");
const G1Point = battleShipContract.getTypeClassByType("G1Point");
const G2Point = battleShipContract.getTypeClassByType("G2Point");
const FQ2 = battleShipContract.getTypeClassByType("FQ2");
contractUtxo.script = battleShipContract.lockingScript.toHex();
await move(isPlayerFired, ctx.targetIdx, contractUtxo, ctx.isHit, new Proof({
        a: new G1Point({
          x: new Int(proof.proof.a[0]),
          y: new Int(proof.proof.a[1]),
        }),
        b: new G2Point({
          x: new FQ2({
            x: new Int(proof.proof.b[0][0]),
            y: new Int(proof.proof.b[0][1]),
          }),
          y: new FQ2({
            x: new Int(proof.proof.b[1][0]),
            y: new Int(proof.proof.b[1][1]),
          })
        }),
        c: new G1Point({
          x: new Int(proof.proof.c[0]),
          y: new Int(proof.proof.c[1]),
        })
      }), ctx.newStates);
```

现在，我们已经使用 scryptlib 实现了部署并调用了合约。
