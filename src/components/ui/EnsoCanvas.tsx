'use client';
import { useEffect, useRef } from 'react';

interface EnsoCanvasProps {
  onComplete?: () => void;
  color?: string;
  duration?: number;
}

// Each fiber: perpendicular offset (fraction of half-width), line width ratio, opacity ratio
// Positive offset = outer edge, negative = inner edge
const FIBERS = [
  { offset: 0.0, width: 1.0, alpha: 0.92 }, // center
  { offset: 0.18, width: 0.8, alpha: 0.55 }, // slightly outer
  { offset: -0.15, width: 0.75, alpha: 0.5 }, // slightly inner
  { offset: 0.38, width: 0.55, alpha: 0.22 }, // outer
  { offset: -0.33, width: 0.5, alpha: 0.18 }, // inner
  { offset: 0.57, width: 0.3, alpha: 0.07 }, // far outer
  { offset: -0.52, width: 0.25, alpha: 0.05 }, // far inner
];

interface Point {
  x: number;
  y: number;
  nx: number; // outward normal (perpendicular to stroke, away from center)
  ny: number;
  t: number;
  hw: number; // half-width at this point
}

export default function EnsoCanvas({
  onComplete,
  color = '#C0392A',
  duration = 3000,
}: EnsoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const pointsRef = useRef<Point[]>([]);
  const lastCountRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const N = 500;
    const startAngle = (5 * Math.PI) / 6; // 8 o'clock in canvas coordinates
    const totalAngle = Math.PI * 2 * 0.92; // ~1.85 turns — gap before start point

    function buildPoints() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.32;
      const maxHW = Math.min(w, h) * 0.048; // max stroke half-width
      const points: Point[] = [];

      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const angle = startAngle + totalAngle * t;

        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        // Outward normal = direction away from circle center
        const nx = Math.cos(angle);
        const ny = Math.sin(angle);

        // Pressure: ramp up at start, plateau, taper at end
        const rampUp = Math.min(t / 0.12, 1);
        const rampDown = Math.min((1 - t) / 0.18, 1);
        // Seeded organic variation — stable between frames
        const seed = Math.sin(i * 73.1) * 43758.5453;
        const variation = 0.92 + 0.08 * (seed - Math.floor(seed));
        const pressure = Math.min(1, rampUp * rampDown * variation);

        const hw = maxHW * pressure;
        points.push({ x, y, nx, ny, t, hw });
      }
      pointsRef.current = points;
    }

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      const off = document.createElement('canvas');
      off.width = canvas!.width;
      off.height = canvas!.height;
      offscreenRef.current = off;
      lastCountRef.current = 0;
      buildPoints();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    // Large ink blob at stroke start — simulates brush loaded with ink

    // Draw one stroke segment with all fiber layers
    function drawSegment(octx: CanvasRenderingContext2D, p0: Point, p1: Point) {
      if (p1.hw < 0.1) return;

      // Per-segment seeded jitter — slight organic wobble
      const seed = Math.sin(p1.t * 317.4) * 43758.5453;
      const jitter = (seed - Math.floor(seed) - 0.5) * 0.06;

      octx.lineCap = 'round';
      octx.strokeStyle = color;

      for (const fiber of FIBERS) {
        const fo = (fiber.offset + jitter) * p1.hw;
        octx.beginPath();
        octx.lineWidth = Math.max(0.4, p1.hw * fiber.width * 0.36);
        // Option A — ink density decreases along the stroke
        const inkDensity = 0.35 + 0.65 * Math.pow(1 - p1.t, 0.6);

        // Option B — dry brush: ~4% of segments randomly skipped
        const dryRng = Math.sin(p1.t * 541.3 + fiber.offset * 89.7) * 43758.5;
        if (dryRng - Math.floor(dryRng) > 0.96) continue;

        const lumSeed = Math.sin(p1.t * 211.3 + fiber.offset * 57.1) * 43758.5;
        const lumVar = 0.88 + 0.12 * (lumSeed - Math.floor(lumSeed));

        octx.globalAlpha = fiber.alpha * inkDensity * lumVar;

        octx.moveTo(p0.x + p0.nx * fo, p0.y + p0.ny * fo);
        octx.lineTo(p1.x + p1.nx * fo, p1.y + p1.ny * fo);
        octx.stroke();
      }
    }

    // Asymmetric easing: slow start (brush touching paper), fluid middle to end
    function easing(raw: number): number {
      if (raw < 0.08) return Math.pow(raw / 0.08, 2) * 0.06;
      return 0.06 + 0.94 * ((raw - 0.08) / 0.92);
    }

    let startTime: number | null = null;

    function draw(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const raw = Math.min((timestamp - startTime) / duration, 1);
      const progress = easing(raw);
      const count = Math.floor(progress * N);

      const points = pointsRef.current;
      const offscreen = offscreenRef.current;
      if (!offscreen) return;
      const offCtx = offscreen.getContext('2d')!;

      const from = lastCountRef.current;

      // Only draw new segments — offscreen accumulates the full stroke
      for (let i = Math.max(1, from); i <= count; i++) {
        drawSegment(offCtx, points[i - 1], points[i]);
      }
      lastCountRef.current = count;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.drawImage(offscreen, 0, 0);

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        onComplete?.();
      }
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [color, duration, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 w-full h-full'
      style={{ background: 'transparent' }}
    />
  );
}
