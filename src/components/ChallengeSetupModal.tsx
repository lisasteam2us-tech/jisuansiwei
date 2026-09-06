import React, { useState, useEffect } from 'react';
import { GradeLevel } from '../types';
import { sounds } from '../utils/audio';
import {
  Sparkles,
  Rocket,
  X,
  Dice5,
  Calendar,
  Layers,
  Award,
  Flame,
  CheckCircle2,
  Brain,
  HelpCircle
} from 'lucide-react';
import { ALL_BEBRAS_QUESTIONS } from '../data/questions';

interface ChallengeSetupModalProps {
  isOpen: boolean;
  initialGrade?: GradeLevel;
  onClose: () => void;
  onConfirm: (config: {
    gradeLevel: GradeLevel;
    count: number;
    yearFilter: 'all' | '2023' | '2024' | '2025' | '经典';
  }) => void;
}

export const ChallengeSetupModal: React.FC<ChallengeSetupModalProps> = ({
  isOpen,
  initialGrade = '3-4',
  onClose,
  onConfirm,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const [selectedCount, setSelectedCount] = useState<number>(5);
  const [selectedYear, setSelectedYear] = useState<'all' | '2023' | '2024' | '2025' | '经典'>('all');

  useEffect(() => {
    if (initialGrade) {
      setSelectedGrade(initialGrade);
    }
  }, [initialGrade, isOpen]);

  if (!isOpen) return null;

  // Calculate available matching question count in real-time
  const matchedCount = ALL_BEBRAS_QUESTIONS.filter((q) => {
    if (q.gradeLevel !== selectedGrade) return false;
    if (selectedYear !== 'all') {
      if (selectedYear === '经典') return !q.year || q.year === '经典';
      return q.year === selectedYear;
    }
    return true;
  }).length;

  const handleStart = () => {
    sounds.playLockSuccess();
    onConfirm({
      gradeLevel: selectedGrade,
      count: selectedCount,
      yearFilter: selectedYear,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-white w-full max-w-xl rounded-[36px] border-4 border-white shadow-2xl overflow-hidden flex flex-col relative max-h-[92vh] overflow-y-auto">
        {/* Header with Playful Theme */}
        <div className="bg-gradient-to-r from-[#006d33] via-[#07C160] to-[#4FC3F7] p-6 text-white relative">
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/25 text-white text-xs px-3 py-1 rounded-full font-black flex items-center gap-1">
              <Dice5 className="w-3.5 h-3.5" />
              <span>智能组卷系统</span>
            </span>
            <span className="bg-[#FFD54F] text-[#574500] text-xs px-2.5 py-0.5 rounded-full font-black">
              2023-2025 真题已收录
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
            <span>定制你的思维闯关挑战</span>
            <Sparkles className="w-6 h-6 text-[#FFD54F] animate-pulse" />
          </h3>
          <p className="text-xs sm:text-sm text-white/90 font-medium mt-1">
            选择你的年级与题目数量，AI 将从 Bebras 题库中随机抽取最佳挑战！
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          {/* Step 1: Age / Grade Selection */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm sm:text-base font-black text-[#1b1c1c] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#006d33] text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <span>选择适龄段 / 营地</span>
              </label>
              <span className="text-xs font-bold text-[#6c7b6c]">
                权威年级分层设计
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  id: '1-2' as GradeLevel,
                  title: '1-2 年级',
                  subtitle: '启蒙发现岛',
                  desc: '趣味感知 · 生活侦探',
                  badge: '萌新',
                  color: 'hover:border-[#FFD54F] border-[#efeded]',
                  activeColor: 'border-[#f57f17] bg-[#fffde7] text-[#735c00] ring-2 ring-[#f57f17]/30',
                },
                {
                  id: '3-4' as GradeLevel,
                  title: '3-4 年级',
                  subtitle: '编码探险林',
                  desc: '逻辑分支 · 密码破译',
                  badge: '热门',
                  color: 'hover:border-[#07C160] border-[#efeded]',
                  activeColor: 'border-[#006d33] bg-[#e8f5e9] text-[#006d33] ring-2 ring-[#006d33]/30',
                },
                {
                  id: '5-6' as GradeLevel,
                  title: '5-6 年级',
                  subtitle: '算法极客港',
                  desc: '高阶图论 · 动态规划',
                  badge: '高阶',
                  color: 'hover:border-[#4FC3F7] border-[#efeded]',
                  activeColor: 'border-[#006688] bg-[#e0f7fa] text-[#006688] ring-2 ring-[#006688]/30',
                },
              ].map((g) => {
                const isSelected = selectedGrade === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => {
                      sounds.playSelect();
                      setSelectedGrade(g.id);
                    }}
                    className={`p-3 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center relative ${
                      isSelected ? g.activeColor : `bg-white ${g.color}`
                    }`}
                  >
                    <div className="absolute top-2 right-2">
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#006d33] fill-[#07C160]" />
                      )}
                    </div>
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-black/5 mb-1">
                      {g.badge}
                    </span>
                    <h4 className="font-black text-sm sm:text-base">{g.title}</h4>
                    <p className="text-[11px] font-bold opacity-80 mt-0.5">{g.subtitle}</p>
                    <span className="text-[10px] text-gray-500 mt-1 hidden sm:inline">
                      {g.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Question Count Selection */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm sm:text-base font-black text-[#1b1c1c] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#006d33] text-white text-xs font-black flex items-center justify-center">
                  2
                </span>
                <span>选择挑战题目数量</span>
              </label>
              <span className="text-xs font-bold text-[#006d33]">
                预估耗时约 {selectedCount * 2} 分钟
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {[
                { count: 3, label: '3 题', desc: '极速热身', time: '5分钟' },
                { count: 5, label: '5 题', desc: '标准闯关', time: '10分钟', popular: true },
                { count: 10, label: '10 题', desc: '深度挑战', time: '20分钟' },
                { count: 15, label: '15 题', desc: '全真测评', time: '30分钟' },
              ].map((c) => {
                const isSelected = selectedCount === c.count;
                return (
                  <div
                    key={c.count}
                    onClick={() => {
                      sounds.playSelect();
                      setSelectedCount(c.count);
                    }}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center relative ${
                      isSelected
                        ? 'border-[#006d33] bg-[#e8f5e9] text-[#006d33] ring-2 ring-[#006d33]/20'
                        : 'border-[#efeded] bg-white hover:border-[#07C160]/50'
                    }`}
                  >
                    {c.popular && (
                      <span className="absolute -top-2.5 bg-[#f57f17] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-xs">
                        推荐
                      </span>
                    )}
                    <span className="text-base sm:text-lg font-black">{c.label}</span>
                    <span className="text-[11px] font-bold text-gray-600">{c.desc}</span>
                    <span className="text-[9px] text-gray-400 mt-0.5">{c.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Year / True Question Set Selection */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-black text-[#1b1c1c] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#006d33]" />
                <span>真题年份筛选（可选）</span>
              </label>
              <span className="text-xs font-bold text-[#6c7b6c]">
                当前题库中匹配到 <span className="text-[#006d33] font-black">{matchedCount}</span> 道题
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[
                { id: 'all' as const, label: '全部真题' },
                { id: '2025' as const, label: '2025最新' },
                { id: '2024' as const, label: '2024精选' },
                { id: '2023' as const, label: '2023精选' },
                { id: '经典' as const, label: '经典宝库' },
              ].map((y) => {
                const isSelected = selectedYear === y.id;
                return (
                  <button
                    key={y.id}
                    onClick={() => {
                      sounds.playTap();
                      setSelectedYear(y.id);
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#006d33] text-white border-[#006d33] shadow-xs'
                        : 'bg-[#f5f3f3] text-[#3d4a3d] border-transparent hover:bg-[#e8f5e9]'
                    }`}
                  >
                    {y.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Summary Pill */}
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#166534]">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#07C160] shrink-0" />
              <span>
                将生成包含 <strong className="font-black text-[#006d33]">{selectedCount}</strong> 道
                【{selectedGrade}年级·{selectedYear === 'all' ? '综合真题' : selectedYear + '年度'}】的随机闯关试卷
              </span>
            </div>
          </div>

          {/* Action Launch Button */}
          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-[#006d33] to-[#07C160] hover:brightness-110 active:scale-[0.98] text-white font-black text-lg py-4 rounded-2xl shadow-[0_6px_0_0_#00471f] hover:shadow-[0_8px_0_0_#00471f] transition-all flex items-center justify-center gap-3 cursor-pointer border-2 border-white/20"
          >
            <Rocket className="w-6 h-6 animate-bounce" />
            <span>立即生成并开始挑战</span>
          </button>
        </div>
      </div>
    </div>
  );
};
