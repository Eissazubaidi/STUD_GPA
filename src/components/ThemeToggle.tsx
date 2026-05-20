import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-11 h-11 rounded-xl glass-panel text-slate-100 hover:text-white bg-slate-800/60 dark:bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 duration-300 pointer-events-auto cursor-pointer"
      aria-label="تبديل الوضع المغلق/المضيء"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0, scale: theme === 'dark' ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute text-amber-500"
      >
        <Sun className="w-5 h-5 fill-amber-500/20" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : -180, scale: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute text-blue-400"
      >
        <Moon className="w-5 h-5 fill-blue-400/20" />
      </motion.div>
    </button>
  );
}
