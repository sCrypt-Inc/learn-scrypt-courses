import "./App.css";
import Game from "./Game";
import React, { useState, useEffect } from "react";
import TitleBar from "./TitleBar";
//TODO: add PubKey here
import { toHex } from "scryptlib";
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

      //TODO: new TictactoeContractClass

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
