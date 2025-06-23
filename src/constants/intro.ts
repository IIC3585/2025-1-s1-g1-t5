
export const testimonials = [
  {
    name: 'María González',
    role: 'CEO, TechSolutions',
    quote: 'Astro ha revolucionado la forma en que construimos sitios web. Su arquitectura de islas es increíble.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    name: 'Carlos Ruiz',
    role: 'Desarrollador Frontend',
    quote: 'La velocidad y flexibilidad de Astro superó todas mis expectativas. Definitivamente lo recomiendo.',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    name: 'Ana Martínez',
    role: 'UI/UX Designer',
    quote: 'Con Astro puedo crear experiencias de usuario excepcionales sin sacrificar el rendimiento.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const islandBenefits = [
  {
    icon: '⚡',
    title: 'Hidratación Selectiva',
    description: 'Solo se hidrata el JavaScript requerido, reduciendo el bundle size hasta 90%',
    technical: 'Reduce TTI (Time to Interactive) significativamente'
  },
  {
    icon: '🏝️',
    title: 'Aislamiento Completo',
    description: 'Cada isla mantiene su propio contexto y estado sin interferencias',
    technical: 'Evita conflictos de dependencias y side effects'
  },
  {
    icon: '🚀',
    title: 'Rendimiento Superior',
    description: 'Zero-JS por defecto, carga progresiva según necesidad',
    technical: 'Mejora Core Web Vitals y SEO ranking'
  },
  {
    icon: '🔧',
    title: 'Multi-Framework',
    description: 'React, Vue, Svelte, Solid coexistiendo en la misma página',
    technical: 'Migración gradual y reutilización de componentes'
  }
];

export const connectionTypes = [
  {
    type: 'Event Bus',
    description: 'Comunicación mediante eventos personalizados del navegador, ideales para interacciones simples entre componentes.',
    example: `// Emisor (Vue)
const emitEvent = () => {
  window.dispatchEvent(new CustomEvent('cart-updated', {
    detail: { items: cartItems }
  }));
}

// Receptor (React)
useEffect(() => {
  const handler = (e) => setItems(e.detail.items);
  window.addEventListener('cart-updated', handler);
  return () => window.removeEventListener('cart-updated', handler);
}, []);`,
    useCase: 'Actualizaciones de carrito, notificaciones entre componentes'
  },
  {
    type: 'Global State',
    description: 'Stores agnósticas que funcionan en cualquier framework (Nanostores, Zustand).',
    example: `// store.js
import { atom } from 'nanostores';
export const $cart = atom([]);

// Isla React
import { $cart } from './store';
useEffect(() => $cart.subscribe(setItems), []);

// Isla Svelte
import { $cart } from './store';
$: items = $cart.get();`,
    useCase: 'Estado compartido como carrito, autenticación, temas'
  },
  {
    type: 'URL State',
    description: 'Estado persistente en la URL que todas las islas pueden leer.',
    example: `// Lectura
const params = new URLSearchParams(location.search);
const category = params.get('category');

// Escritura
const updateFilters = (newFilters) => {
  const params = new URLSearchParams(newFilters);
  history.pushState({}, '', \`?\${params.toString()}\`);
}`,
    useCase: 'Filtros, paginación, parámetros compartibles'
  }
];

export const directiveExamples = [
  {
    directive: 'client:load',
    priority: 'Crítica',
    description: 'Hidrata inmediatamente al cargar la página',
    jsBundle: 'Se incluye en el bundle inicial',
    performance: 'Impacto alto en FCP',
    useCase: 'Navegación principal, formularios críticos',
    code: `<Navigation client:load />
<!-- Se hidrata inmediatamente -->`
  },
  {
    directive: 'client:idle',
    priority: 'Media',
    description: 'Hidrata cuando el navegador está idle (requestIdleCallback)',
    jsBundle: 'Carga diferida',
    performance: 'Impacto mínimo en métricas',
    useCase: 'Componentes secundarios, widgets informativos',
    code: `<SocialShare client:idle />
<!-- Se hidrata cuando el navegador está libre -->`
  },
  {
    directive: 'client:visible',
    priority: 'Bajo',
    description: 'Hidrata cuando entra en el viewport (Intersection Observer)',
    jsBundle: 'Lazy loading',
    performance: 'Zero impacto inicial',
    useCase: 'Carruseles, comentarios, contenido below-the-fold',
    code: `<CommentSection client:visible />
<!-- Se hidrata solo cuando es visible -->`
  },
  {
    directive: 'client:media',
    priority: 'Condicional',
    description: 'Hidrata según media query específica',
    jsBundle: 'Condicional por dispositivo',
    performance: 'Optimizado por contexto',
    useCase: 'Componentes específicos para móvil/desktop',
    code: `<MobileMenu client:media="(max-width: 768px)" />
<!-- Solo se hidrata en móviles -->`
  }
];

export const astroVsTraditional = [
  {
    aspect: 'Bundle Size',
    astro: '10-50KB típico',
    traditional: '200KB-2MB común',
    benefit: '90% reducción promedio'
  },
  {
    aspect: 'Time to Interactive',
    astro: '0.5-1.5s',
    traditional: '3-8s',
    benefit: '80% mejora en TTI'
  },
  {
    aspect: 'SEO Score',
    astro: '95-100 Lighthouse',
    traditional: '60-80 típico',
    benefit: 'Mejor ranking orgánico'
  },
  {
    aspect: 'Mantenimiento',
    astro: 'Modular por isla',
    traditional: 'Monolítico acoplado',
    benefit: 'Desarrollo independiente'
  }
];

export const disadvantages = [
  {
    category: 'Complejidad de Desarrollo',
    issues: [
      'Curva de aprendizaje para el paradigma de islas',
      'Configuración inicial más compleja',
      'Debugging distribuido entre múltiples frameworks'
    ]
  },
  {
    category: 'Limitaciones de Comunicación',
    issues: [
      'Comunicación entre islas requiere arquitectura adicional',
      'Estado global más complejo de manejar',
      'Props drilling limitado al contexto de cada isla'
    ]
  },
  {
    category: 'Ecosistema y Tooling',
    issues: [
      'Herramientas de desarrollo menos maduras que Next.js/Nuxt',
      'Menor cantidad de plugins y integraciones',
      'Documentación fragmentada para casos edge'
    ]
  }
];