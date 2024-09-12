import { View, StyleSheet } from 'react-native';
import Box from './Box.js';
import React from 'react';

function Board({ gameDataStructure, setSelectedBox }) {
  
  return (
    <View style={styles.board}>

      {gameDataStructure.data.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row' }}>
          {row.map((fieldDataStructure, cellIndex) => (
            <View key={cellIndex}>
              {<Box key={fieldDataStructure.id} fieldDataStructure={fieldDataStructure} onSelectFunction={setSelectedBox} />
              }

            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({

  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360, // 9 boxes * 40px per box
    height: 360, // 9 boxes * 40px per box
    alignItems: 'center',
    justifyContent: 'center',
  }
});

