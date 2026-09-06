import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const AmbientStarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 70 cosmic particles
    const colors = ['#07C160', '#4FC3F7', '#FFD54F', '#A78BFA', '#38BDF8'];
    const particles: Particle[] = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let tick = 0;
    const render = () => {
      tick += 0.01;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Subtle Deep Space Ambient Nebula Glows
      const grad1 = ctx.createRadialGradient(
        width * 0.2 + Math.sin(tick * 0.5) * 60,
        height * 0.3 + Math.cos(tick * 0.4) * 40,
        10,
        width * 0.2,
        height * 0.3,
        width * 0.45
      );
      grad1.addColorStop(0, 'rgba(7, 193, 96, 0.08)');
      grad1.addColorStop(0.6, 'rgba(56, 189, 248, 0.04)');
      grad1.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8 + Math.cos(tick * 0.6) * 50,
        height * 0.7 + Math.sin(tick * 0.5) * 50,
        10,
        width * 0.8,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(167, 139, 250, 0.07)');
      grad2.addColorStop(0.7, 'rgba(255, 213, 79, 0.03)');
      grad2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Update and Draw Particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x += (dx / dist) * 0.3;
          p.y += (dy / dist) * 0.3;
        }

        // Draw particle with soft glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.8 + Math.sin(tick * 2 + idx) * 0.2);
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        // Connect close particles with subtle constellation lasers
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pDist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (pDist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - pDist / 100) * 0.15;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none opacity-90"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
