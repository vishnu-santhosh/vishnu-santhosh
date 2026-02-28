import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import BootSequence from './components/BootSequence';
import SearchModal from './components/SearchModal';
import SubscribeModal from './components/SubscribeModal';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Article from './pages/Article';
import Tag from './pages/Tag';
import Graph from './pages/Graph';
import About from './pages/About';
import articles from './data/articles.json';
import { siteConfig } from './config';

export default function App() {
  const [booted, setBooted] = useState(() => {
    return sessionStorage.getItem('bootComplete') === 'true';
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

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
      <SubscribeModal 
        isOpen={subscribeOpen} 
        onClose={() => setSubscribeOpen(false)}
        url={siteConfig.newsletter.url}
      />
      <Routes>
        <Route path="/" element={<Home articles={articles} onSearchClick={() => setSearchOpen(true)} onSubscribeClick={() => setSubscribeOpen(true)} />} />
        <Route path="/articles" element={<Writing onSearchClick={() => setSearchOpen(true)} />} />
        <Route path="/articles/:slug" element={<Article articles={articles} onSearchClick={() => setSearchOpen(true)} />} />
        <Route path="/tags/:tag" element={<Tag onSearchClick={() => setSearchOpen(true)} />} />
        <Route path="/graph" element={<Graph onSearchClick={() => setSearchOpen(true)} />} />
        <Route path="/about" element={<About onSearchClick={() => setSearchOpen(true)} />} />
      </Routes>
    </HashRouter>
  );
}
