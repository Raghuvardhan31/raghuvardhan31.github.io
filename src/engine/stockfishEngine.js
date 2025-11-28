// src/engine/stockfishEngine.js
export default class StockfishEngine {
  constructor(workerPath = '/stockfish-worker.js') {
    this.worker = new Worker(workerPath);
    this.onMessage = null;
    this.worker.onmessage = (e) => {
      const data = typeof e.data === 'string' ? e.data : JSON.stringify(e.data);
      if (this.onMessage) this.onMessage(data);
    };
  }

  send(cmd) {
    this.worker.postMessage(cmd);
  }

  setMessageHandler(fn) {
    this.onMessage = fn;
  }

  destroy() {
    this.worker.terminate();
  }
}
