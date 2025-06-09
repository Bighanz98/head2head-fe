"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTeams } from "@/hooks/useTeams";
import { usePlayersByTeamId } from "@/hooks/usePlayers";
import {
  getComparePlayers,
  ComparePlayersResponse,
  ComparePlayerStat,
} from "@/lib/api/playerService";
import { useQuery } from "@tanstack/react-query";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function ComparePage() {
  const [team1Id, setTeam1Id] = useState<number | null>(null);
  const [team2Id, setTeam2Id] = useState<number | null>(null);
  const [player1Id, setPlayer1Id] = useState<number | null>(null);
  const [player2Id, setPlayer2Id] = useState<number | null>(null);
  const [compareTriggered, setCompareTriggered] = useState(false);
  const [winner, setWinner] = useState<"player1" | "player2" | null>(null);

  const { width, height } = useWindowSize();

  const { data: teams } = useTeams();
  const { data: playersTeam1 } = usePlayersByTeamId(team1Id ?? 0);
  const { data: playersTeam2 } = usePlayersByTeamId(team2Id ?? 0);

  const { data: compareData, refetch } = useQuery<ComparePlayersResponse>({
    queryKey: ["comparePlayers", player1Id, player2Id],
    queryFn: () => getComparePlayers(player1Id!, player2Id!),
    enabled: false,
  });

  const handleCompareClick = async () => {
    if (player1Id && player2Id) {
      setCompareTriggered(true);
      const { data } = await refetch();
      if (data) {
        let player1Score = 0;
        let player2Score = 0;

        
        const excludedStats = ["Yellow Cards", "Red Cards", "Passes"];

        const relevantStats = data.stats.filter(
          (stat) => !excludedStats.includes(stat.statName)
        );

        relevantStats.forEach((stat) => {
          if (stat.player1Value > stat.player2Value) player1Score++;
          else if (stat.player2Value > stat.player1Value) player2Score++;
        });

        if (player1Score > player2Score) setWinner("player1");
        else if (player2Score > player1Score) setWinner("player2");
        else setWinner(null);
      }
    }
  };

  const getTeamLogo = (id: number | null) => {
    return teams?.find((t) => t.teamId === id)?.teamLogoUrl || "";
  };

  const getColorClasses = (
    val1: number,
    val2: number,
    side: "player1" | "player2"
  ) => {
    if (val1 === val2) return "text-lime-400 font-semibold";
    return side === "player1"
      ? val1 > val2
        ? "text-lime-400 font-semibold"
        : "text-neutral-500"
      : val2 > val1
      ? "text-lime-400 font-semibold"
      : "text-neutral-500";
  };

  const getProgressBarClass = (
    val1: number,
    val2: number,
    side: "player1" | "player2"
  ) => {
    if (val1 === val2) return "bg-yellow-700";
    return side === "player1"
      ? val1 > val2
        ? "bg-green-700"
        : "bg-red-700"
      : val2 > val1
      ? "bg-green-700"
      : "bg-red-700";
  };

  const player1Ref = useRef<HTMLDivElement>(null);
  const player2Ref = useRef<HTMLDivElement>(null);
  const [confettiDimensions, setConfettiDimensions] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!compareTriggered || !winner) return;
    const ref = winner === "player1" ? player1Ref : player2Ref;
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setConfettiDimensions({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [winner, compareTriggered]);

  const getPlayerById = (
    players: any[] | undefined,
    id: number | null
  ) => players?.find((p) => p.playerId === id);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 text-lime-400 relative">
      {confettiDimensions && (
        <Confetti
          width={confettiDimensions.width}
          height={confettiDimensions.height}
          numberOfPieces={300}
          recycle={false}
          run={true}
          style={{
            position: "fixed",
            top: confettiDimensions.y,
            left: confettiDimensions.x,
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      )}

      <h1 className="text-3xl font-bold mb-6">Compare Players</h1>

      {/* Select teams and players */}
      <div className="flex gap-6">
        {/* Team 1 */}
        <div className="border border-lime-400 rounded p-4 flex-1">
          <label className="block mb-1 font-semibold">Team 1</label>
          <select
            className="w-full p-2 rounded bg-neutral-900 text-lime-400"
            value={team1Id ?? ""}
            onChange={(e) => {
              setTeam1Id(Number(e.target.value) || null);
              setPlayer1Id(null);
              setCompareTriggered(false);
              setWinner(null);
            }}
          >
            <option value=""> Select Team </option>
            {teams?.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamName}
              </option>
            ))}
          </select>

          <label className="block mt-4 mb-1 font-semibold">Player 1</label>
          <select
            className="w-full p-2 rounded bg-neutral-900 text-lime-400"
            value={player1Id ?? ""}
            onChange={(e) => {
              setPlayer1Id(Number(e.target.value) || null);
              setCompareTriggered(false);
              setWinner(null);
            }}
            disabled={!team1Id}
          >
            <option value=""> Select Player </option>
            {playersTeam1?.map((p) => (
              <option key={p.playerId} value={p.playerId}>
                {p.playerName}
              </option>
            ))}
          </select>
        </div>

        {/* Team 2 */}
        <div className="border border-lime-400 rounded p-4 flex-1">
          <label className="block mb-1 font-semibold">Team 2</label>
          <select
            className="w-full p-2 rounded bg-neutral-900 text-lime-400"
            value={team2Id ?? ""}
            onChange={(e) => {
              setTeam2Id(Number(e.target.value) || null);
              setPlayer2Id(null);
              setCompareTriggered(false);
              setWinner(null);
            }}
          >
            <option value=""> Select Team </option>
            {teams?.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamName}
              </option>
            ))}
          </select>

          <label className="block mt-4 mb-1 font-semibold">Player 2</label>
          <select
            className="w-full p-2 rounded bg-neutral-900 text-lime-400"
            value={player2Id ?? ""}
            onChange={(e) => {
              setPlayer2Id(Number(e.target.value) || null);
              setCompareTriggered(false);
              setWinner(null);
            }}
            disabled={!team2Id}
          >
            <option value=""> Select Player </option>
            {playersTeam2?.map((p) => (
              <option key={p.playerId} value={p.playerId}>
                {p.playerName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Player cards with positions */}
      <div className="flex justify-between items-center gap-4 mt-6">
        {player1Id && (
          <div className="flex flex-col items-center" ref={player1Ref}>
            <span className="mb-1 font-semibold">
              {getPlayerById(playersTeam1, player1Id)?.playerPosition}
            </span>
            <div
              className="w-40 h-56 rounded-lg bg-cover bg-center relative border border-lime-400"
              style={{ backgroundImage: `url(${getTeamLogo(team1Id)})` }}
            >
              <img
                src={
                  getPlayerById(playersTeam1, player1Id)?.playerPicUrl
                }
                alt="Player 1"
                className="w-full h-full object-contain relative z-10"
              />
              <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
            </div>
          </div>
        )}
        {player2Id && (
          <div className="flex flex-col items-center" ref={player2Ref}>
            <span className="mb-1 font-semibold">
              {getPlayerById(playersTeam2, player2Id)?.playerPosition}
            </span>
            <div
              className="w-40 h-56 rounded-lg bg-cover bg-center relative border border-lime-400"
              style={{ backgroundImage: `url(${getTeamLogo(team2Id)})` }}
            >
              <img
                src={
                  getPlayerById(playersTeam2, player2Id)?.playerPicUrl
                }
                alt="Player 2"
                className="w-full h-full object-contain relative z-10"
              />
              <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
            </div>
          </div>
        )}
      </div>

      {/* Compare button */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          className="px-6 py-3 bg-lime-400 text-black rounded hover:bg-lime-300 transition disabled:opacity-50"
          disabled={!player1Id || !player2Id}
          onClick={handleCompareClick}
        >
          Compare
        </button>
      </div>

      {/* Comparison results */}
      {compareTriggered && compareData && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold">
            Comparison: {compareData.player1Name} vs {compareData.player2Name}
          </h2>

          {compareData.stats
            .filter(
              (stat) =>
                !["Yellow Cards", "Red Cards", "Passes"].includes(stat.statName)
            )
            .map((stat: ComparePlayerStat) => (
              <div key={stat.statName}>
                <div className="flex justify-between mb-1 items-center">
                  <span
                    className={getColorClasses(stat.player1Value, stat.player2Value, "player1")}
                  >
                    {stat.player1Value}
                  </span>
                  <span className="font-semibold">{stat.statName}</span>
                  <span
                    className={getColorClasses(stat.player1Value, stat.player2Value, "player2")}
                  >
                    {stat.player2Value}
                  </span>
                </div>
                <div className="flex h-3 rounded overflow-hidden bg-neutral-900">
                  <div
                    style={{
                      width: `${(stat.player1Value /
                        (stat.player1Value + stat.player2Value)) *
                        100}%`,
                    }}
                    className={getProgressBarClass(stat.player1Value, stat.player2Value, "player1")}
                  ></div>
                  <div
                    style={{
                      width: `${(stat.player2Value /
                        (stat.player1Value + stat.player2Value)) *
                        100}%`,
                    }}
                    className={getProgressBarClass(stat.player1Value, stat.player2Value, "player2")}
                  ></div>
                </div>
              </div>
            ))}

          {winner && (
            <div className="mt-6 text-2xl font-bold text-lime-400 text-center">
              Winner:{" "}
              {winner === "player1"
                ? compareData.player1Name
                : compareData.player2Name}
            </div>
          )}

          {!winner && (
            <div className="mt-6 text-2xl font-bold text-yellow-400 text-center">
              No Winner: It's a draw!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
