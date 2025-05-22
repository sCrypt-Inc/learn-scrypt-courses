import { SmartContract, PubKey, FixedArray} from "scrypt-ts";

export class TicTacToe extends SmartContract {
    // TODO: add all properties here

    constructor(alice: PubKey, bob: PubKey, is_alice_turn:boolean, board: FixedArray<bigint, 9>) {
        super(...arguments);
        // TODO: init all properties here
    }

}