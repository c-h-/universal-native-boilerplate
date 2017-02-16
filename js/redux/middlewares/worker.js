import createWorkerMiddleware from 'redux-worker-middleware';

// worker
const Add1Worker = require('worker-loader!../../workers'); // webpack's worker-loader

const add1Worker = new Add1Worker;
export default createWorkerMiddleware(add1Worker);
