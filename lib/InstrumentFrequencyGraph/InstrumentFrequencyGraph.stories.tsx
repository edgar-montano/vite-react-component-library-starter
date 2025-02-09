import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InstrumentFrequencyGraph from './InstrumentFrequencyGraph';
import { instrumentData } from './InstrumentFrequencyGraph.utils';

const meta: Meta<typeof InstrumentFrequencyGraph> = {
  title: 'Visualizations/InstrumentFrequencyGraph',
  component: InstrumentFrequencyGraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InstrumentFrequencyGraph>;

export const Default: Story = {
  render: () => (
    <div className="w-[800px]">
      <InstrumentFrequencyGraph instrumentData={instrumentData} />
    </div>
  ),
};

export const Narrow: Story = {
  render: () => (
    <div className="w-[400px]">
      <InstrumentFrequencyGraph instrumentData={instrumentData} />
    </div>
  ),
};

export const Wide: Story = {
  render: () => (
    <div className="w-[1200px]">
      <InstrumentFrequencyGraph instrumentData={instrumentData} />
    </div>
  ),
};
