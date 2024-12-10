import React from 'react';
import { noiseColors } from '../utils/noiseColors';

interface StudyTipsProps {
  noiseType: string;
}

const StudyTips: React.FC<StudyTipsProps> = ({ noiseType }) => {
  const colors = noiseColors[noiseType as keyof typeof noiseColors];
  
  return (
    <div className="mt-6 text-sm text-gray-400">
      <p className="mb-2 flex items-center gap-2">
        <span className={colors.text}>💡</span> Tips for effective studying:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>Start with a lower volume and adjust as needed</li>
        <li>White noise is best for general focus</li>
        <li>Pink noise can help with reading comprehension</li>
        <li>Brown noise may help with deep concentration</li>
      </ul>
    </div>
  );
};

export default StudyTips;