<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let movies = [];

  let currentIndex = 0;
  let autoSlide = true;
  let slideInterval;
  let isLoading = false;
  let hoveredMovie = null;
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
  $: maxIndex = Math.max(0, movies.length - itemsPerView);

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
    return () => window.removeEventListener('resize', handleResize);
  });

  onDestroy(() => {
    if (slideInterval) clearInterval(slideInterval);
  });

  function preloadImages() {
    movies.forEach(movie => {
      const img = new Image();
      img.onload = () => {
        loadedImages.add(movie.data.slug);
        loadedImages = loadedImages;
      };
      img.src = movie.data.img_url;
    });
  }

  function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    if (autoSlide && movies.length > itemsPerView) {
      slideInterval = setInterval(() => nextSlide(), 4000);
    }
  }

  function stopAutoSlide() {
    autoSlide = false;
    if (slideInterval) clearInterval(slideInterval);
  }

  function goToSlide(index) {
    const newIndex = Math.max(0, Math.min(maxIndex, index));
    currentIndex = newIndex;
    const itemWidth = containerElement.offsetWidth / itemsPerView;
    offset.set(-currentIndex * itemWidth);
    stopAutoSlide();
  }

  function nextSlide() {
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    const itemWidth = containerElement.offsetWidth / itemsPerView;
    offset.set(-currentIndex * itemWidth);
  }

  function prevSlide() {
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    const itemWidth = containerElement.offsetWidth / itemsPerView;
    offset.set(-currentIndex * itemWidth);
  }

  function handleMovieClick(movie) {
    isLoading = true;
    setTimeout(() => {
      window.location.href = `/movies/${movie.data.slug}`;
    }, 300);
  }
</script>

<div class="relative overflow-hidden" bind:this={containerElement}>
  <div class="flex justify-between items-center mb-4">
    <button class="bg-gray-300 border border-gray-400 hover:bg-gray-400 p-2 rounded-full" on:click={prevSlide} disabled={isLoading}>
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    <div class="flex space-x-2">
      {#each Array(maxIndex + 1) as _, index}
        <button class="w-2 h-2 rounded-full {currentIndex === index ? 'bg-sky-600 w-6' : 'bg-gray-600'}" on:click={() => goToSlide(index)}></button>
      {/each}
    </div>
    <button class="bg-gray-300 border border-gray-400 hover:bg-gray-400 p-2 rounded-full" on:click={nextSlide} disabled={isLoading}>
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>

  <div class="relative overflow-hidden rounded-xl">
    <div class="flex" style="transform: translateX({$offset}px);">
      {#each movies as movie, index (movie.data.slug)}
        <div class="flex-shrink-0 w-full {isMobile ? '' : 'md:w-1/3'} px-2">
          <div class="group cursor-pointer" on:click={() => handleMovieClick(movie)}>
            <div class="bg-gray-200 border border-gray-300 hover:bg-gray-100 transition-all duration-200 rounded-xl overflow-hidden">
              <div class="aspect-square overflow-hidden">
                <img src={movie.data.img_url} alt={movie.data.title} class="w-full h-full object-cover" />
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-gray-800 truncate">{movie.data.title}</h3>
                <p class="text-sm text-gray-600">{movie.data.major_genre}</p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
