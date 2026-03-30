import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Camera, AlertCircle } from 'lucide-react';
import RingLight from './RingLight';

const Mirror = forwardRef(({ 
  videoRef, 
  isLoading, 
  error, 
  ringColor, 
  brightness, 
  mode,
  mirrorShape,
  showGuides 
}, ref) => {
  
  const getShapeClasses = () => {
    switch (mirrorShape) {
      case 'circle': return 'rounded-full aspect-square';
      case 'portrait': return 'rounded-3xl aspect-[3/4]';
      case 'landscape': return 'rounded-3xl aspect-[4/3]';
      case 'square': return 'rounded-3xl aspect-square';
      default: return 'rounded-3xl aspect-[3/4]';
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${getShapeClasses()} max-h-[80vh] overflow-hidden`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Ring Light Effect */}
      <RingLight 
        color={ringColor} 
        brightness={brightness} 
        mode={mode}
      />

      {/* Mirror Frame */}
      <div className={`relative w-full h-full ${getShapeClasses()} overflow-hidden 
        border-4 border-white/20 shadow-2xl z-10`}
        style={{
          background: 'linear-gradient(135deg, rgba(30,30,40,0.9) 0%, rgba(20,20,30,0.95) 100%)'
        }}
      >
        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
              <p className="text-white/80 text-lg">Initializing camera...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">Camera Access Required</h3>
              <p className="text-white/60 text-center max-w-sm">
                Please allow camera access to use the mirror. 
                Check your browser settings.
              </p>
              <p className="text-red-400/80 text-sm mt-4">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
          autoPlay
          playsInline
          muted
        />

        {/* Face Guides Overlay */}
        {showGuides && !isLoading && !error && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-48 h-64 border-2 border-white/30 rounded-full" 
              style={{
                boxShadow: 'inset 0 0 30px rgba(255,255,255,0.1)'
              }}
            />
            {/* Eye guides */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex gap-16">
              <div className="w-8 h-4 border border-white/20 rounded-full" />
              <div className="w-8 h-4 border border-white/20 rounded-full" />
            </div>
          </motion.div>
        )}

        {/* Shine Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="mirror-shine" />
        </div>

        {/* Inner Glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 100px 20px rgba(0,0,0,0.5)`
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 -z-10 blur-sm" />
    </motion.div>
  );
});

Mirror.displayName = 'Mirror';

export default Mirror;