const createBoard = () => {
    const board = [];
    const addMarker = (location, marker) => {
        board[location] = marker;
    }
    return { board, addMarker };
}

const createPlayer = (name, marker) => {
    return { name, marker };
}

const createGame = () => {
    const gameBoard = createBoard();
    const player1 = createPlayer("Aana", "x");
    const player2 = createPlayer("Joe", "o");
    console.log(gameBoard, player1, player2);

    

    // const foundWin = false;
    // const winPatterns = [
    //     [0,1,2],
    //     [3,4,5],
    //     [6,7,8],
    //     [0,3,6],
    //     [1,4,7],
    //     [2,5,8],
    //     [0,4,8],
    //     [2,4,6]
    // ];
    // const checkForWin = () => {
    //     for (pattern in winPatterns) {
    //         foundWin = pattern.every(value => value === pattern[0]);
    //     }
    // }
}

createGame();

// object for the board
    // has a function to create a new board; board.create
    // has a function to enter a marker in a specified location
    // has a function that returns if a win exists

// object for players
    // has a function to create a new player with a name and a marker

// object that creates a new game
    // calls the create board function
    // calls the player function twice (one for each player)
    // calls the board function to place a marker
    // calls a function to check for a win