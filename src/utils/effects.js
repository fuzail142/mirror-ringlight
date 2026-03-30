export const lightModes = {
  solid: {
    name: 'Solid',
    icon: '💡',
    description: 'Classic solid ring light'
  },
  pulse: {
    name: 'Pulse',
    icon: '💓',
    description: 'Gentle pulsing effect'
  },
  rainbow: {
    name: 'Rainbow',
    icon: '🌈',
    description: 'Cycling rainbow colors'
  },
  warm: {
    name: 'Warm',
    icon: '🌅',
    description: 'Warm golden tones'
  },
  cool: {
    name: 'Cool',
    icon: '❄️',
    description: 'Cool blue tones'
  },
  party: {
    name: 'Party',
    icon: '🎉',
    description: 'Dynamic color shifts'
  },
  soft: {
    name: 'Soft',
    icon: '☁️',
    description: 'Soft diffused light'
  },
  dramatic: {
    name: 'Dramatic',
    icon: '🎭',
    description: 'High contrast lighting'
  }
};

export const presetColors = [
  { name: 'Pure White', color: '#ffffff' },
  { name: 'Warm White', color: '#fff4e6' },
  { name: 'Cool White', color: '#e6f4ff' },
  { name: 'Daylight', color: '#fffef0' },
  { name: 'Golden Hour', color: '#ffb366' },
  { name: 'Rose Gold', color: '#ffb3ba' },
  { name: 'Soft Pink', color: '#ffb6c1' },
  { name: 'Lavender', color: '#e6e6fa' },
  { name: 'Mint', color: '#b3ffb3' },
  { name: 'Sky Blue', color: '#87ceeb' },
  { name: 'Peach', color: '#ffcba4' },
  { name: 'Coral', color: '#ff7f7f' },
];

export const calculateLightIntensity = (brightness) => {
  return Math.pow(brightness / 100, 1.5);
};

export const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getGlowStyle = (color, intensity, mode) => {
  const baseGlow = hexToRgba(color, intensity * 0.8);
  
  switch (mode) {
    case 'dramatic':
      return {
        boxShadow: `
          0 0 ${60 * intensity}px ${20 * intensity}px ${baseGlow},
          0 0 ${120 * intensity}px ${40 * intensity}px ${hexToRgba(color, intensity * 0.4)}
        `
      };
    case 'soft':
      return {
        boxShadow: `
          0 0 ${100 * intensity}px ${50 * intensity}px ${hexToRgba(color, intensity * 0.3)}
        `
      };
    default:
      return {
        boxShadow: `
          0 0 ${40 * intensity}px ${15 * intensity}px ${baseGlow},
          0 0 ${80 * intensity}px ${30 * intensity}px ${hexToRgba(color, intensity * 0.5)}
        `
      };
  }
};