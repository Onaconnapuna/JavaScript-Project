import { async } from "regenerator-runtime";
import View from "./view.js"

class BestMoves {
    constructor(viewEl, fenString) {
        this.viewEl = viewEl;
        this.bestMoves = this.fetchBestMoves(fenString)
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

    // letsSee(fenString) {
    //     const moves = this.fetchBestMoves(fenString)
    //     console.log(moves)
    // }
    // fetchBestMoves = async(fenString) => {

    //     let bestMoves;

    //     await fetch('https://explorer.lichess.ovh/master?' + `${fenString}`)
    //         .then((response) => {
    //             return response.json()
    //                 .then((data) => {
    //                     console.log(data.moves)
    //                     bestMoves = data.moves
    //                 })
    //             })
    //             .catch("There was an error")
    //         return bestMoves
        
    // }

    // createBestMoves = async(fenString) => {

    //     this.fetchBestMoves(fenString)

    //     const movesReference = document.createElement('ul');
    //     this.viewEl.appendChild(movesReference);
    //     movesReference.setAttribute("class", "movesReference");
    //     for(let i = 0; i < 12; i++) {
    //         let move = document.createElement('li');
    //         move.setAttribute('id', `${this.bestMoves[0][i].uci}`);
    //         movesReference.appendChild(move);
    //     }
    // }



}

export default BestMoves