# 第四章: require 声明

**require 声明** 包含 `require` 关键字和一个布尔表达式：

```javascript
   require(a > 0);
```

sCrypt 公有函数的最后一个语句必须是 **require 声明** ，该声明会检查布尔表达式是否为真，一个合约的公有函数至少有一个 **require 声明** 。当且仅当所有**require 声明** 都检查通过，合约才能被成功解锁。

## 实战演习


添加 **require 声明** 检查解锁参数是否为 `42`