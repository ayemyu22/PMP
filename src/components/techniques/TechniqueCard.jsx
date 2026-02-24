import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Clock, ArrowRight, Tag } from 'lucide-react';
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

export default function TechniqueCard({ technique, index }) {
  const style = categoryStyles[technique.category] || categoryStyles.engagement;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={createPageUrl(`TechniqueDetail?id=${technique.id}`)}
        className="group block"
      >
        <div className="h-full bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
          {/* Category Badge */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} ${style.border} border mb-4`}>
            <Tag className="w-3 h-3" />
            {formatCategory(technique.category)}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {technique.name}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {technique.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {technique.time_required && (
              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <Clock className="w-3.5 h-3.5" />
                {technique.time_required.replace(/_/g, ' ')}
              </div>
            )}
            <span className="flex items-center gap-1 text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Подробнее
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}