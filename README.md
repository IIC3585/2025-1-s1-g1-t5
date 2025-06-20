#### IIC3585-1 SECCIÓN 1 - GRUPO 1
# 🤖 Trabajo 5: Astro


| Integrantes | Mail UC |
|-|-|
| Tarek Hirmas Aboid | tarek.hirmas@uc.cl |
| Sebastián Lobo Cáceres | salobo@uc.cl|
| Anita Martí Campos | asmarti@uc.cl |

> [!NOTE]
> Fecha de entrega 23-06-2025


## Demo
En el siguiente link podrán ver la demo de la tarea: [insertar link]



## Índice

* [Descripción](#descripción)
* [Tecnologías](#tecnologías)
* [Estructura del Proyecto](#estructura-del-proyecto)
* [Comandos](#instalación)

---

## Descripción
agregar descripción bonita..

## 📦 Tecnologías

Este proyecto utiliza los siguientes paquetes principales y sus propósitos:

| Paquete                        | Propósito                                                                                   |
|------------------------------- |--------------------------------------------------------------------------------------------|
| **[Astro](https://astro.build/)**                | 🚀 Framework principal para construir sitios web rápidos y modernos.                      |
| **[@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/)**         | 📄 Permite usar archivos MDX (Markdown + JSX) en Astro.                                   |
| **[@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/)**     | ⚛️ Integración oficial para usar componentes de React dentro de Astro.                    |
| **[@astrojs/svelte](https://docs.astro.build/en/guides/integrations-guide/svelte/)**   | 🔥 Integración oficial para usar componentes de Svelte dentro de Astro.                   |
| **[@tailwindcss/vite](https://tailwindcss.com/docs/guides/vite)**                      | 🎨 Plugin para integrar Tailwind CSS con Vite, el bundler que usa Astro.                  |
| **[tailwindcss](https://tailwindcss.com/)**                                            | 💨 Framework de utilidades CSS para estilos rápidos y personalizables.                    |
| **[react](https://react.dev/)** / **[react-dom](https://react.dev/)**                  | ⚛️ Biblioteca y motor de renderizado para construir interfaces con React.                 |
| **[svelte](https://svelte.dev/)**                                                      | 🧡 Framework para construir interfaces reactivas y eficientes.                            |
| **[lit](https://lit.dev/)**                                                            | ✨ Biblioteca para crear componentes web ligeros y reutilizables.                         |
| **[shiki](https://shiki.style/)**                                                      | 🎯 Motor de resaltado de sintaxis para código fuente, útil en blogs o documentación.      |
| **[typescript](https://www.typescriptlang.org/)**                                      | 🛡️ Añade tipado estático y herramientas de desarrollo avanzadas.                         |
| **[@types/react](https://www.npmjs.com/package/@types/react)** / **[@types/react-dom](https://www.npmjs.com/package/@types/react-dom)** | 📦 Tipos TypeScript para React y ReactDOM.         |
| **[npm](https://www.npmjs.com/)**                                                      | 📦 Gestor de paquetes para instalar y administrar dependencias.                           |

> 💡 *Estos paquetes permiten desarrollar, construir y desplegar el sitio de manera eficiente, aprovechando las ventajas de Astro y su ecosistema, así como la integración con frameworks populares y herramientas modernas de desarrollo.*


## 🚀 Estructura del Proyecto

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   │ 
│   ├── components/
│   │ 
│   ├── content/
│   │ 
│   ├── layouts/
│   │ 
│   └── pages/
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Comandos

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
