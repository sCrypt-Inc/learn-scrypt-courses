export const Game = ({ artifact, signer }) => {
  
  ...

  const move = async (isPlayerFired, index, contractUtxo, hit, proof, newStates) => {

    const pubKeyPlayer = signer.getDefaultPubKey()
    const pubKeyComputer = pubKeyPlayer

    const currentInstance = battleShipContract;
    const nextInstance = currentInstance.next()

    const initBalance = currentInstance.from?.tx.outputs[currentInstance.from?.outputIndex].satoshis as number;

    // Update contract state:
    Object.assign(nextInstance, newStates); // TODO (miha)

    currentInstance.bindTxBuilder('move', async (currentInstance: BattleShip, options: MethodCallOptions<BattleShip>, sig: Sig) => {

      const unsignedTx: bsv.Transaction = new bsv.Transaction()
        .addInputFromPrevTx(currentInstance.from?.tx as bsv.Transaction, currentInstance.from?.outputIndex)
        .from(options.utxos);

      const changeAddress = await currentInstance.signer.getDefaultAddress();


      if (nextInstance.successfulPlayerHits == 17n) {

        unsignedTx.addOutput(new bsv.Transaction.Output({
          script: bsv.Script.buildPublicKeyHashOut(pubKeyPlayer),
          satoshis: initBalance
        }))
          .change(changeAddress)

        return Promise.resolve({
          tx: unsignedTx,
          atInputIndex: 0,
          nexts: [

          ]
        });

      } else if (newStates.successfulComputerHits == 17n) {

        unsignedTx.addOutput(new bsv.Transaction.Output({
          script: bsv.Script.buildPublicKeyHashOut(pubKeyComputer),
          satoshis: initBalance
        }))
          .change(changeAddress)

        return Promise.resolve({
          tx: unsignedTx,
          atInputIndex: 0,
          nexts: [

          ]
        });

      } else {
        unsignedTx.addOutput(new bsv.Transaction.Output({
          script: nextInstance.lockingScript,
          satoshis: initBalance,
        }))
          .change(changeAddress)

        return Promise.resolve({
          tx: unsignedTx,
          atInputIndex: 0,
          nexts: [
            {
              instance: nextInstance,
              atOutputIndex: 0,
              balance: initBalance
            }
          ]
        });
      }
    })


    const currentTurn = !newStates.yourTurn;
    const pubKey = currentTurn ? pubKeyPlayer : pubKeyComputer
    const position = indexToCoords(index);

    const { tx: callTx } = await currentInstance.methods.move(
      (sigResponses: SignatureResponse[]) => {
        return findSig(sigResponses, pubKey)
      },
      position.x, position.y, hit, proof, initBalance,
      {
        pubKeyOrAddrToSign: pubKey,
      } as MethodCallOptions<BattleShip>
    )

    ContractUtxos.add(callTx, isPlayerFired, index);

    battleShipContract.successfulYourHits = newStates.successfulYourHits;
    battleShipContract.successfulComputerHits = newStates.successfulComputerHits;
    battleShipContract.yourTurn = newStates.yourTurn;
    battleShipContract.yourHits = newStates.yourHits;
    battleShipContract.computerHits = newStates.computerHits;
  }

  ...

  const startTurn = async () => {
    BattleShip.loadArtifact(artifact)

    const computerShips_ = generateComputerShips();
    const playerHash = await shipHash(placedShips);
    const computerHash = await shipHash(computerShips_);

    // Construct VK
    let alpha = BN256.createCurvePoint(VERIFYING_KEY_DATA.alpha)
    let beta = BN256.createTwistPoint(VERIFYING_KEY_DATA.beta)
    let millerb1a1 = BN256Pairing.miller(beta, alpha)

    let vk: VerifyingKey = {
      millerb1a1: millerb1a1,
      gamma: VERIFYING_KEY_DATA.gamma,
      delta: VERIFYING_KEY_DATA.delta,
      gammaAbc: VERIFYING_KEY_DATA.gammaAbc
    }

    const falseArr: FixedArray<boolean, 100> = new Array(100).fill(false) as FixedArray<boolean, 100>

    // Because in this implementation we're playing against our local computer we just use the same
    // key (of our Sensilet wallet) for both players for the sake of simplicity.
    const pubKeyPlayer = (await signer.getDefaultPubKey()).toString()
    const pubKeyComputer = pubKeyPlayer

    const instance = new BattleShip(
      PubKey(pubKeyPlayer),
      PubKey(pubKeyComputer),
      BigInt(playerHash),
      BigInt(computerHash),
      falseArr, falseArr,
      vk);

    instance.connect(signer)

    setBattleShipContract(instance);

    try {
      ContractUtxos.clear();
      const rawTx = await instance.deploy(10000);
      ContractUtxos.add(rawTx, 0, -1);

      const txid = ContractUtxos.getdeploy().utxo.txId

      setDeployTxid(txid)

      setTimeout(async () => {
        signer.getBalance().then(balance => {
          console.log('update balance:', balance.total)
          setBalance(balance.total)
        })
      }, 10000);
    } catch (error) {
      console.error("deploy contract fails", error);
      setBattleShipContract(null);
      alert("deploy contract error:" + error.message);
      return;
    }

    setGameState('player-turn');
    setPlacedShipsHash(playerHash);
    setComputerShipsHash(computerHash);
  };

  ...

};
