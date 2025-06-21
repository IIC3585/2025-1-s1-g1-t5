import { useState, useEffect } from "react";

const REACTIONS = [
  { emoji: "😻", name: "Me encanta", color: "from-pink-500 to-red-500" },
  { emoji: "😸", name: "Divertido", color: "from-yellow-500 to-orange-500" },
  { emoji: "🥰", name: "Adorable", color: "from-purple-500 to-pink-500" },
  { emoji: "😱", name: "Impresionante", color: "from-blue-500 to-cyan-500" },
  { emoji: "🤩", name: "Genial", color: "from-green-500 to-teal-500" },
];

export default function CatReactions({ catId }) {
  const [reactions, setReactions] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [isAnimating, setIsAnimating] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  // Simulación de reacciones iniciales
  useEffect(() => {
    const mockReactions = {};
    REACTIONS.forEach((reaction, index) => {
      const seed = catId.charCodeAt(0) + index;
      mockReactions[reaction.name] = Math.floor((seed * 7) % 20) + 1;
    });
    setReactions(mockReactions);
  }, [catId]);

  const handleReaction = (reactionName) => {
    if (userReaction === reactionName) {
      setReactions((prev) => ({
        ...prev,
        [reactionName]: Math.max(0, prev[reactionName] - 1),
      }));
      setUserReaction(null);
    } else {
      if (userReaction) {
        setReactions((prev) => ({
          ...prev,
          [userReaction]: Math.max(0, prev[userReaction] - 1),
        }));
      }

      setReactions((prev) => ({
        ...prev,
        [reactionName]: (prev[reactionName] || 0) + 1,
      }));
      setUserReaction(reactionName);

      setIsAnimating(reactionName);
      setTimeout(() => setIsAnimating(null), 300);

      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 2000);
    }
  };

  const getTotalReactions = () => {
    return Object.values(reactions).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="relative" data-island="CatReactions" data-framework="react">
      {showThankYou && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20">
          <div className="glass-effect glass-green px-4 py-2 rounded-full text-white font-medium animate-bounce">
            ¡Gracias por tu reacción! 🎉
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="glass-effect glass-dark p-4 rounded-lg inline-block">
          <div className="text-2xl font-bold text-white">
            {getTotalReactions()}
          </div>
          <div className="text-sm text-gray-400">reacciones totales</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {REACTIONS.map((reaction) => {
          const isSelected = userReaction === reaction.name;
          const isCurrentlyAnimating = isAnimating === reaction.name;
          const count = reactions[reaction.name] || 0;

          return (
            <button
              key={reaction.name}
              onClick={() => handleReaction(reaction.name)}
              className={`
                group relative p-4 rounded-xl transition-all duration-300 transform
                ${
                  isSelected
                    ? `bg-gradient-to-br ${reaction.color} shadow-lg scale-105 glow-effect`
                    : "glass-effect glass-dark hover:glass-purple hover:scale-105"
                }
                ${isCurrentlyAnimating ? "animate-pulse" : ""}
                hover:shadow-xl
              `}
            >
              <div className="text-center">
                <div
                  className={`text-3xl mb-2 transition-transform duration-200 ${
                    isCurrentlyAnimating
                      ? "animate-bounce"
                      : "group-hover:scale-110"
                  }`}
                >
                  {reaction.emoji}
                </div>
                <div
                  className={`text-sm font-medium mb-1 ${
                    isSelected
                      ? "text-white"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  {reaction.name}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-gray-700 text-gray-400 group-hover:bg-purple-600/30 group-hover:text-purple-200"
                  }`}
                >
                  {count}
                </div>
              </div>

              {/* Efecto de partículas al hacer clic */}
              {isCurrentlyAnimating && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-lg animate-ping"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${20 + i * 8}%`,
                        animationDelay: `${i * 100}ms`,
                        animationDuration: "600ms",
                      }}
                    >
                      {reaction.emoji}
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {userReaction && (
        <div className="mt-6 text-center">
          <div className="glass-effect glass-purple p-3 rounded-lg inline-block">
            <span className="text-white text-sm">
              Tu reacción: <span className="font-semibold">{userReaction}</span>
            </span>
            <button
              onClick={() => handleReaction(userReaction)}
              className="ml-2 text-red-300 hover:text-red-200 text-sm"
            >
              ✕ quitar
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <p className="text-xs text-gray-500 text-center">
          🏝️ Isla React • Estado local interactivo • Hidratación client:load
        </p>
      </div>
    </div>
  );
}
