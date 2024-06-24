import React, { useState } from "react";
import { Text, View, Pressable, Modal } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Game } from "@/components/Game";
import MaskedView from '@react-native-masked-view/masked-view';

const App = () => {
  const [currentMove, setCurrentMove] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [endMessage, setEndMessage] = useState('');
  const [history, setHistory] = useState([Array(9).fill(null)]);

  function startAgain() {
    setIsEnd(false)
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  return (
    <LinearGradient colors={['#006ffc', '#6ed2ff']} className="flex-1 pt-10"> 
      <Modal visible={isEnd} transparent={true} animationType={"slide"}>
        <View className="flex-1 justify-center items-center">
          <LinearGradient colors={['#f73c96', '#f097c2']} className="w-3/4 h-2/6 bg-[#fd7cba] p-4 justify-between rounded-md border border-white">
            <View>
              <Text className="text-center text-3xl font-black text-[#000000]">Игра окончена</Text>
              <Text className="text-white text-lg pt-5">{endMessage}</Text>
            </View>
            <Pressable
              className="bg-[#f1d445] p-4"
              onPress={startAgain}>
              <Text className="text-center font-bold">Начать заново</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </Modal>
      <MaskedView
        style={{ height: 40 }}
        maskElement={<Text className="text-center text-3xl font-extrabold">Крестики Нолки</Text>}
      >
        <LinearGradient
          colors={['#f73c96', '#fd7cba']}
          style={{ flex: 1 }}
        />
      </MaskedView>
      <Game history={history} setHistory={setHistory} setEndMessage={setEndMessage} setIsEnd={setIsEnd} currentMove={currentMove} setCurrentMove={setCurrentMove} />
    </LinearGradient>
  )
};

export default App;



