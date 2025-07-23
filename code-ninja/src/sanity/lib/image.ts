import createImageUrlBuilder from "@sanity/image-url"
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { dataset, projectId } from "../env"

/**
 * Creates a Sanity image URL builder
 * @see https://www.sanity.io/docs/image-url
 */
const builder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
})

/**
 * Helper function to generate image URLs from Sanity image references
 * @param source - The Sanity image source object
 * @returns An image URL builder for the provided source
 */
export const urlFor = (source: SanityImageSource): ImageUrlBuilder => {
  return builder.image(source)
}

