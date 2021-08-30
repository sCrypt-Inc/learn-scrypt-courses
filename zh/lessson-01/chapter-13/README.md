# 第十三章: 结构体

结构体的成员可以是基本类型，数组，也可以是结构体，与 `C` 语言的结构体类似。

## 定义结构体

```
struct Point {
  int x;
  int y;
}

struct Line {
  // nested struct
  Point start;
  Point end;
}
```

结构体需要定义在合约的外部。

## 实战演习

将结构体 `line` 的 `start`成员的 `x` 成员修改为 10。