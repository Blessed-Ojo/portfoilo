import type { Rule } from "sanity";
import type { DocumentSchema, SlugField, SchemaField } from "../lib/types";

/**
 * Category schema definition
 * Represents a blog post category
 */
const category: DocumentSchema = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: Rule) => rule.required(),
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
      name: "description",
      title: "Description",
      type: "text",
    } as SchemaField,
  ],
};

export default category;
