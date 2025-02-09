import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';

interface OscilloscopeProps {
  oscillator: Tone.Oscillator;
  width?: number;
  height?: number;
  color?: string;
  isPaused?: boolean;
}

export const Oscilloscope: React.FC<OscilloscopeProps> = ({
  oscillator,
  width = 300,
  height = 150,
  color = '#00ff00',
  isPaused = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;

    const fft = new Tone.FFT(2048);
    oscillator.connect(fft);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!isPaused) {
        animationFrameRef.current = requestAnimationFrame(draw);

        const frequencies = fft.getValue();

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.beginPath();

        const barWidth = width / frequencies.length;
        let x = 0;

        // Draw frequency bars
        for (let i = 0; i < frequencies.length; i++) {
          const dbValue = frequencies[i];
          const normalizedValue = (dbValue + 100) / 100;
          const barHeight = normalizedValue * (height - 30); // Reserve space for labels

          ctx.fillStyle = color;
          ctx.fillRect(x, height - 30 - barHeight, barWidth, barHeight);

          // Add frequency labels every 100 bins
          if (i % 256 === 0) {
            const freq = Math.round((i * 24000) / frequencies.length); // Nyquist frequency is ~24kHz
            ctx.fillStyle = color;
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${freq}Hz`, x, height - 5);
          }

          x += barWidth;
        }
      }
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      oscillator.disconnect(fft);
    };
  }, [oscillator, width, height, color, isPaused]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ backgroundColor: 'black' }}
    />
  );
};
