import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getFeedPosts } from "../../services/postService";
import PostCard from "./PostCard";
import SuggestedConnections from "../../components/dashboard/SuggestedConnections";
import RecommendedJobsCard from "../../components/dashboard/RecommendedJobsCard";
import type { Post } from "../../types/post";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function PostFeed() {
  const [posts, setPosts] =
    useState<Post[]>([]);
  const [loading, setLoading] =
    useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data =
        await getFeedPosts();
      setPosts(data);
    } catch (error) {
      console.log(
        "Failed to fetch posts",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* Loading */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
          }}
          className="text-slate-400"
        >
          Loading posts...
        </motion.div>
      </div>
    );
  }

  /* Empty */
  if (!posts.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/50 to-slate-950 p-12 text-center backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-emerald-500/10" />
        <div className="relative">
          <p className="text-slate-400">
            No posts found. Be the first to share something!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {posts.map((post, idx) => (
        <motion.div
          key={post.id}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.45,
            delay: idx * 0.08,
          }}
          className="space-y-5"
        >
          {/* Post */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <PostCard post={post} />
          </motion.div>

          {/* After 2nd post */}
          {idx === 1 && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <SuggestedConnections />
            </motion.div>
          )}

          {/* After 5th post */}
          {idx === 4 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <RecommendedJobsCard />
            </motion.div>
          )}

          {/* After 8th post */}
          {idx === 7 && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <SuggestedConnections />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}