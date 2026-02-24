import React, { useState } from 'react';
import { techniquesData } from '../components/data/localData.jsx';
import { useLessonPlans } from '../components/data/useLocalStorage.jsx';
import { Plus, Calendar, Trash2, Edit2, Clock, Target, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

const emptyForm = {
  title: '',
  subject: '',
  grade_level: '',
  duration: '',
  objectives: [''],
  materials: [''],
  lesson_outline: '',
  teacher_actions: '',
  student_actions: '',
  assessment_method: '',
  notes: '',
  techniques_used: [],
};

export default function LessonPlanner() {
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const { lessonPlans, createPlan, updatePlan, deletePlan } = useLessonPlans();
  const techniques = techniquesData;

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingPlan(null);
    setShowForm(false);
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      ...plan,
      objectives: plan.objectives?.length ? plan.objectives : [''],
      materials: plan.materials?.length ? plan.materials : [''],
      techniques_used: plan.techniques_used || [],
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      objectives: formData.objectives.filter(o => o.trim()),
      materials: formData.materials.filter(m => m.trim()),
    };
    if (editingPlan) {
      updatePlan(editingPlan.id, cleanedData);
    } else {
      createPlan(cleanedData);
    }
    resetForm();
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const updateArrayItem = (field, index, value) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Планировщик уроков</h1>
          <p className="text-slate-600">Создавайте и управляйте планами уроков</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 px-6"
        >
          <Plus className="w-5 h-5 mr-2" />
          Новый план урока
        </Button>
      </div>

      {/* Lesson Plans Grid */}
      {lessonPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {lessonPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{plan.title}</h3>
                    <p className="text-slate-500 text-sm">{plan.subject}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePlan(plan.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {plan.grade_level && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Target className="w-4 h-4 text-slate-400" />
                      Класс {plan.grade_level}
                    </div>
                  )}
                  {plan.duration && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {plan.duration}
                    </div>
                  )}
                  {plan.objectives?.length > 0 && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <FileText className="w-4 h-4 text-slate-400" />
                      {plan.objectives.length} цел{plan.objectives.length === 1 ? 'ь' : 'и'}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {plan.created_date ? format(new Date(plan.created_date), 'MMM d, yyyy') : ''}
                  </span>
                  {plan.techniques_used?.length > 0 && (
                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                      {plan.techniques_used.length} техник{plan.techniques_used.length === 1 ? 'а' : ''}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-2xl border border-slate-200"
        >
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Планов уроков пока нет</h3>
          <p className="text-slate-500 mb-6">Создайте свой первый план урока, чтобы начать</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Создать план урока
          </Button>
        </motion.div>
      )}

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPlan ? 'Редактировать план урока' : 'Создать новый план урока'}</DialogTitle>
            <DialogDescription>Заполните данные для вашего плана урока</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Название урока *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="напр., Введение в дроби"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="subject">Предмет *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="напр., Математика"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="grade_level">Класс</Label>
                <Input
                  id="grade_level"
                  value={formData.grade_level}
                  onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                  placeholder="напр., 4 класс"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="duration">Продолжительность</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="напр., 45 минут"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Используемые техники</Label>
                <Select
                  value={formData.techniques_used[0] || ''}
                  onValueChange={(value) => setFormData({ ...formData, techniques_used: [value] })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите технику" />
                  </SelectTrigger>
                  <SelectContent>
                    {techniques.map((tech) => (
                      <SelectItem key={tech.id} value={tech.id}>
                        {tech.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Objectives */}
            <div>
              <Label>Цели обучения</Label>
              <div className="space-y-2 mt-1">
                {formData.objectives.map((obj, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={obj}
                      onChange={(e) => updateArrayItem('objectives', index, e.target.value)}
                      placeholder={`Цель ${index + 1}`}
                    />
                    {formData.objectives.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('objectives', index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('objectives')}>
                  <Plus className="w-4 h-4 mr-1" /> Добавить цель
                </Button>
              </div>
            </div>

            {/* Materials */}
            <div>
              <Label>Необходимые материалы</Label>
              <div className="space-y-2 mt-1">
                {formData.materials.map((mat, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={mat}
                      onChange={(e) => updateArrayItem('materials', index, e.target.value)}
                      placeholder={`Материал ${index + 1}`}
                    />
                    {formData.materials.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('materials', index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('materials')}>
                  <Plus className="w-4 h-4 mr-1" /> Добавить материал
                </Button>
              </div>
            </div>

            {/* Lesson Outline */}
            <div>
              <Label htmlFor="lesson_outline">Структура урока</Label>
              <Textarea
                id="lesson_outline"
                value={formData.lesson_outline}
                onChange={(e) => setFormData({ ...formData, lesson_outline: e.target.value })}
                placeholder="Опишите ход вашего урока..."
                rows={4}
                className="mt-1"
              />
            </div>

            {/* Teacher Actions */}
            <div>
              <Label htmlFor="teacher_actions">Действия педагога</Label>
              <Textarea
                id="teacher_actions"
                value={formData.teacher_actions}
                onChange={(e) => setFormData({ ...formData, teacher_actions: e.target.value })}
                placeholder="Что делает учитель на уроке..."
                rows={3}
                className="mt-1"
              />
            </div>

            {/* Student Actions */}
            <div>
              <Label htmlFor="student_actions">Действия ученика</Label>
              <Textarea
                id="student_actions"
                value={formData.student_actions}
                onChange={(e) => setFormData({ ...formData, student_actions: e.target.value })}
                placeholder="Что делают ученики на уроке..."
                rows={3}
                className="mt-1"
              />
            </div>

            {/* Assessment */}
            <div>
              <Label htmlFor="assessment_method">Метод оценивания</Label>
              <Textarea
                id="assessment_method"
                value={formData.assessment_method}
                onChange={(e) => setFormData({ ...formData, assessment_method: e.target.value })}
                placeholder="Как вы будете оценивать знания учеников?"
                rows={2}
                className="mt-1"
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Дополнительные заметки</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Любые дополнительные заметки или напоминания..."
                rows={2}
                className="mt-1"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={resetForm}>
                Отмена
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                {editingPlan ? 'Сохранить' : 'Создать план'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}