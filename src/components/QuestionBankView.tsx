import React, { useState, useMemo } from 'react';
import { ALL_BEBRAS_QUESTIONS } from '../data/questions';
import { Question, GradeLevel, CTDimension, BebrasCategory } from '../types';
import { DynamicClueIllustration } from './DynamicClueIllustration';
import { InformaticsCardModal } from './InformaticsCardModal';
import { ScratchpadModal } from './ScratchpadModal';
import { sounds } from '../utils/audio';
import {
  Search,
  Filter,
  Sparkles,
  Shuffle,
  Brain,
  Cpu,
  Layers,
  Globe2,
  Heart,
  BookOpen,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface QuestionBankViewProps {
  onStartQuestWithQuestions: (questions: Question[], startIndex?: number) => void;
  onBackToLobby: () => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  onStartQuestWithQuestions,
  onBackToLobby,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedDimension, setSelectedDimension] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | 'all'>('all');

  // Modals for inspection
  const [previewConceptQuestion, setPreviewConceptQuestion] = useState<Question | null>(null);
  const [previewExplanationQuestion, setPreviewExplanationQuestion] = useState<Question | null>(null);
  const [scratchpadQuestion, setScratchpadQuestion] = useState<Question | null>(null);

  // Filter logic
  const filteredQuestions = useMemo(() => {
    return ALL_BEBRAS_QUESTIONS.filter((q) => {
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchStem = q.stemText.toLowerCase().includes(query);
        const matchCategory = q.category.toLowerCase().includes(query);
        const matchConcept = q.informaticsConcept?.title.toLowerCase().includes(query) || false;
        const matchStory = q.storyContext?.toLowerCase().includes(query) || false;
        const matchYear = q.year?.toLowerCase().includes(query) || false;
        if (!matchStem && !matchCategory && !matchConcept && !matchStory && !matchYear) {
          return false;
        }
      }

      // Grade match
      if (selectedGrade !== 'all' && q.gradeLevel !== selectedGrade) {
        return false;
      }

      // Year match
      if (selectedYear !== 'all') {
        if (selectedYear === '经典') {
          if (q.year && q.year !== '经典') return false;
        } else if (q.year !== selectedYear) {
          return false;
        }
      }

      // Dimension match
      if (selectedDimension !== 'all' && q.domain !== selectedDimension && q.dimension !== selectedDimension) {
        return false;
      }

      // Category match
      if (selectedCategory !== 'all' && q.category !== selectedCategory) {
        return false;
      }

      // Difficulty match
      if (selectedDifficulty !== 'all' && q.difficultyHearts !== selectedDifficulty) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedGrade, selectedYear, selectedDimension, selectedCategory, selectedDifficulty]);

  // Quick action: Draw Random Quest (5 or 10 questions)
  const handleStartRandomDraw = (count: number = 5) => {
    sounds.playLockSuccess();
    const sourcePool = filteredQuestions.length >= 3 ? filteredQuestions : ALL_BEBRAS_QUESTIONS;
    const shuffled = [...sourcePool].sort(() => Math.random() - 0.5);
    const drawn = shuffled.slice(0, Math.min(count, shuffled.length)).map((q, idx) => ({
      ...q,
      taskNumber: idx + 1,
      totalTasks: Math.min(count, shuffled.length),
    }));
    onStartQuestWithQuestions(drawn);
  };

  // Quick action: Practice single question or specific list
  const handlePracticeSingleQuestion = (question: Question) => {
    sounds.playTap();
    const list = filteredQuestions.length > 0 ? filteredQuestions : [question];
    const targetIdx = list.findIndex((item) => item.id === question.id);
    onStartQuestWithQuestions(list, targetIdx >= 0 ? targetIdx : 0);
  };

  // Dimension color mapping
  const getDimensionBadgeStyle = (dim?: CTDimension) => {
    switch (dim) {
      case '逻辑思维':
        return 'bg-[#dcfce7] text-[#166534] border-[#86efac]';
      case '算法理解':
        return 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]';
      case '数据处理':
        return 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]';
      case '创新应用':
      default:
        return 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]';
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Scratchpad and Concept Modals */}
      {scratchpadQuestion && (
        <ScratchpadModal
          isOpen={!!scratchpadQuestion}
          onClose={() => setScratchpadQuestion(null)}
          questionStem={scratchpadQuestion.stemText}
          taskNumber={scratchpadQuestion.id}
        />
      )}

      {previewConceptQuestion && (
        <InformaticsCardModal
          isOpen={!!previewConceptQuestion}
          onClose={() => setPreviewConceptQuestion(null)}
          concept={previewConceptQuestion.informaticsConcept}
          questionTitle={previewConceptQuestion.stemText}
        />
      )}

      {/* Full Question Inspection & Explanation Modal */}
      {previewExplanationQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border-4 border-[#07C160] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#07C160] to-[#059669] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-yellow-300" />
                <span className="font-black text-base">
                  #{previewExplanationQuestion.id} {previewExplanationQuestion.title || previewExplanationQuestion.stemText}
                </span>
              </div>
              <button
                onClick={() => setPreviewExplanationQuestion(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-black flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-left">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200">
                  {previewExplanationQuestion.gradeLevel}年级 · {previewExplanationQuestion.domain}
                </span>
                <span className="bg-purple-50 text-purple-800 text-xs font-black px-3 py-1 rounded-full border border-purple-200">
                  细分子技能：{previewExplanationQuestion.subSkill}
                </span>
                <span className="bg-amber-50 text-amber-800 text-xs font-black px-3 py-1 rounded-full border border-amber-200">
                  {previewExplanationQuestion.source || `${previewExplanationQuestion.year}真题`}
                </span>
              </div>

              {/* Story Context */}
              {previewExplanationQuestion.storyContext && (
                <div className="bg-sky-50/70 p-3.5 rounded-2xl border border-sky-200">
                  <div className="text-xs font-black text-sky-900 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-600" />
                    <span>情境故事背景</span>
                  </div>
                  <p className="text-xs text-sky-950 leading-relaxed font-medium">
                    {previewExplanationQuestion.storyContext}
                  </p>
                </div>
              )}

              {/* Stem Text */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div className="text-xs font-black text-gray-700 mb-1">完整题干描述：</div>
                <p className="text-sm font-bold text-gray-900 leading-relaxed">
                  {previewExplanationQuestion.stemText}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                <div className="text-xs font-black text-gray-700">选项列表：</div>
                {previewExplanationQuestion.options.map((opt) => (
                  <div
                    key={opt.key}
                    className={`p-3 rounded-2xl border text-xs flex items-start gap-3 ${
                      opt.key === previewExplanationQuestion.correctAnswer
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                        : 'bg-white border-gray-200 text-gray-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full font-black text-xs shrink-0 flex items-center justify-center ${
                        opt.key === previewExplanationQuestion.correctAnswer
                          ? 'bg-[#07C160] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <div>
                      <div className="font-black text-sm">{opt.label}</div>
                      {opt.description && (
                        <div className="text-xs text-gray-500 mt-0.5">{opt.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Correct Answer & Explanation */}
              <div className="bg-emerald-50/80 p-4 rounded-2xl border-2 border-emerald-300 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#07C160]" />
                  <span>正确答案：{previewExplanationQuestion.correctAnswer}</span>
                </div>
                <div className="text-xs text-emerald-950 leading-relaxed font-medium whitespace-pre-wrap">
                  {previewExplanationQuestion.explanation}
                </div>
              </div>

              {/* Mistake Reason */}
              {previewExplanationQuestion.mistakeReason && (
                <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200">
                  <div className="text-xs font-black text-amber-900 mb-1">⚠️ 典型思维误区成因剖析：</div>
                  <p className="text-xs text-amber-950 leading-relaxed font-medium">
                    {previewExplanationQuestion.mistakeReason}
                  </p>
                </div>
              )}

              {/* CS Concept */}
              {previewExplanationQuestion.informaticsConcept && (
                <div className="bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-200">
                  <div className="text-xs font-black text-indigo-900 mb-1">
                    💡 计算机科学原理：{previewExplanationQuestion.informaticsConcept.title}
                  </div>
                  <p className="text-xs text-indigo-950 leading-relaxed font-medium">
                    {previewExplanationQuestion.informaticsConcept.coreConcept}
                  </p>
                  <p className="text-[11px] text-indigo-700 mt-1 font-bold">
                    现实应用：{previewExplanationQuestion.informaticsConcept.realWorldApplication}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setPreviewExplanationQuestion(null)}
                className="bg-[#07C160] hover:bg-[#059669] text-white px-6 py-2 rounded-full font-black text-xs cursor-pointer shadow-xs"
              >
                完成审查
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#07C160] via-[#059669] to-[#047857] rounded-[36px] p-6 sm:p-10 text-white shadow-[0_12px_0_0_#064e3b] mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Brain className="w-96 h-96 -rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-3 border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>Bebras 国际计算思维题库中心</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              探索海量计算思维题库 · 启迪科学灵感
            </h1>
            <p className="text-sm sm:text-base text-white/90 font-medium mt-2 max-w-2xl">
              精选 Bebras 经典图文算法与逻辑模型，融合“It's Informatics!”计算机科学底层解析，支持多维分类筛选与智能随机抽题。
            </p>
          </div>

          {/* Quick Random Draw Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => handleStartRandomDraw(5)}
              className="w-full sm:w-auto bg-[#FFD54F] hover:bg-[#ffca28] text-[#574500] px-5 py-3.5 rounded-full font-black text-sm sm:text-base shadow-[0_4px_0_0_#ebc23e] active:translate-y-1 active:shadow-none cursor-pointer flex items-center justify-center gap-2 transition-all"
            >
              <Shuffle className="w-5 h-5 text-[#574500]" />
              <span>🎲 随机抽取 5 题急速闯关</span>
            </button>

            <button
              onClick={() => handleStartRandomDraw(10)}
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-[#006d33] px-5 py-3.5 rounded-full font-black text-sm sm:text-base shadow-[0_4px_0_0_#cbd5e1] active:translate-y-1 active:shadow-none cursor-pointer flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-5 h-5 text-[#07C160]" />
              <span>🚀 抽取 10 题标准试卷</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <span className="text-xs text-white/80 font-bold">📚 题库总题量</span>
            <div className="text-2xl font-black text-white mt-0.5">{ALL_BEBRAS_QUESTIONS.length} 道</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <span className="text-xs text-white/80 font-bold">🧠 逻辑思维题</span>
            <div className="text-2xl font-black text-white mt-0.5">
              {ALL_BEBRAS_QUESTIONS.filter((q) => q.dimension === '逻辑思维').length} 道
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <span className="text-xs text-white/80 font-bold">⚡ 算法理解题</span>
            <div className="text-2xl font-black text-white mt-0.5">
              {ALL_BEBRAS_QUESTIONS.filter((q) => q.dimension === '算法理解').length} 道
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <span className="text-xs text-white/80 font-bold">💾 数据与创新</span>
            <div className="text-2xl font-black text-white mt-0.5">
              {ALL_BEBRAS_QUESTIONS.filter((q) => q.dimension === '数据处理' || q.dimension === '创新应用').length} 道
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-[28px] p-6 border-4 border-[#efeded] shadow-[0_8px_0_0_#e3e2e2] mb-8 space-y-5">
        {/* Search & Reset */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索题目、故事背景或计算机科学原理..."
              className="w-full pl-11 pr-4 py-3 bg-[#f8fafc] rounded-full border-2 border-gray-200 focus:border-[#07C160] focus:bg-white text-sm font-bold text-gray-800 outline-hidden transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-black text-gray-500">
              已筛选出 <span className="text-[#07C160] text-sm">{filteredQuestions.length}</span> 道题目
            </span>
            {(selectedGrade !== 'all' ||
              selectedDimension !== 'all' ||
              selectedCategory !== 'all' ||
              selectedDifficulty !== 'all' ||
              searchQuery) && (
              <button
                onClick={() => {
                  sounds.playTap();
                  setSelectedGrade('all');
                  setSelectedDimension('all');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="text-xs font-black text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full border border-red-200 cursor-pointer flex items-center gap-1 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重置筛选</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Tags: Grade */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100">
          <span className="text-xs font-black text-gray-500 shrink-0 mr-1">年级段：</span>
          {[
            { id: 'all', label: '全部年级' },
            { id: '1-2', label: '🏝️ 1-2年级 启蒙岛' },
            { id: '3-4', label: '🏕️ 3-4年级 探险林' },
            { id: '5-6', label: '🚀 5-6年级 极客港' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sounds.playTap();
                setSelectedGrade(item.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black border-2 cursor-pointer transition-all ${
                selectedGrade === item.id
                  ? 'bg-[#07C160] text-white border-[#006d33] shadow-xs'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Filter Tags: Year */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-black text-gray-500 shrink-0 mr-1">年份真题：</span>
          {[
            { id: 'all', label: '全部年份' },
            { id: '2025', label: '🌟 2025 真题' },
            { id: '2024', label: '🎯 2024 真题' },
            { id: '2023', label: '🏆 2023 真题' },
            { id: '2022', label: '⚡ 2022 真题' },
            { id: '2021', label: '🌱 2021 真题' },
            { id: '经典', label: '🏛️ 经典题库' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sounds.playTap();
                setSelectedYear(item.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black border-2 cursor-pointer transition-all ${
                selectedYear === item.id
                  ? 'bg-[#8b5cf6] text-white border-[#6d28d9] shadow-xs'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Filter Tags: CT Dimension */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-black text-gray-500 shrink-0 mr-1">思维维度：</span>
          {[
            { id: 'all', label: '全部维度' },
            { id: '逻辑思维', label: '🧠 逻辑思维' },
            { id: '算法理解', label: '⚡ 算法理解' },
            { id: '数据处理', label: '💾 数据处理' },
            { id: '创新应用', label: '✨ 创新应用' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sounds.playTap();
                setSelectedDimension(item.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black border-2 cursor-pointer transition-all ${
                selectedDimension === item.id
                  ? 'bg-[#3b82f6] text-white border-[#1d4ed8] shadow-xs'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Filter Tags: Knowledge Category */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-black text-gray-500 shrink-0 mr-1">知识领域：</span>
          {[
            { id: 'all', label: '全部领域' },
            { id: '模式识别', label: '🔍 模式识别' },
            { id: '算法设计', label: '⚙️ 算法设计' },
            { id: '数据编码', label: '🔢 数据编码' },
            { id: '图论网络', label: '🌐 图论网络' },
            { id: '逻辑抽象', label: '🧩 逻辑抽象' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sounds.playTap();
                setSelectedCategory(item.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black border-2 cursor-pointer transition-all ${
                selectedCategory === item.id
                  ? 'bg-[#f59e0b] text-white border-[#b45309] shadow-xs'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Grid */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-[32px] p-12 text-center border-4 border-dashed border-gray-300">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl mx-auto mb-3">
            🔍
          </div>
          <h3 className="text-lg font-black text-gray-800">没有找到匹配的 Bebras 题目</h3>
          <p className="text-sm text-gray-500 mt-1">请尝试切换筛选标签或清除搜索关键词。</p>
          <button
            onClick={() => {
              setSelectedGrade('all');
              setSelectedDimension('all');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
            }}
            className="mt-4 bg-[#07C160] text-white px-6 py-2 rounded-full font-black text-xs cursor-pointer shadow-xs"
          >
            重置所有筛选
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-[32px] p-6 border-4 border-[#efeded] shadow-[0_8px_0_0_#e3e2e2] hover:shadow-[0_12px_0_0_#07C160] hover:border-[#bbf7d0] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#f1f5f9] text-[#334155] text-xs font-black px-3 py-1 rounded-full border border-gray-200">
                      #{q.id} {q.gradeLevel ? `${q.gradeLevel}年级` : ''}
                    </span>
                    {q.year && (
                      <span
                        className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                          q.year === '2025'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : q.year === '2024'
                            ? 'bg-blue-100 text-blue-900 border-blue-300'
                            : q.year === '2023'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        {q.year}真题
                      </span>
                    )}
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full border ${getDimensionBadgeStyle(
                        q.dimension
                      )}`}
                    >
                      {q.dimension}
                    </span>
                    <span className="bg-[#faf5ff] text-[#7e22ce] text-xs font-black px-2.5 py-0.5 rounded-md border border-[#f3e8ff]">
                      {q.category}
                    </span>
                  </div>

                  {/* Difficulty Hearts */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((star) => (
                      <Heart
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= q.difficultyHearts
                            ? 'text-[#FF8A80] fill-[#FF8A80]'
                            : 'text-gray-200 fill-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Stem Title */}
                <h3 className="text-base sm:text-lg font-black text-[#1b1c1c] leading-snug group-hover:text-[#006d33] transition-colors mb-2">
                  {q.stemText}
                </h3>

                {/* Story context snippet */}
                {q.storyContext && (
                  <p className="text-xs text-gray-500 font-medium mb-4 line-clamp-2 bg-[#f8fafc] p-2.5 rounded-xl border border-gray-100">
                    📖 {q.storyContext}
                  </p>
                )}

                {/* Options Preview Mini */}
                <div className="space-y-1.5 mb-4">
                  {q.options.map((opt) => (
                    <div
                      key={opt.key}
                      className="text-xs font-medium text-gray-700 bg-gray-50 hover:bg-[#f0fdf4] px-3 py-1.5 rounded-xl flex items-center gap-2 border border-gray-100"
                    >
                      <span className="w-5 h-5 rounded-full bg-white font-black text-gray-600 flex items-center justify-center border border-gray-200 text-[10px]">
                        {opt.key}
                      </span>
                      <span className="line-clamp-1">{opt.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons at bottom of card */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {/* Explanation & Review Button */}
                  <button
                    onClick={() => {
                      sounds.playTap();
                      setPreviewExplanationQuestion(q);
                    }}
                    className="text-xs font-black text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-full border border-emerald-300 cursor-pointer flex items-center gap-1 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>题解审查</span>
                  </button>

                  {/* Informatics Principle Button */}
                  {q.informaticsConcept && (
                    <button
                      onClick={() => {
                        sounds.playTap();
                        setPreviewConceptQuestion(q);
                      }}
                      className="text-xs font-black text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-full border border-blue-200 cursor-pointer flex items-center gap-1 transition-all"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>CS 原理</span>
                    </button>
                  )}

                  {/* Scratchpad Button */}
                  <button
                    onClick={() => {
                      sounds.playTap();
                      setScratchpadQuestion(q);
                    }}
                    className="text-xs font-black text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-full border border-amber-200 cursor-pointer flex items-center gap-1 transition-all"
                  >
                    <span>📝 草稿</span>
                  </button>
                </div>

                {/* Start single question practice */}
                <button
                  onClick={() => handlePracticeSingleQuestion(q)}
                  className="bg-[#07C160] hover:bg-[#059669] text-white text-xs font-black px-4 py-2 rounded-full shadow-[0_3px_0_0_#004d24] active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <span>立即演练</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
