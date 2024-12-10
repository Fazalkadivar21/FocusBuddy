import React from 'react';
import { noiseColors } from '../utils/noiseColors';

interface NoiseTypeSelectorProps {
  noiseType: string;
  isPlaying: boolean;
  onSelect: (type: string) => void;
}

const NoiseTypeSelector: React.FC<NoiseTypeSelectorProps> = ({ noiseType, isPlaying, onSelect }) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-gray-300 font-medium">Noise Type</label>
      <div className="grid grid-cols-3 gap-2">
        {['white', 'pink', 'brown'].map((type) => {
          const colors = noiseColors[type as keyof typeof noiseColors];
          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={`px-4 py-2 rounded-md capitalize transition-all duration-300 ${
                noiseType === type
                  ? `${colors.primary} ${isPlaying ? 'shadow-lg ' + colors.glow : ''}`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NoiseTypeSelector;