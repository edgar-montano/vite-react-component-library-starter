import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Oscilloscope } from './Oscilloscope';
import * as Tone from 'tone';

const meta: Meta<typeof Oscilloscope> = {
  title: 'Components/Oscilloscope',
  component: Oscilloscope,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Oscilloscope>;

const OscilloscopeWrapper: React.FC<{ waveform: Tone.ToneOscillatorType }> = ({ waveform }) => {
  const [oscillator, setOscillator] = useState<Tone.Oscillator | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const osc = new Tone.Oscillator(440, waveform);

    osc.start();
    setOscillator(osc);

    return () => {
      osc.stop();
      osc.dispose();
    };
  }, [waveform]);

  useEffect(() => {
    if (!oscillator) return;

    if (isPaused) {
      oscillator.volume.value = Number.NEGATIVE_INFINITY;
    } else {
      oscillator.volume.value = 0;
    }
  }, [isPaused, oscillator]);

  if (!oscillator) return null;

  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          // Ensure audio context is started
          await Tone.start();
          setIsPaused(!isPaused);
        }}
        style={{ marginBottom: '10px' }}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <Oscilloscope
        oscillator={oscillator}
        width={400}
        height={200}
        isPaused={isPaused}
      />
    </div>
  );
};

export const SineWave: Story = {
  render: () => <OscilloscopeWrapper waveform="sine" />,
};

export const SquareWave: Story = {
  render: () => <OscilloscopeWrapper waveform="square" />,
};

export const SawtoothWave: Story = {
  render: () => <OscilloscopeWrapper waveform="sawtooth" />,
};
