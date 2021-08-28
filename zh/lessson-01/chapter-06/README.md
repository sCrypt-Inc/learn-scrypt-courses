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

合约代码被编译成一个 **ASM** 模板， 合约的构造函数参数是 **ASM** 模板中的变量。模板中的变量以 `$` 开头，以上合约将被编译成如下 **ASM** 模板：


> OP_NOP OP_0 `$x` OP_0 OP_PICK OP_2 OP_ROLL OP_DROP OP_1 OP_ROLL OP_DROP OP_NOP OP_1 OP_NIP OP_NIP


## 实战演习

为 `MyHelloWorld` 合约添加构造函数。


