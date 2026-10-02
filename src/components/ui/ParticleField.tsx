"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; ox: number; oy: number; r: number; c: number };

const DARK = ["198,255,61", "45,226,230", "124,92,255"];
const LIGHT = ["101,163,13", "8,145,178", "124,92,255"];

// Interactive dot field: dots drift around their home position, get pushed
// away from the cursor and link up with lines near it.
export default function ParticleField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const host = canvas.parentElement!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let pts: P[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let palette = document.documentElement.classList.contains("light") ? LIGHT : DARK;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(140, (w * h) / 11000));
      pts = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return { x, y, ox: x, oy: y, vx: 0, vy: 0, r: Math.random() * 1.6 + 0.6, c: Math.floor(Math.random() * 3) };
      });
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = t.clientX - rect.left;
      mouse.y = t.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = mouse.y = -9999;
    };

    const themeObserver = new MutationObserver(() => {
      palette = document.documentElement.classList.contains("light") ? LIGHT : DARK;
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let raf = 0;
    let t = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const R = 150;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      t += 0.005;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        // Gentle drift around the home point.
        const hx = p.ox + Math.sin(t + p.oy * 0.01) * 12;
        const hy = p.oy + Math.cos(t + p.ox * 0.01) * 12;
        p.vx += (hx - p.x) * 0.01;
        p.vy += (hy - p.y) * 0.01;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < R && d > 0.1) {
            const f = (1 - d / R) * 2.4;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }
      // Lines between dots near the cursor.
      if (mouse.active) {
        for (let i = 0; i < pts.length; i++) {
          const a = pts[i];
          const da = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (da > R * 1.6) continue;
          for (let j = i + 1; j < pts.length; j++) {
            const b = pts[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 110) {
              ctx.strokeStyle = `rgba(${palette[a.c]},${(1 - d / 110) * (1 - da / (R * 1.6)) * 0.55})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      for (const p of pts) {
        const near = mouse.active ? Math.max(0, 1 - Math.hypot(p.x - mouse.x, p.y - mouse.y) / (R * 1.6)) : 0;
        ctx.fillStyle = `rgba(${palette[p.c]},${0.35 + near * 0.65})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + near * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    build();
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
    const ro = new ResizeObserver(build);
    ro.observe(host);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
