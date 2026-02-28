import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import articles from '../data/articles.json';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const searchArticles = useCallback((searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    
    const matched = articles.filter(article => {
      const titleMatch = article.title.toLowerCase().includes(lowerQuery);
      const excerptMatch = article.excerpt?.toLowerCase().includes(lowerQuery);
      const tagsMatch = article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
      return titleMatch || excerptMatch || tagsMatch;
    });

    setResults(matched.slice(0, 8));
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    searchArticles(query);
  }, [query, searchArticles]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + Math.max(1, results.length)) % Math.max(1, results.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        navigate(`/articles/${results[selectedIndex].slug}`);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 sm:pt-24"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-terminal-black border-2 border-terminal-green rounded-lg shadow-lg overflow-hidden mt-8 sm:mt-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-terminal-green/30 p-3 sm:p-4">
          <span className="text-terminal-green mr-2 sm:mr-3 font-mono text-sm sm:text-base">&gt;_</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search articles..."
            className="flex-1 bg-transparent border-none outline-none text-terminal-green font-mono text-base sm:text-lg placeholder-terminal-green/50"
          />
          <kbd className="hidden sm:inline-block text-xs text-terminal-green/60 border border-terminal-green/30 px-2 py-1 rounded">ESC</kbd>
        </div>

        {results.length > 0 && (
          <ul className="max-h-64 sm:max-h-80 overflow-y-auto">
            {results.map((article, index) => (
              <li
                key={article.slug}
                onClick={() => {
                  navigate(`/articles/${article.slug}`);
                  onClose();
                }}
                className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer transition-colors border-b border-terminal-green/10 ${
                  index === selectedIndex 
                    ? 'bg-terminal-green/20 text-terminal-green' 
                    : 'hover:bg-terminal-green/10 text-terminal-green/80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-terminal-green/50 font-mono text-xs sm:text-sm">
                    {index + 1}.
                  </span>
                  <span className="font-medium text-sm sm:text-base">{article.title}</span>
                </div>
                {article.excerpt && (
                  <p className="text-xs sm:text-sm text-terminal-green/60 ml-5 sm:ml-6 mt-1 line-clamp-1">
                    {article.excerpt}
                  </p>
                )}
                {article.tags && (
                  <div className="flex gap-2 ml-5 sm:ml-6 mt-1">
                    {article.tags.map(tag => (
                      <span key={tag} className="text-xs text-terminal-green/40">#{tag}</span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <div className="p-4 sm:p-8 text-center text-terminal-green/50 font-mono text-sm sm:text-base">
            No articles found for "{query}"
          </div>
        )}

        {!query && (
          <div className="p-3 sm:p-4 text-xs sm:text-sm text-terminal-green/40 font-mono">
            <p className="mb-2">Quick tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Search by title, excerpt, or tags</li>
              <li>Use arrow keys to navigate, Enter to select</li>
              <li>Press ESC to close</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
