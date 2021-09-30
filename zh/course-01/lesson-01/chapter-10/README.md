# 第十章: 结构体

结构体的成员可以是基本类型，数组，也可以是结构体，与 `C` 语言的结构体类似。

## 定义结构体

结构使用 `struct` 关键字定义。结构体需要定义在合约的外部。
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



## 实战演习

为合约定义一个 `State` 结构体， 该结构体包含一个 `int` 类型的 `turn` 属性和一个 `bytes` 类型的 `board` 属性。