'use client';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/images/auth-bg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/80" />

      {/* Left aligned card */}
      <div className="relative z-10 min-h-screen flex items-center justify-start px-4 sm:px-8 lg:px-40 py-6">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-7">
            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-white">{title}</h1>
              <p className="text-gray-300 text-sm mt-1">{subtitle}</p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}