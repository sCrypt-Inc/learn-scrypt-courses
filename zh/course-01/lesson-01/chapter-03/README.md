# 第三章: 基本数据类型和属性

## 基本数据类型
sCrypt 是强类型语言。基本数据类型包括：

1. `bool`: 布尔值，取值 `true` 或者 `false`

2. `int`: 带符号的整数

3. `bytes`: 字节数组

4. `PubKey`：公钥

5. `Sig`：签名


其中， `PubKey` 和 `Sig` 是 `bytes` 类型的子类型。

## 属性

和一般的面向对象语言一样： 每个合约可以拥有若干个成员变量，在该合约的函数中可以通过 `this` 关键字访问。


```
contract Test {
    int x;
    bool y;
    bytes z;

    public function unlock(int y) {
        require(this.x == y);
    }
}
```

## 实战演习

井字棋游戏合约支持两个玩家，需要保存两个玩家的公钥地址。在合约运行结束后，如果游戏不是以平局结束，合约自动将锁定的比特币打给赢家。


1. 定义 两个属性 `alice` 和 `bob`，数据类型都是 `PubKey`。


