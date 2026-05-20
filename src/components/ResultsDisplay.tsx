import { motion } from 'motion/react';
import { Award, Zap, TrendingUp, Compass, ChevronLeft } from 'lucide-react';

interface ResultsDisplayProps {
  semesterGpa: number;
  expectedCgpa: number;
  totalHours: number;
  semesterHours: number;
}

export default function ResultsDisplay({
  semesterGpa,
  expectedCgpa,
  totalHours,
  semesterHours,
}: ResultsDisplayProps) {
  
  // Format helpers
  const semGpaStr = isNaN(semesterGpa) ? '0.00' : semesterGpa.toFixed(2);
  const expCgpaStr = isNaN(expectedCgpa) ? '0.00' : expectedCgpa.toFixed(2);

  // Get verbal rating and colors
  const getRatingInfo = (val: number) => {
    if (isNaN(val) || val === 0) {
      return { 
        text: 'لم يحسب بعد', 
        desc: 'أدخل بعض المواد والبيانات للبدء بالحساب الآني', 
        color: 'text-slate-400 border-slate-200 dark:border-slate-800 bg-slate-500/10',
        progressBarColor: 'bg-slate-400'
      };
    }
    if (val >= 4.50) {
      return { 
        text: 'ممتاز مرتفع / ممتاز', 
        desc: 'أداء جامعي عالمي واستثنائي! حافظ على هذا التفوق الباهر.', 
        color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-500/5',
        progressBarColor: 'bg-gradient-to-l from-emerald-400 to-green-500'
      };
    }
    if (val >= 3.75) {
      return { 
        text: 'جيد جداً مرتفع / جيد جداً', 
        desc: 'مستوى رائع جداً! أنت على بعد خطوة بسيطة للوصول للامتياز.', 
        color: 'text-blue-500 border-blue-500/20 bg-blue-500/10 dark:bg-blue-500/5',
        progressBarColor: 'bg-gradient-to-l from-blue-400 to-indigo-500'
      };
    }
    if (val >= 2.75) {
      return { 
        text: 'جيد مرتفع / جيد', 
        desc: 'مستوى طيب ومطمئن. استمر في العمل لرفع معدلك أكثر بالفصول القادمة.', 
        color: 'text-amber-500 border-amber-500/20 bg-amber-500/10 dark:bg-amber-500/5',
        progressBarColor: 'bg-gradient-to-l from-amber-400 to-yellow-500'
      };
    }
    if (val >= 2.00) {
      return { 
        text: 'مقبول / مقبول مرتفع', 
        desc: 'تجاوزت الحد الأدنى للنجاح. ننصحك بتكثيف المذاكرة لرفع التحصيل العلمي.', 
        color: 'text-orange-500 border-orange-500/20 bg-orange-500/10 dark:bg-orange-500/5',
        progressBarColor: 'bg-gradient-to-l from-orange-400 to-amber-500'
      };
    }
    return { 
      text: 'متعثر دراسياً / إنذار أكاديمي', 
      desc: 'المعدل أقل من 2.00. يتطلب هذا الوضع مراجعة الخطة الدراسية وطلب الدعم الأكاديمي.', 
      color: 'text-rose-500 border-rose-500/20 bg-rose-500/10 dark:bg-rose-500/5',
      progressBarColor: 'bg-gradient-to-l from-rose-400 to-red-500'
    };
  };

  const rating = getRatingInfo(expectedCgpa);
  const semesterRating = getRatingInfo(semesterGpa);

  // Percentage for progress display (out of 5.0)
  const getPercentagePrg = (val: number) => {
    if (isNaN(val) || val <= 0) return 0;
    const prg = (val / 5) * 100;
    return Math.min(100, Math.max(0, prg));
  };

  return (
    <div id="results-display-section" className="space-y-6">
      
      {/* Prime expected Cumulative CGPA Section */}
      <motion.div
        id="expected-gpa-primary-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 md:p-8 rounded-3xl border border-blue-500/20 dark:border-blue-500/30 bg-brand-card-light/85 dark:bg-slate-900/40 glass-panel shadow-2xl relative overflow-hidden glow-accent"
      >
        {/* Glow backdrop decorator */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold select-none mb-3 border border-blue-500/20">
            <TrendingUp className="w-3.5 h-3.5 animate-pulse" />
            <span>المعدل التراكمي الكلي المتوقع بعد الفصل الحالي</span>
          </div>

          {/* Large dynamic rating number */}
          <motion.div
            id="cgi-expected-gpa-number"
            key={expCgpaStr}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-6xl md:text-7xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 arabic-numbers mt-1 mb-2 select-all cursor-all-scroll"
          >
            {expCgpaStr}
          </motion.div>

          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mb-4">
            من أصل 5.00
          </p>

          {/* Progress gauge bar */}
          <div className="w-full max-w-md h-3 bg-slate-100 dark:bg-slate-950/80 rounded-full overflow-hidden border border-slate-200/40 dark:border-slate-800/80 relative mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getPercentagePrg(expectedCgpa)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${rating.progressBarColor}`}
            />
            
            {/* Guide line indicators */}
            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
              <span className="w-[1px] h-full bg-slate-300 dark:bg-slate-800" />
              <span className="w-[1px] h-full bg-slate-300 dark:bg-slate-800" />
              <span className="w-[1px] h-full bg-slate-300 dark:bg-slate-800" />
              <span className="w-[1px] h-full bg-slate-300 dark:bg-slate-800" />
              <span className="w-[1px] h-full bg-slate-300 dark:bg-slate-800" />
            </div>
          </div>

          {/* Feedback details */}
          <motion.div
            key={expectedCgpa}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-5 py-2.5 rounded-2xl border text-sm font-bold text-center flex flex-col md:flex-row items-center gap-2 max-w-md ${rating.color}`}
          >
            <div className="flex items-center gap-1.5 font-bold">
              <Award className="w-4 h-4 shrink-0" />
              <span>التقدير الكلي المتوقع:</span>
              <span className="underline decoration-wavy underline-offset-4">{rating.text}</span>
            </div>
          </motion.div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center max-w-sm leading-relaxed">
            {rating.desc}
          </p>
        </div>
      </motion.div>

      {/* Grid statistics summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Semester GPA */}
        <motion.div
          id="stat-semester-gpa"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-brand-card-light/70 dark:bg-slate-900/30 glass-panel shadow-sm flex flex-col"
        >
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            معدل الفصل الحالي فقط
          </span>
          <motion.span
            key={semGpaStr}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-2 arabic-numbers"
          >
            {semGpaStr}
          </motion.span>
          <div className="mt-2 text-[11px] font-medium text-slate-400 truncate flex items-center gap-1">
            <Compass className="w-3 h-3 text-slate-400" />
            تقدير فصلي: {semesterRating.text}
          </div>
        </motion.div>

        {/* Semester total credits */}
        <motion.div
          id="stat-semester-hours"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-brand-card-light/70 dark:bg-slate-900/30 glass-panel shadow-sm flex flex-col"
        >
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            ساعات الفصل الحالي
          </span>
          <span className="text-3xl font-bold font-mono text-slate-800 dark:text-slate-200 mt-2 arabic-numbers">
            {semesterHours} <span className="text-sm font-sans text-slate-400">ساعة</span>
          </span>
          <div className="mt-2 text-[11px] font-medium text-slate-400">
            ساعات مضافة في الحساب
          </div>
        </motion.div>

        {/* Combined total credits */}
        <motion.div
          id="stat-total-combined-hours"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-brand-card-light/70 dark:bg-slate-900/30 glass-panel shadow-sm flex flex-col"
        >
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            المجموع الكلي للساعات
          </span>
          <span className="text-3xl font-bold font-mono text-slate-800 dark:text-slate-200 mt-2 arabic-numbers">
            {totalHours} <span className="text-sm font-sans text-slate-400">ساعة</span>
          </span>
          <div className="mt-2 text-[11px] font-medium text-slate-400">
            المنجزة + سياق الفصل الحالي
          </div>
        </motion.div>
      </div>

      {/* Target GPA planner helper, which is highly appreciated by students! */}
      {expectedCgpa > 0 && (
        <motion.div
          id="academic-planner-widget"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 rounded-2xl border border-purple-500/10 dark:border-purple-500/20 bg-purple-500/[0.02] dark:bg-purple-500/[0.01] flex items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              💡 معلومة أكاديمية مخصصة لمعدلك:
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              {expectedCgpa >= 4.5 ? 'معدلك ممتاز جداً! التحدي القادم هو الحفاظ على مرتبة الشرف الأولى. ركز على تنظيم وقتك وضمان الدرجات الكاملة للمقررات ذات الساعات العالية.' :
               expectedCgpa >= 3.75 ? 'معدل جيد جداً وقريب جداً من مرتبة الشرف الأولى. إذا تمكنت من رفع مستوى درجاتك في المواد المتبقية بمقدار نصف درجة حرفية، ستسجل في قائمة الامتياز.' :
               expectedCgpa >= 2.75 ? 'أداء جيد، يمكنك تحسين المعدل التراكمي بشكل أكبر بكثير بإضافة بضع ساعات بمعدل أعلى في الفصول القادمة. ركز على المواد الدراسية التخصصية.' :
               'تحتاج لمضاعفة الجهد الدراسي. استعن بنصائح المرشد الأكاديمي، وحاول تكرار بعض المقررات لتعديل درجاتها المتدنية لرفع المعدل بسرعة.'}
            </p>
          </div>
        </motion.div>
      )}

    </div>
  );
}
