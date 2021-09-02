# 第十六章: scryptlib

我们的 sCrypt 合约完工了！ 现在我们要写一段 JavaScript 前端代码来测试这个合约。

sCrypt有一个 JavaScript 库，名为 [scryptlib](https://github.com/sCrypt-Inc/scryptlib)。

通过 npm 来安装该库:

```
npm install scryptlib
```


现在我们通过一段代码来了解 scryptlib 是如何和我们将发布的合约交互的吧。

如果下面的代码你不能全都理解，不用担心。

```javascript

const privateKeyAlice = new bsv.PrivateKey.fromRandom('testnet')
const publicKeyAlice = bsv.PublicKey.fromPrivateKey(privateKeyAlice)

const privateKeyBob = new bsv.PrivateKey.fromRandom('testnet')
const publicKeyBob = bsv.PublicKey.fromPrivateKey(privateKeyBob)

const Tictactoe = buildContractClass(runCompile('tictactoe.scrypt'));

game = new Tictactoe(new PubKey(toHex(publicKeyAlice)), new PubKey(toHex(publicKeyBob)));




describe('Test sCrypt contract Tictactoe In Javascript', () => {
  let result, preimage, sig, prevLockingScript


  beforeEach(() => {
    let state = new Bytes('00000000000000000000').toASM();
    game.setDataPart(state)
  });

  function moveScript(newState) {
    const state = new Bytes(newState).toASM();
    const newLockingScript = [game.codePart.toASM(), state].join(' ');
    return bsv.Script.fromASM(newLockingScript)
  }

  function testMove(isAliceTurn, n, outputScript, expected) {
    const privateKey = isAliceTurn ? privateKeyAlice : privateKeyBob;
    prevLockingScript = game.lockingScript.toASM();

    const tx = newTx();

    tx.addOutput(new bsv.Transaction.Output({
      script: outputScript,
      satoshis: 10000
    }))


    preimage = getPreimage(tx, prevLockingScript, inputSatoshis);

    sig = signTx(tx, privateKey, prevLockingScript, inputSatoshis)

    const context = { tx, inputIndex, inputSatoshis }

    result = game.move(n, new Sig(toHex(sig)), 10000, preimage).verify(context)

    if (expected === false) {
      expect(result.success, result.error).to.be.false;
    } else {
      expect(result.success, result.error).to.be.true;
    }

  }

  function testMoveNobodyWin(isAliceTurn, n, outputScript0, outputScript1) {
    const privateKey = isAliceTurn ? privateKeyAlice : privateKeyBob;
    prevLockingScript = game.lockingScript.toASM();

    const tx = newTx();

    tx.addOutput(new bsv.Transaction.Output({
      script: outputScript0,
      satoshis: 10000
    }))

    tx.addOutput(new bsv.Transaction.Output({
      script: outputScript1,
      satoshis: 10000
    }))


    preimage = getPreimage(tx, prevLockingScript, inputSatoshis);

    sig = signTx(tx, privateKey, prevLockingScript, inputSatoshis)

    const context = { tx, inputIndex, inputSatoshis }

    result = game.move(n, new Sig(toHex(sig)), 10000, preimage).verify(context)
    expect(result.success, result.error).to.be.true;
  }

  it('One full round where Alice wins', () => {
    // Alice places an X at 0-th cell
    state = '01010000000000000000';
    testMove(true, 0, moveScript(state))
    game.setDataPart(state)

    // Bob places an O at 4-th cell
    state = '00010000000200000000';
    testMove(false, 4, moveScript(state))
    game.setDataPart(state)

    // Alice places an X at 1-th cell
    state = '01010100000200000000';
    testMove(true, 1, moveScript(state))
    game.setDataPart(state)

    // Bob places an O at 8-th cell
    state = '00010100000200000002';
    testMove(false, 8, moveScript(state))
    game.setDataPart(state)

    // Alice places an X at 2-th cell and wins
    testMove(true, 2, bsv.Script.buildPublicKeyHashOut(privateKeyAlice.toAddress()));
  });


  it('One full round where nobody wins', () => {
    // Alice places an X at 0-th cell
    state = '01010000000000000000';
    testMove(true, 0, moveScript(state))
    game.setDataPart(state)

    // Bob places an O at 2-th cell
    state = '00010002000000000000';
    testMove(false, 2, moveScript(state))
    game.setDataPart(state)

    // Alice places an X at 1-th cell
    state = '01010102000000000000';
    testMove(true, 1, moveScript(state))
    game.setDataPart(state)

    // Bob places an O at 3-th cell
    state = '00010102020000000000';
    testMove(false, 3, moveScript(state))
    game.setDataPart(state)


    // Alice places an X at 5-th cell
    state = '01010102020001000000';
    testMove(true, 5, moveScript(state))
    game.setDataPart(state)

    // Bob places an O at 4-th cell
    state = '00010102020201000000';
    testMove(false, 4, moveScript(state))
    game.setDataPart(state)


    // Alice places an X at 6-th cell
    state = '01010102020201010000';
    testMove(true, 6, moveScript(state))
    game.setDataPart(state)


    // Bob places an O at 8-th cell
    state = '00010102020201010002';
    testMove(false, 8, moveScript(state))
    game.setDataPart(state)


    // Alice places an X at 7-th cell and nobody wins
    testMoveNobodyWin(true, 7, bsv.Script.buildPublicKeyHashOut(privateKeyAlice.toAddress()), bsv.Script.buildPublicKeyHashOut(privateKeyBob.toAddress()));
  });


  it('should fail if it\'s not alice turn', () => {
    // Alice places an X at 0-th cell
    state = '01010000000000000000';
    testMove(true, 0, moveScript(state))
    game.setDataPart(state)

    // Alice places an X at 1-th cell
    state = '01010100000000000000';
    testMove(true, 1, moveScript(state), false)
  })

  it('should fail if it exceeds the board', () => {
    // Alice places an X at 0-th cell
    state = '01010000000000000000';
    testMove(true, 0, moveScript(state))
    game.setDataPart(state)

    // Bob places an O exceeds the board
    state = '00010000000000000000';
    testMove(true, 11, moveScript(state), false)
  })


});

```

我们的 JavaScript 所做的就是实例化一个 `Tictactoe` 合约, 并调用合约的公共函数 `move`，验证合约是否按照预期工作。测试合约是合约部署上链之前的一项重要工作。在后面的课程里，我们会进一步地教你如何测试、部署、调用一个合约，如何使用scryptlib。