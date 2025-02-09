import type { Meta, StoryObj } from '@storybook/react';
import { InstrumentFrequencyGraph } from './InstrumentFrequencyGraph';
import { instrumentData } from './InstrumentFrequencyGraph.utils';

const meta = {
  title: 'Components/InstrumentFrequencyGraph',
  component: InstrumentFrequencyGraph,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InstrumentFrequencyGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    instrumentData: instrumentData,
  },
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
