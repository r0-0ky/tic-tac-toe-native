import { Pressable, Text } from "react-native";

interface SquareProps {
  value: string | null
  onSquareClick: () => void
  border: string
}

export const Square:React.FC<SquareProps> = ({ value, onSquareClick, border }) => {
  return (
    <Pressable onPress={onSquareClick} className={`flex ${border} border-[#000000] bg-[#f1d445] flex-1 justify-center items-center`}>
      <Text className={`text-center text-7xl ${value === 'X' ? 'text-[#45acf1]' : value === 'O' ? 'text-[#f73c96]' : '' }`}>{value}</Text>  
    </Pressable>
  );
};