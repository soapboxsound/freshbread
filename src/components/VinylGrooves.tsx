"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type VinylGroovesProps = {
  targetId?: string;
};

export function VinylGrooves({ targetId = "logo-mark" }: VinylGroovesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const target = document.getElementById(targetId);
      const rect = target?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : W * 0.5;
      const cy = rect ? rect.top + rect.height / 2 : H * 0.38;
      // Reach the farthest corner so grooves fill the viewport
      const maxR =
        Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) * 1.05;
      const minR = Math.min(W, H) * 0.06;

      let r = minR;
      let i = 0;
      while (r < maxR) {
        const wobble = (hash(i) - 0.5) * 0.4;
        const alpha = 0.024 + hash(i + 9) * 0.028;
        const start = hash(i + 2) * Math.PI * 2;
        const sweep =
          hash(i + 5) > 0.9 ? Math.PI * (0.5 + hash(i + 6) * 1.3) : Math.PI * 2;

        ctx.beginPath();
        ctx.arc(cx + wobble, cy + wobble * 0.6, r, start, start + sweep);
        ctx.strokeStyle = `rgba(28, 26, 25, ${alpha})`;
        ctx.lineWidth = hash(i + 3) > 0.88 ? 0.9 : 0.5;
        ctx.stroke();

        if (hash(i + 11) > 0.965) {
          const a = hash(i + 12) * Math.PI * 2;
          ctx.fillStyle = `rgba(28, 26, 25, ${0.05 + hash(i + 13) * 0.05})`;
          ctx.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0.8, 0.8);
        }

        r += 1.05 + hash(i + 4) * 0.45;
        i++;
      }

      for (let s = 0; s < 8; s++) {
        const a0 = hash(s + 40) * Math.PI * 2;
        const len = maxR * (0.08 + hash(s + 41) * 0.2);
        const rr = minR + hash(s + 42) * (maxR - minR) * 0.85;
        const x0 = cx + Math.cos(a0) * rr;
        const y0 = cy + Math.sin(a0) * rr;
        const tang = a0 + Math.PI / 2 + (hash(s + 43) - 0.5) * 0.45;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0 + Math.cos(tang) * len, y0 + Math.sin(tang) * len);
        ctx.strokeStyle = `rgba(28, 26, 25, ${0.035 + hash(s + 44) * 0.035})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, minR * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(28, 26, 25, 0.055)";
      ctx.fill();
    };

    // Wait a frame so page content (e.g. logo-mark) is in place after navigations
    const frame = window.requestAnimationFrame(paint);
    const onResize = () => paint();
    window.addEventListener("resize", onResize);
    const target = document.getElementById(targetId);
    const ro =
      target && "ResizeObserver" in window
        ? new ResizeObserver(paint)
        : null;
    if (target && ro) ro.observe(target);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [targetId, pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
