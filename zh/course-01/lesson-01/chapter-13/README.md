# 第十三章: 有状态合约

对于 sCrypt 初学者来说，最具挑战性的部分之一是在合约中维护内部状态。我们使用状态装饰器提供了一个优雅而简洁的解决方案。

![](https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/06.png?raw=true)

## 问题


在上一章的计数器合约中，我们维护一个状态 `counter`，并在每次调用 increment() 时将其加一。我们只维护一个 `counter` 状态，就已经产生了大量的样板代码，主要用于序列化和反序列化状态（第 5-9 行和第 15 行）。核心逻辑只是第 12 行的一行。当状态变得更加复杂时，代码变得更加繁琐和容易出错。


## 解决方案：状态装饰器

使用新的状态装饰器方法，您可以通过三个简单的步骤在合约中维护状态，如下所示：

1. 使用装饰器 `@state` 声明属于状态的任何属性。
2. 将有状态属性当作普通属性：读取并更新它。
3. 当您准备好将状态传递到支出交易中的 `output[s]` 时，只需调用内置函数 `this.getStateScript()`（第 11 行），该函数为每个合约自动生成。


```
contract Counter {
    @state
    int counter;
    
    public function mutate(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimage(txPreimage));
   
        // mutate state
        this.counter++;

        bytes outputScript = this.getStateScript();

        bytes output = Util.buildOutput(outputScript, amount);
        require(hash256(output) == Util.hashOutputs(txPreimage));
    }
}
```

如您所见，这比手动序列化和反序列化状态更简洁和安全。当状态变复杂时，优势更加显着。

## 实战演习

使用 `@state` 装饰为 `TicTacToe` 合约添加以一下状态。

1. 添加状态属性 `is_alice_turn`，类型 `bool`; 添加状态属性 `board`，类型 `bytes`
2. 更新状态属性