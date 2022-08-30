# 第 1 章：Zokrates 简介

[Zokrates](https://zokrates.github.io/) 是 zkSNARK 的工具箱，隐藏了零知识证明 (ZKP) 固有的显著复杂性。它为开发人员提供了一种类似于 python 的高级语言来编写他们想要证明的计算问题。

我们扩展它来生成和在比特币上验证证明。

## 安装

### 二进制

```
curl -Ls https://scrypt.io/scripts/setup-zokrates.sh | sh
```

### 从源码安装

您可以使用以下命令从源代码构建我们的 [扩展版本](https://github.com/sCrypt-Inc/zokrates)：

```
git clone https://github.com/sCrypt-Inc/zokrates
cd ZoKrates
cargo +nightly build -p zokrates_cli --release
cd target/release
```

注意 Zokrates 本身是用 Rust 语言编写的，您可能需要先设置 Rust 环境，然后再尝试构建它。

## 工作流程

整个工作流程与原始 ZoKrates 相同，只是验证步骤是在比特币上完成的。一般来说，它包含以下步骤：

<img src="https://github.com/sCrypt-Inc/image-hosting/blob/master/learn-scrypt-courses/course-02/03.png?raw=true" width="600">


### 1. 设计电路

用 Zokrates 语言实现电路。例如，这个名为 `factor.zok` 的简单电路/程序证明了人们知道将整数 `n` 分解为两个整数，而无需透露整数。该电路有两个名为 `p` 和 `q` 的私有输入和一个名为 `n` 的公共输入。关于如何使用 Zokrates 的更多信息，您可以参考 https://zokrates.github.io 。

```python
// p 和 q 是 n 的因式分解
def main(private field p, private field q, field n) {
    assert(p * q == n);
    assert(p > 1);
    assert(q > 1);
    return;
}
```

### 2. 编译电路

使用以下命令编译电路：

```
zokrates compile -i my_circuit.zok
```
### 3. 设置

这将为该电路生成一个证明密钥和一个验证密钥。

```
zokrates setup
```
### 4. 计算见证人

一个证明可以证明证明者知道一些满足原始程序的秘密信息。这个秘密信息被称为见证人。在以下示例中，`7` 和 `13` 是见证人，因为它们是 `91` 的因数。

```
zokrates compute-witness -a 7 13 91
```
### 5. 生成证明

它使用证明密钥和见证人生成证明。

```
zokrates generate-proof
```

### 6. 导出一个 sCrypt 验证器

这会输出一个智能合约文件“verifier.scrypt”，其中包含验证证明所需的所有代码。

```
zokrates export-verifier-scrypt
```

### 7. 验证证明

您可以在本地验证它：

```
zokrates verify
```


## 实战演习

完成右边的电路， 以确保 秘密输入 `x` 的平方等于 `1` 。