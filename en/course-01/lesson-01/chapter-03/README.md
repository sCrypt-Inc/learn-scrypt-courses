# Chapter 3: Basic data types and property

## Basic data types
sCrypt is a strongly typed language. The basic data types include:

1. `bool`: Boolean value, the value is `true` or `false`

    ```c
    bool b1 = true;
    ```
2. `int`: signed integer value
    ```c
        int a1 = 42;
        int a2 = -4242424242424242;
        int a3 = 55066263022277343669578718895168534326250603453777594175500187360389116729240;
        int a4 = 0xFF8C;
    ```
3. `bytes`: byte array in hexadecimal, enclosed in single quotes and prefixed with the letter `b`

    ```javascript
    bytes b1 = b'ffee1234';
    bytes b2 = b'414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00';
    ```


4. `PubKey`: public key
    ```javascript
    PubKey pubKey = PubKey(b'0200112233445566778899aabbccddeeffffeeddccbbaa99887766554433221100');
    ```

5. `Sig`: the signature type in DER format, which contains the signature hash type value

    ```javascript
    Sig sig = Sig(b'3045022100b71be3f1dc001e0a1ad65ed84e7a5a0bfe48325f2146ca1d677cf15e96e8b80302206d74605e8234eae3d4980fcd7b2fdc1c5b9374f0ce71dea38707fccdbd28cf7e41');


Among them, `PubKey` and `Sig` are subtypes of `bytes` type.

## property

Each contract can have several member attribute variables (ie, member variables in general object-oriented languages), which can be accessed through the `this` keyword in the function of the contract. like:


```solidity
contract Test {
    int x;
    bool y;
    bytes z;
}
```

## Put it to the Test

The Tic-Tac-Toe game contract supports two players. The contract needs to save the public key addresses of the two players. After the contract runs, the contract automatically sends the locked bitcoin to the winner. [1]



1. Define two attributes `alice` and `bob`, the data types are both `PubKey`.

[1]: It may also be divided equally between two players


