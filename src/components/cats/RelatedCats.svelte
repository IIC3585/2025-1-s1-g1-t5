<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  export let cats = [];
  
  let currentIndex = 0;
  let autoSlide = true;
  let slideInterval;
  let isLoading = false;
  let hoveredCat = null;
  let containerElement;
  let isMobile = false;
  let loadedImages = new Set();
  
  const offset = tweened(0, {
    duration: 500,
    easing: cubicOut
  });
  
  function checkMobile() {
    if (typeof window !== 'undefined') {
      isMobile = window.innerWidth < 768;
    }
  }
  
  $: itemsPerView = isMobile ? 1 : 3;
  $: maxIndex = Math.max(0, cats.length - itemsPerView);
  
  $: {
    if (containerElement) {
      const itemWidth = containerElement.offsetWidth / itemsPerView;
      offset.set(-currentIndex * itemWidth);
    }
  }
  
  onMount(() => {
    checkMobile();    
    preloadImages();
    
    setTimeout(() => {
      if (containerElement) {
        const itemWidth = containerElement.offsetWidth / itemsPerView;
        offset.set(-currentIndex * itemWidth, { duration: 0 });
      }
    }, 100);
    
    startAutoSlide();
    
    const handleResize = () => {
      checkMobile();
      setTimeout(() => {
        if (containerElement) {
          const itemWidth = containerElement.offsetWidth / itemsPerView;
          offset.set(-currentIndex * itemWidth, { duration: 0 });
        }
      }, 100);
      
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  
  onDestroy(() => {
    if (slideInterval) clearInterval(slideInterval);
  });
  
  function preloadImages() {
    cats.forEach(cat => {
      const img = new Image();
      img.onload = () => {
        loadedImages.add(cat.id);
        loadedImages = loadedImages;
      };
      img.src = cat.data.url;
    });
  }
  
  function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    if (autoSlide && cats.length > itemsPerView) {
      slideInterval = setInterval(() => {
        nextSlide();
      }, 4000);
    }
  }
  
  function stopAutoSlide() {
    autoSlide = false;
    if (slideInterval) clearInterval(slideInterval);
  }
  
  function goToSlide(index) {
    const newIndex = Math.max(0, Math.min(maxIndex, index));
    console.log(`Going to slide: ${newIndex}, maxIndex: ${maxIndex}, itemsPerView: ${itemsPerView}`);
    currentIndex = newIndex;
    
    if (containerElement) {
      const itemWidth = containerElement.offsetWidth / itemsPerView;
      offset.set(-currentIndex * itemWidth);
    }
    
    stopAutoSlide();
  }
  
  function nextSlide() {
    const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    currentIndex = newIndex;
    
    if (containerElement) {
      const itemWidth = containerElement.offsetWidth / itemsPerView;
      offset.set(-currentIndex * itemWidth);
    }
  }
  
  function prevSlide() {
    const newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    currentIndex = newIndex;
    
    if (containerElement) {
      const itemWidth = containerElement.offsetWidth / itemsPerView;
      offset.set(-currentIndex * itemWidth);
    }
  }
  
  function handleCatClick(cat) {
    isLoading = true;
    setTimeout(() => {
      window.location.href = `/cats/${cat.id}`;
    }, 300);
  }
  
  function toggleAutoSlide() {
    autoSlide = !autoSlide;
    if (autoSlide) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
  }
</script>

<div 
  class="relative overflow-hidden" 
  data-island="RelatedCats" 
  data-framework="svelte"
  bind:this={containerElement}
>
  {#if isLoading}
    <div 
      class="absolute inset-0 bg-black/50 flex items-center justify-center z-20 rounded-xl"
      transition:fade={{ duration: 200 }}
    >
      <div class="text-center">
        <div class="text-4xl animate-spin mb-2">🐱</div>
        <div class="text-white text-sm">Cargando gato...</div>
      </div>
    </div>
  {/if}

  {#if cats.length > itemsPerView}
    <div class="flex justify-between items-center mb-4">
      <button
        class="glass-effect glass-dark p-2 rounded-full hover:glass-purple transition-all transform hover:scale-110 disabled:opacity-50"
        on:click={prevSlide}
        disabled={isLoading}
        aria-label="Anterior"
      >
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <div class="flex space-x-2">
        {#each Array(maxIndex + 1) as _, index}
          <button
            class="w-2 h-2 rounded-full transition-all duration-300 {currentIndex === index ? 'bg-purple-400 w-6' : 'bg-gray-600 hover:bg-gray-500'}"
            on:click={() => goToSlide(index)}
            disabled={isLoading}
            aria-label={`Ir al slide ${index + 1}`}
          ></button>
        {/each}
      </div>
      
      <button
        class="glass-effect glass-dark p-2 rounded-full hover:glass-purple transition-all transform hover:scale-110 disabled:opacity-50"
        on:click={nextSlide}
        disabled={isLoading}
        aria-label="Siguiente"
      >
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  {/if}

  <div class="relative overflow-hidden rounded-xl">
    <div 
      class="flex"
      style="transform: translateX({$offset}px); transition: none;"
    >
      {#each cats as cat, index (cat.id)}
        <div
          class="flex-shrink-0 w-full {isMobile ? '' : 'md:w-1/3'} px-2"
        >
          <div
            class="group cursor-pointer relative h-full"
            on:mouseenter={() => hoveredCat = cat.id}
            on:mouseleave={() => hoveredCat = null}
            on:click={() => handleCatClick(cat)}
            on:keydown={(e) => e.key === 'Enter' && handleCatClick(cat)}
            role="button"
            tabindex="0"
          >
            <div class="glass-effect glass-dark hover:glass-blue transform group-hover:scale-105 transition-all duration-300 group-hover:glow-effect rounded-xl overflow-hidden h-full">
              <div class="aspect-square overflow-hidden relative">
                {#if !loadedImages.has(cat.id)}
                  <div class="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div class="text-4xl animate-pulse">🐱</div>
                  </div>
                {/if}
                
                <img 
                  src={cat.data.url} 
                  alt="Gato {cat.id}"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 {loadedImages.has(cat.id) ? 'opacity-100' : 'opacity-0'}"
                  loading="lazy"
                  on:load={() => {
                    loadedImages.add(cat.id);
                    loadedImages = loadedImages;
                  }}
                />
                
                {#if hoveredCat === cat.id}
                  <div 
                    class="absolute inset-0 bg-black/60 flex items-center justify-center"
                    transition:fade={{ duration: 200 }}
                  >
                    <div class="text-center text-white p-4">
                      <div class="text-2xl mb-2">👁️</div>
                      <div class="text-sm font-medium">Ver detalles</div>
                      <div class="text-xs text-gray-300 mt-1">
                        {cat.data.width} × {cat.data.height}
                      </div>
                    </div>
                  </div>
                {/if}
                
                {#if cat.data.url.includes('.gif')}
                  <div class="absolute top-2 right-2 glass-effect glass-yellow px-2 py-1 rounded-full text-xs font-medium text-yellow-200 border border-yellow-300/30">
                    GIF
                  </div>
                {/if}
              </div>
              
              <div class="p-4">
                <h3 class="font-semibold text-white group-hover:text-blue-200 transition-colors truncate">
                  Gato #{cat.id}
                </h3>
                <p class="text-sm text-gray-400">
                  {cat.data.width} × {cat.data.height} px
                </p>
                
                <div class="mt-2">
                  <div class="w-full bg-gray-700 rounded-full h-1">
                    <div 
                      class="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-1000"
                      style="width: {((cat.data.width + cat.data.height) % 100)}%"
                    ></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    Popularidad: {((cat.data.width + cat.data.height) % 100)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex justify-center items-center mt-6 space-x-4">
    <label class="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={autoSlide}
        on:change={toggleAutoSlide}
        class="sr-only"
      />
      <div class="relative">
        <div class="w-10 h-6 bg-gray-600 rounded-full shadow-inner transition-colors duration-300 {autoSlide ? 'bg-purple-600' : ''}"></div>
        <div class="absolute w-4 h-4 bg-white rounded-full shadow top-1 transition-transform duration-300 {autoSlide ? 'transform translate-x-4' : 'left-1'}"></div>
      </div>
      <span class="text-sm text-gray-300">Auto-deslizar</span>
    </label>
    
    {#if autoSlide}
      <div class="text-xs text-gray-500">
        Cambia cada 4 segundos
      </div>
    {/if}
  </div>


  <div class="mt-6 pt-4 border-t border-gray-700/50 text-xs text-gray-500 text-center">
    <span>
      Mostrando {itemsPerView} de {cats.length} gatos • 
      Slide {currentIndex + 1} de {maxIndex + 1}
    </span>
    <p>
      🏝️ Isla Svelte • Carrusel interactivo • Hidratación client:visible
    </p>
  </div>
</div>
