import { useState, useEffect, useRef, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export default function ScrambleText({ 
  words = [], 
  interval = 3000,
  className = '',
  suffix = ''
}) {
  const [displayText, setDisplayText] = useState(words[0] + suffix);
  const currentRef = useRef(words[0] + suffix);
  const indexRef = useRef(0);
  const isScramblingRef = useRef(false);
  const timeoutsRef = useRef([]);

  const getRandomChar = useCallback(() => {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }, []);

  const scramble = useCallback((targetText) => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    
    const target = targetText;
    const currentLength = currentRef.current.length;
    const targetLength = target.length;
    
    let frame = 0;
    const maxFrames = 20;
    
    const animate = () => {
      if (frame > maxFrames) {
        isScramblingRef.current = false;
        return;
      }
      
      const progress = frame / maxFrames;
      
      const newText = Array.from({ length: Math.max(1, Math.min(targetLength, Math.round(currentLength + (targetLength - currentLength) * progress))) }, (_, i) => {
        if (frame === maxFrames) {
          return target[i] ?? ' ';
        }
        return Math.random() < progress ? (target[i] ?? getRandomChar()) : getRandomChar();
      }).join('') + (frame < maxFrames ? '' : suffix);
      
      setDisplayText(newText);
      currentRef.current = newText;
      
      if (frame < maxFrames) {
        const timeout = window.setTimeout(animate, 50);
        timeoutsRef.current.push(timeout);
      } else {
        isScramblingRef.current = false;
      }
      
      frame++;
    };
    
    animate();
  }, [getRandomChar, suffix]);

  useEffect(() => {
    if (words.length === 0) return;
    
    const intervalId = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % words.length;
      scramble(words[indexRef.current]);
    }, interval);

    return () => {
      clearInterval(intervalId);
      timeoutsRef.current.forEach(t => clearTimeout(t));
      timeoutsRef.current = [];
      isScramblingRef.current = false;
    };
  }, [interval, words, scramble]);

  if (words.length === 0) return null;

  return (
    <span 
      className={`inline-block overflow-hidden align-bottom ${className}`}
    >
      {displayText}
    </span>
  );
}
