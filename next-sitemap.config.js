// @ts-check
import { createClient } from "@sanity/client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agger-labs.com";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

/**
 * @typedef {import('next-sitemap').IConfig} NextSitemapConfig
 */

/** @type {NextSitemapConfig} */
const config = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/api/*"],
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  transform: async (config, path) => {
    return {
      loc: `${siteUrl}${path}`,
      changefreq: config.changefreq,
      priority: path === "/" ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
  additionalPaths: async (config) => {
    try {
      const posts = await sanity.fetch(
        `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
      );
      return posts.map((p) => ({
        loc: `/blog/${p.slug}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: p._updatedAt || new Date().toISOString(),
      }));
    } catch (e) {
      console.error("next-sitemap: failed to fetch Sanity slugs", e);
      return [];
    }
  },
};

export default config;


