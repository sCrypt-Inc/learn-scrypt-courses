# 第三章: 数据类型和实例化合约。

## 数据类型

在上一节课，介绍了 `sCrypt` 语言的基础数据类型，以及如何使用 `sCrypt` 语言实例化合约。那么当我们使用 **scryptlib** 与合约进行交互式，同样需要传递数据与实例化合约。

每一个 `sCrypt` 语言的基础数据类型，**scryptlib** 都有一个与之对应的类，
比如： 

1. int 类型 对应 `Int` 类
2. bool 类型对应 `Bool` 类
3. PubKey 类型对应 `PubKey` 类


基础数据类型是 **scryptlib** 默认就支持的类型。对于用户自己定义的结构体或者别名，需要通过 `buildTypeClasses` 动态生成。

```javascript
const {Person, Male, Female} = buildTypeClasses(JSON.parse(descFileContent));
```

## 实例化合约

我们已经通过加载合约描述文件得到了合约类 `TictactoeContractClass`， 接下来通过 `new` 关键字来实例化合约。

```javascript

const instance = new TictactoeContractClass(
    new PubKey(alicePubKey),
    new PubKey(bobPubKey),
    true,
    [0,0,0,0,0,0,0,0,0]
  );

```

## 实战演习

1. 在 `fetchContract` 中使用 `TictactoeContractClass` 合约类实例化合约，并返回实例化合约对象


参考这个 [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/47ec1328fbf63b5104c3612c955034bd736fc067)