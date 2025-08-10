"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import projectsDataJson from "@/data/all-projects.json"; // Adjust the path as necessary

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

const gridVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.3,
      ease: [0.55, 0.055, 0.675, 0.19] as const,
    },
  },
};

// ... rest of the file remains exactly the same ...

const ProjectsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Function to categorize projects
  const categorizeProjects = () => {
    const categorized: Record<string, Project[]> = {
      All: projects,
      "Full Stack": projects.filter((project) =>
        project.techStack.some((tech) =>
          [
            "Next.js",
            "TypeScript",
            "PostgreSQL",
            "Redis",
            "Content Management Systems",
          ].includes(tech)
        )
      ),
      SEO: projects.filter((project) =>
        project.techStack.some((tech) =>
          [
            "Ahrefs",
            "Google Search Console",
            "Google Analytics",
            "Screaming Frog",
            "PageSpeed Insights",
            "Mailchimp",
            "Yoast SEO",
          ].includes(tech)
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div 
            className="h-full w-full bg-gradient-to-r from-transparent via-cyan-500/10 dark:via-cyan-500/20 to-transparent"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3e%3cpath d='m 40 0 l 0 40 l -40 0 l 0 -40 z' fill='none' stroke='%23000000' stroke-width='1' opacity='0.05' class='dark:stroke-white dark:opacity-10'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 pt-28">
        {/* Header */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-16 lg:px-[150px] pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-purple-600 to-green-600 dark:from-cyan-400 dark:via-purple-400 dark:to-green-400 bg-clip-text text-transparent mb-4 font-mono">
              &gt; Projects_
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mb-8"></div>
          </motion.div>

          {/* Category Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-6 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all duration-300 border relative group ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30 text-cyan-700 shadow-lg shadow-cyan-500/10 dark:from-cyan-500/20 dark:to-purple-500/20 dark:border-cyan-500/50 dark:text-cyan-300 dark:shadow-cyan-500/25"
                    : "bg-gray-100/50 border-gray-300 text-gray-600 hover:border-cyan-500/30 hover:text-cyan-700 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-cyan-500/50 dark:hover:text-cyan-300"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 dark:from-cyan-500/10 dark:to-purple-500/10 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <section className="pb-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-16 lg:px-[150px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                variants={gridVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="group relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {/* Project Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/5 group-hover:transform group-hover:scale-[1.02] dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-cyan-500/50 dark:hover:shadow-cyan-500/10">
                      {/* Project Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index < 2 && activeCategory === "All"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-black/60"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 dark:from-cyan-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Project Type Badge */}
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm ${
                              project.type === "case-study"
                                ? "bg-purple-500/20 border border-purple-500/30 text-purple-700 dark:bg-purple-500/20 dark:border-purple-500/50 dark:text-purple-300"
                                : "bg-cyan-500/20 border border-cyan-500/30 text-cyan-700 dark:bg-cyan-500/20 dark:border-cyan-500/50 dark:text-cyan-300"
                            }`}
                          >
                            {project.type === "case-study"
                              ? "CASE STUDY"
                              : "PROJECT"}
                          </span>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-xl font-bold text-gray-900 font-mono group-hover:text-cyan-700 transition-colors duration-300 dark:text-white dark:group-hover:text-cyan-300">
                            {project.title}
                          </h3>
                          <div className="flex gap-3 flex-shrink-0">
                            {project.links.github && (
                              <motion.a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-cyan-600 transition-colors duration-300 dark:text-gray-400 dark:hover:text-cyan-400"
                                whileHover={{ y: -2 }}
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                              </motion.a>
                            )}
                            {project.links.live && (
                              <motion.a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-green-600 transition-colors duration-300 dark:text-gray-400 dark:hover:text-green-400"
                                whileHover={{ y: -2 }}
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </motion.a>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                          {project.description}
                        </p>

                        {/* Metrics for Case Studies */}
                        {project.type === "case-study" && project.metrics && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-purple-600 font-mono dark:text-purple-300">
                              KEY_METRICS:
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(project.metrics).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="bg-gray-50 rounded-lg p-3 border border-gray-200 dark:bg-gray-900/50 dark:border-gray-700"
                                  >
                                    <div className="text-xs text-gray-500 font-mono dark:text-gray-400">
                                      {key}
                                    </div>
                                    <div className="text-lg font-bold text-cyan-600 font-mono dark:text-cyan-300">
                                      {value}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Tech Stack */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-green-600 font-mono dark:text-green-300">
                            TECH_STACK:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-600 border border-gray-300 hover:border-cyan-500/30 hover:text-cyan-700 transition-colors duration-300 dark:bg-gray-900/50 dark:text-gray-300 dark:border-gray-700 dark:hover:border-cyan-500/50 dark:hover:text-cyan-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Case Study Link */}
                        {project.links.caseStudy && (
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link
                              href={project.links.caseStudy}
                              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors duration-300 font-mono text-sm dark:text-purple-400 dark:hover:text-purple-300"
                            >
                              View Case Study
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 font-mono dark:text-gray-400">
                  No projects found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectsShowcase;