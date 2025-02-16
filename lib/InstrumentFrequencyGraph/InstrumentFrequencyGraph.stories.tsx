import type { Meta, StoryObj } from '@storybook/react';
import InstrumentFrequencyGraph from './InstrumentFrequencyGraph';
import { instrumentData } from './InstrumentFrequencyGraph.utils';

const meta = {
  title: 'Components/InstrumentFrequencyGraph',
  component: InstrumentFrequencyGraph,
  parameters: {
    layout: 'centered',
  },
  args: {
    instrumentData: instrumentData,
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
  args: {
    instrumentData: instrumentData,
  },
  render: (args) => (
    <div className="w-[400px]">
      <InstrumentFrequencyGraph {...args} />
    </div>
  ),
};

export const Wide: Story = {
  args: {
    instrumentData: instrumentData,
  },
  render: (args) => (
    <div className="w-[1200px]">
      <InstrumentFrequencyGraph {...args} />
    </div>
  ),
};
