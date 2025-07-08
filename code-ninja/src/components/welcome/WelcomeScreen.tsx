'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, SkipForward } from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import FloatingParticles from "./FloatingParticles";
import MainTitle from "./MainTitle";
import SkillsPreview from "./SkillsPreview";
import TypewriterText from "./TypeWriterText";

interface WelcomeScreenProps {
  onComplete?: () => void;
}

export default function EnhancedWelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [start, setStart] = useState(false);
  const [sliced, setSliced] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const fullText = "Transforming ideas into fast, beautiful digital experiences";
  const skills = ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "MongoDB", "ReactNative", "Tailwind CSS", "SEO Optimization"];

  // Show skip button after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSkipButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleStart();
      } else if (e.key === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleStart = () => {
    if (soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        console.warn('Audio context not supported');
      }
    }

    setGlitch(true);
    setTimeout(() => setGlitch(false), 200);
    setSliced(true);

    setTimeout(() => {
      setStart(true);
      setLoading(true);
      
      const loadingInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
              if (onComplete) {
                onComplete();
              }
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 150);
    }, 700);
  };

  const handleSkip = () => {
    setStart(true);
    setLoading(true);
    setLoadingProgress(100);
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 300);
  };

  const handleTypewriterComplete = () => {
    setTimeout(() => setShowSkills(true), 500);
  };

  // Loading screen
  if (start && loading) {
    return (
      <LoadingScreen 
        loadingProgress={loadingProgress} 
        onComplete={onComplete}
      />
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-black text-white flex items-center justify-center flex-col z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FloatingParticles />

      {/* Sound toggle */}
      <motion.button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
        title={soundEnabled ? "Mute" : "Unmute"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </motion.button>

      {/* Skip button */}
      <AnimatePresence>
        {showSkipButton && (
          <motion.button
            onClick={handleSkip}
            className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors text-sm underline flex items-center gap-2 p-2 rounded-full hover:bg-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipForward className="w-4 h-4" />
            Skip Intro (ESC)
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center relative z-10">
        <MainTitle glitch={glitch} sliced={sliced} />

        {/* Animated tagline */}
        <motion.p 
          className="mt-6 text-gray-400 text-xl font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Unleash Fullstack Power
        </motion.p>

        <TypewriterText 
          text={fullText}
          onComplete={handleTypewriterComplete}
        />

        <SkillsPreview skills={skills} showSkills={showSkills} />

        {/* Enhanced button */}
        <motion.button
          onClick={handleStart}
          className="relative group overflow-hidden mt-10 px-8 py-4 bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white text-lg rounded-full shadow-2xl font-bold cursor-pointer transition-all duration-300"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Enter Portfolio
            <motion.span 
              className="text-xl"
              animate={{ 
                rotate: [0, 15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⚡
            </motion.span>
          </span>

          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          
          <span className="absolute inset-0 rounded-full bg-purple-400/20 blur-md group-hover:bg-purple-400/30 transition-all duration-300" />
        </motion.button>

        {/* Keyboard hint */}
        <motion.p 
          className="mt-4 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7, 1] }}
          transition={{ duration: 2, delay: 2, repeat: Infinity }}
        >
          Press Enter or Space to continue
        </motion.p>

        {/* Version indicator */}
        <motion.div 
          className="absolute bottom-4 right-4 text-gray-600 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 3 }}
        >
          v2.0.1
        </motion.div>
      </div>
    </motion.div>
  );
}