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
        currentPlayer === newPlayer1 ? (currentPlayer = newPlayer2) : (currentPlayer = newPlayer1);
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

    return {
        getCurrentPlayer,
        setGameStatus,
        getGameStatus,
        switchPlayer,
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
}
