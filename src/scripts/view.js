
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

    placePiecesFen(fenstring) {
      const whitePieces = ['&#9814', '&#9816', '&#9815', '&#9813', '&#9812', '&#9815', '&#9816', '&#9814']
        const whitePawn = '&#9817'

        const blackPieces = ['&#9820', '&#9822', '&#9821', '&#9819', '&#9818', '&#9821', '&#9822', '&#9820']
        const blackPawn = '&#9823'

        let squaresUl = document.getElementsByClassName('BoardPositions')[0];
        let squares = squaresUl.childNodes
        // console.log(squares)
        // console.log(squares.childNodes)
      
        let positions = fenstring.split('/').join('').slice(4)

        let positionString = ''

        const possibleLetters = ['PRNBQKprnbqk']

        const possibleNumbers = ['12345678']

        // console.log(positions)

        for (let i = 0; i < positions.length; i++) {
          // debugger
          if (possibleLetters.toString().includes(positions[i])) {
            positionString += positions[i]
          } else if (possibleNumbers.toString().includes(positions[i])){
            positionString += 'a'.repeat(parseInt(positions[i])) 

          } 
        }

        // console.log(positionString)
        // console.log(squares.length)

        for (let i = 0; i < squares.length; i++) {

          if (squares[i].hasChildNodes()) {
              let ele = squares[i].firstChild;
              squares[i].removeChild(ele);
          }

          // console.log(squares[0].child)
          // console.log(positions[i])

          if (positionString[i] === 'p') {
              let piece = document.createElement('div');
              piece.innerHTML = blackPawn;
              squares[i].appendChild(piece)
          } else if (positionString[i] === 'r') {
            let piece = document.createElement('div');
            piece.innerHTML = blackPieces[0];
            squares[i].appendChild(piece)
          } else if (positionString[i] === 'n') {
            let piece = document.createElement('div');
            piece.innerHTML = blackPieces[1];
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'b') {
            let piece = document.createElement('div');
            piece.innerHTML = blackPieces[2];
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'q') {
            let piece = document.createElement('div');
            piece.innerHTML = blackPieces[3];
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'k') {
            let piece = document.createElement('div');
            piece.innerHTML = blackPieces[4];
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'P') {
            let piece = document.createElement('div');
            piece.innerHTML = whitePawn;
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'R') {
            let piece = document.createElement('div');
            piece.innerHTML = whitePieces[0];
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'N') {
            let piece = document.createElement('div');
            piece.innerHTML = whitePieces[1];
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'B') {
            let piece = document.createElement('div');
            piece.innerHTML = whitePieces[2];
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'Q') {
            let piece = document.createElement('div');
            piece.innerHTML = whitePieces[3];
            squares[i].appendChild(piece) 
          } else if (positionString[i] === 'K') {
            let piece = document.createElement('div');
            piece.innerHTML = whitePieces[4];
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