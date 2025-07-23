import type { Rule } from "sanity";

/**
 * Category schema definition
 * Represents a blog post category
 */
const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: Rule) => rule.required(),
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
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
} as const;

export default category;
