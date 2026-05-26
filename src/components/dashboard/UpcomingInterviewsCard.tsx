import {
  Calendar,
  Clock,
  Video,
  Building2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const upcomingInterview = {
  id: 1,
  company: "Microsoft",
  role: "Senior Frontend Engineer",
  date: "Tomorrow, Jun 4",
  time: "10:30 AM",
  duration: "45 mins",
  mode: "Google Meet",
  interviewer: "David Wilson",
};

export default function UpcomingInterviewsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-6 shadow-xl"
    >
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
        {/* LEFT CONTENT */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Calendar
              size={18}
              className="text-emerald-400"
            />
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
              Upcoming Interview
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white">
            {upcomingInterview.role}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-slate-300">
            <Building2 size={16} />
            <span>{upcomingInterview.company}</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-xs text-slate-400">
                Date
              </p>
              <p className="mt-1 font-medium text-white">
                {upcomingInterview.date}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-xs text-slate-400">
                Time
              </p>
              <div className="mt-1 flex items-center gap-2 text-white">
                <Clock size={14} />
                {upcomingInterview.time}
              </div>
            </div>

            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-xs text-slate-400">
                Duration
              </p>
              <p className="mt-1 font-medium text-white">
                {upcomingInterview.duration}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-xs text-slate-400">
                Mode
              </p>
              <div className="mt-1 flex items-center gap-2 text-white">
                <Video size={14} />
                {upcomingInterview.mode}
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Interviewer:{" "}
            <span className="font-medium text-white">
              {upcomingInterview.interviewer}
            </span>
          </p>
        </div>

        {/* RIGHT ACTION */}
        <div className="flex flex-col items-center gap-4">
          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-emerald-400"
          >
            <Video size={18} />
            Join Interview
            <ArrowRight size={16} />
          </motion.button>

          <p className="text-xs text-slate-500">
            Starts in 14 hours
          </p>
        </div>
      </div>
    </motion.div>
  );
}