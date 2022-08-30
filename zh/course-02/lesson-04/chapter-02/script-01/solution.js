import { ZKProvider } from './zkProvider';
// run zero knowledge proof
function runZKP(privateInputs, publicInputs) {
    return ZKProvider
        .init()
        .then(() => {
            return ZKProvider.computeWitness(privateInputs.concat(publicInputs))
        })
        .then(async ({ witness }) => {
            return ZKProvider.generateProof(witness);
        })
        .then(async (proof) => {
            const isVerified = await ZKProvider.verify(proof);
            return { isVerified, proof };
        })
        .catch(e => {
            console.error('zkp.worker error:', e)
            return {
                isVerified: false
            }
        })
}

onmessage = async function (event) {

    const { ctx, publicInputs, privateInputs } = event.data;

    await runZKP(privateInputs, publicInputs)
        .then((res) => {
            const workerResult = event.data;
            workerResult.onmessage = true;
            postMessage({ ctx, ...res });
        });
};

