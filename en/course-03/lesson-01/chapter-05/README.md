# Chapter 5: Basic data types and property


## Basic data types

The basic data types used by the `TicTacToe` contract include:

1. `boolean`: boolean value, `true` or `false`

2. `bigint`: signed integer

3. `PubKey`：public key

4. `Sig`：signature


Among them, `PubKey` and `Sig` are subtypes of `ByteString`. If you want to know more about basic types, you can check [documentation](https://scrypt.io/scrypt-ts/getting-started/how-to-write-a-contract#data-types)


## FixedArray

`sCrypt` only allows fixed-size array. `FixedArray` is a fixed-size list of values of the same basic type. Array elements are separated by commas. When you declare an array, you must use `FixedArray<T, N>`. `T` is the type and `N` is the array size.

```ts
let a: FixedArray<bigint, 3> = [0n, 1n, 2n];
let b: FixedArray<boolean,  3> = [false, false && true, (1n > 2n)];
let c: FixedArray<FixedArray<bigint,  3> , 2>  = [[11n, 12n, 13n], [21n, 22n, 23n]];
```


## Property

Contract members marked with the `@prop(stateful: boolean = false)` decorator are called properties. This decorator accepts a boolean parameter. By default, it is set to `false`, which means that this property cannot be changed after the contract is deployed. If the value is true, the property is a so-called stateful property whose value can be updated in subsequent contract calls.


Contract members without the `@prop` decorator are regular TypeScript variables without any special requirements for their declaration. But accessing these member variables is prohibited in methods decorated with `@method` decorator.

The data corresponding to the properties will be stored on the blockchain. There are `3` properties in total:

1. Stateless properties, marked with `@prop()`
2. Stateful properties, marked with `@prop(true)`
3. Static properties, marked with `@prop()` and with TypeScript `static` `readonly` modifiers


```ts
class Test extends SmartContract {
  @prop()
  x: bigint;

  @prop(true)
  y: FixedArray<boolean, 2>;

  @prop(false)
  z: ByteString;

  @prop()
  static readonly N: bigint = 3n;  // suffix `n` means bigint literal.

  constructor(x: bigint, y: FixedArray<boolean, 2>, z: ByteString) {
    super(...arguments);
    this.x = x;
    this.y = y;
    this.z = z;
  }

  @method()
  public unlock(x: bigint) {
    assert(this.x === x, "incorrect input x");
  }
}
```


## Put it to the test

The tic-tac-toe game contract supports two players, and the public key addresses of the two players need to be saved. After the contract runs, if the game does not end in a tie, the contract automatically transfers the locked bitcoins to the winner.

1. Add the following contract properties:

- Add two stateless properties `alice` and `bob`, both of data type are `PubKey`.
     * `alice`: The data type is `PubKey`. It represents the public key of the player `alice`.
     * `bob`: The data type is `PubKey`. It represents the public key of player `bob`.
- Add two stateful properties:
     * `is_alice_turn`: The data type is `boolean`. It indicates whether it is player `alice`'s turn to play.
     * `board`: The data type is a fixed-length array `FixedArray<bigint, 9>` with a length of `9`. It indicates the placement situation of each position of the current chessboard.
- Add static property `EMPTY`, type `bigint`, value `0n`. It means that the chessboard position has not yet been placed
- Add static property `ALICE` of type `bigint` with value `1n`. It indicates that the board position is played by player `alice`
- Add static property `BOB` of type `bigint` with value `2n`. It means that the board position is played by player `bob`

2. Initialize all non-static properties in the constructor


