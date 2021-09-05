# Chapter 11: CTC Compile Time Constants

Compile-time constant (CTC) is a variable whose value can be calculated at compile-time and is decorated with `static const`.
There are several situations where only CTC compile-time constants are allowed.

1. loop limit
2. Array length
3. Use index operator to write array elements
4. Function parameters declared as `static const`

## Put it to the Test

1. The `loop` of the `full` function restricts the use of the number `9`, please modify it to the contract's `BOARDLEN` property. It is a compile-time constant.