import View from "./scripts/view"
window.view = View;
import BestMoves from './scripts/best_moves'
import { async } from "regenerator-runtime";
window.bestMoves = BestMoves;
import Meter from './scripts/win_meter'
window.meter = Meter;

document.addEventListener("DOMContentLoaded", () => {

  let currentFen = 'fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201'
  const boardView = document.getElementById("board");
  let view = new View(boardView);
  view.placePieces();
  const movesTable = document.getElementById("moves");
  let moves = new BestMoves(movesTable, view, currentFen);
  let meter = new Meter();
})