import { useState, useEffect } from 'react';
import { initialLessonPlans } from './localData.jsx';

const STORAGE_KEY = 'teachmaster_lesson_plans';

export function useLessonPlans() {
  const [lessonPlans, setLessonPlans] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialLessonPlans;
    } catch {
      return initialLessonPlans;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lessonPlans));
  }, [lessonPlans]);

  const createPlan = (data) => {
    const newPlan = {
      ...data,
      id: 'lp_' + Date.now(),
      created_date: new Date().toISOString(),
    };
    setLessonPlans((prev) => [newPlan, ...prev]);
    return newPlan;
  };

  const updatePlan = (id, data) => {
    setLessonPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deletePlan = (id) => {
    setLessonPlans((prev) => prev.filter((p) => p.id !== id));
  };

  return { lessonPlans, createPlan, updatePlan, deletePlan };
}