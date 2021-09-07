# Chapter 10: CTC Compile Time Constants

A compile time constant (CTC) is a value that can be computed at compile time. It is decorated with `static const`. Usually used to modify the properties of the contract.

In some cases, only CTC compile-time constants are allowed. For example, the maximum number of  `loop` statement must be a compile-time constant.

## Put it to the Test

1. The `loop` of the `full` function restricts the use of the number `9`, please modify it to the contract's `BOARDLEN` property. It is a compile-time constant.