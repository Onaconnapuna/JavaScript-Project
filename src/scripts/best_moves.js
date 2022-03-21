import { async } from "regenerator-runtime";
import View from "./view"
import Index from '../index.js'

class BestMoves {
    constructor(viewEl, boardView, fenString) {
        this.viewEl = viewEl;
        this.boardView = boardView 
        this.fenString = fenString;
        this.playedMoves = [fenString];
        this.castling = " KQkq - "
        this.movesWithoutCapture = 0;
        this.displayBestMoves(this.fenString);

        // this.displayBestMoves = this.displayBestMoves.bind(this)

      // if(this.playedMoves.length === 11) {
      //   this.resetMoves();
      // }
    }

    // moveCounter() {
    //   counter = document.getElementById('move-counter') 
    //   counter.innerHTML += `${this.playedMoves.length}`
    // }

    navButtons() {

      let table = document.getElementsByClassName('MovesReference');
      let moveIcons = table[0].childNodes;


      let backButton = document.getElementById('back-button')
      let resetButton = document.getElementById('reset-button')

      let playedMoves = this.playedMoves

      let placePiecesFen = this.boardView.placePiecesFen.bind(this)
      let displayBestMoves = this.displayBestMoves.bind(this)
      // let movePiece = this.movePiece.bind(this)

      resetButton.addEventListener("mousedown", function() {
        location.reload()
      })

      backButton.addEventListener("mousedown", function() {
        if (playedMoves.length > 1) {

          playedMoves.pop()
          this.fenString = playedMoves[playedMoves.length - 1]
          placePiecesFen(this.fenString)
          displayBestMoves(this.fenString)
        }

      })
    }

    fetchBestMoves = async(fenString) => {

        const movesReference = document.createElement('ul');
        this.viewEl.appendChild(movesReference);
        movesReference.setAttribute("class", "MovesReference");
        // grandmasters : 'https://explorer.lichess.ovh/master?'
        // lichess : 'https://explorer.lichess.ovh/lichess?variant=standard&'
        await fetch('https://explorer.lichess.ovh/masters?' + `${fenString}`)
        .then((response) => response.json())
        .then((data) => {
            for(let i = 0; i < data.moves.length; i++) {
                let move = document.createElement('li');
                move.setAttribute('id', `${data.moves[i].uci}`);
                move.dataset.white = data.moves[i].white; 
                move.dataset.draws = data.moves[i].draws;
                move.dataset.black = data.moves[i].black;
                movesReference.appendChild(move);
            }
        })
        
    }
    
    generateFenString() {

        let board = document.getElementsByClassName('BoardPositions')[0]
        let squares = board.childNodes;
    
        let pieces = {
            '9814': 'R',
            '9816': 'N',
            '9815': 'B',
            '9813': 'Q',
            '9812': 'K', 
            '9817': 'P',
            '9820': 'r',
            '9822': 'n',
            '9821': 'b',
            '9819': 'q',
            '9818': 'k',
            '9823': 'p'
        }
    
        let fenString = "fen="
        let counter = 0
    
        for(let i = 0; i < squares.length; i++) {
    
            if (squares[i].hasChildNodes()) {
                if (counter > 0) {
                    fenString += counter
                    counter = 0
                }
                let childNode = squares[i].childNodes[0];
                let code = childNode.innerHTML.charCodeAt(0);
                fenString += pieces[code.toString()]
            } else {
                counter += 1
            }
            if ( (i + 1) % 8 === 0 && i + 1 !== 64) {
                if (counter > 0) {
                    fenString += counter
                    counter = 0
                }
                fenString += '/'
            }
        }
        
        if (this.playedMoves[this.playedMoves.length - 1].includes('w')) {
            fenString += " b"
        } else {
            fenString += " w"
        }
    
        fenString += this.castling
        fenString += (this.movesWithoutCapture).toString() + " "
        fenString += (this.playedMoves.length + 1).toString();
    
        this.playedMoves.push(fenString)
        return fenString
      }

      hoverOverMeters() {
        let meter = document.getElementById('meter-container')

        meter.addEventListener('mouseover', function() {
          let meterWhite = document.getElementById('white-percentage')
          let meterBlack = document.getElementById('black-percentage')
          let meterDraw = document.getElementById('draw-percentage')

          meterWhite.style.display = 'block';
          meterBlack.style.display = 'block';
          meterDraw.style.display = 'block';
        })

        meter.addEventListener('mouseout', () => {
          let meterWhite = document.getElementById('white-percentage')
          let meterBlack = document.getElementById('black-percentage')
          let meterDraw = document.getElementById('draw-percentage')

          meterWhite.style.display = 'none';
          meterBlack.style.display = 'none';
          meterDraw.style.display = 'none';
        })

      }

    hoverOverMove() {
        let table = document.getElementsByClassName('MovesReference');
        let moveIcons = table[0].childNodes;
        
        for(let i = 0; i < moveIcons.length; i++) {
            let firstPosID = moveIcons[i].id.split('').slice(0, 2).join('');
            let lastPosID = moveIcons[i].id.split('').slice(2).join('');
            moveIcons[i].addEventListener("mouseover", function(){
                let startingPosElement = document.getElementById(firstPosID);
                let endingPosElement = document.getElementById(lastPosID);
                startingPosElement.style.backgroundColor = "lightgreen";
                endingPosElement.style.backgroundColor = "red";

                let whiteMeter = document.getElementById('white');
                let drawMeter = document.getElementById('draw')
                let blackMeter = document.getElementById('black');

                let totalValues = parseInt(moveIcons[i].dataset.white) + parseInt(moveIcons[i].dataset.black) + parseInt(moveIcons[i].dataset.draws)
                console.log(totalValues)
                let white = parseInt(moveIcons[i].dataset.white) / totalValues
                let draw = parseInt(moveIcons[i].dataset.draws) / totalValues
                let black = parseInt(moveIcons[i].dataset.black) / totalValues


                whiteMeter.style.height = `${Math.round(white * 100) -.1}%`;
                drawMeter.style.height = `${Math.round(draw * 100)-.1}%`;
                blackMeter.style.height = `${Math.round(black * 100)-.1}%`;

                // let whiteMeterPercentage = document.getElementById('white-percentage');
                // let drawMeterPercentage = document.getElementById('draw-percentage')
                // let blackMeterPercentage = document.getElementById('black-percentage');

                // whiteMeterPercentage.innerText = `${Math.round(white * 100)}%`;
                // drawMeterPercentage.innerText = `${Math.round(draw * 100)}%`;
                // blackMeterPercentage.innerText = `${Math.round(black * 100)}%`;



                // whiteMeter.value = Math.round(white * 100)
                // drawMeter.value = Math.round(draw * 100)
                // blackMeter.value = Math.round(black * 100)
            })
            moveIcons[i].addEventListener('mouseout', function() {

                let startingPosElement = document.getElementById(firstPosID);
                let endingPosElement = document.getElementById(lastPosID);
                startingPosElement.style.backgroundColor = null;
                endingPosElement.style.backgroundColor = null;

                let whiteMeter = document.getElementById('white');
                let drawMeter = document.getElementById('draw')
                let blackMeter = document.getElementById('black');
                
                let whiteMeterPercentage = document.getElementById('white-percentage');
                let drawMeterPercentage = document.getElementById('draw-percentage')
                let blackMeterPercentage = document.getElementById('black-percentage');

                whiteMeter.style.height = `${whiteMeterPercentage.innerHTML}`;
                drawMeter.style.height = `${drawMeterPercentage.innerHTML}`;
                blackMeter.style.height = `${blackMeterPercentage.innerHTML}`;

                // whiteMeterPercentage.innerText = `${Math.round(white * 100)}%`;
                // drawMeterPercentage.innerText = `${Math.round(draw * 100)}%`;
                // blackMeterPercentage.innerText = `${Math.round(black * 100)}%`;

                // let whiteMeter = document.getElementById('white');
                // let drawMeter = document.getElementById('draw')
                // let blackMeter = document.getElementById('black');

                // whiteMeter.value = 0
                // drawMeter.value = 0
                // blackMeter.value = 0
            })
        }
    }

    resetMoves() {
        let table = document.getElementsByClassName('MovesReference');
        let moveIcons = table[0].childNodes;
        let startingFen = 'fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201'
        
        
        for(let i = 0; i < moveIcons.length; i++){ 
          moveIcons[i].addEventListener("click", () => {
            let newfenString = this.generateFenString();
            this.fenString = newfenString;

            if (this.playedMoves.length === 11) {
                // table.removeChild()
                this.fenString = startingFen;
                this.playedMoves = [];
                this.playedMoves.push(startingFen)
                let movesTable = document.getElementById('moves')
                this.boardView.placePieces();
                this.displayBestMoves(startingFen);
                movesTable.removeChild(table[0])
              }
            
            
            this.displayBestMoves(this.fenString);
          })
        }
      }

    movePiece() {
        
        let table = document.getElementsByClassName('MovesReference');
        let moveIcons = table[0].childNodes;

        for(let i = 0; i < moveIcons.length; i++){
            let firstPosID = moveIcons[i].id.split('').slice(0, 2).join('');
            let lastPosID = moveIcons[i].id.split('').slice(2).join('');
            moveIcons[i].addEventListener("click", function() {

                //meters

                let whiteMeter = document.getElementById('white');
                let drawMeter = document.getElementById('draw')
                let blackMeter = document.getElementById('black');

                let whiteMeterPercentage = document.getElementById('white-percentage');
                let drawMeterPercentage = document.getElementById('draw-percentage')
                let blackMeterPercentage = document.getElementById('black-percentage');

                let totalValues = parseInt(moveIcons[i].dataset.white) + parseInt(moveIcons[i].dataset.black) + parseInt(moveIcons[i].dataset.draws);
                let white = parseInt(moveIcons[i].dataset.white) / totalValues;
                let draw = parseInt(moveIcons[i].dataset.draws) / totalValues;
                let black = parseInt(moveIcons[i].dataset.black) / totalValues;
                
                

                whiteMeter.style.height = `${Math.round(white * 100) -.1}%`;
                drawMeter.style.height = `${Math.round(draw * 100) -.1}%`;
                blackMeter.style.height = `${Math.round(black * 100) -.1}%`;

                whiteMeterPercentage.innerText = `${Math.round(white * 100)}%`;
                drawMeterPercentage.innerText = `${Math.round(draw * 100)}%`;
                blackMeterPercentage.innerText = `${Math.round(black * 100)}%`;



                //retrieving elements

                let startingPosElement = document.getElementById(firstPosID);
                let endingPosElement = document.getElementById(lastPosID);
                startingPosElement.style.backgroundColor = null;
                endingPosElement.style.backgroundColor = null;
                let piece = startingPosElement.childNodes[0]
                let code = piece.innerHTML.charCodeAt(0);
                let movedPiece = document.createElement('div')
                movedPiece.innerHTML = `&#${code}`

                // moving the piece
                if (endingPosElement.hasChildNodes()) {
                    endingPosElement.removeChild(endingPosElement.childNodes[0])
                    this.movesWithoutCapture = 0
                }
                endingPosElement.appendChild(movedPiece)
                startingPosElement.removeChild(startingPosElement.childNodes[0])

                // removing options from table
                table[0].removeChild(moveIcons[i])
                while (table[0].firstChild) {
                    table[0].removeChild(table[0].firstChild)
                }
                let movesTable = document.getElementById('moves')
                movesTable.removeChild(table[0])
            })
        }
    }



    displayBestMoves = async(fenString) => { 
      // console.log(fenString)

        await this.fetchBestMoves(fenString);

        let counter = document.getElementById('move-counter') 
        counter.innerHTML = ''
        counter.innerHTML += `${this.playedMoves.length}/10`

        let table = document.getElementsByClassName('MovesReference');
        let moveIcons = table[0].childNodes;

        // displays squares on Moves Panel with square

        for(let i = 0; i < moveIcons.length; i++) {
            let firstPosID = moveIcons[i].id.split('').slice(0, 2).join('')
            let lastPosID = moveIcons[i].id.split('').slice(2).join('')
            let boardPos = document.getElementById(firstPosID);
            let piece = document.createElement('div');
            let posReference= document.createElement('p');
            posReference.innerHTML = lastPosID.toUpperCase()
            piece.innerHTML = `${boardPos.firstChild.innerHTML}`;
            moveIcons[i].appendChild(piece);
            moveIcons[i].appendChild(posReference)
        }
        this.hoverOverMeters();
        this.hoverOverMove();
        this.movePiece();
        this.resetMoves();
        // this.navButtons();
        // this.moveCounter();
    } 

}

export default BestMoves