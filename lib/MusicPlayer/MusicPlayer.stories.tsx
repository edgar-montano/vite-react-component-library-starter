import type { Meta, StoryObj } from '@storybook/react';
import { MusicPlayer } from './MusicPlayer';

const meta = {
  title: 'Components/MusicPlayer',
  component: MusicPlayer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MusicPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: '../../static/Example.mp3',
    title: 'Baby Elephant Walk',
    artist: 'Henry Mancini',
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
  },
};

export const NoCoverArt: Story = {
  args: {
    src: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
    title: 'Baby Elephant Walk',
    artist: 'Henry Mancini',
  },
};

export const CustomStyle: Story = {
  args: {
    ...Default.args,
    className: 'bg-purple-100 dark:bg-purple-900',
  },
};
