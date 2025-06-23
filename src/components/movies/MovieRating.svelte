<script>
  export let rating = 0;     // de 0 a 10
  export let votes = 0;      // cantidad de votos

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 10 - fullStars - (halfStar ? 1 : 0);

  // Formatea votos como: 2.1M o 800K
  function formatVotes(v) {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
    if (v >= 1_000) return (v / 1_000).toFixed(0) + 'K';
    return v;
  }
</script>

<style>
  .stars {
    display: flex;
    gap: 4px;
    font-size: 1.5rem;
    color: gold;
  }
  .label {
    margin-top: 0.25rem;
    font-size: 0.9rem;
    color: #fff;
  }
</style>

<div class="stars">
  {#each Array(fullStars) as _}
    ★
  {/each}
  {#if halfStar}
    ☆
  {/if}
  {#each Array(emptyStars) as _}
    ☆
  {/each}
</div>
<div class="label">
  IMDb Rating: {rating} / 10<br />
  ({formatVotes(votes)} votos)
</div>
