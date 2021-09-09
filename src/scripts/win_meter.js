class Meter {
    constructor() {
        this.makeWinMeter();
        // this.displayWinPercClick();
    }


    makeWinMeter() {

        const winMeter = document.getElementById('winMeter')

        let whiteWinMeter = document.createElement('METER')
        whiteWinMeter.setAttribute('id', 'white')
        whiteWinMeter.min = "0"
        whiteWinMeter.max = "100"
        whiteWinMeter.value = "0"
        winMeter.appendChild(whiteWinMeter)

        let drawMeter = document.createElement('METER')
        drawMeter.setAttribute('id', 'draw')
        drawMeter.min = "0"
        drawMeter.max = "100"
        drawMeter.value = "0"
        winMeter.appendChild(drawMeter)

        let blackWinMeter = document.createElement('METER')
        blackWinMeter.setAttribute('id', 'black')
        blackWinMeter.min = "0"
        blackWinMeter.max = "100"
        blackWinMeter.value = "0"
        winMeter.appendChild(blackWinMeter)

    }

    // displayWinPercClick() {
    //     let table = document.getElementsByClassName('MovesReference');
    //     let moveIcons = table[0].childNodes;

    //     for(let i = 0; i < moveIcons.length; i++) {
    //         moveIcons[i].addEventListener("click", function() {
    //             let whiteMeter = document.getElementById('white');
    //             let drawMeter = document.getElementById('draw')
    //             let blackMeter = document.getElementById('black');

    //             let totalValues = moveIcons[i].dataset.white.parseInt() + moveIcons[i].dataset.black.parseInt() + moveIcons[i].dataset.draws.parseInt()
    //             let white = moveIcons[i].dataset.white.parseInt() / totalValues
    //             let draw = moveIcons[i].dataset.draws.parseInt() / totalValues
    //             let black = moveIcons[i].dataset.white.parseInt() / totalValues

    //             whiteMeter.value = Math.round(white * 100)
    //             drawMeter.value = Math.round(draw * 100)
    //             blackMeter.value = Math.round(black * 100)
    //         })
    //     }
    // }
}

export default Meter