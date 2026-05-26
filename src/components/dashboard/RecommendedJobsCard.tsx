import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  ArrowRight,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    location: "Remote",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "UI Engineer",
    company: "Netflix",
    location: "Bangalore",
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "React Developer",
    company: "Adobe",
    location: "Hybrid",
    posted: "3 days ago",
  },
];

export default function RecommendedJobsCard() {
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
          Recommended Jobs
        </h3>

        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition">
          Browse
        </button>
      </div>

      <div className="space-y-3">
        {jobs.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{
              x: 4,
              scale: 1.01,
            }}
            className="rounded-xl bg-slate-900 p-4 border border-slate-800 hover:border-indigo-500/30 transition-all"
          >
            <div className="flex items-start gap-3">
              {/* Job Icon */}
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-indigo-400" />
              </div>

              {/* Job Info */}
              <div className="flex-1">
                <h4 className="text-white font-medium">
                  {job.title}
                </h4>

                <p className="text-sm text-slate-400 mt-1">
                  {job.company}
                </p>

                <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                  <span>{job.posted}</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 py-2 text-sm text-white transition"
            >
              View Job
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}