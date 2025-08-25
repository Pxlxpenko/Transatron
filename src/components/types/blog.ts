export interface BlogPost {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
  };
  date?: string;
  modified?: string;
  status?: string;
  content?: unknown; // Portable Text content
  excerpt?: unknown; // Portable Text excerpt
  featuredMedia?: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  sticky?: boolean;
  author?: {
    name: string;
    image?: {
      asset: {
        _ref: string;
        url: string;
      };
    };
  };
  categories?: {
    name: string;
  }[];
  tags?: {
    name: string;
  }[];
}

export interface BlogPostListResponse {
  posts: BlogPost[];
  total: number;
}
