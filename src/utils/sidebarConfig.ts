// sidebarConfig.ts
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bell,
  User,
  PlusSquare,
  Building2,
  Users,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  label: string;
  icon: LucideIcon;
  path: string;
};

export const sidebarConfig = {
  CANDIDATE: [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/candidate/dashboard',
    },
    {
      label: 'Jobs',
      icon: Briefcase,
      path: '/candidate/jobs',
    },
    {
      label: 'Companies',
      icon: Building2,
      path: '/candidate/employers',
    },
    {
      label: 'Applications',
      icon: FileText,
      path: '/candidate/applications',
    },
    {
      label: 'Post',
      icon: PlusSquare,
      path: '/candidate/post',
    },
    {
      label: 'Alerts',
      icon: Bell,
      path: '/candidate/alerts',
    },
    {
      label: 'Profile',
      icon: User,
      path: '/candidate/profile',
    },
  ],

  EMPLOYER: [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/employer/dashboard',
    },
    {
      label: 'Jobs',
      icon: Briefcase,
      path: '/employer/jobs',
    },
    {
      label: 'Candidates',
      icon: Users,
      path: '/employer/candidates',
    },
    {
      label: 'Applications',
      icon: FileText,
      path: '/employer/applications',
    },
    {
      label: 'Post Job',
      icon: PlusSquare,
      path: '/employer/post-job',
    },
    {
      label: 'Alerts',
      icon: Bell,
      path: '/employer/alerts',
    },
    {
      label: 'Profile',
      icon: User,
      path: '/employer/profile',
    },
  ],
  ADMIN:[
    
  ]
};