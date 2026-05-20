import { ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Award, Clock, HelpCircle, History } from 'lucide-react';
import { UserStats } from '../types';

interface GpaCardProps {
  stats: UserStats;
  onStatsChange: (newStats: UserStats) => void;
}

export default function GpaCard({ stats, onStatsChange }: GpaCardProps) {
  const handleGpaChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) val = 0;
    if (val > 5) val = 5;
    if (val < 0) val = 0;
    
    // Allow typing, but keep within bounds
    onStatsChange({
      ...stats,
      currentGpa: val,
    });
  };

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;
    if (val > 250) val = 250; // High limit

    onStatsChange({
      ...stats,
      currentHours: val,
    });
  };

  const handleFresherReset = () => {
    onStatsChange({
      currentGpa: 0,
      currentHours: 0,
    });
  };

  return (
    <motion.div
      id="gpa-current-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 bg-brand-card-light/70 dark:bg-slate-900/40 glass-panel shadow-xl relative overflow-hidden transition-all duration-300"
    >
      {/* Decorative top border ambient glow */}
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-l from-blue-500 via-indigo-500 to-purple-500 opacity-80" />

      {/* Grid Pattern in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-30" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans">
                السجل الأكاديمي الحالي
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                أدخل معدلك الحالي وساعاتك المنجزة قبل هذا الفصل
              </p>
            </div>
          </div>
          
          <button
            id="fresher-preset-btn"
            type="button"
            onClick={handleFresherReset}
            className="self-start sm:self-center px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 transition-colors border border-transparent dark:border-slate-700/50 cursor-pointer"
          >
            طالب مستجد؟ (تصفير السجل)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current GPA Input Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="current-gpa-input" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Award className="w-4 h-4 text-blue-500" />
                المعدل التراكمي السابق (من 5.0)
              </label>
              <span className="text-xs font-mono font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                نظام من 5
              </span>
            </div>
            
            <div className="relative">
              <input
                id="current-gpa-input"
                type="number"
                step="0.01"
                min="0"
                max="5"
                placeholder="مثال: 4.25"
                value={stats.currentGpa === 0 ? '' : stats.currentGpa}
                onChange={handleGpaChange}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-mono text-lg transition-all"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 font-medium text-sm">
                / 5.0
              </div>
            </div>

            {/* Range Slider for convenience */}
            <div className="pt-2">
              <input
                id="current-gpa-slider"
                type="range"
                min="0"
                max="5"
                step="0.01"
                value={stats.currentGpa}
                onChange={handleGpaChange}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1 font-mono mt-1">
                <span>0.0</span>
                <span>2.5</span>
                <span>5.0</span>
              </div>
            </div>
          </div>

          {/* Current Earned Hours Input Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="current-hours-input" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-purple-500" />
                مجموع الساعات المكتسبة السابقة
              </label>
              <div className="group relative">
                <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-500 cursor-help transition-colors" />
                <div className="absolute z-20 w-48 p-2 text-xs bg-slate-800 text-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none left-0 bottom-full mb-1.5 leading-relaxed font-sans shadow-lg border border-slate-700">
                  الساعات التي اجتزتها بنجاح قبل هذا الفصل الحالي ولا تتضمن الساعات التي تدرسها الآن.
                </div>
              </div>
            </div>

            <div className="relative">
              <input
                id="current-hours-input"
                type="number"
                min="0"
                max="250"
                placeholder="مثال: 60 ساعة"
                value={stats.currentHours === 0 ? '' : stats.currentHours}
                onChange={handleHoursChange}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-lg transition-all"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 font-medium text-sm">
                ساعة
              </div>
            </div>

            {/* Slider for Hours */}
            <div className="pt-2">
              <input
                id="current-hours-slider"
                type="range"
                min="0"
                max="200"
                step="1"
                value={stats.currentHours}
                onChange={handleHoursChange}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1 font-mono mt-1">
                <span>0</span>
                <span>100</span>
                <span>200+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
