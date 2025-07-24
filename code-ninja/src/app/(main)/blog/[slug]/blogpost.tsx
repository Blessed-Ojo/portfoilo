"use client";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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

interface SanityPost {
  title: string;
  body: any[];
  _createdAt: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  categories?: (Category | null)[];
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <motion.figure
        className="my-10"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.25, 0, 1] }}
      >
        <div className="relative w-full h-[500px] border-4 border-zinc-700 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).url() || "/placeholder.svg?height=500&width=800"}
            alt={value.alt || "Blog post image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-4 text-center text-sm text-gray-400 italic">
            {value.caption}
          </figcaption>
        )}
      </motion.figure>
    ),
    code: ({ value }) => (
      <motion.pre
        className="bg-zinc-800 p-4 rounded-lg overflow-x-auto my-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <code className="text-sm font-mono text-gray-200">{value.code}</code>
      </motion.pre>
    ),
  },
  block: {
    h1: ({ children }) => (
      <motion.h1
        className="text-4xl font-bold mt-8 mb-4 text-light-heading dark:text-dark-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children }) => (
      <motion.h2
        className="text-3xl font-bold mt-8 mb-4 text-light-heading dark:text-dark-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.h2>
    ),
    h3: ({ children }) => (
      <motion.h3
        className="text-2xl font-bold mt-6 mb-3 text-light-heading dark:text-dark-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.h3>
    ),
    normal: ({ children }) => (
      <motion.p
        className="text-light-text dark:text-dark-text leading-relaxed mb-6"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.p>
    ),
    blockquote: ({ children }) => (
      <motion.blockquote
        className="border-l-4 border-blue-500 pl-4 italic my-6 text-light-text dark:text-dark-text"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-400 hover:text-blue-300 transition-colors underline"
          target={!value.href.startsWith("/") ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-gray-200 font-mono text-sm">
        {children}
      </code>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-light-heading dark:text-dark-heading">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-light-text dark:text-dark-text">{children}</em>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-light-text dark:text-dark-text pl-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-light-text dark:text-dark-text pl-4">
        {children}
      </ol>
    ),
  },
};

export default function BlogPost({ post }: { post: SanityPost }) {
  return (
    <section className="pt-28 pb-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300 min-h-screen">
      <div className="max-w-screen-md mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-light-mini dark:text-dark-mini hover:text-blue-400 font-medium mb-10 transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-light-heading dark:text-dark-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {post.title}
          </motion.h1>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <motion.div
              className="mb-6 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {post.categories
                ?.filter(
                  (cat): cat is Category =>
                    !!cat && !!cat.slug && !!cat.slug.current
                )
                .map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/blog/category/${cat.slug.current}`}
                    className="inline-block bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-800 transition"
                  >
                    {cat.title}
                  </Link>
                ))}
            </motion.div>
          )}

          <motion.p
            className="text-light-mini dark:text-dark-mini text-lg mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
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

          {post.mainImage && (
            <motion.figure
              className="mb-10"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.25, 0, 1] }}
            >
              <div className="relative aspect-video overflow-hidden rounded-xl border-4 border-zinc-700">
                <Image
                  src={
                    urlFor(post.mainImage).url() ||
                    "/placeholder.svg?height=600&width=1200"
                  }
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
              {post.mainImage.caption && (
                <figcaption className="mt-4 text-center text-sm text-gray-400 italic">
                  {post.mainImage.caption}
                </figcaption>
              )}
            </motion.figure>
          )}

          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PortableText value={post.body} components={components} />
          </motion.div>
        </article>
      </div>
    </section>
  );
}
