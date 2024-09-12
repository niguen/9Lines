import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useEffect, useState } from 'react';
import { useNavigation, Link } from 'expo-router';
import generateGame from '../components/gameUtil.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


function MenuScreen() {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  function countTrueItems(games) {
    return games.filter(game => game.alreadyPlayed).length;

  }

  function resetPlayedGames() {
    const easy = games.easy.map(({config, alreadyPlayed}) =>  ({'config': config, 'alreadyPlayed': false}));
    const medium = games.medium.map(({config, alreadyPlayed}) =>  ({'config': config, 'alreadyPlayed': false}));
    const hard = games.hard.map(({config, alreadyPlayed}) =>  ({'config': config, 'alreadyPlayed': false}));
    setGames({ 'easy': easy, 'medium': medium, 'hard': hard })
    AsyncStorage.setItem('games', JSON.stringify(games))

  }

  function selectGame(difficulty) {
    const gameConfigurations = games[difficulty] || [];
    let nextGame = gameConfigurations.find(({ alreadyPlayed }) => alreadyPlayed === false);

    if (nextGame === undefined) {
      Alert.alert("No unplayed Games available", "Please reset game counter.");
      return;
    }

    nextGame.alreadyPlayed = true
    const updatedGames = { ...games, [difficulty]: gameConfigurations };

    setGames(updatedGames)
    AsyncStorage.multiSet([['games', JSON.stringify(updatedGames)], ['currentGame', JSON.stringify(nextGame.config)]])
      .catch((error) => {
        console.error('Error saving game configurations:', error);
      });
    

    navigation.navigate('gameScreen', { difficulty });
  }


  function loadSavedGame() {
    const difficulty = 'saved Game';
    navigation.navigate('gameScreen', { difficulty: difficulty });
  }

  useEffect(() => {
    const loadData = async () => {
      try {

        const storedGames = await AsyncStorage.getItem('games');

        setGames(JSON.parse(storedGames));
        setLoading(false);

      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (

    <View style={styles.menuComponent}>
      <Text style={styles.textStyle}>Please choose Game Mode to start:</Text>

      <Button style={styles.solutionButton} onPress={() => selectGame('easy')}> Easy</Button>
      <Text style={styles.textStyle}>{countTrueItems(games.easy)} / {games.easy.length} Games played</Text>

      <Button style={styles.solutionButton} onPress={() => selectGame('medium')}> Medium</Button>
      <Text style={styles.textStyle}>{countTrueItems(games.medium)} / {games.medium.length} Games played</Text>

      <Button style={styles.solutionButton} onPress={() => selectGame('hard')}> Hard</Button>
      <Text style={styles.textStyle}>{countTrueItems(games.hard)} / {games.hard.length} Games played</Text>

      <Button style={styles.resetButton} onPress={resetPlayedGames}> Reset played Games</Button>

      {currentGame && (
        <Button style={styles.solutionButton} onPress={loadSavedGame}> Continue Last Game</Button>
      )}
    </View>
  )
}

export default MenuScreen;


const styles = StyleSheet.create({
  menuComponent: {
    flex: 1,
    flexDirection: 'column', // column is the default
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#cccccc',
    padding: 16
  },
  textStyle: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  solutionButton: {
    padding: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#bbbbbb',
    width: 200,
  },
  resetButton: {
    padding: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: 'fff',
    backgroundColor: 'fff',
    width: 200,
  },
})