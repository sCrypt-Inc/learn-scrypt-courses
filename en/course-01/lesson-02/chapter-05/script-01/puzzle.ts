import {  bsv } from 'scryptlib';
import { UTXO, wallet, Tx,  SignType } from './wallet';
import { AbstractContract } from 'scryptlib/dist/contract';
import {toRawTx } from './wutils';

const FEE = 2000;

export class web3 {

  static wallet: wallet;
  
  static async buildDeployTx(contract: AbstractContract, amountInContract: number): Promise<Tx> {

    let changeAddress = '',  publicKey = '';

    const minAmount = amountInContract + FEE;

    return web3.wallet.listUnspent(minAmount, {
      purpose: 'alice'
    }).then(async (utxos: UTXO[]) => {
      
      const tx: Tx = {
        inputs: [],
        outputs: []
      };

      //TODO: add contract output here


      tx.inputs.push(
        {
          utxo: utxos[0],
          script: '',
          sequence: 0
        }
      );


      return tx;
    }).then((tx) => {
      return wallet.getSignature(toRawTx(tx), 0, SignType.ALL,changeAddress).then(signature => {
        const script = new bsv.Script()
        .add(Buffer.from(signature,'hex'))
        .add(new bsv.PublicKey(publicKey).toBuffer())
        .toHex();

        //TODO: set unlocking script here
        
        return tx;
      })
    })
  }

}