const playerFactory = function () {
    let playerName;
    let playerMarker;

    return {
        addDetails(name, marker) {
            playerName = name;
            playerMarker = marker;
        },

        getPlayerInfo() {
            console.log(`player name: ${playerName} || player marker: ${playerMarker}`);
        },
    };
};
