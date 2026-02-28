import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import BootSequence from './components/BootSequence';
import SearchModal from './components/SearchModal';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Article from './pages/Article';
import About from './pages/About';
import articles from './data/articles.json';

export default function App() {
  const [booted, setBooted] = useState(() => {
    return sessionStorage.getItem('bootComplete') === 'true';
  });
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (booted) {
      sessionStorage.setItem('bootComplete', 'true');
    }
  }, [booted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <HashRouter>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <Routes>
        <Route path="/" element={<Home articles={articles} onSearchClick={() => setSearchOpen(true)} />} />
        <Route path="/articles" element={<Writing onSearchClick={() => setSearchOpen(true)} />} />
        <Route path="/articles/:slug" element={<Article articles={articles} onSearchClick={() => setSearchOpen(true)} />} />
        <Route path="/about" element={<About onSearchClick={() => setSearchOpen(true)} />} />
      </Routes>
    </HashRouter>
  );
}
