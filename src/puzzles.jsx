import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

function Puzzles() {
  const navigate = useNavigate();
  const [checkmates, setCheckmates] = useState([]);
  const [enprice, setEnprice] = useState([]);
  const [discoveryDiscoveredCheck, setDiscoveryDiscoveredCheck] = useState([]);
  const [doubleCheck, setDoubleCheck] = useState([]);
  const [forks, setForks] = useState([]);
  const [moreAttakersThanDefenders, setMoreAttakersThanDefenders] = useState([]);
  const [pins, setPins] = useState([]);
  const [skewers, setSkewers] = useState([]);
  const [takeMoreImpPeice, setTakeMoreImpPeice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("checkmate");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: cmData } = await supabase
      .from("checkmate")
      .select("*")
      .order("id", { ascending: true });
    setCheckmates(cmData || []);

    const { data: enData } = await supabase
      .from("enprice")
      .select("*")
      .order("id", { ascending: true });
    setEnprice(enData || []);

    const { data: ddcData } = await supabase
      .from("discovery_discovered_check")
      .select("*")
      .order("id", { ascending: true });
    setDiscoveryDiscoveredCheck(ddcData || []);

    const { data: dcData } = await supabase
      .from("double_check")
      .select("*")
      .order("id", { ascending: true });
    setDoubleCheck(dcData || []);

    const { data: fData } = await supabase
      .from("forks")
      .select("*")
      .order("id", { ascending: true });
    setForks(fData || []);

    const { data: madData } = await supabase
      .from("more_attakers_than_defenders")
      .select("*")
      .order("id", { ascending: true });
    setMoreAttakersThanDefenders(madData || []);

    const { data: pData } = await supabase
      .from("pins")
      .select("*")
      .order("id", { ascending: true });
    setPins(pData || []);

    const { data: sData } = await supabase
      .from("skewers")
      .select("*")
      .order("id", { ascending: true });
    setSkewers(sData || []);

    const { data: tmipData } = await supabase
      .from("take_more_imp_peice")
      .select("*")
      .order("id", { ascending: true });
    setTakeMoreImpPeice(tmipData || []);

    setLoading(false);
  };

  if (loading) return <p>Loading Puzzles...</p>;

  const getCurrentList = () => {
    switch (selected) {
      case "checkmate": return checkmates;
      case "enprice": return enprice;
      case "discovery_discovered_check": return discoveryDiscoveredCheck;
      case "double_check": return doubleCheck;
      case "forks": return forks;
      case "more_attakers_than_defenders": return moreAttakersThanDefenders;
      case "pins": return pins;
      case "skewers": return skewers;
      case "take_more_imp_peice": return takeMoreImpPeice;
      default: return checkmates;
    }
  };

  const currentList = getCurrentList();

  return (
    <div>
      <h1>Chess Puzzles</h1>

      {/* Dropdown */}
      <label><b>Select Puzzle Type: </b></label>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="checkmate">Checkmate Puzzles</option>
        <option value="enprice">Enprice Puzzles</option>
        <option value="discovery_discovered_check">Discovery/Discovered Check Puzzles</option>
        <option value="double_check">Double Check Puzzles</option>
        <option value="forks">Forks Puzzles</option>
        <option value="more_attakers_than_defenders">More Attackers Than Defenders Puzzles</option>
        <option value="pins">Pins Puzzles</option>
        <option value="skewers">Skewers Puzzles</option>
        <option value="take_more_imp_peice">Take More Important Piece Puzzles</option>
      </select>

      <h3 style={{ marginTop: "15px" }}>
        Total Puzzles: {currentList.length}
      </h3>

      {/* Display all puzzles */}
      <div style={{ marginTop: "15px" }}>
        {currentList.map((puzzle, i) => (
          <div
            key={puzzle.id}
            style={{
              border: "1px solid #aaa",
              padding: "12px",
              marginBottom: "12px",
              background: "#f9f9f9",
              borderRadius: "6px",
              width: "350px"
            }}
          >
            <p><b>ID:</b> {puzzle.id}</p>
            <p><b>FEN:</b> {puzzle.fen}</p>
            <p><b>Difficulty:</b> {puzzle.difficulty_level}</p>
            <p><b>Solution:</b> {puzzle.solution_moves}</p>

            <button
              onClick={() => navigate(`/${selected}/${puzzle.id}`)}
              style={{
                padding: "6px 12px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Puzzles;
