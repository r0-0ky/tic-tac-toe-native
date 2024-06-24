import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { Board } from "./Board";

interface GameProps {
  setIsEnd: React.Dispatch<boolean>
  history: (null | string)[][]
  setHistory: React.Dispatch<(null | string)[][]>
  currentMove: number
  setCurrentMove: React.Dispatch<number>
  setEndMessage: React.Dispatch<string>
}

export const Game: React.FC<GameProps> = ({ setIsEnd, history, setHistory, currentMove, setCurrentMove, setEndMessage }) => {
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <View className="h-2/4 w-full p-4">
      <Board setEndMessage={setEndMessage} setIsEnd={setIsEnd} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </View>
  );
};