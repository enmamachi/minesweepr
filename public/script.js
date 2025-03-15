const width = 10;
const height = 10;
const mines = 10;
let minefield = [];
let revealed = [];
let gameOver = false;

function createMinefield() {
    minefield = Array.from({ length: height }, () => Array(width).fill(0));
    revealed = Array.from({ length: height }, () => Array(width).fill(false));

    // Place mines
    let mineCount = 0;
    while (mineCount < mines) {
        const x = Math.floor(Math.random() * height);
        const y = Math.floor(Math.random() * width);
        if (minefield[x][y] !== -1) {
            minefield[x][y] = -1;
            mineCount++;
            updateSurroundingCells(x, y);
        }
    }
}

function updateSurroundingCells(x, y) {
    for (let i = Math.max(0, x - 1); i <= Math.min(height - 1, x + 1); i++) {
        for (let j = Math.max(0, y - 1); j <= Math.min(width - 1, y + 1); j++) {
            if (minefield[i][j] !== -1) {
                minefield[i][j]++;
            }
        }
    }
}

function revealCell(x, y) {
    if (gameOver || revealed[x][y]) return;

    revealed[x][y] = true;
    const button = document.getElementById(`cell-${x}-${y}`);

    if (minefield[x][y] === -1) {
        button.innerText = '*';
        button.style.backgroundColor = 'red';
        gameOver = true;
        alert('Game Over!');
        revealAllMines();
    } else {
        button.innerText = minefield[x][y] > 0 ? minefield[x][y] : '';
        button.disabled = true;

        if (minefield[x][y] === 0) {
            for (let i = Math.max(0, x - 1); i <= Math.min(height - 1, x + 1); i++) {
                for (let j = Math.max(0, y - 1); j <= Math.min(width - 1, y + 1); j++) {
                    revealCell(i, j);
                }
            }
        }
    }
}

function revealAllMines() {
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            if (minefield[x][y] === -1) {
                const button = document.getElementById(`cell-${x}-${y}`);
                button.innerText = '*';
                button.style.backgroundColor = 'red';
            }
        }
    }
}

function createGameBoard
