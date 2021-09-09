
class View {
    constructor(viewEl) {
        this.viewEl = viewEl;
        this.setupBoard();
        this.colorSquares();
    }

    setupBoard() {

        const alphabetEight = "abcdefgh"

        const boardPositions = document.createElement('ul');
        this.viewEl.appendChild(boardPositions);
        boardPositions.setAttribute("class", "BoardPositions")

        for(let i = 8; i > 0; i--) {
            for(let j = 0; j < 8; j++) {
                
                let positon = document.createElement('li');
                positon.setAttribute('id', `${alphabetEight[j]}${i}`);
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

        const blackPieces = ['&#9820', '&#9822', '&#9821', '&#9819', '&#9818', '&#9821', '&#9822', '&#9820']
        const blackPawn = '&#9823'

        let squares = document.getElementsByTagName('li');

        for (let i = 0; i < squares.length; i++) {

            if (squares[i].hasChildNodes()) {
                let ele = squares[i].firstChild;
                squares[i].removeChild(ele);
            }

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
                let piece = document.createElement('div');
                piece.innerHTML = whitePieces[i % 56]
                squares[i].appendChild(piece); 
            } 
        }
    } 

    // generateFenString() {

    //     let board = document.getElementsByClassName('BoardPositions')[0]
    //     let squares = board.childNodes;
    
    //     let pieces = {
    //         '9814': 'R',
    //         '9816': 'N',
    //         '9815': 'B',
    //         '9813': 'Q',
    //         '9812': 'K', 
    //         '9817': 'P',
    //         '9820': 'r',
    //         '9822': 'n',
    //         '9821': 'b',
    //         '9819': 'q',
    //         '9818': 'k',
    //         '9823': 'p'
    //     }
    
    //     let fenString = "fen="
    //     let counter = 0
    
    //     for(let i = 0; i < squares.length; i++) {
    
    //         if (squares[i].hasChildNodes()) {
    //             if (counter > 0) {
    //                 fenString += counter
    //                 counter = 0
    //             }
    //             let childNode = squares[i].childNodes[0];
    //             let code = childNode.innerHTML.charCodeAt(0);
    //             fenString += pieces[code.toString()]
    //         } else {
    //             counter += 1
    //         }
    //         if ( (i + 1) % 8 === 0) {
    //             if (counter > 0) {
    //                 fenString += counter
    //                 counter = 0
    //             }
    //             fenString += '/'
    //         }
    //     }
        
    //     if (this.moves[this.moves.length - 1].includes('w')) {
    //         fenString += " b"
    //     } else {
    //         fenString += " w"
    //     }
    
    //     fenString += ' KQkq '
    //     fenString += movesWithoutCapture + ' '
    //     fenString += this.moves.length + 1 
    
    //     this.moves.push(fenString)
    //     return fenString
    //   }

}

export default View