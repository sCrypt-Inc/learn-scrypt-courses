# 第十章: 数组

数组是一组类型相同的值列表。数组元素使用逗号分割。数组大小必须是正整数。

```js
int[3] a = [0, 1, 2];
bool[3] b = [false, false && true, (1 > 2)];
int[2][3] arr2D = [[11, 12, 13], [21, 22, 23]];
int d = a[2];
int idx = 2;
// read
d = a[idx];
d = arr2D[idx][1];
// write
a[idx] = 2;
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


用一个二维数组 `int[8][3] lines` 保存以上所有赢得比赛的状态。 在 `won` 函数中添加该数组。