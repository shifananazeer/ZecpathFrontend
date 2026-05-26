import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    mutuals: 12,
  },
  {
    id: 2,
    name: "David Lee",
    role: "UI/UX Designer",
    mutuals: 8,
  },
  {
    id: 3,
    name: "Priya Menon",
    role: "Backend Engineer",
    mutuals: 15,
  },
];

export default function SuggestedConnections() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-800 bg-[#0f172a] p-5 shadow-md"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-white text-lg font-semibold">
          People You May Know
        </h3>

        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition">
          See all
        </button>
      </div>

      <div className="space-y-3">
        {users.map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="flex items-center justify-between rounded-xl bg-slate-900 p-3 border border-slate-800 hover:border-indigo-500/30 transition-all"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <motion.div
                whileHover={{ rotate: 6 }}
                className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500/25 to-cyan-500/20 flex items-center justify-center text-white font-semibold"
              >
                {user.name.charAt(0)}
              </motion.div>

              {/* User Info */}
              <div>
                <p className="text-white text-sm font-medium">
                  {user.name}
                </p>
                <p className="text-xs text-slate-400">
                  {user.role}
                </p>
                <p className="text-xs text-slate-500">
                  {user.mutuals} mutual connections
                </p>
              </div>
            </div>

            {/* Connect */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm text-white transition"
            >
              <UserPlus className="w-4 h-4" />
              Connect
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}