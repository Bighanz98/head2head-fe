"use client";

import { useState } from "react";

type Team = {
  id: string;
  name: string;
  color: string; // t.ex. hex eller tailwind-klass
  backgroundUrl?: string;
};

type Player = {
  id: string;
  name: string;
  imageUrl: string;
  teamId: string;
};

// Exempeldata, ersätt med data från backend/seed senare
const teams: Team[] = [
  { id: "arsenal", name: "Arsenal", color: "bg-red-600" },
  { id: "chelsea", name: "Chelsea", color: "bg-blue-600" },
  { id: "liverpool", name: "Liverpool", color: "bg-red-800" },
];

const players: Player[] = [
  { id: "saka", name: "Saka", imageUrl: "/players/saka.png", teamId: "arsenal" },
  { id: "partey", name: "Partey", imageUrl: "/players/partey.png", teamId: "arsenal" },
  { id: "kepa", name: "Kepa", imageUrl: "/players/kepa.png", teamId: "chelsea" },
  { id: "mane", name: "Mane", imageUrl: "/players/mane.png", teamId: "liverpool" },
];

export default function ComparePage() {
  const [selectedTeam1, setSelectedTeam1] = useState<Team | null>(null);
  const [selectedPlayer1, setSelectedPlayer1] = useState<Player | null>(null);

  const [selectedTeam2, setSelectedTeam2] = useState<Team | null>(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState<Player | null>(null);

  // Tillstånd för vad som väljs just nu (team eller player)
  const [choosingFor, setChoosingFor] = useState<"team1" | "player1" | "team2" | "player2" | null>(null);

  // Filtrera spelare baserat på valt lag
  const playersForTeam1 = selectedTeam1 ? players.filter(p => p.teamId === selectedTeam1.id) : [];
  const playersForTeam2 = selectedTeam2 ? players.filter(p => p.teamId === selectedTeam2.id) : [];

  return (
    <section className="flex justify-center gap-12 mt-16">

      {/* Fyrkant 1 */}
      <div
        className={`relative w-48 h-48 rounded-xl border-4 cursor-pointer flex items-center justify-center select-none
          ${selectedTeam1 ? selectedTeam1.color : "border-lime-400 border-solid"}
        `}
        onClick={() => {
          if (!selectedTeam1) setChoosingFor("team1");
          else if (!selectedPlayer1) setChoosingFor("player1");
          else setChoosingFor(null);
        }}
      >
        {!selectedTeam1 && <span className="text-lime-400 font-bold text-lg">Välj lag 1</span>}
        {selectedTeam1 && !selectedPlayer1 && <span className="text-white font-bold text-lg">{selectedTeam1.name}</span>}
        {selectedPlayer1 && (
          <img
            src={selectedPlayer1.imageUrl}
            alt={selectedPlayer1.name}
            className="w-24 h-24 rounded-md object-cover"
          />
        )}
      </div>

      {/* Fyrkant 2 */}
      <div
        className={`relative w-48 h-48 rounded-xl border-4 cursor-pointer flex items-center justify-center select-none
          ${selectedTeam2 ? selectedTeam2.color : "border-lime-400 border-solid"}
        `}
        onClick={() => {
          if (!selectedTeam2) setChoosingFor("team2");
          else if (!selectedPlayer2) setChoosingFor("player2");
          else setChoosingFor(null);
        }}
      >
        {!selectedTeam2 && <span className="text-lime-400 font-bold text-lg">Välj lag 2</span>}
        {selectedTeam2 && !selectedPlayer2 && <span className="text-white font-bold text-lg">{selectedTeam2.name}</span>}
        {selectedPlayer2 && (
          <img
            src={selectedPlayer2.imageUrl}
            alt={selectedPlayer2.name}
            className="w-24 h-24 rounded-md object-cover"
          />
        )}
      </div>

      {/* Välj lag / spelare lista */}
      {choosingFor === "team1" && (
        <div className="absolute top-64 left-1/4 bg-neutral-900 p-4 rounded shadow-lg">
          <h3 className="text-lime-400 mb-2 font-semibold">Välj lag 1</h3>
          {teams.map(team => (
            <button
              key={team.id}
              onClick={() => {
                setSelectedTeam1(team);
                setSelectedPlayer1(null);
                setChoosingFor("player1");
              }}
              className="block w-full text-left py-1 px-2 hover:bg-lime-600 rounded text-white"
            >
              {team.name}
            </button>
          ))}
          <button onClick={() => setChoosingFor(null)} className="mt-2 text-red-400 hover:text-red-600">Avbryt</button>
        </div>
      )}

      {choosingFor === "player1" && selectedTeam1 && (
        <div className="absolute top-64 left-1/4 bg-neutral-900 p-4 rounded shadow-lg max-h-60 overflow-auto">
          <h3 className="text-lime-400 mb-2 font-semibold">Välj spelare i {selectedTeam1.name}</h3>
          {playersForTeam1.map(player => (
            <button
              key={player.id}
              onClick={() => {
                setSelectedPlayer1(player);
                setChoosingFor(null);
              }}
              className="flex items-center gap-2 py-1 px-2 hover:bg-lime-600 rounded w-full text-white"
            >
              <img src={player.imageUrl} alt={player.name} className="w-6 h-6 rounded" />
              {player.name}
            </button>
          ))}
          <button onClick={() => setChoosingFor(null)} className="mt-2 text-red-400 hover:text-red-600">Avbryt</button>
        </div>
      )}

      {/* Samma för team 2 */}
      {choosingFor === "team2" && (
        <div className="absolute top-64 right-1/4 bg-neutral-900 p-4 rounded shadow-lg">
          <h3 className="text-lime-400 mb-2 font-semibold">Välj lag 2</h3>
          {teams.map(team => (
            <button
              key={team.id}
              onClick={() => {
                setSelectedTeam2(team);
                setSelectedPlayer2(null);
                setChoosingFor("player2");
              }}
              className="block w-full text-left py-1 px-2 hover:bg-lime-600 rounded text-white"
            >
              {team.name}
            </button>
          ))}
          <button onClick={() => setChoosingFor(null)} className="mt-2 text-red-400 hover:text-red-600">Avbryt</button>
        </div>
      )}

      {choosingFor === "player2" && selectedTeam2 && (
        <div className="absolute top-64 right-1/4 bg-neutral-900 p-4 rounded shadow-lg max-h-60 overflow-auto">
          <h3 className="text-lime-400 mb-2 font-semibold">Välj spelare i {selectedTeam2.name}</h3>
          {playersForTeam2.map(player => (
            <button
              key={player.id}
              onClick={() => {
                setSelectedPlayer2(player);
                setChoosingFor(null);
              }}
              className="flex items-center gap-2 py-1 px-2 hover:bg-lime-600 rounded w-full text-white"
            >
              <img src={player.imageUrl} alt={player.name} className="w-6 h-6 rounded" />
              {player.name}
            </button>
          ))}
          <button onClick={() => setChoosingFor(null)} className="mt-2 text-red-400 hover:text-red-600">Avbryt</button>
        </div>
      )}
    </section>
  );
}
