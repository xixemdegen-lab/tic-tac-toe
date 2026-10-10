const gameBoard = (() => {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push('');
    }

    const boardState = function () {
        console.log([...board]);
        return [...board];
    };
    const boardEntries = function (index, marker) {
        if (!(index in board) || board[index] !== '') return;
        board[index] = marker.toUpperCase();
    };
    const clearBoard = function () {
        board.fill('');
    };

    return {
        boardState,
        boardEntries,
        clearBoard,
    };
})();
