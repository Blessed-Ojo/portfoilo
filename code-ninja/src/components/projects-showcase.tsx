"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import projectsDataJson from "@/data/all-projects.json";

// --- Types ---
interface Project {
  id: string;
  type: "case-study" | "standard";
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  metrics?: Record<string, string>;
}

interface RawProject {
  id: string;
  type: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  metrics?: Record<string, unknown>;
}

// Clean metrics and cast type for type safety
const projects: Project[] = projectsDataJson.projects.map((p: RawProject) => {
  const filteredMetrics = p.metrics
    ? Object.fromEntries(
        Object.entries(p.metrics).filter(
          ([, value]) => typeof value === "string"
        )
      )
    : undefined;

  return {
    ...p,
    type: p.type as "case-study" | "standard",
    metrics: filteredMetrics as Record<string, string> | undefined,
  };
});

const categories = ["All", "Full Stack", "SEO", "Web Design"];

// Animation Variants
const float3D: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60, 
    rotateX: 20,
    scale: 0.8,
    z: -200
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    z: 0,
    transition: { 
      duration: 1,
      ease: "easeOut",
      type: "spring",
      stiffness: 80,
      damping: 20
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.3 
    } 
  },
};

// Background Component
const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <>
      {/* Grid Pattern */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.gray.200)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.200)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,theme(colors.gray.800)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.800)_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-30"
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotateZ: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotateZ: [0, -5, 5, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotateZ: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-40 left-1/3 w-40 h-40 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
      </div>
      
      {/* Gradient Overlay */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20"
      />
    </>
  );
};

// Navigation Component
const BackNavigation = () => (
  <motion.div
    initial={{ opacity: 0, x: -30, rotateY: -20 }}
    animate={{ opacity: 1, x: 0, rotateY: 0 }}
    transition={{ duration: 0.6, type: "spring" }}
    className="transform-gpu"
  >
    <Link
      href="/"
      className="inline-flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 p-3 rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-lg backdrop-blur-sm"
    >
      <ArrowLeftIcon className="w-5 h-5" /> Back to Home
    </Link>
  </motion.div>
);

// 3D Card Component
const Card3D = ({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 100, rotateX: 45, scale: 0.8 }}
    whileInView={{ 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }}
    whileHover={{ 
      y: -20, 
      rotateX: -5,
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
    viewport={{ once: true }}
    className={`transform-gpu perspective-1000 ${className}`}
    style={{
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden"
    }}
  >
    {children}
  </motion.div>
);

// Section Title Component
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h1
    variants={float3D}
    className="text-5xl sm:text-7xl font-bold text-gray-800 dark:text-white mb-16 relative perspective-1000"
    style={{
      textShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transform: "translateZ(100px)"
    }}
  >
    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      {children}
    </span>
    <motion.div 
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl"
    />
  </motion.h1>
);

// Category Button Component
const CategoryButton = ({ 
  category, 
  isActive, 
  onClick, 
  index 
}: { 
  category: string; 
  isActive: boolean; 
  onClick: () => void; 
  index: number;
}) => (
  <motion.button
    onClick={onClick}
    className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 border-2 relative group backdrop-blur-sm ${
      isActive
        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 text-blue-600 shadow-2xl shadow-blue-500/25 dark:from-blue-500/30 dark:to-purple-500/30 dark:border-blue-500/60 dark:text-blue-400 dark:shadow-blue-500/30"
        : "bg-white/60 border-gray-300 text-gray-600 hover:border-blue-500/50 hover:text-blue-600 hover:bg-white/80 shadow-xl dark:bg-gray-800/60 dark:border-gray-700 dark:text-gray-400 dark:hover:border-blue-500/50 dark:hover:text-blue-400 dark:hover:bg-gray-800/80"
    }`}
    initial={{ opacity: 0, y: 30, rotateX: 45 }}
    animate={{ 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: "spring"
      }
    }}
    whileHover={{ 
      scale: 1.05, 
      y: -5,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    {isActive && (
      <motion.div
        layoutId="activeCategory"
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl"
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <span className="relative z-10">{category}</span>
  </motion.button>
);

// Project Card Component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <Card3D delay={index * 0.1}>
    <div className="group">
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:bg-white/80 dark:hover:bg-gray-800/80 overflow-hidden">
        {/* Project Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Project Type Badge */}
          <motion.div 
            className="absolute top-6 right-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <span
              className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-sm shadow-lg ${
                project.type === "case-study"
                  ? "bg-purple-500/30 border border-purple-400/50 text-purple-100"
                  : "bg-blue-500/30 border border-blue-400/50 text-blue-100"
              }`}
            >
              {project.type === "case-study" ? "CASE STUDY" : "PROJECT"}
            </span>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex gap-3 flex-shrink-0">
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </motion.a>
              )}
              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors duration-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              )}
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {project.description}
          </p>

          {/* Metrics for Case Studies */}
          {project.type === "case-study" && project.metrics && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <motion.span 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 bg-purple-500 rounded-full"
                />
                Key Metrics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <motion.div
                    key={key}
                    className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-4 border border-purple-200/50 dark:border-purple-700/50"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
                      {key}
                    </div>
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      {value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <motion.span 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 bg-blue-500 rounded-full"
              />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + techIndex * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Case Study Link */}
          {project.links.caseStudy && (
            <motion.div
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={project.links.caseStudy}
                className="inline-flex items-center gap-3 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-300 font-semibold text-lg"
              >
                View Case Study
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  </Card3D>
);

const ProjectsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Function to categorize projects
  const categorizeProjects = () => {
    const categorized: Record<string, Project[]> = {
      All: projects,
      "Full Stack": projects.filter((project) =>
        project.techStack.some((tech) =>
          ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Content Management Systems"].includes(tech)
        )
      ),
      SEO: projects.filter((project) =>
        project.techStack.some((tech) =>
          ["Ahrefs", "Google Search Console", "Google Analytics", "Screaming Frog", "PageSpeed Insights", "Mailchimp", "Yoast SEO"].includes(tech)
        )
      ),
      "Web Design": projects.filter((project) =>
        project.techStack.some((tech) =>
          ["WordPress", "Wix", "Webflow"].includes(tech)
        )
      ),
    };
    return categorized;
  };

  const categorizedProjects = useMemo(() => categorizeProjects(), []);
  const filteredProjects = useMemo(() => {
    return categorizedProjects[activeCategory] || [];
  }, [activeCategory, categorizedProjects]);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white min-h-screen pt-24 relative overflow-hidden transition-colors duration-300">
      <AnimatedBackground />
      
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 pt-10 relative z-10">
        <BackNavigation />
      </div>

      {/* Header Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-12"
          >
            <SectionTitle>My Projects</SectionTitle>
            
            <motion.p
              variants={float3D}
              className="text-xl leading-relaxed max-w-4xl text-gray-700 dark:text-gray-300 backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.05)",
                transform: "translateZ(20px)"
              }}
            >
              Explore my portfolio of web development projects, SEO case studies, and digital solutions. Each project represents a unique challenge solved with modern technologies and creative thinking.
            </motion.p>

            {/* Category Selector */}
            <motion.div 
              variants={float3D}
              className="flex flex-wrap gap-4 justify-center"
            >
              {categories.map((category, index) => (
                <CategoryButton
                  key={category}
                  category={category}
                  isActive={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32 relative z-10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <motion.div 
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-8"
              >
                🔍
              </motion.div>
              <p className="text-2xl text-gray-500 dark:text-gray-400 font-semibold">
                No projects found in this category.
              </p>
              <p className="text-lg text-gray-400 dark:text-gray-500 mt-4">
                Try selecting a different category to explore more projects.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsShowcase;