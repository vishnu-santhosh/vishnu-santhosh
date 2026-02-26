import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-3 py-1 transition-all duration-200 ${
        isActive(to) 
          ? 'text-terminal-bg bg-terminal-green font-bold' 
          : 'hover:text-terminal-green hover:underline'
      }`}
    >
      [ {children} ]
    </Link>
  );

  return (
    <nav className="flex items-center gap-4 mb-8 flex-wrap">
      <NavLink to="/">home</NavLink>
      <NavLink to="/writing">writing</NavLink>
      <NavLink to="/about">about</NavLink>
    </nav>
  );
}
