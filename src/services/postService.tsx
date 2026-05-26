import api from "./api";
import type {Post} from "../types/post"


export const getFeedPosts = async (): Promise<Post[]> => {
  const res = await api.get("/profiles/feed/");
  return res.data;
};

export const getComments = async (
  postId: number
) => {
  const res = await api.get(
    `/profiles/feed/${postId}/comments/`
  );
  return res.data;
};

export const addComment = async (
  postId: number,
  content: string,
  parent?: number
) => {
  const res = await api.post(
    `/profiles/feed/${postId}/comments/`,
    {
      content,
      parent,
    }
  );
  return res.data;
};

export const deleteComment = async (
  postId: number,
  commentId: number
) => {
  return api.delete(
    `/profiles/feed/${postId}/comments/${commentId}/`
  );
};

export const reactToComment = async (
  postId: number,
  commentId: number,
  reaction: string
) => {
  return api.post(
    `/profiles/feed/${postId}/comments/${commentId}/react/`,
    {
     reaction_type: reaction,
    }
  );
};

export const removeCommentReaction =
  async (
    postId: number,
    commentId: number
  ) => {
    return api.delete(
      `profiles/feed/${postId}/comments/${commentId}/react/`
    );
  };

 export const reactToPost = async (
  postId: number,
  reactionType: string
) => {
  const response = await api.post(
    `/profiles/feed/${postId}/react/`,
    {
      reaction_type: reactionType,
    },
    {
      headers: {
        "Content-Type":
          "application/json",
      },
    }
  );

  return response.data;
};

export const removeReaction =
  async (postId: number) => {
    const response =
      await api.delete(
        `/profiles/feed/${postId}/react/`
      );

    return response.data;
  };