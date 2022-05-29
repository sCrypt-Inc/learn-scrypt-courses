# 第三章: 数据类型和实例化合约

## 数据类型

sCrypt 语言的所有基本类型在 scryptlib 中都有对应的 javascript 类。在使用 scryptlib 实例化合约和调用合约的公共方法时，需要使用相应的 javascript 类来传递数据。这样，可以在运行之前检查参数的类型并检测潜在的错误。

1. int 类型 对应 `Int` 类
2. bool 类型对应 `Bool` 类
3. PubKey 类型对应 `PubKey` 类


基础数据类型是 **scryptlib** 默认就支持的类型。对于用户自己定义的结构体或者别名，需要通过 `buildTypeClasses` 动态生成。

```javascript
const {Person, Male, Female} = buildTypeClasses(JSON.parse(descFileContent));
```

## 实例化合约

我们已经通过加载合约描述文件得到了合约类 `TictactoeContractClass`， 接下来通过此合约类来实例化合约。

```javascript

const instance = new TictactoeContractClass(
    new PubKey(alicePubKey),
    new PubKey(bobPubKey),
    true,
    [0,0,0,0,0,0,0,0,0]  // empty board
  );

```

## 实战演习

1. 在 `fetchContract` 中使用 `TictactoeContractClass` 合约类实例化合约，并返回实例化合约对象


参考这个 [commit](https://github.com/sCrypt-Inc/tic-tac-toe/commit/47ec1328fbf63b5104c3612c955034bd736fc067)