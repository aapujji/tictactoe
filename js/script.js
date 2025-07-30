function GameBoard() {
    const board = new Array(9).fill("");

    const getBoard = () => board;

    const addMarker = (cell, marker) => board[cell] = marker;

    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return { getBoard, addMarker, clearBoard }
}

function GameController(firstPlayerName, secondPlayerName) {
    const newBoard = GameBoard();
    let isTie = false;
    let winPattern = [];
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

    const firstPlayer = {
        name: firstPlayerName,
        marker: "x",
    };
    const secondPlayer = {
        name: secondPlayerName,
        marker: "o",
    };
    let currentPlayer = firstPlayer;

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const getIsTie = () => {
        return isTie;
    }

    const getWinPattern = () => {
        return winPattern;
    }

    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
    }

    const playTurn = (cell) => {
        newBoard.addMarker(cell, currentPlayer.marker);

        const board = newBoard.getBoard();

        for (const pattern of winPatterns) {
            if (board[pattern[0]] && board[pattern[1]] && board[pattern[2]] && 
                board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]]) {
                    winPattern = Object.values(pattern);
                    return;
            }
        }

        const boardFull = board.filter((cell) => !cell);
        if (!boardFull.length) {
            isTie = true;
            return;
        }

        switchCurrentPlayer();
    }

    const resetGame = () => {
        newBoard.clearBoard();
        isTie = false;
        winPattern = [];
        switchCurrentPlayer();
    }

    return { getIsTie, getWinPattern, getCurrentPlayer, switchCurrentPlayer, playTurn, getBoard: newBoard.getBoard, resetGame }
}

const UIController = () => {
    // dom cache
    const boardDiv = document.querySelector(".board");
    const form = document.querySelector(".form");
    const playerBoardDiv = document.querySelector(".player-board");
    const currentPlayerDiv = document.querySelector(".current-player");
    const firstPlayerName = document.querySelector("input#firstPlayer").value || "Player One";
    const secondPlayerName = document.querySelector("input#secondPlayer").value || "Player Two";
    const resetButton = document.querySelector(".reset-button");

    const hideElement = (elem) => {
        elem.classList.add("hidden");
    }

    const showElement = (elem) => {
        elem.classList.remove("hidden");
    }

    const createUIElement = (tag, attributes = {}, children = []) => {
        const elem = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            if (key in elem) elem[key] = value;
            else elem.setAttribute(key,value);
        });
        if (children) children.map((childElem) => elem.appendChild(childElem))
        return elem;
    }

    hideElement(form);
    playerBoardDiv.querySelector(".first-player").textContent = `${firstPlayerName} (x)`;
    playerBoardDiv.querySelector(".second-player").textContent = `${secondPlayerName} (o)`;
    showElement(playerBoardDiv);
    showElement(boardDiv);

    const newGame = GameController(firstPlayerName, secondPlayerName);
    const board = newGame.getBoard();

    const updateBoardUI = () => {
        boardDiv.textContent = "";
        board.map((content, cell) => {
            const cellDiv = createUIElement("button", {class: "cell", "data-cell": cell});
            if (content) {
                const markerClass = content === "x" ? "xmark" : "omark";
                cellDiv.classList.add(markerClass);
            }
            boardDiv.appendChild(cellDiv);
        })
        const currentPlayer = newGame.getCurrentPlayer();
        if (currentPlayer.marker === "x") {
            currentPlayerDiv.classList.add("first");
            currentPlayerDiv.classList.remove("second");
        } else {
            currentPlayerDiv.classList.add("second");
            currentPlayerDiv.classList.remove("first");
        }
        currentPlayerDiv.textContent = `${currentPlayer.name}'s turn`;
        if (newGame.getWinPattern().length) {
                currentPlayerDiv.textContent = `${currentPlayer.name} won!`;
                showElement(resetButton);
                const cellDivs = boardDiv.querySelectorAll(".cell");
                cellDivs.forEach((cellDiv) => {
                    console.log(typeof newGame.getWinPattern()[0]);
                    if (newGame.getWinPattern().includes(Number(cellDiv.dataset.cell))) {
                        cellDiv.classList.add("win");
                    }
                });
        } else if (newGame.getIsTie()) {
            currentPlayerDiv.textContent = "It's a tie!";
            showElement(resetButton);
        }
    }

    updateBoardUI();

    document.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("cell")) {
            if (!newGame.getIsTie()) {
                newGame.playTurn(target.dataset.cell);
            }
        } else if (target.classList.contains("reset-button")) {
            hideElement(target);
            newGame.resetGame();
        }
        updateBoardUI();
    })
}

(() => {
    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", () => {
        UIController();
    });
})();