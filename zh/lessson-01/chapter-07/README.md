# 第七章: 公有函数和非公共函数 

## 公有函数 （public function）

公有函数是外部调用合约的接口。函数体中包含的主要逻辑代码可视为锁定脚本；函数参数可视为对应的解锁脚本。矿工实际上就是校验这对组合的执行结果。

公有函数的特殊性有以下几点：

1. 没有明确的返回类型声明和函数结尾的 `return` 语句，其隐形返回 `true`
2. 公有函数的最后一个语句必须是 **require 声明**
3. 只有当函数结束，所有运行中遇到的 require() 均通过，脚本校验才算通过；其他情况均视为脚本校验失败，从而会导致交易失败。

```solidity
contract Test {
    public function equal(int y) {
        require(this.valueOf(y) == this.x);
    }
    ...
}
```

## 非公有函数 （function）

非公共函数可以看做是合约的私有函数，主要目的是封装内部逻辑及代码重用。定义时需要使用冒号 `:` 来说明返回值的类型，如：

```solidity

contract Test {
    function valueOf(int x) : int {
        return x;
    }
    ...
}

```

## 实战演习

1. 为 `MyHelloWorld` 合约公有函数 `unlock(int x)`
2. 为 `MyHelloWorld` 合约非公有函数 `getX(): int`