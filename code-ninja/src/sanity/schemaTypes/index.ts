import type { DocumentSchema } from "../lib/types"
import post from "./post"
import category from "./category"

/**
 * Array of all schema types
 */
export const schemaTypes: DocumentSchema[] = [post, category]

/**
 * Schema configuration object
 */
export const schema = {
  types: schemaTypes,
}

