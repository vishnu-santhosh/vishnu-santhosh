import { Link, useParams } from 'react-router-dom';
import { navigation } from '../config';
import Logo from '../components/Logo';
import { formatDate } from '../utils/readTime';
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

export default function Tag({ onSearchClick }) {
  const { tag } = useParams();
  const filteredArticles = articles.filter(article => 
    article.tags && article.tags.includes(tag)
  );
  
  const groupedArticles = groupByYear(filteredArticles);
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

        {/* Tag Header */}
        <div className="mb-12">
          <h1 className="text-xl sm:text-2xl font-bold text-terminal-green">
            {tag}
          </h1>
          <p className="text-gray-500 mt-2">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Articles by Year */}
        {years.length > 0 ? (
          <div className="space-y-12">
            {years.map(year => (
              <section key={year}>
                <h2 className="text-lg font-bold text-terminal-blue mb-6">
                  ## {year}
                </h2>
                <div className="space-y-8">
                  {groupedArticles[year].map(article => (
                    <article key={article.slug} className="group">
                      <Link 
                        to={`/articles/${article.slug}`}
                        className="block cursor-pointer"
                      >
                        <div className="flex">
                          <span className="text-gray-500 text-sm whitespace-nowrap w-16 flex-shrink-0 pt-1">
                            {article.monthDay}
                          </span>
                          <div>
                            <h3 className="text-lg text-terminal-cyan hover:underline mb-1">
                              {article.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No articles found for #{tag}</p>
        )}

        {/* Back to Articles */}
        <div className="mt-12">
          <Link to="/articles" className="text-terminal-cyan hover:underline">
            [ .. all articles ]
          </Link>
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
