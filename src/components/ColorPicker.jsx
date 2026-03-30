import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { Palette, ChevronDown, Check } from 'lucide-react';
import { presetColors } from '../utils/effects';

const ColorPicker = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all w-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div 
          className="w-8 h-8 rounded-full border-2 border-white/30 shadow-lg"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}50`
          }}
        />
        <span className="text-white font-medium flex-1 text-left">Ring Color</span>
        <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute bottom-full left-0 right-0 mb-2 glass rounded-2xl p-4 z-50"
          >
            {/* Preset Colors */}
            <div className="mb-4">
              <h4 className="text-white/60 text-sm mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Presets
              </h4>
              <div className="grid grid-cols-6 gap-2">
                {presetColors.map((preset) => (
                  <motion.button
                    key={preset.name}
                    onClick={() => onChange(preset.color)}
                    className="relative w-10 h-10 rounded-full border-2 border-white/20 hover:border-white/50 transition-all"
                    style={{ 
                      backgroundColor: preset.color,
                      boxShadow: color === preset.color ? `0 0 15px ${preset.color}` : 'none'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={preset.name}
                  >
                    {color === preset.color && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-black/50" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Color Toggle */}
            <button
              onClick={() => setShowCustom(!showCustom)}
              className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2 mb-3"
            >
              <span>{showCustom ? '▼' : '▶'}</span>
              Custom Color
            </button>

            {/* Custom Color Picker */}
            <AnimatePresence>
              {showCustom && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex justify-center">
                    <HexColorPicker color={color} onChange={onChange} />
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-white/60 text-sm">HEX:</span>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => onChange(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm w-24 text-center"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;