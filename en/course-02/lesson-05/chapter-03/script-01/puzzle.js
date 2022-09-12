
export class CircomProvider {
    static instance;
  
    constructor(program, proving_key, verification_key) {
      this.program = program;
      this.proving_key = proving_key;
      this.verification_key = verification_key;
    }
  
    static async init() {
      // console.log('ZKP init...')
      if (CircomProvider.instance) return CircomProvider;
      try {
        let verification_key = await fetch('/zk-battleship/zk/verification_key.json').then(resp => resp.json());
        CircomProvider.instance = new CircomProvider(
          "/zk-battleship/zk/battleship.wasm",
          "/zk-battleship/zk/circuit_final.zkey",
          verification_key
        );
        console.log('ZKP initialized.')
        return CircomProvider;
      } catch (error) {
        console.log('init CircomProvider fail', error)
      }
    }
  
    static generateProof(witness) {
      if (!CircomProvider.instance) {
        throw Error('Uninitilized CircomProvider, call `CircomProvider.init()` first!');
      }
      return new Promise(async resolve => {
        // TODO: call fullProve to generate proof

        resolve({ proof, publicSignals, isHit: publicSignals[0] === "1" } );
      });
    }
  
    static verify({ proof, publicSignals } ) {
      if (!CircomProvider.instance) {
        throw Error('Uninitilized CircomProvider, call `CircomProvider.init()` first!');
      }
      return new Promise(async resolve => {
        // TODO: call verify to verify proof
        
        resolve(res);
      });
    }
  }