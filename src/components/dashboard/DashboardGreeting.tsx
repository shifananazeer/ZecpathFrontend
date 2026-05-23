'use client';

interface Props {
  userName: string;
}

export default function DashboardGreeting({ userName }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-white">
        Hello, {userName} 👋
      </h1>
      <p className="text-sm text-slate-400 mt-1">
        Here's what's happening today
      </p>
    </div>
  );
}