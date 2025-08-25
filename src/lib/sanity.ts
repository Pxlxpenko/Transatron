import { createClient } from "@sanity/client";

// Use NEXT_PUBLIC_* so values are available in both server and browser bundles
// Direct references allow Next to inline them during build for the client
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const useCdn = (process.env.NEXT_PUBLIC_SANITY_USE_CDN || "false") === "true";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn,
});
