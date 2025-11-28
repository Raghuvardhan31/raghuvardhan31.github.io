// public/stockfish-worker.js
// Worker that loads stockfish.js via importScripts and forwards messages.

importScripts('/stockfish.js');

// Different builds expose engine differently. Many expose STOCKFISH() or stockfish().
// Try STOCKFISH first; if not, change to stockfish or Module as needed.
let engine;
if (typeof STOCKFISH === 'function') {
  engine = STOCKFISH();
} else if (typeof stockfish === 'function') {
  engine = stockfish();
} else if (typeof Module !== 'undefined' && Module && typeof Module._stockfish === 'function') {
  // fallback — depends on build
  engine = Module._stockfish();
} else {
  // If engine not found, throw error to console
  postMessage('ERROR: could not find engine export (STOCKFISH/stockfish/Module).');
}

if (engine) {
  engine.onmessage = function(e) {
    // Forward engine messages to main thread
    postMessage(e.data);
  };
  onmessage = function(e) {
    engine.postMessage(e.data);
  };
}
