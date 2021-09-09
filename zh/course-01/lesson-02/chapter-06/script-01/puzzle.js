

import React from 'react';
import Board from './Board';
import { bsv, Bytes, Sig, toHex } from 'scryptlib';
import { web3, Input, SignType } from './web3';

import server from './Server';
import { getPreimage, toRawTx, toBsvTx } from './web3/wutils';
import { DotWalletAddress, DotWalletPublicKey, getPlayer } from './utils';

class Game extends React.Component {
  constructor(props) {
    super(props);

    if (props.game && props.game.gameState) {
      this.state = props.game.gameState;
    } else {
      this.state = initialState;
    }
  }




  async buildCallContractTx(i, newState, oldState, squares, history) {
    let newLockingScript = "";
    let winner = calculateWinner(squares).winner;
    const FEE = 3000;
    let outputs = [];
    let amount = this.props.game.lastUtxo.satoshis - FEE;
    if (winner) {
      const player = getPlayer();
      // winner is current player

      let address = await DotWalletAddress.get(player);

      newLockingScript = bsv.Script.buildPublicKeyHashOut(address).toHex();

      outputs.push({
        satoshis: amount,
        script: newLockingScript
      })

    } else if (history.length >= 9) {

      const aliceAddress = new bsv.PublicKey(this.props.game.alicePubKey, {
        network: bsv.Networks.testnet
      });
      const bobAddress = new bsv.PublicKey(this.props.game.bobPubKey, {
        network: bsv.Networks.testnet
      });

      //no body win
      const aliceLockingScript = bsv.Script.buildPublicKeyHashOut(aliceAddress.toAddress(bsv.Networks.testnet)).toHex();
      const bobLockingScript = bsv.Script.buildPublicKeyHashOut(bobAddress.toAddress(bsv.Networks.testnet)).toHex();
      amount = (this.props.game.lastUtxo.satoshis - FEE) / 2;

      outputs.push({
        satoshis: amount,
        script: aliceLockingScript
      })

      outputs.push({
        satoshis: amount,
        script: bobLockingScript
      })

    } else {
      //next
      newLockingScript = [this.props.contractInstance.codePart.toHex(), bsv.Script.fromASM(newState).toHex()].join('');
      outputs.push({
        satoshis: amount,
        script: newLockingScript
      })
    }


    if (outputs[0].satoshis <= 0) {
      alert(`fund in contract is too low `)
      return undefined;
    }


    let tx = {
      inputs: [{
        utxo: this.props.game.lastUtxo,
        sequence: 0,
        script: ""
      }],
      outputs: outputs
    }

    let preimage = getPreimage(tx);

    const addr = DotWalletAddress.get();

    let sig = await web3.wallet.getSignature(toRawTx(tx), 0, SignType.ALL, addr);

    this.props.contractInstance.setDataPart(oldState);


    let unlockScript = this.props.contractInstance.move(i, new Sig(toHex(sig)), amount, preimage).toHex();

    tx.inputs[0].script = unlockScript;

    //TODO: we can verify locally before we broadcast the tx, if fail, 
    // it will print the launch.json in the brower webview developer tool, just copy/paste,
    // and try launch the sCrypt debugger

    if (!result.success) {
      throw new Error(result.error)
    }

    return tx;
  }

}
