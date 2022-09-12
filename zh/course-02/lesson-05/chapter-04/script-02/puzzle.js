export const Game = ({ desc }) => {
  
  ...

  const move = async (isPlayerFired, index, contractUtxo, hit, proof, newStates) => {

    return web3.call(contractUtxo, async (tx) => {

      if (newStates.successfulYourHits === 17) {
        const amount = contractUtxo.satoshis - tx.getEstimateFee();

        tx.setOutput(0, (tx) => {
          return new bsv.Transaction.Output({
            script: bsv.Script.buildPublicKeyHashOut(PlayerPrivkey.get(Player.Computer)),
            satoshis: amount,
          })
        })

      } else if (newStates.successfulComputerHits === 17) {
        tx.setOutput(0, (tx) => {
          const amount = contractUtxo.satoshis - tx.getEstimateFee();

          return new bsv.Transaction.Output({
            script: bsv.Script.buildPublicKeyHashOut(PlayerPrivkey.get(Player.You)),
            satoshis: amount,
          })
        })

      } else {
        tx.setOutput(0, (tx) => {
          const amount = contractUtxo.satoshis - tx.getEstimateFee();

          const newLockingScript = battleShipContract.getNewStateScript(newStates);

          return new bsv.Transaction.Output({
            script: newLockingScript,
            satoshis: amount,
          })
        })
      }


      tx.setInputScript(0, (tx, output) => {
        //TODO: call  contract move function to get unlocking script

      })
        .seal();


    }).then(async rawTx => {
      ContractUtxos.add(rawTx, isPlayerFired, index);

      battleShipContract.successfulYourHits = newStates.successfulYourHits;
      battleShipContract.successfulComputerHits = newStates.successfulComputerHits;
      battleShipContract.yourTurn = newStates.yourTurn;


    })
      .catch(e => {
        console.error('call contract fail', e)
      })

  }

  ...

  const startTurn = async () => {

    const computerShips_ = generateComputerShips();
    const BattleShip = buildContractClass(desc);

    const playerHash = await shipHash(placedShips);
    const computerHash = await shipHash(computerShips_);

    const contract = new BattleShip(new PubKey(PlayerPublicKey.get(Player.You)),
      new PubKey(PlayerPublicKey.get(Player.Computer)),
      new Int(playerHash), new Int(computerHash), 0, 0, true);

    setBattleShipContract(contract);

    try {

      ContractUtxos.clear();

      //TODO: deploy contract

      ContractUtxos.add(rawTx, 0, -1);

      const txid = ContractUtxos.getdeploy().utxo.txId

      setDeployTxid(txid)

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