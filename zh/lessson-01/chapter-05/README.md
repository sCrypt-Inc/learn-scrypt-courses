# 第五章: 成员属性和静态属性


## 成员属性

每个合约可以拥有若干个成员属性变量（即一般面向对象语言中的成员变量），在该合约的函数中可以通过 `this` 关键字访问。如：

```solidity
contract Test {
    int x;
    bool y;
    bytes z;
    
    public function unlock(int r) {

        require(this.x == r);

    }
}
```

声明成员属性时无需初始化。


## 静态属性

带有 `static` 关键字修饰的属性是静态属性，声明静态属性时必须初始化。在该合约的函数中可以通过合约名加属性名字（中间加点）来访问。如：


```solidity
contract Test {
    static int x = 12;

    public function unlock(int r) {
        require(Test.x == r);
    }
}
```

> 属性和静态属性必须是基本数据类型，或者结构体和数组。

## 实战演习


1. 为右边合约添加成员属性 `width` 和 `height`。
2. 为右边合约添加静态属性 `ANGLE` 并初始化为 `90` 。