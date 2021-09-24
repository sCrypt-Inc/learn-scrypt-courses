import "./App.css";
import Game from "./Game";
import React, { useState, useEffect } from "react";
import TitleBar from "./TitleBar";
//TODO: import scryptlib here

function App() {


  useEffect(() => {

  }, []);

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
