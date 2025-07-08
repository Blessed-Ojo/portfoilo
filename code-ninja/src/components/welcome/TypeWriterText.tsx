'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
}

export default function TypewriterText({ text, onComplete }: TypewriterTextProps) {
  const [typewriterText, setTypewriterText] = useState("");

  // Typewriter effect
  useEffect(() => {
    if (typewriterText.length < text.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(text.slice(0, typewriterText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [typewriterText, text, onComplete]);

  return (
    <motion.p 
      className="mt-4 text-gray-300 text-base italic text-center max-w-2xl min-h-[3rem] px-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      {typewriterText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        |
      </motion.span>
    </motion.p>
  );
}