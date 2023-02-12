async function move(i: number, latestGameData: GameData) {
  const current = props.contract as TicTacToe;
  const nextInstance = current.next();
  // update nextInstance state
  Object.assign(nextInstance, Utils.toContractState(latestGameData));

  TicTacToe.bindTxBuilder('move', async function (options: BuildMethodCallTxOptions<SmartContract>, n: bigint, sig: Sig): Promise<BuildMethodCallTxResult<SmartContract>> {
  
    let play = current.is_alice_turn ? TicTacToe.ALICE : TicTacToe.BOB;

    const changeAddress = await current.signer.getDefaultAddress();

    const initBalance = current.from?.tx.outputs[current.from?.outputIndex].satoshis as number;

    const unsignedTx: bsv.Transaction = new bsv.Transaction()
      .addInputFromPrevTx(current.from?.tx as bsv.Transaction, current.from?.outputIndex)
      .from(options.utxos);

    if (nextInstance.won(play)) {

      unsignedTx.addOutput(new bsv.Transaction.Output({
        script: current.is_alice_turn ? buildPublicKeyHashScript(hash160(current.alice)) : buildPublicKeyHashScript(hash160(current.bob)),
        satoshis: initBalance
      }))
      .change(changeAddress)

      return Promise.resolve({
        unsignedTx,
        atInputIndex: 0,
        nexts: [

        ]
      }) as Promise<BuildMethodCallTxResult<TicTacToe>>

    } else if (nextInstance.full()) {

      const halfAmount = initBalance / 2

      unsignedTx.addOutput(new bsv.Transaction.Output({
        script: buildPublicKeyHashScript(hash160(current.alice)),
        satoshis: halfAmount
      }))
      .addOutput(new bsv.Transaction.Output({
        script: buildPublicKeyHashScript(hash160(current.bob)),
        satoshis: halfAmount
      }))
      .change(changeAddress)


      return Promise.resolve({
        unsignedTx,
        atInputIndex: 0,
        nexts: [

        ]
      }) as Promise<BuildMethodCallTxResult<TicTacToe>>
    } else {

      unsignedTx.addOutput(new bsv.Transaction.Output({
        script: nextInstance.lockingScript,
        satoshis: initBalance,
      }))
      .change(changeAddress)

      return Promise.resolve({
        unsignedTx,
        atInputIndex: 0,
        nexts: [
          {
            instance: nextInstance,
            atOutputIndex: 0,
            balance: initBalance
          }
        ]
      }) as Promise<BuildMethodCallTxResult<TicTacToe>>
    }
  });

  return current.methods.move(
    BigInt(i),
    (sigResponses: SignatureResponse[]) => {
      const pubKey = current.is_alice_turn ? current.alice : current.bob;
      return findSig(sigResponses, bsv.PublicKey.fromString(pubKey))
    }
  );
}