import React from 'react';
import { motion } from 'framer-motion';
import { lightModes } from '../utils/effects';

const ModeSelector = ({ mode, onChange }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-white/60 text-sm font-medium">Light Mode</h4>
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(lightModes).map(([key, value]) => (
          <motion.button
            key={key}
            onClick={() => onChange(key)}
            className={`relative p-3 rounded-xl transition-all ${
              mode === key 
                ? 'bg-white/20 border-white/40' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            } border`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-1">{value.icon}</div>
            <div className="text-white text-xs font-medium">{value.name}</div>
            
            {mode === key && (
              <motion.div
                layoutId="modeIndicator"
                className="absolute inset-0 border-2 border-white/50 rounded-xl"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;