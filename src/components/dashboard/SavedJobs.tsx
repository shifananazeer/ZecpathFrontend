import React from "react";
import {
  Bookmark,
  MapPin,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import EmptyState from "./EmptyState";

interface Job {
  id?: number | string;
  title?: string;
  company?: string;
  location?: string;
  salary?: string;
  level?: "Junior" | "Mid" | "Senior";
}

interface SavedJobsProps {
  data: Job[];
}

const levelStyles = {
  Junior: "bg-blue-500/20 text-blue-300",
  Mid: "bg-amber-500/20 text-amber-300",
  Senior: "bg-green-500/20 text-green-300",
};

const SavedJobs: React.FC<SavedJobsProps> = ({ data }) => {
  return (
    <div className="rounded-2xl bg-[#0f172a] border border-slate-800 p-5 shadow-md">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-indigo-400" />
          <h2 className="text-white text-lg font-semibold">
            Saved Jobs
          </h2>
        </div>

        <p className="text-slate-400 text-sm mt-1">
          {data.length} saved {data.length === 1 ? "job" : "jobs"}
        </p>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <EmptyState text="No saved jobs yet" />
      ) : (
        <div className="space-y-3">
          {data.map((job, i) => (
            <div
              key={job.id ?? i}
              className="rounded-xl border border-slate-800 bg-[#111827] p-4 hover:bg-[#1a2336] hover:border-indigo-500/40 transition-all duration-200"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm sm:text-base">
                    {job.title ?? "Job Title"}
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    {job.company ?? "Unknown Company"}
                  </p>
                </div>

                <button className="text-slate-400 hover:text-indigo-400 transition">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Middle */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {job.level && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      levelStyles[job.level]
                    }`}
                  >
                    {job.level}
                  </span>
                )}

                {job.location && (
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                )}
              </div>

              {/* Salary */}
              {job.salary && (
                <div className="mt-3 flex items-center gap-1 text-sm text-emerald-400 font-medium">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {data.length > 0 && (
        <button className="w-full mt-4 rounded-xl border border-slate-700 py-3 text-sm font-medium text-slate-300 hover:border-indigo-500 hover:text-indigo-400 transition">
          View All Saved Jobs
        </button>
      )}
    </div>
  );
};

export default SavedJobs;