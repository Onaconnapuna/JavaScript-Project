// const demoUrl = 'https://www.metaweather.com/api/location/search/?query=san';
// const corsRequest = (url = demoUrl) => {
//   fetch(`/cors?url=${encodeURIComponent(url)}`)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//     })
// }

// const apiRequest = (query = 'curry') => {
//   fetch(`/api?searchTerm=${encodeURIComponent(query)}`)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//     })
// }

// class BoardView

import Board from './scripts/board'
window.board = Board;
import View from "./scripts/view"
window.view = View;

document.addEventListener("DOMContentLoaded", () => {
  const board = new Board
  const boardView = document.getElementById("board")
  const view = new View(board, boardView)
})