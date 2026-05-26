'use client';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { sidebarConfig } from '../../utils/sidebarConfig';

type UserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN";

interface SidebarProps {
  active?: string;
  role: UserRole;
}

export default function Sidebar({
  active = 'Dashboard',
  role,
}: SidebarProps) {
  const router = useNavigate();

  const navItems =
    sidebarConfig[role] || [];

  const handleLogout = async () => {
    try {
      await fetch(
        'https://api.zecpath.com/api/auth/logout/',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              'accessToken'
            )}`,
          },
        }
      );

      localStorage.removeItem(
        'accessToken'
      );
      localStorage.removeItem(
        'refreshToken'
      );
      localStorage.removeItem(
        'user'
      );

      router('/login');
    } catch (error) {
      console.error(
        'Logout failed:',
        error
      );
    }
  };

  return (
    <aside className="hidden lg:flex fixed left-6 top-24 z-30 flex-col w-24 rounded-3xl border border-white/10 bg-[#0C1225] backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.55)] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 via-transparent to-black/20 opacity-60" />

      <nav className="space-y-3 p-4 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            active === item.label;

          return (
            <motion.button
              key={item.label}
              whileHover={{
                scale: 1.05,
                y: -1,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                router(item.path)
              }
              className={`flex h-14 w-full flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-white/10 text-white border border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span className="mt-1 text-[10px]">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10 relative">
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -1,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={handleLogout}
          className="flex h-14 w-full flex-col items-center justify-center rounded-2xl text-red-400 hover:text-white hover:bg-red-500/15 transition-all duration-300"
        >
          <LogOut size={18} />
          <span className="mt-1 text-[10px]">
            Logout
          </span>
        </motion.button>
      </div>
    </aside>
  );
}