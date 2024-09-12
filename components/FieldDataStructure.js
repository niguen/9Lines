import FieldMode from "./fieldMode";

// Element class
export default class Field {

    constructor(row, col) {
      if (col === undefined) {
        this.selector = row;
      } else {
        this.selector = `#ce${row}${col}`;
      }
      this.id = row * 9 + col;
      this.isSelected = false;
      this.row = row; 
      this.column = col; 
      //Solution value
      this.value = undefined;
      // User input
      this.user = undefined;
      // Small notes numbers
      this.notes = [];
      // Mode of the field
      this.mode = undefined;
      this.wrong = false;
      // True or false if solution is shown
      this.solution = false;
      this.hint = false;
    }

    clone() {
      let field = new Field(this.row, this.column);
      field.id = this.id;
      field.isSelected = this.isSelected;
      field.row = this.row;
      field.column = this.column;
      field.value = this.value;
      field.mode = this.mode;
      field.user = this.user;
      field.notes = [...this.notes];
      field.mode = this.mode;
      field.wrong = this.wrong;
      field.solution = this.solution;
      field.hint = this.hint;
      
      return field;
    }

    setUser(input) {
      if (this.mode === FieldMode.USER) {
        this.wrong = false;
        this.notes = [];
        if (this.user === input) {
          this.user = undefined;
        } else {
          this.user = input;
        }
      }
    }
    setNote(value) {
      if (this.mode === FieldMode.USER) {
        this.user = undefined;
        if (this.notes.indexOf(value) > -1) {
          this.notes.splice(this.notes.indexOf(value), 1);
        } else {
          this.notes.push(value);
        }
      }
    }
    checkUser(setColor) {
      if (this.mode !== FieldMode.USER) return true;
      // if (!this.user) return false;
      if (this.user === this.value) return true;
      // if (setColor) {
        this.wrong = true;
      // }
      return false;
    }
    showSolution() {
      this.solution = true;
    }
    restart() {
      this.user = undefined;
      this.notes = [];
    }
    copy() {
      let field = new Field(this.selector);
      field.mode = this.mode;
      field.value = this.value;
      field.user = this.user;
      field.wrong = this.wrong;
      field.notes = [...this.notes];
      return field;
    }
  }
  