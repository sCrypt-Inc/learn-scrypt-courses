# Chapter 5: Data Types and `@prop` Decorator


## Data types

The data types used by the `TicTacToe` contract include:

1. `boolean`: `true` or `false`

2. `bigint`: arbitrarily large signed integer

3. `PubKey`：public key

4. `Sig`：signature

5. `ByteString`: bytes


If you want to know more data types, you can reference [the documentation](https://scrypt.io/docs/how-to-write-a-contract/#data-types).


## FixedArray

`sCrypt` only allows fixed-size array. When you declare an array, you must use `FixedArray<T, N>`. `T` is the type of array element and `N` is the array size.

```ts
let a: FixedArray<bigint, 3> = [0n, 1n, 2n];
const b: FixedArray<boolean,  3> = [false, false && true, (1n > 2n)];
```


## `@prop` decorator

Use this decorator to mark any property that intends to be stored on chain. This decorator accepts a boolean parameter. By default, it is set to `false`, meaning the property cannot be changed after the contract is deployed. If it is `true`, the property is a so-called [stateful](https://scrypt.io/docs/how-to-write-a-contract/stateful-contract) property and its value can be updated in subsequent contract calls. Only [specific types](https://scrypt.io/docs/how-to-write-a-contract/#data-types) can be used in `@prop`.


Contract properties without the `@prop` decorator are regular TypeScript properties without any special requirement, meaning they can use any type. But accessing these member variables is prohibited in methods decorated with `@method`.


```ts
class Test extends SmartContract {
  @prop()
  x: bigint;

  @prop(true)
  y: FixedArray<boolean, 2>;

  @prop(false)
  z: ByteString;

  // define a constant
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

The tic-tac-toe game contract supports two players and their public keys need to be saved. 

1. Add the following contract properties:

   - Two stateless properties `alice` and `bob`, both of which are `PubKey` type.
   - Two stateful properties:
        * `is_alice_turn`: a `boolean`. It represents whether it is `alice`'s turn to play.
        * `board`: a fixed-size array `FixedArray<bigint, 9>` with a size of `9`. It represents the state of every square in the board.
   - Three constants:
       * `EMPTY`, type `bigint`, value `0n`. It means that a square in the board is empty
       * `ALICE`, type `bigint`, value `1n`. Alice places symbol `X` in a square.
       * `BOB`, type `bigint`, value `2n`. Bob places symbol `O` in a square.

2. Initialize all non-static properties in the constructor. Specifically, the entire board is empty at first.


