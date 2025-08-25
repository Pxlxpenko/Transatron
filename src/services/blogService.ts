import { sanityClient } from "@/lib/sanity";
import type { BlogPost, BlogPostListResponse } from "../components/types/blog";

// Type for category
export interface Category {
  _id: string;
  name: string;
  slug?: {
    current: string;
  };
}

// GROQ query to fetch all categories
const getAllCategoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug
  }
`;

// GROQ query to fetch a single post by slug
const getPostBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    date,
    modified,
    status,
    "content": content[]{
      ...,
      _type == "image" => {
        ...,
        "asset": {
          "_ref": asset._ref,
          "url": asset->url
        }
      },
      _type == "columns" => {
        ...,
        "columns": columns[]{
          ...,
          "content": content[]{
            ...,
            _type == "image" => {
              ...,
              "asset": {
                "_ref": asset._ref,
                "url": asset->url
              }
            }
          }
        }
      }
    },
    excerpt,
    "featuredMedia": {
      "asset": {
        "_ref": featuredMedia.asset._ref,
        "url": featuredMedia.asset->url
      },
      "alt": featuredMedia.alt
    },
    sticky,
    "author": {
      "name": author->name,
      "image": {
        "asset": {
          "_ref": author->image.asset._ref,
          "url": author->image.asset->url
        }
      }
    },
    "categories": categories[]-> {
      "name": name,
      "slug": slug.current
    },
    "tags": tags[]-> {
      "name": name
    }
  }
`;

export const blogService = {
  // Fetch a single post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const post = await sanityClient.fetch(getPostBySlugQuery, { slug });
      return post;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return null;
    }
  },

  // Fetch posts with pagination
  async getPostsWithPagination(
    page: number = 1,
    limit: number = 10
  ): Promise<BlogPostListResponse> {
    try {
      const start = (page - 1) * limit;
      const end = start + limit;

      const posts = await sanityClient.fetch(
        `
        {
          "posts": *[_type == "post"] | order(date desc) [$start...$end] {
            _id,
            _createdAt,
            _updatedAt,
            title,
            slug,
            date,
            modified,
            status,
            excerpt,
            "featuredMedia": {
              "asset": {
                "_ref": featuredMedia.asset._ref,
                "url": featuredMedia.asset->url
              },
              "alt": featuredMedia.alt
            },
            sticky,
            "author": {
              "name": author->name,
              "image": {
                "asset": {
                  "_ref": author->image.asset._ref,
                  "url": author->image.asset->url
                }
              }
            },
            "categories": categories[]-> {
              "name": name,
              "slug": slug.current
            },
            "tags": tags[]-> {
              "name": name
            }
          },
          "total": count(*[_type == "post"])
        }
      `,
        { start, end }
      );

      return posts;
    } catch (error) {
      console.error("Error fetching blog posts with pagination:", error);
      return { posts: [], total: 0 };
    }
  },

  // Fetch posts by category

  // Fetch all categories
  async getAllCategories(): Promise<Category[]> {
    try {
      const categories = await sanityClient.fetch(getAllCategoriesQuery);
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // Fetch posts by category ID
  async getPostsByCategoryId(
    categoryId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    posts: BlogPost[];
    total: number;
  }> {
    const start = (page - 1) * limit;
    const end = start + limit;
    try {
      const { posts, total } = await sanityClient.fetch(
        `
          {
            "posts": *[_type == "post" && ($categoryId == "" || $categoryId in categories[]->_id)] | order(date desc) [$start...$end] { 
              _id,
              _createdAt,
              _updatedAt,
              title,
              slug,
              date,
              modified,
              status,
              excerpt,
              "featuredMedia": {
                "asset": {
                  "_ref": featuredMedia.asset._ref,
                  "url": featuredMedia.asset->url
                },
                "alt": featuredMedia.alt
              },
              sticky,
              "author": {
                "name": author->name,
                "image": {
                  "asset": {
                    "_ref": author->image.asset._ref,
                    "url": author->image.asset->url
                  }
                }
              },
              "categories": categories[]-> {
                "name": name,
                "slug": slug.current
              },
              "tags": tags[]-> {
                "name": title
              }
            },
            "total": count(*[_type == "post" && ($categoryId == "" || $categoryId in categories[]->_id)])
          }
        `,
        { categoryId, start, end }
      );

      return { posts, total };
    } catch (error) {
      console.error("Error fetching posts by category ID:", error);
      return { posts: [], total: 0 };
    }
  },
};
