"use client";
import React from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CheckIcon,
  TrophyIcon,
  StarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

// Type definitions
interface BeforeAfterMetric {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface CaseStudyData {
  hero: {
    title: string;
    client: string;
    duration: string;
    overview: string;
    technologies: string[];
    heroImage: string;
  };
  challenge: {
    problem: string;
    context: string;
    constraints: string[];
    metrics: string[];
  };
  goals: {
    primary: string[];
    stakeholder: string[];
    success: string[];
  };
  results: {
    beforeAfter: BeforeAfterMetric[];
    metrics: string[];
    testimonials?: Testimonial[];
  };
}

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

// Section Component
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-24 border-b border-gray-200/50 dark:border-gray-700/50 ${className}`}>
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
      {children}
    </div>
  </section>
);

// Section Title Component
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    variants={float3D}
    className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-12 relative perspective-1000"
    style={{
      textShadow: "0 4px 20px rgba(0,0,0,0.1)",
      transform: "translateZ(50px)"
    }}
  >
    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      {children}
    </span>
  </motion.h2>
);

function getImprovementIcon(improvement: string) {
  if (improvement.match(/\+|faster|better/))
    return <ArrowUpIcon className="w-3 h-3" />;
  if (improvement.match(/-|reduced|lower/))
    return <ArrowDownIcon className="w-3 h-3" />;
  return null;
}

function getImprovementColor(improvement: string) {
  return improvement.match(/\+|faster|better|reduced|lower|-/)
    ? "text-blue-600 dark:text-blue-400"
    : "text-gray-700 dark:text-gray-300";
}

export default function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudyData }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white min-h-screen pt-24 relative overflow-hidden transition-colors duration-300">
      <AnimatedBackground />
      
      {/* Back Navigation */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 pt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="transform-gpu"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 p-3 rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-lg backdrop-blur-sm"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Projects
          </Link>
        </motion.div>
      </div>

      {/* Hero Section */}
      <Section>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10"
        >
          <motion.div variants={float3D} className="space-y-6">
            <div className="space-y-4">
              <motion.h1
                className="text-4xl sm:text-5xl font-bold relative perspective-1000"
                variants={float3D}
                style={{
                  textShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transform: "translateZ(100px)"
                }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {caseStudy.hero.title}
                </span>
              </motion.h1>
              <motion.div
                className="space-y-2 text-sm text-gray-600 dark:text-gray-400 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20"
                variants={float3D}
              >
                <p>
                  <span className="font-medium">Client:</span>{" "}
                  {caseStudy.hero.client}
                </p>
                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {caseStudy.hero.duration}
                </p>
              </motion.div>
            </div>
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20"
              variants={float3D}
            >
              {caseStudy.hero.overview}
            </motion.p>
            <motion.div variants={float3D} className="space-y-3">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.hero.technologies.map(
                  (tech: string) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 text-xs bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
          <Card3D delay={0.3}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden min-h-[300px] h-full shadow-2xl border border-white/20 dark:border-gray-700/20">
              <Image
                src={caseStudy.hero.heroImage}
                alt={caseStudy.hero.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </Card3D>
        </motion.div>
      </Section>

      {/* Challenge & Context */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="space-y-12 relative z-10"
        >
          <SectionTitle>Challenge & Context</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Card3D delay={0.2}>
              <div className="space-y-6 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                <div>
                  <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-3">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 bg-blue-500 rounded-full"
                    />
                    The Problem
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {caseStudy.challenge.problem}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-3">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                      className="w-3 h-3 bg-purple-500 rounded-full"
                    />
                    Industry Context
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {caseStudy.challenge.context}
                  </p>
                </div>
              </div>
            </Card3D>
            <Card3D delay={0.4}>
              <div className="space-y-6 p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                <div>
                  <h3 className="text-xl font-medium text-pink-600 dark:text-pink-400 mb-4 flex items-center gap-3">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                      className="w-3 h-3 bg-pink-500 rounded-full"
                    />
                    Key Constraints
                  </h3>
                  <ul className="space-y-3">
                    {caseStudy.challenge.constraints.map(
                      (constraint: string, index: number) => (
                        <motion.li
                          key={index}
                          whileHover={{ x: 10, scale: 1.02 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                        >
                          <CheckIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {constraint}
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-green-600 dark:text-green-400 mb-4 flex items-center gap-3">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
                      className="w-3 h-3 bg-green-500 rounded-full"
                    />
                    Initial Metrics
                  </h3>
                  <ul className="space-y-3">
                    {caseStudy.challenge.metrics.map((metric: string, index: number) => (
                      <motion.li
                        key={index}
                        whileHover={{ x: 10, scale: 1.02 }}
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3"
                      >
                        <span className="text-green-500 text-lg">▸</span>
                        {metric}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card3D>
          </div>
        </motion.div>
      </Section>

      {/* Project Goals */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="space-y-12 relative z-10"
        >
          <SectionTitle>Project Goals</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {["primary", "stakeholder", "success"].map((key, goalIndex) => {
              const colors = ['blue', 'purple', 'pink'];
              const color = colors[goalIndex];
              return (
                <Card3D key={key} delay={goalIndex * 0.2}>
                  <div className="p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-lg transition-all duration-500 h-full">
                    <h3 className={`text-xl font-medium text-${color}-600 dark:text-${color}-400 mb-6 flex items-center gap-3`}>
                      <motion.span 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: goalIndex * 0.5 }}
                        className={`w-3 h-3 bg-${color}-500 rounded-full`}
                      />
                      {key === "primary"
                        ? "Primary Objectives"
                        : key === "stakeholder"
                        ? "Stakeholder Requirements"
                        : "Success Criteria"}
                    </h3>
                    <ul className="space-y-4">
                      {caseStudy.goals[key as keyof typeof caseStudy.goals].map((item: string, itemIndex: number) => (
                        <motion.li
                          key={itemIndex}
                          whileHover={{ x: 10, scale: 1.02 }}
                          className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                        >
                          <CheckIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Card3D>
              );
            })}
          </div>
        </motion.div>
      </Section>

      {/* Results & Impact */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="space-y-12 relative z-10"
        >
          <SectionTitle>Results & Impact</SectionTitle>
          <motion.div variants={float3D} className="space-y-8">
            <h3 className="text-2xl font-medium text-gray-800 dark:text-white">
              Before vs After
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {caseStudy.results.beforeAfter.map((metric: BeforeAfterMetric, metricIndex: number) => (
                <Card3D key={metricIndex} delay={metricIndex * 0.1}>
                  <div className="group relative overflow-hidden p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                      {metric.metric}
                    </h4>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Before:
                        </span>
                        <span className="text-lg font-mono text-gray-700 dark:text-gray-300">
                          {metric.before}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          After:
                        </span>
                        <span className="text-lg font-mono text-blue-600 dark:text-blue-400 font-semibold">
                          {metric.after}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm ${getImprovementColor(
                        metric.improvement
                      )}`}
                    >
                      {getImprovementIcon(metric.improvement)}
                      <span className="text-sm font-semibold tracking-wide">
                        {metric.improvement}
                      </span>
                    </motion.div>
                  </div>
                </Card3D>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={float3D} className="space-y-6">
            <h3 className="text-2xl font-medium text-gray-800 dark:text-white">
              Additional Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudy.results.metrics.map((metric: string, impactIndex: number) => (
                <Card3D key={impactIndex} delay={impactIndex * 0.1}>
                  <div className="flex items-center gap-4 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <motion.div
                      whileHover={{ rotateY: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
                    >
                      <TrophyIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {metric}
                    </span>
                  </div>
                </Card3D>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          {caseStudy.results.testimonials &&
            caseStudy.results.testimonials.length > 0 && (
              <motion.div variants={float3D} className="space-y-6">
                <h3 className="text-2xl font-medium text-gray-800 dark:text-white">
                  Client Testimonials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudy.results.testimonials.map((testimonial: Testimonial, testimonialIndex: number) => (
                    <Card3D key={testimonialIndex} delay={testimonialIndex * 0.2}>
                      <div className="p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-lg transition-all duration-500">
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, starIndex) => (
                            <motion.div
                              key={starIndex}
                              whileHover={{ scale: 1.2, rotate: 180 }}
                              transition={{ duration: 0.3 }}
                            >
                              <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                          &quot;{testimonial.quote}&quot;
                        </p>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </Card3D>
                  ))}
                </div>
              </motion.div>
            )}
        </motion.div>
      </Section>

      {/* Back to Projects */}
      <Section className="border-b-0">
        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 p-4 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-lg backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to All Projects
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}