'use client';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>{children}</div>
  );
}
