import { motion } from 'motion/react';
import { HelpCircle, Star, Grid } from 'lucide-react';
import { GRADES_MAP, GradeKey } from '../types';

export default function GradeScaleInfo() {
  const grades = Object.values(GRADES_MAP);

  // Helper color indicators for grade points
  const getGradeBadgeStyles = (key: GradeKey) => {
    if (key.startsWith('A')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (key.startsWith('B')) return 'bg-teal-500/10 text-teal-500 border-teal-500/20';
    if (key.startsWith('C')) return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    if (key.startsWith('D')) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
  };

  return (
    <motion.div
      id="grade-scale-info-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 bg-brand-card-light/70 dark:bg-slate-900/40 glass-panel shadow-sm"
    >
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/85">
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
          <Grid className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100">
            جدول توزيع الدرجات الحرفية
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            توزيع النقاط للأوزان والدرجات الحرفية بنظام من 5
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
        {grades.map((grade) => (
          <div
            key={grade.key}
            className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 hover:scale-105 hover:shadow-md transition-all duration-300"
          >
            <span className={`text-base font-bold px-2 py-0.5 rounded-lg border ${getGradeBadgeStyles(grade.key)}`}>
              {grade.key}
            </span>
            <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300 mt-2">
              {grade.value.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate max-w-full text-center">
              {grade.key === 'A+' ? 'ممتاز مرتفع' :
               grade.key === 'A' ? 'ممتاز' :
               grade.key === 'B+' ? 'جيد جداً مرتفع' :
               grade.key === 'B' ? 'جيد جداً' :
               grade.key === 'C+' ? 'جيد مرتفع' :
               grade.key === 'C' ? 'جيد' :
               grade.key === 'D+' ? 'مقبول مرتفع' :
               grade.key === 'D' ? 'مقبول' : 'راسب'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-start gap-2.5 mt-4 p-3 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-blue-500/10">
        <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 fill-amber-500/20" />
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>معلومة:</strong> لحساب المعدل الفصلي، نضرب وزن كل مادة بساعاتها الأكاديمية، ثم نجمع هذه النواتج ونقسمها على المجموع الكلي لساعات الفصل الحالي.
        </p>
      </div>
    </motion.div>
  );
}
