export type GradeKey = 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F';

export interface GradeInfo {
  key: GradeKey;
  value: number;
  label: string;
}

export const GRADES_MAP: Record<GradeKey, GradeInfo> = {
  'A+': { key: 'A+', value: 5.0, label: 'أ+ (امتياز مرتفع - 5.00)' },
  'A': { key: 'A', value: 4.75, label: 'أ (امتياز - 4.75)' },
  'B+': { key: 'B+', value: 4.5, label: 'ب+ (جيد جداً مرتفع - 4.50)' },
  'B': { key: 'B', value: 4.0, label: 'ب (جيد جداً - 4.00)' },
  'C+': { key: 'C+', value: 3.5, label: 'ج+ (جيد مرتفع - 3.50)' },
  'C': { key: 'C', value: 3.0, label: 'ج (جيد - 3.00)' },
  'D+': { key: 'D+', value: 2.5, label: 'د+ (مقبول مرتفع - 2.50)' },
  'D': { key: 'D', value: 2.0, label: 'د (مقبول - 2.00)' },
  'F': { key: 'F', value: 1.0, label: 'هـ / راسب (1.00)' },
};

export interface Course {
  id: string;
  name: string;
  hours: number;
  grade: GradeKey;
}

export interface UserStats {
  currentGpa: number;
  currentHours: number;
}
