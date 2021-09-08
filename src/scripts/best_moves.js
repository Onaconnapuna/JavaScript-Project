import { async } from "regenerator-runtime";
import View from "./view"
import Index from '../index.js'

class BestMoves {
    constructor(viewEl, fenString) {
        this.viewEl = viewEl;
        this.displayBestMoves(fenString);
    }

    fetchBestMoves = async(fenString) => {

        const movesReference = document.createElement('ul');
        // let movesReference = document.getElementsByClassName('MovesReference')
        this.viewEl.appendChild(movesReference);
        movesReference.setAttribute("class", "MovesReference");
        // movesReference = document.getElementsByClassName('MovesReference');

        
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
          moveIcons[i].document.addEventListener('click', () => {
            fenString = generateFenString()
            moves = new BestMoves(movesTable, fenString)
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
        this.resetMoves
    }
    

}

export default BestMoves