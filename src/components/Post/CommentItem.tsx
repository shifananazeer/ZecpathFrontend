import {
  Heart,
  Reply,
  Trash2,
} from "lucide-react";
import {
  addComment,
  deleteComment,
  reactToComment,
  removeCommentReaction,
} from "../../services/postService";
import { useState, useRef, useEffect } from "react";

const reactions = [
  { emoji: "👍", type: "like" },
  { emoji: "❤️", type: "love" },
  { emoji: "🎉", type: "celebrate" },
  { emoji: "🤝", type: "support" },
  { emoji: "💡", type: "insightful" },
  { emoji: "😂", type: "funny" },
];

export default function CommentItem({
  comment,
  postId,
  refreshComments,
}: any) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const [showReactions, setShowReactions] = useState(false);

  const [selectedReaction, setSelectedReaction] = useState<string | null>(
    comment.user_reaction || null
  );

  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>(
    comment.reactions_count || {}
  );

  const pickerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalReactions = Object.values(reactionCounts).reduce(
    (sum: number, count: number) => sum + Number(count),
    0
  );

  const handleReply = async () => {
    if (!replyText.trim()) return;

    await addComment(postId, replyText, comment.id);
    setReplyText("");
    setReplying(false);
    refreshComments();
  };

  const handleDelete = async () => {
    await deleteComment(postId, comment.id);
    refreshComments();
  };

  const handleReaction = async (reactionType: string) => {
     console.log("CLICKED REACTION:", reactionType);
  console.log("POST Id",postId);

    try {
      if (selectedReaction === reactionType) {
        await removeCommentReaction(postId, comment.id);
         refreshComments();
        setReactionCounts((prev) => ({
          ...prev,
          [reactionType]: Math.max(0, (prev[reactionType] || 0) - 1),
        }));

        setSelectedReaction(null);
        setShowReactions(false);
        return;
      }

      await reactToComment(postId, comment.id, reactionType);
       refreshComments();
      setReactionCounts((prev) => {
        const updated = { ...prev };

        if (selectedReaction) {
          updated[selectedReaction] = Math.max(
            0,
            (updated[selectedReaction] || 0) - 1
          );
        }

        updated[reactionType] = (updated[reactionType] || 0) + 1;

        return updated;
      });

      setSelectedReaction(reactionType);
      setShowReactions(false);
    } catch (error) {
      console.error("Comment reaction error:", error);
    }
  };

  // ✅ FIXED HOVER HANDLERS (IMPORTANT)
  const handleMouseEnter = () => {
    if (pickerTimeout.current) clearTimeout(pickerTimeout.current);

    pickerTimeout.current = setTimeout(() => {
      setShowReactions(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (pickerTimeout.current) clearTimeout(pickerTimeout.current);

    pickerTimeout.current = setTimeout(() => {
      setShowReactions(false);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (pickerTimeout.current) clearTimeout(pickerTimeout.current);
    };
  }, []);

  return (
    <div className="ml-4 mt-4">
      <div className="bg-[#16223B] p-4 rounded-xl">

        {/* header */}
        <div className="flex justify-between">
          <div>
            <h4 className="text-white font-medium">
              {comment.author_name}
            </h4>
            <p className="text-slate-300 text-sm mt-1">
              {comment.content}
            </p>
          </div>

          <button onClick={handleDelete} className="text-red-400">
            <Trash2 size={16} />
          </button>
        </div>

        {/* actions */}
        <div className="flex gap-5 mt-3 text-sm text-slate-400 items-center">
          {totalReactions > 0 && (
  <div className="flex items-center gap-1 mb-2 text-xs text-slate-400">
    <span className="flex -space-x-1">
      {Object.entries(reactionCounts)
        .filter(([_, count]) => Number(count) > 0)
        .slice(0, 5)
        .map(([type]) => {
          const emojiMap: Record<string, string> = {
            like: "👍",
            love: "❤️",
            celebrate: "🎉",
            support: "🤝",
            insightful: "💡",
            funny: "😂",
          };

          return (
            <span
              key={type}
              className="text-sm"
            >
              {emojiMap[type]}
            </span>
          );
        })}
    </span>

    <span className="ml-2">{totalReactions}</span>
  </div>
)}
          {/* REACT */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* popup */}
            {showReactions && (
              <div className="absolute bottom-full left-0 mb-2 bg-[#111A2E] border border-white/10 rounded-full px-3 py-2 flex gap-2 shadow-xl z-30">
                {reactions.map((r) => (
                  <button
                    key={r.type}
                    type="button"
                    onClick={() => handleReaction(r.type)}
                    className="text-2xl hover:scale-125 transition"
                  >
                    {r.emoji}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              className={`flex items-center gap-1 ${
                selectedReaction ? "text-blue-400" : ""
              }`}
            >
              <Heart size={14} />
              React
            </button>
          </div>

          {/* reply */}
          <button
            onClick={() => setReplying(!replying)}
            className="flex items-center gap-1 hover:text-blue-400"
          >
            <Reply size={14} />
            Reply
          </button>

          {/* count */}
          <span className="text-xs text-slate-500">
            {totalReactions} reactions
          </span>
        </div>

        {/* reply box */}
        {replying && (
          <div className="mt-3 flex gap-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-[#0F172A] rounded-lg px-3 py-2 text-white"
              placeholder="Write reply..."
            />
            <button
              onClick={handleReply}
              className="px-4 bg-blue-600 rounded-lg text-white"
            >
              Post
            </button>
          </div>
        )}

        {/* replies */}
        {comment.replies?.length > 0 && (
          <div className="mt-3 border-l border-white/10 pl-3">
            {comment.replies.map((reply: any) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={postId}
                refreshComments={refreshComments}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}