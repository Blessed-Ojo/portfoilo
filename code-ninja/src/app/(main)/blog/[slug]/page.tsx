import BlogPost from "./blogpost";
import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getPost(slug: string) {
  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        body,
        excerpt,
        _createdAt,
        publishedAt,
        mainImage{
          asset->,
          alt,
          caption
        },
        categories[]->{
          _id,
          title,
          slug,
          description
        }
      }`,
      { slug }
    );

    if (!post) {
      notFound();
    }

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        excerpt
      }`,
      { slug }
    );

    return {
      title: post?.title ? `${post.title} | Andy Portfolio` : "Blog Post",
      description: post?.excerpt || "Read this blog post",
    };
  } catch {
    return {
      title: "Blog Post | Andy Portfolio",
      description: "Read this blog post",
    };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "post" && defined(slug.current)]{ slug }`
    );
    return posts.map((post) => ({ slug: post.slug.current }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <BlogPost post={post} />;
}
