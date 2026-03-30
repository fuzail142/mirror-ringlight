import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { hexToRgba } from '../utils/effects';

const RingLight = ({ color, brightness, mode, size = 400 }) => {
  const intensity = brightness / 100;
  
  const getAnimationClass = () => {
    switch (mode) {
      case 'pulse': return 'animate-pulse-glow';
      case 'rainbow': return 'animate-rainbow';
      case 'breathe': return 'animate-breathe';
      case 'party': return 'animate-rainbow animate-pulse';
      default: return '';
    }
  };

  const getModeColor = () => {
    switch (mode) {
      case 'warm': return '#ffb366';
      case 'cool': return '#87ceeb';
      case 'rainbow': return color;
      default: return color;
    }
  };

  const ringStyle = useMemo(() => ({
    '--ring-color': hexToRgba(getModeColor(), intensity),
    '--ring-intensity': intensity,
  }), [color, intensity, mode]);

  const rings = [
    { scale: 1, blur: 30, opacity: 0.9 },
    { scale: 1.1, blur: 50, opacity: 0.6 },
    { scale: 1.2, blur: 70, opacity: 0.4 },
    { scale: 1.3, blur: 100, opacity: 0.2 },
  ];

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={ringStyle}
    >
      {/* Multiple ring layers for depth */}
      {rings.map((ring, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 rounded-full ${getAnimationClass()}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: ring.opacity * intensity,
            scale: ring.scale 
          }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          style={{
            background: `radial-gradient(circle, transparent 55%, ${hexToRgba(getModeColor(), ring.opacity * intensity)} 65%, transparent 75%)`,
            filter: `blur(${ring.blur}px)`,
          }}
        />
      ))}
      
      {/* Inner bright ring */}
      <motion.div
        className={`absolute inset-4 rounded-full ${getAnimationClass()}`}
        style={{
          background: `conic-gradient(from 0deg, 
            ${hexToRgba(getModeColor(), intensity)},
            ${hexToRgba(getModeColor(), intensity * 0.7)} 25%,
            ${hexToRgba(getModeColor(), intensity)} 50%,
            ${hexToRgba(getModeColor(), intensity * 0.7)} 75%,
            ${hexToRgba(getModeColor(), intensity)}
          )`,
          filter: 'blur(20px)',
          mask: 'radial-gradient(circle, transparent 60%, black 65%, black 75%, transparent 80%)',
          WebkitMask: 'radial-gradient(circle, transparent 60%, black 65%, black 75%, transparent 80%)',
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: mode === 'party' ? 360 : 0 }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      {/* Sparkle effects for party mode */}
      {mode === 'party' && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: getModeColor(),
                top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
                left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                boxShadow: `0 0 10px 5px ${hexToRgba(getModeColor(), 0.8)}`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default RingLight;