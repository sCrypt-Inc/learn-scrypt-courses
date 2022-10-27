# 第 3 章：用 `snarkjs` 集成电路

Snarkjs 提供了一个 Javascript 库 [`snarkjs.min.js`](https://github.com/sCrypt-Inc/snarkjs#in-the-browser)，可以在 Web 浏览器中使用。可以使用此命令将其拷贝到项目的资源目录中：

```
cp node_modules/snarkjs/build/snarkjs.min.js  ./public/zk/
```

## `CircomProvider` 初始化


让我们看一下 `CircomProvider.init()` 函数的代码，它应该在任何其他 API 之前调用。 它的工作是将这些静态资源加载到浏览器以构建单例实例。
资源文件 `/zk-battleship/zk/battleship.wasm` 是编译过程的输出，`/zk-battleship/zk/circuit_final.zkey` 和 `/zk-battleship/zk/verification_key.json`是设置过程的输出。

```js
static async init() {
  // console.log('ZKP init...')
  if (CircomProvider.instance) return CircomProvider;
  try {
    let verification_key = await fetch('/zk-battleship/zk/verification_key.json').then(resp => resp.json());
    CircomProvider.instance = new CircomProvider(
      "/zk-battleship/zk/battleship.wasm",
      "/zk-battleship/zk/circuit_final.zkey",
      verification_key
    );
    console.log('ZKP initialized.')
    return CircomProvider;
  } catch (error) {
    console.log('init CircomProvider fail', error)
  }
}
```

## 在 `CircomProvider` 中封装零知识证明相关的 API

`snarkjs` 提供的 API 涵盖了我们在上一章提到的整个ZKP工作流程，包括：


**PLONK**

- 生成证明 `snarkjs.plonk.fullProve()`
- 验证证明 `snarkjs.plonk.verify()`

**Groth16**

- 生成证明 `snarkjs.groth16.fullProve()`
- 验证证明 `snarkjs.groth16.verify()`

我们将最后两个 API 包装到 `CircomProvider` 类中。


## 将 ZKP 相关逻辑添加到开火事件的处理函数中


我们创建了一个名为 `handleFire` 的新函数来处理游戏中与 ZKP 相关的逻辑。 代码如下所示：

```js


function runCircom(privateInputs, publicInputs) {
  return CircomProvider
    .init()
    .then(async () => {
      return CircomProvider.generateProof({
        "boardHash": publicInputs[0],
        "guess": publicInputs.slice(1),
        "ships": privateInputs
      });
    })
    .then(async ({ proof, publicSignals, isHit }) => {
      const isVerified = await CircomProvider.verify({ proof, publicSignals });
      return { isVerified, proof, isHit };
    })
    .catch(e => {
      console.error('runCircom error:', e)
      return {
        isVerified: false
      }
    })
}

const handleFire = (role, targetIdx, isHit, newStates) => {
  const isPlayerFired = role === 'player';
  const privateInputs = toPrivateInputs(isPlayerFired ? computerShips : placedShips);
  const position = indexToCoords(targetIdx);
  const publicInputs = [isPlayerFired ? computerShipsHash : placedShipsHash, position.x, position.y];

  if (isPlayerFired) {
    setHitsProofToPlayer(new Map(hitsProofToPlayer.set(targetIdx, { status: 'pending' })));
  } else {
    setHitsProofToComputer(new Map(hitsProofToComputer.set(targetIdx, { status: 'pending' })));
  }

  runCircom(privateInputs, publicInputs)
    .then(async ({isVerified, proof, isHit }) => {
      console.log(isVerified)
      console.log(isHit)
      console.log(proof)
      ...
    });

}
```


接下来，我们必须在游戏中找到开火事件处理程序来添加此功能。 该游戏最初设计为PvC（Player vs Computer）游戏，因此需要修改两个处理程序：

- `ComputerBoard.js`中的开火事件处理函数 `fireTorpedo`；

- `Game.js` 中的电脑开火事件处理函数 `computerFire`；

## 使用 web worker 优化 UI

由于snarkjs 生成证明的时间较短，无需使用web worker 将生成证明从 UI 中剥离。

## 实战演习

在 `CircomProvider` 添加使用 snarkjs 生成证明和验证证明的实现