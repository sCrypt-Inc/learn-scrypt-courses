# 第 1 章：搭建前端

由于我们已经构建了电路和智能合约，接下来要做的是将它们集成到前端，以便用户可以轻松地与合约交互。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/05.png?raw=true" width="600">


## 致谢

我们基于[这个项目](https://github.com/diemkay/battleship) 构建了前端。

## Git 克隆

您可以使用以下命令获取它：

```
git clone https://github.com/sCrypt-Inc/zk-battleship
```

## 设置和运行

您可以运行以下命令来快速设置和运行项目：

```
npm install
npm run setup
npm start
```

安装脚本将完成以下主要工作：

1. 编译电路并完成Zokrates初始化设置；
2. 导出与第一步结果绑定的专用 sCrypt 验证者库；
3. 编译 `battleship.scrypt` 合约；
4. 将所有必要的输出文件作为资源文件复制到 “public” 文件夹；

## 体验游戏

### 准备工作

为了体验游戏，您应该满足下面列出的两个准备工作：

- 已安装 [sensilet chrome 扩展程序](https://chrome.google.com/webstore/detail/sensilet/aadkcfdlmiddiiibdnhfbpbmfcaoknkm)；
- 从 [水龙头](https://scrypt.io/#faucet) 获取一些测试网 BSV；

你现在可以在 chrome 浏览器中访问 `http://localhost:3000`，也可以尝试[在线版本](https://scrypt.io/battleship)。