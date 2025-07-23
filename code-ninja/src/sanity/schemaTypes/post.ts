import type { Rule } from "sanity";
import type {
  DocumentSchema,
  SchemaField,
  SlugField,
  ImageField,
  ArrayField,
  CodeField,
} from "../lib/types";

/**
 * Post schema definition
 * Represents a blog post with rich content
 */
const postSchema: DocumentSchema = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: Rule) => rule.required().max(100),
    } as SchemaField,
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required(),
    } as SlugField,
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
    } as ImageField,
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
      options: {
        layout: "tags",
      },
    } as ArrayField,
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    } as ArrayField,
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule: Rule) => rule.required(),
    } as SchemaField,
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A short summary of the post, used for SEO and previews.",
      validation: (rule: Rule) => rule.required().max(200),
    } as SchemaField,
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Title used for SEO (if different from main title)",
      validation: (rule: Rule) => rule.max(60),
    } as SchemaField,
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Description used for SEO (if different from excerpt)",
      validation: (rule: Rule) => rule.max(160),
    } as SchemaField,
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
        } as ImageField,
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
        } as CodeField,
      ],
    } as ArrayField,
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
};

export default postSchema;
