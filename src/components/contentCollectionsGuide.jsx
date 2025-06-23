import { useState } from 'react';
import { Book, Database, Zap, FileText, Code, Globe, Clock, Layers, CheckCircle, AlertCircle } from 'lucide-react';

const ContentCollectionsGuide = () => {
  const [activeTab, setActiveTab] = useState('what');

  const codeExamples = {
    schema: `// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // v2.5.0 y posteriores
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};`,
    
    usage: `---
// En tu página .astro
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';

const blogPosts = await getCollection('blog');
const sortedPosts = blogPosts.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<Layout title="Blog">
  <div class="blog-list">
    {sortedPosts.map((post) => (
      <article class="post-card">
        <h2>
          <a href={\`/blog/\${post.slug}\`}>
            {post.data.title}
          </a>
        </h2>
        <p>{post.data.description}</p>
        <time>{post.data.pubDate.toDateString()}</time>
      </article>
    ))}
  </div>
</Layout>`,

    loader: `// src/content/config.ts - Astro 5.0+
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
  }),
});

// Con API externa
const newsCollection = defineCollection({
  loader: async () => {
    const response = await fetch('https://api.example.com/news');
    const articles = await response.json();
    
    return articles.map(article => ({
      id: article.id,
      title: article.title,
      content: article.content,
      pubDate: new Date(article.date),
    }));
  },
  schema: z.object({
    title: z.string(),
    content: z.string(),
    pubDate: z.date(),
  }),
});`
  };

  const whenToUse = [
    {
      scenario: "Blog o documentación",
      description: "Perfecto para contenido markdown con metadatos estructurados",
      icon: <FileText className="w-5 h-5" />,
      recommended: true
    },
    {
      scenario: "Portfolio de proyectos",
      description: "Organiza proyectos con imágenes, tecnologías y descripciones",
      icon: <Layers className="w-5 h-5" />,
      recommended: true
    },
    {
      scenario: "Contenido desde CMS (Content Management System)",
      description: "Con loaders puedes conectar Contentful, Strapi, etc.",
      icon: <Database className="w-5 h-5" />,
      recommended: true
    },
    {
      scenario: "Páginas simples estáticas",
      description: "Para pocas páginas sin estructura, usa páginas normales",
      icon: <Globe className="w-5 h-5" />,
      recommended: false
    }
  ];

  const alternatives = [
    {
      name: "Páginas .astro normales",
      when: "Contenido simple sin estructura repetitiva",
      pros: ["Más directo", "Sin configuración extra"],
      cons: ["Sin validación de tipos", "Difícil de escalar"]
    },
    {
      name: "Live Collections o SSR",
      when: "Datos dinámicos o contenido que cambia frecuentemente",
      pros: ["Flexibilidad total", "Datos en tiempo real"],
      cons: ["Más complejidad", "Feature experimental"]
    }
  ];

  const tabs = [
    { id: 'what', label: '¿Qué son?', icon: <Book className="w-4 h-4" /> },
    { id: 'when', label: '¿Cuándo usar?', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'how', label: '¿Cómo implementar?', icon: <Code className="w-4 h-4" /> },
    { id: 'alternatives', label: 'Alternativas', icon: <AlertCircle className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-6xl mx-auto" data-island="content-collections-guide" data-framework="react">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-indigo-600/20 rounded-full px-6 py-3 mb-6">
          <Database className="w-6 h-6 text-indigo-400" />
          <span className="text-white font-semibold text-lg">Content Collections</span>
          <span className="bg-indigo-500/30 text-indigo-200 px-2 py-1 rounded text-sm">
            Tu Base de Datos de Contenido
          </span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          Gestiona tu Contenido como un Pro
        </h2>
        <p className="text-blue-100 text-lg max-w-3xl mx-auto">
          Las Content Collections son la forma más poderosa de organizar y validar contenido en Astro.
          Con TypeScript automático y validación de esquemas, transforman tu contenido en una base de datos tipada.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white/10 text-blue-100 hover:bg-white/20'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="p-8">
        {activeTab === 'what' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  ¿Qué son las Content Collections?
                </h3>
                <div className="text-blue-100 space-y-4">
                  <p>
                    Content collections son la mejor forma de gestionar conjuntos de contenido en cualquier proyecto Astro. Las Collections ayudan a organizar y consultar tus documentos, habilitan Intellisense y la comprobación de tipos en tu editor, y proporcionan seguridad de tipos TypeScript automática para todo tu contenido.
                  </p>
                  <p>
                    Piensa en ellas como tu <strong className="text-white">base de datos de archivos</strong> con superpoderes:
                    validación automática, tipos de TypeScript y consultas optimizadas.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-4">Estructura típica:</h4>
                <pre className="text-sm text-green-300 font-mono">
{`src/
  └──content/
      ├──blog/           ← Colección "blog"
      │   ├──post-1.md
      │   └──post-2.md
      ├──projects/       ← Colección "projects"  
      │    ├──project-a.md
      │    └──project-b.md
      └──config.ts       ← Configuración y schemas`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-emerald-900/30 rounded-xl">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Validación Automática</h4>
                <p className="text-emerald-100 text-sm">Zod valida tus frontmatter automáticamente</p>
              </div>
              <div className="text-center p-6 bg-blue-900/30 rounded-xl">
                <Code className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">TypeScript</h4>
                <p className="text-blue-100 text-sm">Tipos automáticos sin configuración extra</p>
              </div>
              <div className="text-center p-6 bg-purple-900/30 rounded-xl">
                <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Rendimiento SSG</h4>
                <p className="text-purple-100 text-sm">Todo se procesa en build time</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'when' && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">¿Cuándo usar Content Collections?</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {whenToUse.map((use, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 ${
                    use.recommended
                      ? 'bg-emerald-900/20 border-emerald-500/50'
                      : 'bg-red-900/20 border-red-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {use.icon}
                    <div>
                      <h4 className="text-white font-semibold">{use.scenario}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        use.recommended ? 'bg-emerald-600/30 text-emerald-200' : 'bg-red-600/30 text-red-200'
                      }`}>
                        {use.recommended ? '✅ Recomendado' : '❌ Considera otras opciones'}
                      </span>
                    </div>
                  </div>
                  <p className={use.recommended ? 'text-emerald-100' : 'text-red-100'}>
                    {use.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Nuevo en Astro 5.10: Live Content Collections
              </h4>
              <p className="text-indigo-100 mb-4">
                Astro 5.10 introduce una nueva función experimental: live content collections. Esta potente incorporación te permite obtener contenido en tiempo de ejecución en lugar de en tiempo de compilación, lo que abre nuevas posibilidades para el contenido dinámico y en tiempo real. 
              </p>
              <div className="bg-indigo-800/30 rounded-lg p-4">
                <p className="text-indigo-200 text-sm">
                  <strong>Perfecto para:</strong> Contenido que se actualiza con frecuencia desde CMS, API, bases de datos u otras fuentes mediante una API unificada, sin necesidad de reconstruir su sitio cuando los datos cambian.
                </p>
                <div>
  <p className="text-indigo-200 text-sm font-bold">Se debe habilitar en el archivo <code className="text-yellow-200">astro.config.mjs</code>:</p>
  <pre className="bg-gray-800 p-4 rounded-lg mt-2">
    <code className="text-yellow-200">
{`{
  experimental: {
    liveContentCollections: true
  }
}`}
    </code>
  </pre>
</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'how' && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">Implementación Paso a Paso</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">1. Define tu Schema (config.ts)</h4>
                <p>Cualquier documento que no coincida con el esquema no se agregará.</p>
                <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm">
                    <code className="text-green-400">{codeExamples.schema}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">2. Usa tus Collections</h4>
                <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm">
                    <code className="text-green-400">{codeExamples.usage}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">3. Astro 5.0+: Content Loaders</h4>
                <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm">
                    <code className="text-green-400">{codeExamples.loader}</code>
                  </pre>
                </div>
                <p className="text-blue-100 text-sm mt-2">
                  Los loaders te permiten cargar contenido desde cualquier fuente: APIs, bases de datos, 
                  archivos en diferentes ubicaciones, etc.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alternatives' && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">¿Content Collections o qué?</h3>
            
            <div className="space-y-6">
              {alternatives.map((alt, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">{alt.name}</h4>
                  <p className="text-white mb-4"><strong>Cuándo usar:</strong> {alt.when}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-emerald-400 font-medium mb-2">✅ Ventajas:</h5>
                      <ul className="text-emerald-100 text-sm space-y-1">
                        {alt.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-red-400 font-medium mb-2">❌ Desventajas:</h5>
                      <ul className="text-red-100 text-sm space-y-1">
                        {alt.cons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border border-yellow-500/30">
              <h4 className="text-yellow-200 font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Decisión Rápida
              </h4>
              <div className="text-yellow-100 space-y-2 text-sm">
                <p>¿Tienes ≥5 documentos homogéneos? → <strong>Content Collections</strong></p>
                <p>¿Pocas páginas que son únicas (about, contact, home)? → <strong>Páginas estáticas <code>.astro</code></strong></p>
                <p>¿Datos cambian cada minuto? → <strong>Live Collections o SSR</strong></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCollectionsGuide;