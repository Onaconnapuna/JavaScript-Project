import View from "./scripts/view"
window.view = View;
import BestMoves from './scripts/best_moves'
import { async } from "regenerator-runtime";
window.bestMoves = BestMoves;

document.addEventListener("DOMContentLoaded", () => {

  let currentFen = 'fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201'
  const boardView = document.getElementById("board")
  let view = new View(boardView)
  view.placePieces();
  const movesTable = document.getElementById("moves")
  let moves = new BestMoves(movesTable, view, currentFen)

})