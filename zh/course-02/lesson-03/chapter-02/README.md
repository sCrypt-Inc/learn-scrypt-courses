# 第 2 章：在 Snarkjs 中实现战舰电路

## 设计电路

电路设计同 Zokrates


## 在 Snarkjs 中编写电路

### 编码舰队状态

如上所述，我们可以使用 `(pos_x, pos_y,orientation)` 的元组来表示一艘船在网格中的位置，但是我们如何表示整个舰队的位置状态呢？

请注意，位置的有效值在 `0` 到 `9` 之间，方向值只是 `0` 或 `1`。所以我们可以将它们中的每一个编码为 `4` 个比特位，并将它们全部连接起来形成一个可以表示整个元组的数字。例如：

```
var val =  ships[i][0] + (ships[i][1] * 16) + (ships[i][2] * 16 * 16);
```

用同样的想法，我们可以在一个“字段”中表示整个舰队的位置状态：

```
var multiplier = 1;
var sum = 0;
for (var i = 0; i < 5; i++) {
    var val =  ships[i][0] + (ships[i][1] * 16) + (ships[i][2] * 16 * 16);
    sum += val * multiplier;
    multiplier *= 16 ** 3;
}
```

### Mimc 哈希

接下来是计算舰队状态的哈希值。我们选择了一个 zkSNARK 友好的哈希算法 [`mimc7`](https://blog.csdn.net/freedomhero/article/details/125716173) 来完成这项工作，因为它能够减少最终电路的大小。这里还可以使用其他哈希算法。

我们只是确保它与公共输入中声明的相同：

```
// 导入标准库 mimc
include "../node_modules/circomlib/circuits/mimc.circom";

component mimc = MiMC7(91);
var sum = 0;
...
mimc.x_in <== sum;
mimc.k <== 0;
assert(boardHash == mimc.out);
```

### 命中或未命中

首先我们检查目标位置是否有效：

```
// 1. validate the guess is actually valid
assert(guess[0] >= 0 && guess[0] < boardSize);
assert(guess[1] >= 0 && guess[1] < boardSize);
```

然后我们可以将命中或未命中逻辑放在帮助函数中并在主函数中调用它：

```
function isMatch(guess, ship, len) {
  if (ship[2] == 0) { // Down
    return
      guess[0] == ship[0] &&
      guess[1] >= ship[1] &&
      guess[1] <  ship[1] + len;
  } else { // Right
    return
      guess[1] == ship[1] &&
      guess[0] >= ship[0] &&
      guess[0] <  ship[0] + len;
  }
}
```

最后一件事是检查是否有任何船只按照公共输入中的声明被击中：

```
  // 3. check if it's a hit
  isHit <-- (
    isMatch(guess, ships[0], lengths[0]) ||
    isMatch(guess, ships[1], lengths[1]) ||
    isMatch(guess, ships[2], lengths[2]) ||
    isMatch(guess, ships[3], lengths[3]) ||
    isMatch(guess, ships[4], lengths[4])
  );
```


### 实战演习

最后我们得到完整的电路代码如右边所示。

如果你仔细看我们刚刚完成的代码，你可能会发现我们没有检查舰队位置的有效性。这意味着一个人可以通过在开始时提供一个无效的船位置作为秘密输入来欺骗它的对手，因此船舰永远不会被击中。你能更新电路以防止这种情况发生吗？试着看看我们提供的答案。

### 致谢

事实上，电路是基于 [this repo](https://github.com/kunalmodi/battlesnark/blob/2fac2b02934ac89d48cac8af71baefd5cc8b7e32/circuits/move.circom) 中的代码创建的，我们对此进行了一些更改。