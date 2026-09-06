import React, { useEffect, useRef } from 'react';

interface HyperspaceTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const HyperspaceTransition: React.FC<HyperspaceTransitionProps> = ({ isActive, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const centerX = width / 2;
    const centerY = height / 2;

    // Create 120 warp star streaks
    const stars = Array.from({ length: 120 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 50 + 10,
      speed: Math.random() * 25 + 15,
      length: Math.random() * 40 + 20,
      color: ['#07C160', '#38BDF8', '#FFD54F', '#FFFFFF'][Math.floor(Math.random() * 4)],
    }));

    let frame = 0;
    const maxFrames = 26; // ~400ms duration

    const loop = () => {
      frame++;
      ctx.fillStyle = `rgba(15, 23, 42, ${frame > 20 ? 0.2 : 0.4})`;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((s) => {
        s.dist += s.speed * (frame * 0.15 + 1);
        const x1 = centerX + Math.cos(s.angle) * s.dist;
        const y1 = centerY + Math.sin(s.angle) * s.dist;
        const x2 = centerX + Math.cos(s.angle) * (s.dist + s.length);
        const y2 = centerY + Math.sin(s.angle) * (s.dist + s.length);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = Math.min(4, s.dist / 80);
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color;
        ctx.stroke();
      });

      if (frame < maxFrames) {
        requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (onComplete) onComplete();
      }
    };

    loop();
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none select-none animate-in fade-in duration-100"
    />
  );
};
