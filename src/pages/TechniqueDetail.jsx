import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { techniquesData } from '../components/data/localData.jsx';
import { ArrowLeft, Clock, Target, CheckCircle2, ListOrdered, Lightbulb, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryStyles = {
  active_learning: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  assessment: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  classroom_management: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  differentiation: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
  engagement: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  collaboration: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  technology_integration: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  questioning: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
};

const formatCategory = (cat) => cat?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

export default function TechniqueDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const techniqueId = urlParams.get('id');

  const technique = techniquesData.find((t) => t.id === techniqueId);

  if (!technique) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Техника не найдена</h2>
        <Link to={createPageUrl('Techniques')} className="text-indigo-600 hover:text-indigo-700">
          ← Назад к техникам
        </Link>
      </div>
    );
  }

  const style = categoryStyles[technique.category] || categoryStyles.engagement;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <Link
        to={createPageUrl('Techniques')}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Назад к техникам
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} ${style.border} border mb-4`}>
          <Tag className="w-3 h-3" />
          {formatCategory(technique.category)}
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{technique.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          {technique.time_required && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {technique.time_required.replace(/_/g, ' ')}
            </div>
          )}
          {technique.best_for && (
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              Подходит для: {technique.best_for}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200/60 p-8"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Обзор
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">{technique.description}</p>
        </motion.div>

        {/* Benefits */}
        {technique.benefits && technique.benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200/60 p-8"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Ключевые преимущества
            </h2>
            <ul className="space-y-3">
              {technique.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="text-slate-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Implementation Steps */}
        {technique.implementation_steps && technique.implementation_steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-200/60 p-8"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-indigo-600" />
              Как применить
            </h2>
            <ol className="space-y-4">
              {technique.implementation_steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 font-semibold text-indigo-600">
                    {index + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-slate-700">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Готовы применить эту технику?</h3>
          <p className="text-indigo-100 mb-6">Создайте план урока с использованием этого метода</p>
          <Link
            to={createPageUrl('LessonPlanner')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
          >
            Создать план урока
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}