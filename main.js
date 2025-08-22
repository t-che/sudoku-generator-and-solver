// Global variables
let grid = Array.from({ length: 9 }, () => Array(9).fill(0));
let solution = Array.from({ length: 9 }, () => Array(9).fill(0));
let inputs = [];
let timerInterval;
let seconds = 0;
let isDarkTheme = false;
let hintsLeft = 3;
let selectedCell = null;
let isCustomMode = false;

// Initialize the grid
function initGrid() {
    const sudokuGrid = document.getElementById('sudoku-grid');
    sudokuGrid.innerHTML = '';
    inputs = [];
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cellContainer = document.createElement('div');
            cellContainer.className = 'cell-container';
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.dataset.row = i;
            input.dataset.col = j;
            
            input.addEventListener('input', (e) => {
                const val = e.target.value;
                const row = parseInt(e.target.dataset.row);
                const col = parseInt(e.target.dataset.col);
                
                // Обычный режим
                if (!/^[1-9]$/.test(val)) {
                    e.target.value = '';
                    grid[row][col] = 0;
                } else {
                    grid[row][col] = parseInt(val);
                    
                    // В режиме своей игры проверяем на корректность
                    if (isCustomMode) {
                        // Проверка на конфликты
                        checkErrors();
                        
                        // Если есть ошибка, показываем сообщение
                        if (e.target.classList.contains('error')) {
                            document.getElementById('message').textContent = 'Конфликт чисел!';
                            document.getElementById('message').className = 'error';
                        } else {
                            document.getElementById('message').textContent = '';
                            document.getElementById('message').className = '';
                        }
                    } else {
                        // В обычном режиме проверяем на правильность решения
                        if (solution[row][col] !== grid[row][col]) {
                            e.target.classList.add('error');
                            document.getElementById('message').textContent = 'Неверное число!';
                            document.getElementById('message').className = 'error';
                        } else {
                            e.target.classList.remove('error');
                            document.getElementById('message').textContent = '';
                            document.getElementById('message').className = '';
                            
                            // Проверка решения
                            if (isSolved()) {
                                document.getElementById('message').textContent = 'Поздравляем! Вы решили судоку!';
                                clearInterval(timerInterval);
                            }
                        }
                    }
                }
            });
            
            input.addEventListener('focus', (e) => {
                // Remove highlight from all cells
                inputs.forEach(input => input.classList.remove('highlight'));
                
                // Highlight related cells
                const row = parseInt(e.target.dataset.row);
                const col = parseInt(e.target.dataset.col);
                highlightRelatedCells(row, col);
                
                selectedCell = e.target;
            });
            
            cellContainer.appendChild(input);
            sudokuGrid.appendChild(cellContainer);
            inputs.push(input);
        }
    }
}

// Highlight related cells
function highlightRelatedCells(row, col) {
    // Highlight row and column
    for (let i = 0; i < 9; i++) {
        // Same row
        const rowInput = inputs.find(input => 
            parseInt(input.dataset.row) === row && 
            parseInt(input.dataset.col) === i
        );
        if (rowInput) rowInput.classList.add('highlight');
        
        // Same column
        const colInput = inputs.find(input => 
            parseInt(input.dataset.row) === i && 
            parseInt(input.dataset.col) === col
        );
        if (colInput) colInput.classList.add('highlight');
    }
    
    // Highlight 3x3 block
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            const blockInput = inputs.find(input => 
                parseInt(input.dataset.row) === i && 
                parseInt(input.dataset.col) === j
            );
            if (blockInput) blockInput.classList.add('highlight');
        }
    }
    
    // Highlight same numbers
    const value = grid[row][col];
    if (value !== 0) {
        inputs.forEach(input => {
            const inputRow = parseInt(input.dataset.row);
            const inputCol = parseInt(input.dataset.col);
            if (grid[inputRow][inputCol] === value) {
                input.classList.add('highlight');
            }
        });
    }
}

// Check for errors (duplicates)
function checkErrors() {
    // Reset all errors
    inputs.forEach(input => {
        if (!input.classList.contains('generated')) {
            input.classList.remove('error');
        }
    });
    
    // Check rows and columns for duplicates
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] !== 0) {
                // Check row
                for (let k = 0; k < 9; k++) {
                    if (k !== j && grid[i][k] === grid[i][j]) {
                        const input = inputs.find(inp => 
                            parseInt(inp.dataset.row) === i && 
                            parseInt(inp.dataset.col) === j
                        );
                        if (input) input.classList.add('error');
                        
                        const otherInput = inputs.find(inp => 
                            parseInt(inp.dataset.row) === i && 
                            parseInt(inp.dataset.col) === k
                        );
                        if (otherInput) otherInput.classList.add('error');
                    }
                }
                
                // Check column
                for (let k = 0; k < 9; k++) {
                    if (k !== i && grid[k][j] === grid[i][j]) {
                        const input = inputs.find(inp => 
                            parseInt(inp.dataset.row) === i && 
                            parseInt(inp.dataset.col) === j
                        );
                        if (input) input.classList.add('error');
                        
                        const otherInput = inputs.find(inp => 
                            parseInt(inp.dataset.row) === k && 
                            parseInt(inp.dataset.col) === j
                        );
                        if (otherInput) otherInput.classList.add('error');
                    }
                }
                
                // Check 3x3 block
                const startRow = Math.floor(i / 3) * 3;
                const startCol = Math.floor(j / 3) * 3;
                
                for (let x = startRow; x < startRow + 3; x++) {
                    for (let y = startCol; y < startCol + 3; y++) {
                        if (x !== i && y !== j && grid[x][y] === grid[i][j]) {
                            const input = inputs.find(inp => 
                                parseInt(inp.dataset.row) === i && 
                                parseInt(inp.dataset.col) === j
                            );
                            if (input) input.classList.add('error');
                            
                            const otherInput = inputs.find(inp => 
                                parseInt(inp.dataset.row) === x && 
                                parseInt(inp.dataset.col) === y
                            );
                            if (otherInput) otherInput.classList.add('error');
                        }
                    }
                }
            }
        }
    }
}

// Check if the puzzle is solved
function isSolved() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] !== solution[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// Start timer
function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        document.getElementById('timer').textContent = `${mins}:${secs}`;
    }, 1000);
}

// Generate full Sudoku board using backtracking
function generateFullBoard() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillBoard(board);
    return board;
}

function fillBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for (let num of nums) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (fillBoard(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Check if number is valid
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
}

// Remove cells based on difficulty
function removeCells(board, difficulty) {
    let cellsToRemove;
    if (difficulty === 'easy') cellsToRemove = 30;
    else if (difficulty === 'medium') cellsToRemove = 40;
    else cellsToRemove = 50;

    while (cellsToRemove > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            cellsToRemove--;
        }
    }
    return board;
}

// Generate Sudoku
document.getElementById('generate').addEventListener('click', () => {
    isCustomMode = false;
    const difficulty = document.getElementById('difficulty').value;
    solution = generateFullBoard();
    grid = solution.map(row => row.slice());
    grid = removeCells(grid, difficulty);
    
    // Reset hints
    hintsLeft = 3;
    document.getElementById('hints-left').textContent = hintsLeft;
    document.getElementById('custom-mode').innerHTML = '<i class="fas fa-pencil-alt"></i> Своя игра';
    
    updateGrid();
    startTimer();
    document.getElementById('message').textContent = 'Новая головоломка создана!';
    document.getElementById('message').className = '';
});

// Update grid UI
function updateGrid() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = inputs.find(inp => 
                parseInt(inp.dataset.row) === i && 
                parseInt(inp.dataset.col) === j
            );
            
            if (input) {
                input.value = grid[i][j] === 0 ? '' : grid[i][j];
                input.readOnly = !isCustomMode && grid[i][j] !== 0;
                input.classList.toggle('generated', !isCustomMode && grid[i][j] !== 0);
                
                if (grid[i][j] !== 0) {
                    input.classList.remove('error');
                }
            }
        }
    }
    checkErrors();
}

// Solve Sudoku with animation
document.getElementById('solve').addEventListener('click', async () => {
    // В режиме своей игры сначала проверяем, есть ли решение
    if (isCustomMode) {
        const tempGrid = grid.map(row => row.slice());
        if (!solve(tempGrid)) {
            document.getElementById('message').textContent = 'Нет решения для этой головоломки!';
            document.getElementById('message').className = 'error';
            return;
        }
        solution = tempGrid;
    }
    
    // Create a copy of the current grid to solve
    const tempGrid = grid.map(row => row.slice());
    
    if (solve(tempGrid)) {
        // Update the solution
        solution = tempGrid;
        
        // Animate the solution
        await animateSolve();
        document.getElementById('message').textContent = 'Головоломка решена!';
        clearInterval(timerInterval);
    } else {
        document.getElementById('message').textContent = 'Нет решения!';
        document.getElementById('message').className = 'error';
    }
});

// Backtracking solver
function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Animate solving
async function animateSolve() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                const input = inputs.find(inp => 
                    parseInt(inp.dataset.row) === i && 
                    parseInt(inp.dataset.col) === j
                );
                
                if (input && !input.readOnly) {
                    grid[i][j] = solution[i][j];
                    input.value = solution[i][j];
                    input.classList.add('animate');
                    await new Promise(resolve => setTimeout(resolve, 20));
                    input.classList.remove('animate');
                }
            }
        }
    }
}

// Clear grid
document.getElementById('clear').addEventListener('click', () => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = inputs.find(inp => 
                parseInt(inp.dataset.row) === i && 
                parseInt(inp.dataset.col) === j
            );
            
            if (input && (isCustomMode || !input.readOnly)) {
                input.value = '';
                grid[i][j] = 0;
                input.classList.remove('error');
            }
        }
    }
    
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = '';
});

// Hint: fill one empty cell
document.getElementById('hint').addEventListener('click', () => {
    if (!isCustomMode && hintsLeft <= 0) {
        document.getElementById('message').textContent = 'У вас не осталось подсказок!';
        document.getElementById('message').className = 'error';
        return;
    }
    
    const tempGrid = grid.map(row => row.slice());
    if (solve(tempGrid)) {
        let found = false;
        
        // Try to find a cell that's empty
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    grid[i][j] = tempGrid[i][j];
                    
                    const input = inputs.find(inp => 
                        parseInt(inp.dataset.row) === i && 
                        parseInt(inp.dataset.col) === j
                    );
                    
                    if (input) {
                        input.value = tempGrid[i][j];
                        input.classList.add('animate');
                        setTimeout(() => input.classList.remove('animate'), 500);
                    }
                    
                    if (!isCustomMode) {
                        hintsLeft--;
                        document.getElementById('hints-left').textContent = hintsLeft;
                    }
                    
                    document.getElementById('message').textContent = 'Подсказка добавлена!';
                    
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        
        // Check if the puzzle is solved
        if (isSolved()) {
            document.getElementById('message').textContent = 'Поздравляем! Вы решили судоку!';
            clearInterval(timerInterval);
        }
    } else {
        document.getElementById('message').textContent = 'Не могу найти решение для подсказки!';
        document.getElementById('message').className = 'error';
    }
});

// Toggle settings panel
document.getElementById('settings-toggle').addEventListener('click', () => {
    const settingsPanel = document.getElementById('settings-panel');
    settingsPanel.classList.toggle('active');
});

// Close settings when clicking outside
document.addEventListener('click', (e) => {
    const settingsPanel = document.getElementById('settings-panel');
    const settingsToggle = document.getElementById('settings-toggle');
    
    if (settingsPanel.classList.contains('active') && 
        !settingsPanel.contains(e.target) && 
        !settingsToggle.contains(e.target)) {
        settingsPanel.classList.remove('active');
    }
});

// Update the custom mode toggle function
document.getElementById('custom-mode').addEventListener('click', () => {
    isCustomMode = !isCustomMode;
    const customButton = document.getElementById('custom-mode');
    
    if (isCustomMode) {
        customButton.innerHTML = '<i class="fas fa-times"></i> Обычный режим';
        document.getElementById('message').textContent = 'Режим своей игры: введите свою головоломку и нажмите "Решить"';
        
        // Очищаем поле
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                grid[i][j] = 0;
            }
        }
        
        // Делаем все ячейки редактируемыми
        inputs.forEach(input => {
            input.readOnly = false;
            input.classList.remove('generated');
        });
        
        updateGrid();
        
        // Бесконечные подсказки в режиме своей игры
        document.getElementById('hints-left').textContent = '∞';
    } else {
        customButton.innerHTML = '<i class="fas fa-pencil-alt"></i> Своя игра';
        document.getElementById('message').textContent = 'Возврат в обычный режим';
        
        // Генерируем новую головоломку
        const difficulty = document.getElementById('difficulty').value;
        solution = generateFullBoard();
        grid = solution.map(row => row.slice());
        grid = removeCells(grid, difficulty);
        
        // Сбрасываем подсказки
        hintsLeft = 3;
        document.getElementById('hints-left').textContent = hintsLeft;
        
        updateGrid();
        startTimer();
    }
    
    // Close settings panel after selection
    document.getElementById('settings-panel').classList.remove('active');
});

// Update theme toggle function
document.getElementById('theme-toggle').addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark', isDarkTheme);
    const themeButton = document.getElementById('theme-toggle');
    
    if (isDarkTheme) {
        themeButton.innerHTML = '<i class="fas fa-sun"></i> Светлая';
    } else {
        themeButton.innerHTML = '<i class="fas fa-moon"></i> Тёмная';
    }
    
    // Close settings panel after selection
    document.getElementById('settings-panel').classList.remove('active');
});

// Initialize on load
window.addEventListener('load', () => {
    initGrid();
    solution = generateFullBoard();
    grid = solution.map(row => row.slice());
    grid = removeCells(grid, 'medium');
    updateGrid();
    
    // Initialize hints counter
    document.getElementById('hints-left').textContent = hintsLeft;
});

