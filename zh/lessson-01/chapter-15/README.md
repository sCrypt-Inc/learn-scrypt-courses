# 第十五章: const 变量

`const` 关键字可以修饰局部变量，合约属性，函数参数，声明为 `const` 的变量一旦初始化就不能更改。如： 

```solidity
contract Test {
    const int x;

    constructor(int x) {
        this.x = x; // good, since this is initialization
    }

    public function equal(const int y) {
        y = 1; // <-- error

        const int a = 36;
        a = 11; // <-- error

        require(y == this.x);
    }
}
```


## CTC 编译时常量

编译时常量 (CTC) 是可以在编译时计算的值。有几种情况只允许使用编译时常量。

1. loop 循环限制
2. 数组长度
3. 使用索引运算符写入数组元素
4. 声明为 `static const` 的函数参数

## 实战演习

1. 使下面合约可以成功编译