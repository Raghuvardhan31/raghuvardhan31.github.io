import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChessBoard from "./ChessBoard";

function ChessGame() {
  const { fen: urlFen } = useParams();
  const [fen, setFen] = useState("start");
  const navigate = useNavigate();  // ← Needed for Back button

  useEffect(() => {
    if (urlFen) {
      setFen(decodeURIComponent(urlFen));
    }
  }, [urlFen]);

  const handleStartPuzzle = () => {
    const fenInput = prompt("Enter FEN:");
    if (fenInput) setFen(fenInput);
  };

  const handlePlay = () => {
    const fenInput = prompt("Enter FEN for play:");
    if (fenInput) setFen(fenInput);
  };

  // ✔ FIXED BACK BUTTON (never duplicates /temp_chess)
  const handleBack = () => {
    navigate("..", { replace: true });   // Moves one level up correctly
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        padding: 20,
        position: "relative"
      }}
    >

      {/* 🔵 BACK BUTTON */}
      <button
        onClick={handleBack}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        Back
      </button>

      <ChessBoard initialFen={fen} />
    </div>
  );
}

export default ChessGame;
