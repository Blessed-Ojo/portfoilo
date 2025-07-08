"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  PresentationChartLineIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline";

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const skillsData: {
  [category: string]: {
    icon: React.ComponentType<{ className?: string }>;
    skills: Skill[];
  };
} = {
  "Full Stack Development": {
    icon: CodeBracketIcon,
    skills: [
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        category: "Frontend",
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        category: "Frontend",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        category: "Frontend",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        category: "Frontend",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        category: "Frontend",
      },
      {
        name: "Astro",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg",
        category: "Frontend",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        category: "Frontend",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        category: "Backend",
      },
      {
        name: "Postman",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
        category: "Backend",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        category: "Database",
      },
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        category: "Database",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        category: "Database",
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        category: "Tools",
      },
      {
        name: "Vercel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
        category: "Tools",
      },
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
        category: "Tools",
      },
      {
        name: "Google Cloud",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        category: "Tools",
      },
      {
        name: "Cloudflare",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",
        category: "Tools",
      },
    ],
  },
  "SEO Mastery": {
    icon: PresentationChartLineIcon,
    skills: [
      {
        name: "Google Analytics",
        icon: "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg",
        category: "Tools",
      },
      {
        name: "Search Console",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
        category: "Tools",
      },
      {
        name: "Ahrefs",
        icon: "https://cdn.brandfetch.io/idxB1p5kuP/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
        category: "Tools",
      },
      {
        name: "SEMrush",
        icon: "https://cdn.brandfetch.io/idt3n8W3ef/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
        category: "Tools",
      },
      {
        name: "Keyword Research",
        icon: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
        category: "Skills",
      },
      {
        name: "On-page SEO",
        icon: "https://cdn-icons-png.flaticon.com/512/3039/3039393.png",
        category: "Skills",
      },
      {
        name: "Technical SEO",
        icon: "https://cdn-icons-png.flaticon.com/512/2920/2920349.png",
        category: "Skills",
      },
      {
        name: "Link Building",
        icon: "https://cdn-icons-png.flaticon.com/512/3039/3039386.png",
        category: "Skills",
      },
    ],
  },
  "Design Arsenal": {
    icon: PaintBrushIcon,
    skills: [
      {
        name: "Figma",
        icon: "https://cdn.brandfetch.io/idZHcZ_i7F/w/320/h/320/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
        category: "Design Tools",
      },
      {
        name: "Webflow",
        icon: "https://cdn.brandfetch.io/id4knLKYsV/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
        category: "Design Tools",
      },
      {
        name: "Framer",
        icon: "https://cdn.brandfetch.io/idCeIE9B96/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
        category: "Design Tools",
      },
      {
        name: "WordPress",
        icon: "https://cdn.brandfetch.io/idbnlnCBDY/w/200/h/200/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
        category: "Design Tools",
      },
      {
        name: "Wix",
        icon: "https://cdn.brandfetch.io/id93wC1WMj/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
        category: "Design Tools",
      },
      {
        name: "Bubble",
        icon: "https://cdn.brandfetch.io/id6z4_raly/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
        category: "Design Tools",
      },
    ],
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { 
      duration: 0.4, 
      ease: "easeOut" as const,
      type: "spring" as const,
      stiffness: 300,
      damping: 20
    },
  },
  hover: {
    scale: 1.1,
    y: -8,
    rotateY: 5,
    transition: { 
      duration: 0.2, 
      ease: "easeOut" as const,
      type: "spring" as const,
      stiffness: 400,
      damping: 10
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const ninjaSlashVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut" as const,
      delay: 0.5,
    },
  },
};

const NinjaSlash = () => (
  <motion.svg
    width="100"
    height="4"
    viewBox="0 0 100 4"
    className="mx-auto mb-8"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <motion.path
      d="M0 2 L100 2"
      stroke="url(#ninjaGradient)"
      strokeWidth="2"
      fill="none"
      variants={ninjaSlashVariants}
    />
    <defs>
      <linearGradient id="ninjaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
        <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </linearGradient>
    </defs>
  </motion.svg>
);

const SkillsSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
      {/* Ninja-themed background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-blue-500/20 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-blue-400/20 rotate-12 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-blue-300/20 -rotate-12 rounded-lg"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={titleVariants} className="text-center mb-20">
            <motion.div
              className="inline-block mb-4"
              whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase bg-blue-100 dark:bg-blue-400/10 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-400/20">
                ⚔️ Ninja Arsenal
              </span>
            </motion.div>
            
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 dark:from-white dark:via-blue-100 dark:to-blue-200 bg-clip-text text-transparent"
              whileInView={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              Technical Mastery
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0.7 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Wielding cutting-edge technologies with the precision of a digital ninja. 
              Each skill sharpened through countless battles in the code dojo.
            </motion.p>
            
            <NinjaSlash />
          </motion.div>

          {/* Skills Categories */}
          <div className="space-y-20">
            {Object.entries(skillsData).map(
              ([categoryName, categoryData], categoryIndex) => {
                const IconComponent = categoryData.icon;

                return (
                  <motion.div
                    key={categoryName}
                    variants={categoryVariants}
                    className="relative"
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                      <motion.div
                        className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20 border border-blue-300 dark:border-blue-400/30 backdrop-blur-sm"
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: [0, -5, 5, 0],
                          boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <motion.h3 
                        className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {categoryName}
                      </motion.h3>
                    </div>

                    {/* Skills Grid */}
                    <motion.div
                      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6"
                      variants={containerVariants}
                    >
                      {categoryData.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          variants={skillVariants}
                          whileHover="hover"
                          className="group relative"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.1 }}
                          transition={{
                            duration: 0.4,
                            delay: skillIndex * 0.05,
                          }}
                        >
                          {/* Skill Card */}
                          <div className="relative p-4 rounded-xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                            {/* Ninja glow effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-100/20 dark:from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative z-10 flex flex-col items-center gap-3">
                              {/* Skill Icon */}
                              <motion.div
                                className="relative w-10 h-10 flex items-center justify-center"
                                whileHover={{ 
                                  rotate: [0, -10, 10, 0],
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 0.4 }}
                              >
                                <img
                                  src={skill.icon}
                                  alt={skill.name}
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 object-contain filter group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300"
                                  loading="lazy"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                    const parent = target.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `<div class='w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-300 dark:border-blue-400/30'>${skill.name.charAt(0)}</div>`;
                                    }
                                  }}
                                />
                                
                                {/* Subtle pulse effect */}
                                <div className="absolute inset-0 rounded-full bg-blue-400/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                              </motion.div>
                              
                              {/* Skill Name */}
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center leading-tight group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 break-words">
                                {skill.name}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Category Divider */}
                    {categoryIndex < Object.entries(skillsData).length - 1 && (
                      <motion.div
                        className="flex items-center justify-center mt-16"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-px bg-gradient-to-r from-transparent to-blue-400/50"></div>
                          <div className="w-2 h-2 rounded-full bg-blue-400/70 animate-pulse"></div>
                          <div className="w-20 h-px bg-gradient-to-l from-transparent to-blue-400/50"></div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              }
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;