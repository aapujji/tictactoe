const board = () => {
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

    const boardDiv = document.querySelector(".board");

    const _render = () => {
        boardDiv.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const boardCellDiv = document.createElement("div");
            boardCellDiv.classList.add("cell");
            boardCellDiv.dataset.cell = i;
            boardCellDiv.textContent = board[i] ? board[i] : "";
            boardDiv.appendChild(boardCellDiv);
        }
    }

    const createBoard = () => {
        _render();
    }

    const addMarker = (cell, marker) => {
        board[cell] = marker;
        _render();
    }

    const checkForWin = () => {
        for (const pattern of winPatterns) {
            if (board[pattern[0]] && board[pattern[1]] && board[pattern[2]] && 
                board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]]) {
                    return true;
            }
        }
        return false;
    }

    return { createBoard, addMarker, checkForWin };
}

const player = (name, marker) => {
    return { name, marker };
}

(() => {
    const { createBoard, addMarker, checkForWin } = board();
    let currentPlayer = {};
    let firstPlayer = {};
    let secondPlayer = {};
    const setCurrentPlayer = (player) => {
        currentPlayer = player;
    }
    const button = document.querySelector(".start-button");
    button.addEventListener("click", () => {
        createBoard();
        const firstPlayerName = document.querySelector("input#firstPlayer").value || "Player One";
        const secondPlayerName = document.querySelector("input#secondPlayer").value || "Player Two";
        firstPlayer = player(firstPlayerName, "x");
        secondPlayer = player(secondPlayerName, "o");
        setCurrentPlayer(firstPlayer);
    })

    let hasWinner = false;
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("cell") && target.textContent === "") {
            if (!hasWinner) {
                addMarker(target.dataset.cell, currentPlayer.marker);
                if (checkForWin()) {
                    hasWinner = true;
                    console.log(`The winner is ${currentPlayer.name}`);
                } else {
                    setCurrentPlayer(currentPlayer === firstPlayer ? secondPlayer : firstPlayer);
                }
            }
        }
    });

})();