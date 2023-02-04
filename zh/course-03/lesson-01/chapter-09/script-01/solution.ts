
import { prop, method, SmartContract, PubKey, FixedArray, assert, Sig, Utils, toByteString, hash160} from "scrypt-ts";

export class TicTacToe extends SmartContract {
    @prop()
    alice: PubKey;
    @prop()
    bob: PubKey;

    @prop(true)
    is_alice_turn: boolean;

    @prop(true)
    board: FixedArray<bigint, 9>;

    @prop()
    static readonly EMPTY: bigint = 0n;
    @prop()
    static readonly ALICE: bigint = 1n;
    @prop()
    static readonly BOB: bigint = 2n;

    @method()
    public move(n: bigint, sig: Sig, amount: bigint): void {
        // check position `n`
        assert(n >= 0n && n < 9n);
        // check signature `sig`
        let player: PubKey = this.is_alice_turn ? this.alice : this.bob;
        assert(this.checkSig(sig, player), `checkSig failed, sig: ${sig}, pubkey: ${player}`);
        // update stateful properties to make the move
        assert(this.board[Number(n)] === TicTacToe.EMPTY, `board at position ${n} is not empty: ${this.board[Number(n)]}`);
        let play = this.is_alice_turn ? TicTacToe.ALICE : TicTacToe.BOB;
        this.board[Number(n)] = play;
        this.is_alice_turn = !this.is_alice_turn;

        // build the transation outputs
        let outputs = toByteString('');
        if (this.won(play)) {
            let outputScript = Utils.buildPublicKeyHashScript(hash160(player));
            let output = Utils.buildOutput(outputScript, amount);
            outputs = output;
        }
        else if (this.full()) {
            let aliceScript = Utils.buildPublicKeyHashScript(hash160(this.alice));
            let aliceOutput = Utils.buildOutput(aliceScript, amount);

            let bobScript = Utils.buildPublicKeyHashScript(hash160(this.bob));
            let bobOutput = Utils.buildOutput(bobScript, amount);

            outputs = aliceOutput + bobOutput;
        }
        else {
            // build a output that contains latest contract state.
            outputs = this.buildStateOutput(amount);
        }

        // make sure the transaction contains the expected outputs built above
        assert(this.ctx.hashOutputs === hash256(outputs), "check hashOutputs failed");
    }

    @method()
    won(play: bigint) : boolean {
        return true;
    }

    @method()
    full() : boolean {
        return true;
    }

}