import { useState } from 'react';

export default function RandomCat({ cats }) {
  const [currentCat, setCurrentCat] = useState(cats[Math.floor(Math.random() * cats.length)]);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomCat = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cats.length);
      setCurrentCat(cats[randomIndex]);
      setIsLoading(false);
    }, 500);
  };

  const isGif = currentCat.url.includes('.gif');

  return (
    <div className="max-w-2xl mx-auto" data-island="RandomCat" data-framework="react">
      <div className="glass-effect glass-dark rounded-2xl overflow-hidden hover:glow-effect transition-all duration-300">
        <div className="relative">
          {isLoading ? (
            <div className="aspect-square bg-gray-800 flex items-center justify-center">
              <div className="text-6xl animate-spin">🐱</div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400">
                Buscando gato...
              </div>
            </div>
          ) : (
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={currentCat.url} 
                alt={`Gato ${currentCat.id}`}
                className="w-full h-full object-cover"
              />
              {isGif ? (
                <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-full text-sm font-medium text-yellow-200 border border-yellow-300/30">
                  GIF
                </div>
              ) : (
                <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-full text-sm font-medium text-blue-200 border border-blue-300/30">
                  Imagen
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Gato #{currentCat.id}
          </h2>
          <p className="text-gray-400 mb-6">
            {currentCat.width} x {currentCat.height}px • {isGif ? 'GIF' : 'Imagen'}
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={getRandomCat}
              disabled={isLoading}
              className="w-full glass-effect glass-purple text-white py-4 rounded-lg font-semibold hover:glow-effect transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center justify-center"
            >
              {isLoading ? (
                <>
                <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando...
                </>
            ) : (
                <span className="flex items-center justify-center gap-2">
                  🎲 ¡Otro gato aleatorio!
                </span>
              )}
            </button>
            
            <a 
              href={`/cats/${currentCat.id}`}
              className="block w-full glass-effect glass-blue text-white py-3 rounded-lg font-medium hover:glow-effect transition-all transform hover:scale-105"
            >
              📄 Ver página completa (SSG)
            </a>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              🏝️ Componente React hidratado • Estado local interactivo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}