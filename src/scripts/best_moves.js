import { async } from "regenerator-runtime";
import View from "./view"
import Index from '../index.js'

class BestMoves {
    constructor(viewEl, fenString) {
        this.viewEl = viewEl;
        this.fenString = fenString;
        this.displayBestMoves(fenString);
        this.playedMoves = [fenString]
        this.movesWithoutCapture = 0
    }

    fetchBestMoves = async(fenString) => {

        const movesReference = document.createElement('ul');
        this.viewEl.appendChild(movesReference);
        movesReference.setAttribute("class", "MovesReference");
        
        
        await fetch('https://explorer.lichess.ovh/master?' + `${fenString}`)
        .then((response) => response.json())
        .then((data) => {
            
            for(let i = 0; i < data.moves.length; i++) {
                let move = document.createElement('li');
                move.setAttribute('id', `${data.moves[i].uci}`);
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
            if ( (i + 1) % 8 === 0) {
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
    
        fenString += ' KQkq '
        fenString += this.movesWithoutCapture + ' '
        fenString += this.playedMoves.length + 1 
    
        this.playedMoves.push(fenString)
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
            })
            moveIcons[i].addEventListener('mouseout', function() {

                let startingPosElement = document.getElementById(firstPosID);
                let endingPosElement = document.getElementById(lastPosID);
                startingPosElement.style.backgroundColor = null;
                endingPosElement.style.backgroundColor = null;
            })
        }
    }

    resetMoves() {
        let table = document.getElementsByClassName('MovesReference');
        let moveIcons = table[0].childNodes;
    
        
        for(let i = 0; i < moveIcons.length; i++){ 
          moveIcons[i].addEventListener("click", () => {
            let newfenString = this.generateFenString()
            this.fenString = newfenString
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
        
        this.hoverOverMove();
        this.movePiece();
        this.resetMoves();
    }
    

}

export default BestMoves