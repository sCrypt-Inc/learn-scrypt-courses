import { prop, SmartContract, PubKey, FixedArray, fill} from "scrypt-ts";

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

    constructor(alice: PubKey, bob: PubKey) {
        super(...arguments);
        this.alice = alice;
        this.bob = bob;
        this.is_alice_turn = true;
        this.board = fill(TicTacToe.EMPTY, 9);
    }

    // TODO: add `@method` function here

}