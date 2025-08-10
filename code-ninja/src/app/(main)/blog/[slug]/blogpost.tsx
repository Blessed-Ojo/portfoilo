"use client";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

interface SanityImage {
  asset: { _ref: string; _type: string };
  alt?: string;
  caption?: string;
}

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

// Fixed: Replace 'any' with proper typing for Sanity's PortableText blocks
interface SanityPost {
  title: string;
  body: Array<{
    _type: string;
    children?: Array<{
      _type: string;
      text: string;
      marks?: string[];
    }>;
    style?: string;
    [key: string]: unknown;
  }>;
  _createdAt: string;
  publishedAt?: string;
  mainImage?: SanityImage;
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
      y: -10, 
      rotateX: -2,
      scale: 1.01,
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

// Back Navigation Component
const BackNavigation = () => (
  <motion.div
    initial={{ opacity: 0, x: -30, rotateY: -20 }}
    animate={{ opacity: 1, x: 0, rotateY: 0 }}
    transition={{ duration: 0.6, type: "spring" }}
    className="transform-gpu mb-8"
  >
    <Link
      href="/blog"
      className="inline-flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 p-3 rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-lg backdrop-blur-sm"
    >
      <ArrowLeft className="w-5 h-5" /> Back to Blog
    </Link>
  </motion.div>
);

// Enhanced PortableText Components
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Card3D className="my-12">
        <motion.figure
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="group"
        >
          <div className="relative w-full h-[500px] bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl overflow-hidden hover:shadow-blue-500/20 transition-all duration-500 p-4">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={urlFor(value).url() || "/placeholder.svg?height=500&width=800"}
                alt={value.alt || "Blog post image"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </div>
          {value.caption && (
            <figcaption className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 italic bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-3 rounded-lg">
              {value.caption}
            </figcaption>
          )}
        </motion.figure>
      </Card3D>
    ),
    code: ({ value }) => (
      <Card3D className="my-8">
        <motion.pre
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl overflow-x-auto shadow-2xl border border-gray-700/50"
        >
          <code className="text-sm font-mono text-gray-200">{value.code}</code>
        </motion.pre>
      </Card3D>
    ),
  },
  block: {
    h1: ({ children }) => (
      <motion.h1
        variants={float3D}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl font-bold mt-12 mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        style={{
          textShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transform: "translateZ(50px)"
        }}
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children }) => (
      <motion.h2
        variants={float3D}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl font-bold mt-10 mb-5 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        {children}
      </motion.h2>
    ),
    h3: ({ children }) => (
      <motion.h3
        variants={float3D}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-white"
      >
        {children}
      </motion.h3>
    ),
    normal: ({ children }) => (
      <Card3D className="mb-6">
        <motion.p
          className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20"
        >
          {children}
        </motion.p>
      </Card3D>
    ),
    blockquote: ({ children }) => (
      <Card3D className="my-8">
        <motion.blockquote
          whileHover={{ scale: 1.02, x: 10 }}
          className="border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm p-6 italic rounded-r-2xl shadow-lg text-gray-700 dark:text-gray-300"
        >
          {children}
        </motion.blockquote>
      </Card3D>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <motion.a
          href={value.href}
          rel={rel}
          whileHover={{ scale: 1.05 }}
          className="text-blue-500 hover:text-blue-400 transition-all duration-300 underline decoration-blue-500/50 hover:decoration-blue-400"
          target={!value.href.startsWith("/") ? "_blank" : undefined}
        >
          {children}
        </motion.a>
      );
    },
    code: ({ children }) => (
      <motion.code 
        whileHover={{ scale: 1.1 }}
        className="bg-gray-800 px-2 py-1 rounded-lg text-gray-200 font-mono text-sm border border-gray-700/50 shadow-sm"
      >
        {children}
      </motion.code>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-gray-800 dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <Card3D className="mb-6">
        <ul className="list-none space-y-3 text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20">
          {children}
        </ul>
      </Card3D>
    ),
    number: ({ children }) => (
      <Card3D className="mb-6">
        <ol className="list-none space-y-3 text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20">
          {children}
        </ol>
      </Card3D>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <motion.li 
        whileHover={{ x: 10, scale: 1.02 }}
        className="flex items-center gap-3 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
      >
        <span className="text-blue-500 text-lg">▸</span> 
        {children}
      </motion.li>
    ),
    // Fixed: Removed unused 'index' parameter
    number: ({ children }) => (
      <motion.li 
        whileHover={{ x: 10, scale: 1.02 }}
        className="flex items-center gap-3 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
      >
        <span className="text-blue-500 font-bold min-w-[24px]">•</span> 
        {children}
      </motion.li>
    ),
  },
};

export default function BlogPost({ post }: { post: SanityPost }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white min-h-screen pt-24 relative overflow-hidden transition-colors duration-300">
      <AnimatedBackground />
      
      <section className="relative z-10 pb-20">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 pt-10">
          <BackNavigation />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            {/* Title */}
            <motion.h1
              variants={float3D}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-8 relative perspective-1000"
              style={{
                textShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transform: "translateZ(100px)"
              }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {post.title}
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

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <motion.div
                variants={float3D}
                className="mb-8 flex flex-wrap gap-3"
              >
                {post.categories
                  ?.filter(
                    (cat): cat is Category =>
                      !!cat && !!cat.slug && !!cat.slug.current
                  )
                  .map((cat) => (
                    <motion.div
                      key={cat._id}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={`/blog/category/${cat.slug.current}`}
                        className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                      >
                        {cat.title}
                      </Link>
                    </motion.div>
                  ))}
              </motion.div>
            )}

            {/* Date */}
            <motion.p
              variants={float3D}
              className="text-gray-600 dark:text-gray-400 text-lg mb-12 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 inline-block"
            >
              {new Date(post.publishedAt || post._createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </motion.p>

            {/* Main Image */}
            {post.mainImage && (
              <Card3D className="mb-16">
                <motion.figure
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="relative aspect-video bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl overflow-hidden hover:shadow-blue-500/20 transition-all duration-500 p-6">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                      <Image
                        src={
                          urlFor(post.mainImage).url() ||
                          "/placeholder.svg?height=600&width=1200"
                        }
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      />
                    </div>
                  </div>
                  {post.mainImage.caption && (
                    <figcaption className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 italic bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20">
                      {post.mainImage.caption}
                    </figcaption>
                  )}
                </motion.figure>
              </Card3D>
            )}

            {/* Content */}
            <motion.div
              variants={float3D}
              className="prose prose-lg max-w-none"
            >
              <PortableText value={post.body} components={components} />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}