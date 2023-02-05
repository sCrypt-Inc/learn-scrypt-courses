function App() {

  const [gameData, setGameData] = useState(initialGameData);
  const [isConnected, setConnected] = useState(false);
  const [balance, setBalance] = useState(0);
  const signerRef = useRef<SensiletSigner>();
  const [contract, setContract] = useState<TicTacToe | undefined>(undefined)
  const [deployedTxId, setDeployedTxId] = useState<string>("")

  const startGame = async (amount: number) => {

    try {
      const signer = signerRef.current as SensiletSigner;

      const pubkey = await signer.getDefaultPubKey()
  
      const instance = new TicTacToe(
        PubKey(toHex(pubkey)),
        PubKey(toHex(pubkey)),
        true,
        [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n]
      ).markAsGenesis();
      
      await instance.connect(signer);
  
      const tx = await instance.deploy(10000);

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
