/* JavaScript Code ... ES6 Syntax */

(() => {
    const board = document.getElementById("connect-four");
    const columns = board.querySelectorAll(".column");
    const positions = board.querySelectorAll(".position");
    let currentPlayerNumber = 1;
    const diags = [
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

    const getDiags = () => {
        diags.forEach((diagIndex) => {
            const diag = [];
            for (let i = 0; i < diagIndex.length; i++) {
                const currentDiagIndex = diagIndex[i];
                diag.push(positions[currentDiagIndex]);
            }
            checkWinner(diag);
        });
    };

    const getRowPositions = (rowIndex) => {
        const row = [];
        for (let i = 0; i < columns.length; i++) {
            const current = columns[i];
            const currentColomnu = current.querySelectorAll(".position");
            const position = currentColomnu[rowIndex];
            row.push(position);
        }
        return row;
    };

    const checkWinner = (positions) => {
        let count = 0;
        for (let i = 0; i < positions.length; i++) {
            const current = positions[i];
            if (current.classList.contains("player-" + currentPlayerNumber)) {
                count++;
                if (count === 4) {
                    alert("player-" + currentPlayerNumber + " is the winner");
                    location.reload();
                }
            } else {
                count = 0;
            }
        }
    };

    const getRowIndex = (columnsPosition) => {
        for (let i = columnsPosition.length - 1; i >= 0; i--) {
            const current = columnsPosition[i];
            console.log(current);
            const isTaken =
                current.classList.contains("player-1") ||
                current.classList.contains("player-2");

            if (!isTaken) {
                return i;
            }
        }
        console.log("-1");
        return -1;
    };

    const switchPlayer = (playerTurn) => {
        if (currentPlayerNumber === 1) {
            currentPlayerNumber = 2;
            playerTurn.innerText = "Your turn: " + currentPlayerNumber;
        } else {
            currentPlayerNumber = 1;
            playerTurn.innerText = "Your turn: " + currentPlayerNumber;
        }
    };

    for (let column of columns) {
        column.addEventListener("click", (event) => {
            const playerTurn = document.getElementById("player-turn");
            const columnsPosition = event.currentTarget.querySelectorAll(
                ".position"
            );
            console.log(columnsPosition);
            const rowIndex = getRowIndex(columnsPosition);
            columnsPosition[rowIndex].classList.add(
                "player-" + currentPlayerNumber
            );

            checkWinner(columnsPosition);
            const rowPosition = getRowPositions(rowIndex);
            checkWinner(rowPosition);
            getDiags();
            console.log("Player ", currentPlayerNumber);
            switchPlayer(playerTurn);
        });
    }
})();
