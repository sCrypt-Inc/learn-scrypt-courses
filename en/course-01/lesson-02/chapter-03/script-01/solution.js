import "./App.css";
import Game from "./Game";
import React, { useState, useEffect } from "react";
import TitleBar from "./TitleBar";

import { PubKey, toHex } from "scryptlib";
import { web3 } from "./web3";

function App() {

  const [contractInstance, updateContractInstance] = useState(null);
  useEffect(() => {

  }, []);

  async function fetchContract(alicePubKey, bobPubKey) {
    if (contractInstance === null && alicePubKey && bobPubKey) {
      let { contractClass: TictactoeContractClass } = await web3.loadContract(
        "/tic-tac-toe/tictactoe_desc.json"
      );

      let c = new TictactoeContractClass(
        new PubKey(toHex(alicePubKey)),
        new PubKey(toHex(bobPubKey)),
      );
      c.setDataPart("00000000000000000000");

      updateContractInstance(c);
      return c;
    }
    return contractInstance;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Play Tic-Tac-Toe on Bitcoin</h2>
        <TitleBar />

        <Game />

        <Wallet></Wallet>
      </header>
    </div>
  );
}

export default App;
