# Chapter 3: Basic data types and property

## Basic data types
sCrypt is a strongly typed language. The basic data types include:

1. `bool`: Boolean value, the value is `true` or `false`

2. `int`: signed integer

3. `bytes`: byte array in hexadecimal, enclosed in single quotes and prefixed with the letter `b`

4. `PubKey`: public key

5. `Sig`: signature

Among them, `PubKey` and `Sig` are subtypes of `bytes` type.

## Property

Each contract can have several properties (i.e., member variables in object-oriented languages), which can be accessed through the `this` keyword in the function of the contract, like:


```solidity
contract Test {
    int x;
    bool y;
    bytes z;
    public function unlock(int y) {
        require(this.x == y);
    }
}
```

## Put it to the test

The Tic-Tac-Toe game contract supports two players. The contract needs to save the addresses of the two players. After the contract runs, the contract automatically sends the locked bitcoin to the winner. [1]



1. Define two attributes `alice` and `bob`, the data types are both `PubKey`.

[1]: It may also be divided equally between two players.


