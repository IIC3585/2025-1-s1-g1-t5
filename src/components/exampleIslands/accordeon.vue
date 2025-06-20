<!-- Accordion.vue -->
<template>
  <div class="max-w-lg mx-auto" data-island="Accordion" data-framework="vue">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="accordion-item mb-2 border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
    >
      <button
        @click="toggleItem(index)"
        class="w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        :aria-expanded="item.open"
        :aria-controls="'content-' + index"
      >
        <div class="flex justify-between items-center">
          <span>{{ item.title }}</span>
          <svg
            class="w-5 h-5 transform transition-transform"
            :class="{ 'rotate-180': item.open }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div
        :id="'content-' + index"
        class="accordion-content overflow-hidden transition-all duration-300"
        :class="{ 'max-h-0': !item.open, 'max-h-[500px]': item.open }"
        :aria-hidden="!item.open"
      >
        <div class="p-4 text-gray-600 bg-white">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionComponent',
  data() {
    return {
      items: [
        { title: '¿Cómo funciona?', content: 'Este componente muestra información oculta que se revela al hacer clic.', open: false },
        { title: '¿Es accesible?', content: 'Sí, está diseñado siguiendo las mejores prácticas de accesibilidad.', open: false },
        { title: '¿Puedo personalizarlo?', content: 'Por supuesto, usa Tailwind CSS para fácil personalización.', open: false },
      ]
    }
  },
  methods: {
    toggleItem(index) {
      this.items = this.items.map((item, i) => ({
        ...item,
        open: i === index ? !item.open : false
      }));
    }
  }
}
</script>