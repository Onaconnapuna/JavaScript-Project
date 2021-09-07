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
        console.log(moveIcons);
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

    displayBestMoves = async(fenString) => { 

        await this.fetchBestMoves(fenString);

        let table = document.getElementsByClassName('MovesReference');
        let moveIcons = table[0].childNodes;

        for(let i = 0; i < moveIcons.length; i++) {
            let firstPosID = moveIcons[i].id.split('').slice(0, 2).join('')
            let boardPos = document.getElementById(firstPosID);
            let piece = document.createElement('div');
            piece.innerHTML = `${boardPos.firstChild.innerHTML}`;
            moveIcons[i].appendChild(piece);
        }

        this.hoverOverMove();

    }




}

export default BestMoves