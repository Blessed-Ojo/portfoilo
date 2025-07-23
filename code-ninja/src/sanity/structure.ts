import type { StructureBuilder } from "sanity/desk"

/**
 * Customizes the structure of the Sanity Studio sidebar
 * @see https://www.sanity.io/docs/structure-builder-cheat-sheet
 */
export const structure = (S: StructureBuilder) => S.list().title("Content").items(S.documentTypeListItems())

