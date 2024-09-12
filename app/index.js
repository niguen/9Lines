import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import Button from "../components/Button";
import { useEffect, useState } from 'react';
import { useNavigation, Link, Stack, Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import defaultConfig from '../dafaultConfig.json';





function Index() {


  // Verwenden der importierten JSON-Daten
  //const gameConfig = JSON.parse(config);

  const navigation = useNavigation();

  const [document, setDocument] = useState('--');
  const [fileContent, setFileContent] = useState(null);

  function configIsValid(gameConfig) {

    const base64urlRegex = /^[A-Za-z0-9\-_]+$/;

    if (!base64urlRegex.test(gameConfig)) {
      console.error("Config string contains invalid characters.");
      return false;
    }
    return true;
  }

  function checkGames(jsonContent) {
    const easyGames = jsonContent?.easy || [];
    easyGames.forEach((gameConfig, index) => {
      console.log(gameConfig)
      if (!configIsValid(gameConfig)) {
        throw new Error(`Invalid game configuration at index ${index}`);
      }
      easyGames[index] = {'config': gameConfig, 'alreadyPlayed': false};
    });

    const mediumGames = jsonContent?.medium || [];
    mediumGames.forEach((gameConfig, index) => {
      console.log(gameConfig)
      if (!configIsValid(gameConfig)) {
        throw new Error(`Invalid game configuration at index ${index}`);
      }
      mediumGames[index] = {'config': gameConfig, 'alreadyPlayed': false};
    });

    const hardGames = jsonContent?.hard || [];
    hardGames.forEach((gameConfig, index) => {

      console.log(gameConfig)
      if (!configIsValid(gameConfig)) {
        throw new Error(`Invalid game configuration at index ${index}`);
      }
      hardGames[index] = {'config': gameConfig, 'alreadyPlayed': false};

    });
    return { 'easy': easyGames, 'medium': mediumGames, 'hard': hardGames }
  }


  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setDocument(result.assets[0].name); // Extrahieren Sie den Namen des Dokuments aus dem Array
        const uri = result.assets[0].uri;
        const name = result.assets[0].name;

        console.log(uri);

        // Lesen Sie den Inhalt der Datei
        const fileContent = await FileSystem.readAsStringAsync(uri);

        const jsonContent = JSON.parse(fileContent);
        setFileContent(jsonContent);
        console.log(jsonContent);

        const games = checkGames(jsonContent)

        const jsonValue = JSON.stringify(games);
        await AsyncStorage.setItem('games', jsonValue);


        navigation.navigate('loadConfigScreen');
      } else {
        console.log(result);
        setDocument("Fail");
      }

    } catch (error) {
      console.error("Error reading file:", error);
      Alert.alert("Error", error.message);
    }
  };

  const playGame = async () => {

    try {
      console.log('Playing game');
      // AsyncStorage.removeItem('games');
      const games = await AsyncStorage.getItem('games');
      if (games !== null) {
        // Spielekonfigurationen sind vorhanden, zum Spielbildschirm weiterleiten
        navigation.navigate('menuScreen');
      } else {
        // Keine Spielekonfigurationen vorhanden, Standardkonfiguration speichern
        const games = checkGames(defaultConfig)
        //await asyncSet('games', JSON.stringify(games));
        await AsyncStorage.setItem('games', JSON.stringify(games));

        console.log('Default game configuration saved to storage.');
        navigation.navigate('menuScreen');
      }
    } catch (error) {
      console.error("Error accessing AsyncStorage:", error);
      Alert.alert("Error", error.message);
    }
  }



  return (

    <View style={styles.menuComponent}>
      <Text style={styles.textStyle}>Welcome to 9 Lines</Text>

      <Button style={styles.solutionButton} onPress={playGame}>  Play</Button>

      <Button style={styles.solutionButton} onPress={pickDocument} > Load game config</Button>

      <Text style={styles.documentInfo}>
        Selected Configuration: {document}
      </Text>

    </View>

  )
}

export default Index;


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
})