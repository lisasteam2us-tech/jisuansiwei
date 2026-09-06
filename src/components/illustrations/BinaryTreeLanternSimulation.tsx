import React, { useState } from 'react';
import { Sparkles, RotateCcw, Zap, HelpCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const BinaryTreeLanternSimulation: React.FC = () => {
  // Default to question state: Left ON (4), Center ON (2), Right OFF (0)
  const [leftOn, setLeftOn] = useState<boolean>(true);
  const [centerOn, setCenterOn] = useState<boolean>(true);
  const [rightOn, setRightOn] = useState<boolean>(false);

  const isQuestionDefaultState = leftOn && centerOn && !rightOn;

  const handleToggleLeft = () => {
    sounds.playSelect();
    setLeftOn((prev) => !prev);
  };

  const handleToggleCenter = () => {
    sounds.playSelect();
    setCenterOn((prev) => !prev);
  };

  const handleToggleRight = () => {
    sounds.playSelect();
    setRightOn((prev) => !prev);
  };

  const handleResetToProblem = () => {
    sounds.playTap();
    setLeftOn(true);
    setCenterOn(true);
    setRightOn(false);
  };

  // Sandbox explored sum (only calculated if student experiments away from question state)
  const exploredSum =
    (leftOn ? 4 : 0) +
    (centerOn ? 2 : 0) +
    (rightOn ? 1 : 0);

  return (
    <div className="w-full h-full flex flex-col justify-between select-none py-1">
      {/* Clue Badge Top Row */}
      <div className="flex items-center justify-between w-full mb-2.5 px-1 shrink-0">
        <div className="flex items-center gap-2 bg-amber-100 text-amber-950 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black border border-amber-300 shadow-2xs">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
          <span>规则：左灯 = 4 个 · 中灯 = 2 个 · 右灯 = 1 个</span>
        </div>
        {!isQuestionDefaultState ? (
          <button
            onClick={handleResetToProblem}
            className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-full border border-emerald-300 cursor-pointer shadow-2xs transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置题目灯光 (💡💡⚪)</span>
          </button>
        ) : (
          <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1">
            <span>题目当前灯光状态</span>
          </span>
        )}
      </div>

      {/* Main Interactive Stage Box (Expanded to fill Left Wing) */}
      <div className="w-full flex-1 bg-gradient-to-b from-[#f0fdf4] via-white to-[#ecfdf5] rounded-3xl p-4 sm:p-5 border-3 border-[#86efac] shadow-[0_8px_0_0_#4ade80] flex flex-col justify-between gap-3">
        {/* Hanging Ceiling Wire */}
        <div className="w-full flex items-center justify-between px-10 sm:px-16 -mb-2 relative">
          <div className="absolute left-8 right-8 top-1.5 h-1.5 bg-[#cbd5e1] rounded-full"></div>
          {/* Wire 1 */}
          <div className="w-1 h-4 bg-[#94a3b8] rounded-full mx-auto z-10"></div>
          {/* Wire 2 */}
          <div className="w-1 h-4 bg-[#94a3b8] rounded-full mx-auto z-10"></div>
          {/* Wire 3 */}
          <div className="w-1 h-4 bg-[#94a3b8] rounded-full mx-auto z-10"></div>
        </div>

        {/* 3 Interactive Lanterns */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full z-10">
          {/* Left Lamp (Weight 4) */}
          <button
            onClick={handleToggleLeft}
            className={`group relative flex flex-col items-center p-3 sm:p-4 rounded-3xl border-3 transition-all cursor-pointer ${
              leftOn
                ? 'bg-gradient-to-b from-amber-50 to-amber-100 border-amber-400 shadow-[0_6px_16px_rgba(245,158,11,0.35)] scale-102 ring-4 ring-amber-200/50'
                : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-90 hover:border-gray-300'
            }`}
          >
            <div className="text-xs sm:text-sm font-black text-amber-900 bg-amber-200 px-3 py-1 rounded-full mb-1 border border-amber-300 shadow-2xs">
              🏮 左灯 · 4个
            </div>
            <div className="relative my-1">
              <span className={`text-4xl sm:text-5xl lg:text-6xl transition-transform block ${leftOn ? 'scale-110 drop-shadow-[0_0_12px_#f59e0b]' : 'grayscale opacity-50'}`}>
                {leftOn ? '💡' : '⚪'}
              </span>
              {leftOn && (
                <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-xs animate-ping pointer-events-none"></div>
              )}
            </div>
            <span className={`text-xs sm:text-sm font-black mt-1 ${leftOn ? 'text-amber-800' : 'text-gray-400'}`}>
              {leftOn ? '已点亮 (4)' : '已熄灭 (0)'}
            </span>
          </button>

          {/* Center Lamp (Weight 2) */}
          <button
            onClick={handleToggleCenter}
            className={`group relative flex flex-col items-center p-3 sm:p-4 rounded-3xl border-3 transition-all cursor-pointer ${
              centerOn
                ? 'bg-gradient-to-b from-amber-50 to-amber-100 border-amber-400 shadow-[0_6px_16px_rgba(245,158,11,0.35)] scale-102 ring-4 ring-amber-200/50'
                : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-90 hover:border-gray-300'
            }`}
          >
            <div className="text-xs sm:text-sm font-black text-amber-900 bg-amber-200 px-3 py-1 rounded-full mb-1 border border-amber-300 shadow-2xs">
              🏮 中灯 · 2个
            </div>
            <div className="relative my-1">
              <span className={`text-4xl sm:text-5xl lg:text-6xl transition-transform block ${centerOn ? 'scale-110 drop-shadow-[0_0_12px_#f59e0b]' : 'grayscale opacity-50'}`}>
                {centerOn ? '💡' : '⚪'}
              </span>
              {centerOn && (
                <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-xs animate-ping pointer-events-none"></div>
              )}
            </div>
            <span className={`text-xs sm:text-sm font-black mt-1 ${centerOn ? 'text-amber-800' : 'text-gray-400'}`}>
              {centerOn ? '已点亮 (2)' : '已熄灭 (0)'}
            </span>
          </button>

          {/* Right Lamp (Weight 1) */}
          <button
            onClick={handleToggleRight}
            className={`group relative flex flex-col items-center p-3 sm:p-4 rounded-3xl border-3 transition-all cursor-pointer ${
              rightOn
                ? 'bg-gradient-to-b from-amber-50 to-amber-100 border-amber-400 shadow-[0_6px_16px_rgba(245,158,11,0.35)] scale-102 ring-4 ring-amber-200/50'
                : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-90 hover:border-gray-300'
            }`}
          >
            <div className="text-xs sm:text-sm font-black text-amber-900 bg-amber-200 px-3 py-1 rounded-full mb-1 border border-amber-300 shadow-2xs">
              🏮 右灯 · 1个
            </div>
            <div className="relative my-1">
              <span className={`text-4xl sm:text-5xl lg:text-6xl transition-transform block ${rightOn ? 'scale-110 drop-shadow-[0_0_12px_#f59e0b]' : 'grayscale opacity-50'}`}>
                {rightOn ? '💡' : '⚪'}
              </span>
              {rightOn && (
                <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-xs animate-ping pointer-events-none"></div>
              )}
            </div>
            <span className={`text-xs sm:text-sm font-black mt-1 ${rightOn ? 'text-amber-800' : 'text-gray-400'}`}>
              {rightOn ? '已点亮 (1)' : '已熄灭 (0)'}
            </span>
          </button>
        </div>

        {/* Dynamic Fruit Harvest Matrix & Magic Basket */}
        <div className="w-full bg-[#f8fafc] rounded-2xl p-3 sm:p-4 border border-emerald-200 flex flex-col items-center gap-2">
          <div className="text-xs sm:text-sm font-black text-emerald-900 flex items-center justify-between w-full px-1">
            <span className="flex items-center gap-1.5">
              <span>🧺 采摘果子对应状态：</span>
            </span>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
              根据上方灯光亮灭
            </span>
          </div>

          {/* Fruit Bouncing Matrix */}
          <div className="grid grid-cols-3 gap-3 w-full text-center">
            {/* Left Fruits (4 Apples) */}
            <div className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-all ${leftOn ? 'bg-rose-50 border-rose-300 shadow-2xs' : 'bg-gray-50 border-dashed border-gray-200 opacity-40'}`}>
              <div className="flex items-center justify-center gap-1.5 flex-wrap min-h-[38px] sm:min-h-[44px]">
                {leftOn ? (
                  <>
                    <span className="text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: '0ms' }}>🍎</span>
                    <span className="text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: '100ms' }}>🍎</span>
                    <span className="text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: '200ms' }}>🍎</span>
                    <span className="text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: '300ms' }}>🍎</span>
                  </>
                ) : (
                  <span className="text-xs text-gray-400 font-bold">无果子 (0)</span>
                )}
              </div>
              <div className="text-xs sm:text-sm font-black text-rose-950 mt-1.5">
                {leftOn ? '4 个魔法苹果' : '0 个'}
              </div>
            </div>

            {/* Center Fruits (2 Oranges) */}
            <div className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-all ${centerOn ? 'bg-amber-50 border-amber-300 shadow-2xs' : 'bg-gray-50 border-dashed border-gray-200 opacity-40'}`}>
              <div className="flex items-center justify-center gap-1.5 flex-wrap min-h-[38px] sm:min-h-[44px]">
                {centerOn ? (
                  <>
                    <span className="text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: '150ms' }}>🍊</span>
                    <span className="text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: '250ms' }}>🍊</span>
                  </>
                ) : (
                  <span className="text-xs text-gray-400 font-bold">无果子 (0)</span>
                )}
              </div>
              <div className="text-xs sm:text-sm font-black text-amber-950 mt-1.5">
                {centerOn ? '2 个魔法甜橙' : '0 个'}
              </div>
            </div>

            {/* Right Fruits (1 Berry) */}
            <div className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-all ${rightOn ? 'bg-pink-50 border-pink-300 shadow-2xs' : 'bg-gray-50 border-dashed border-gray-200 opacity-40'}`}>
              <div className="flex items-center justify-center gap-1 flex-wrap min-h-[38px] sm:min-h-[44px]">
                {rightOn ? (
                  <span className="text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: '200ms' }}>🍓</span>
                ) : (
                  <span className="text-xs text-gray-400 font-bold">无果子 (0)</span>
                )}
              </div>
              <div className="text-xs sm:text-sm font-black text-pink-950 mt-1.5">
                {rightOn ? '1 个魔法草莓' : '0 个'}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Question Challenge Bar (Zero Answers Revealed in Assessment State) */}
        <div className="w-full bg-gradient-to-r from-[#07C160] to-[#059669] text-white px-5 py-3 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 shrink-0" />
            <span className="text-sm sm:text-base font-black tracking-wide">
              {isQuestionDefaultState ? (
                <span>题目运算：左灯 (4) + 中灯 (2) + 右灯 (0) = ❓</span>
              ) : (
                <span>自由试算：{leftOn ? '4' : '0'} + {centerOn ? '2' : '0'} + {rightOn ? '1' : '0'} = {exploredSum} 个</span>
              )}
            </span>
          </div>
          <div className="text-xs sm:text-sm font-black bg-white/25 px-3 py-1 rounded-full shadow-2xs shrink-0">
            {isQuestionDefaultState ? '请在右侧选择答案 🤔' : '试算探究中 🔍'}
          </div>
        </div>

        {/* Interactive Guidance */}
        <div className="text-xs font-bold text-slate-500 bg-slate-100/80 py-1.5 px-3.5 rounded-xl text-center w-full flex items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>结合上方点亮的魔法灯与每盏灯代表的果子数量，计算总共能摘几个果子吧！</span>
        </div>
      </div>
    </div>
  );
};
