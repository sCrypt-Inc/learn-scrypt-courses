# Chapter 14: Contract Status

The raw bytes of a stateful contract are divided into data and code. The data part is the state. The code part contains the state transition rules, which is the business logic of the contract.

![](https://img-blog.csdnimg.cn/20200712230128735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZyZWVkb21oZXJv,size_16,color_FFFFFF,t_70#pic_center)

In order to manage the state, it requires that the code part of the contract cannot be changed (that is, the contract rules cannot be changed), and the change of the data (state) part must comply with the state transition rules specified in the code part.


## Put it to the Test

We have read the locking script of `TicTacToe`, and now we parse the two states of the contract from the data part of locking script:

1. State `turn`, the first byte of the contract data part. The data type is `int`. Indicates who is the current turn to play chess
2. Status `board`, starting from the second byte of the contract data part, a total of 9 bytes. The data type is `bytes`. Indicates the state of the board.