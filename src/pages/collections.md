---
title: 'Collections'
---

> **Nota**
> Esta sección es un *placeholder* y puede ser modificada o actualizada más adelante según las necesidades del proyecto.

# Colecciones en Astro

Astro introduce el concepto de **collections** para organizar y manejar contenido estructurado, como blogs, portafolios o documentación. Las colecciones permiten definir esquemas, validar datos y acceder fácilmente a los contenidos desde tus páginas.

## ¿Qué es una Collection?

Una collection es un conjunto de archivos de contenido (por ejemplo, Markdown o MDX) agrupados bajo una misma carpeta y esquema. Astro usa `src/content/` para almacenar estas colecciones.

## Ejemplo Básico

Supongamos que quieres crear una colección de artículos de blog.

1. **Estructura de carpetas:**

```
src/
    content/
        blog/
            primer-post.md
            segundo-post.md
```

2. **Definir el esquema de la colección:**

Crea un archivo `src/content/config.ts`:

```ts
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.string(),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
    blog: blogCollection,
};
```

3. **Ejemplo de archivo Markdown en la colección:**

```markdown
---
title: "Mi primer post"
date: "2024-06-01"
tags: ["astro", "blog"]
---

¡Bienvenido a mi primer post en Astro!
```

4. **Acceder a la colección en una página Astro:**

```astro
---
import { getCollection } from "astro:content";
const posts = await getCollection("blog");
---

<ul>
    {posts.map(post => (
        <li>
            <a href={`/blog/${post.slug}/`}>{post.data.title}</a>
        </li>
    ))}
</ul>
```

## Ventajas de usar Collections

- **Validación de datos:** Garantiza que todos los archivos tengan los campos requeridos.
- **Organización:** Facilita la gestión de grandes cantidades de contenido.
- **Flexibilidad:** Puedes definir múltiples colecciones para diferentes tipos de contenido.

## Recursos

- [Documentación oficial de Content Collections](https://docs.astro.build/es/guides/content-collections/)

¡Experimenta con collections para estructurar tu contenido de manera eficiente en Astro!
</div>