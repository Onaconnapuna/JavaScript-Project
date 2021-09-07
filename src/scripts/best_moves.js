import { async } from "regenerator-runtime";

class BestMoves {
    constructor(viewEl, fenString) {
        this.viewEl = viewEl;
        // this.bestMoves = this.fetchBestMoves(fenString);
        // setTimeout(() => {
        //     this.displayBestMoves()
        // }, 1)
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

    displayBestMoves = async(fenString) => { 

        await this.fetchBestMoves(fenString);

        debugger

        let table = document.getElementsByClassName('MovesReference');
        let moveIcons = table[0].childNodes;

        for(let i = 0; i < moveIcons.length; i++) {
            let firstPosID = moveIcons[i].id.split('').slice(0, 2).join('')
            let boardPos = document.getElementById(firstPosID);
            let piece = document.createElement('div');
            piece.innerHTML = `${boardPos.firstChild.innerHTML}`;
            moveIcons[i].appendChild(piece);
        }
        console.log('I fired')
    }

}

export default BestMoves