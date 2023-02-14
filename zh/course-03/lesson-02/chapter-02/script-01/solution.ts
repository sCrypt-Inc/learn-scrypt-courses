import "./App.css";
import Game from "./Game";
import React, { useState, useEffect, useRef } from "react";
import TitleBar from "./TitleBar";
import { DefaultProvider, SensiletSigner } from "scrypt-ts";

function App() {

  const [gameData, setGameData] = useState(initialGameData);
  const [isConnected, setConnected] = useState(false);
  const signerRef = useRef<SensiletSigner>();
  const [contract, setContract] = useState<TicTacToe | undefined>(undefined)
  const [deployedTxId, setDeployedTxId] = useState<string>("")
  const [alicePubkey, setAlicePubkey] = useState("");
  const [bobPubkey, setBobPubkey] = useState("");
  const [alicebalance, setAliceBalance] = useState(0);
  const [bobbalance, setBobBalance] = useState(0);


  const sensiletLogin = async () => {
    try {
      
      const provider = new DefaultProvider();
      const signer = new SensiletSigner(provider);

      signerRef.current = signer;
      await signer.getConnectedTarget();
      
      setConnected(true);

      const alicPubkey = await signer.getDefaultPubKey();
      setAlicePubkey(toHex(alicPubkey))

      signer.getBalance().then(balance => {
         // UTXOs belonging to transactions in the mempool are unconfirmed
        setAliceBalance(balance.confirmed + balance.unconfirmed)
      })

      // Prompt user to switch accounts
      ...
      
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
