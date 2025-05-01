"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Point {
  x: number;
  y: number;
  delay: number;
}

interface LightEffect {
  from: Point;
  to: Point;
  progress: number;
  speed: number;
}

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const lightEffects = useRef<LightEffect[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create grid points (only at corners of 150px squares)
    const createGrid = () => {
      const spacing = 150;
      const cols = Math.ceil(window.innerWidth / spacing);
      const rows = Math.ceil(window.innerHeight / spacing);
      points.current = [];

      for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
          points.current.push({
            x: x * spacing,
            y: y * spacing,
            delay: Math.random() * 2 // Random delay between 0-2 seconds
          });
        }
      }
    };

    // Create light effects between points
    const createLightEffects = () => {
      lightEffects.current = [];
      for (let i = 0; i < points.current.length; i++) {
        const currentPoint = points.current[i];

        // Find adjacent points (right and bottom)
        const rightPoint = points.current.find(p =>
          p.x === currentPoint.x + 150 && p.y === currentPoint.y
        );
        const bottomPoint = points.current.find(p =>
          p.x === currentPoint.x && p.y === currentPoint.y + 150
        );

        if (rightPoint) {
          lightEffects.current.push({
            from: currentPoint,
            to: rightPoint,
            progress: 0,
            speed: 0.3 + Math.random() * 0.2 // Random speed between 0.3-0.5
          });
        }

        if (bottomPoint) {
          lightEffects.current.push({
            from: currentPoint,
            to: bottomPoint,
            progress: 0,
            speed: 0.3 + Math.random() * 0.2
          });
        }
      }
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      const spacing = 150;
      const cols = Math.ceil(window.innerWidth / spacing);
      const rows = Math.ceil(window.innerHeight / spacing);

      // Draw vertical lines
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * spacing, 0);
        ctx.lineTo(x * spacing, window.innerHeight);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * spacing);
        ctx.lineTo(window.innerWidth, y * spacing);
        ctx.stroke();
      }

      // Draw points
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      points.current.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animate light effects
      const time = Date.now() * 0.001;
      lightEffects.current.forEach((effect, _index) => {
        // Update progress with delay
        if (time > effect.from.delay) {
          effect.progress += effect.speed * 0.01;
          if (effect.progress > 1) {
            effect.progress = 0;
            effect.from.delay = time + Math.random() * 2; // Reset delay
          }
        }

        const x = effect.from.x + (effect.to.x - effect.from.x) * effect.progress;
        const y = effect.from.y + (effect.to.y - effect.from.y) * effect.progress;

        // Create gradient for light effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    createGrid();
    createLightEffects();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 -z-10"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
}