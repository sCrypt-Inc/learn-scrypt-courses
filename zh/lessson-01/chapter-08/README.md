# 第八章: 调用合约公有函数


1. 通过 [scryptlib SDK](https://github.com/sCrypt-Inc/scryptlib) 调用

单元测试中通过scryptlib SDK调用合约公有函数，来验证合约能否按照预期执行。

```javascript

describe('Test sCrypt contract Demo In Javascript', () => {
  let demo, result

  before(() => {
    const Demo = buildContractClass(compileContract('demo.scrypt'));
    demo = new Demo(7, 4);
  });

  it('should return true', () => {
    result = demo.add(7 + 4).verify()
    expect(result.success, result.error).to.be.true
    result = demo.sub(7 - 4).verify()
    expect(result.success, result.error).to.be.true
  });
});

```

2. 通过调试器调用公有函数

调试器通过配置 *launch.json* 来调用合约的公有函数

```json
{
    "type": "scrypt",
    "request": "launch",
    "name": "Debug Demo",
    "program": "${workspaceFolder}/contracts/demo.scrypt",
    "constructorArgs": [
    12,
    30
    ],
    "pubFunc": "add",
    "pubFuncArgs": [
    42
    ]
}
```

3. 通过sCrypt IDE 的图形化界面调用合约的公有函数

 IDE 提供一个通用的 GUI 交互界面，只需简单的填写相关参数，就能一键部署合约，点击按钮就能调用合约的公共函数。

![](https://scrypt-ide.readthedocs.io/zh_CN/latest/_images/call_demo.gif)

## 实战演习

1. 调用 `MyHelloWorld` 合约的公有函数 `unlock(int x)`

