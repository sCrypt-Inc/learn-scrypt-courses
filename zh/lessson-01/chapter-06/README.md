# 第六章: 构造函数

每个合约至多有 1 个构造函数（如果没有会由编译器自动生成一个），一般用于初始化属性变量。如：

```solidity
contract Test {
    int _x;
    constructor(int x) {
        this._x = x;
    }

    public function unlock(int x) {
        
        require(true);
    }
}
```


使用 `new` 关键字实例化一个合约。


```solidity
contract Foo {
    int x;
}

contract Test {

    public function unlock(int x) {
        Foo foo = new Foo(x);
        require(true);
    }
}
```


## 实战演习

为 `MyHelloWorld` 合约添加构造函数。


