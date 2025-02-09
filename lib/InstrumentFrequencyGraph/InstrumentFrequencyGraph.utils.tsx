export interface InstrumentData {
  name: string;
  startFreq: number;
  endFreq: number;
  category: string;
  color: string;
}

export const instrumentData: InstrumentData[] = [
  // VOCALS (Blue)
  {
    name: 'Female Vocals',
    startFreq: 250,
    endFreq: 4000,
    category: 'VOCALS',
    color: '#89CFF0',
  },
  {
    name: 'Male Vocals',
    startFreq: 100,
    endFreq: 3000,
    category: 'VOCALS',
    color: '#00A6E4',
  },
  // BRASS (Purple-Blue)
  {
    name: 'Tuba',
    startFreq: 30,
    endFreq: 300,
    category: 'BRASS',
    color: '#4B0082',
  },
  {
    name: 'French Horn',
    startFreq: 60,
    endFreq: 1000,
    category: 'BRASS',
    color: '#483D8B',
  },
  {
    name: 'Trombone',
    startFreq: 65,
    endFreq: 1000,
    category: 'BRASS',
    color: '#6A5ACD',
  },
  {
    name: 'Trumpet',
    startFreq: 150,
    endFreq: 1500,
    category: 'BRASS',
    color: '#8A2BE2',
  },
  // WOODWINDS (Purple)
  {
    name: 'Tenor Sax',
    startFreq: 120,
    endFreq: 950,
    category: 'WOODWINDS',
    color: '#800080',
  },
  {
    name: 'Alto Sax',
    startFreq: 150,
    endFreq: 1200,
    category: 'WOODWINDS',
    color: '#8B008B',
  },
  {
    name: 'Flute',
    startFreq: 250,
    endFreq: 2500,
    category: 'WOODWINDS',
    color: '#9400D3',
  },
  {
    name: 'Clarinet',
    startFreq: 150,
    endFreq: 2000,
    category: 'WOODWINDS',
    color: '#9932CC',
  },
  {
    name: 'Oboe',
    startFreq: 200,
    endFreq: 1800,
    category: 'WOODWINDS',
    color: '#BA55D3',
  },
  {
    name: 'Piccolo',
    startFreq: 500,
    endFreq: 4500,
    category: 'WOODWINDS',
    color: '#DA70D6',
  },
  // STRINGS (Red)
  {
    name: 'Bass Guitar',
    startFreq: 40,
    endFreq: 350,
    category: 'STRINGS',
    color: '#CD5C5C',
  },
  {
    name: 'Double Bass',
    startFreq: 30,
    endFreq: 250,
    category: 'STRINGS',
    color: '#DC143C',
  },
  {
    name: 'Cello',
    startFreq: 65,
    endFreq: 900,
    category: 'STRINGS',
    color: '#FF0000',
  },
  {
    name: 'Viola',
    startFreq: 130,
    endFreq: 1300,
    category: 'STRINGS',
    color: '#FF4500',
  },
  {
    name: 'Violin',
    startFreq: 200,
    endFreq: 3500,
    category: 'STRINGS',
    color: '#FF6347',
  },
  // KEYS (Orange)
  {
    name: 'Harp',
    startFreq: 30,
    endFreq: 3000,
    category: 'KEYS',
    color: '#FFA500',
  },
  {
    name: 'Organ',
    startFreq: 20,
    endFreq: 8000,
    category: 'KEYS',
    color: '#FF8C00',
  },
  {
    name: 'Piano',
    startFreq: 28,
    endFreq: 4200,
    category: 'KEYS',
    color: '#FF7F50',
  },
  {
    name: 'Harpsichord',
    startFreq: 50,
    endFreq: 3000,
    category: 'KEYS',
    color: '#FFA07A',
  },
  // DRUMS (Green)
  {
    name: 'Cymbals',
    startFreq: 300,
    endFreq: 8000,
    category: 'DRUMS',
    color: '#228B22',
  },
  {
    name: 'Snare',
    startFreq: 100,
    endFreq: 4000,
    category: 'DRUMS',
    color: '#32CD32',
  },
  {
    name: 'Toms',
    startFreq: 50,
    endFreq: 3000,
    category: 'DRUMS',
    color: '#90EE90',
  },
  {
    name: 'Kick Drum',
    startFreq: 20,
    endFreq: 2000,
    category: 'DRUMS',
    color: '#98FB98',
  },
];
