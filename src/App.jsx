import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, ChevronLeft, Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gamesData from './data/games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(gamesData.map(g => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => { setSelectedGame(null); setActiveCategory('All'); setSearchQuery(''); }}
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              Unblocked<span className="text-indigo-500">Games</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors hidden md:block">
              Request Game
            </button>
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
              <span className="text-xs font-bold">?</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="game-player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={closeGame}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Library
                </button>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs font-medium text-indigo-400">
                    {selectedGame.category}
                  </span>
                </div>
              </div>

              <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative group">
                <iframe
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">{selectedGame.title}</h2>
                  <p className="text-neutral-400 max-w-2xl leading-relaxed">
                    {selectedGame.description}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
                    <Play className="w-5 h-5 fill-current" />
                    Restart
                  </button>
                  <button className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors">
                    <Info className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="game-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      onClick={() => handleGameSelect(game)}
                      className="group cursor-pointer bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-indigo-500/50 transition-all shadow-lg hover:shadow-indigo-500/10"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                        <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                          {game.category}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-indigo-600 p-3 rounded-full shadow-xl scale-75 group-hover:scale-100 transition-transform">
                            <Play className="w-6 h-6 fill-current text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 space-y-1">
                        <h3 className="font-bold text-lg group-hover:text-indigo-400 transition-colors">
                          {game.title}
                        </h3>
                        <p className="text-sm text-neutral-500 line-clamp-1">
                          {game.description}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto">
                      <X className="w-8 h-8 text-neutral-700" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">No games found</h3>
                      <p className="text-neutral-500">Try searching for something else or check another category.</p>
                    </div>
                    <button 
                      onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                      className="text-indigo-500 font-medium hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Gamepad2 className="w-5 h-5" />
            <span className="font-bold tracking-tight">UnblockedGames Hub</span>
          </div>
          <div className="flex gap-8 text-sm text-neutral-500">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-neutral-600">
            © 2026 UnblockedGames Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
