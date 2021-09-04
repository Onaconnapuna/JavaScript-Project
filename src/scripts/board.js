class Board {
    constructor() {
        this.grid = Board.makeGrid();
    }


    static makeGrid() {
        const grid = []

        for (let i = 0; i < 8; i++) {
            grid.push([]);
            for(let j = 0; j < 8; j++) {
                grid[i].push(null); 
            }
        }
        return grid;
    }

} 

export default Board