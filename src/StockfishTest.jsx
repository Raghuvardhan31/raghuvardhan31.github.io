import { useEffect, useState } from "react";

export default function StockfishTest() {
  const [engineOutput, setEngineOutput] = useState("");

  useEffect(() => {
    // Use Vite-friendly way to load worker from public folder
    const engine = new Worker(new URL("/stockfish.js", import.meta.url));

    engine.onmessage = (event) => {
      console.log("ENGINE:", event.data);
      setEngineOutput(event.data);
    };

    engine.postMessage("uci");
    engine.postMessage(
      "position fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
    engine.postMessage("go depth 10");

    return () => engine.terminate();
  }, []);

  return <h2>Check console → Stockfish Output: {engineOutput}</h2>;
}
