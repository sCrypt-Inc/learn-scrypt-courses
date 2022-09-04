# 第 1 章：搭建前端

由于我们已经构建了电路和智能合约，接下来要做的是将它们集成到前端，以便用户可以轻松地与合约交互。

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/05.png?raw=true" width="600">


## Git 克隆

您可以使用以下命令获取它：

```
git clone https://github.com/sCrypt-Inc/zk-battleship
```

## 设置和运行

您可以运行以下命令来快速设置和运行项目：

```
npm install
npm start
```

如果你修改了电路或者智能合约的代码，则需要运行 `setup` 命令，否则，您不必运行它。

```
npm run setup
```

这个初始化脚本将：

1. 编译电路并完成Zokrates初始化设置；
2. 导出与第一步结果绑定的专用 sCrypt 验证者库；
3. 编译 `battleship.scrypt` 合约；
4. 将所有必要的输出文件作为资源文件复制到 `public` 文件夹；

## 准备工作

为了体验游戏，你需要：

- 已安装 [sensilet 钱包](https://chrome.google.com/webstore/detail/sensilet/aadkcfdlmiddiiibdnhfbpbmfcaoknkm)；
- 将 sensilet 钱包切换到测试网
- 从 [水龙头](https://scrypt.io/#faucet) 获取一些测试网 BSV；


<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/testnet.gif?raw=true" width="300">

<center>如何切换到测试网</center>
<br></br>


你现在可以在 chrome 浏览器中访问 `http://localhost:3000`，也可以尝试[在线版本](https://scrypt.io/zk-battleship)。

## 致谢

我们基于[这个项目](https://github.com/diemkay/battleship) 构建了前端。
