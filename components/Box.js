import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import FieldMode from './fieldMode';  


function Box({ fieldDataStructure, onSelectFunction }) {

  let textStyle;
  let style = [styles.box];
  let number = null;

  switch (fieldDataStructure.mode) {
    
    case(FieldMode.WHITEKNOWN) :
      textStyle = styles.whiteTextStyle;
      style.push(styles.whiteBox);
      number = fieldDataStructure.value;
      break;
    case FieldMode.BLACK:
      textStyle = styles.blackTextStyle;
      style.push(styles.blackBox);
      break;
    case FieldMode.BLACKKNOWN:
      textStyle = styles.blackTextStyle;
      style.push(styles.blackBox);
      number = fieldDataStructure.value;
      break;
    default:
      style.push(styles.whiteBox)  
      // USER
     
      
      // HINT or solution
      if (fieldDataStructure.hint || fieldDataStructure.solution) {
       
        if (fieldDataStructure.hint){
          textStyle = styles.hintTextStyle
        }
        else if (fieldDataStructure.wrong){
          textStyle = styles.wrongTextStyle;
        }
        else{
          textStyle = styles.correctTextStyle;
        }  
       number = fieldDataStructure.value;
      }
      else {
        number = fieldDataStructure.user;
        textStyle = styles.userTextStyle;
      }
      break;
  }

    function handlePress() {
      onSelectFunction(fieldDataStructure.id);
    }
  
    if (fieldDataStructure.isSelected == true) {
      style.push(styles.selectedBox)
    }
  
  
    return (
  
      <Pressable style={style} onPress={handlePress} disabled={fieldDataStructure.mode != FieldMode.USER || fieldDataStructure.hint || fieldDataStructure.solution}>
  
        {number != null ? (<Text style={textStyle}>{number}</Text>) : fieldDataStructure.mode === FieldMode.USER ?
          (<View style={styles.innerGrid}>

            {Array.from({ length: 9 }).map((_, index) => (
                
                fieldDataStructure.notes.includes(index + 1) ? 
                <Text key={index} style={styles.smallText}>{index + 1}</Text> : 
                <Text key={index} style={styles.smallText}></Text>
                ))}
            

          </View>
          ) : null}
      </Pressable>
    );
  };

export default Box;

const styles = StyleSheet.create({


    box: {
      width: 40, // Breite der Box
      height: 40, // Höhe der Box
      borderWidth: 1,
      borderColor: 'black',
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedBox: {
      backgroundColor: 'lightgray',
    },
    blackBox: {
      backgroundColor: 'black',
    },
    whiteBox: {
      backgroundColor: 'white',
    },
    blackTextStyle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    whiteTextStyle: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
   
    innerGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 40, // Breite der Box
      height: 40, // Höhe der Box
    },
    smallText: {
      fontSize: 10, // Kleinere Schriftgröße für die kleinen Zahlen
      width: 40 / 3, // Breite der kleinen Zahlen, so dass 3 in einer Reihe passen
      height: 40 / 3, // Höhe der kleinen Zahlen, so dass 3 in einer Reihe passen
      textAlign: 'center',
      color: 'black',
    },
    hintTextStyle: {
      color: 'red',
      fontSize: 20,
      fontWeight: 'bold',
    },
    correctTextStyle: {
      color: 'green',
      fontSize: 20,
      fontWeight: 'bold',
    },
    wrongTextStyle: {
      color: 'red',
      fontSize: 20,
      fontWeight: 'bold',
    },
    userTextStyle: {
      color: 'blue',
      fontSize: 20,
      fontWeight: 'bold',
    },

  });