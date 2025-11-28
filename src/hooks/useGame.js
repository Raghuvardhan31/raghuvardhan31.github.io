// src/hooks/useGame.js
import { useEffect, useRef, useState } from 'react';
import { Chess } from 'chess.js';

export default function useGame() {
  const chessRef = useRef(new Chess());
  const [fen, setFen] = useState(chessRef.current.fen());
  const [turn, setTurn] = useState(chessRef.current.turn()); // 'w' or 'b'
  const [history, setHistory] = useState([]);

  function makeMove(from, to, promotion) {
    // promotion is optional like 'q'
    const move = chessRef.current.move({ from, to, promotion });
    if (move) {
      setFen(chessRef.current.fen());
      setHistory(chessRef.current.history({ verbose: true }));
      setTurn(chessRef.current.turn());
      return move;
    }
    return null;
  }

  function reset() {
    chessRef.current.reset();
    setFen(chessRef.current.fen());
    setHistory([]);
    setTurn(chessRef.current.turn());
  }

  function undo() {
    const move = chessRef.current.undo();
    setFen(chessRef.current.fen());
    setHistory(chessRef.current.history({ verbose: true }));
    setTurn(chessRef.current.turn());
    return move;
  }

  useEffect(() => {
    // nothing to cleanup here
  }, []);

  return { fen, turn, history, makeMove, reset, undo, chess: chessRef.current };
}
