<script lang="ts">
  let mobileMenuOpen = false;
  export let className: string = '';
  
  const navItems = [
    {
      name: 'Islands',
      path: '/islands',
      description: 'Explora las directivas personalizadas.'
    },
    {
      name: 'Movies',
      path: '/movies',
      description: 'Explora películas'
    },
    {
      name: 'DemoSSG',
      path: '/demo',
      description: 'Demostraciones.'
    }
  ];

  const toggleMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };
</script>

<nav class={`bg-purple/30 backdrop-blur-md shadow-sm w-full ${className} `} data-island="Navbar" data-framework="svelte">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex items-center">
                <a href="/" class="text-xl font-semibold ">
                <img src="/favicon.svg" alt="Logo" class="h-8 w-8 inline-block mr-2 align-middle" />
                <span class="align-middle">Inicio</span>
                </a>
            </div>
            
            <div class="hidden md:flex items-center space-x-4">
                {#each navItems as item}
                    <a 
                        href={item.path} 
                        class="px-3 py-2 hover:text-purple-200"
                        title={item.description}
                    >
                        {item.name}
                    </a>
                {/each}
            </div>
            
            <div class="md:hidden flex items-center">
                <button
                    on:click={toggleMenu}
                    class="inline-flex items-center justify-center p-2 rounded-md  focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    
    {#if mobileMenuOpen}
        <div class="md:hidden bg-purple/30 backdrop-blur-md">
            <div class="px-2 pt-2 pb-3 space-y-1">
                {#each navItems as item}
                    <a
                        href={item.path}
                        class="block px-3 py-2  hover:bg-purple-600 rounded-md"
                        title={item.description}
                    >
                        {item.name}
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</nav>

<style>
  /* Transición suave para el menú móvil */
  .mobile-menu {
    transition: all 0.3s ease;
  }
</style>