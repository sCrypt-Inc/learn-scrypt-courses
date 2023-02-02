# 第十一章: 数组

数组是一组类型相同的值列表。数组元素使用逗号分割。数组大小必须使用 CTC。

```ts
let a: FixedArray<bigint, 3> = [0n, 1n, 2n];
const N = 3;
let b: FixedArray<bigint,  typeof N> = [false, false && true, (1n > 2n)];
let arr2D: FixedArray<FixedArray<bigint,  typeof N> , 2>  = [[11n, 12n, 13n], [21n, 22n, 23n]];
let d: FixedArray<bigint,  typeof N> = a[2];
let idx = 2n;
// read
d = a[Number(idx)];
d = arr2D[idx][1];
// write
a[idx] = 2n;
// assign to an array variable
a = arr2D[1];
```


## 实战演习

对于井字棋游戏，是否有玩家赢得比赛的规则是有三个棋子连成一条直线，我们把所有可能的连成一条线的情况列举出来：

```
0, 1, 2
3, 4, 5
6, 7, 8
0, 3, 6
1, 4, 7
2, 5, 8
0, 4, 8
2, 4, 6
```


用一个二维数组 `FixedArray<FixedArray<bigint, 3>, 8>` 保存以上所有赢得比赛的状态。 在 `won` 函数中添加该数组。