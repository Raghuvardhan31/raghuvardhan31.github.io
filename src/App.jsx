import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ChessGame from './ChessGame.jsx'
import Puzzles from './Puzzles.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Puzzles />} />
      <Route path="/checkmate/:id" element={<ChessGame />} />
      <Route path="/enprice/:id" element={<ChessGame />} />
      <Route path="/discovery_discovered_check/:id" element={<ChessGame />} />
      <Route path="/double_check/:id" element={<ChessGame />} />
      <Route path="/forks/:id" element={<ChessGame />} />
      <Route path="/more_attakers_than_defenders/:id" element={<ChessGame />} />
      <Route path="/pins/:id" element={<ChessGame />} />
      <Route path="/skewers/:id" element={<ChessGame />} />
      <Route path="/take_more_imp_peice/:id" element={<ChessGame />} />
    </Routes>
  )
}

export default App
