import "./App.css";
import Game from "./Game";
import { useState, useRef } from "react";
import TitleBar from "./TitleBar";
import { DefaultProvider, PandaSigner, toHex, PubKey, bsv } from "scrypt-ts";
import { TicTacToe } from "./contracts/tictactoe";

const initialGameData = {
  amount: 0,
  name: "tic-tac-toe",
  date: new Date(),
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  currentStepNumber: 0,
  isAliceTurn: true,
  start: false
}

function App() {

  const [gameData, setGameData] = useState(initialGameData);
  const [isConnected, setConnected] = useState(false);
  const signerRef = useRef<PandaSigner>();
  const [contract, setContract] = useState<TicTacToe | undefined>(undefined)
  const [deployedTxId, setDeployedTxId] = useState<string>("")
  const [alicePubkey, setAlicePubkey] = useState("");
  const [bobPubkey, setBobPubkey] = useState("");
  const [alicebalance, setAliceBalance] = useState(0);
  const [bobbalance, setBobBalance] = useState(0);

  const startGame = async (amount: number) => {

    if (!isConnected || !alicePubkey || !bobPubkey) {
      setConnected(false)
      alert("Please connect wallet first.")
      return
    }

    try {
      const signer = signerRef.current as PandaSigner;


      const instance = new TicTacToe(
        PubKey(toHex(alicePubkey)),
        PubKey(toHex(bobPubkey))
      )

      await instance.connect(signer);

      const tx = await instance.deploy(amount);

      setDeployedTxId(tx.id)

      setContract(instance)

      setGameData(Object.assign({}, gameData, {
        start: true
      }))
    } catch (e) {
      console.error('deploy TicTacToe failes', e)
      alert('deploy TicTacToe failes')
    }

  };

  const cancelGame = async () => {
    setGameData(Object.assign({}, gameData, initialGameData))
  };

  const sensiletLogin = async () => {
    try {

      const provider = new DefaultProvider({
        network: bsv.Networks.testnet
      });
      const signer = new PandaSigner(provider);

      signerRef.current = signer;

      // TODO: request to connect wallet

      setConnected(true);

      const alicPubkey = await signer.getDefaultPubKey();
      setAlicePubkey(toHex(alicPubkey))

      signer.getBalance().then(balance => {
        // UTXOs belonging to transactions in the mempool are unconfirmed
        setAliceBalance(balance.confirmed + balance.unconfirmed)
      })

      // Prompt user to switch accounts

    } catch (error) {
      console.error("pandaLogin failed", error);
      alert("pandaLogin failed")
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
            <label>Balance: {alicebalance} <span> (satoshis)</span></label>
            :
            <button
              className="pure-button button-large panda"
              onClick={pandaLogin}
            >
              Connect Wallet
            </button>
        }
      </header>
    </div>
  );
}

export default App;
