/* jQuery Code */

var $board = $(".connect-four");
var $columns = $board.find(".column");
var $positions = $board.find(".position");
var currentPlayer = 1;
var diags = [
    [2, 9, 16, 23],
    [1, 8, 15, 22, 29],
    [0, 7, 14, 21, 28, 35],
    [6, 13, 20, 27, 34, 41],
    [12, 19, 26, 33, 40],
    [18, 25, 32, 39],
    [23, 28, 33, 38],
    [17, 22, 27, 32, 37],
    [11, 16, 21, 26, 31, 36],
    [5, 10, 15, 20, 25, 30],
    [4, 9, 14, 19, 24],
    [3, 8, 13, 28],
];

$columns.on("click", function (event) {
    const $playerTurn = document.getElementById("player-turn");
    var $column = $(this);
    var $columnPositions = $column.find(".position");

    var rowIndex = getRowIndex($columnPositions);
    $columnPositions.eq(rowIndex).addClass("player-" + currentPlayer);
    if (rowIndex < 0) {
        return;
    }

    // check the column winner
    checkWinner($columnPositions);
    // check the row winner
    var $rowPositions = getRowPositions(rowIndex);

    checkWinner($rowPositions);
    getDiagos();
    console.log("Player", currentPlayer);
    switchPlayer($playerTurn);
});

function getDiagos() {
    diags.forEach(function (diagIndex) {
        var $diag = $();
        for (var i = 0; i < diagIndex.length; i++) {
            var currentDiagIndex = diagIndex[i];
            $diag = $diag.add($positions.eq(currentDiagIndex));
        }
        checkWinner($diag);
    });
}

function getRowPositions(rowIndex) {
    // create empty jquery collection
    var $row = $();

    for (var i = 0; i < $columns.length; i++) {
        var $currentColumn = $columns.eq(i);
        var $columnPositions = $currentColumn.find(".position");
        var $position = $columnPositions.eq(rowIndex);
        $row = $row.add($position);
    }
    return $row;
}

function checkWinner($positions) {
    var count = 0;
    for (var i = 0; i < $positions.length; i++) {
        var $current = $positions.eq(i);
        if ($current.hasClass("player-" + currentPlayer)) {
            count++;
            if (count == 4) {
                alert("player-" + currentPlayer + " is the winner");
                location.reload();
            }
        } else {
            count = 0;
        }
    }
}

function getRowIndex(columnPositions) {
    for (var i = columnPositions.length - 1; i >= 0; i--) {
        var $currentColumn = columnPositions.eq(i);
        var isTaken =
            $currentColumn.hasClass("player-1") ||
            $currentColumn.hasClass("player-2");

        if (!isTaken) {
            return i;
        }
    }
    console.log("-1");
    return -1;
}

function switchPlayer($playerTurn) {
    if (currentPlayer === 1) {
        currentPlayer = 2;
        $playerTurn.innerText = "Your turn: " + currentPlayer;
    } else {
        currentPlayer = 1;
        $playerTurn.innerText = "Your turn: " + currentPlayer;
    }
}
