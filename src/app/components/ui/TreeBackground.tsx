"use client";

import { useEffect, useRef } from "react";

const r180 = Math.PI;
const r90 = Math.PI / 2;
const r15 = Math.PI / 12;

export default function BackgroundTree() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const random = Math.random;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(120,120,120,0.18)";

    const MIN_BRANCH = 30;
    const len = 6;

    let steps: (() => void)[] = [];
    let prevSteps: (() => void)[] = [];

    const polar2cart = (x: number, y: number, r: number, t: number) => [
      x + r * Math.cos(t),
      y + r * Math.sin(t),
    ];

    const step = (
      x: number,
      y: number,
      rad: number,
      counter = { value: 0 }
    ) => {
      const length = random() * len;
      counter.value++;

      const [nx, ny] = polar2cart(x, y, length, rad);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      if (
        nx < -100 ||
        nx > window.innerWidth + 100 ||
        ny < -100 ||
        ny > window.innerHeight + 100
      )
        return;

      const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

      if (random() < rate)
        steps.push(() => step(nx, ny, rad + random() * r15, counter));
      if (random() < rate)
        steps.push(() => step(nx, ny, rad - random() * r15, counter));
    };

    const frame = () => {
      prevSteps = steps;
      steps = [];

      if (!prevSteps.length) return;

      prevSteps.forEach((fn) => {
        if (random() < 0.5) steps.push(fn);
        else fn();
      });

      requestAnimationFrame(frame);
    };

    const randomMiddle = () => random() * 0.6 + 0.2;

    const start = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      prevSteps = [];
      steps = [
        () => step(randomMiddle() * window.innerWidth, -5, r90),
        () =>
          step(
            randomMiddle() * window.innerWidth,
            window.innerHeight + 5,
            -r90
          ),
        () => step(-5, randomMiddle() * window.innerHeight, 0),
        () =>
          step(
            window.innerWidth + 5,
            randomMiddle() * window.innerHeight,
            r180
          ),
      ];

      if (window.innerWidth < 500) steps = steps.slice(0, 2);
      frame();
    };

    start();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        maskImage: "radial-gradient(circle, black, transparent)",
        WebkitMaskImage: "radial-gradient(circle, black, transparent)",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
