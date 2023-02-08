import "./App.css";
import Game from "./Game";
import React, { useState, useEffect, useRef } from "react";
import TitleBar from "./TitleBar";
import { WhatsonchainProvider, bsv, SensiletSigner } from "scrypt-ts";

function App() {

  const [gameData, setGameData] = useState(initialGameData);
  const [isConnected, setConnected] = useState(false);
  const [balance, setBalance] = useState(0);
  const signerRef = useRef<SensiletSigner>();


  const sensiletLogin = async () => {
    try {
      
      const provider = new WhatsonchainProvider(bsv.Networks.testnet);
      const signer = new SensiletSigner(provider);

      signerRef.current = signer;
      await signer.getConnectedTarget();
      
      setConnected(true);

      signer.getBalance().then(balance => {
        setBalance(balance.confirmed + balance.unconfirmed)
      })
    } catch (error) {
      console.error("sensiletLogin failed", error);
      alert("sensiletLogin failed")
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h2>Play Tic-Tac-Toe on Bitcoin</h2>
        <TitleBar
          onStart={startGame}
          onCancel={cancelGame}
          started={gameData.start}
        />
        <Game gameData={gameData} setGameData={setGameData} />

        {
          isConnected ?
            <label>Balance: {balance} <span> (satoshis)</span></label>
            :
            <button
              className="pure-button button-large sensilet"
              onClick={sensiletLogin}
            >
              Connect Wallet
            </button>
        }
      </header>
    </div>
  );
}

export default App;
