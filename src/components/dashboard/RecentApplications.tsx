import { motion } from "framer-motion";
import {
  Briefcase,
  MessageSquare,
  UserPlus,
  CheckCircle2,
  ChevronRight,
  Clock,
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "application",
    title: "Applied for Senior Frontend Developer",
    company: "Google",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "interview",
    title: "Interview scheduled for Product Designer",
    company: "Adobe",
    time: "Yesterday",
  },
  {
    id: 3,
    type: "connection",
    title: "New recruiter viewed your profile",
    company: "Microsoft",
    time: "2 days ago",
  },
  {
    id: 4,
    type: "offer",
    title: "Profile shortlisted for UI Engineer",
    company: "Meta",
    time: "3 days ago",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "application":
      return <Briefcase size={18} />;
    case "interview":
      return <MessageSquare size={18} />;
    case "connection":
      return <UserPlus size={18} />;
    case "offer":
      return <CheckCircle2 size={18} />;
    default:
      return <Clock size={18} />;
  }
};

export default function RecentActivityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -2 }}
      className="rounded-3xl border border-slate-800 bg-[#0f172a] p-6 shadow-xl"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Recent Activity
          </h2>
          <p className="text-sm text-slate-400">
            Your latest hiring & networking updates
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Activity List */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {activities.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            transition={{
              duration: 0.2,
            }}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-indigo-500/40"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              {getIcon(item.type)}
            </div>

            <h3 className="text-sm font-medium leading-6 text-white">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {item.company}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Clock size={13} />
              {item.time}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}