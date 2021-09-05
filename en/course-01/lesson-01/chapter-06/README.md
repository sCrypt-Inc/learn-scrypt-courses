# Chapter 6: Require Statement

The **require statement** contains the `require` keyword and a boolean expression:

```javascript
   require(a > 0);
```

This statement checks whether the Boolean expression is true. When certain conditions are not met, an error is thrown and execution is stopped. This is similar to the `require` of the `solidity` language. The last statement of the sCrypt public function must be a **require statement**, and each public function of the contract has at least one **require statement**. If and only if all **require statements** are checked, the contract can be successfully unlocked.

## Put it to the Test

The parameter `n` of the `move` function represents the position of the move on the board.

Add a **require statement** to the public function `move`, requiring that the function parameter `n` must be greater than or equal to `0` and less than the contract's `static` property `BOARDLEN`