# 第十三章: 通过原象访问交易上下文

## 访问交易上下文

通过 **OP_PUSH_TX** 确保原象是当前交易的原象。由于原象包含交易的相关数据，这样就能通过访问原象中的各个字段来访问当前交易的上下文，比如访问当前交易的 `nLocktime`。

```solidity
static function nLocktimeRaw(SigHashPreimage txPreimage) : bytes {
    int l = len(txPreimage);
    return txPreimage[l - 8 : l - 4];
}

```

访问被当前交易调用的合约原始字节 `scriptCode`

```solidity
static function scriptCode(SigHashPreimage txPreimage) : bytes {
    return Util.readVarint(txPreimage[104 : ]);
}

```






## 实战演习

1. 使用通过原象读取到被当前交易调用的合约原始字节 `scriptCode`

