import { motion } from "framer-motion";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardGreeting from "../../components/dashboard/DashboardGreeting";
import { useAuth } from "../../context/AuthContext";

import RecentApplications from "../../components/dashboard/RecentApplications";
import PostFeed from "../../components/Post/PostFeed";
import UpcomingInterviewsCard from "../../components/dashboard/UpcomingInterviewsCard";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const CandidateDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout
      active="Dashboard"
      topContent={
        <DashboardGreeting userName={user?.first_name || user?.email ||"user"} />
      }
    >
      {/* OUTER WRAPPER → ONE PAGE SCROLL */}
      <div className="relative mx-auto min-h-screen max-w-7xl overflow-y-auto px-4 pt-6 pb-10">
        {/* Background Glow */}
        <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute right-20 top-80 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />

        {/* TOP HERO SECTION */}
        <div className="relative z-10 space-y-6">
          <UpcomingInterviewsCard />
          <RecentApplications />
        </div>

        {/* MAIN GRID */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12"
        >
          {/* LEFT SIDEBAR */}
          <motion.div
            variants={fadeUp}
            className="space-y-6 pr-2 xl:col-span-4"
          >
            {/* Profile Strength */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-slate-800 bg-[#0f172a] p-6 shadow-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Profile Strength
                  </h3>
                  <p className="text-sm text-slate-400">
                    Improve visibility to recruiters
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-xl font-bold text-indigo-400">
                  75%
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Completion</span>
                  <span>75 / 100</span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{
                      duration: 1.2,
                      ease: "easeOut",
                    }}
                    className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-6 space-y-3">
                {[
                  { label: "Resume uploaded", done: true },
                  { label: "Add skills section", done: false },
                  { label: "Complete portfolio", done: false },
                  { label: "Verify experience", done: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3"
                  >
                    <span className="text-sm text-white">
                      {item.label}
                    </span>

                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.done
                          ? "bg-emerald-400"
                          : "bg-slate-600"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Complete Profile
              </motion.button>
            </motion.div>
          </motion.div>

          {/* CENTER FEED */}
          <motion.div
            variants={fadeUp}
            className="pl-2 xl:col-span-8"
          >
            <div className="space-y-6">
              {/* Feed Header */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="pb-2"
              >
                <h2 className="text-2xl font-bold text-white">
                  Discover & Connect
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Explore jobs, posts, people and career updates
                </p>
              </motion.div>

              {/* Post Feed */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] shadow-md"
              >
                <PostFeed />
              </motion.div>

              {/* People You May Know */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-slate-800 bg-[#0f172a] p-5 shadow-md"
              >
                <h3 className="mb-4 text-lg font-semibold text-white">
                  People You May Know
                </h3>

                <div className="space-y-4">
                  {[1, 2, 3].map((person) => (
                    <motion.div
                      key={person}
                      whileHover={{
                        y: -3,
                        scale: 1.015,
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between rounded-xl border border-transparent bg-slate-900 p-3 transition hover:border-indigo-500/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-slate-700" />

                        <div>
                          <p className="font-medium text-white">
                            Sarah Johnson
                          </p>
                          <p className="text-xs text-slate-400">
                            Frontend Developer • 12 mutuals
                          </p>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        whileHover={{ scale: 1.04 }}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-500"
                      >
                        Connect
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};