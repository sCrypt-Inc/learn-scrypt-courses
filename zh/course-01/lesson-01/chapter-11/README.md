# 第十一章: 循环 

sCrypt 使用 `loop` 关键字定义循环。语法如下：

```
loop (maxLoopCount) [: i] {
    loopBody
}
```

`maxLoopCount` 必须是编译时已知的常量。`i` 是一个[归纳变量](https://scryptdoc.readthedocs.io/zh_CN/latest/loop.html#induction-variable)，表示第几次循环。例如，下面的循环：

```
contract Loop {
    
    static const int N = 10;
    
    public function unlock(int x) {
    
        loop (N) : i {
            x = x * 2 + i;
        }
        require(x > 100);
    }
}
```

等价于以下展开形式：

```
x = x * 2 + 0;
x = x * 2 + 1;
x = x * 2 + 2;
x = x * 2 + 3;
x = x * 2 + 4;
x = x * 2 + 5;
x = x * 2 + 6;
x = x * 2 + 7;
x = x * 2 + 8;
x = x * 2 + 9;
```

## 实战演习

1. 在 `full` 函数中遍历棋盘所有格子，检查每个格子是否为空。

