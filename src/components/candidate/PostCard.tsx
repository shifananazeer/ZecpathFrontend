import { Pencil, Trash2 } from "lucide-react";

interface Post {
  id: number;
  content: string;
  image?: string;
  visibility: string;
  created_at: string;
}

interface Props {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const PostCard = ({
  post,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0f172a] p-5 shadow-md">
      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="mb-4 h-64 w-full rounded-xl object-cover"
        />
      )}

      {/* Content */}
      <p className="text-white text-sm leading-6">
        {post.content}
      </p>

      {/* Meta */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span className="capitalize">
          {post.visibility}
        </span>

        <span>
          {new Date(
            post.created_at
          ).toLocaleDateString()}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={() =>
            onEdit(post)
          }
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() =>
            onDelete(post.id)
          }
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;