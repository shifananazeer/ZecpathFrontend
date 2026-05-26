import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import {
  getMyPosts,
  deletePost,
} from "../../services/postService";

interface Post {
  id: number;
  content: string;
  image?: string;
  visibility: string;
  created_at: string;
}

const MyPostsList = () => {
  const [posts, setPosts] =
    useState<Post[]>([]);
  const [loading, setLoading] =
    useState(true);

  const fetchPosts = async () => {
    try {
      const data =
        await getMyPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete =
    async (id: number) => {
      const confirmDelete =
        window.confirm(
          "Delete this post?"
        );

      if (!confirmDelete) return;

      try {
        await deletePost(id);

        setPosts((prev) =>
          prev.filter(
            (post) =>
              post.id !== id
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

  const handleEdit = (
    post: Post
  ) => {
    console.log(
      "Edit post",
      post
    );

    // open modal / navigate edit page later
  };

  if (loading)
    return (
      <p className="text-white">
        Loading...
      </p>
    );

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={handleEdit}
          onDelete={
            handleDelete
          }
        />
      ))}
    </div>
  );
};

export default MyPostsList;