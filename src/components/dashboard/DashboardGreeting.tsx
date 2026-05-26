'use client';

interface Props {
  userName: string;
}

export default function DashboardGreeting({ userName }: Props) {
  return (
    <div className="mb-8 overflow-hidden">
      {/* Main heading with gradient and animation */}
      <div
        className="animate-fade-in-up"
        style={{ animationDelay: '0ms' }}
      >
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent animate-gradient-shift">
            Hello, {userName}
          </span>
          <span className="inline-block ml-3 text-3xl animate-bounce" style={{ animationDuration: '1.5s' }}>
            👋
          </span>
        </h1>
      </div>

      {/* Subtitle with staggered animation */}
      <div
        className="animate-fade-in-up mt-2"
        style={{ animationDelay: '150ms' }}
      >
        <p className="text-slate-400 text-base font-medium">
          Here&apos;s what&apos;s happening today
        </p>
      </div>

      {/* Decorative accent line */}
      <div
        className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-transparent"
        style={{
          animation: 'fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          animationDelay: '300ms',
          opacity: 0,
        }}
      />
    </div>
  );
}
