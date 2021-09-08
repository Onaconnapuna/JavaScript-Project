import { async } from "regenerator-runtime";

class BestMoves {
    constructor(viewEl, fenString) {
        this.viewEl = viewEl;
        this.displayBestMoves(fenString);
    }

    fetchBestMoves = async(fenString) => {

        const movesReference = document.createElement('ul');
        this.viewEl.appendChild(movesReference);
        movesReference.setAttribute("class", "MovesReference");

        
        await fetch('https://explorer.lichess.ovh/master?' + `${fenString}`)
            .then((response) => response.json())
            .then((data) => {
                //ebugger
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

    movePiece() {
        let table = document.getElementsByClassName('MovesReference');
        let moveIcons = table[0].childNodes;

        for(let i = 0; i < moveIcons.length; i++){
            let firstPosID = moveIcons[i].id.split('').slice(0, 2).join('');
            let lastPosID = moveIcons[i].id.split('').slice(2).join('');
            moveIcons[i].addEventListener("click", function() {
                let startingPosElement = document.getElementById(firstPosID);
                let endingPosElement = document.getElementById(lastPosID);
                let piece = startingPosElement.childNodes[0]
                let code = piece.innerHTML.charCodeAt(0);
                let movedPiece = document.createElement('div')
                movedPiece.innerHTML = `&#${code}`
                endingPosElement.appendChild(movedPiece)
                startingPosElement.removeChild(startingPosElement.childNodes[0])
            })
        }
    }

    displayBestMoves = async(fenString) => { 

        await this.fetchBestMoves(fenString);

        let table = document.getElementsByClassName('MovesReference');
        let moveIcons = table[0].childNodes;

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
    }
    

}

export default BestMoves