
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

        // const whitePieces = ['&#9814', '&#9816', '&#9815', '&#9813', '&#9812', '&#9815', '&#9816', '&#9814']
        // const whitePawn = '&#9817'

        const whitePieces = [];

        whitePieces[0] = new Image;
        whitePieces[0].src = 'pieces/rook_w.png'

        whitePieces[1] = new Image;
        whitePieces[1].src = 'pieces/knight_w.png'

        whitePieces[2] = new Image;
        whitePieces[2].src = 'pieces/bishop_w.png'

        whitePieces[3] = new Image;
        whitePieces[3].src = 'pieces/queen_w.png'

        whitePieces[4] = new Image;
        whitePieces[4].src = 'pieces/king_w.png'

        whitePieces[5] = new Image;
        whitePieces[5].src = 'pieces/bishop_w.png'

        whitePieces[6] = new Image;
        whitePieces[6].src = 'pieces/knight_w.png'

        whitePieces[7] = new Image;
        whitePieces[7].src = 'pieces/rook_w.png'

        // const whitePawn = new Image
        // whitePawn.src = '../../pieces/pawn_w.png'

        // const blackPieces = ['&#9820', '&#9822', '&#9821', '&#9819', '&#9818', '&#9821', '&#9822', '&#9820']

        const blackPieces = [];

        blackPieces[0] = new Image;
        blackPieces[0].src = 'pieces/rook_b.png'

        blackPieces[1] = new Image;
        blackPieces[1].src = 'pieces/knight_b.png'

        blackPieces[2] = new Image;
        blackPieces[2].src = 'pieces/bishop_b.png'

        blackPieces[3] = new Image;
        blackPieces[3].src = 'pieces/queen_b.png'

        blackPieces[4] = new Image;
        blackPieces[4].src = 'pieces/king_b.png'

        blackPieces[5] = new Image;
        blackPieces[5].src = 'pieces/bishop_b.png'

        blackPieces[6] = new Image;
        blackPieces[6].src = 'pieces/knight_b.png'

        blackPieces[7] = new Image;
        blackPieces[7].src = 'pieces/rook_b.png'

        // const blackPawn = '&#9823'

        // const blackPawn = new Image
        // blackPawn.src = '../../pieces/pawn_b.png'

        let squares = document.getElementsByTagName('li');

        for (let i = 0; i < squares.length; i++) {

            if (squares[i].hasChildNodes()) {
                let ele = squares[i].firstChild;
                squares[i].removeChild(ele);
            }

            if (i < 8) {
                let piece = document.createElement('div');
                // piece.innerHTML = blackPieces[i];
                piece.appendChild(blackPieces[i])
                squares[i].appendChild(piece)
            } else if (i > 7 && i < 16) {
                const blackPawn = new Image
                blackPawn.src = 'pieces/pawn_b.png'
                // blackPawn.src = 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png'
                let piece = document.createElement('div');
                // piece.innerHTML = blackPawn
                piece.appendChild(blackPawn)
                squares[i].appendChild(piece)
            } else if (i > 47 && i < 56) {
                let piece = document.createElement('div');
                // piece.innerHTML = whitePawn
                const whitePawn = new Image
                whitePawn.src = 'pieces/pawn_w.png'
                piece.appendChild(whitePawn)
                squares[i].appendChild(piece)
            } else if (i > 55) {
                let piece = document.createElement('div');
                // piece.innerHTML = whitePieces[i % 56]
                piece.appendChild(whitePieces[i % 56])
                squares[i].appendChild(piece); 
            } 
        }
    } 

    placePiecesFen(fenstring) {
        // const whitePieces = ['&#9814', '&#9816', '&#9815', '&#9813', '&#9812', '&#9815', '&#9816', '&#9814']

        const whitePieces = [];

        whitePieces[0] = new Image;
        whitePieces[0].src = 'pieces/rook_w.png'

        whitePieces[1] = new Image;
        whitePieces[1].src = 'pieces/knight_w.png'

        whitePieces[2] = new Image;
        whitePieces[2].src = 'pieces/bishop_w.png'

        whitePieces[3] = new Image;
        whitePieces[3].src = 'pieces/queen_w.png'

        whitePieces[4] = new Image;
        whitePieces[4].src = 'pieces/king_w.png'

        whitePieces[5] = new Image;
        whitePieces[5].src = 'pieces/bishop_w.png'

        whitePieces[6] = new Image;
        whitePieces[6].src = 'pieces/knight_w.png'

        whitePieces[7] = new Image;
        whitePieces[7].src = 'pieces/rook_w.png'


        // const whitePawn = '&#9817'

        const whitePawn = new Image 
        whitePawn.src = 'pieces/pawn_w.png'

        // const blackPieces = ['&#9820', '&#9822', '&#9821', '&#9819', '&#9818', '&#9821', '&#9822', '&#9820']

        const blackPieces = [];

        blackPieces[0] = new Image;
        blackPieces[0].src = 'pieces/rook_b.png'

        blackPieces[1] = new Image;
        blackPieces[1].src = 'pieces/knight_b.png'

        blackPieces[2] = new Image;
        blackPieces[2].src = 'pieces/bishop_b.png'

        blackPieces[3] = new Image;
        blackPieces[3].src = 'pieces/queen_b.png'

        blackPieces[4] = new Image;
        blackPieces[4].src = 'pieces/king_b.png'

        blackPieces[5] = new Image;
        blackPieces[5].src = 'pieces/bishop_b.png'

        blackPieces[6] = new Image;
        blackPieces[6].src = 'pieces/knight_b.png'

        blackPieces[7] = new Image;
        blackPieces[7].src = 'pieces/rook_b.png'

        // const blackPawn = '&#9823'

        const blackPawn =  new Image 
        blackPawn.src = 'pieces/pawn_b.png'

        let squaresUl = document.getElementsByClassName('BoardPositions')[0];
        let squares = squaresUl.childNodes
        // console.log(squares)
        // console.log(squares.childNodes)
      
        let positions = fenstring.split('/').join('').slice(4)

        let positionString = ''

        const possibleLetters = ['PRNBQKprnbqk']

        const possibleNumbers = ['12345678'];

        for (let i = 0; i < positions.length; i++) {
          if (possibleLetters.toString().includes(positions[i])) {
            positionString += positions[i]
          } else if (possibleNumbers.toString().includes(positions[i])){
            positionString += 'a'.repeat(parseInt(positions[i])) 
          } 
        }

        for (let i = 0; i < squares.length; i++) {

          if (squares[i].hasChildNodes()) {
              let ele = squares[i].firstChild;
              squares[i].removeChild(ele);
          }

          if (positionString[i] === 'p') {
              let piece = document.createElement('div');
              // piece.innerHTML = blackPawn;
              piece.appendChild(blackPawn)
              squares[i].appendChild(piece)
          } else if (positionString[i] === 'r') {
            let piece = document.createElement('div');
            // piece.innerHTML = blackPieces[0];
            piece.appendChild(blackPieces[0])
            squares[i].appendChild(piece)
          } else if (positionString[i] === 'n') {
            let piece = document.createElement('div');
            // piece.innerHTML = blackPieces[1];
            piece.appendChild(blackPieces[1])
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'b') {
            let piece = document.createElement('div');
            // piece.innerHTML = blackPieces[2];
            piece.appendChild(blackPieces[2])
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'q') {
            let piece = document.createElement('div');
            // piece.innerHTML = blackPieces[3];
            piece.appendChild(blackPieces[3])
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'k') {
            let piece = document.createElement('div');
            // piece.innerHTML = blackPieces[4];
            piece.appendChild(blackPieces[4])
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'P') {
            let piece = document.createElement('div');
            // piece.innerHTML = whitePawn;
            piece.appendChild(whitePawn)
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'R') {
            let piece = document.createElement('div');
            // piece.innerHTML = whitePieces[0];
            piece.appendChild(whitePieces[0])
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'N') {
            let piece = document.createElement('div');
            // piece.innerHTML = whitePieces[1];
            piece.appendChild(whitePieces[1])
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'B') {
            let piece = document.createElement('div');
            // piece.innerHTML = whitePieces[2];
            piece.appendChild(whitePieces[2])
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'Q') {
            let piece = document.createElement('div');
            // piece.innerHTML = whitePieces[3];
            piece.appendChild(whitePieces[3])
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'K') {
            let piece = document.createElement('div');
            // piece.innerHTML = whitePieces[4];
            piece.appendChild(whitePieces[4])
            squares[i].appendChild(piece) 
          } 
      } 

      let table = document.getElementsByClassName('MovesReference');
      let moveIcons = table[0].childNodes;
      
      for(let i = 0; i < moveIcons.length; i++){ table[0].removeChild(moveIcons[i])
        table[0].removeChild(moveIcons[i])
        while (table[0].firstChild) {
            table[0].removeChild(table[0].firstChild)
        }
        let movesTable = document.getElementById('moves')
        movesTable.removeChild(table[0])
      }
      
    }

}

export default View