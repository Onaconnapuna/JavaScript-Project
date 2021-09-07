class BestMoves {
    constructor(viewEl, fenString) {
        this.viewEl = viewEl;
        this.bestMoves = this.fetchBestMoves(fenString)
        // setTimeout(() => {
        //     this.displayMovePiece
        // }, 1)
        this.displayMovePiece()
    }

    fetchBestMoves = async(fenString) => {

        const movesReference = document.createElement('ul');
        this.viewEl.appendChild(movesReference);
        movesReference.setAttribute("class", "movesReference");

        
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

    displayMovePiece() { 

        // setTimeout(this.fetchBestMoves(fenString))

        let table = document.getElementsByClassName('movesReference');
        let moveIcons = table[0].childNodes;

        for(let i = 0; i < moveIcons.length; i++) {
            firstPosID = moveIcons[i].id.split('').slice(0, 2).join('')
            boardPos = document.getElementById(firstPosID);
            let piece = document.createElement('div');
            piece.innerHTML = `${boardPos.firstChild.innerHTML}`;
            moveIcons[i].appendChild(piece);
        }
    }

}

export default BestMoves