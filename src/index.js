import View from "./scripts/view"
window.view = View;
import BestMoves from './scripts/best_moves'
import { async } from "regenerator-runtime";
window.bestMoves = BestMoves;

document.addEventListener("DOMContentLoaded", () => {

  let currentFen = 'fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201'
  const boardView = document.getElementById("board")
  let view = new View(boardView)
  const movesTable = document.getElementById("moves")
  let moves = new BestMoves(movesTable, currentFen)
  resetMoves();
  

  // const movesReference = document.createElement('ul');
  // const movesTable = document.getElementById('moves');
  // movesReference.setAttribute("class", "MovesReference");
  // movesTable.appendChild(movesReference);

  // for(let i = 0; i < 12; i++) {
  //   let moveLI = document.createElement('li')
  //   movesReference.appendChild(moveLI)
  // } 
  function resetMoves() {
    let table = document.getElementsByClassName('MovesReference');
    let moveIcons = table[0].childNodes;

    
    for(let i = 0; i < moveIcons.length; i++){ 
      moveIcons[i].document.addEventListener('click', () => {
        fenString = generateFenString()
        moves = new BestMoves(movesTable, fenString)
      })
    }
  }


  let movesCounter = ['fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201']
  let movesWithoutCapture = 0


    function generateFenString() {

      let board = document.getElementsByClassName('BoardPositions')[0]
      let squares = board.childNodes;
  
      let pieces = {
          '9814': 'R',
          '9816': 'N',
          '9815': 'B',
          '9813': 'Q',
          '9812': 'K', 
          '9817': 'P',
          '9820': 'r',
          '9822': 'n',
          '9821': 'b',
          '9819': 'q',
          '9818': 'k',
          '9823': 'p'
      }
  
      let fenString = "fen="
      let counter = 0
  
      for(let i = 0; i < squares.length; i++) {
  
          if (squares[i].hasChildNodes()) {
              if (counter > 0) {
                  fenString += counter
                  counter = 0
              }
              let childNode = squares[i].childNodes[0];
              let code = childNode.innerHTML.charCodeAt(0);
              fenString += pieces[code.toString()]
          } else {
              counter += 1
          }
          if ( (i + 1) % 8 === 0) {
              if (counter > 0) {
                  fenString += counter
                  counter = 0
              }
              fenString += '/'
          }
      }
      
      if (movesCounter[movesCounter.length - 1].includes('w')) {
          fenString += " b"
      } else {
          fenString += " w"
      }
  
      fenString += ' KQkq '
      fenString += movesWithoutCapture + ' '
      fenString += movesCounter.length + 1 
  
      movesCounter.push(fenString)
      return fenString
    }
  
})