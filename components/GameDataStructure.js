import FieldMode from "./fieldMode";
import Field from "./FieldDataStructure";
import { Alert } from 'react-native';
 
 
// class to store and modify the current game state
export default class Game {
 
  constructor(init = true) {
    if (init) {
      this.data = [];
    for (let r = 0; r < 9; r++) {
      this.data.push([]);
      for (let c = 0; c < 9; c++) {
        this.data[r].push(new Field());
      }
    }
    }
    
  }

  gameIsComplete(){
    let numberMissing = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if ((this.data[r][c].mode == FieldMode.USER) && (this.data[r][c].user == undefined)){
            numberMissing = false;
        }
      }
    }
    return numberMissing;
  }
 
  clone() {
    const newGame = new Game(true);
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        newGame.data[r][c] = this.data[r][c].clone();
      }
    }
    return newGame;
  }
 
  solveBoard(setAlertMessage) {
    // console.log("solveBoard() called");
    let allCorrect = true;
  
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {

        if (this.data[r][c].mode === FieldMode.USER) {
          
          this.data[r][c].solution = true;
          if (this.data[r][c].value !== this.data[r][c].user) {
            // console.log(`Mismatch at row ${r}, col ${c}: expected ${this.data[r][c].value}, but got ${this.data[r][c].user}`);
            this.data[r][c].wrong = true;
            allCorrect = false;
          }
        }
      }
    }
  
  
    if (allCorrect) {
      setAlertMessage("Congratulations! You have successfully solved the board!");
    } else {
      setAlertMessage("Solution Applied. The solution has been applied to the board.");
    }
  }
    
 
  setValues(row, col, mode, value) {
    this.data[row][col] = new Field(row, col);
    switch (mode) {
      case 0:
        this.data[row][col].mode = FieldMode.USER;
        break;
      case 1:
        this.data[row][col].mode = FieldMode.WHITEKNOWN;
        break;
      case 2:
        this.data[row][col].mode = FieldMode.BLACK;
        break;
      default:
        this.data[row][col].mode = FieldMode.BLACKKNOWN;
        break;
    }
    // this.data[row][col].mode = mode;
    this.data[row][col].value = value;
  }
  setField(field) {
    const row = Number(field.selector.substring(3, 4));
    const col = Number(field.selector.substring(4, 5));
    this.data[row][col] = field;
    this.data[row][col].render();
  }
  forEach (iteratorFunction) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        iteratorFunction(this.data[r][c], r, c);
      }
    }
  }
 
  getBox(id) {
    return this.data[Math.floor(id / 9)][id % 9];
  }
 
  unsetSelected() {
    this.forEach(field => {
      field.isSelected = false;
    });
  }
 
  toString() {
    let result = '';
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
 
        switch (this.data[r][c].mode) {
          case 0:
            // UNKNOWN WHITE
            if (this.data[r][c].value == 16) {
              result += '( ) ';
            } else {
              result += '(' + this.data[r][c].value + ')';
              result += ' ';
            }
            break;
          case 1:
            // KNOWN
            if (this.data[r][c].value == 16) {
              result += '    ';
            } else {
              result += ' ' + this.data[r][c].value + ' ';
              result += ' ';
            }
            break;
          case 2:
            // UNKNOWN BLACK
            if (this.data[r][c].value == 16) {
              result += '    ';
            } else {
              result += ' ' + this.data[r][c].value + ' ';
              result += ' ';
            }
            break;
          default:
            // 3 -> [] -> KNOWN BLACK
            if (this.data[r][c].value == 16) {
              result += '[ ] ';
            } else {
              result += '[' + this.data[r][c].value + ']';
              result += ' ';
            }
            break;
        }
 
      }
      result += '\n';
    }
    return result;
  }
 
 
}