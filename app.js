// --------------------------------PHASE 1 ---------------------

// STEP 1 — GAMEBOARD MODULE
const gameBoard = (() => {
    const board = [];
    const cells = 9;
    for (let i = 0; i < cells; i++) {
        board.push('');
    }

    const readBoard = () => {
        const readOnly = [...board];
        return readOnly;
    };

    let moveStatus;
    const fillBoard = (position, marker) => {
        if (!(position in board) || board[position] !== '') {
            moveStatus = false;
            alert(`Invalid Move `);
            return;
        }

        board[position] = marker;
        moveStatus = true;
        console.log(board);
        // console.log(moveStatus);
    };
    const getMoveStats = () => {
        return moveStatus;
    };

    const clearBoard = () => {
        board.fill('');
        console.log(board);
    };

    return {
        readBoard,
        fillBoard,
        clearBoard,
        getMoveStats,
    };
})();

// STEP 2 — PLAYER FACTORY
const createPlayer = (name, marker) => {
    const playerName = () => {
        return name;
    };

    const playerMarker = () => {
        return marker;
    };

    return {
        playerName,
        playerMarker,
    };
};

// STEP 3 — GAME CONTROLLER MODULE
const gameController = (() => {
    const newPlayer1 = createPlayer('PlayerX', 'x');
    const newPlayer2 = createPlayer('PlayerO', 'o');
    const gameStatus = {
        finished: false,
        haveAWinner: false,
        aTie: false,
    };

    let currentPlayer = newPlayer1;
    const switchPlayer = () => {
        // currentPlayer === newPlayer1 ? (currentPlayer = newPlayer2) : (currentPlayer = newPlayer1);

        if (currentPlayer === newPlayer1 && !gameStatus.finished && !gameStatus.haveAWinner && !gameStatus.aTie) {
            currentPlayer = newPlayer2;
        } else if (currentPlayer === newPlayer2 && !gameStatus.finished && !gameStatus.haveAWinner && !gameStatus.aTie) {
            currentPlayer = newPlayer1;
        }
    };

    const getCurrentPlayer = () => {
        return currentPlayer;
    };

    const setGameStatus = (status, value) => {
        gameStatus[status] = value;
    };
    const getGameStatus = (status) => {
        return gameStatus[status];
    };

    const restartGame = () => {
        currentPlayer = newPlayer1;
        Object.keys(gameStatus).forEach((key) => {
            gameStatus[key] = false;
        });
        gameBoard.clearBoard();
    };

    return {
        getCurrentPlayer,
        setGameStatus,
        getGameStatus,
        switchPlayer,
        restartGame,
    };
})();

// STEP 4 — MAKING A MOVE
const makeAmove = (position) => {
    if (gameController.getGameStatus('finished') === true) return;

    gameBoard.fillBoard(position, gameController.getCurrentPlayer().playerMarker());

    if (gameBoard.getMoveStats()) {
        checkWin();
        gameController.switchPlayer();
    }
};

// STEP 6 — CHECKING FOR A WIN [Step 5 is switching player logic which alreeady did]
function checkWin() {
    const winingcombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const seeBoard = gameBoard.readBoard();
    const playerMark = gameController.getCurrentPlayer().playerMarker();

    const win = winingcombinations.some((combo) =>
        combo.every((index) => {
            return seeBoard[index] === playerMark;
        }),
    );

    if (win) {
        gameController.setGameStatus('haveAWinner', true);
        gameController.setGameStatus('finished', true);
        console.log(playerMark + ' ' + 'wins');
    } else {
        const tie = seeBoard.every((cell) => {
            return cell !== '';
        });

        if (tie) {
            gameController.setGameStatus('aTie', true);
            gameController.setGameStatus('finished', true);
            console.log('A tie');
        }
    }

    return {
        getPlayermark() {
            return playerMark;
        },
    };
}
// makeAmove(1);
// makeAmove(0);

// PHASE 2 — CONNECT THE GAME TO THE WEBPAGE
const displayController = (() => {
    const playerOneName = document.querySelector('player__one-name');
    const playerTwoName = document.querySelector('player__two-name');

    const playerOneMarker = document.querySelector('player__one-marker');
    const playerTwoMarker = document.querySelector('player__two-marker');

    const gameStatusInfo = document.querySelector('.game__status-info');
    const playTurnsPlayer = document.querySelector('.play__turns-player');

    const UIBoard = document.querySelector('.game__board');
    const restartGameBtn = document.querySelector('.restart__game-btn');

    const boardArr = gameBoard.readBoard();

    const updateUIBoard = (() => {
        boardArr.forEach((cell, index) => {
            const boardCell = document.createElement('div');
            boardCell.dataset.position = index;
            boardCell.classList.add('cell');
            const cellMarker = document.createElement('p');
            cellMarker.classList.add('cell__marker');
            cellMarker.textContent = cell;

            boardCell.appendChild(cellMarker);
            UIBoard.appendChild(boardCell);
        });

        function updateStatusDisplay() {
            if (gameController.getGameStatus('haveAWinner')) {
                gameStatusInfo.textContent = `${gameController.getCurrentPlayer().playerName()} Won this round.`;
            } else if (gameController.getGameStatus('aTie')) {
                gameStatusInfo.textContent = 'Game ends in a tie.';
            } else {
                gameStatusInfo.textContent = 'Ongoing.....';
            }
        }

        function updateTurnsDisplay() {
            if (!gameController.getGameStatus('finished') && !gameController.getGameStatus('haveAWinner') && !gameController.getGameStatus('aTie')) {
                playTurnsPlayer.textContent = gameController.getCurrentPlayer().playerName();
            } else {
                playTurnsPlayer.textContent = 'Game Over';
            }
        }
        // updateTurnsDisplay();

        // STEP 13 — CONNECT CLICKS TO GAME MOVES

        UIBoard.addEventListener('click', (event) => {
            const currentCell = event.target.closest('.cell');
            const cellPosition = Number(currentCell.dataset.position);
            const cellMarker = currentCell.querySelector('.cell__marker');
            makeAmove(cellPosition);

            cellMarker.textContent = gameBoard.readBoard()[cellPosition];
            updateStatusDisplay();
            updateTurnsDisplay();
        });
    })();
})();
