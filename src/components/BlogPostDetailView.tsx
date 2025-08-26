import FadeInSection from "@/components/FadeInSection";
import type { BlogPost } from "@/components/types/blog";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import PortableTextRenderer from "./PortableTextRenderer";

type Props = {
  post: BlogPost;
  morePosts: BlogPost[];
};

export default function BlogPostDetailView({ post, morePosts }: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch {
      return "Unknown date";
    }
  };

  const relatedPosts = useMemo(
    () => morePosts.filter((p) => p._id !== post._id).slice(0, 3),
    [morePosts, post?._id]
  );

  return (
    <div className="relative flex flex-col gap-8 pt-25 pb-12.5 w-full max-w-dvw min-h-screen overflow-hidden">
      <FadeInSection
        triggerOnMount
        className="relative flex flex-col gap-8 mx-auto px-10 w-full max-w-[1360px] text-sm leading-5 tracking-[0.6px]"
      >
        <div className="relative mx-auto w-full text-sm leading-5 tracking-[0.6px]">
          <Link
            href="/blog"
            className="text-white hover:text-white transition-colors duration-200"
          >
            BLOG
          </Link>{" "}
          / <span className="text-white uppercase">{post.title}</span>
        </div>
        <header>
          <h1 className="mb-6 font-bold text-white text-5xl leading-16 tracking-[0.6px]">
            {post.title}
          </h1>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {post.categories?.map((category) => (
                <span
                  key={category.name}
                  className="text-white text-sm uppercase leading-5 tracking-[0.6px]"
                >
                  <span className="text-white">#</span>
                  {category.name}
                </span>
              ))}
              {post.tags?.map((tag) => (
                <span
                  key={tag.name}
                  className="text-white text-sm uppercase leading-5 tracking-[0.6px]"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            {post.date && (
              <time
                dateTime={post.date}
                className="text-white text-sm uppercase leading-5 tracking-[0.6px]"
              >
                {formatDate(post.date)}
              </time>
            )}
          </div>
          <div className="bg-primary mt-6 w-full h-[1px]" />
        </header>

        {/* {post.featuredMedia && (
          <div className="mb-8">
            <Image
              src={post.featuredMedia.asset.url}
              alt={post.featuredMedia.alt || post.title}
              width={1200}
              height={800}
              className="rounded-lg w-full h-auto"
            />
          </div>
        )} */}

        {post.excerpt && (
          <div className="mb-8">
            <PortableTextRenderer
              value={post.excerpt}
              className="prose-invert"
            />
          </div>
        )}
        <div className="flex flex-row justify-center gap-12 bg-white -mx-[10000px] py-10">
          {post.content && (
            <PortableTextRenderer
              value={post.content}
              className="prose prose-lg grow wrap-anywhere"
            />
          )}
          <div className="flex flex-col gap-8 lg:w-[371px] lg:shrink-0">
            <p className="font-bold text-white text-2xl leading-7 tracking-[0.6px]">
              More articles:
            </p>
            {relatedPosts.map((v) => (
              <Link
                href={`/blog/${v.slug.current}`}
                className="group flex flex-col gap-[15px] p-6 border border-primary hover:border-white active:border-white transition-all duration-300 bg-accent-dark hover:bg-accent-pink active:bg-accent-pink cursor-pointer"
                key={v.slug.current}
              >
                {v.categories && v.categories.length > 0 && (
                  <div className="flex flex-wrap items-center gap-4">
                    {v.categories.map((c) => (
                      <p
                        className="text-white text-sm uppercase leading-5 tracking-[0.6px]"
                        key={c.name}
                      >
                        <span className="text-white">#</span>
                        {c.name}
                      </p>
                    ))}
                  </div>
                )}
                <p className="text-white text-xl leading-7 tracking-[0.6px]">
                  {v.title}
                </p>
                <time className="text-white text-sm uppercase leading-5 tracking-[0.6px]">
                  {v.date ? formatDate(v.date) : ""}
                </time>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Link
            href="/blog"
            className="flex items-center gap-1 pt-6 text-white hover:text-white text-lg uppercase leading-5 tracking-[0.6px] transition-colors duration-200"
          >
            <ChevronLeft width={30} height={30} />
            BACK TO ALL ARTICLES
          </Link>
        </div>
      </FadeInSection>
    </div>
  );
}
