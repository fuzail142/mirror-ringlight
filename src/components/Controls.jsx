import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Slider from '@radix-ui/react-slider';
import * as Switch from '@radix-ui/react-switch';
import { 
  Sun, 
  Maximize2, 
  Minimize2, 
  Settings, 
  RefreshCw,
  Circle,
  Square,
  RectangleVertical,
  RectangleHorizontal,
  Grid,
  X
} from 'lucide-react';
import ColorPicker from './ColorPicker';
import ModeSelector from './ModeSelector';

const Controls = ({ 
  brightness, 
  setBrightness, 
  color, 
  setColor, 
  mode, 
  setMode,
  shape,
  setShape,
  showGuides,
  setShowGuides,
  isFullscreen,
  onToggleFullscreen,
  onSwitchCamera
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const shapes = [
    { id: 'portrait', icon: RectangleVertical, label: 'Portrait' },
    { id: 'landscape', icon: RectangleHorizontal, label: 'Landscape' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'square', icon: Square, label: 'Square' },
  ];

  return (
    <>
      {/* Settings Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 glass rounded-full z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Settings className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 w-80 glass rounded-3xl p-6 z-30 max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </h2>

            <div className="space-y-6">
              {/* Brightness Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-white/60 text-sm font-medium flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    Brightness
                  </label>
                  <span className="text-white text-sm font-mono">{brightness}%</span>
                </div>
                <Slider.Root
                  className="relative flex items-center select-none touch-none w-full h-5"
                  value={[brightness]}
                  onValueChange={([value]) => setBrightness(value)}
                  max={100}
                  step={1}
                >
                  <Slider.Track className="bg-white/20 relative grow rounded-full h-2">
                    <Slider.Range className="absolute bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-transform hover:scale-110" />
                </Slider.Root>
              </div>

              {/* Color Picker */}
              <ColorPicker color={color} onChange={setColor} />

              {/* Mode Selector */}
              <ModeSelector mode={mode} onChange={setMode} />

              {/* Shape Selector */}
              <div className="space-y-3">
                <h4 className="text-white/60 text-sm font-medium">Mirror Shape</h4>
                <div className="flex gap-2">
                  {shapes.map(({ id, icon: Icon, label }) => (
                    <motion.button
                      key={id}
                      onClick={() => setShape(id)}
                      className={`flex-1 p-3 rounded-xl transition-all ${
                        shape === id 
                          ? 'bg-white/20 border-white/40' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      } border flex flex-col items-center gap-1`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                      <span className="text-white/60 text-xs">{label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Face Guides Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-white/60 text-sm font-medium flex items-center gap-2">
                  <Grid className="w-4 h-4" />
                  Face Guides
                </label>
                <Switch.Root
                  checked={showGuides}
                  onCheckedChange={setShowGuides}
                  className={`w-11 h-6 rounded-full relative transition-colors ${
                    showGuides ? 'bg-green-500' : 'bg-white/20'
                  }`}
                >
                  <Switch.Thumb className={`block w-5 h-5 bg-white rounded-full shadow-lg transition-transform ${
                    showGuides ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </Switch.Root>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <motion.button
                  onClick={onSwitchCamera}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw className="w-5 h-5" />
                  Switch Camera
                </motion.button>
                
                <motion.button
                  onClick={onToggleFullscreen}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-5 h-5" />
                      Exit Fullscreen
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-5 h-5" />
                      Fullscreen
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Controls;