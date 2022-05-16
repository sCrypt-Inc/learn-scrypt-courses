import { useState, useEffect } from "react";
import { web3 } from "./web3";
const Balance = (props) => {
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    if (web3.wallet) {
      // TODO: call getbalance to update balance
    }
  }, []);

    return (
      <div className="wallet">
        <div className="walletInfo">
          <div className="balance">
            <label>Balance: {balance} <span> (satoshis)</span></label>
          </div>
        </div>
      </div>
    );
};

export default Balance;
