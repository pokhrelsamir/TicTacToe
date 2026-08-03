const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

updateStatus();

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

function handleClick() {

    const index = this.dataset.index;

    if (!gameActive || board[index] !== "") {
        return;
    }

    board[index] = currentPlayer;

    this.textContent = currentPlayer;
    this.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusText.textContent = "🤝 It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
}

function checkWinner() {

    for (const pattern of winPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            statusText.innerHTML = `🎉 Player <span>${currentPlayer}</span> Wins!`;

            gameActive = false;

            return true;
        }
    }

    return false;
}

function updateStatus() {
    statusText.innerHTML = `Player <span>${currentPlayer}</span>'s Turn`;
}

function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell";
    });

    updateStatus();
}