<script>
    export let grid;
  </script>
  
  <style>
    .board {
      display: grid;
      grid-template-rows: repeat(20, 20px);
      grid-template-columns: repeat(10, 20px);
      gap: 1px;
      background-color: #000;
      padding: 5px;
    }
    .cell {
      width: 20px;
      height: 20px;
      background-color: #fff;
    }
    .filled {
      background-color: #f00;
    }
  </style>
  
  <div class="board">
    {#each grid as row}
      {#each row as cell}
        <div class="cell {cell ? 'filled' : ''}"></div>
      {/each}
    {/each}
  </div>
  