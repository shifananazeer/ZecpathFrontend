import api from "./api";
import type {Post ,CreatePostPayload} from "../types/post"

//get all post

export const getFeedPosts = async (): Promise<Post[]> => {
  const res = await api.get("/profiles/feed/");
  return res.data;
};

//get allcomments for a post 

export const getComments = async (postId: number) => {
  const res = await api.get( `/profiles/feed/${postId}/comments/`);
  return res.data;
};

//add comment to a post

export const addComment = async (
  postId: number,
  content: string,
  parent?: number
) => {
  const res = await api.post( `/profiles/feed/${postId}/comments/`,
    {
      content,
      parent,
    }
  );
  return res.data;
};

//delete comment

export const deleteComment = async (
  postId: number,
  commentId: number
) => {
 return api.delete(`/profiles/feed/${postId}/comments/${commentId}/` );
};

//add recation to comment

export const reactToComment = async (
  postId: number,
  commentId: number,
  reaction: string
) => {
  return api.post( `/profiles/feed/${postId}/comments/${commentId}/react/`,
    {
     reaction_type: reaction,
    }
  );
};

//Remove reaction from comment

export const removeCommentReaction =
  async (
    postId: number,
    commentId: number
  ) => {
    return api.delete(
      `profiles/feed/${postId}/comments/${commentId}/react/`
    );
  };

  //add reaction to a post

 export const reactToPost = async (
  postId: number,
  reactionType: string
) => {
  const response = await api.post(`/profiles/feed/${postId}/react/`,
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

//remove  reaction from post

export const removeReaction =
  async (postId: number) => {
    const response =
      await api.delete(
        `/profiles/feed/${postId}/react/`
      );

    return response.data;
  };

  //create own post 

  export const createPost = async ({ content, visibility, image,}: CreatePostPayload) => {
const formData = new FormData();
  formData.append("content", content);
  formData.append("visibility", visibility);
  if (image) {
    formData.append("image", image);
  }
  const response = await api.post("/profiles/feed/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

//get own post

export const getMyPosts = async () => {
    const response =await api.get(  "/profiles/feed/my-posts/");
    return response.data;
  };

  //delete own post

export const deletePost = async (id: number) => {
   const response = await api.delete( `/profiles/feed/${id}/`);
    return response.data;
  };