// Create a Gameboard module using an IIFE.
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
