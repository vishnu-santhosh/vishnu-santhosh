import { Link } from 'react-router-dom';
import { navigation } from '../config';
import Logo from '../components/Logo';
import articles from '../data/articles.json';

function groupByYear(articles) {
  const groups = {};
  articles.forEach(article => {
    const year = article.year;
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(article);
  });
  return groups;
}

export default function Writing({ onSearchClick }) {
  const groupedArticles = groupByYear(articles);
  const years = Object.keys(groupedArticles).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green p-4 sm:p-8">
      <div className="scanlines" />
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-row items-center justify-between mb-12 gap-4">
          <Logo />
          <Nav onSearchClick={onSearchClick} />
        </header>

        <div className="space-y-12">
          {years.map(year => (
            <section key={year}>
              <h2 className="text-lg font-bold mb-6 text-terminal-green">
                {year}
              </h2>
              <div className="space-y-8">
                {groupedArticles[year].map(article => (
                  <article key={article.slug} className="group">
                    <Link 
                      to={`/articles/${article.slug}`}
                      className="block cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                        <span className="text-gray-500 text-sm whitespace-nowrap sm:w-16">
                          {article.monthDay}
                        </span>
                        <h3 className="text-lg text-terminal-cyan hover:underline">
                          {article.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm sm:ml-24 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-gray-800 pt-6 pb-8 text-sm mt-16">
          <div className="text-gray-500 text-center">
            [OK] End of file.
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
