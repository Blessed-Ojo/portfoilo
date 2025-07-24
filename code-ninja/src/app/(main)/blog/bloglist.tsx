"use client";
import { motion } from "framer-motion";
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

// Terminal typing effect
const TerminalText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
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
      setShowCursor((prev: boolean) => !prev); // Fixed: explicit type for prev
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="font-mono">
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity text-green-400`}>
        █
      </span>
    </span>
  );
};

// Matrix-like background effect
const MatrixRain = () => {
  const [drops, setDrops] = useState<Array<{ id: number; x: number; y: number; speed: number }>>([]);

  useEffect(() => {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>{}[];:.,?/";
    const initialDrops = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 0.5 + 0.1
    }));
    setDrops(initialDrops);

    const interval = setInterval(() => {
      setDrops((prev: typeof drops) => prev.map((drop: typeof drops[0]) => ({ // Fixed: explicit types
        ...drop,
        y: drop.y > 100 ? -10 : drop.y + drop.speed
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
      {drops.map((drop: typeof drops[0]) => ( // Fixed: explicit type
        <motion.div
          key={drop.id}
          className="absolute text-green-400 font-mono text-xs"
          style={{ left: `${drop.x}%`, top: `${drop.y}%` }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {Math.random().toString(36).charAt(0)}
        </motion.div>
      ))}
    </div>
  );
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    rotateX: -15,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1] as [number, number, number, number],
      type: "spring" as const,
      stiffness: 100
    },
  },
  hover: {
    y: -8,
    rotateX: 5,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0, 255, 0, 0.15)",
    transition: { 
      duration: 0.3, 
      ease: "easeOut" as const
    },
  },
};

const glitchVariants = {
  initial: { x: 0 },
  glitch: {
    x: [0, -2, 2, -1, 1, 0],
    transition: {
      duration: 0.2,
      repeat: 2,
      repeatType: "reverse" as const
    }
  }
};

export default function BlogList({ posts }: { posts: SanityPost[] }) {
  const [glitchTrigger, setGlitchTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchTrigger((prev: number) => prev + 1); // Fixed: explicit type for prev
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 opacity-20 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(0,255,0,0.1)_25px,rgba(0,255,0,0.1)_26px,transparent_27px,transparent_74px,rgba(0,255,0,0.1)_75px,rgba(0,255,0,0.1)_76px,transparent_77px),linear-gradient(rgba(0,255,0,0.1)_24px,transparent_25px,transparent_26px,rgba(0,255,0,0.1)_27px,rgba(0,255,0,0.1)_74px,transparent_75px,transparent_76px,rgba(0,255,0,0.1)_77px)] bg-[size:100px_100px]" />
      </div>

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.03)_50%)] bg-[length:100%_4px] animate-pulse" />
      </div>

      <section className="relative z-20 py-20 pt-36 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {/* Terminal Header */}
            <motion.div
              className="mb-12 sm:mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
            >
              <div className="bg-gray-900 border border-green-400/30 rounded-lg overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-green-400/20">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-green-400 text-sm font-mono ml-4">~/code-ninja/blog</span>
                </div>
                
                {/* Terminal Content */}
                <div className="p-6">
                  <div className="text-green-400 font-mono text-sm mb-2">
                    <span className="text-gray-500">ninja@terminal:~$</span> cat blog_intro.txt
                  </div>
                  <motion.h2 
                    className="text-4xl font-bold mb-4 text-green-400 font-mono"
                    variants={glitchVariants}
                    animate={glitchTrigger % 10 === 0 ? "glitch" : "initial"}
                  >
                    <TerminalText text="./blog --ninja-mode" delay={500} />
                  </motion.h2>
                  <div className="text-green-300 font-mono text-sm leading-relaxed">
                    <TerminalText 
                      text="// Decoding the matrix of code, design, and digital warfare..." 
                      delay={2000} 
                    />
                    <br />
                    <TerminalText 
                      text="// Where algorithms meet artistry in the shadows of cyberspace" 
                      delay={4000} 
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid gap-6 sm:gap-8">
              {posts.map((post, i) => (
                <motion.div
                  key={post.slug.current}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="group perspective-1000"
                  transition={{
                    delay: i * 0.15
                  }}
                >
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="block h-full"
                  >
                    <div className="bg-gray-900/80 backdrop-blur-sm border border-green-400/20 rounded-lg overflow-hidden shadow-xl hover:shadow-green-400/20 transition-all duration-300 hover:border-green-400/40">
                      {/* Post Header Bar */}
                      <div className="bg-gray-800/50 px-4 py-2 border-b border-green-400/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400/50"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400/30"></div>
                          </div>
                          <span className="text-green-400 text-xs font-mono">
                            STATUS: ACTIVE
                          </span>
                        </div>
                        <div className="text-green-400/70 text-xs font-mono">
                          {new Date(post.publishedAt || post._createdAt).toLocaleDateString("en-US", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Categories as Code Tags */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories
                              ?.filter(
                                (cat): cat is Category =>
                                  !!cat && !!cat.slug && !!cat.slug.current
                              )
                              .map((cat) => (
                                <Link
                                  key={cat._id}
                                  href={`/blog/category/${cat.slug.current}`}
                                  className="inline-flex items-center gap-1 bg-green-400/10 border border-green-400/30 text-green-400 px-3 py-1 rounded text-xs font-mono hover:bg-green-400/20 hover:border-green-400/50 transition-all duration-300"
                                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()} // Fixed: explicit type for e
                                >
                                  <span className="text-green-400/70">&lt;</span>
                                  {cat.title}
                                  <span className="text-green-400/70">/&gt;</span>
                                </Link>
                              ))}
                          </div>
                        )}

                        {/* Post Title with Glitch Effect */}
                        <motion.h3 
                          className="text-2xl sm:text-3xl font-bold text-green-400 group-hover:text-white transition-colors duration-300 mb-3 font-mono"
                          whileHover={{ 
                            textShadow: "0 0 10px rgba(0, 255, 0, 0.8)" 
                          }}
                        >
                          <span className="text-green-400/50">&gt; </span>
                          {post.title}
                          <motion.span 
                            className="inline-block ml-2 text-green-400"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            █
                          </motion.span>
                        </motion.h3>

                        {/* Post Excerpt */}
                        {post.excerpt && (
                          <div className="mb-4">
                            <div className="text-green-400/70 text-xs font-mono mb-2">
                              // EXCERPT:
                            </div>
                            <p className="text-green-300/90 leading-relaxed font-mono text-sm">
                              {post.excerpt}
                            </p>
                          </div>
                        )}

                        {/* Read More Link */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-green-400 hover:text-white transition-colors duration-300 font-mono text-sm group">
                            <span>&gt; ./execute --read-more</span>
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-green-400"
                            >
                              →
                            </motion.span>
                          </div>
                          <div className="text-green-400/50 text-xs font-mono">
                            [ENTER]
                          </div>
                        </div>
                      </div>

                      {/* Bottom Border Effect */}
                      <div className="h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent group-hover:via-green-400 transition-all duration-300"></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Terminal Footer */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <div className="inline-block bg-gray-900/80 border border-green-400/30 rounded px-6 py-3">
                <span className="text-green-400 font-mono text-sm">
                  <span className="text-green-400/70">ninja@blog:~$</span> echo "End of transmission"
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1"
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