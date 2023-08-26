import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { codeInput } from "@sanity/code-input";
import { latexInput } from "sanity-plugin-latex-input";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { contentGraphView } from "sanity-plugin-graph-view";
import { table } from '@sanity/table';

import { schemaTypes } from "./sanity/schemas";
import { visionTool } from "@sanity/vision";

const config = defineConfig({
  basePath: "/admin", // <-- important that `basePath` matches the route you're mounting your studio from, it applies to both `/pages` and `/app`

  projectId: "1ahjdaoy",
  dataset: "production",

  title: "AltCamp Sanity Studio",

  plugins: [deskTool(), visionTool(), 
    contentGraphView({}),
    codeInput(),
    latexInput(),
    unsplashImageAsset(),
    table()],

  schema: {
    types: schemaTypes,
  },
});

export default config;
