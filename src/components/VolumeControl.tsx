import React from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { noiseColors } from '../utils/noiseColors';

interface VolumeControlProps {
  volume: number;
  noiseType: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, noiseType, onChange }) => {
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-6 h-6" />;
    if (volume < 0.5) return <Volume1 className="w-6 h-6" />;
    return <Volume2 className="w-6 h-6" />;
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-300 font-medium">Volume</label>
      <div className="flex items-center gap-4">
        <span className={noiseColors[noiseType as keyof typeof noiseColors].text}>
          {getVolumeIcon()}
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${
              noiseType === 'white' ? '#06b6d4' :
              noiseType === 'pink' ? '#ec4899' : '#d97706'
            } ${volume * 100}%, #374151 ${volume * 100}%)`
          }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;