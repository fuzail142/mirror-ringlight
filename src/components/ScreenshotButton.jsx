import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Download, X, Share2 } from 'lucide-react';

const ScreenshotButton = ({ onCapture }) => {
  const [screenshot, setScreenshot] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    setIsCapturing(true);
    
    // Flash effect
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const imageData = onCapture();
    setScreenshot(imageData);
    setIsCapturing(false);
  };

  const handleDownload = () => {
    if (!screenshot) return;
    
    const link = document.createElement('a');
    link.download = `mirror-capture-${Date.now()}.png`;
    link.href = screenshot;
    link.click();
  };

  const handleShare = async () => {
    if (!screenshot || !navigator.share) return;
    
    try {
      const blob = await (await fetch(screenshot)).blob();
      const file = new File([blob], 'mirror-capture.png', { type: 'image/png' });
      
      await navigator.share({
        title: 'Mirror Capture',
        files: [file]
      });
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <>
      {/* Capture Button */}
      <motion.button
        onClick={handleCapture}
        className="relative w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={isCapturing}
      >
        <div className="absolute inset-1 rounded-full border-4 border-black/10" />
        <Camera className="w-7 h-7 text-gray-800" />
        
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          initial={{ scale: 1, opacity: 0 }}
          animate={isCapturing ? { scale: 1.5, opacity: [0.5, 0] } : {}}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Flash Overlay */}
      <AnimatePresence>
        {isCapturing && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>

      {/* Screenshot Preview Modal */}
      <AnimatePresence>
        {screenshot && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setScreenshot(null)}
          >
            <motion.div
              className="relative max-w-lg w-full glass rounded-3xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setScreenshot(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <img 
                src={screenshot} 
                alt="Captured" 
                className="w-full aspect-[3/4] object-cover"
              />

              {/* Actions */}
              <div className="p-4 flex gap-3 justify-center">
                <motion.button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  Download
                </motion.button>
                
                {navigator.share && (
                  <motion.button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium border border-white/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScreenshotButton;