import Board from "./board"

class View {
    constructor(board, viewEl) {
        this.board = new Board;
        this.viewEl = viewEl;
        this.setupBoard();
        this.colorSquares();
        this.placePieces();
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
        }

    }

    colorSquares() {
        let squares = Array.from(document.getElementsByTagName('li'));

        let white = true;

        for(let i = 0; i < squares.length; i++) {
            if (white) {
                squares[i].setAttribute('data-color', 'white');
                white = false;
            } else {
                squares[i].setAttribute('data-color', 'black');
                white = true; 
            }
            
            if ( (i + 1) % 8 === 0) {
                if (white) {
                    white = false 
                } else {
                    white = true
                }
            }
        }
    }

    placePieces() {
        let squares = Array.from(document.getElementsByTagName('li'));
        let first = squares[0];
        let piece = document.createElement('div');
        piece.innerHTML = '&#9812'
        
        first.appendChild(piece)
    }
}

export default View