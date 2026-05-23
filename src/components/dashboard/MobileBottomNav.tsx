'use client';

import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  UserCircle,
  PlusSquare,
} from 'lucide-react';

type MobileBottomNavProps = {
  active?: string;
};

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Jobs',
    icon: Briefcase,
  },
  {
    label: 'Applications',
    icon: FileText,
  },
  {
    label: 'Messages',
    icon: MessageSquare,
  },
   {
    label: 'Post',
    icon: PlusSquare,
  },
  {
    label: 'Profile',
    icon: UserCircle,
  },
];

export default function MobileBottomNav({
  active = 'Dashboard',
}: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0b1020]/95 backdrop-blur-2xl lg:hidden">
      <div className="grid grid-cols-5 px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;

          return (
            <button
              key={item.label}
              className={`group flex flex-col items-center justify-center gap-1 rounded-xl py-2 transition-all duration-300 ${
                isActive
                  ? 'text-purple-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {/* Icon */}
              <div
                className={`rounded-xl p-2 transition-all ${
                  isActive
                    ? 'bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                    : 'group-hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
              </div>

              {/* Label */}
              <span className="text-[11px] font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}