'use client';

import { motion } from 'framer-motion';
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userName: string;
  role?: "CANDIDATE" | "EMPLOYER" | "ADMIN";
  onMenuClick?: () => void;
}



export default function Header({
  userName,
  role,
  onMenuClick,
}: HeaderProps) {
const navigate = useNavigate();
  const roleLabel =
  role === "EMPLOYER"
    ? "Employer"
    : role === "ADMIN"
    ? "Admin"
    : "Job Seeker";
  return (
    <header className="sticky top-0 z-40 h-20 w-full border-b border-white/5 bg-[#0C1225] backdrop-blur-xl shadow-sm">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="rounded-xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* BRAND LOGO - LARGE */}
          <div className="hidden h-20 w-35 border border-white/10 bg-[#0f172a] flex items-center justify-center lg:flex">
            <img
              src="/zecpath-logos.png"
              alt="Zecpath Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>
        </div>

        {/* RIGHT DESKTOP */}
        <div className="hidden md:flex items-center gap-4">

          {/* SEARCH */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-72 rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-500/40 focus:bg-white/10"
            />
          </div>

          {/* AI MATCH */}
          {/* <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white shadow-md"
          >
            <Sparkles size={16} />
            AI Match
          </motion.button> */}

          {/* BELL */}
         <motion.button
           onClick={() => navigate("/notifications")}
          className="relative rounded-2xl bg-white/5 p-3 text-slate-300 hover:bg-white/10"
           >
           <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            </motion.button>

          {/* USER */}
          <motion.button
            whileHover={{ y: -1 }}
            className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2 hover:bg-white/10"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />

            <div className="text-left">
              <p className="text-sm font-medium text-white">
                {userName}
              </p>
             <p className="text-xs text-slate-400">
                {roleLabel}
               </p>
            </div>

            <ChevronDown size={16} className="text-slate-400" />
          </motion.button>
        </div>

        {/* MOBILE */}
        <div className="flex items-center gap-2 md:hidden">
          <button className="relative rounded-xl bg-white/5 p-2 text-slate-300">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          </button>

          <div className="h-12 w-16 rounded-lg bg-[#0f172a] border border-white/10 flex items-center justify-center">
            <img
              src="/zecpath-logo.png"
              alt="Zecpath Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
