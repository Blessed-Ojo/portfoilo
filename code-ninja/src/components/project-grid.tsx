"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import projectsData from "../data/projects.json";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Eye,
  FileText,
  Zap,
  TrendingUp,
} from "lucide-react";

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

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut" as const, // Fixed: changed from number array to string literal
      },
    },
  };

  const hoverVariants = {
    scale: 1.03,
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" as const }, // Fixed: added type assertion
  };

  return (
    <motion.div
      className="group relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={hoverVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Hover Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      {/* Main Card */}
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Project Type Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                project.type === "case-study"
                  ? "bg-purple-600/90 text-white"
                  : "bg-blue-600/90 text-white"
              }`}
            >
              {project.type === "case-study" ? (
                <TrendingUp size={12} />
              ) : (
                <Zap size={12} />
              )}
              {project.type === "case-study" ? "Case Study" : "Project"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-900/70 backdrop-blur-sm rounded-full text-white hover:bg-purple-600 transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-600/80 backdrop-blur-sm rounded-full text-white hover:bg-blue-500 transition-colors"
              >
                <Eye size={16} />
              </a>
            )}
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(project.metrics)
                .slice(0, 4)
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2"
                  >
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {key}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {value}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          {/* Action Button */}
          {project.links.caseStudy && (
            <Link
              href={project.links.caseStudy}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 group/btn"
            >
              <FileText size={14} />
              View Case Study
              <ArrowRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsGrid: React.FC = () => {
  const projects: Project[] = projectsData.projects.map((p) => ({
    ...p,
    type: p.type as "case-study" | "standard",
    metrics: p.metrics
      ? Object.fromEntries(
          Object.entries(p.metrics).filter(
            ([, value]) => typeof value === "string"
          )
        )
      : undefined,
  }));

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

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }, // Fixed: changed from number array
    },
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Seamless Background Transition */}
      <div className="absolute inset-0">
        {/* Gradient that continues from Hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-100/30 via-gray-50/50 to-gray-100/70 dark:from-purple-900/10 dark:via-gray-900/30 dark:to-gray-800/50" />

        {/* Subtle Pattern */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating Elements for Continuity */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap size={16} className="text-purple-500" />
            Featured Work
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Creative Solutions
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A collection of my recent work, from detailed case studies to quick
            projects. Each one represents a unique challenge and creative
            solution.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            View All Projects
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
