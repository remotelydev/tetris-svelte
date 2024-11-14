<script>
    import { onMount, onDestroy } from 'svelte';
    import Board from './Board.svelte';
    import Leaderboard from './Leaderboard.svelte'; // Importujemy komponent Leaderboard
    import { pieces } from './pieces.js';
  
    let grid = Array.from({ length: 20 }, () => Array(10).fill(0));
    let currentPiece;
    let currentRotation = 0;
    let currentPosition = { x: 4, y: 0 };
    let gameInterval;
    let score = 0;
    let gameOverFlag = false;
    let finalScore = 0; // Zmienna do przekazania wyniku do Leaderboard
  
    function spawnPiece() {
      const types = Object.keys(pieces);
      const randomType = types[Math.floor(Math.random() * types.length)];
      currentPiece = pieces[randomType];
      currentRotation = 0;
      currentPosition = { x: 3, y: -getPieceHeight(currentPiece[currentRotation]) };
    }
  
    function getPieceHeight(piece) {
      return piece.length;
    }
  
    function drawPiece() {
      currentPiece[currentRotation].forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const gridY = currentPosition.y + y;
            const gridX = currentPosition.x + x;
            if (gridY >= 0 && gridY < 20 && gridX >= 0 && gridX < 10) {
              grid[gridY][gridX] = value;
            }
          }
        });
      });
    }
  
    function undrawPiece() {
      currentPiece[currentRotation].forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const gridY = currentPosition.y + y;
            const gridX = currentPosition.x + x;
            if (gridY >= 0 && gridY < 20 && gridX >= 0 && gridX < 10) {
              grid[gridY][gridX] = 0;
            }
          }
        });
      });
    }
  
    function moveDown() {
      if (gameOverFlag) return;
  
      undrawPiece();
      currentPosition.y += 1;
      if (collision()) {
        currentPosition.y -= 1;
        drawPiece();
        freeze();
        if (gameOver()) {
          gameOverFlag = true;
          finalScore = score; // Ustawiamy finalny wynik
          clearInterval(gameInterval);
        } else {
          spawnPiece();
          if (collision()) {
            gameOverFlag = true;
            finalScore = score; // Ustawiamy finalny wynik
            clearInterval(gameInterval);
          } else {
            drawPiece();
          }
        }
      } else {
        drawPiece();
      }
    }
  
    function moveHorizontal(dir) {
      if (gameOverFlag) return;
  
      undrawPiece();
      currentPosition.x += dir;
      if (collision()) {
        currentPosition.x -= dir;
      }
      drawPiece();
    }
  
    function rotatePiece() {
      if (gameOverFlag) return;
  
      undrawPiece();
      const prevRotation = currentRotation;
      currentRotation = (currentRotation + 1) % currentPiece.length;
      if (collision()) {
        currentRotation = prevRotation;
      }
      drawPiece();
    }
  
    function collision() {
      return currentPiece[currentRotation].some((row, y) => {
        return row.some((value, x) => {
          if (value) {
            const newX = currentPosition.x + x;
            const newY = currentPosition.y + y;
            if (
              newX < 0 ||
              newX >= 10 ||
              newY >= 20 ||
              (newY >= 0 && grid[newY][newX])
            ) {
              return true;
            }
          }
          return false;
        });
      });
    }
  
    function freeze() {
      drawPiece();
      let linesCleared = 0;
      for (let y = grid.length - 1; y >= 0; y--) {
        if (grid[y].every((cell) => cell !== 0)) {
          grid.splice(y, 1);
          grid.unshift(Array(10).fill(0));
          linesCleared++;
          y++; // Sprawdź ten sam indeks ponownie po przesunięciu
        }
      }
      if (linesCleared > 0) {
        updateScore(linesCleared);
      }
    }
  
    function updateScore(lines) {
      // Punktacja zależna od liczby usuniętych linii na raz
      const pointsPerLines = [0, 100, 300, 500, 800]; // Indeks to liczba linii usuniętych na raz
      score += pointsPerLines[lines] || (lines * 100); // Jeśli usunięto więcej niż 4 linie
    }
  
    function gameOver() {
      return grid[0].some((cell) => cell !== 0);
    }
  
    function handleKeyDown(event) {
      if (gameOverFlag) return;
  
      if (event.key === 'ArrowLeft') {
        moveHorizontal(-1);
      } else if (event.key === 'ArrowRight') {
        moveHorizontal(1);
      } else if (event.key === 'ArrowDown') {
        moveDown();
      } else if (event.key === 'ArrowUp') {
        rotatePiece();
      }
    }
  
    function restartGame() {
      // Resetuj zmienne gry
      grid = Array.from({ length: 20 }, () => Array(10).fill(0));
      currentPiece = null;
      currentRotation = 0;
      currentPosition = { x: 4, y: 0 };
      score = 0;
      finalScore = 0;
      gameOverFlag = false;
  
      // Usuń istniejący interwał
      clearInterval(gameInterval);
  
      // Rozpocznij nową grę
      spawnPiece();
      drawPiece();
      gameInterval = setInterval(moveDown, 500);
    }
  
    onMount(() => {
      spawnPiece();
      drawPiece();
      window.addEventListener('keydown', handleKeyDown);
      gameInterval = setInterval(moveDown, 500);
    });
  
    onDestroy(() => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameInterval);
    });
  </script>
  
  <style>
    .game-container {
      display: flex;
      align-items: flex-start;
      font-family: Arial, sans-serif;
    }
  
    .scoreboard {
      margin-left: 20px;
      width: 150px;
      min-height: 400px;
      background-color: #f0f0f0; /* Jasne tło dla kontrastu */
      padding: 10px;
      border-radius: 5px;
      color: #000; /* Czarny kolor tekstu */
    }
  
    .scoreboard h2 {
      margin-bottom: 10px;
    }
  
    .game-over {
      margin-top: 20px;
      color: red;
      font-size: 24px;
    }
  
    .restart-button {
      margin-top: 10px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
    }
  </style>
  
  <div class="game-container">
    <Leaderboard currentScore={gameOverFlag ? finalScore : 0} />
    <Board {grid} />
    <div class="scoreboard">
      <h2>Punkty:</h2>
      <p>{score}</p>
      {#if gameOverFlag}
        <div class="game-over">Koniec gry!</div>
        <button class="restart-button" on:click={restartGame}>Zagraj ponownie</button>
      {/if}
    </div>
  </div>
  