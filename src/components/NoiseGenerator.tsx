import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { generateNoise } from '../utils/audioUtils';
import { noiseColors } from '../utils/noiseColors';
import VolumeControl from './VolumeControl';
import NoiseTypeSelector from './NoiseTypeSelector';
import StudyTips from './StudyTips';

const NoiseGenerator = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [noiseType, setNoiseType] = useState('white');
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const toggleNoise = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    if (isPlaying) {
      sourceNodeRef.current?.stop();
      setIsPlaying(false);
    } else {
      const buffer = generateNoise(audioContextRef.current, noiseType);
      if (!buffer) return;

      sourceNodeRef.current = audioContextRef.current.createBufferSource();
      sourceNodeRef.current.buffer = buffer;
      sourceNodeRef.current.loop = true;
      sourceNodeRef.current.connect(gainNodeRef.current);
      sourceNodeRef.current.start();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume;
    }
  };

  const handleNoiseTypeChange = (type: string) => {
    setNoiseType(type);
    if (isPlaying) {
      toggleNoise();
      setTimeout(toggleNoise, 50);
    }
  };

  const colors = noiseColors[noiseType as keyof typeof noiseColors];

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-8 max-w-md w-full border border-gray-800">
      <h2 className={`text-2xl font-bold ${colors.text} mb-6 transition-colors duration-300`}>
        Study Focus
      </h2>
      
      <div className="space-y-6">
        <NoiseTypeSelector
          noiseType={noiseType}
          isPlaying={isPlaying}
          onSelect={handleNoiseTypeChange}
        />

        <VolumeControl
          volume={volume}
          noiseType={noiseType}
          onChange={handleVolumeChange}
        />

        <button
          onClick={toggleNoise}
          className={`w-full py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2
            ${colors.primary} ${colors.hover} ${isPlaying ? 'shadow-lg ' + colors.glow : ''}`}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isPlaying ? 'Stop' : 'Start'} Noise
        </button>
      </div>

      <StudyTips noiseType={noiseType} />
    </div>
  );
};

export default NoiseGenerator;