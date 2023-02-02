import { prop, SmartContract, PubKey, FixedArray, assert, Sig} from "scrypt-ts";

export class TicTacToe extends SmartContract {
    @prop()
    alice: PubKey;
    @prop()
    bob: PubKey;

    @prop(true)
    is_alice_turn: boolean;

    @prop(true)
    board: FixedArray<bigint, typeof TicTacToe.BOARDLEN>;

    @prop()
    static readonly EMPTY: bigint = 0n;
    @prop()
    static readonly ALICE: bigint = 1n;
    @prop()
    static readonly BOB: bigint = 2n;

    static readonly BOARDLEN = 9;

    @method()
    public move(n: bigint, sig: Sig, amount: bigint): void {
        assert(n >= 0n && n < 9n);
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