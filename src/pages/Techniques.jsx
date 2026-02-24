import React, { useState, useMemo } from 'react';
import { techniquesData } from '../components/data/localData.jsx';
import { Search, BookOpen, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import TechniqueCard from '../components/techniques/TechniqueCard.jsx';
import CategoryFilter from '../components/techniques/CategoryFilter.jsx';

export default function Techniques() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(true);

  const techniques = techniquesData;

  const filteredTechniques = useMemo(() => {
    return techniques.filter((technique) => {
      const matchesSearch =
        technique.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        technique.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || technique.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [techniques, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Педагогические методы</h1>
          <p className="text-slate-600">Изучайте и осваивайте проверенные образовательные методы</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <BookOpen className="w-4 h-4" />
          <span>{filteredTechniques.length} метод</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Поиск методов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 rounded-xl"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 h-12 rounded-xl font-medium transition-colors ${
              showFilters
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фильтры
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-slate-100">
                <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Techniques Grid */}
      {filteredTechniques.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechniques.map((technique, index) => (
            <TechniqueCard key={technique.id} technique={technique} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-2xl border border-slate-200"
        >
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Методы не найдены</h3>
          <p className="text-slate-500">
            {searchQuery || selectedCategory !== 'all'
              ? 'Попробуйте изменить запрос или фильтры'
              : 'Новые методы появятся совсем скоро!'}
          </p>
        </motion.div>
      )}
    </div>
  );
}