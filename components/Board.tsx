import { View, Text, Vibration } from "react-native";
import { Square } from "./Square";
import { useEffect } from "react";

interface BoardProps {
  xIsNext: boolean
  squares: (string | null)[]
  onPlay: (nextSquares: (string | null)[]) => void
  setIsEnd: React.Dispatch<boolean>
  setEndMessage: React.Dispatch<string>
}

export const Board:React.FC<BoardProps> = ({ xIsNext, squares, onPlay, setIsEnd, setEndMessage }) => {

  function calculateWinner(squares: (string | null)[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (!winner) {
    status = 'Ходят: ' + (xIsNext ? 'Крестики' : 'Нолики');
  }

  useEffect(() => {
    if (winner) {
      setIsEnd(true);
      setEndMessage('Выйграли: ' + (!xIsNext ? 'Крестики' : 'Нолики'))
      Vibration.vibrate(100);
    }
  }, [winner])

  useEffect(() => {
    if (squares.every(item => item !== null)) {
      setIsEnd(true);
      setEndMessage('Ничья')
      Vibration.vibrate(100);
    }
  }, [squares])

  return (
    <>
      <View className="flex-1 border-4 border-[#000]">
        <View className="flex flex-row flex-1">
          <Square border='border-r-4' value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square border='border-r-4' value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square border='border-0' value={squares[2]} onSquareClick={() => handleClick(2)} />
        </View>
        <View className="flex flex-row flex-1 border-y-4 border-[#000] ">
          <Square border='border-r-4' value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square border='border-r-4' value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square border='border-0' value={squares[5]} onSquareClick={() => handleClick(5)} />
        </View>
        <View className="flex flex-row flex-1">
          <Square border='border-r-4' value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square border='border-r-4' value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square border='border-0' value={squares[8]} onSquareClick={() => handleClick(8)} />
        </View>
      </View>
      <Text className="text-white font-bold text-right text-lg">{status}</Text>
    </>
  );
}