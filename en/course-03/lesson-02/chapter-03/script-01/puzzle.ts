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

    try {
      const signer = signerRef.current as PandaSigner;
      const instance = new TicTacToe(
        PubKey(toHex(alicePubkey)),
        PubKey(toHex(bobPubkey))
      );
      
      // TODO: connect the signer and deploy the contract

      setDeployedTxId(tx.id)
  
      setContract(instance)
  
      setGameData(Object.assign({}, gameData, {
        start: true
      }))
    } catch(e) {
      console.error('deploy TicTacToe failes', e)
      alert('deploy TicTacToe failes')
    }
    
  };

  ...

}

export default App;
