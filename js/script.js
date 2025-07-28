const gameBoard = () => {
    const board = [];
    const winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const checkForWin = () => {
        for (const pattern of winPatterns) {
            if (board[pattern[0]] && board[pattern[1]] && board[pattern[2]] && 
                board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]]) {
                    return true;
            }
        }
        return false
    }
    const checkForTie = () => {
        if (board.length === 9 && !checkForWin()) {
            return true;
        }
        return false;
    }
    const addMarker = (location, marker) => {
        board[location] = marker;
    }
    return { board, addMarker, checkForWin, checkForTie };
}

const player = (name, marker) => {
    return { name, marker };
}

const createGame = () => {
    const newBoard = gameBoard();
    const player1 = player("Aana", "x");
    const player2 = player("Joe", "o");
    let currentPlayer = player1;
    const setCurrentPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        return currentPlayer;
    }
    const cacheDom = () => {
        this.container = document.querySelector(".container");
    }
    const render = () => {
        console.log(`Player 1 ${player1.name} is ${player1.marker}`);
        console.log(`Player 2 ${player2.name} is ${player2.marker}`);
    }
    while (!newBoard.checkForWin() && !newBoard.checkForTie()) {
        const location = prompt(`${currentPlayer.name}, enter a location on the board:`);
        newBoard.addMarker(location, currentPlayer.marker);
        render();
        if (!newBoard.checkForWin())
            setCurrentPlayer();
    }
    if (newBoard.checkForTie()) {
        console.log("This was a tie");
    }
    if (newBoard.checkForWin()) {
        console.log(`${currentPlayer.name} has won!`);
    }
}
createGame();