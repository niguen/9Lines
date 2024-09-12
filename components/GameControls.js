import { Text, View, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Button from './Button.js'; 


function GameControls ({solve, hint, clearBox, undo, undoSteps})  {
  
    return (

        <View style ={styles.buttonColumn} >
            
            <View style={styles.buttonRow}>
                <Button style={styles.solutionButton} onPress={() => hint()}>Hint</Button>
                <Button style={styles.solutionButton} onPress={() => clearBox()}>Clear Box</Button>
            </View>
            <View style={styles.buttonRow}>
                <Button style={styles.solutionButton} onPress={() => solve()}>Solve Board</Button>
                <Button style={styles.solutionButton} onPress={() => undo()}>Undo ({undoSteps})</Button>
            </View>
        </View>
    );
  };
  

export default GameControls;

const styles = StyleSheet.create({
    buttonColumn: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        marginBottom: 10, // Abstand zwischen den Reihen
    },
    solutionButton: {

        width: '40%', // Breite der Buttons anpassen
        padding: 10,
        margin: 10, // Abstand zwischen den Buttons
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#bbbbbb'
    },
});
  