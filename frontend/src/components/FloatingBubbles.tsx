"use client";

import React, { useEffect, useState } from "react";

export default function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<React.CSSProperties[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const generated = Array.from({ length: 14 }).map(() => ({
        width: `${120 + Math.random() * 220}px`,
        height: `${120 + Math.random() * 220}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${10 + Math.random() * 12}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: 0.16 + Math.random() * 0.22,
        transform: `scale(${0.8 + Math.random() * 0.6})`,
      }));

      setBubbles(generated);
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {bubbles.map((style, i) => (
        <span
          key={i}
          className="absolute rounded-full blur-3xl animate-bubble"
          style={{
            ...style,
            background:
              "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.45), rgba(236,72,153,0.22), transparent 70%)",
            boxShadow:
              "0 0 70px rgba(99,102,241,0.18), 0 0 100px rgba(236,72,153,0.12)",
          }}
        />
      ))}
    </div>
  );
}