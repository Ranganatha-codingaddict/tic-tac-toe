// Select all boxes and initialize game state variables
let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

// Get audio elements
const clickSound = document.getElementById("click-sound");
const gameStartSound = document.getElementById("game-start-sound");
const turnSound = document.getElementById("turn-sound");
const victorySound = document.getElementById("victory-sound");
const drawSound = document.getElementById("draw-sound");

function playSound(sound) {
    console.log("Playing sound:", sound); // Debugging log
    sound.play();
}

// Play game start sound when the page loads
window.addEventListener("load", () => {
    playSound(gameStartSound);
});

// Reset each box to initial state
boxes.forEach(box => {
    box.innerHTML = "";
    box.style.removeProperty("background-color");
    box.style.color = "#daf108"; // Reset the color to black
});

// Add click event listener to each box
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            playSound(turnSound);
            checkWin();
            checkDraw();
            changeTurn();
            highlightTurn(); // Call highlightTurn after each move
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "calc(100% / 2)"; // Move right one column
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0"; // Move back to the leftmost position
    }
}

function highlightTurn() {
    const currentPlayerClass = turn === "X" ? "player-X" : "player-O";

    // Remove highlight from all turn boxes
    document.querySelectorAll(".turn-box").forEach(box => {
        box.classList.remove('turn-highlight');
    });

    // Highlight current player's turn
    const currentPlayerBox = document.querySelector(`.${currentPlayerClass}`);
    if (currentPlayerBox) {
        currentPlayerBox.classList.add('turn-highlight');
    }
}

// Function to check for a win
function checkWin() {
    console.log("Checking for win...");
    // Define all possible winning combinations (rows, columns, and diagonals)
    let winConditions = [
        // Rows
        [0, 1, 2, 3, 4], [1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12], [9, 10, 11, 12, 13], [10, 11, 12, 13, 14], [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20], [17, 18, 19, 20, 21], [18, 19, 20, 21, 22], [19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28], [25, 26, 27, 28, 29], [26, 27, 28, 29, 30], [27, 28, 29, 30, 31],
        [32, 33, 34, 35, 36], [33, 34, 35, 36, 37], [34, 35, 36, 37, 38], [35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44], [41, 42, 43, 44, 45], [42, 43, 44, 45, 46], [43, 44, 45, 46, 47],
        [48, 49, 50, 51, 52], [49, 50, 51, 52, 53], [50, 51, 52, 53, 54], [51, 52, 53, 54, 55],
        [56, 57, 58, 59, 60], [57, 58, 59, 60, 61], [58, 59, 60, 61, 62], [59, 60, 61, 62, 63],

        // Columns
        [0, 8, 16, 24, 32], [8, 16, 24, 32, 40], [16, 24, 32, 40, 48], [24, 32, 40, 48, 56],
        [1, 9, 17, 25, 33], [9, 17, 25, 33, 41], [17, 25, 33, 41, 49], [25, 33, 41, 49, 57],
        [2, 10, 18, 26, 34], [10, 18, 26, 34, 42], [18, 26, 34, 42, 50], [26, 34, 42, 50, 58],
        [3, 11, 19, 27, 35], [11, 19, 27, 35, 43], [19, 27, 35, 43, 51], [27, 35, 43, 51, 59],
        [4, 12, 20, 28, 36], [12, 20, 28, 36, 44], [20, 28, 36, 44, 52], [28, 36, 44, 52, 60],
        [5, 13, 21, 29, 37], [13, 21, 29, 37, 45], [21, 29, 37, 45, 53], [29, 37, 45, 53, 61],
        [6, 14, 22, 30, 38], [14, 22, 30, 38, 46], [22, 30, 38, 46, 54], [30, 38, 46, 54, 62],
        [7, 15, 23, 31, 39], [15, 23, 31, 39, 47], [23, 31, 39, 47, 55], [31, 39, 47, 55, 63],

        // Main Diagonals (top-left to bottom-right)
        [0, 9, 18, 27, 36], [1, 10, 19, 28, 37], [2, 11, 20, 29, 38], [3, 12, 21, 30, 39],
        [4, 13, 22, 31, 40], [5, 14, 23, 32, 41], [6, 15, 24, 33, 42], [7, 16, 25, 34, 43],
        [8, 17, 26, 35, 44], [9, 18, 27, 36, 45], [10, 19, 28, 37, 46], [11, 20, 29, 38, 47],
        [12, 21, 30, 39, 48], [13, 22, 31, 40, 49], [14, 23, 32, 41, 50], [15, 24, 33, 42, 51],
        [16, 25, 34, 43, 52], [17, 26, 35, 44, 53], [18, 27, 36, 45, 54], [19, 28, 37, 46, 55],
        [20, 29, 38, 47, 56], [21, 30, 39, 48, 57], [22, 31, 40, 49, 58], [23, 32, 41, 50, 59],
        [24, 33, 42, 51, 60], [25, 34, 43, 52, 61], [26, 35, 44, 53, 62], [27, 36, 45, 54, 63],

          // Anti-Diagonals (top-right to bottom-left)
    [3, 10, 17, 24, 31], [4, 11, 18, 25, 32], [5, 12, 19, 26, 33], [6, 13, 20, 27, 34],
    [7, 14, 21, 28, 35], [8, 15, 22, 29, 36], [9, 16, 23, 30, 37], [10, 17, 24, 31, 38],
    [11, 18, 25, 32, 39], [12, 19, 26, 33, 40], [13, 20, 27, 34, 41], [14, 21, 28, 35, 42],
    [15, 22, 29, 36, 43], [16, 23, 30, 37, 44], [17, 24, 31, 38, 45], [18, 25, 32, 39, 46],
    [19, 26, 33, 40, 47], [20, 27, 34, 41, 48], [21, 28, 35, 42, 49], [22, 29, 36, 43, 50],
    [23, 30, 37, 44, 51], [24, 31, 38, 45, 52], [25, 32, 39, 46, 53], [26, 33, 40, 47, 54],
    [27, 34, 41, 48, 55], [28, 35, 42, 49, 56], [29, 36, 43, 50, 57], [30, 37, 44, 51, 58],
    [31, 38, 45, 52, 59], [32, 39, 46, 53, 60], [33, 40, 47, 54, 61], [34, 41, 48, 55, 62],
    [35, 42, 49, 56, 63]
    ];
    console.log("Win conditions:", winConditions);
    // Iterate through all win conditions
    for (let i = 0; i < winConditions.length; i++) {
        let symbols = winConditions[i].map(index => boxes[index].innerHTML);

        // Check if there are 5 consecutive symbols that are not empty and all the same
        for (let j = 0; j <= symbols.length - 5; j++) {
            let slice = symbols.slice(j, j + 5);
            if (slice.every(symbol => symbol !== "" && symbol === slice[0])) {
                // Game over, highlight winning combination
                isGameOver = true;
                document.getElementById("results").innerHTML = slice[0] + " wins";
                playSound(victorySound);
                document.getElementById("play-again").style.display = "inline";

                // Highlight winning boxes
                winConditions[i].slice(j, j + 5).forEach(index => {
                    boxes[index].style.backgroundColor = "#08D9D6";
                    boxes[index].style.color = "purple";
                });

                return; // Exit function after finding a win
            }
        }
    }

    // Check for draw if all boxes are filled
    let isDraw = true;
    boxes.forEach(box => {
        if (box.innerHTML === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        isGameOver = true;
        document.getElementById("results").innerHTML = "Draw";
        document.getElementById("play-again").style.display = "inline";
    }
}

// Function to check for draw
function checkDraw() {
    if (!isGameOver && Array.from(boxes).every(box => box.innerHTML !== "")) {
        isGameOver = true;
        document.getElementById("results").innerHTML = "Draw";
        playSound(drawSound);
        document.getElementById("play-again").style.display = "inline";
    }
}

// Event listener for the play again button
document.getElementById("play-again").addEventListener("click", function() {
    // Reset game state
    playSound(clickSound);
    isGameOver = false;
    turn = "X";
    document.getElementById("results").innerHTML = "";

    // Reset all boxes
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
    });

    // Hide the Play Again button again
    document.getElementById("play-again").style.display = "none";
});
