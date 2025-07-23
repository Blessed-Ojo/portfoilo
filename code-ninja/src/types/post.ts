import type { Rule } from "sanity";

/**
 * Post schema definition
 * Represents a blog post with rich content
 */
const postSchema = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: Rule) => rule.required().max(100),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
          validation: (rule: Rule) => rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Text displayed below the image",
        },
      ],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A short summary of the post, used for SEO and previews.",
      validation: (rule: Rule) => rule.required().max(200),
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Title used for SEO (if different from main title)",
      validation: (rule: Rule) => rule.max(60),
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Description used for SEO (if different from excerpt)",
      validation: (rule: Rule) => rule.max(160),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessibility.",
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Text displayed below the image",
            },
          ],
          options: {
            hotspot: true,
          },
        },
        {
          type: "code",
          options: {
            withFilename: true,
            language: "javascript",
            languageAlternatives: [
              { title: "Javascript", value: "javascript" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "TypeScript", value: "typescript" },
              { title: "Python", value: "python" },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
} as const;

export default postSchema;
