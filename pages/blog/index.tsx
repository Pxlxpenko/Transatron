import { useState, useMemo, useEffect, type ReactNode } from "react";
import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBlogPostsByCategoryId, useCategories } from "@/hooks/hooks";
import Image from "next/image";
import SeoHead from "@/components/SeoHead";

function useBlogPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const { categories } = useCategories();
  const postsPerPage = 7;
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { posts, total, loading, error } = useBlogPostsByCategoryId(
    selectedCategory,
    currentPage,
    postsPerPage
  );
  const totalPages = useMemo(() => Math.ceil(total / postsPerPage), [total]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const items: ReactNode[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      let startPage: number, endPage: number;
      if (currentPage === 1) {
        startPage = 2;
        endPage = Math.min(3, totalPages - 1);
      } else if (currentPage === totalPages) {
        startPage = Math.max(2, totalPages - 2);
        endPage = totalPages - 1;
      } else {
        startPage = Math.max(2, currentPage - 1);
        endPage = Math.min(totalPages - 1, currentPage + 1);
      }

      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationLink
              onClick={() =>
                handlePageChange(
                  currentPage === 1 ? 4 : Math.max(2, startPage - 1)
                )
              }
              className="cursor-pointer"
            >
              <PaginationEllipsis />
            </PaginationLink>
          </PaginationItem>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i <= totalPages - 1 && i >= 2) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
                className="cursor-pointer"
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationLink
              onClick={() =>
                handlePageChange(
                  currentPage === totalPages
                    ? totalPages - 3
                    : Math.min(totalPages - 1, endPage + 1)
                )
              }
              className="cursor-pointer"
            >
              <PaginationEllipsis />
            </PaginationLink>
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <Pagination className="mt-8">
        <PaginationContent>{items}</PaginationContent>
      </Pagination>
    );
  };

  return {
    categories,
    posts,
    handleCategoryClick,
    loading,
    error,
    selectedCategory,
    totalPages,
    renderPagination,
  };
}

function BlogIndexInner() {
  const {
    posts,
    categories,
    handleCategoryClick,
    loading,
    error,
    selectedCategory,
    renderPagination,
  } = useBlogPagination();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-[#060B08F2] min-h-screen">
        <div className="text-white text-center">
          <div className="mx-auto mb-4 border-primary border-b-2 rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-lg">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-[#060B08F2] min-h-screen">
        <div className="text-white text-center">
          Something went wrong. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-37 pb-18.5 w-full min-h-screen">
      <div className="top-0 left-0 absolute w-full h-[700px] hero-bg" />
      <div className="top-[700px] bottom-0 absolute bg-[#060B08]/95 w-full" />
      <FadeInSection
        triggerOnMount
        className="relative flex flex-col gap-6 mx-auto px-10 w-full max-w-[1360px] text-sm leading-5 tracking-[1.6px]"
      >
        <div className="flex flex-col gap-10 text-center">
          <h1 className="mb-4 font-bold text-[54px] text-white leading-16 tracking-[1.6px]">
            Our Blog
          </h1>
          <div className="flex flex-row flex-wrap gap-4">
            <Button
              className={cn(
                "text-white text-lg px-6! h-12!",
                selectedCategory === "" && "text-primary"
              )}
              variant={"tertiary"}
              onClick={() => handleCategoryClick("")}
            >
              #All
            </Button>
            {categories.map((category) => (
              <Button
                key={category._id}
                variant={"tertiary"}
                className={cn(
                  "text-white text-lg font-medium px-6! h-12!",
                  selectedCategory === category._id && "text-primary"
                )}
                onClick={() => handleCategoryClick(category._id)}
              >
                #{category.name}
              </Button>
            ))}
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-white text-center">
            <h2 className="mb-4 font-semibold text-2xl">No posts found</h2>
            <p className="text-gray-400">Check back soon for new content!</p>
          </div>
        ) : (
          <>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max mb-8">
              {posts.map((post, index) => {
                const isWide = index === 0 || index === 6;
                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className={`${
                      isWide ? "lg:col-span-2" : ""
                    } group cursor-pointer bg-[#131313] active:border-white active:bg-[#1D1D1F] transition-all duration-300 hover:border-white hover:bg-[#1D1D1F] border-primary border p-6 flex flex-col gap-[15px]`}
                  >
                    {post.featuredMedia?.asset?.url && (
                      <Image
                        src={post.featuredMedia.asset.url}
                        alt={post.featuredMedia.alt || post.title}
                        width={1200}
                        height={192}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap items-center gap-4">
                        {post.categories.map((v) => (
                          <p
                            className="text-white text-sm uppercase leading-5 tracking-[1.6px]"
                            key={v.name}
                          >
                            <span className="text-primary">#</span>
                            {v.name}
                          </p>
                        ))}
                      </div>
                    )}
                    <h3 className="font-bold text-white group-hover:text-primary text-2xl line-clamp-2 leading-7 tracking-[1.6px]">
                      {post.title}
                    </h3>
                    {post.date && (
                      <p className="text-primary text-sm leading-5 tracking-[1.6px]">
                        {new Date(post.date)
                          .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          .toUpperCase()}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
            {renderPagination()}
          </>
        )}
      </FadeInSection>
    </div>
  );
}

export default function BlogIndexPage() {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <SeoHead title="Blog" path="/blog" />
      <BlogIndexInner />
    </QueryClientProvider>
  );
}
