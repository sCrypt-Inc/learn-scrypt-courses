import { ZKProvider } from './zkProvider';
// run zero knowledge proof
function runZKP(privateInputs, publicInputs) {
    return ZKProvider
        .init()
        .then(() => {
            // TODO: computeWitness
        })
        .then(async ({ witness }) => {
            // TODO: generateProof
        })
        .then(async (proof) => {
            // TODO: verify proof
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

