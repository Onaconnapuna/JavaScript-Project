import Board from "./board"

class View {
    constructor(board, viewEl) {
        this.board = new Board;
        this.viewEl = viewEl;
        this.setupBoard();
    }

    setupBoard() {

        const alphabetEight = "abcdefgh"

        const boardPositions = document.createElement('ul');
        this.viewEl.appendChild(boardPositions);
        boardPositions.setAttribute("class", "BoardPositions")

        for(let i = 8; i > 0; i--) {
            for(let j = 0; j < 8; j++) {
                let bool = true
                let positon = document.createElement('li');
                positon.setAttribute('id', `[${alphabetEight[j]}, ${i}]`);
                boardPositions.appendChild(positon);
    
            }
            // console.log(i)
        }
    }
}

export default View