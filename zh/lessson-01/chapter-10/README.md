# 第十章: 导入（import）

通常将库放到独立的文件中，通过 `import` 导入。

`Pay2PubKeyHash` 合约 `import` 其他两个合约作为依赖。这就可以重用其他人写的合约，成为构建合约库的基础。

```solidity
import "./hashPuzzle.scrypt";
import "./p2pk.scrypt";

contract Pay2PubKeyHash {
    Ripemd160 pubKeyHash;

    public function spend(Sig sig, PubKey pubKey) {
        HashPuzzle hp = new HashPuzzle(this.pubKeyHash);
        require(hp.spend(pubKey));

        Pay2PubKey p2pk = new Pay2PubKey(pubKey);
        require(p2pk.spend(sig));
    }
}
```

## 实战演习

1. 为右侧合约导入 `Util` 库