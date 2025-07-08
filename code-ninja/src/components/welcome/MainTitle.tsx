'use client';

import { motion, AnimatePresence } from "framer-motion";

interface MainTitleProps {
  glitch: boolean;
  sliced: boolean;
}

export default function MainTitle({ glitch, sliced }: MainTitleProps) {
  return (
    <motion.div 
      className="relative"
      animate={glitch ? { x: [0, -5, 5, 0], opacity: [1, 0.8, 1] } : {}}
      transition={{ duration: 0.2 }}
    >
      <motion.h1 
        className="text-6xl md:text-8xl font-bold font-mono text-purple-500 drop-shadow-2xl relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Glitch layers */}
        <AnimatePresence>
          {glitch && (
            <>
              <motion.span 
                className="absolute inset-0 text-red-500 -translate-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                CODE~NINJA
              </motion.span>
              <motion.span 
                className="absolute inset-0 text-blue-500 translate-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                CODE~NINJA
              </motion.span>
            </>
          )}
        </AnimatePresence>
        
        {/* Main text with letter animations */}
        <span className="relative">
          {["C", "O", "D", "E"].map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                rotate: sliced ? -12 : 0,
                x: sliced ? 4 : 0
              }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span 
            className="text-white"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ~
          </motion.span>
          {["N", "I", "N", "J", "A"].map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                rotate: sliced ? 12 : 0,
                x: sliced ? -4 : 0
              }}
              transition={{ 
                duration: 0.6, 
                delay: (i + 5) * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              {letter}
            </motion.span>
          ))}
        </span>

        {/* Slash line */}
        <motion.div 
          className="absolute left-0 top-1/2 h-[3px] bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 shadow-[0_0_20px_#a855f7]"
          style={{ filter: 'blur(1px)' }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: sliced ? "100%" : 0, 
            opacity: sliced ? 1 : 0 
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.h1>
    </motion.div>
  );
}