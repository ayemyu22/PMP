import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { value: 'all', label: 'Все методы' },
  { value: 'active_learning', label: 'Активное обучение' },
  { value: 'assessment', label: 'Оценивание' },
  { value: 'classroom_management', label: 'Управление классом' },
  { value: 'differentiation', label: 'Дифференциация' },
  { value: 'engagement', label: 'Вовлечённость' },
  { value: 'collaboration', label: 'Сотрудничество' },
  { value: 'technology_integration', label: 'Технологии' },
  { value: 'questioning', label: 'Вопросная методы' },
];

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === cat.value
              ? 'text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300'
          }`}
        >
          {selected === cat.value && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}