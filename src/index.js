

import Board from './scripts/board'
window.board = Board;
import View from "./scripts/view"
window.view = View;
import BestMoves from './scripts/best_moves'
window.bestMoves = BestMoves;

document.addEventListener("DOMContentLoaded", () => {
  const board = new Board
  const boardView = document.getElementById("board")
  const view = new View(board, boardView)
  const movesTable = document.getElementById("moves")
  const best_moves =  new BestMoves(movesTable,'fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201')
})