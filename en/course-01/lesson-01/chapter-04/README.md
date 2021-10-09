# Chapter 4: Static Properties and Const Variables

## Static Properties

A property decorated with the keyword `static` is a static property, which must be initialized when the property is declared. In the function of the contract, it can be accessed through the contract name and the property name (with a dot in the middle). The contract prefix can be omitted if used in the same contract where it is defined.


```
contract Test {
    static int x = 12;

    public function unlock(int y) {
        Test.x = y;
        // using prefix
        int z = Test.x + y;
        // without prefix
        z = x;
    }
}
```

## Const Variables

A variable declared using the `const` keyword cannot be changed once it is initialized, as shown below:

```
contract Test {
    const int x;

    constructor(int x) {
        // initialize a const property
        this.x = x; // good
    }

    public function equal(const int y) {
        y = 1; // <-- error

        const int a = 36;
        a = 11; // <-- error

    }
}
```

A property can be declared using both. This is typically used to define constants.
```
contract Test {
    static const int PERCENT = 100;
}
```


## Put it to the test

Add the following `static` properties to the `TicTacToe` contract and decorate it with `const`.

1. Add `TURNLEN` with type `int` and value `1`. It is the number of bytes to store whose turn for the next move as part of the state.
2. Add `BOARDLEN`, type is `int`, value is `9`. Indicates the byte length of the storage state of the contract. Tic-tac-toe game has a total of 9 board positions.
3. Add `EMPTY`, the type is `bytes`, and the value is `00`. Indicates that the board position has not yet been placed
4. Add `ALICE`, the type is `bytes`, and the value is `01`. Indicates that the board position was placed by the player `alice`
5. Add `BOB`, the type is `bytes`, and the value is `02`. Indicates that the board position was placed by the player `bob`
