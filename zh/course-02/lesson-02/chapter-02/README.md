# 第 2 章：在 Zokrates 中实现战舰电路

## 设计电路

首先是为游戏设计电路，它执行以下列出的游戏规则：

- 游戏板为 `10*10` 网格；
- 网格上有五艘船，水平或垂直。它们应该具有以下大小：
    * Carrier(航母) 长度为 5；
    * Battleship(战舰) 长度为 4；
    * Cruiser （巡洋舰) 长度为 3；
    * Submarine (潜艇) 长度为 3；
    * Destroyer (驱逐舰) 长度为 2；

- 船队在比赛开始前摆放好，在比赛期间就不能更改；

- 开火坐标由 (x, y) 表示，必须在网格内，可能击中或未击中舰队；

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/04.png?raw=true" width="600">


接下来我们确定电路的输入和输出。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/11.png?raw=true" width="600">

- 输入：
    * 秘密输入：有关舰队位置的所有信息
        * `(pos_x, pos_y, direction)` 的元组指示每艘船在网格上的位置；
    * 公共输入：开火事件的所有信息
        * 舰队位置的已提交的哈希；
        * 目标坐标 `(pos_x, pos_y)`;
        * 击中或未击中任何船只；
- 输出：无。 （如果在证明或验证过程中输入有任何错误，它将抛出错误）

## 在 Zokrates 中编写电路

### 编码舰队状态

如上所述，我们可以使用 `(pos_x, pos_y, orientation)` 的元组来表示一艘船在网格中的位置，但是我们如何表示整个舰队的位置状态呢？

请注意，位置的有效值在 `0` 到 `9` 之间，方向值只是 `0` 或 `1`。所以我们可以将它们中的每一个编码为 `4` 个比特位，并将它们全部连接起来形成一个可以表示整个元组的数字。例如：

```python
shipState = shipX + shipY * (1<<4) + shipOrientation * (1<<8);
```

用同样的想法，我们可以在一个 `field` 中表示整个舰队的位置状态：

```python
fleetState = carrierState + battleshipState * (1<<12) + cruiserState * (1<<24) + submarineState * (1<<36) + destroyerState * (1<<48);
```

### Mimc 哈希

接下来是计算舰队状态的哈希值。我们选择了一个 zkSNARK 友好的哈希算法 [`mimc7`](https://xiaohuiliu.medium.com/zk-friendly-hash-function-mimc-in-bitcoin-1236783d7f64) 来完成这项工作，因为它能够减少最终电路的大小。这里还可以使用其他哈希算法。

我们只是确保它与公共输入中声明的相同：

```python
assert(mimc7::<91>(shipState, 0) == shipHash);
```

### 命中或未命中

首先我们检查目标位置是否有效：

```python
assert(targetX >= 0 && targetX <= 9 && targetY >= 0 && targetY <= 9);
```

然后我们可以将命中或未命中逻辑放在帮助函数中并在主函数中调用它：

```python
def isShipHit(field x, field y, field o, field size, field targetX, field targetY) -> bool {
    return ((o == 0 && targetX == x && targetY >= y && targetY <= y + size - 1) || (o == 1 && targetY == y && targetX >= x && targetX <= x + size - 1));
}
```

最后一件事是检查是否有任何船只按照公共输入中的声明被击中：

```python
assert(hit == (isCarrierHit || isBattleshipHit || isCruiserHit || isSubmarineHit || isDestroyerHit));
```


### 实战演习

最后我们得到完整的电路代码如右边所示。

如果你仔细看我们刚刚完成的代码，你可能会发现我们没有检查舰队位置的有效性。这意味着一个人可以通过在开始时提供一个无效的船位置作为秘密输入来欺骗它的对手，因此船舰永远不会被击中。你能更新电路以防止这种情况发生吗？试着看看我们提供的答案。

### 致谢

事实上，电路是基于 [this repo](https://github.com/tommymsz006/zkbattleship-circuit) 中的代码创建的，我们对此进行了一些更改。