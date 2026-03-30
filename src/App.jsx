import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Mirror from './components/Mirror';
import Controls from './components/Controls';
import ScreenshotButton from './components/ScreenshotButton';
import { useCamera } from './hooks/useCamera';
import { useFullscreen } from './hooks/useFullscreen';

function App() {
  // Camera hook
  const { 
    videoRef, 
    isLoading, 
    error, 
    switchCamera, 
    takeScreenshot 
  } = useCamera();

  // App state
  const [brightness, setBrightness] = useState(75);
  const [color, setColor] = useState('#ffffff');
  const [mode, setMode] = useState('solid');
  const [shape, setShape] = useState('portrait');
  const [showGuides, setShowGuides] = useState(false);

  // Fullscreen
  const containerRef = useRef(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <motion.header 
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 text-yellow-400" />
          Mirror Studio
          <Sparkles className="w-10 h-10 text-yellow-400" />
        </h1>
        <p className="text-white/60 text-lg">Professional ring light mirror for perfect selfies</p>
      </motion.header>

      {/* Main Mirror */}
      <motion.main 
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative w-[350px] md:w-[450px]">
          <Mirror
            videoRef={videoRef}
            isLoading={isLoading}
            error={error}
            ringColor={color}
            brightness={brightness}
            mode={mode}
            mirrorShape={shape}
            showGuides={showGuides}
          />
        </div>

        {/* Capture Button */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ScreenshotButton onCapture={takeScreenshot} />
        </motion.div>
      </motion.main>

      {/* Controls */}
      <Controls
        brightness={brightness}
        setBrightness={setBrightness}
        color={color}
        setColor={setColor}
        mode={mode}
        setMode={setMode}
        shape={shape}
        setShape={setShape}
        showGuides={showGuides}
        setShowGuides={setShowGuides}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onSwitchCamera={switchCamera}
      />

      {/* Footer */}
      <motion.footer 
        className="fixed bottom-4 left-4 text-white/30 text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Press ⚙️ to customize your ring light
      </motion.footer>
    </div>
  );
}

export default App;