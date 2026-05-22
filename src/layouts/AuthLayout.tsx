'use client';

import { motion, type Variants, useMotionValue, useSpring } from 'framer-motion';import { CheckCircle, Zap, Shield, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
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

  const cursorX = useMotionValue(-100);
const cursorY = useMotionValue(-100);

// smooth follow (IMPORTANT for glow effect)
const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });

useEffect(() => {
  const move = (e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  window.addEventListener('mousemove', move);
  return () => window.removeEventListener('mousemove', move);
}, [cursorX, cursorY]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const floatingVariants: Variants = {
    animate: (custom: number) => ({
      y: [0, -6, 0],
      transition: {
        duration: 6 + custom,
        delay: custom * 0.2,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  // ✅ CLEAN hover config (NO spread usage)
  const cardHover = {
    whileHover: {
      y: -4,
      scale: 1.015,
    },
    transition: {
      type: 'spring' as const,
      stiffness: 140,
      damping: 22,
      mass: 0.8,
    },
  };

  const cardBaseClass =
    "bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-md hover:border-blue-400/50 transition-all duration-300 will-change-transform";

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ">
        <motion.div
  style={{
    translateX: springX,
    translateY: springY,
  }}
  className="pointer-events-none fixed left-0 top-0 z-50 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl"
/>
      {/* Background Orbs */}
      <div className="absolute inset-0 -z-10 ">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-600/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/50 to-transparent" />

      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center lg:justify-start px-4 sm:px-8 lg:px-12 py-6"
        >
          <div className="w-full max-w-md">

            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-7"
            >
              <div className="mb-6 text-center">
                <motion.h1 variants={itemVariants} className="text-3xl font-bold text-white">
                  {title}
                </motion.h1>
                <motion.p variants={itemVariants} className="text-gray-300 text-sm mt-1">
                  {subtitle}
                </motion.p>
              </div>

              <motion.div variants={containerVariants}>
                {children}
              </motion.div>

            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex flex-col items-center justify-center  relative"
        >
          <div className="space-y-6 max-w-sm">

            {/* CARD 1 */}
            <motion.div
              custom={0}
              variants={floatingVariants}
              animate="animate"
              {...cardHover}
              className={cardBaseClass}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/30 rounded-lg">
                  <Zap className="text-blue-300" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Lightning Fast</h3>
                  <p className="text-gray-400 text-sm">Instant matching with AI-powered algorithms</p>
                </div>
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              custom={1}
              variants={floatingVariants}
              animate="animate"
              {...cardHover}
              className={cardBaseClass.replace("blue", "purple")}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/30 rounded-lg">
                  <Shield className="text-purple-300" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Enterprise Security</h3>
                  <p className="text-gray-400 text-sm">Bank-level encryption for your data</p>
                </div>
              </div>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              custom={2}
              variants={floatingVariants}
              animate="animate"
              {...cardHover}
              className={cardBaseClass.replace("blue", "cyan")}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/30 rounded-lg">
                  <TrendingUp className="text-cyan-300" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Results in Days</h3>
                  <p className="text-gray-400 text-sm">Get hired or find talent fast</p>
                </div>
              </div>
            </motion.div>

            {/* CARD 4 */}
            <motion.div
              custom={3}
              variants={floatingVariants}
              animate="animate"
              {...cardHover}
              className={cardBaseClass.replace("blue", "green")}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500/30 rounded-lg">
                  <CheckCircle className="text-green-300" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">50K+ Members</h3>
                  <p className="text-gray-400 text-sm">Join fast growing community</p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}