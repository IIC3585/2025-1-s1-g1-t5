<!-- Counter.svelte -->
<script>
  let count = 0;
  
  const increment = () => {
    count += 1;
  };
  
  const decrement = () => {
    if (count > 0) count -= 1;
  };
</script>

<div class="bg-blue-50 p-6 rounded-lg shadow-inner max-w-xs mx-auto" data-island="Counter" data-framework="svelte">
  <h2 class="text-xl font-bold text-blue-800 mb-4 text-center">Contador Interactivo</h2>
  <div class="flex items-center justify-between mb-4">
    <button 
      on:click={decrement}
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      -
    </button>
    <span class="text-3xl font-mono font-bold text-blue-900">{count}</span>
    <button 
      on:click={increment}
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      +
    </button>
  </div>
  <p class="text-sm text-blue-600 text-center">
    Haz clic para ajustar el valor
  </p>
</div>