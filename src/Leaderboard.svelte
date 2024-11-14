<script>
    import { onMount } from 'svelte';
  
    export let currentScore = 0;
    let scores = [];
  
    function loadScores() {
      const storedScores = JSON.parse(localStorage.getItem('tetrisScores')) || [];
      scores = storedScores;
    }
  
    function saveScore() {
      const newScore = {
        score: currentScore,
        date: new Date().toLocaleString(),
      };
      scores.push(newScore);
      scores.sort((a, b) => b.score - a.score);
      scores = scores.slice(0, 10);
      localStorage.setItem('tetrisScores', JSON.stringify(scores));
    }
  
    // Jeśli gra się zakończyła, aktualizuj leaderboard
    $: if (currentScore > 0) {
      saveScore();
    }
  
    onMount(() => {
      loadScores();
    });
  </script>
  
  <style>
    .leaderboard {
      background-color: #f0f0f0;
      padding: 10px;
      width: 200px;
      border-radius: 5px;
      color: #000;
      margin-right: 20px;
    }
  
    .leaderboard h2 {
      margin-top: 0;
    }
  
    .leaderboard ol {
      padding-left: 20px;
    }
  
    .leaderboard li {
      margin-bottom: 5px;
    }
  </style>
  
  <div class="leaderboard">
    <h2>Najlepsze wyniki</h2>
    {#if scores.length > 0}
      <ol>
        {#each scores as score, index}
          <li>
            <strong>{score.score}</strong> - {score.date}
          </li>
        {/each}
      </ol>
    {:else}
      <p>Brak wyników</p>
    {/if}
  </div>
  