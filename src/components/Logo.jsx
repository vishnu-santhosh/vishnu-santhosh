import { Link } from 'react-router-dom';
import { siteConfig } from '../config';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center cursor-pointer">
      <span className="text-lg font-bold terminal-bracket">[</span>
      <span className="text-lg font-bold text-terminal-cyan px-1">{siteConfig.username}</span>
      <span className="text-lg font-bold terminal-bracket">]</span>
    </Link>
  );
}
