import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure"; // Updated from deskTool
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemaTypes";
import { codeInput } from "@sanity/code-input";

/**
 * Sanity configuration
 * Defines the project settings and plugins
 */
export default defineConfig({
  basePath: "/studio",
  projectId: "3zx1ytic",
  dataset: "production",
  plugins: [
    structureTool(), // Updated from deskTool()
    visionTool(),
    codeInput(),
  ],
  schema,
});
