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
        gameController.switchPlayer();
    }

    // The winning condition goes below
};
