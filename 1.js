let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

// Get audio elements
const clickSound = document.getElementById("click-sound");
const gameStartSound = document.getElementById("game-start-sound");
const turnSound = document.getElementById("turn-sound");
const victorySound = document.getElementById("victory-sound");
const drawSound = document.getElementById("draw-sound");

// Function to play a sound
function playSound(sound) {
    console.log("Playing sound:", sound); // Debugging log
    sound.play();
}

// Play game start sound when the page loads
window.addEventListener("load", () => {
    playSound(gameStartSound);
});

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            playSound(turnSound); // Play turn sound when a move is made
            checkWin();
            checkDraw();
            changeTurn();
            highlightTurn();
        }
    });
});

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "calc(100% / 2)";
}

function highlightTurn() {
    const currentPlayer = turn === "X" ? "Player X" : "Player O";

    // Remove highlight from all boxes
    boxes.forEach(box => {
        box.classList.remove('turn-highlight');
    });

    // Highlight current player's turn
    document.querySelector(".turn-box:nth-child(" + (turn === "X" ? 1 : 2) + ")").classList.add('turn-highlight');
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winConditions) {
        let symbols = condition.map(index => boxes[index].innerHTML);
        if (symbols.every(symbol => symbol === "X") || symbols.every(symbol => symbol === "O")) {
            isGameOver = true;
            document.getElementById("results").innerHTML = turn + " wins";
            playSound(victorySound); // Play victory sound
            document.getElementById("play-again").style.display = "inline";

            condition.forEach(index => {
                boxes[index].style.backgroundColor = "#08d9d6";
                boxes[index].style.color = "#000";
            });

            return;
        }
    }
}

function checkDraw() {
    if (!isGameOver && Array.from(boxes).every(box => box.innerHTML !== "")) {
        isGameOver = true;
        document.getElementById("results").innerHTML = "Draw";
        playSound(drawSound); // Play draw sound
        document.getElementById("play-again").style.display = "inline";
    }
}

document.getElementById("play-again").addEventListener("click", () => {
    playSound(clickSound); // Play click sound when Play Again button is clicked
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.getElementById("results").innerHTML = "";
    document.getElementById("play-again").style.display = "none";

    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "black";
    });
});
