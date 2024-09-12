import Game from './GameDataStructure.js';

function generateGame (code) {
  let game = new Game();
  
  // Convert code to binary
  const base64urlCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  var binary = '';
  for (let i = 0; i < code.length; i++) {
    b = base64urlCharacters.indexOf(code.charAt(i)).toString(2);
    while (b.length < 6) b = '0' + b;
    binary += b;
  }

  const encodingVersion = parseInt(binary.substring(0, 8), 2);
  binary = binary.substring(8);
 
  if (binary.length < (6 * 81) || binary.length > (6 * 81 + 8)) return; // Invalid data
      for (let i = 0; i < 81; i++) {
        const subBinary = binary.substring(i * 6, (i + 1) * 6);
        const mode = parseInt(subBinary.substring(0, 2), 2);
        const value = parseInt(subBinary.substring(2, 6), 2) + 1;
        game.setValues(Math.floor(i / 9), i % 9, mode, value);
      }
  return game;
}

export default generateGame;