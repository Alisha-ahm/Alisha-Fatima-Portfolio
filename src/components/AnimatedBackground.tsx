import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
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

    // Dynamic Cyber Particles with luminous colors
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }

    const colors = ['#06b6d4', '#8b5cf6', '#10b981', '#ec4899', '#38bdf8'];
    const particleCount = Math.min(50, Math.floor(width / 28));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // Interactive mouse position
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle luminous connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            gradient.addColorStop(0, `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      for (const p of particles) {
        // Subtle mouse pull / deflection
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 140 && mDist > 0) {
          p.x -= (mdx / mDist) * 0.8;
          p.y -= (mdy / mDist) * 0.8;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulsing glow radius
        const currentAlpha = p.alpha + Math.sin(time + p.x) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.6, currentAlpha));
        ctx.fill();

        // Extra soft halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.02, Math.min(0.12, currentAlpha * 0.25));
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

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
    <>
      {/* Aurora Ambient Multi-Gradient Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-transparent rounded-full blur-[120px] animate-aurora" />
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-gradient-to-bl from-purple-600/15 via-pink-600/10 to-transparent rounded-full blur-[130px] animate-aurora" style={{ animationDelay: '-6s' }} />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-600/12 via-cyan-600/10 to-transparent rounded-full blur-[140px] animate-aurora" style={{ animationDelay: '-11s' }} />
      </div>

      {/* Canvas Interactive Particle Layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-10 opacity-70"
        style={{ mixBlendMode: 'screen' }}
      />
    </>
  );
};
