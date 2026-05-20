import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Sparkles, RotateCcw, Heart } from 'lucide-react';

import { Course, UserStats, GRADES_MAP } from './types';
import ThemeToggle from './components/ThemeToggle';
import GpaCard from './components/GpaCard';
import SemesterCourses from './components/SemesterCourses';
import ResultsDisplay from './components/ResultsDisplay';
import GradeScaleInfo from './components/GradeScaleInfo';
import CustomToast, { Toast } from './components/CustomToast';
import PythonShowcase from './components/PythonShowcase';

export default function App() {
  // 1. Theme Configuration
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('gpa_app_theme');
      return (saved as 'light' | 'dark') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Synchronise dark mode class
  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
      localStorage.setItem('gpa_app_theme', theme);
    } catch (e) {
      console.error('Error synchronising theme', e);
    }
  }, [theme]);

  // 2. Main States (User record, courses, toasted notifications)
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('gpa_user_stats');
      return saved ? JSON.parse(saved) : { currentGpa: 0, currentHours: 0 };
    } catch {
      return { currentGpa: 0, currentHours: 0 };
    }
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem('gpa_user_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // 3. LocalStorage persistence
  useEffect(() => {
    try {
      localStorage.setItem('gpa_user_stats', JSON.stringify(stats));
    } catch (e) {
      console.error('Error saving stats to storage', e);
    }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem('gpa_user_courses', JSON.stringify(courses));
    } catch (e) {
      console.error('Error saving courses to storage', e);
    }
  }, [courses]);

  // 4. Toast helper
  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 5. Math Calculations
  const semesterHours = courses.reduce((sum, c) => sum + c.hours, 0);
  const semesterPoints = courses.reduce((sum, c) => {
    const gradeWeight = GRADES_MAP[c.grade]?.value || 1.0;
    return sum + (gradeWeight * c.hours);
  }, 0);

  const semesterGpa = semesterHours > 0 ? semesterPoints / semesterHours : 0;

  const totalHours = stats.currentHours + semesterHours;
  const currentTotalPointsMultiplier = stats.currentGpa * stats.currentHours;
  const totalWeightPoints = currentTotalPointsMultiplier + semesterPoints;

  const expectedCgpa = totalHours > 0 ? totalWeightPoints / totalHours : 0;

  // 6. Action Handlers
  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
    triggerToast(`تمت إضافة المادة "${newCourse.name}" بنجاح`, 'success');
  };

  const handleUpdateCourse = (id: string, updated: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const handleDeleteCourse = (id: string) => {
    const courseToDelete = courses.find((c) => c.id === id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
    if (courseToDelete) {
      triggerToast(`تم حذف المادة "${courseToDelete.name}"`, 'info');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في تصفير وحذف جميع المواد المدخلة والسجل الحالي؟')) {
      setStats({ currentGpa: 0, currentHours: 0 });
      setCourses([]);
      triggerToast('تم مسح جميع البيانات بنجاح', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark text-slate-800 dark:text-[#F8FAFC] transition-colors duration-500 relative pb-16 selection:bg-blue-500/30">
      
      {/* Absolute Ambient Background Blobs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main SaaS Layout Shell */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <header className="py-6 md:py-8 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/50 dark:border-slate-800/60 mb-8 select-none gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#38BDF8] rounded-xl blur-md opacity-30" />
              <div className="w-12 h-12 bg-gradient-to-tr from-[#38BDF8] to-indigo-600 rounded-xl text-[#0F172A] relative flex items-center justify-center font-black text-xl">
                Σ
              </div>
            </div>
            
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 dark:text-white font-mono">
                  GPA.FORECAST
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                  Academic Projection Engine v2.4
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-mono mt-1">
                حاسبة المعدل التراكمي المتوقع بنظام 5 نقاط | LIVE ACCURATE CALCULATION
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-[#10B981] text-xs font-mono font-bold tracking-wide">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span>LIVE INTEGRATION ACTIVE</span>
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Clear all stats preset */}
            <button
              id="clear-all-data"
              onClick={handleClearAll}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/60 hover:border-rose-500/50 hover:text-rose-500 bg-white/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 transition-all font-semibold text-xs cursor-pointer shadow-sm"
              title="تصفير ومسح الجدول"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline">إعادة ضبط كاملة</span>
            </button>
          </div>
        </header>

        {/* Live GPA Dashboard Hero */}
        <section id="results-hero-grid" className="mb-8">
          <ResultsDisplay
            semesterGpa={semesterGpa}
            expectedCgpa={expectedCgpa}
            totalHours={totalHours}
            semesterHours={semesterHours}
          />
        </section>

        {/* Primary Interactive Columns */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Column: User cumulative statistics + Conversion guide (RTL flow) */}
          <section id="user-setup-column" className="lg:col-span-5 space-y-8 order-1 lg:order-2">
            <GpaCard stats={stats} onStatsChange={setStats} />
            <GradeScaleInfo />
          </section>

          {/* Left Column: Interactive courses checklist */}
          <section id="courses-manager-column" className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            <SemesterCourses
              courses={courses}
              onAddCourse={handleAddCourse}
              onUpdateCourse={handleUpdateCourse}
              onDeleteCourse={handleDeleteCourse}
              onErrorToast={(msg) => triggerToast(msg, 'error')}
            />
          </section>

        </main>

        <section id="python-showcase" className="mt-8">
          <PythonShowcase stats={stats} courses={courses} onTriggerToast={triggerToast} />
        </section>

        {/* Footer info branding */}
        <footer className="mt-16 pt-8 border-t border-slate-200/40 dark:border-slate-800/45 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-500 select-none">
          <div className="flex flex-col gap-1.5 text-right">
            <p className="font-sans">
              © {new Date().getFullYear()} حاسبة المعدل المتوقع. جميع حقوق الحساب وتوزيع الدرجات معتمدة بموجب لوائح التعليم الجامعي بنظام الخمس نقاط.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 dark:text-slate-600">
              <span className="text-emerald-500 font-bold">SYSTEM STATUS: READY // ALL MODULES NOMINAL</span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
              <span>CALCULATION TIME: ~14MS</span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
              <span>LATENCY: ZERO // REALTIME COMPUTATION ACTIVE</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 font-sans font-medium text-slate-400 shrink-0">
            <span>صُنع بحب وعناية لأجل الطلاب والمتميزين</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10" />
          </div>
        </footer>

      </div>

      {/* Dynamic Floating Toast List */}
      <CustomToast toasts={toasts} onRemove={removeToast} />

    </div>
  );
}
