import { createClient, type SanityClient } from "@sanity/client";

/**
 * Sanity client configuration
 */
const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
};

/**
 * Sanity client instance for fetching data
 */
export const client: SanityClient = createClient(clientConfig);
