
import React, { useState, useEffect } from 'react';
import { web3, DotWallet } from './web3';

const Wallet = props => {
  const [balance, setBalance] = useState(0)

  useEffect(() => {

    if (!web3.wallet) {
      web3.setWallet(new DotWallet());
    }

    const fetchBalance = async () => {

      //TODO: add call getbalance

    };

    fetchBalance();

  }, []);


  return <div className="wallet">
    <div className="walletInfo">
      <div className="balance">
        <label >Balance: {balance}</label>
      </div>
    </div>
  </div>;
}

export default Wallet;