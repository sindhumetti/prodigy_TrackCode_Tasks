const cells = document.querySelectorAll("[data-cell]");
const winnerMessage = document.getElementById("winnerMessage");
const winnerText = document.getElementById("winnerText");
const restartButton = document.getElementById("restartButton");

let isCircleTurn = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove("taken");
        cell.textContent = "";
        cell.addEventListener("click", handleClick, { once: true });
    });
    winnerMessage.classList.remove("show");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? "O" : "X";

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
    cell.classList.add("taken");
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === "X" || cell.textContent === "O";
    });
}

function endGame(draw) {
    if (draw) {
        winnerText.textContent = "It's a Draw!";
    } else {
        winnerText.textContent = `${isCircleTurn ? "O" : "X"} Wins!`;
    }
    winnerMessage.classList.add("show");
}

restartButton.addEventListener("click", startGame);

startGame();
