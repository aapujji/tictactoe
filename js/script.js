function GameBoard() {
    const board = new Array(9).fill("");

    const getBoard = () => {
        return board;
    }

    const addMarker = (cell, marker) => {
        board[cell] = marker;
    }

    const printBoard = () => {
        const matrix = `${board[0]} | ${board[1]} | ${board[2]}\n------\n${board[3]} | ${board[4]} | ${board[5]}\n------\n${board[6]} | ${board[7]} | ${board[8]}`;
        console.log(matrix);
    }

    return { getBoard, addMarker, printBoard }
}

function GameController(firstPlayerName, secondPlayerName) {
    const newBoard = GameBoard();

    const firstPlayer = {
        name: firstPlayerName,
        marker: "x",
    };
    const secondPlayer = {
        name: secondPlayerName,
        marker: "o",
    };
    let winner = false;
    let currentPlayer = firstPlayer;
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

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const getWinner = () => {
        return winner;
    }

    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
    }

    const playTurn = (cell) => {
        newBoard.addMarker(cell, currentPlayer.marker);
        newBoard.printBoard();

        const board = newBoard.getBoard();
        for (const pattern of winPatterns) {
            if (board[pattern[0]] && board[pattern[1]] && board[pattern[2]] && board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]]) {
                console.log(`${currentPlayer.name} is the winner!`);
                winner = true;
                return;
            }
        }

        switchCurrentPlayer();
    }

    return { getWinner, getCurrentPlayer, playTurn, getBoard: newBoard.getBoard }
}

const UIController = () => {
    // dom cache
    const boardDiv = document.querySelector(".board");
    const firstPlayerName = document.querySelector("input#firstPlayer").value || "Player One";
    const secondPlayerName = document.querySelector("input#secondPlayer").value || "Player Two";

    const newGame = GameController(firstPlayerName, secondPlayerName);
    const board = newGame.getBoard();

    const updateBoardUI = () => {
        boardDiv.textContent = "";
        board.map((content, cell) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.dataset.cell = cell;
            cellDiv.textContent = content;
            boardDiv.appendChild(cellDiv);
        })
    }

    updateBoardUI();

    document.addEventListener("click", (e) => {
        const classList = e.target.classList;
        if (!classList.contains("cell")) return;
        if (!newGame.getWinner()) {
            newGame.playTurn(target.dataset.cell);
            updateBoardUI();
        }
    })
}

(() => {
    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", () => {
        UIController();
    });
})();