"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

interface SanityPost {
  title: string;
  slug: { current: string };
  excerpt?: string;
  _createdAt: string;
  publishedAt?: string;
  categories?: (Category | null)[];
}

// Animation Variants - removed unused fadeInUp
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

// Terminal typing effect with modern styling
const ModernTerminalText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev: boolean) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="font-mono">
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity text-blue-400`}>
        █
      </span>
    </span>
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

// Enhanced Blog Post Card
const BlogPostCard = ({ post, index }: { post: SanityPost; index: number }) => {
  return (
    <Card3D delay={index * 0.1}>
      <Link href={`/blog/${post.slug.current}`} className="block h-full group">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:bg-white/80 dark:hover:bg-gray-800/80 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                />
                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                  ACTIVE
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {new Date(post.publishedAt || post._createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories
                  ?.filter(
                    (cat): cat is Category =>
                      !!cat && !!cat.slug && !!cat.slug.current
                  )
                  .map((cat, catIndex) => {
                    const colors = ['blue', 'purple', 'pink', 'green'];
                    const color = colors[catIndex % colors.length];
                    return (
                      <motion.div
                        key={cat._id}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={`/blog/category/${cat.slug.current}`}
                          className={`inline-block bg-gradient-to-r from-${color}-500/20 to-${color}-600/20 border border-${color}-500/30 text-${color}-600 dark:text-${color}-400 px-3 py-1 rounded-full text-xs font-medium hover:bg-${color}-500/30 transition-all duration-300`}
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                        >
                          {cat.title}
                        </Link>
                      </motion.div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-4"
              whileHover={{ 
                textShadow: "0 0 20px rgba(59, 130, 246, 0.5)" 
              }}
            >
              {post.title}
            </motion.h3>

            {post.excerpt && (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                {post.excerpt}
              </p>
            )}

            {/* Read More */}
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 font-semibold"
                whileHover={{ x: 10 }}
              >
                <span>Read Article</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
              <div className="text-gray-400 dark:text-gray-500 text-sm">
                {Math.ceil(Math.random() * 5 + 2)} min read
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300"></div>
        </div>
      </Link>
    </Card3D>
  );
};

// Hero Section Component
const HeroSection = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={stagger}
    className="mb-20"
  >
    <Card3D>
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl p-8 overflow-hidden relative">
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>

        <motion.div
          variants={float3D}
          className="space-y-6"
        >
          <div className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-2">
            ~/blog --explore
          </div>
          <motion.h1 
            className="text-5xl sm:text-7xl font-bold relative perspective-1000"
            style={{
              textShadow: "0 10px 30px rgba(0,0,0,0.1)",
              transform: "translateZ(100px)"
            }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              <ModernTerminalText text="Code. Create. Conquer." delay={500} />
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
          <div className="text-gray-700 dark:text-gray-300 text-xl leading-relaxed max-w-3xl">
            <ModernTerminalText 
              text="// Exploring the intersection of technology, creativity, and innovation..." 
              delay={2000} 
            />
            <br />
            <div className="mt-4">
              <ModernTerminalText 
                text="// Where ideas become reality through code and design" 
                delay={4000} 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Card3D>
  </motion.div>
);

export default function BlogList({ posts }: { posts: SanityPost[] }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white min-h-screen pt-24 relative overflow-hidden transition-colors duration-300">
      <AnimatedBackground />
      
      <section className="relative z-10 py-20">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Hero Section */}
            <HeroSection />

            {/* Posts Grid */}
            <motion.div variants={stagger}>
              <motion.h2
                variants={float3D}
                className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-16 relative perspective-1000"
                style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transform: "translateZ(50px)"
                }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Latest Articles
                </span>
              </motion.h2>

              <div className="grid gap-8 lg:gap-12">
                {posts.map((post, index) => (
                  <BlogPostCard 
                    key={post.slug.current} 
                    post={post} 
                    index={index} 
                  />
                ))}
              </div>

              {/* Empty State */}
              {posts.length === 0 && (
                <Card3D>
                  <div className="text-center py-20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center"
                    >
                      <span className="text-white text-2xl">∅</span>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                      No articles found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      The blog is currently being compiled. Check back soon for new content!
                    </p>
                  </div>
                </Card3D>
              )}
            </motion.div>

            {/* Footer Message */}
            <motion.div
              variants={float3D}
              className="mt-20 text-center"
            >
              <div className="inline-block bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-2xl px-8 py-4 shadow-lg">
                <span className="text-gray-700 dark:text-gray-300 text-lg">
                  <span className="text-blue-500">$</span> echo &ldquo;Happy coding!&rdquo;
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-2 text-blue-400"
                  >
                    █
                  </motion.span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}