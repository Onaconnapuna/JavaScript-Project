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

        const whitePieces = ['&#9814', '&#9816', '&#9815', '&#9813', '&#9812', '&#9815', '&#9816', '&#9814']
        const whitePawn = '&#9817'

        const blackPieces = ['&#9820', '&#9822', '&#9821', '&#9818', '&#9819', '&#9821', '&#9822', '&#9820']
        const blackPawn = '&#9823'

        let squares = document.getElementsByTagName('li');

        for (let i = 0; i < squares.length; i++) {
            if (i < 8) {
                let piece = document.createElement('div');
                piece.innerHTML = blackPieces[i];
                squares[i].appendChild(piece)
            } else if (i > 7 && i < 16) {
                let piece = document.createElement('div');
                piece.innerHTML = blackPawn
                squares[i].appendChild(piece)
            } else if (i > 47 && i < 56) {
                let piece = document.createElement('div');
                piece.innerHTML = whitePawn
                squares[i].appendChild(piece)
            } else if (i > 55) {
                // for(let j = 0; j < 8; j++) {
                    let piece = document.createElement('div');
                    piece.innerHTML = whitePieces[i % 56]
                    squares[i].appendChild(piece)
                // }
            }
        }

    }
}

export default View