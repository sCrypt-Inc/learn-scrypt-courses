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

  const startGame = async (amount: number) => {

    try {
      const signer = signerRef.current as SensiletSigner;
      const instance = new TicTacToe(
        PubKey(toHex(alicePubkey)),
        PubKey(toHex(bobPubkey))
      );
      
      await instance.connect(signer);

      const tx = await instance.deploy(amount)

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
