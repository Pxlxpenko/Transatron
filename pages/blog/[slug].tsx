/* eslint-disable react-refresh/only-export-components */
import type { GetStaticPaths, GetStaticProps } from "next";
import { blogService } from "@/services/blogService";
import type { BlogPost } from "@/components/types/blog";
import SeoHead from "@/components/SeoHead";
import JsonLd from "@/components/JsonLd";
import BlogPostDetailView from "@/components/BlogPostDetailView";

type Props = { post: BlogPost | null; morePosts: BlogPost[] };

export default function BlogPostPage({ post, morePosts }: Props) {
  if (!post) return null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agger-labs.com";
  const url = `${siteUrl}/blog/${post.slug.current}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: typeof post.excerpt === "string" ? post.excerpt : undefined,
    image: post.featuredMedia?.asset?.url,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    datePublished: post.date ?? post._createdAt,
    dateModified: post._updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  } as const;
  return (
    <>
      <SeoHead
        title={post.title}
        description={
          typeof post.excerpt === "string" ? post.excerpt : undefined
        }
        path={`/blog/${post.slug.current}`}
        imageUrl={post.featuredMedia?.asset?.url}
      />
      <JsonLd schema={jsonLd} />
      <BlogPostDetailView post={post} morePosts={morePosts} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-render a small set; fallback for others
  const { posts } = await blogService.getPostsWithPagination(1, 10);
  const paths = posts.map((p) => ({ params: { slug: p.slug.current } }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const post = await blogService.getPostBySlug(slug);
  if (!post) {
    return { notFound: true, revalidate: 60 };
  }
  const { posts } = await blogService.getPostsWithPagination(1, 4);
  return {
    props: { post, morePosts: posts },
    revalidate: 60, // ISR
  };
};
