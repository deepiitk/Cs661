import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Github } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [isMuted, setIsMuted] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1.2
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center parliament-bg overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        
        {/* Pulsating map outline */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M20,30 Q30,20 40,25 Q50,15 60,20 Q70,25 75,35 Q80,45 75,55 Q70,65 60,70 Q50,75 40,70 Q30,65 25,55 Q20,45 20,30 Z"
              fill="none"
              stroke="rgba(255, 215, 0, 0.3)"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-8 max-w-4xl">
        {/* Main Logo */}
        <motion.div
          variants={logoVariants}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              className="w-32 h-32 mx-auto mb-6 rounded-full india-gradient flex items-center justify-center animate-glow"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-navy relative">
                  <div className="absolute inset-2 rounded-full bg-navy flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  {/* Ashoka Chakra spokes */}
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-4 bg-navy origin-bottom"
                      style={{
                        left: '50%',
                        bottom: '50%',
                        transform: `translateX(-50%) rotate(${i * 15}deg)`
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
            >
              Indian Elections
            </motion.h1>
            
            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-gold mx-auto mb-6"
            />
          </div>
        </motion.div>

        {/* Headline and Description */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl font-semibold text-gold mb-6"
        >
          Shaping Tomorrow, Today
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Dive deep into the heart of democracy. Explore the numbers, understand the trends, 
          and witness the power of the people through comprehensive data analysis and interactive visualizations.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <motion.button
            onClick={onEnter}
            className="px-8 py-4 bg-saffron text-white font-semibold rounded-full text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Now
          </motion.button>
          
          <motion.a
            href="https://github.com/your-repo/indian-elections-analysis"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 glass-effect text-white font-medium rounded-full text-sm flex items-center gap-2 hover:bg-opacity-20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} />
            View on GitHub
          </motion.a>
        </motion.div>

        {/* Audio Control */}
        <motion.button
          variants={itemVariants}
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-8 right-8 p-3 glass-effect rounded-full text-white hover:bg-opacity-20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SplashScreen;