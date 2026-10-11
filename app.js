const gameBoard = (() => {
    const board = [];
    const cells = 9;
    for (let i = 0; i < cells; i++) {
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

const playerFactory = (player, marker) => {
    return {
        getPlayerName() {
            console.log(player);
            return player;
        },

        getPlayerMarker() {
            console.log(marker);
            return marker;
        },
    };
};

const playerX = playerFactory('Adesola', 'X');
const playerO = playerFactory('Muyiwa', 'O');

playerX.getPlayerName();
playerX.getPlayerMarker();
