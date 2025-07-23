import type { SchemaTypeDefinition } from "sanity";
import post from "./post";
import category from "./category";

/**
 * Array of all schema types
 */
export const schemaTypes: SchemaTypeDefinition[] = [post, category];

/**
 * Schema configuration object
 */
export const schema = {
  types: schemaTypes,
};
