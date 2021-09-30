# Chapter 10: Structure

The members of a structure can be a basic type, an array, or a structure, similar to the structure of the `C` language.

## Define structure

The structure is defined using the `struct` keyword. The structure needs to be defined outside the contract.
```
struct Point {
  int x;
  int y;
}

struct Line {
  // nested struct
  Point start;
  Point end;
}
```



## Put it to the test

Define a `State` structure for the contract, which contains a `turn` property of type `int` and a `board` property of type `bytes`.