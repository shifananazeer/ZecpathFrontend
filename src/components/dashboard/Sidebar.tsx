'use client';

import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  Bell,
  User,
  PlusSquare,
} from 'lucide-react';

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
};

interface SidebarProps {
  active?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Jobs', icon: Briefcase, path: '/dashboard/jobs' },
  { label: 'Applications', icon: FileText, path: '/dashboard/applications' },
  { label: 'Post', icon: PlusSquare, path: '/dashboard/post' },
  { label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
  { label: 'Alerts', icon: Bell, path: '/dashboard/alerts' },
  { label: 'Profile', icon: User, path: '/dashboard/profile' },
];

export default function Sidebar({
  active = 'Dashboard',
}: SidebarProps) {
  const router = useNavigate();

  return (
    <aside
      className="hidden lg:flex fixed left-6 top-24 z-30 flex-col w-24 rounded-3xl
      border border-white/10 bg-[#0C1225] backdrop-blur-2xl
      shadow-[0_10px_40px_rgba(0,0,0,0.55)] relative overflow-hidden"
    >
      {/* glass overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl
        bg-gradient-to-b from-white/5 via-transparent to-black/20 opacity-60"
      />

      <nav className="space-y-3 p-4 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;

          return (
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              key={item.label}
              onClick={() => router(item.path)}
              className={`flex h-14 w-full flex-col items-center justify-center rounded-2xl
              transition-all duration-300
              ${
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
    </aside>
  );
}