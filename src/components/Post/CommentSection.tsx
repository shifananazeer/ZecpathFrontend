import {
  useEffect,
  useState,
} from "react";
import {
  addComment,
  getComments,
} from "../../services/postService";
import CommentItem from "./CommentItem";

export default function CommentSection({
  postId,
}: {
  postId: number;
}) {
  const [comments, setComments] =
    useState([]);
  const [text, setText] =
    useState("");

  const fetchComments =
    async () => {
      const data =
        await getComments(
          postId
        );
      setComments(data);
    };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleAddComment =
    async () => {
      if (!text.trim()) return;

      await addComment(
        postId,
        text
      );

      setText("");
      fetchComments();
    };

  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      {/* add comment */}
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) =>
            setText(
              e.target
                .value
            )
          }
          className="flex-1 bg-[#0F172A] rounded-lg px-4 py-2 text-white"
          placeholder="Write comment..."
        />

        <button
          onClick={
            handleAddComment
          }
          className="px-4 bg-blue-600 text-white rounded-lg"
        >
          Post
        </button>
      </div>

      {/* comments */}
      <div className="space-y-4">
        {comments.map(
          (
            comment: any
          ) => (
            <CommentItem
              key={
                comment.id
              }
              comment={
                comment
              }
              postId={
                postId
              }
              refreshComments={
                fetchComments
              }
            />
          )
        )}
      </div>
    </div>
  );
}