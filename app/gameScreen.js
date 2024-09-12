import { View, StyleSheet, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import Board from '../components/Board.js';
import GameInput from '../components/GameInput.js';
import GameControls from '../components/GameControls.js';
import generateGame from '../components/gameUtil.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useLocalSearchParams } from 'expo-router';



function GameScreen() {
  const { difficulty } = useLocalSearchParams();
  const navigation = useNavigation();

  const [game, setGame] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [mode, setMode] = useState('Note');
  const [history, setHistory] = useState([]); // Stack für die Historie
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // load game from storage using the function asyncGet
  useEffect(() => {
    const loadData = async () => {
      const storedGame = await AsyncStorage.getItem('currentGame');
      const generatedGame = generateGame(JSON.parse(storedGame));
      setGame(generatedGame);
      setLoading(false);
    };
    loadData();
  }, []);

  // Funktion zum Speichern des aktuellen Zustands
  function saveState(newGame) {
    setHistory((prevHistory) => {
      const updatedHistory = [newGame, ...prevHistory];
      return updatedHistory.slice(0, 5); // Maximal 5 Schritte speichern
    });
  }

  // Hint function to add hint to the selected box
  function hint() {
    if (selectedBox == null) return;
    const newGame = game.clone();
    newGame.getBox(selectedBox).hint = true;
    newGame.unsetSelected();
    setHistory([]); // Speichern des aktuellen Zustands vor der Änderung
    setGame(newGame);
  }

  function solution() {
    const newGame = game.clone();
    newGame.solveBoard(setAlertMessage);
    newGame.unsetSelected();
    setHistory([]); // Speichern des aktuellen Zustands vor der Änderung
    setGame(newGame);

    Alert.alert("Game completed", "Please return to the menu and start a new game.");
  }

  function undo() {
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory; // Keine Historie vorhanden
      const [lastState, ...restHistory] = prevHistory;
      
      // unset selected box
      lastState.unsetSelected();
      setSelectedBox(null);
      
      setGame(lastState); // Laden des letzten Zustands
      return restHistory; // Aktualisieren der Historie
    });
  }

  function clearBox() {
    const newGame = game.clone();
    newGame.getBox(selectedBox).user = undefined;
    newGame.unsetSelected();
    saveState(game); // Speichern des aktuellen Zustands vor der Änderung
    setGame(newGame);
  }

  function updateSelectedBox(id) {
    game.unsetSelected();
    setSelectedBox(id);
    game.getBox(id).isSelected = true;
  }

  function updateMode(mode) {
    setMode(mode);
    console.log('Mode is now ' + mode);
  }

  function inputNumber(number) {
    if (selectedBox == null) return;

    const newGame = game.clone();
    if (mode === 'Number') {
      newGame.getBox(selectedBox).user = number;
      if (game.gameIsComplete()){
          solution()
      }
    } else {
      newGame.getBox(selectedBox).setNote(number);
    }
    saveState(game); // Speichern des aktuellen Zustands vor der Änderung
    setGame(newGame);
  }



  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style = {styles.gameContainer}>
        <GameControls solve={solution} hint={hint} clearBox={clearBox} undoSteps = {history.length} undo={undo} />
        <Board gameDataStructure={game} setSelectedBox={updateSelectedBox} />
        <GameInput mode={mode} setMode={updateMode} inputNumber={inputNumber} />
      </View>
    </View>

  );
};
export default GameScreen;

const styles = StyleSheet.create({

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gameContainer: {
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  alertOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  }
});

