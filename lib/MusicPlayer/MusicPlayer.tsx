import { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export interface MusicPlayerProps {
  src: string;
  title: string;
  artist: string;
  coverArt?: string;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export const MusicPlayer = ({
  src,
  title,
  artist,
  coverArt = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
  className,
  onPlay,
  onPause,
  onEnded,
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  console.log('volume', volume);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        onPause?.();
      } else {
        audioRef.current.play();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const currentTime = value[0] ?? 0;
      audioRef.current.currentTime = currentTime;
      setCurrentTime(currentTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const volume = value[0] ?? 1;
      audioRef.current.volume = volume;
      setVolume(volume);
    } else {
      const volume = value[0] ?? 1;
      setVolume(volume);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn('bg-card rounded-lg p-4 shadow-lg w-full max-w-md', className)}>
      <audio
        ref={audioRef}
        src={src}
      >
        <track
          kind="captions"
          src=""
          label="English captions"
        />
      </audio>
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={coverArt}
          alt="Cover Art"
          className="w-16 h-16 rounded-md object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground">{artist}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)}
            className="p-2 hover:bg-muted rounded-full"
            type="button"
          >
            <SkipBack className="w-6 h-6" />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
            type="button"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          <button
            onClick={() => audioRef.current && (audioRef.current.currentTime += 10)}
            className="p-2 hover:bg-muted rounded-full"
            type="button"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4" />
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};
