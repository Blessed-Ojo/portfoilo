"use client";

import React from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  CodeBracketIcon,
  ChartBarIcon,
  ServerIcon,
  SparklesIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

// Type definitions
interface IconProps {
  className?: string;
  [key: string]: unknown;
}

interface FunFact {
  icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
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

// Section Wrapper Component
const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="py-32 border-b border-gray-200/50 dark:border-gray-700/50">
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
      {children}
    </div>
  </section>
);

// Section Title Component
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    variants={float3D}
    className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-16 relative perspective-1000"
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

// Animated Icon Component
const AnimatedIcon = ({ 
  Icon, 
  className = "",
  gradientFrom = "blue-500",
  gradientTo = "purple-500"
}: { 
  Icon: React.ComponentType<IconProps>;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}) => (
  <motion.div 
    whileHover={{ rotateY: 360 }}
    transition={{ duration: 0.6 }}
    className={`p-4 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-2xl shadow-lg ${className}`}
  >
    <Icon className="w-8 h-8 text-white" />
  </motion.div>
);

// Professional Journey Card Component
const ProfessionalCard = ({ 
  icon, 
  title, 
  description, 
  stats, 
  gradientFrom, 
  gradientTo,
  delay = 0
}: {
  icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
  stats: string[];
  gradientFrom: string;
  gradientTo: string;
  delay?: number;
}) => (
  <Card3D delay={delay}>
    <div className="space-y-6 group">
      <div className="flex items-center gap-4">
        <AnimatedIcon 
          Icon={icon} 
          gradientFrom={gradientFrom} 
          gradientTo={gradientTo}
        />
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
      </div>
      <div className="p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:bg-white/80 dark:hover:bg-gray-800/80">
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
          {description}
        </p>
        <ul className="list-none space-y-3 text-gray-600 dark:text-gray-400">
          {stats.map((stat, index) => (
            <li key={index} className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Card3D>
);

// Technical Skills Card Component
const TechnicalSkillCard = ({ 
  title, 
  skills, 
  delay = 0 
}: {
  title: string;
  skills: string[];
  delay?: number;
}) => (
  <Card3D delay={delay}>
    <div className="p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:bg-white/80 dark:hover:bg-gray-800/80 group">
      <h4 className="font-bold mb-6 text-blue-600 dark:text-blue-400 flex items-center gap-3 text-xl">
        <motion.span 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-3 h-3 bg-blue-500 rounded-full"
        />
        {title}
      </h4>
      <ul className="space-y-4 text-gray-700 dark:text-gray-300">
        {skills.map((skill) => (
          <motion.li 
            key={skill}
            whileHover={{ x: 10, scale: 1.05 }}
            className="flex items-center gap-3 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
          >
            <span className="text-blue-500 text-lg">▸</span> 
            {skill}
          </motion.li>
        ))}
      </ul>
    </div>
  </Card3D>
);

// Fun Facts Card Component
const FunFactCard = ({ 
  fact, 
  index 
}: { 
  fact: FunFact; 
  index: number;
}) => {
  const Icon = fact.icon;
  
  return (
    <Card3D delay={index * 0.1}>
      <div className="group p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500">
        <div className="flex gap-6 items-start">
          <motion.div 
            whileHover={{ rotateY: 180, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl border border-blue-500/30 shadow-lg"
          >
            <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 text-xl">
              {fact.title}
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
              {fact.description}
            </p>
          </div>
        </div>
      </div>
    </Card3D>
  );
};

// Call to Action Component
const CallToAction = () => (
  <motion.div variants={float3D} className="flex justify-center gap-6 flex-wrap">
   
    <Link 
      href="/projects"
      className="px-10 py-4 border-2 border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 font-bold rounded-2xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:bg-white/60 dark:hover:bg-gray-800/60 backdrop-blur-sm shadow-xl text-lg inline-block hover:scale-105 hover:-translate-y-1"
    >
      View Projects
    </Link>
    <Link 
      href="/contact"
      className="px-10 py-4 border-2 border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 font-bold rounded-2xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:bg-white/60 dark:hover:bg-gray-800/60 backdrop-blur-sm shadow-xl text-lg inline-block hover:scale-105 hover:-translate-y-1"
    >
      Get In Touch
    </Link>
     
  </motion.div>
);

// Data
const funFacts: FunFact[] = [
  {
    icon: CodeBracketIcon,
    title: "Teaching & Mentorship",
    description: "I love sharing what I know—I&apos;ve taught and mentored over 1,000 students (and counting), helping others break into tech and level up their skills.",
  },
  {
    icon: ChartBarIcon,
    title: "Accidental SEO Enthusiast",
    description: "I learned SEO because my boss told me to. I started watching YouTube tutorials just to keep my job, but ended up falling in love with the challenge and creativity of search optimization.",
  },
  {
    icon: ServerIcon,
    title: "Modern Infrastructure Explorer",
    description: "I&apos;m obsessed with how modern infrastructure works. I spend hours reading docs, case studies, and exploring how big tech companies build and scale their systems.",
  },
  {
    icon: SparklesIcon,
    title: "Driven by Doubt",
    description: "I&apos;ve spent a lot of my life proving people wrong about how I am or how I would end up. It&apos;s the reason I&apos;m obsessed with building perfect solutions.",
  },
];

const professionalData = {
  seo: {
    icon: ChartBarIcon,
    title: "SEO Optimization Expert",
    description: "I&apos;ve helped businesses increase their organic traffic by an average of 285%. My approach combines technical SEO mastery with content strategy, focusing on sustainable, white-hat techniques.",
    stats: [
      "Improved Core Web Vitals for 20+ websites",
      "Increased traffic 400% for an e-commerce client",
      "Built SEO audit automation tools",
      "Recovered 5+ sites from Google penalties"
    ],
    gradientFrom: "blue-500",
    gradientTo: "purple-500"
  },
  development: {
    icon: CodeBracketIcon,
    title: "Full-Stack Development",
    description: "I build scalable web apps for millions of users, writing clean code and prioritizing performance and UX.",
    stats: [
      "Built dozens of apps with modern stacks",
      "Created real-time dashboards",
      "Developed microservices to cut server costs",
      "Implemented CI/CD pipelines for fast deploys"
    ],
    gradientFrom: "purple-500",
    gradientTo: "pink-500"
  }
};

const technicalSkills = [
  {
    title: "Cloud & DevOps",
    skills: ["AWS/GCP", "Docker, K8s", "Infrastructure as Code"]
  },
  {
    title: "Performance",
    skills: ["DB Optimization", "Redis, CDN Caching", "Load balancing"]
  },
  {
    title: "SEO Skills",
    skills: ["Core Web Vitals", "Schema & markup", "Audit & indexing"]
  }
];

// Main Component
const AboutPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white min-h-screen pt-24 relative overflow-hidden transition-colors duration-300">
      <AnimatedBackground />
      
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 pt-10 relative z-10">
        <BackNavigation />
      </div>

      {/* Hero Section */}
      <Section>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-8 relative z-10"
        >
          <motion.h1
            variants={float3D}
            className="text-5xl sm:text-7xl font-bold relative perspective-1000"
            style={{
              textShadow: "0 10px 30px rgba(0,0,0,0.1)",
              transform: "translateZ(100px)"
            }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Me
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
          <motion.p
            variants={float3D}
            className="text-xl leading-relaxed max-w-4xl text-gray-700 dark:text-gray-300 backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.05)",
              transform: "translateZ(20px)"
            }}
          >
            I&apos;m a passionate full-stack developer with expertise in SEO and infrastructure. My journey started after winning a scholarship to learn a tech skill for a year—choosing development because of a childhood obsession with computers and how things work. Now, I create digital experiences that look beautiful and perform exceptionally well.
          </motion.p>
        </motion.div>
      </Section>

      {/* Professional Journey */}
      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <SectionTitle>Professional Journey</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ProfessionalCard {...professionalData.seo} delay={0.2} />
            <ProfessionalCard {...professionalData.development} delay={0.4} />
          </div>
        </motion.div>
      </Section>

      {/* Technical Expertise */}
      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <SectionTitle>Technical Expertise</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {technicalSkills.map((skill, index) => (
              <TechnicalSkillCard 
                key={skill.title}
                {...skill}
                delay={index * 0.2}
              />
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Fun Facts */}
      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <SectionTitle>Fun Facts</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {funFacts.map((fact, index) => (
              <FunFactCard key={index} fact={fact} index={index} />
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Call to Action */}
      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center space-y-12">
          <SectionTitle>Let&apos;s Build Together</SectionTitle>
          <motion.p variants={float3D} className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-xl leading-relaxed bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20">
            Need help with SEO, dev, or infra? Let&apos;s collaborate and build something impactful.
          </motion.p>
          <CallToAction />
        </motion.div>
      </Section>
    </div>
  );
};

export default AboutPage;