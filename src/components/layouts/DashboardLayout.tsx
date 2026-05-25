'use client';

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import MobileBottomNav from "../../components/dashboard/MobileBottomNav";

interface Props {
  children: React.ReactNode;
  active?: string;
  userName?: string;
  topContent?: React.ReactNode;
}

export default function DashboardLayout({
  children,
  active = "Dashboard",
  userName = "Alex Johnson",
  topContent,
}: Props) {
  return (
    <div className="min-h-screen bg-[#0C1225] text-white">

      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header userName={userName} />
      </div>

      {/* BODY AREA BELOW HEADER */}
      <div className="pt-20 flex">

        {/* SIDEBAR (fixed left) */}
        <div className="hidden lg:block w-32 fixed left-0 top-20 bottom-0">
          <Sidebar active={active} />
        </div>

        {/* MAIN CONTENT (RIGHT SIDE OF SIDEBAR) */}
      <main className="flex-1 lg:ml-36 lg:mt-20 px-8 sm:px-10 pb-24 animate-slide-in">

          {/* 👇 THIS WILL NOW APPEAR TOP RIGHT OF SIDEBAR */}
          {topContent}

          {/* PAGE CONTENT */}
          {children}

        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <MobileBottomNav active={active} />
    </div>
  );
}