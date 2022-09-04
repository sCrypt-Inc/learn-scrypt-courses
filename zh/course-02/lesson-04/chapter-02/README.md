# 第 2 章：用 `zokrates-js` 集成电路

Zokrates 提供了一个 Javascript 库 [`zokrates-js`](https://zokrates.github.io/toolbox/zokrates_js.html)，可以在 Web 浏览器中使用。您可以使用此命令将其安装到您的项目中：

```
npm install zokrates-js
```

## 在 `ZKProvider` 中封装零知识证明相关的 API

`zokrates-js` 提供的 API 涵盖了我们在上一章提到的整个ZKP工作流程，包括：


- 编译
- 设置
- 计算见证人
- 生成证明
- 验证证明

我们已经完成了 `npm run setup` 中的 `compile` 和 `setup` 过程。在这里，我们只是将最后三个 API 包装到一个名为 `ZKProvider` 的 Javascript 类中。

## ZKProvider 初始化


让我们看一下 `ZKProvider.init()` 函数的代码，它应该在任何其他 API 之前调用。 它的工作是将这些静态资源加载到浏览器以构建单例实例。
资源文件 `/zk/out` 和 `/zk/abi.json` 是编译过程的输出，`/zk/proving.key`和`/zk/verification.key`是设置过程的输出。

```js
static async init() {
    if (ZKProvider.instance) return ZKProvider;
    try {
      let zokratesProvider = await initialize();
      let program = await fetch('/zk/out').then(resp => resp.arrayBuffer()).then(data => new Uint8Array(data));
      let abi = await fetch('/zk/abi.json').then(resp => resp.json());
      let proving_key = await fetch('/zk/proving.key').then(resp => resp.arrayBuffer()).then(data => new Uint8Array(data));
      let verification_key = await fetch('/zk/verification.key').then(resp => resp.json());
      ZKProvider.instance = new ZKProvider(
        zokratesProvider,
        program,
        abi,
        proving_key,
        verification_key
      );
      return ZKProvider;
    } catch (error) {
      console.log('init ZKProvider fail', error)
    }
  }
```

## 将 ZKP 相关逻辑添加到开火事件的处理函数中


我们创建了一个名为 `handleFire` 的新函数来处理游戏中与 ZKP 相关的逻辑。 代码如下所示：

```js
const handleFire = (role, targetIdx, isHit) => {
  const isPlayerFired = role === 'player';
  const privateInputs = toPrivateInputs(isPlayerFired ? computerShips : placedShips);
  const position = indexToCoords(targetIdx);
  const publicInputs = [isPlayerFired ? computerShipsHash : placedShipsHash, position.x.toString(), position.y.toString(), isHit];

  ZKProvider
    .computeWitness(privateInputs.concat(publicInputs))
    .then(async ({ witness }) => {
      return ZKProvider.generateProof(witness);
    })
    .then(async (proof) => {
      const isVerified = await ZKProvider.verify(proof);
      return { isVerified, proof };
    })
    .catch(e => {
      console.error('zkp verify error:', e)
      return {
        isVerified: false
      }
    })
}
```


接下来，我们必须在游戏中找到开火事件处理程序来添加此功能。 该游戏最初设计为PvC（Player vs Computer）游戏，因此需要修改两个处理程序：

- `ComputerBoard.js`中的开火事件处理函数 `fireTorpedo`；

- `Game.js` 中的电脑开火事件处理函数 `computerFire`；

## 使用 web worker 优化 UI

在我们将 `handleFire` 回调添加到这些事件处理程序后，UI 似乎在每次触发事件后都会无响应。 这是因为生成证明是 CPU 密集型的，并且它运行在与渲染 UI 的同一线程中。

处理这种情况的标准方法是将代码分离到 web worker 中。 所以我们创建了一个名为 `zkp.worker.js` 的文件，并在 worker 中生成证明。

然后我们将 `handleFire` 函数更新为如下所示：

```js
const handleFire = (role, targetIdx, isHit, newStates) => {
  const isPlayerFired = role === 'player';
  const privateInputs = toPrivateInputs(isPlayerFired ? computerShips : placedShips);
  const position = indexToCoords(targetIdx);
  const publicInputs = [isPlayerFired ? computerShipsHash : placedShipsHash, position.x.toString(), position.y.toString(), isHit];
  const zkpWorker = zkpWorkerForPlayer;

  // send message to worker
  zkpWorker.postMessage({
    // message id
    ctx: {
      role,
      targetIdx,
      isHit,
      newStates
    },
    privateInputs,
    publicInputs
  });
}
```

初始化worker如下：

```js
  useEffect((battleShipContract) => {
    const zkWorkers = new ZKPWorker();
    zkWorkers.addEventListener('message', zkpWorkerMsgHandler);
    setZKPWorkerForPlayer(zkWorkers);

    return (() => {
      zkWorkers.terminate();
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleShipContract]);

```

现在我们已经成功地将 ZKP 相关的计算中剥离了 UI。

## 实战演习

1. 在 `zkProvider.js` 加载证明密钥和验证密钥

2. 在 `zkp.worker.js` 计算见证人、生成证明并验证证明。
