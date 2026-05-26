export interface Comment {
  id: number;
  author: number;
  author_name: string;
  content: string;
  parent: number | null;
  created_at: string;
  reactions_count: Record<string, number>;
  user_reaction: string | null;
  replies?: Comment[];
}

export interface Post {
  id: number;
  author: number;
  author_name: string;
  content: string;
  image: string | null;
  visibility: string;
  reactions_count: Record<string, number>;
  user_reaction: string | null;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreatePostPayload {
  content: string;
  visibility: "public" | "private" | "connections";
  image?: File | null;
}