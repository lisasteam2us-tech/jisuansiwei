import React, { useState } from 'react';
import { Flame, Sparkles, CheckCircle2, User, ArrowRight } from 'lucide-react';

/* ================= 烤串食材矢量渲染 ================= */

// 1. 烤肉块 (香气腾腾的焦糖色烤肉)
export const FoodMeat: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <div
    style={{ width: size, height: size * 0.9 }}
    className="relative flex items-center justify-center shrink-0"
    title="香烤牛肉块"
  >
    <svg viewBox="0 0 40 36" className="w-full h-full drop-shadow-xs">
      <path
        d="M 6 10 C 6 5, 34 4, 35 12 C 36 20, 32 30, 24 32 C 14 34, 6 28, 6 10 Z"
        fill="#9A3412"
        stroke="#7C2D12"
        strokeWidth="2"
      />
      {/* 焦香烤痕 */}
      <line x1="12" y1="12" x2="28" y2="10" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="20" x2="26" y2="19" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="27" x2="24" y2="26" stroke="#431407" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="15" r="1.5" fill="#FDBA74" opacity="0.6" />
    </svg>
  </div>
);

// 2. 洋葱圈 (紫白相间的洋葱环)
export const FoodOnion: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <div
    style={{ width: size, height: size * 0.9 }}
    className="relative flex items-center justify-center shrink-0"
    title="紫洋葱圈"
  >
    <svg viewBox="0 0 40 36" className="w-full h-full drop-shadow-xs">
      <ellipse cx="20" cy="18" rx="16" ry="13" fill="#A855F7" stroke="#7E22CE" strokeWidth="2" />
      <ellipse cx="20" cy="18" rx="11" ry="8.5" fill="#FAF5FF" stroke="#C084FC" strokeWidth="1.5" />
      <ellipse cx="20" cy="18" rx="6" ry="4.5" fill="#D8B4FE" opacity="0.6" />
    </svg>
  </div>
);

// 3. 大蒜瓣 (白嫩饱满的大蒜)
export const FoodGarlic: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <div
    style={{ width: size, height: size * 0.9 }}
    className="relative flex items-center justify-center shrink-0"
    title="香脆大蒜瓣"
  >
    <svg viewBox="0 0 40 36" className="w-full h-full drop-shadow-xs">
      <path
        d="M 20 4 C 13 10, 6 18, 9 27 C 12 33, 28 33, 31 27 C 34 18, 27 10, 20 4 Z"
        fill="#FEFCE8"
        stroke="#CA8A04"
        strokeWidth="2"
      />
      {/* 蒜瓣纹理与烤焦感 */}
      <path d="M 20 6 Q 16 18 16 28" stroke="#EAB308" strokeWidth="1.2" fill="none" />
      <path d="M 20 6 Q 24 18 24 28" stroke="#EAB308" strokeWidth="1.2" fill="none" />
      <circle cx="20" cy="24" r="2.5" fill="#B45309" opacity="0.4" />
    </svg>
  </div>
);

// 4. 香菇 (圆圆的褐色蘑菇)
export const FoodMushroom: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <div
    style={{ width: size, height: size * 0.9 }}
    className="relative flex items-center justify-center shrink-0"
    title="多汁香菇"
  >
    <svg viewBox="0 0 40 36" className="w-full h-full drop-shadow-xs">
      <path
        d="M 7 24 C 7 10, 33 10, 33 24 C 33 27, 7 27, 7 24 Z"
        fill="#78350F"
        stroke="#451A03"
        strokeWidth="2"
      />
      {/* 香菇十字十字切花 */}
      <line x1="20" y1="12" x2="20" y2="22" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="14" y1="17" x2="26" y2="17" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  </div>
);

// 5. 彩椒 / 圣女果
export const FoodPepper: React.FC<{ size?: number; color?: 'red' | 'green' }> = ({
  size = 26,
  color = 'green',
}) => {
  const isRed = color === 'red';
  return (
    <div
      style={{ width: size, height: size * 0.9 }}
      className="relative flex items-center justify-center shrink-0"
      title={isRed ? '红番茄' : '脆甜青椒'}
    >
      <svg viewBox="0 0 40 36" className="w-full h-full drop-shadow-xs">
        <rect
          x="8"
          y="8"
          width="24"
          height="20"
          rx="5"
          fill={isRed ? '#DC2626' : '#16A34A'}
          stroke={isRed ? '#991B1B' : '#14532D'}
          strokeWidth="2"
        />
        <rect
          x="12"
          y="12"
          width="16"
          height="12"
          rx="2"
          fill={isRed ? '#F87171' : '#4ADE80'}
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

/* ================= 单串烤肉完整展示 ================= */

export interface SkewerInfo {
  id: number;
  ingredients: Array<'meat' | 'onion' | 'garlic' | 'mushroom' | 'pepperRed' | 'pepperGreen'>;
  featureTag: string;
  matchTarget: string;
}

export const SKEWERS: SkewerInfo[] = [
  {
    id: 1,
    ingredients: ['meat', 'pepperRed', 'meat', 'pepperGreen', 'meat'],
    featureTag: '🍢 3块烤肉 + 彩椒',
    matchTarget: '',
  },
  {
    id: 2,
    ingredients: ['meat', 'mushroom', 'pepperGreen', 'pepperRed'],
    featureTag: '🍢 1块烤肉 + 香菇 + 彩椒',
    matchTarget: '',
  },
  {
    id: 3,
    ingredients: ['meat', 'onion', 'mushroom', 'pepperRed'],
    featureTag: '🍢 1块烤肉 + 洋葱 + 香菇 + 彩椒',
    matchTarget: '',
  },
  {
    id: 4,
    ingredients: ['meat', 'garlic', 'pepperGreen', 'mushroom'],
    featureTag: '🍢 1块烤肉 + 大蒜 + 香菇 + 彩椒',
    matchTarget: '',
  },
];

// 单根立式/横式烤肉串组件
export const SkewerDisplay: React.FC<{
  skewer: SkewerInfo;
  isSelected?: boolean;
  onSelect?: () => void;
}> = ({ skewer, isSelected = false, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer flex flex-col items-center bg-white rounded-xl p-2 border-2 transition-all shadow-2xs ${
        isSelected
          ? 'border-amber-500 ring-2 ring-amber-300 bg-amber-50/40'
          : 'border-slate-200 hover:border-amber-300'
      }`}
    >
      {/* 烤串顶部编号徽章 */}
      <div className="w-full flex items-center justify-between gap-1 mb-1">
        <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-black flex items-center justify-center shadow-xs">
          {skewer.id}
        </span>
        <span className="text-[10px] font-extrabold text-amber-950">
          {skewer.id}号烤串
        </span>
      </div>

      {/* 竹签与串上的食材 */}
      <div className="relative py-1 flex flex-col items-center justify-center min-h-[140px] w-full">
        {/* 竹签贯穿中心线 */}
        <div className="absolute top-0 bottom-0 w-1.5 bg-[#D97706] rounded-full shadow-inner z-0" />
        {/* 竹签尖头 */}
        <div className="absolute -top-1 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[8px] border-b-[#B45309] z-0" />

        {/* 食材堆叠 */}
        <div className="relative z-10 flex flex-col items-center gap-1">
          {skewer.ingredients.map((ing, idx) => {
            if (ing === 'meat') return <FoodMeat key={idx} size={28} />;
            if (ing === 'onion') return <FoodOnion key={idx} size={28} />;
            if (ing === 'garlic') return <FoodGarlic key={idx} size={28} />;
            if (ing === 'mushroom') return <FoodMushroom key={idx} size={28} />;
            if (ing === 'pepperRed') return <FoodPepper key={idx} color="red" size={28} />;
            if (ing === 'pepperGreen') return <FoodPepper key={idx} color="green" size={28} />;
            return null;
          })}
        </div>
      </div>

      {/* 食材特征标签 */}
      <div className="w-full mt-1.5 pt-1 border-t border-slate-100 text-center">
        <div className="text-[9.5px] font-bold text-slate-600 leading-tight">
          {skewer.featureTag}
        </div>
      </div>
    </div>
  );
};

/* ================= 1042 题 核心主图组件 ================= */
export const BbqSkewersIllustration: React.FC = () => {
  const [selectedSkewerId, setSelectedSkewerId] = useState<number | null>(null);

  return (
    <div
      id="bbq-skewers-puzzle-display"
      className="w-full h-full flex flex-col p-2.5 bg-white text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200 shadow-xs justify-between gap-2"
    >
      {/* 1. 顶部标题 */}
      <div className="w-full bg-amber-500/15 rounded-xl px-3 py-1.5 border border-amber-300 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
          <h3 className="text-xs sm:text-sm font-black text-amber-950">
            森林烧烤派对 · 4只小海狸的心愿清单
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-amber-900 font-bold border border-amber-300">
            题目线索图
          </span>
        </div>
        <div className="text-[11px] font-bold text-amber-900">
          🎯 根据心愿找出各自对应的烤串
        </div>
      </div>

      {/* 2. 四只小海狸的发言愿望卡片 (客观呈现题干要求，不剧透答案) */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-1.5 shrink-0">
        {/* 小海狸 A */}
        <div className="rounded-xl p-2 border-2 border-purple-200 bg-purple-50/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-purple-950 flex items-center gap-1">
              <span>🦫</span> 小海狸 A
            </span>
            <span className="text-[9px] px-1 bg-purple-200 text-purple-900 font-bold rounded">
              心愿
            </span>
          </div>
          <p className="text-[11px] font-bold text-purple-900 mt-1 leading-snug">
            “我要有<span className="text-purple-700 font-extrabold underline decoration-purple-400">洋葱圈🧅</span>的烤串！”
          </p>
        </div>

        {/* 小海狸 B */}
        <div className="rounded-xl p-2 border-2 border-blue-200 bg-blue-50/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-blue-950 flex items-center gap-1">
              <span>🦫</span> 小海狸 B
            </span>
            <span className="text-[9px] px-1 bg-blue-200 text-blue-900 font-bold rounded">
              心愿
            </span>
          </div>
          <p className="text-[11px] font-bold text-blue-900 mt-1 leading-snug">
            “我要大家挑完后<span className="text-blue-700 font-extrabold underline decoration-blue-400">剩下的那一串🎁</span>！”
          </p>
        </div>

        {/* 小海狸 C */}
        <div className="rounded-xl p-2 border-2 border-yellow-200 bg-yellow-50/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-yellow-950 flex items-center gap-1">
              <span>🦫</span> 小海狸 C
            </span>
            <span className="text-[9px] px-1 bg-yellow-200 text-yellow-900 font-bold rounded">
              心愿
            </span>
          </div>
          <p className="text-[11px] font-bold text-yellow-900 mt-1 leading-snug">
            “我要有一块以上<span className="text-amber-800 font-extrabold underline decoration-yellow-500">大蒜🧄</span>的烤串！”
          </p>
        </div>

        {/* 小海狸 D */}
        <div className="rounded-xl p-2 border-2 border-red-200 bg-red-50/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-red-950 flex items-center gap-1">
              <span>🦫</span> 小海狸 D
            </span>
            <span className="text-[9px] px-1 bg-red-200 text-red-900 font-bold rounded">
              心愿
            </span>
          </div>
          <p className="text-[11px] font-bold text-red-900 mt-1 leading-snug">
            “我要有<span className="text-red-700 font-extrabold underline decoration-red-400">两块以上烤肉🥩</span>的烤串！”
          </p>
        </div>
      </div>

      {/* 3. 烤架上的 4 串烤肉实物区 */}
      <div className="w-full flex-1 bg-gradient-to-b from-stone-100 to-stone-50 rounded-2xl border-2 border-stone-300 p-2 flex flex-col justify-between min-h-[190px]">
        {/* 烤架顶栏提示 */}
        <div className="w-full flex items-center justify-between px-1 text-[11px] font-black text-stone-700">
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>烤架上的 4 串美味烤肉：</span>
          </span>
          <span className="text-[10px] text-stone-500 font-medium">
            点击烤串可高亮查看食材
          </span>
        </div>

        {/* 4 串烤肉陈列网格 */}
        <div className="grid grid-cols-4 gap-2 w-full my-auto">
          {SKEWERS.map((skewer) => (
            <SkewerDisplay
              key={skewer.id}
              skewer={skewer}
              isSelected={selectedSkewerId === skewer.id}
              onSelect={() =>
                setSelectedSkewerId(selectedSkewerId === skewer.id ? null : skewer.id)
              }
            />
          ))}
        </div>
      </div>

      {/* 4. 底部思考引导（不给答案） */}
      <div className="w-full bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 px-3 shrink-0">
        <span className="flex items-center gap-1.5 text-amber-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>思考提示：对比 4 串烤肉上的食材，看看哪只小海狸的心愿是唯一的？</span>
        </span>
        <span className="text-slate-500 font-bold hidden sm:inline">
          👉 请在右侧选项中选择正确的分配结果
        </span>
      </div>
    </div>
  );
};
