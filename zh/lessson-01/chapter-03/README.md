# 第三章: 基本数据类型

sCrypt 是强类型语言，基本数据类型包括：

1. `bool`: 布尔值，取值 `true` 或者 `false`

    ``` bool b1 = true; ```
2. `int`: 带符号的整型数值
    ```c
        int a1 = 42;
        int a2 = -4242424242424242;
        int a3 = 55066263022277343669578718895168534326250603453777594175500187360389116729240;
        int a4 = 0xFF8C;
    ```
3. `bytes`: 以16进制表示的字节数组，包含在单引号内并且以字母 `b` 作为前缀

    ```javascript
    bytes b1 = b'ffee1234';
    bytes b2 = b'414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00';
    ```


4. `PubKey`：公钥
    ```javascript
    PubKey pubKey = PubKey(b'0200112233445566778899aabbccddeeffffeeddccbbaa99887766554433221100');
    ```

5. `Sig`：DER 格式的签名类型， 其中包含了签名哈希类型值

    ```javascript
    Sig sig = Sig(b'3045022100b71be3f1dc001e0a1ad65ed84e7a5a0bfe48325f2146ca1d677cf15e96e8b80302206d74605e8234eae3d4980fcd7b2fdc1c5b9374f0ce71dea38707fccdbd28cf7e41');


其中， `PubKey`，`SigHashType`，`Sig`，`Ripemd160`，`Sha1`，`Sha256`，`OpCodeType` 是 `bytes` 类型的子类型， `PrivKey` 是 `int` 类型的子类型。

## 实战演习


定义 `myint` 为 int 数据类型, 并赋值 16。