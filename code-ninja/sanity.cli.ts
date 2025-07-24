/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 */
import { defineCliConfig, type CliConfig } from "sanity/cli"

const projectId: string | undefined = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset: string | undefined = process.env.NEXT_PUBLIC_SANITY_DATASET

/**
 * CLI configuration for Sanity
 */
export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
} as CliConfig)

