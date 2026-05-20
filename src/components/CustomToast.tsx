import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface CustomToastProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export default function CustomToast({ toasts, onRemove }: CustomToastProps) {
  return (
    <div
      id="toast-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-xl glass-panel border bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-800/80"
            >
              <div className="flex items-center gap-3">
                {isSuccess && (
                  <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
                {isError && (
                  <div className="p-1 rounded-lg bg-rose-500/10 text-rose-500">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                )}
                {!isSuccess && !isError && (
                  <div className="p-1 rounded-lg bg-blue-500/10 text-blue-500">
                    <Info className="w-5 h-5" />
                  </div>
                )}
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100 font-sans">
                  {toast.message}
                </p>
              </div>
              
              <button
                id={`close-toast-${toast.id}`}
                onClick={() => onRemove(toast.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
