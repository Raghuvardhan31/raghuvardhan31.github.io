import React, { useState } from 'react'
import ChessGame from './ChessGame.jsx'
import Puzzles from './Puzzles.jsx'
function App() {
  const [selectedFen, setSelectedFen] = useState(null);

  return (
    <div>
      <Puzzles onPlay={setSelectedFen}/>
      <ChessGame initialFen={selectedFen}/>
      
    </div>
  )
}

export default App
