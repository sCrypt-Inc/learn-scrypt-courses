# 第四章: Static 属性和 Const 变量

## static 属性

带有 `static` 关键字修饰的属性是 `static` 属性，声明 `static` 属性时必须初始化。在该合约的函数中可以通过合约名加属性名字（中间加点）来访问。如果在定义它的同一合约中使用，则可以省略该前缀。

```
contract Test {
    static int x = 12;
    
    public function unlock(int y) {
        Test.x = y;
        // using prefix
        int z = Test.x + y;
        // without prefix
        z = x;
    }
}
```

## const 变量

使用 `const` 关键字的修饰局的变量一旦初始化就不能更改。

```
contract Test {
    const int x;

    constructor(int x) {
        // initialize a const property
        this.x = x; // good
    }

    public function equal(const int y) {
        y = 1; // <-- error

        const int a = 36;
        a = 11; // <-- error

    }
}
```


可以同时使用两者来声明属性。 这通常用于定义常量。

```
contract Test {
    static const int PERCENT = 100;
}
```

## 实战演习

为 `TicTacToe` 合约添加以下 `static` 属性，并用 `const` 修饰

1. 添加 `TURNLEN`，类型为 `int`，值为 `1`。它表示合约存储轮流
状态的字节长度
2. 添加 `BOARDLEN`，类型为 `int`，值为 `9`。它表示合约存储存储
状态的字节长度，井字棋游戏一共公有9个棋盘位置
3. 添加 `EMPTY`，类型为 `bytes`，值为 `00`。它表示该棋盘位置还未落子
4. 添加 `ALICE`，类型为 `bytes`，值为 `01`。它表示该棋盘位置被玩家 `alice` 落子
5. 添加 `BOB`，类型为 `bytes`，值为 `02`。它表示该棋盘位置被玩家 `bob` 落子
