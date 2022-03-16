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

      if(this.playedMoves.length === 11) {
        this.resetMoves();
      }
    }

    navButtons() {
      let backButton = document.getElementById('back-button')
      let resetButton = document.getElementById('reset-button')

      resetButton.addEventListener("mousedown", function() {
        this.resetMoves();
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
            console.log(data)
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
        console.log(fenString)
        return fenString
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
                let white = parseInt(moveIcons[i].dataset.white) / totalValues
                let draw = parseInt(moveIcons[i].dataset.draws) / totalValues
                let black = parseInt(moveIcons[i].dataset.white) / totalValues

                whiteMeter.value = Math.round(white * 100)
                drawMeter.value = Math.round(draw * 100)
                blackMeter.value = Math.round(black * 100)
            })
            moveIcons[i].addEventListener('mouseout', function() {

                let startingPosElement = document.getElementById(firstPosID);
                let endingPosElement = document.getElementById(lastPosID);
                startingPosElement.style.backgroundColor = null;
                endingPosElement.style.backgroundColor = null;

                let whiteMeter = document.getElementById('white');
                let drawMeter = document.getElementById('draw')
                let blackMeter = document.getElementById('black');

                whiteMeter.value = 0
                drawMeter.value = 0
                blackMeter.value = 0
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
                this.fenString = startingFen;
                this.playedMoves = [startingFen];
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
                // let meters = document.getElementById('winMeter')

                let whiteMeter = document.getElementById('white');
                let drawMeter = document.getElementById('draw')
                let blackMeter = document.getElementById('black');

                let totalValues = parseInt(moveIcons[i].dataset.white) + parseInt(moveIcons[i].dataset.black) + parseInt(moveIcons[i].dataset.draws);
                let white = parseInt(moveIcons[i].dataset.white) / totalValues;
                let draw = parseInt(moveIcons[i].dataset.draws) / totalValues;
                let black = parseInt(moveIcons[i].dataset.white) / totalValues;

                whiteMeter.value = Math.round(white * 100);
                drawMeter.value = Math.round(draw * 100);
                blackMeter.value = Math.round(black * 100);

                let metersContainer = document.getElementById('metersContainer')
                let metersValues = metersContainer.childNodes;

                if (metersValues.length !== 0) {
                    
                    for(let i = 0; i < 3; i++) {
                       
                        metersContainer.removeChild(metersValues[0])
                    }
                }


                let valueWhite = document.createElement('div');
                let whiteContent = document.createTextNode(`${whiteMeter.value}%`)
                valueWhite.appendChild(whiteContent);
                // meters.appendChild(valueWhite);
                metersContainer.appendChild(valueWhite)
                let valueDraws = document.createElement('div');
                let drawsContent = document.createTextNode(`${drawMeter.value}%`)
                valueDraws.appendChild(drawsContent);
                // meters.appendChild(valueDraws);
                metersContainer.appendChild(valueDraws)
                let valueBlack = document.createElement('div');
                let blackContent = document.createTextNode(`${blackMeter.value}%`)
                valueBlack.appendChild(blackContent);
                // meters.appendChild(valueBlack)
                metersContainer.appendChild(valueBlack)



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
        

        // for(let i = 0; i < moveIcons.length; i++){ 
        //   moveIcons[i].addEventListener("click", () => {
        //     let newfenString = this.generateFenString();
        //     this.fenString = newfenString;

        //     // if (this.playedMoves.length === 11) {
        //     //     this.fenString = startingFen;
        //     //     this.playedMoves = [startingFen];
        //     //     let movesTable = document.getElementById('moves')
        //     //     this.boardView.placePieces();
        //     //     this.displayBestMoves(startingFen);
        //     //     movesTable.removeChild(table[0])
        //     //   }
            

        //     // this.displayBestMoves(this.fenString);
        //   })
        // }
        this.hoverOverMove();
        this.movePiece();
        this.resetMoves();
        
    } 

}

export default BestMoves