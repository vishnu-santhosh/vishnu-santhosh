import { Link } from 'react-router-dom';
import { siteConfig, navigation } from '../config';
import Logo from '../components/Logo';
import ScrambleText from '../components/ScrambleText';
import { formatDate } from '../utils/readTime';
import articles from '../data/articles.json';

export default function Home({ onSearchClick, onSubscribeClick }) {
  const latestArticles = articles.slice(0, 4);
  const currentJob = siteConfig.experience[0];

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green p-4 sm:p-8">
      <div className="scanlines" />
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-row items-center justify-between mb-12 gap-4">
          <Logo />
          <Nav onSearchClick={onSearchClick} />
        </header>

        {/* Intro */}
        <section className="mb-12">
          <p className="text-lg sm:text-xl mb-6 text-terminal-cyan font-mono">
            Notes from <ScrambleText words={siteConfig.cyclingWords} /> who can't stop asking why.
          </p>
          
          <div className="text-gray-300 space-y-2 mb-6">
            <p>
              Currently {siteConfig.currentActivity}{' '}
              <a 
                href={currentJob.link} 
                className="text-terminal-cyan hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {currentJob.company}
              </a>
              .
            </p>
            
            <p className="text-gray-400">
              {siteConfig.sitePhilosophy}
            </p>
          </div>

          {/* Work History */}
          <div className="text-sm space-y-1">
            <p className="text-gray-500">Previously:</p>
            {siteConfig.experience.slice(1).map((job, i) => (
              <p key={i} className="text-gray-400">
                {job.role} at {job.company}
              </p>
            ))}
          </div>
        </section>

        {/* Latest Writing */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-terminal-blue">
              ## Latest writing
            </h2>
            <Link to="/articles" className="text-terminal-green hover:underline text-sm">
              [ All writing ]
            </Link>
          </div>
          
          <div className="space-y-6">
            {latestArticles.map((article) => (
              <article key={article.slug}>
                <Link to={`/articles/${article.slug}`} className="block group">
                  <div className="flex items-start">
                    <span className="text-gray-500 text-xs whitespace-nowrap w-24 sm:w-28 flex-shrink-0 pt-1">
                      {formatDate(article.date)}
                    </span>
                    <div>
                      <h3 className="text-lg text-terminal-cyan group-hover:underline mb-1">
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

        {/* Newsletter */}
        {siteConfig.newsletter.enabled && (
          <section className="mb-12">
            <h2 className="text-lg font-bold mb-4 text-terminal-blue">
              ### Join the mailing list
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Get Linux & kernel insights delivered to your inbox.
            </p>
            <button
              onClick={onSubscribeClick}
              className="border border-terminal-green text-terminal-green px-4 py-2 hover:bg-terminal-green hover:text-terminal-bg transition-colors cursor-pointer"
            >
              [ Subscribe ]
            </button>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-6 pb-8">
          <div className="flex flex-wrap gap-4 text-sm justify-center">
            <a 
              href={siteConfig.social.github} 
              className="hover:text-terminal-green cursor-pointer"
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a 
              href={siteConfig.social.linkedin} 
              className="hover:text-terminal-green cursor-pointer"
              target="_blank" 
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a 
              href={`mailto:${siteConfig.social.email}`} 
              className="hover:text-terminal-green cursor-pointer"
            >
              Email
            </a>
          </div>
          <div className="mt-4 text-gray-600 text-xs text-center">
            © {new Date().getFullYear()} {siteConfig.name}
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
