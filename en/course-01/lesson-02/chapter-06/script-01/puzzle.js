import React from 'react';
import { bsv, Bytes, Sig, toHex } from 'scryptlib';
import { web3, Input, SignType } from './web3';
import { getPreimage, toRawTx } from './web3/wutils';
import { DotWalletAddress } from './utils';

class Game extends React.Component {
  constructor(props) {
    super(props);
    ...
  }

  async buildCallContractTx(i, newState, oldState, squares, history) {
    ...

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
