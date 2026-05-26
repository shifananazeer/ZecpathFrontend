import {
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Post } from "../../types/post";
import CommentSection from "./CommentSection";
import { reactToPost, removeReaction } from "../../services/postService";

interface Props {
  post: Post;
}

type ReactionCounts = {
  like?: number;
  love?: number;
  celebrate?: number;
  support?: number;
  insightful?: number;
  funny?: number;
};

const reactions = [
  { key: "like", emoji: "👍", label: "Like" },
  { key: "love", emoji: "❤️", label: "Love" },
  { key: "celebrate", emoji: "🎉", label: "Celebrate" },
  { key: "support", emoji: "🤝", label: "Support" },
  { key: "insightful", emoji: "💡", label: "Insightful" },
  { key: "funny", emoji: "😂", label: "Funny" },
];

export default function PostCard({ post }: Props) {
  const [showReactions, setShowReactions] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [selectedReaction, setSelectedReaction] = useState<string | null>(
    post.user_reaction || null
  );

  const [reactionCounts, setReactionCounts] = useState<ReactionCounts>(
    post.reactions_count || {}
  );

  const pickerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSelectedReaction(post.user_reaction || null);
    setReactionCounts(post.reactions_count || {});
  }, [post]);

  const totalReactions = Object.values(reactionCounts).reduce(
    (sum, count) => sum + Number(count || 0),
    0
  );

  const emojiMap: Record<string, string> = {
    like: "👍",
    love: "❤️",
    celebrate: "🎉",
    support: "🤝",
    insightful: "💡",
    funny: "😂",
  };

  const handleReaction = async (type: string) => {
    try {
      const isSame = selectedReaction === type;

      if (isSame) {
        await removeReaction(post.id);
        setSelectedReaction(null);
        setShowReactions(false);
        return;
      }

      await reactToPost(post.id, type);

      setReactionCounts((prev) => {
        const updated = { ...prev };

        if (selectedReaction) {
          updated[selectedReaction as keyof ReactionCounts] = Math.max(
            0,
            (updated[selectedReaction as keyof ReactionCounts] || 0) - 1
          );
        }

        updated[type as keyof ReactionCounts] =
          (updated[type as keyof ReactionCounts] || 0) + 1;

        return updated;
      });

      setSelectedReaction(type);
      setShowReactions(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
          {post.author_name?.[0] || "U"}
        </div>

        <div className="flex-1">
          <h3 className="text-white font-semibold text-sm">
            {post.author_name || `User #${post.author}`}
          </h3>
          <p className="text-slate-500 text-xs">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <p className="text-slate-300 text-sm mb-4 leading-relaxed">
        {post.content}
      </p>

      {/* IMAGE */}
      {post.image && (
        <img
          src={post.image}
          className="w-full rounded-xl max-h-[380px] object-cover mb-4 border border-slate-800"
        />
      )}

      {/* REACTION PREVIEW */}
      {totalReactions > 0 && (
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {Object.entries(reactionCounts)
                .filter(([_, v]) => Number(v) > 0)
                .map(([type]) => (
                  <span
                    key={type}
                    className="w-6 h-6 flex items-center justify-center bg-slate-800 rounded-full text-sm"
                  >
                    {emojiMap[type]}
                  </span>
                ))}
            </div>

            <span className="ml-2 font-medium">
              {totalReactions} reactions
            </span>
          </div>

          <span>{post.comments_count} comments</span>
        </div>
      )}

      {/* ACTIONS */}
      <div className="grid grid-cols-3 mt-2 border-t border-slate-800 pt-3">

        {/* REACT */}
        <div
          className="relative flex justify-center"
          onMouseEnter={() => {
            if (pickerTimeout.current) clearTimeout(pickerTimeout.current);
            pickerTimeout.current = setTimeout(() => setShowReactions(true), 150);
          }}
          onMouseLeave={() => {
            if (pickerTimeout.current) clearTimeout(pickerTimeout.current);
            pickerTimeout.current = setTimeout(() => setShowReactions(false), 200);
          }}
        >
          {showReactions && (
            <div className="absolute bottom-full mb-3 bg-[#111827] border border-slate-700 rounded-full px-3 py-2 flex gap-2 shadow-xl">
              {reactions.map((r) => (
                <button
                  key={r.key}
                  onClick={() => handleReaction(r.key)}
                  className="text-2xl hover:scale-125 transition-transform"
                >
                  {r.emoji}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowReactions((p) => !p)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
              selectedReaction
                ? "text-blue-400 bg-blue-500/10"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            {selectedReaction ? (
              <>
                <span>{emojiMap[selectedReaction]}</span>
                {selectedReaction}
              </>
            ) : (
              <>
                <Heart size={16} />
                Like
              </>
            )}
          </button>
        </div>

        {/* COMMENT */}
        <button
          onClick={() => setShowComments((p) => !p)}
          className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg py-2 transition"
        >
          <MessageCircle size={16} />
          Comment
        </button>

        {/* SHARE */}
        <button className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg py-2 transition">
          <Share2 size={16} />
          Share
        </button>
      </div>

      {/* COMMENTS */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <CommentSection postId={post.id} />
        </div>
      )}
    </div>
  );
}