// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { blogService } from "../services/blogService";

// Query keys for better cache management
// export const blogKeys = {
//   all: ["blog"] as const,
//   lists: () => [...blogKeys.all, "list"] as const,
//   list: (filters: string) => [...blogKeys.lists(), { filters }] as const,
//   details: () => [...blogKeys.all, "detail"] as const,
//   detail: (slug: string) => [...blogKeys.details(), slug] as const,
//   categories: () => [...blogKeys.all, "categories"] as const,
//   category: (category: string) => [...blogKeys.categories(), category] as const,
//   categorySlug: (categorySlug: string, page: number, limit: number) =>
//     [...blogKeys.categories(), "slug", categorySlug, { page, limit }] as const,
//   paginated: (page: number, limit: number) =>
//     [...blogKeys.lists(), "paginated", { page, limit }] as const,
// };

// export const useBlogPostsByCategoryId = (
//   categoryId: string,
//   page: number = 1,
//   limit: number = 10
// ) => {
//   const query = useQuery({
//     queryKey: blogKeys.categorySlug(categoryId, page, limit),
//     queryFn: () => {
//       if (!categoryId) {
//         return blogService.getPostsWithPagination(page, limit);
//       }
//       return blogService.getPostsByCategoryId(categoryId, page, limit);
//     },
//     placeholderData: keepPreviousData,
//   });

//   return {
//     posts: query.data?.posts || [],
//     total: query.data?.total || 0,
//     loading: query.isLoading,
//     error: query.error?.message || null,
//   };
// };

// export const useCategories = () => {
//   const query = useQuery({
//     queryKey: blogKeys.categories(),
//     queryFn: blogService.getAllCategories,
//     placeholderData: keepPreviousData,
//   });

//   return {
//     categories: query.data || [],
//     loading: query.isLoading,
//     error: query.error?.message || null,
//   };
// };
