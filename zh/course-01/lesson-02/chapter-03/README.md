# 第三章: 数据类型和实例化合约。

## 数据类型

在上一节课，介绍了 `sCrypt` 语言的基础数据类型，以及如何使用 `sCrypt` 语言实例化合约。那么当我们使用 **scryptlib** 与合约进行交互式，同样需要传递数据与实例化合约。
每一个 `sCrypt` 语言的基础数据类型，**scryptlib** 都有一个与之对应的类，
比如： 

1. int 类型 对应 `Int` 类
2. bytes 类型对应 `Bytes` 类
3. bool 类型对应 `Bool` 类
4. PubKey 类型对应 `PubKey` 类


基础数据类型是 **scryptlib** 默认就支持的类型。对于用户自己定义的结构体或者别名，需要通过 `buildTypeClasses` 动态生成。

```javascript
const {Person, Male, Female} = buildTypeClasses(JSON.parse(descFileContent));
```

## 实例化合约

我们已经通过加载合约描述文件得到了合约类 `TictactoeContractClass`， 接下来通过 `new` 关键字来实例化合约，并使用 `setDataPart` 来设置该实例的初始状态，并保存起来。

```javascript

let c = new TictactoeContractClass(
  new PubKey(toHex(alicePubKey)),
  new PubKey(toHex(bobPubKey)),
  true,
  new Bytes('000000000000000000')
);

```

## 实战演习

1. 导入  `PubKey` 类型
2. 将实例化合约的代码粘贴到 `fetchContract` 中。