import { assert, SmartContract, Utils, method, hash160, hash256, prop, FixedArray, PubKey, toByteString, Sig } from 'scrypt-ts'
import { Verifier, Proof, VerifyingKey } from './verifier'

export class BattleShip extends SmartContract {
    @prop()
    player: PubKey

    @prop()
    computer: PubKey

    @prop()
    playerBoardHash: bigint

    @prop()
    computerBoardHash: bigint

    @prop(true)
    successfulPlayerHits: bigint

    @prop(true)
    successfulComputerHits: bigint

    @prop(true)
    playerTurn: boolean

    @prop()
    vk: VerifyingKey

    constructor(
        player: PubKey,
        computer: PubKey,
        playerBoardHash: bigint,
        computerBoardHash: bigint,
        vk: VerifyingKey
    ) {
        super(...arguments)
        this.player = player
        this.computer = computer
        this.playerBoardHash = playerBoardHash
        this.computerBoardHash = computerBoardHash
        this.successfulPlayerHits = 0n
        this.successfulComputerHits = 0n
        this.playerTurn = true
        this.vk = vk
    }

    @method()
    public move(
        sig: Sig,
        x: bigint,
        y: bigint,
        hit: boolean,
        proof: Proof,
        amount: bigint
    ) {
        let inputs: FixedArray<bigint, 4> = [
            this.playerTurn ? this.computerBoardHash : this.playerBoardHash,
            x, y,
            hit ? 1n : 0n
        ]

        const verifier = new Verifier(this.vk)
        verifier.verifyProof(inputs, proof)

        const pubKey = this.playerTurn ? this.player : this.computer
        assert(this.checkSig(sig, pubKey))

        if (this.playerTurn) {
            if (hit) {
                this.successfulPlayerHits++
            }
        } else {
            if (hit) {
                this.successfulComputerHits++
            }
        }

        this.playerTurn = !this.playerTurn

        let outputs = toByteString('')
        if (this.successfulPlayerHits == 17n) {
            let script = Utils.buildPublicKeyHashScript(hash160(this.player))
            outputs = Utils.buildOutput(script, amount)
        } else if (this.successfulComputerHits == 17n) {
            let script = Utils.buildPublicKeyHashScript(hash160(this.computer))
            outputs = Utils.buildOutput(script, amount)
        } else {
            let script = this.getStateScript()
            outputs = Utils.buildOutput(script, amount)
        }

        // Make sure the transaction contains the expected outputs.
        assert(this.ctx.hashOutputs == hash256(outputs), 'hashOutputs mismatch')
    }

}
