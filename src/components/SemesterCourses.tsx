import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Library, BookOpen, Clock, ListCollapse, Award } from 'lucide-react';
import { Course, GradeKey, GRADES_MAP } from '../types';

interface SemesterCoursesProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onUpdateCourse: (id: string, updated: Partial<Course>) => void;
  onDeleteCourse: (id: string) => void;
  onErrorToast: (msg: string) => void;
}

export default function SemesterCourses({
  courses,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onErrorToast,
}: SemesterCoursesProps) {
  
  const gradeKeys = Object.keys(GRADES_MAP) as GradeKey[];

  const handleAddNewCourse = () => {
    const customNames = ['الرياضيات', 'البرمجة', 'الفيزياء', 'مهارات الاتصال', 'الكيمياء', 'اللغة العربية', 'اللغة الإنجليزية', 'الإحصاء'];
    const randomName = `${customNames[Math.floor(Math.random() * customNames.length)]} ${courses.length + 1}`;
    
    const newCourse: Course = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      name: randomName,
      hours: 3,
      grade: 'A+',
    };
    onAddCourse(newCourse);
  };

  const handleAddSampleSchedule = () => {
    const samples: Omit<Course, 'id'>[] = [
      { name: 'هندسة البرمجيات', hours: 3, grade: 'A' },
      { name: 'قواعد البيانات', hours: 4, grade: 'B+' },
      { name: 'الذكاء الاصطناعي', hours: 3, grade: 'A+' },
      { name: 'شبكات الحاسب', hours: 3, grade: 'C+' },
    ];
    
    samples.forEach((s) => {
      onAddCourse({
        ...s,
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      });
    });
  };

  const handleHoursChange = (id: string, value: string) => {
    let parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < 1) {
      parsed = 1;
    } else if (parsed > 10) {
      parsed = 10;
      onErrorToast('الحد الأقصى للساعات المعتمدة للمادة الواحدة هو 10 ساعات.');
    }
    onUpdateCourse(id, { hours: parsed });
  };

  return (
    <div
      id="semester-courses-section"
      className="p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 bg-brand-card-light/70 dark:bg-slate-900/40 glass-panel shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-sans">
            <Library className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              مواد الفصل الحالي
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              قم بإضافة المواد وساعاتها والدرجة المتوقعة لكل مادة
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {courses.length === 0 && (
            <button
              id="add-sample-schedule-btn"
              type="button"
              onClick={handleAddSampleSchedule}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700/50 transition-all shadow-sm cursor-pointer"
            >
              إدراج جدول نموذجي لتجربة الأرقام
            </button>
          )}
          <button
            id="add-course-btn"
            type="button"
            onClick={handleAddNewCourse}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-slate-50 hover:text-white transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 border border-transparent dark:border-blue-500/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مادة</span>
          </button>
        </div>
      </div>

      {/* Render state */}
      <AnimatePresence mode="popLayout">
        {courses.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center p-12 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-950/5 text-center min-h-[250px]"
          >
            <div className="relative mb-5 p-4 rounded-full bg-slate-100 dark:bg-slate-900/60 text-slate-400 dark:text-slate-500">
              <BookOpen className="w-12 h-12" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full" />
            </div>
            
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 font-sans">
              لم تقم بإضافة أي مواد بعد
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
              اضغط على زر "إضافة مادة" للبدء بالبناء، أو استعمل الجدول التجريبي لملء البيانات بضغطة زر.
            </p>

            <div className="flex gap-3 mt-6">
              <button
                id="empty-add-course-btn"
                onClick={handleAddNewCourse}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-50 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة المقرّر الأول</span>
              </button>
              
              <button
                id="empty-sample-schedule-btn"
                onClick={handleAddSampleSchedule}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700/50 rounded-xl transition-all cursor-pointer"
              >
                توليد جدول افتراضي
              </button>
            </div>
          </motion.div>
        ) : (
          <div key="courses-list" className="space-y-4">
            {/* Desktop Table: visible from sm upwards */}
            <div className="hidden sm:block overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-950/10">
              <table className="w-full border-collapse text-right">
                <thead>
                  <tr className="border-b border-slate-200/60 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 text-xs font-bold font-sans">
                    <th className="px-5 py-4 w-12 text-center">#</th>
                    <th className="px-4 py-4 w-1/3">اسم المادة / المقرر الدراسى</th>
                    <th className="px-4 py-4 w-24">الساعات</th>
                    <th className="px-4 py-4 w-44">الدرجة الحرفية المتوقعة</th>
                    <th className="px-4 py-4 w-24 text-center text-slate-500">النقاط المقابلة</th>
                    <th className="px-5 py-4 w-12 text-center text-rose-500">حذف</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {courses.map((course, index) => {
                    const gradeInfo = GRADES_MAP[course.grade];
                    return (
                      <motion.tr
                        key={course.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        className="hover:bg-slate-100/30 dark:hover:bg-slate-900/20 transition-colors"
                      >
                        {/* Numbering */}
                        <td className="px-5 py-3 text-center align-middle font-mono text-slate-400 font-semibold text-xs">
                          {index + 1}
                        </td>

                        {/* Course Name Input */}
                        <td className="px-4 py-3 align-middle">
                          <div className="relative flex items-center gap-1.5 focus-within:text-blue-500">
                            <BookOpen className="w-4 h-4 text-slate-400" />
                            <input
                              id={`course-name-input-${course.id}`}
                              type="text"
                              value={course.name}
                              placeholder="اسم المادة"
                              onChange={(e) => onUpdateCourse(course.id, { name: e.target.value })}
                              className="w-full bg-transparent border-b border-transparent focus:border-blue-500 hover:border-slate-200 dark:hover:border-slate-800 py-1 px-1 text-slate-800 dark:text-slate-200 focus:outline-none transition-all text-sm font-semibold truncate"
                              aria-label="اسم المادة"
                            />
                          </div>
                        </td>

                        {/* Credit Hours Select or Input */}
                        <td className="px-4 py-3 align-middle">
                          <div className="relative flex items-center gap-1.5 focus-within:text-purple-500">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <input
                              id={`course-hours-input-${course.id}`}
                              type="number"
                              min="1"
                              max="10"
                              value={course.hours}
                              onChange={(e) => handleHoursChange(course.id, e.target.value)}
                              className="w-full bg-transparent border-b border-transparent focus:border-purple-500 hover:border-slate-200 dark:hover:border-slate-800 py-1 px-1 text-slate-800 dark:text-slate-200 focus:outline-none transition-all text-sm font-mono font-bold w-12"
                              aria-label="ساعات المادة"
                            />
                          </div>
                        </td>

                        {/* Grade Dropdown */}
                        <td className="px-4 py-3 align-middle">
                          <div className="relative flex items-center gap-1.5 focus-within:text-indigo-500">
                            <Award className="w-4 h-4 text-slate-400" />
                            <select
                              id={`course-grade-select-${course.id}`}
                              value={course.grade}
                              onChange={(e) => onUpdateCourse(course.id, { grade: e.target.value as GradeKey })}
                              className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl py-1.5 px-2.5 text-slate-800 dark:text-slate-200 focus:outline-none text-xs font-semibold focus:ring-1 focus:ring-indigo-500/50 cursor-pointer"
                              aria-label="الحرف التقديري"
                            >
                              {gradeKeys.map((key) => (
                                <option key={key} value={key} className="bg-slate-50 dark:bg-slate-900 py-1 text-slate-800 dark:text-slate-200">
                                  {GRADES_MAP[key].label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>

                        {/* Score out of 5 */}
                        <td className="px-4 py-3 align-middle text-center font-mono text-sm text-slate-700 dark:text-slate-300 font-bold arabic-numbers">
                          {(gradeInfo?.value || 1.0).toFixed(2)}
                        </td>

                        {/* Delete Button */}
                        <td className="px-5 py-3 align-middle text-center">
                          <button
                            id={`delete-course-btn-${course.id}`}
                            onClick={() => onDeleteCourse(course.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="حذف المقرر"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View: Stack design using list elements, visible on small screens */}
            <div className="block sm:hidden space-y-4">
              {courses.map((course, index) => {
                const gradeInfo = GRADES_MAP[course.grade];
                return (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 relative space-y-3"
                  >
                    {/* Header line card */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        مادة #{index + 1}
                      </span>
                      <button
                        id={`mob-delete-course-${course.id}`}
                        onClick={() => onDeleteCourse(course.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Form elements stacked */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">اسم المادة</label>
                      <input
                        id={`mob-name-input-${course.id}`}
                        type="text"
                        value={course.name}
                        onChange={(e) => onUpdateCourse(course.id, { name: e.target.value })}
                        className="w-full bg-slate-100/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="أدخل اسم المقرّر"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">الساعات</label>
                        <input
                          id={`mob-hours-input-${course.id}`}
                          type="number"
                          min="1"
                          max="10"
                          value={course.hours}
                          onChange={(e) => handleHoursChange(course.id, e.target.value)}
                          className="w-full bg-slate-100/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">الدرجة المتوقعة</label>
                        <select
                          id={`mob-grade-select-${course.id}`}
                          value={course.grade}
                          onChange={(e) => onUpdateCourse(course.id, { grade: e.target.value as GradeKey })}
                          className="w-full bg-slate-100/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                        >
                          {gradeKeys.map((key) => (
                            <option key={key} value={key}>
                              {GRADES_MAP[key].key} ({GRADES_MAP[key].value.toFixed(2)})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
