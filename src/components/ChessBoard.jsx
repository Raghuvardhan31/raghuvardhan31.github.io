// src/components/ChessBoard.jsx
import React, { useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import useGame from '../hooks/useGame';
import StockfishEngine from '../engine/stockfishEngine';

export default function ChessBoard() {
  const { fen, makeMove, chess } = useGame(); // note: chess is chess.js instance
  const engineRef = useRef(null);

  useEffect(() => {
    const engine = new StockfishEngine('/stockfish-worker.js');
    engineRef.current = engine;

    engine.setMessageHandler((msg) => {
      // engine prints many lines. We care about "bestmove e2e4"
      // and possibly "info" lines for debugging.
      // console.log('engine:', msg);

      // Extract bestmove
      const bmMatch = msg.match(/bestmove\s+([a-h][1-8][a-h]?[1-8]?[qrbn]?)/);
      if (bmMatch) {
        const moveStr = bmMatch[1]; // e.g. e2e4 or e7e8q
        const from = moveStr.slice(0, 2);
        const to = moveStr.slice(2, 4);
        const promotion = moveStr.length > 4 ? moveStr[4] : undefined;
        // Apply engine move using chess.js via makeMove
        makeMove(from, to, promotion);
      }
    });

    // Init engine
    engine.send('uci');
    engine.send('isready');
    engine.send('ucinewgame');

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [makeMove]);

  function askEngineToMove() {
    if (!engineRef.current) return;
    engineRef.current.send('position fen ' + chess.fen());
    // choose depth or movetime
    engineRef.current.send('go depth 12'); // or go movetime 1000 (ms)
  }

  function onPieceDrop(sourceSquare, targetSquare) {
    // Called when user moves a piece on the board
    const move = makeMove(sourceSquare, targetSquare);
    if (move) {
      // After successful user move, ask engine to respond
      // small timeout to allow state updates (optional)
      setTimeout(() => {
        askEngineToMove();
      }, 50);
      return true;
    }
    return false;
  }

  return (
    <div>
      <Chessboard
        position={fen}
        onPieceDrop={(source, target) => {
          // react-chessboard expects boolean return: true if move accepted
          return onPieceDrop(source, target);
        }}
        arePiecesDraggable={true}
        boardWidth={560}
      />
      <div style={{ marginTop: 12 }}>
        <button onClick={() => { /* reset via chess.js */ window.location.reload(); }}>
          Reset
        </button>
        <button onClick={() => {
          // ask engine to play from current position
          if (engineRef.current) {
            engineRef.current.send('position fen ' + chess.fen());
            engineRef.current.send('go depth 12');
          }
        }}>Engine Move</button>
      </div>
    </div>
  );
}
