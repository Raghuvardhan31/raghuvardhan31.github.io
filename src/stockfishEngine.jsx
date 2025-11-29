let engine = null;
let isReady = false;

export function initEngine() {
  return new Promise((resolve) => {
    if (engine && isReady) {
      resolve(engine);
      return;
    }

    engine = new Worker("/stockfish.js");

    engine.onmessage = (e) => {
      const msg = e.data;
      console.log("ENGINE Hello this is raghu best move:", msg);

      if (msg.includes("uciok")) {
        isReady = true;
        engine.postMessage("isready");
      } else if (msg.includes("readyok")) {
        resolve(engine);
      }
    };

    engine.postMessage("uci");
  });
}

export function getBestMove(fen, callback) {
  initEngine().then(() => {
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage("go depth 12");

    const handler = (e) => {
      const msg = e.data;

      if (msg.includes("bestmove")) {
        const best = msg.split("bestmove ")[1].split(" ")[0];

        // Clean listener
        engine.removeEventListener("message", handler);

        callback(best);
      }
    };

    // Listen for the result
    engine.addEventListener("message", handler);
  });
}
