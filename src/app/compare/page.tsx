"use client";

import React, { useState } from "react";
import { useTeams } from "@/hooks/useTeams";
import { usePlayersByTeamId } from "@/hooks/usePlayers";
import { getComparePlayers, ComparePlayersResponse, ComparePlayerStat } from "@/lib/api/playerService";
import { useQuery } from "@tanstack/react-query";

export default function ComparePage() {
  const [team1Id, setTeam1Id] = useState<number | null>(null);
  const [team2Id, setTeam2Id] = useState<number | null>(null);
  const [player1Id, setPlayer1Id] = useState<number | null>(null);
  const [player2Id, setPlayer2Id] = useState<number | null>(null);
  const [compareTriggered, setCompareTriggered] = useState(false);

  const { data: teams } = useTeams();

  const { data: playersTeam1 } = usePlayersByTeamId(team1Id ?? 0);
  const { data: playersTeam2 } = usePlayersByTeamId(team2Id ?? 0);

  const { data: compareData, refetch, isFetching } = useQuery<ComparePlayersResponse>({
    queryKey: ["comparePlayers", player1Id, player2Id],
    queryFn: () => getComparePlayers(player1Id!, player2Id!),
    enabled: false,
  });

  const handleCompareClick = () => {
    if (player1Id && player2Id) {
      setCompareTriggered(true);
      refetch();
    }
  };

  const handleReset = () => {
    setTeam1Id(null);
    setTeam2Id(null);
    setPlayer1Id(null);
    setPlayer2Id(null);
    setCompareTriggered(false);
  };

  const getTeamLogo = (id: number | null) => {
    return teams?.find((t) => t.teamId === id)?.teamLogoUrl || "";
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 text-lime-400">
      <h1 className="text-3xl font-bold mb-6">Compare Players</h1>

      {/* Wrapper som gör att rutorna ligger bredvid varandra */}
      <div className="flex gap-6">
        {/* Select Team and Player 1 */}
        <div className="border border-lime-400 rounded p-4 flex-1">
          <label className="block mb-1 font-semibold">Select Team 1</label>
          <select
            className="w-full p-2 rounded bg-neutral-900 text-lime-400"
            value={team1Id ?? ""}
            onChange={(e) => {
              setTeam1Id(Number(e.target.value) || null);
              setPlayer1Id(null);
              setCompareTriggered(false);
            }}
          >
            <option value="">-- Select Team --</option>
            {teams?.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamName}
              </option>
            ))}
          </select>

          <label className="block mt-4 mb-1 font-semibold">Select Player 1</label>
          <select
            className="w-full p-2 rounded bg-neutral-900 text-lime-400"
            value={player1Id ?? ""}
            onChange={(e) => {
              setPlayer1Id(Number(e.target.value) || null);
              setCompareTriggered(false);
            }}
            disabled={!team1Id}
          >
            <option value="">-- Select Player --</option>
            {playersTeam1?.map((p) => (
              <option key={p.playerId} value={p.playerId}>
                {p.playerName}
              </option>
            ))}
          </select>
        </div>

        {/* Select Team and Player 2 */}
        <div className="border border-lime-400 rounded p-4 flex-1">
          <label className="block mb-1 font-semibold">Select Team 2</label>
          <select
            className="w-full p-2 rounded bg-neutral-900 text-lime-400"
            value={team2Id ?? ""}
            onChange={(e) => {
              setTeam2Id(Number(e.target.value) || null);
              setPlayer2Id(null);
              setCompareTriggered(false);
            }}
          >
            <option value="">-- Select Team --</option>
            {teams?.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamName}
              </option>
            ))}
          </select>

          <label className="block mt-4 mb-1 font-semibold">Select Player 2</label>
          <select
            className="w-full p-2 rounded bg-neutral-900 text-lime-400"
            value={player2Id ?? ""}
            onChange={(e) => {
              setPlayer2Id(Number(e.target.value) || null);
              setCompareTriggered(false);
            }}
            disabled={!team2Id}
          >
            <option value="">-- Select Player --</option>
            {playersTeam2?.map((p) => (
              <option key={p.playerId} value={p.playerId}>
                {p.playerName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Player images with team logo background */}
      <div className="flex justify-between items-center gap-4 mt-6">
        {player1Id && (
          <div
            className="w-40 h-56 rounded-lg bg-cover bg-center relative border border-lime-400"
            style={{ backgroundImage: `url(${getTeamLogo(team1Id)})` }}
          >
            <img
              src={playersTeam1?.find((p) => p.playerId === player1Id)?.playerPicUrl}
              alt="Player 1"
              className="w-full h-full object-contain relative z-10"
            />
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
          </div>
        )}

        {player2Id && (
          <div
            className="w-40 h-56 rounded-lg bg-cover bg-center relative border border-lime-400"
            style={{ backgroundImage: `url(${getTeamLogo(team2Id)})` }}
          >
            <img
              src={playersTeam2?.find((p) => p.playerId === player2Id)?.playerPicUrl}
              alt="Player 2"
              className="w-full h-full object-contain relative z-10"
            />
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
          </div>
        )}
      </div>

      {/* Compare and Reset buttons centered */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          className="px-6 py-3 bg-lime-400 text-black rounded hover:bg-lime-300 transition disabled:opacity-50"
          disabled={!player1Id || !player2Id}
          onClick={handleCompareClick}
        >
          Compare
        </button>

        <button
          className="px-6 py-3 bg-gray-700 text-lime-400 rounded hover:bg-gray-600 transition"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {/* Show comparison stats */}
      {compareTriggered && compareData && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold">
            Comparison: {compareData.player1Name} vs {compareData.player2Name}
          </h2>

          {compareData.stats.map((stat: ComparePlayerStat) => (
            <div key={stat.statName}>
              <div className="flex justify-between mb-1">
                <span>{stat.statName}</span>
                <span>
                  {stat.player1Value} - {stat.player2Value}
                </span>
              </div>
              <div className="relative h-6 bg-neutral-800 rounded overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-lime-400 transition-all duration-700"
                  style={{ width: `${stat.player1Percent}%` }}
                />
                <div
                  className="absolute right-0 top-0 h-full bg-emerald-800 transition-all duration-700"
                  style={{ width: `${stat.player2Percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {compareTriggered && isFetching && <p>Loading comparison...</p>}
    </div>
  );
}
