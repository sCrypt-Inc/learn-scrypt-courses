import { prop, SmartContract, PubKey, FixedArray} from "scrypt-ts";

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

    constructor(alice: PubKey, bob: PubKey, is_alice_turn:boolean, board: FixedArray<bigint, 9>) {
        super(...arguments);
        this.alice = alice;
        this.bob = bob;
        this.is_alice_turn = is_alice_turn;
        this.board = board;
    }

    // TODO: add `@methed` function here

}