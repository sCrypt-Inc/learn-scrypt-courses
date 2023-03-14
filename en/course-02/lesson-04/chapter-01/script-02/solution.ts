//...

export type Proof = {
    a: G1Point
    b: G2Point
    c: G1Point
}

export type VerifyingKey = {
    millerb1a1: FQ12 // Precalculated miller(alpha, beta)
    gamma: G2Point
    delta: G2Point
    gammaAbc: FixedArray<G1Point, 5> // Size of array should be N + 1
}

export class Verifier extends SmartContract {
    
    @prop()
    vk: VerifyingKey

    constructor(vk: VerifyingKey) {
        super(...arguments)
        this.vk = vk
    }
    
    @method()
    public verifyProof(
        inputs: FixedArray<bigint, 4>,
        proof: Proof,
    ) {
        assert(G16BN256.verify(this.vk, inputs, proof))
    }
}
