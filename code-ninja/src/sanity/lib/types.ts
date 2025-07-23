/**
 * Common type definitions for Sanity schemas
 */
import type { Rule } from "sanity";

/**
 * Base interface for all schema types
 */
export interface SchemaType {
  name: string;
  title: string;
  type: string;
}

/**
 * Interface for document schema types
 */
export interface DocumentSchema extends SchemaType {
  type: "document";
  fields: SchemaField[];
  preview?: {
    select: Record<string, string>;
    prepare?: (selection: Record<string, any>) => {
      title?: string;
      subtitle?: string;
      media?: any;
    };
  };
}

/**
 * Interface for field definitions
 */
export interface SchemaField {
  name: string;
  title: string;
  type: string;
  description?: string;
  validation?: (rule: Rule) => Rule;
  options?: Record<string, any>;
  fields?: SchemaField[];
  of?: Array<{ type: string } & Partial<SchemaField>>;
  rows?: number;
}

/**
 * Type for language alternatives in code blocks
 */
export interface LanguageAlternative {
  title: string;
  value: string;
}

/**
 * Type for image field with hotspot
 */
export interface ImageField extends SchemaField {
  type: "image";
  options: {
    hotspot: boolean;
  };
  fields?: SchemaField[];
}

/**
 * Type for code field
 */
export interface CodeField extends SchemaField {
  type: "code";
  options: {
    withFilename: boolean;
    language: string;
    languageAlternatives: LanguageAlternative[];
  };
}

/**
 * Type for slug field
 */
export interface SlugField extends SchemaField {
  type: "slug";
  options: {
    source: string;
    maxLength: number;
  };
}

/**
 * Type for reference field (for use in arrays)
 */
export interface ReferenceField extends SchemaField {
  type: "reference";
  to: { type: string }[];
}

/**
 * Type for array field (now supports reference fields)
 */
export interface ArrayField extends SchemaField {
  type: "array";
  of: Array<({ type: string } & Partial<SchemaField>) | ReferenceField>;
  options?: {
    layout?: "tags" | "grid";
  };
}
