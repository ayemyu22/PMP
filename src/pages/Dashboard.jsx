import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { techniquesData } from '../components/data/localData.jsx';
import { useLessonPlans } from '../components/data/useLocalStorage.jsx';
import { BookOpen, Calendar, Sparkles, ArrowRight, TrendingUp, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const techniques = techniquesData;
  const { lessonPlans } = useLessonPlans();

  const stats = [
    {
      label: 'Доступно техник',
      value: techniques.length,
      icon: BookOpen,
      color: 'from-indigo-500 to-indigo-600',
      shadowColor: 'shadow-indigo-500/25'
    },
    {
      label: 'Создано планов уроков',
      value: lessonPlans.length,
      icon: Calendar,
      color: 'from-emerald-500 to-emerald-600',
      shadowColor: 'shadow-emerald-500/25'
    },
    {
      label: 'Категорий',
      value: 8,
      icon: Target,
      color: 'from-amber-500 to-orange-500',
      shadowColor: 'shadow-amber-500/25'
    },
  ];

  const recentTechniques = techniques.slice(0, 4);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 p-8 md:p-12"
      >
        <div className="absolute inset-0 opacity-50" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'%3E%3C/path%3E%3C/svg%3E\")"}} />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-200" />
            <span className="text-indigo-200 text-sm font-medium">Добро пожаловать в ПМП: Поиск Мастерство Проектирование </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Осваивайте техники преподавания и планируйте уроки эффективнее
          </h1>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
            Изучайте проверенные образовательные методы, открывайте новые педагогические стратегии и создавайте увлекательные планы уроков — всё в одном месте.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to={createPageUrl('Techniques')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              Изучить техники
            </Link>
            <Link
              to={createPageUrl('LessonPlanner')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-700/50 text-white rounded-xl font-semibold hover:bg-indigo-700/70 transition-colors border border-indigo-400/30"
            >
              <Calendar className="w-5 h-5" />
              Начать планирование
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg ${stat.shadowColor}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Techniques */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Избранные техники</h2>
              <Link
                to={createPageUrl('Techniques')}
                className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center gap-1"
              >
                Все техники
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {recentTechniques.map((technique) => (
              <Link
                key={technique.id}
                to={createPageUrl(`TechniqueDetail?id=${technique.id}`)}
                className="block p-4 hover:bg-slate-50 transition-colors"
              >
                <h3 className="font-medium text-slate-900 mb-1">{technique.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-1">{technique.description}</p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">Быстрые действия</h2>
          </div>
          <div className="p-6 space-y-4">
            <Link
              to={createPageUrl('Techniques')}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">Просмотр техник</h3>
                <p className="text-slate-500 text-sm">Открывайте новые методы преподавания</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 ml-auto group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              to={createPageUrl('LessonPlanner')}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">Создать план урока</h3>
                <p className="text-slate-500 text-sm">Спланируйте свой следующий урок</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 ml-auto group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </Link>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Clock className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">Недавние планы уроков</h3>
                <p className="text-slate-500 text-sm">{lessonPlans.length} планов создано</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}