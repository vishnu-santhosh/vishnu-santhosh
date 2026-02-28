import { Link, useParams } from 'react-router-dom';
import { navigation } from '../config';
import Logo from '../components/Logo';
import { formatDate, calculateReadTime } from '../utils/readTime';

export default function Article({ articles, onSearchClick }) {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green p-4 sm:p-8">
        <div className="scanlines" />
        <div className="max-w-3xl mx-auto">
          <header className="flex flex-row items-center justify-between mb-12 gap-4">
            <Logo />
            <Nav onSearchClick={onSearchClick} />
          </header>
          <h1 className="text-xl">[ERROR] Article not found</h1>
          <Link to="/" className="text-terminal-cyan hover:underline">
            [ Return home ]
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green p-4 sm:p-8">
      <div className="scanlines" />
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-row items-center justify-between mb-12 gap-4">
          <Logo />
          <Nav onSearchClick={onSearchClick} />
        </header>
        
        <Link 
          to="/articles" 
          className="text-terminal-green hover:underline text-sm mb-8 block cursor-pointer"
        >
          [ .. back to articles ]
        </Link>

        <article>
          <header className="mb-6">
            <div className="text-gray-500 mb-4">
              [{formatDate(article.date)}] · {calculateReadTime(article.content)}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold glow mb-4">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-gray-400 text-base leading-relaxed mb-4">
                {article.excerpt}
              </p>
            )}
            {article.tags && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span 
                    key={tag}
                    className="text-xs text-gray-600 bg-gray-900 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        <footer className="border-t border-gray-800 pt-6 pb-8 text-sm mt-16">
          <div className="text-gray-500 text-center">
            [OK] End of article.
          </div>
        </footer>
      </div>
    </div>
  );
}

function Nav({ onSearchClick }) {
  return (
    <nav className="flex items-center gap-3 sm:gap-4">
      {navigation.slice(1).map((item) => (
        <NavLink key={item.path} to={item.path}>
          {item.label}
        </NavLink>
      ))}
      <button
        onClick={onSearchClick}
        className="text-sm sm:text-base transition-all duration-200 hover:text-terminal-green hover:underline cursor-pointer"
        title="Search (Ctrl+K)"
      >
        search
      </button>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-sm sm:text-base transition-all duration-200 hover:text-terminal-green hover:underline cursor-pointer"
    >
      {children}
    </Link>
  );
}
