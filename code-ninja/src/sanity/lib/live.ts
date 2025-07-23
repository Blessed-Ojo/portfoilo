/**
 * Querying with "sanityFetch" will keep content automatically updated
 * Before using it, import and render "<SanityLive />" in your layout
 * @see https://github.com/sanity-io/next-sanity#live-content-api for more information.
 */
import { defineLive } from "next-sanity"
import type { SanityClient } from "@sanity/client"
import { client } from "./client"

/**
 * Type for the options passed to defineLive
 * Based on the next-sanity package's implementation
 */
interface LiveOptions {
  client: SanityClient
}

/**
 * Configure and export the Sanity Live components and utilities
 */
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Live content is currently only available on the experimental API
    // https://www.sanity.io/docs/api-versioning
    apiVersion: "vX",
  }),
} as LiveOptions)

