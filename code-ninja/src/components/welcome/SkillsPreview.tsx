'use client';

import { motion, AnimatePresence } from "framer-motion";

interface SkillsPreviewProps {
  skills: string[];
  showSkills: boolean;
}

export default function SkillsPreview({ skills, showSkills }: SkillsPreviewProps) {
  return (
    <AnimatePresence>
      {showSkills && (
        <motion.div 
          className="mt-6 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm border border-purple-700/50 hover:bg-purple-800/40 transition-colors cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: i * 0.1,
                type: "spring",
                stiffness: 150
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}