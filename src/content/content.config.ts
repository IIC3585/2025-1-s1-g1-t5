// src/content/config.ts
/**
 * Instructivo abstracto para crear un loader que conecte una colección de Astro Content con una API externa y genere más de 50 páginas:
 *
 * 1. Define la colección en `content.config.ts` usando `defineCollection` y `z` para el esquema, aunque los datos vendrán de la API.
 *
 * 2. Crea un archivo loader (por ejemplo, `src/content/loaders/postsLoader.ts`) que:
 *    - Realice una petición HTTP a la API externa para obtener los datos.
 *    - Transforme los datos recibidos al formato esperado por la colección.
 *    - Devuelva un array de objetos que representen cada página/post.
 *
 * 3. En el archivo de rutas dinámicas (por ejemplo, `[slug].astro` o `[id].astro`):
 *    - Importa y ejecuta el loader para obtener todos los datos.
 *    - Usa los datos para generar las rutas dinámicamente (más de 50 páginas).
 *
 * 4. Opcional: Implementa paginación si la API lo soporta, para manejar grandes volúmenes de datos.
 *
 * 5. Consulta la documentación oficial de Astro sobre loaders y rutas dinámicas:
 *    https://docs.astro.build/en/guides/content-collections/#loading-external-data
 *
 * Ejemplo de estructura básica de un loader:
 * ```typescript
 * // src/content/loaders/postsLoader.ts
 * export async function getPostsFromAPI() {
 *   const res = await fetch('https://api.example.com/posts');
 *   const data = await res.json();
 *   return data.map(post => ({
 *     title: post.title,
 *     description: post.summary,
 *     pubDate: new Date(post.published_at),
 *     tags: post.tags,
 *     // ...otros campos
 *   }));
 * }
 * ```
 */
