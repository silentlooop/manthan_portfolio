import { useState, useRef, useEffect } from "react";
import { usePrefersReducedMotion } from "./terminal-effects";

type AsciiArtProps = {
  lines: string[];
  fontSize?: number;
  color?: string;
  dimColor?: string;
  staggerMs?: number;
  label?: string;
};

function AsciiArt({
  lines,
  fontSize = 12,
  color = "#ffffff",
  staggerMs = 30,
  label,
}: AsciiArtProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [scale, setScale] = useState(1);

  const maxLineLen = Math.max(...lines.map((l) => l.length), 1);
  const charWidth = fontSize * 0.6;
  const naturalWidth = maxLineLen * charWidth + 24;
  const naturalHeight = lines.length * fontSize * 1.3+24;

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealedCount(lines.length);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, lines.length]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return;

    let count = 0;
    setRevealedCount(0);
    const timer = setInterval(() => {
      count += 1;
      setRevealedCount(count);
      if (count >= lines.length) {
        clearInterval(timer);
      }
    }, staggerMs);

    return () => clearInterval(timer);
  }, [hasStarted, prefersReducedMotion, staggerMs, lines.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const containerWidth = el.clientWidth;
      const newScale = Math.max(0.2, Math.min(1, containerWidth / naturalWidth));
      setScale(newScale);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [naturalWidth]);

  return (
  <div
    ref={containerRef}
    className="w-full flex flex-col items-center overflow-hidden"
  >
    {label && (
      <p className="text-[11px] text-gray-500 font-mono mb-2 tracking-wider uppercase">
        {label}
      </p>
    )}
    <div
      style={{
        width: naturalWidth * scale,
        height: naturalHeight * scale,
        overflow: "hidden",
        borderRadius: "20px",
         marginTop: "30px",
      }}
    >
      <pre
        className="bg-[#111111]"
        style={{
          fontSize,
          lineHeight: 1.3,
          fontFamily: "monospace",
          whiteSpace: "pre",
          tabSize: 1,
          padding: "12px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${naturalWidth}px`,
        }}
      >
        {lines.slice(0, revealedCount).map((line, y) => (
          <div
            key={y}
            style={{
              animation: `fadeSlideIn 0.2s ease-out ${y * staggerMs}ms forwards`,
              color: color,
            }}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  </div>
);
}

export default AsciiArt;