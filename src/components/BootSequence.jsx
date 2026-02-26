import { useState, useEffect } from 'react';
import { siteConfig } from '../config';

const getBootLines = (username) => [
  `[    0.000000] Linux version 6.6.6-${username}s (${username}@dev.local)`,
  '[    0.000001] Boot config: terminal_mode=enabled',
  '[    0.000002] Memory: 32768MB available',
  '[    0.000003] CPU: AMD EPYC @ 3.0GHz',
  '[    0.000100] Loading modules...',
  '[    0.000200]   modprobe kernel.ko',
  '[    0.000200]   modprobe systems.ko',
  '[    0.000202]   modprobe infrastructure.ko',
  '[    0.001000] NET: Registered protocol family 38',
  '[    0.001001] IP: 10.0.0.42 assigned',
  `[    0.001002] Hostname: ${username}`,
  '[    0.002000] VFS: Mounting root (ext4) filesystem...',
  '[    0.002001] Loading user-space environment...',
  '[    0.002002] init: Starting daemon...',
  '[    0.002003] [OK] All systems nominal',
  `[    0.010000] ${username}@dev login: `,
];

export default function BootSequence({ onComplete }) {
  const [index, setIndex] = useState(0);
  const username = siteConfig.username;
  const bootLines = getBootLines(username);

  useEffect(() => {
    if (index < bootLines.length) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else if (index === bootLines.length) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  return (
    <div className="min-h-screen bg-terminal-bg p-4 sm:p-8 text-sm sm:text-base overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {bootLines.slice(0, index).map((line, i) => (
          <div key={i} className="whitespace-nowrap">{line}</div>
        ))}
        {index >= bootLines.length && <span className="animate-pulse">_</span>}
      </div>
    </div>
  );
}
