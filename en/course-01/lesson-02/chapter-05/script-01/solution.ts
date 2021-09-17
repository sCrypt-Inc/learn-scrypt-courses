import {  bsv } from 'scryptlib';
import { UTXO, wallet, Tx,  SignType } from './wallet';
import { AbstractContract } from 'scryptlib/dist/contract';
import {toRawTx } from './wutils';
import { DotWallet } from './dotwallet';
const WEB3_VERSION = '0.0.1';

const FEE = 2000;

export class web3 {


  static wallet: wallet;


  static setWallet(wallet: wallet) {
    web3.wallet = wallet;
  }


  static version() {
    return WEB3_VERSION;
  }

  
  static async buildDeployTx(contract: AbstractContract, amountInContract: number): Promise<Tx> {

    let wallet = new DotWallet();

    let changeAddress = '';
    
    let publicKey = '';

    const minAmount = amountInContract + FEE;

    return wallet.listUnspent(minAmount, {
      purpose: 'alice'
    }).then(async (utxos: UTXO[]) => {

      if (utxos.length === 0) {
        throw new Error('no utxos');
      }

      
      const tx: Tx = {
        inputs: [],
        outputs: []
      };

      tx.outputs.push({
        script: contract.lockingScript.toHex(),
        satoshis: amountInContract 
      });


      tx.inputs.push(
        {
          utxo: utxos[0],
          script: '',
          sequence: 0
        }
      );

      const changeAmount = utxos[0].satoshis - amountInContract - FEE;

      if (changeAmount <= 0) {
        throw new Error('fund is not enough');
      }

      const script = bsv.Script.buildPublicKeyHashOut(changeAddress).toHex();
      tx.outputs.push(
        {
          script: script,
          satoshis: changeAmount
        }
      );


      return tx;
    }).then((tx) => {
      return wallet.getSignature(toRawTx(tx), 0, SignType.ALL,changeAddress).then(signature => {
        const script = new bsv.Script()
        .add(Buffer.from(signature,'hex'))
        .add(new bsv.PublicKey(publicKey).toBuffer())
        .toHex();

        tx.inputs[0].script = script;
        return tx;
      })
    })
  }
}