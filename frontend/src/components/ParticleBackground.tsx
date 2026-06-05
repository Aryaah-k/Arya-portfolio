"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    //  create safe references for TS
    const safeCanvas = canvas;
    const safeCtx = ctx;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * safeCanvas.width;
        this.y = Math.random() * safeCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > safeCanvas.width) this.x = 0;
        if (this.x < 0) this.x = safeCanvas.width;
        if (this.y > safeCanvas.height) this.y = 0;
        if (this.y < 0) this.y = safeCanvas.height;
      }

      draw() {
        safeCtx.fillStyle = "rgba(255, 255, 255, 0.45)";
        safeCtx.beginPath();
        safeCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        safeCtx.closePath();
        safeCtx.fill();
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = 70;

      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            safeCtx.beginPath();
            safeCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            safeCtx.lineWidth = 1;
            safeCtx.moveTo(particlesArray[a].x, particlesArray[a].y);
            safeCtx.lineTo(particlesArray[b].x, particlesArray[b].y);
            safeCtx.stroke();
          }
        }
      }
    };

    const animate = () => {
      safeCtx.clearRect(0, 0, safeCanvas.width, safeCanvas.height);

      particlesArray.forEach((p) => {
        p.update();
        p.draw();
      });

      connect();
      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black"
    />
  );
}