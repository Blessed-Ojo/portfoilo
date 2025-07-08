'use client';

import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  loadingProgress: number;
  onComplete?: () => void;
}

export default function LoadingScreen({ loadingProgress, onComplete }: LoadingScreenProps) {
  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Ninja slash effects */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-purple-400 to-transparent h-1"
            style={{
              top: `${15 + i * 15}%`,
              width: '100%',
              transform: `rotate(${[-8, 6, -3, 8, -5, 4][i]}deg)`,
              boxShadow: `0 0 20px #a855f7`,
              filter: 'blur(1px)'
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ 
              opacity: [0, 1, 0.5],
              scaleX: [0, 1, 1]
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Flash effect */}
      <motion.div 
        className="absolute inset-0 bg-white opacity-20"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Loading content */}
      <motion.div 
        className="text-center z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-purple-400 text-3xl font-mono font-bold mb-8"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          LOADING PORTFOLIO
        </motion.div>
        
        {/* Progress bar */}
        <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_20px_#a855f7]"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        
        {/* Progress text */}
        <motion.div 
          className="text-purple-300 font-mono"
          key={Math.floor(loadingProgress)}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {Math.floor(Math.min(loadingProgress, 100))}%
        </motion.div>
        
        {/* Loading messages */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="mt-4 text-gray-400 text-sm"
            key={
              loadingProgress < 30 ? 'init' :
              loadingProgress < 60 ? 'projects' :
              loadingProgress < 90 ? 'skills' : 'ready'
            }
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {loadingProgress < 30 && "Initializing ninja powers..."}
            {loadingProgress >= 30 && loadingProgress < 60 && "Loading projects..."}
            {loadingProgress >= 60 && loadingProgress < 90 && "Sharpening code skills..."}
            {loadingProgress >= 90 && "Almost ready..."}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}