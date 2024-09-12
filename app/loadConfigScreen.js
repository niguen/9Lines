import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useEffect, useState} from 'react';
import { useNavigation, Link, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoadConfigScreen() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

      useEffect(() => {
        const loadData = async () => {
          const storedGames = await AsyncStorage.getItem('games');
          setGames(JSON.parse(storedGames) );
          setLoading(false);
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
        <Text style={styles.textStyle}>Game config loaded:</Text>

        <Text style={styles.textStyle}>{games.easy.length} easy games added</Text>
        <Text style={styles.textStyle}>{games.medium.length} medium games added</Text>
        <Text style={styles.textStyle}>{games.hard.length} hard games added</Text>


        <Link
            href={{
                pathname: '/menuScreen'
            }} asChild>
            <Button style={styles.solutionButton}> Start Playing</Button>
        </Link>

    </View>
      );
    };

export default LoadConfigScreen;


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