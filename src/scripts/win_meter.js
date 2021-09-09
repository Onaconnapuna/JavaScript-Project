class Meter {
    constructor() {
        this.makeWinMeter();
    }


    makeWinMeter() {

        const winMeter = document.getElementById('winMeter')

        let whiteWinMeter = document.createElement('METER')
        whiteWinMeter.setAttribute('id', 'white')
        whiteWinMeter.min = "0"
        whiteWinMeter.max = "100"
        whiteWinMeter.value = "33"
        winMeter.appendChild(whiteWinMeter)

        let drawMeter = document.createElement('METER')
        drawMeter.setAttribute('id', 'draw')
        drawMeter.min = "0"
        drawMeter.max = "100"
        drawMeter.value = "33"
        winMeter.appendChild(drawMeter)

        let blackWinMeter = document.createElement('METER')
        blackWinMeter.setAttribute('id', 'black')
        blackWinMeter.min = "0"
        blackWinMeter.max = "100"
        blackWinMeter.value = "33"
        winMeter.appendChild(blackWinMeter)

    }
}

export default Meter