import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Copy, Check, Code2, Play, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { Course, UserStats } from '../types';

interface PythonShowcaseProps {
  stats: UserStats;
  courses: Course[];
  onTriggerToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function PythonShowcase({ stats, courses, onTriggerToast }: PythonShowcaseProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Generate Python course list dynamically
  const coursesPythonList = courses.length > 0
    ? courses.map(c => `    {"name": "${c.name}", "hours": ${c.hours}, "grade": "${c.grade}"}`).join(',\n')
    : `    {"name": "Python Programming", "hours": 3, "grade": "A+"},\n    {"name": "Data Structures", "hours": 4, "grade": "B+"}`;

  const pythonCodeString = `# -*- coding: utf-8 -*-
"""
Academic GPA Forecast Engine (5.0 Scale)
GPA Forecast Engine v2.4 - Python Edition
"""

# Standard weight mapping for letter grades (5.0 scale)
GRADES_MAP = {
    'A+': 5.00,
    'A': 4.75,
    'B+': 4.50,
    'B': 4.00,
    'C+': 3.50,
    'C': 3.00,
    'D+': 2.50,
    'D': 2.00,
    'F': 1.00
}

def calculate_gpa(current_gpa, current_hours, semester_courses):
    """
    Calculates expected semester GPA and cumulative GPA after the current term.
    """
    # 1. Calculate Semester GPA
    total_semester_hours = 0
    total_semester_points = 0.0
    
    for course in semester_courses:
        grade = course['grade']
        hours = course['hours']
        weight = GRADES_MAP.get(grade, 1.00)
        
        total_semester_hours += hours
        total_semester_points += (weight * hours)
        
    semester_gpa = 0.0
    if total_semester_hours > 0:
        semester_gpa = total_semester_points / total_semester_hours
        
    # 2. Calculate Expected Cumulative GPA
    total_hours = current_hours + total_semester_hours
    current_total_points = current_gpa * current_hours
    combined_points = current_total_points + total_semester_points
    
    expected_cgpa = 0.0
    if total_hours > 0:
        expected_cgpa = combined_points / total_hours
        
    return {
        'semester_gpa': round(semester_gpa, 4),
        'expected_cgpa': round(expected_cgpa, 4),
        'semester_hours': total_semester_hours,
        'total_hours': total_hours
    }

# --- Baseline Academic Metrics (Realtime Sync) ---
current_gpa = ${stats.currentGpa > 0 ? stats.currentGpa.toFixed(2) : '3.64'}
current_hours = ${stats.currentHours > 0 ? stats.currentHours : '72'}

# Current Semester Registered Courses
semester_courses = [
${coursesPythonList}
]

if __name__ == '__main__':
    # Initialize the prediction algorithm
    res = calculate_gpa(current_gpa, current_hours, semester_courses)
    
    # Print formatted academic outcome report
    print("+" + "-"*48 + "+")
    print("|" + "Academic GPA Projection Report".center(48) + "|")
    print("+" + "-"*48 + "+")
    print(f"| Expected Semester GPA   : {res['semester_gpa']:.2f} / 5.00".ljust(49) + "|")
    print(f"| Expected Cumulative GPA : {res['expected_cgpa']:.2f} / 5.00".ljust(49) + "|")
    print(f"| Semester Credits Earned : {res['semester_hours']} hours".ljust(49) + "|")
    print(f"| Cumulative Total Credits: {res['total_hours']} hours".ljust(49) + "|")
    print("+" + "-"*48 + "+")
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonCodeString);
    setCopied(true);
    onTriggerToast('تم نسخ كود البايثون إلى الحافظة بنجاح 🐍', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    try {
      const blob = new Blob([pythonCodeString], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'gpa_forecast.py';
      link.click();
      URL.revokeObjectURL(url);
      onTriggerToast('بدأ تحميل ملف gpa_forecast.py بنجاح!', 'success');
    } catch (e) {
      console.error(e);
      onTriggerToast('فشل تحميل الملف، يرجى نسخه يدوياً.', 'error');
    }
  };

  return (
    <div
      id="python-showcase-section"
      className="p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 bg-brand-card-light/70 dark:bg-slate-900/40 glass-panel shadow-xl transition-all duration-300"
    >
      <button
        id="toggle-python-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 text-right focus:outline-none cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 font-sans">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                محرك حسابات بايثون (Python Engine)
              </h2>
              <span className="text-[10px] font-mono bg-amber-500/15 text-amber-500 px-2 py-0.5 rounded-md font-bold uppercase">
                Active &amp; Scalable
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              تريد تشغيل الحاسبة محلياً؟ انقر لتصفح الكود المصدري بلغة Python ومزامنته فورياً مع مدخلاتك.
            </p>
          </div>
        </div>
        
        <div className="text-slate-400 group-hover:text-slate-200 transition-colors">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4">
                <div className="flex items-start gap-2.5 text-xs text-amber-600 dark:text-amber-400/90 leading-relaxed font-sans">
                  <Play className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong>فكرة مذهلة:</strong> الكود البرمجي أدناه يتزامن بشكل لحظي مع البيانات التي تدخلها في البطاقات أعلاه. قم بتعديل المعدل الدراسي أو إضافة مواد، وستجد الكود جاهزاً بالبيانات المحدثة فوراً لتجربته محلياً!
                  </div>
                </div>
                
                <div className="flex gap-2 self-end sm:self-center shrink-0">
                  <button
                    id="copy-python-code-btn"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer border border-transparent dark:border-slate-700/50"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'تم النسخ!' : 'نسخ الكود'}</span>
                  </button>

                  <button
                    id="download-python-code-btn"
                    onClick={handleDownloadFile}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-[#0F172A] hover:bg-amber-400 transition-all cursor-pointer border border-transparent"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل gpa_calc.py</span>
                  </button>
                </div>
              </div>

              {/* Terminal code display simulation */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs shadow-inner">
                {/* Terminal title bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span>gpa_forecast_engine.py</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Code2 className="w-3 h-3 text-amber-500" />
                    Python 3.x
                  </span>
                </div>

                {/* Preformatted code block */}
                <pre className="p-4 overflow-x-auto max-h-96 text-left ltr scrollbar-thin scrollbar-thumb-slate-800">
                  <code className="text-[#38BDF8] select-all">
                    {pythonCodeString}
                  </code>
                </pre>
              </div>

              {/* Running guide */}
              <div className="bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800/80">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  كيف أقوم بتشغيل وحساب المعدل على جهازي الخاص باستخدام الكود؟
                </h4>
                <ol className="list-decimal list-inside text-xs text-slate-500 dark:text-slate-400 space-y-1.5 leading-relaxed font-sans">
                  <li>قم بتحميل الملف المرفق أو نسخ الكود أعلاه وحفظه في ملف باسم <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-amber-500">gpa_calc.py</span>.</li>
                  <li>افتح منفذ الأوامر أو مبوّب المدخلات (Terminal / Command Prompt) على حاسوبك الشخصي.</li>
                  <li>اكتب الأمر التالي واضغط Enter لتجربة التشغيل الفوري والآمن:
                    <div className="mt-1.5 bg-slate-900 text-slate-300 font-mono py-1.5 px-3 rounded-lg flex items-center justify-between border border-slate-800 text-[11px] ltr">
                      <span>python gpa_calc.py</span>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
