# Chapter 16: scryptlib

Our sCrypt contract is complete! Now we are going to write a piece of JavaScript front-end code to test this contract.

sCrypt has a JavaScript library named [scryptlib](https://github.com/sCrypt-Inc/scryptlib).

Install the library through npm:

```
npm install scryptlib
```


Now let's use a piece of code to understand how scryptlib interacts with the contract we will publish.

If you can't understand all of the following code, don't worry.

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

What our JavaScript does is to instantiate a `Tictactoe` contract, and call the contract's public function `move` to verify that the contract works as expected. Testing the contract is an important task before the contract is deployed on the chain. In the following courses, we will further teach you how to test, deploy, and call a contract, and how to use scryptlib.