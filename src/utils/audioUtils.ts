export const generateNoise = (audioContext: AudioContext, type: string) => {
  const bufferSize = audioContext.sampleRate * 2;
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    if (type === 'white') {
      data[i] = Math.random() * 2 - 1;
    } else if (type === 'pink') {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    } else if (type === 'brown') {
      data[i] = (Math.random() * 2 - 1) * 0.25;
    }
  }

  return buffer;
};