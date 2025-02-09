'use client';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import type { InstrumentData } from './InstrumentFrequencyGraph.utils';

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

interface InstrumentFrequencyGraphProps {
  instrumentData: InstrumentData[];
}

const InstrumentFrequencyGraph: React.FC<InstrumentFrequencyGraphProps> = ({ instrumentData }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  useEffect(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    setAudioContext(ctx);
    return () => {
      if (ctx.state !== 'closed') {
        ctx.close();
      }
    };
  }, []);

  const stopSound = useCallback(() => {
    if (oscillator) {
      oscillator.stop();
      setOscillator(null);
    }
  }, [oscillator]);

  const playFrequency = useCallback(
    (startFreq: number, endFreq: number) => {
      if (!audioContext) return;

      stopSound();

      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      osc.frequency.value = (startFreq + endFreq) / 2;
      osc.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);

      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + 1);

      setOscillator(osc);
    },
    [audioContext, stopSound],
  );

  const formatFreq = (freq: number): string => {
    if (freq >= 1000) {
      return `${(freq / 1000).toFixed(1)}kHz`;
    }
    return `${freq}Hz`;
  };

  interface CustomBarProps {
    x: number;
    y: number;
    width: number;
    height: number;
    payload: {
      startFreq: number;
      endFreq: number;
      color: string;
    };
  }

  const CustomBar: React.FC<CustomBarProps> = ({ x, y, width, height, payload }) => {
    if (!payload || typeof x !== 'number' || typeof y !== 'number') {
      return null;
    }

    const barWidth = (Math.log10(payload.endFreq / 20) / Math.log10(10000 / 20)) * width;
    const barX = (Math.log10(payload.startFreq / 20) / Math.log10(10000 / 20)) * width;

    return (
      <g>
        <rect
          x={x + barX}
          y={y + 2}
          width={Math.max(0, barWidth - barX)}
          height={height - 4}
          fill={payload.color}
          className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          onClick={() => playFrequency(payload.startFreq, payload.endFreq)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              playFrequency(payload.startFreq, payload.endFreq);
            }
          }}
          tabIndex={0}
          role="button"
        />
      </g>
    );
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Instrument Frequency Ranges</h2>
      <div className="h-96">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={instrumentData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[20, 10000]}
              scale="log"
              tickFormatter={formatFreq}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.[0]?.payload) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-gray-800 p-2 rounded shadow">
                      <p className="text-white">{data.name}</p>
                      <p className="text-gray-300">
                        Range: {formatFreq(data.startFreq)} - {formatFreq(data.endFreq)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="endFreq"
              shape={<CustomBar />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        <p>Click on any instrument to hear a sample tone in its frequency range</p>
        <div className="mt-2 flex flex-wrap gap-4">
          {Object.keys(_.groupBy(instrumentData, 'category')).map((category) => (
            <div
              key={category}
              className="flex items-center"
            >
              <div
                className="w-4 h-4 mr-2 rounded"
                style={{
                  backgroundColor: instrumentData.find((i) => i.category === category)?.color,
                }}
              />
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstrumentFrequencyGraph;
