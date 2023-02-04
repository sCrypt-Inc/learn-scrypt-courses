# 第三章: 开发环境搭建 

## 安装nodejs

与 TypeScript 的开发环境相同， 只需按照[此处](https://nodejs.org/en/download)的说明在您的计算机上安装 `Node.js` (`version  >= 16`) 和 `npm`。


## IDE

开发工具我们建议使用微软的 [Visual Studio Code](https://code.visualstudio.com/)


## `scrypt-cli` 命令行工具

`scrypt-cli` 是使 `sCrypt` 的开发更快更容易的 CLI 工具。

## 创建工程

使用 `sCrypt` 提供的命令行工具 `scrypt-cli` 来创建工程:

```bash
npx scrypt-cli project tic-tac-toe
```

## 安装依赖

```bash
cd tic-tac-toe
npm install
```


## 编译合约

```bash
npx scrypt-cli  compile
```

## 启动

```bash
npm start
```


