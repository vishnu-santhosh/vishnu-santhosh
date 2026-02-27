import { Link } from 'react-router-dom';
import { siteConfig, navigation } from '../config';
import Logo from '../components/Logo';

export default function About() {
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green p-4 sm:p-8">
      <div className="scanlines" />
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-row items-center justify-between mb-12 gap-4">
          <Logo />
          <Nav />
        </header>

        <div className="space-y-8 text-sm leading-relaxed">
          
          {/* Intro */}
          <section>
            <div className="whitespace-pre-line text-gray-200 mb-6">
              {siteConfig.intro}
            </div>
          </section>

          {/* Photo */}
          {siteConfig.photoUrl && (
            <section className="my-8">
              <img 
                src={siteConfig.photoUrl} 
                alt={siteConfig.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg border-2 border-terminal-green object-cover"
              />
            </section>
          )}

          {/* Experience */}
          <section>
            <h2 className="text-lg font-bold mb-6 text-terminal-green">
              ## Experience
            </h2>
            
            <div className="space-y-8">
              {siteConfig.experience.map((job, i) => (
                <div key={i} className="sm:flex sm:gap-4">
                  <span className="text-gray-500 whitespace-nowrap sm:w-28 flex-shrink-0">
                    {job.period}
                  </span>
                  <div className="sm:flex-1">
                    <div className="mb-2">
                      <span className="text-terminal-amber">{job.role}</span>
                      {' · '}
                      <a 
                        href={job.link}
                        className="text-terminal-cyan hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {job.company}
                      </a>
                    </div>
                    <p className="text-gray-400 max-w-2xl">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <a 
                href={siteConfig.social.linkedin}
                className="text-terminal-cyan hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                [ Full CV on LinkedIn ]
              </a>
            </div>
          </section>

          {/* Other Pursuits */}
          {siteConfig.otherPursuits && (
            <section>
              <h2 className="text-lg font-bold mb-4 text-terminal-green">
                ## Other pursuits
              </h2>
              <div className="whitespace-pre-line text-gray-400">
                {siteConfig.otherPursuits}
              </div>
            </section>
          )}

          {/* Newsletter */}
          {siteConfig.newsletter.enabled && (
            <section>
              <h2 className="text-lg font-bold mb-4 text-terminal-blue">
                ### Join the mailing list
              </h2>
              <p className="text-gray-400 mb-4">
                I'll send new posts to your inbox.
              </p>
              <form 
                className="flex flex-col sm:flex-row gap-2" 
                action={siteConfig.newsletter.url}
                method="GET"
                target="_blank"
              >
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-terminal-bg border border-terminal-green px-3 py-2 text-terminal-green placeholder-gray-600 focus:outline-none focus:border-terminal-cyan transition-colors"
                />
                <button
                  type="submit"
                  className="bg-terminal-green text-terminal-bg px-4 py-2 font-bold hover:bg-terminal-cyan transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </section>
          )}
        </div>

        <footer className="border-t border-gray-800 pt-6 pb-8 text-sm mt-16">
          <div className="text-gray-500 text-center">
            {siteConfig.name}
          </div>
          <div className="flex flex-wrap gap-4 text-sm sm:text-base mt-4 justify-center">
            <a 
              href="/feed.xml" 
              className="hover:text-terminal-green cursor-pointer"
            >
              RSS
            </a>
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
        </footer>

      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="flex items-center gap-3 sm:gap-4">
      {navigation.slice(1).map((item) => (
        <NavLink key={item.path} to={item.path}>
          {item.label}
        </NavLink>
      ))}
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
