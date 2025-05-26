"use client";

/**
 * audio-visualizer.tsx
 * This component provides a visual representation of audio activity.
 * It shows animated bars that respond to audio input and indicates speaking status.
 */

import { useEffect, useRef } from 'react';
import { AudioVisualizerProps } from '@/lib/types';

// AudioVisualizer component that displays animated bars based on audio input
export const AudioVisualizer = ({ isSpeaking, data, className = '' }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Draw the audio visualization
  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the bar width and spacing
    const barWidth = 3;
    const barSpacing = 2;
    const barCount = 20;

    // Draw the bars
    for (let i = 0; i < barCount; i++) {
      const x = i * (barWidth + barSpacing);
      const height = (data.frequencyData[i] / 255) * canvas.height;
      
      // Set the bar color based on speaking status
      ctx.fillStyle = isSpeaking ? '#3b82f6' : '#e5e7eb';
      
      // Draw the bar
      ctx.fillRect(
        x,
        canvas.height - height,
        barWidth,
        height
      );
    }

    // Request the next animation frame
    animationFrameRef.current = requestAnimationFrame(drawVisualization);
  };

  // Start or stop the visualization based on speaking status
  useEffect(() => {
    if (isSpeaking && data) {
      drawVisualization();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isSpeaking, data]);

  return (
    <div className={`relative w-full h-12 ${className}`}>
      <canvas
        ref={canvasRef}
        width={300}
        height={48}
        className="w-full h-full"
      />
    </div>
  );
}; 