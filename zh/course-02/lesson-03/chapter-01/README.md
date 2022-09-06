# 第 1 章：snarkjs 简介

[snarkjs](https://docs.iden3.io/circom-snarkjs/) 是 zkSNARK 方案的 JavaScript 和纯 **Web Assembly** 实现。它实现了 Groth16 协议。类似 Zokrates，他提供了另外一种高级语言 `circom` 来编写电路。同样，我们扩展它来生成和在比特币上验证证明。

## 安装


### 1. 安装 circom 编译器 

首先需要从官方的[发布页面](https://github.com/iden3/circom/releases)下载 circom 编译器。


### 2. 安装 snarkjs 库 

然后使用以下命令从安装我们的 [扩展版本](https://github.com/sCrypt-Inc/snarkjs)：

```
npm install https://github.com/sCrypt-Inc/snarkjs.git
```


## 工作流程

整个工作流程与原始 snarkjs 相同，只是验证步骤是在比特币上完成的。一般来说，它包含以下步骤：


### 1. 设计电路

用 circom 语言实现电路。例如，这个名为 `factor.circom` 的简单电路/程序证明了人们知道将整数 `n` 分解为两个整数，而无需透露整数。该电路有两个名为 `p` 和 `q` 的私有输入和一个名为 `n` 的公共输入。关于如何使用 snarkjs 的更多信息，您可以参考 https://docs.circom.io 。

```python
// p 和 q 是 n 的因式分解
pragma circom 2.0.0;

template Factor() {

    // Private Inputs:
    signal input p;
    signal input q;

    // Public Inputs:
    signal output n;

    assert(p > 1);
    assert(q > 1);

    n <== p * q;

}

component main = Factor();
```

### 2. 编译电路

使用以下命令编译电路：

```
circom factor.circom --r1cs --wasm
```

### 3. 开始新的权力tau仪式

这个 `new` 的命令用于启动 权力 tau 的仪式。

```bash
snarkjs powersoftau new bn128 12 pot12_0000.ptau
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -e="$(openssl rand -base64 20)"
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau
```

最后验证生成的 `ptau` 文件是否可用：

```js
snarkjs powersoftau verify pot12_final.ptau
```


### 3. 设置

这将为该电路生成一个证明密钥并验证该密钥。

```bash
snarkjs groth16 setup factor.r1cs pot12_final.ptau factor_0000.zkey
snarkjs zkey contribute factor_0000.zkey circuit_final.zkey --name="Second contribution" -e="$(openssl rand -base64 20)"
snarkjs zkey verify circuit.r1cs pot12_final.ptau circuit_final.zkey
```


### 4. 导出验证密钥

我们将验证密钥从 `circuit_final.zkey` 导出到 `verification_key.json` 中。

```bash
snarkjs zkey export verificationkey circuit_final.zkey verification_key.json
```


### 5. 计算见证人

首先，我们创建一个包含电路输入的文件 `input.json`，其内容为：

```json
{
    "p": 7,
    "q": 13,
    "n": 91
}
```

接下来，我们使用编译电路得到的 `factor.wasm` 来计算见证人：

```bash
node generate_witness.js circuit.wasm ../input.json ../witness.wtns
```

### 6. 生成证明

它使用证明密钥和见证人生成证明。

```bash
snarkjs groth16 prove circuit_final.zkey witness.wtns proof.json public.json
```

### 6. 导出一个 sCrypt 验证器

这会输出一个智能合约文件“verifier.scrypt”，其中包含在链上验证证明所需的所有代码。

```
snarkjs zkey export scryptverifier
```

### 7. 验证证明

您可以在本地验证它：

```
snarkjs groth16 verify verification_key.json public.json proof.json
```


## 实战演习

完成右边的电路， 以确保 秘密输入 `x` 的平方等于 `y` 。