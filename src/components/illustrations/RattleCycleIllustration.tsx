import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RefreshCw,
  Sparkles,
  HelpCircle,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  StretchHorizontal,
} from 'lucide-react';

/* ================= 5 色滚珠配置 ================= */
export type BallColor = 'red' | 'yellow' | 'green' | 'cyan' | 'purple';

export const BALL_COLOR_MAP: Record<
  BallColor,
  { name: string; bg: string; border: string; glow: string; text: string }
> = {
  red: { name: '红', bg: '#EF4444', border: '#B91C1C', glow: 'rgba(239, 68, 68, 0.4)', text: '#FFFFFF' },
  yellow: { name: '黄', bg: '#FBBF24', border: '#D97706', glow: 'rgba(251, 191, 36, 0.4)', text: '#78350F' },
  green: { name: '绿', bg: '#10B981', border: '#047857', glow: 'rgba(16, 185, 129, 0.4)', text: '#FFFFFF' },
  cyan: { name: '青', bg: '#06B6D4', border: '#0E7490', glow: 'rgba(6, 182, 212, 0.4)', text: '#FFFFFF' },
  purple: { name: '紫', bg: '#A855F7', border: '#7E22CE', glow: 'rgba(168, 85, 247, 0.4)', text: '#FFFFFF' },
};

// 循环模式基准
export const CYCLE_ORDER: BallColor[] = ['red', 'yellow', 'green', 'cyan', 'purple'];

// 滚珠项定义
export interface RattleItem {
  id: string;
  type: 'ball' | 'empty';
  color?: BallColor;
  emptyIndex?: number;
  label: string;
}

// 初始 10 个球位序列
export const INITIAL_RATTLE_TRACK: RattleItem[] = [
  { id: 'item-0', type: 'ball', color: 'red', label: '红' },
  { id: 'item-1', type: 'ball', color: 'yellow', label: '黄' },
  { id: 'item-2', type: 'ball', color: 'green', label: '绿' },
  { id: 'item-3', type: 'empty', emptyIndex: 1, label: '空位 ①' },
  { id: 'item-4', type: 'ball', color: 'purple', label: '紫' },
  { id: 'item-5', type: 'ball', color: 'red', label: '红' },
  { id: 'item-6', type: 'empty', emptyIndex: 2, label: '空位 ②' },
  { id: 'item-7', type: 'ball', color: 'green', label: '绿' },
  { id: 'item-8', type: 'ball', color: 'cyan', label: '青' },
  { id: 'item-9', type: 'ball', color: 'purple', label: '紫' },
];

// 单个立体透明滚珠
export const GlassBall: React.FC<{
  color?: BallColor;
  isEmpty?: boolean;
  emptyLabel?: string;
  size?: number;
  isSelected?: boolean;
  onClick?: () => void;
}> = ({ color, isEmpty = false, emptyLabel = '?', size = 32, isSelected = false, onClick }) => {
  if (isEmpty || !color) {
    return (
      <div
        onClick={onClick}
        style={{ width: size, height: size }}
        className={`rounded-full border-2 border-dashed border-sky-400 bg-sky-50/90 flex flex-col items-center justify-center cursor-pointer transition-all shadow-inner shrink-0 ${
          isSelected ? 'ring-4 ring-amber-400 scale-110 bg-amber-50 border-amber-500' : 'hover:scale-105'
        }`}
      >
        <span className="text-[12px] font-black text-sky-700">{emptyLabel}</span>
      </div>
    );
  }

  const conf = BALL_COLOR_MAP[color];

  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${conf.bg} 50%, ${conf.border} 100%)`,
        boxShadow: `0 3px 6px ${conf.glow}, inset 0 1px 2px rgba(255,255,255,0.7)`,
      }}
      className={`rounded-full border border-white/60 flex items-center justify-center cursor-pointer select-none shrink-0 transition-transform ${
        isSelected ? 'ring-4 ring-amber-400 scale-110' : 'hover:scale-105'
      }`}
      title={`${conf.name}色滚珠`}
    >
      <span className="text-[11px] font-black text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
        {conf.name}
      </span>
    </div>
  );
};

/* ================= 选项中的双空位预览组件 ================= */
export const OptionBallsPreview: React.FC<{
  firstColor: BallColor;
  secondColor: BallColor;
}> = ({ firstColor, secondColor }) => {
  return (
    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200 shadow-2xs">
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-bold text-slate-500">①</span>
        <GlassBall color={firstColor} size={20} />
      </div>
      <span className="text-slate-300 font-bold">|</span>
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-bold text-slate-500">②</span>
        <GlassBall color={secondColor} size={20} />
      </div>
    </div>
  );
};

/* ================= 1044 题 核心主图与动画交互组件 ================= */
export const RattleCycleIllustration: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [trackItems, setTrackItems] = useState<RattleItem[]>(INITIAL_RATTLE_TRACK);
  const [viewMode, setViewMode] = useState<'linear' | 'ring'>('linear');
  const [isShaking, setIsShaking] = useState(false);
  const [shiftCount, setShiftCount] = useState(0);

  // 向右滚动 1 格（头部移到末尾）
  const handleShiftRight = () => {
    setTrackItems((prev) => {
      const next = [...prev];
      const first = next.shift();
      if (first) next.push(first);
      return next;
    });
    setShiftCount((c) => c + 1);
  };

  // 向左滚动 1 格（末尾移到头部）
  const handleShiftLeft = () => {
    setTrackItems((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last) next.unshift(last);
      return next;
    });
    setShiftCount((c) => c - 1);
  };

  // 模拟摇晃动效（晃动管体并随机连续滚动若干格）
  const handleShake = () => {
    if (isShaking) return;
    setIsShaking(true);

    const steps = Math.floor(Math.random() * 3) + 2; // 滚动 2~4 格
    let count = 0;
    const interval = setInterval(() => {
      setTrackItems((prev) => {
        const next = [...prev];
        const first = next.shift();
        if (first) next.push(first);
        return next;
      });
      count++;
      setShiftCount((c) => c + 1);
      if (count >= steps) {
        clearInterval(interval);
        setTimeout(() => setIsShaking(false), 200);
      }
    }, 220);
  };

  // 重置回初始状态
  const handleReset = () => {
    setTrackItems(INITIAL_RATTLE_TRACK);
    setShiftCount(0);
    setSelectedSlot(null);
  };

  return (
    <div
      id="rattle-cycle-puzzle-display"
      className="w-full h-full flex flex-col p-2.5 bg-white text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200 shadow-xs justify-between gap-2"
    >
      {/* 1. 顶部标题与控制栏 */}
      <div className="w-full bg-cyan-50 rounded-xl px-3 py-1.5 border border-cyan-200 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <motion.div
            animate={isShaking ? { rotate: [0, -15, 15, -10, 10, 0] } : {}}
            transition={{ repeat: isShaking ? Infinity : 0, duration: 0.3 }}
          >
            <RefreshCw className="w-4 h-4 text-cyan-600" />
          </motion.div>
          <h3 className="text-xs sm:text-sm font-black text-cyan-950">
            小猴皮皮的五彩滚珠摇铃
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-cyan-800 font-bold border border-cyan-300">
            循环序列规律
          </span>
        </div>

        {/* 视图切换按钮：直线管道 / 环形圆盘 */}
        <div className="flex items-center gap-1 bg-white/80 p-0.5 rounded-lg border border-cyan-200">
          <button
            onClick={() => setViewMode('linear')}
            className={`px-2 py-1 rounded text-[10px] font-black flex items-center gap-1 transition-all ${
              viewMode === 'linear'
                ? 'bg-cyan-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-cyan-700'
            }`}
            title="直管视图"
          >
            <StretchHorizontal className="w-3 h-3" />
            <span>直管</span>
          </button>
          <button
            onClick={() => setViewMode('ring')}
            className={`px-2 py-1 rounded text-[10px] font-black flex items-center gap-1 transition-all ${
              viewMode === 'ring'
                ? 'bg-cyan-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-cyan-700'
            }`}
            title="环形跑道视图"
          >
            <CircleDot className="w-3 h-3" />
            <span>圆环</span>
          </button>
        </div>
      </div>

      {/* 2. 基准循环口诀栏（客观线索） */}
      <div className="w-full bg-slate-50/90 rounded-xl p-2 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-cyan-500 text-white font-black text-[10px] flex items-center justify-center">
            律
          </span>
          <span className="text-xs font-black text-slate-700">
            小球固定循环模式（5色循环周而复始）：
          </span>
        </div>

        {/* 5 色循环环带 */}
        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-cyan-200 shadow-2xs">
          {CYCLE_ORDER.map((c, i) => (
            <React.Fragment key={c}>
              <GlassBall color={c} size={20} />
              {i < CYCLE_ORDER.length - 1 && (
                <span className="text-slate-300 text-xs font-black">➔</span>
              )}
            </React.Fragment>
          ))}
          <span className="text-cyan-600 text-xs font-black ml-0.5">➔ ↺</span>
        </div>
      </div>

      {/* 3. 动态滚珠摇铃实物轨道区 */}
      <motion.div
        animate={
          isShaking
            ? {
                rotate: [0, -3, 3, -2, 2, 0],
                y: [0, -2, 2, -1, 1, 0],
              }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.3, repeat: isShaking ? Infinity : 0 }}
        className="w-full flex-1 bg-gradient-to-b from-sky-100/60 via-indigo-50/40 to-sky-50/60 rounded-2xl border-2 border-sky-200 p-3 flex flex-col justify-between min-h-[175px] relative overflow-hidden"
      >
        {/* 轨道顶栏控制栏 */}
        <div className="w-full flex items-center justify-between text-[11px] font-black text-sky-900 z-10">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>透明滚珠筒（可互动滚动体验规律）：</span>
          </span>

          {/* 动画互动快捷按钮组 */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShiftLeft}
              disabled={isShaking}
              className="px-2 py-1 rounded-lg bg-white text-sky-800 text-[10px] font-black border border-sky-300 shadow-2xs hover:bg-sky-50 flex items-center gap-0.5 active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-3 h-3" />
              <span>左滚</span>
            </button>
            <button
              onClick={handleShake}
              disabled={isShaking}
              className="px-2.5 py-1 rounded-lg bg-cyan-600 text-white text-[10px] font-black shadow-xs hover:bg-cyan-700 flex items-center gap-1 active:scale-95 transition-transform"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isShaking ? '摇晃中...' : '摇一摇'}</span>
            </button>
            <button
              onClick={handleShiftRight}
              disabled={isShaking}
              className="px-2 py-1 rounded-lg bg-white text-sky-800 text-[10px] font-black border border-sky-300 shadow-2xs hover:bg-sky-50 flex items-center gap-0.5 active:scale-95 transition-transform"
            >
              <span>右滚</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            {shiftCount !== 0 && (
              <button
                onClick={handleReset}
                className="px-1.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-300 hover:bg-slate-200"
                title="复位到原题目状态"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* 视图展现：直线轨道 vs 环形圆环 */}
        {viewMode === 'linear' ? (
          /* 直线管道视图 */
          <div className="relative w-full my-auto py-3 px-2 bg-white/85 backdrop-blur-xs rounded-2xl border-2 border-sky-300/80 shadow-md flex items-center justify-between gap-1 overflow-x-auto">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/90 to-transparent pointer-events-none rounded-t-2xl" />
            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-sky-200/50 to-transparent pointer-events-none rounded-b-2xl" />

            <AnimatePresence mode="popLayout">
              {trackItems.map((item) => {
                if (item.type === 'empty') {
                  const isSelected = selectedSlot === item.emptyIndex;
                  return (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="flex flex-col items-center gap-1 shrink-0 px-0.5"
                    >
                      <GlassBall
                        isEmpty
                        emptyLabel={`? ${item.emptyIndex}`}
                        size={36}
                        isSelected={isSelected}
                        onClick={() =>
                          setSelectedSlot(
                            selectedSlot === item.emptyIndex ? null : item.emptyIndex!
                          )
                        }
                      />
                      <span className="text-[9.5px] font-black text-sky-800 bg-sky-100 px-1.5 py-0.2 rounded-md border border-sky-300">
                        {item.label}
                      </span>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="flex flex-col items-center gap-1 shrink-0 px-0.5"
                  >
                    <GlassBall color={item.color} size={36} />
                    <span className="text-[9.5px] font-bold text-slate-500">{item.label}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* 环形闭环圆环视图 */
          <div className="relative w-full my-auto py-2 flex items-center justify-center">
            <div className="relative w-44 h-44 rounded-full border-8 border-sky-200/90 bg-white/70 shadow-inner flex items-center justify-center">
              {/* 中心装饰说明 */}
              <div className="text-center p-1">
                <span className="text-[10px] font-black text-sky-900 block">闭环滚珠环</span>
                <span className="text-[8.5px] text-slate-400 font-bold">顺时针 ↺ 循环</span>
              </div>

              {/* 10 个球位沿圆周排布 */}
              {trackItems.map((item, idx) => {
                const angle = (idx * 360) / trackItems.length - 90; // 从顶部 12 点钟开始
                const radius = 64;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <motion.div
                    layout
                    key={item.id}
                    className="absolute"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    {item.type === 'empty' ? (
                      <GlassBall
                        isEmpty
                        emptyLabel={`?${item.emptyIndex}`}
                        size={28}
                        isSelected={selectedSlot === item.emptyIndex}
                        onClick={() =>
                          setSelectedSlot(
                            selectedSlot === item.emptyIndex ? null : item.emptyIndex!
                          )
                        }
                      />
                    ) : (
                      <GlassBall color={item.color} size={28} />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 轨道底部说明 */}
        <div className="w-full flex items-center justify-between text-[10px] font-bold text-slate-500 z-10 px-1">
          <span>🔄 无论怎么滚动，小球的相对先后顺序永不改变</span>
          <span className="text-cyan-700">
            {shiftCount === 0 ? '原始位置' : `已滚动 ${Math.abs(shiftCount)} 格`}
          </span>
        </div>
      </motion.div>

      {/* 4. 底部引导（绝不泄露答案） */}
      <div className="w-full bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 px-3 shrink-0">
        <span className="flex items-center gap-1.5 text-cyan-800">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
          <span>观察技巧：对照上方的 5 色循环表，找出紧邻空位的前后小球颜色</span>
        </span>
        <span className="text-slate-500 font-bold hidden sm:inline">
          👉 请在右侧选项中选择正确的双空位颜色
        </span>
      </div>
    </div>
  );
};

