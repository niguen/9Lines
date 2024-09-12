import { Text, View, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Button from './Button.js'; 


function GameInput ({mode, setMode, inputNumber})  {
  
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1); // Erzeugt ein Array [1, 2, 3, ..., 9]
  
    return (
      <View>
        <View style={styles.buttonContainer}>
          <Button style={mode === 'Note' ? [styles.button, styles.selectedButtonNote] : styles.button} onPress={() => setMode('Note')}>Note</Button>
          <Button style={mode === 'Number' ? [styles.button, styles.selectedButtonNumber] : styles.button} onPress={() => setMode('Number')}>Number</Button>
        </View>
        <View style={styles.buttonRow}>

          {numbers.map((number) => (
            <Button  key={number} style={mode === 'Note' ? styles.noteButton : styles.numberButton} onPress={() => inputNumber(number)}>{number}</Button>
          ))}
        </View>

      </View>
    );
  };
  

export default GameInput;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  selectedButtonNumber: {
    backgroundColor: '#aaaaaa',
  },
  selectedButtonNote: {
    backgroundColor: '#cccccc',
  },
  numberButton: {
    flexBasis: '30%', // 22% to account for margins and spacing
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#aaaaaa',
  },
  noteButton: {
    flexBasis: '30%', // 22% to account for margins and spacing
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#cccccc',
  },
});