import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Flower2,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';

/* ================= 花卉与植物类型定义 ================= */
export type PlantType = 'daisy' | 'rose' | 'twig';

export interface PlantMeta {
  name: string;
  emoji: string;
  color: string;
  tag: string;
}

export const PLANT_DEFS: Record<PlantType, PlantMeta> = {
  daisy: {
    name: '金黄雏菊',
    emoji: '🌼',
    color: '#EAB308',
    tag: '金黄花瓣',
  },
  rose: {
    name: '红玫瑰',
    emoji: '🌹',
    color: '#E11D48',
    tag: '层叠花瓣',
  },
  twig: {
    name: '带叶树枝',
    emoji: '🌿',
    color: '#16A34A',
    tag: '青翠绿叶',
  },
};

/* ================= 精美植物矢量 SVG 组件 ================= */
export const SinglePlantSvg: React.FC<{
  type: PlantType;
  height?: number;
  showName?: boolean;
}> = ({ type, height = 70, showName = false }) => {
  return (
    <div className="flex flex-col items-center justify-end select-none">
      <svg
        viewBox="0 0 60 100"
        style={{ height }}
        className="w-auto drop-shadow-2xs overflow-visible"
      >
        {/* 1. 雏菊 (Daisy) */}
        {type === 'daisy' && (
          <g>
            <path
              d="M 30 45 Q 30 75 30 96"
              stroke="#15803D"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 30 68 Q 42 62 40 52 C 34 54 30 62 30 68 Z"
              fill="#22C55E"
              stroke="#15803D"
              strokeWidth="1.5"
            />
            <g style={{ transformOrigin: '30px 32px' }}>
              <ellipse cx="30" cy="14" rx="5" ry="10" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
              <ellipse cx="30" cy="50" rx="5" ry="10" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
              <ellipse cx="12" cy="32" rx="10" ry="5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
              <ellipse cx="48" cy="32" rx="10" ry="5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
              <ellipse cx="17" cy="19" rx="6" ry="10" transform="rotate(-45 17 19)" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
              <ellipse cx="43" cy="19" rx="6" ry="10" transform="rotate(45 43 19)" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
              <ellipse cx="17" cy="45" rx="6" ry="10" transform="rotate(45 17 45)" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
              <ellipse cx="43" cy="45" rx="6" ry="10" transform="rotate(-45 43 45)" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
            </g>
            <circle cx="30" cy="32" r="9" fill="#EAB308" stroke="#A16207" strokeWidth="2" />
            <circle cx="28" cy="30" r="2.5" fill="#FEF9C3" opacity="0.8" />
          </g>
        )}

        {/* 2. 玫瑰 (Rose) */}
        {type === 'rose' && (
          <g>
            <path
              d="M 30 45 Q 28 70 30 96"
              stroke="#166534"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <polygon points="30,62 36,58 30,56" fill="#166534" />
            <path
              d="M 30 72 Q 16 66 18 56 C 24 58 29 66 30 72 Z"
              fill="#15803D"
              stroke="#14532D"
              strokeWidth="1.5"
            />
            <path d="M 22 45 Q 30 52 38 45 L 30 50 Z" fill="#15803D" stroke="#14532D" strokeWidth="1.5" />
            <path
              d="M 16 28 C 14 16 28 8 30 18 C 32 8 46 16 44 28 C 42 42 18 42 16 28 Z"
              fill="#E11D48"
              stroke="#9F1239"
              strokeWidth="2"
            />
            <path
              d="M 22 24 C 20 16 29 12 30 18 C 31 12 40 16 38 24 C 36 34 24 34 22 24 Z"
              fill="#F43F5E"
              stroke="#BE123C"
              strokeWidth="1.5"
            />
            <circle cx="30" cy="22" r="5" fill="#BE123C" />
            <path d="M 28 20 Q 30 18 32 20 Q 30 24 28 20" fill="#FDA4AF" />
          </g>
        )}

        {/* 3. 带叶树枝 (Twig) */}
        {type === 'twig' && (
          <g>
            <path
              d="M 30 96 Q 28 55 30 14"
              stroke="#854D0E"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M 30 14 Q 24 6 30 2 Q 36 6 30 14 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1.5" />
            <path d="M 29 32 Q 12 24 16 12 C 24 16 28 26 29 32 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            <line x1="29" y1="32" x2="19" y2="18" stroke="#15803D" strokeWidth="1" />
            <path d="M 31 46 Q 48 38 44 26 C 36 30 32 40 31 46 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
            <line x1="31" y1="46" x2="41" y2="32" stroke="#15803D" strokeWidth="1" />
            <path d="M 29 62 Q 8 52 14 38 C 22 42 27 54 29 62 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            <line x1="29" y1="62" x2="16" y2="45" stroke="#15803D" strokeWidth="1" />
            <path d="M 31 76 Q 52 66 46 50 C 38 56 33 68 31 76 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
            <line x1="31" y1="76" x2="44" y2="58" stroke="#15803D" strokeWidth="1" />
          </g>
        )}
      </svg>

      {showName && (
        <span className="text-[10px] font-bold text-slate-700 mt-1 whitespace-nowrap">
          {PLANT_DEFS[type].name}
        </span>
      )}
    </div>
  );
};

/* ================= 选项中的花束植物微缩组合 ================= */
export const OptionBouquetPreview: React.FC<{
  plants: PlantType[];
}> = ({ plants }) => {
  return (
    <div className="flex items-center gap-1.5 bg-rose-50/70 px-2 py-1 rounded-xl border border-rose-200/80 overflow-x-auto">
      {plants.map((type, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white rounded-lg p-1 border border-rose-200 shadow-2xs shrink-0"
        >
          <SinglePlantSvg type={type} height={38} />
          <span className="text-[8.5px] font-bold text-rose-900 mt-0.5 leading-none">
            {PLANT_DEFS[type].name.slice(-2)}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ================= 1071 核心主图组件 ================= */
export const FlowerBouquetTreeIllustration: React.FC = () => {
  // 当前模拟打包分支：'daisy'（选菊花路线）或 'rose'（选玫瑰路线）
  const [activeBranch, setActiveBranch] = useState<'daisy' | 'rose' | null>(null);

  // 根据当前分支计算花束内植物清单
  const getBouquetPlants = (): PlantType[] => {
    if (activeBranch === 'daisy') {
      return ['daisy', 'daisy', 'twig', 'twig'];
    }
    if (activeBranch === 'rose') {
      return ['rose', 'twig', 'twig', 'twig'];
    }
    return [];
  };

  const bouquetPlants = getBouquetPlants();

  return (
    <div
      id="flower-bouquet-tree-workbench"
      className="w-full h-full flex flex-col p-2.5 bg-white text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200 shadow-xs justify-between gap-2"
    >
      {/* 1. 顶部标题栏 */}
      <div className="w-full bg-rose-50/70 rounded-xl px-3 py-1.5 border border-rose-200 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Flower2 className="w-4 h-4 text-rose-600" />
          <h3 className="text-xs sm:text-sm font-black text-rose-950">
            花束魔法包装规则
          </h3>
        </div>
        <div className="text-[11px] font-bold text-rose-800">
          💐 跟着 3 步规则配齐 4 根植物
        </div>
      </div>

      {/* 2. 3 步流程展示卡片（纯白明亮设计） */}
      <div className="w-full bg-slate-50/80 rounded-2xl p-2.5 border border-slate-200 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 px-1">
          <span>三步包装流程（点击可模拟）：</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveBranch('daisy')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                activeBranch === 'daisy'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-50'
              }`}
            >
              🌼 路线一：选菊花
            </button>
            <button
              onClick={() => setActiveBranch('rose')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                activeBranch === 'rose'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white text-rose-800 border border-rose-300 hover:bg-rose-50'
              }`}
            >
              🌹 路线二：选玫瑰
            </button>
            {activeBranch && (
              <button
                onClick={() => setActiveBranch(null)}
                className="px-1.5 py-0.5 rounded-md text-[9.5px] font-bold bg-slate-200 text-slate-700 hover:bg-slate-300"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* 3 个步骤卡片横排流向 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* 步骤 1：二选一 */}
          <div
            className={`rounded-xl p-2 border-2 transition-all flex flex-col justify-between gap-1.5 ${
              activeBranch === 'daisy'
                ? 'bg-amber-50/60 border-amber-400'
                : activeBranch === 'rose'
                ? 'bg-rose-50/60 border-rose-400'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                第 1 步：拿第一朵
              </span>
              <span className="text-slate-400">二选一</span>
            </div>

            <div className="flex items-center justify-around py-1 bg-slate-50/70 rounded-lg border border-slate-200/80">
              <div
                onClick={() => setActiveBranch('daisy')}
                className={`cursor-pointer p-1 rounded-lg border flex flex-col items-center transition-all ${
                  activeBranch === 'daisy'
                    ? 'bg-amber-100 border-amber-400 scale-105 ring-2 ring-amber-300'
                    : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                <SinglePlantSvg type="daisy" height={45} />
                <span className="text-[9px] font-bold text-amber-800 mt-0.5">选 🌼 菊花</span>
              </div>

              <span className="text-slate-300 font-black text-xs">或</span>

              <div
                onClick={() => setActiveBranch('rose')}
                className={`cursor-pointer p-1 rounded-lg border flex flex-col items-center transition-all ${
                  activeBranch === 'rose'
                    ? 'bg-rose-100 border-rose-400 scale-105 ring-2 ring-rose-300'
                    : 'bg-white border-slate-200 hover:border-rose-300'
                }`}
              >
                <SinglePlantSvg type="rose" height={45} />
                <span className="text-[9px] font-bold text-rose-800 mt-0.5">选 🌹 玫瑰</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-500 leading-tight text-center">
              挑一朵菊花或玫瑰
            </div>
          </div>

          {/* 步骤 2：如果...那么...条件分支 */}
          <div
            className={`rounded-xl p-2 border-2 transition-all flex flex-col justify-between gap-1.5 ${
              activeBranch === 'daisy'
                ? 'bg-amber-50/60 border-amber-400'
                : activeBranch === 'rose'
                ? 'bg-rose-50/60 border-rose-400'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                第 2 步：看情况拿
              </span>
              <span className="text-emerald-600 font-bold">如果...</span>
            </div>

            <div className="flex flex-col gap-1 py-1 px-1 bg-slate-50/70 rounded-lg border border-slate-200/80 text-[9.5px]">
              <div
                className={`p-1 rounded flex items-center justify-between border ${
                  activeBranch === 'daisy'
                    ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                <span>若刚选菊花：</span>
                <span className="font-black text-amber-700">再拿 1 朵菊花 🌼</span>
              </div>
              <div
                className={`p-1 rounded flex items-center justify-between border ${
                  activeBranch === 'rose'
                    ? 'bg-rose-100 border-rose-400 text-rose-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                <span>若刚选玫瑰：</span>
                <span className="font-bold text-slate-500">不拿花（跳过）</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-500 leading-tight text-center">
              {activeBranch === 'daisy'
                ? '累计：2 朵菊花 🌼🌼'
                : activeBranch === 'rose'
                ? '累计：1 朵玫瑰 🌹'
                : '根据前一步决定是否再加'}
            </div>
          </div>

          {/* 步骤 3：凑齐4根补树枝 */}
          <div
            className={`rounded-xl p-2 border-2 transition-all flex flex-col justify-between gap-1.5 ${
              activeBranch
                ? 'bg-emerald-50/60 border-emerald-400'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 font-bold border border-violet-200">
                第 3 步：补齐树枝
              </span>
              <span className="text-violet-600 font-bold">总数 = 4</span>
            </div>

            <div className="flex flex-col items-center justify-center py-1 bg-slate-50/70 rounded-lg border border-slate-200/80 min-h-[55px]">
              {activeBranch === 'daisy' && (
                <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-bold">
                  <span>总数4 - 2朵 =</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-black">
                    补 2 根 🌿 树枝
                  </span>
                </div>
              )}
              {activeBranch === 'rose' && (
                <div className="flex items-center gap-1 text-[10px] text-rose-800 font-bold">
                  <span>总数4 - 1朵 =</span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-100 border border-rose-300 text-rose-800 font-black">
                    补 3 根 🌿 树枝
                  </span>
                </div>
              )}
              {!activeBranch && (
                <div className="text-[10px] text-slate-400">
                  拿取树枝，凑齐正好 4 根
                </div>
              )}
            </div>

            <div className="text-[9px] text-slate-500 leading-tight text-center">
              确保整束花正好 4 根
            </div>
          </div>
        </div>
      </div>

      {/* 3. 动态模拟花束打包台 */}
      <div className="w-full bg-rose-50/70 rounded-xl p-2 border border-rose-200 flex flex-col gap-1">
        <div className="flex items-center justify-between text-[11px] font-bold text-rose-950 px-1">
          <span className="flex items-center gap-1">
            <ShoppingBag className="w-3.5 h-3.5 text-rose-600" />
            <span>
              {activeBranch
                ? `打包预览【${activeBranch === 'daisy' ? '菊花路线' : '玫瑰路线'}】：`
                : '3 种植物图鉴：'}
            </span>
          </span>
          <span className="text-[10px] text-rose-700">
            {activeBranch ? '已配齐 4 根' : '点击上方路线查看配法'}
          </span>
        </div>

        {activeBranch ? (
          <div className="w-full bg-white rounded-lg p-2 border border-rose-200 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              {bouquetPlants.map((plant, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-1 bg-rose-50/50 rounded-lg border border-rose-200 shrink-0"
                >
                  <SinglePlantSvg type={plant} height={44} />
                  <span className="text-[9px] font-bold text-slate-700 mt-0.5">
                    第{idx + 1}根·{PLANT_DEFS[plant].name.slice(-2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-rose-50 rounded-xl p-2 border border-rose-200 flex flex-col items-center justify-center shrink-0 min-w-[120px] text-center">
              <span className="text-[10px] text-rose-700 font-medium">构成结果</span>
              <span className="text-xs font-black text-rose-950 mt-0.5">
                {activeBranch === 'daisy'
                  ? '2菊花 + 2树枝'
                  : '1玫瑰 + 3树枝'}
              </span>
              <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full mt-1 border border-emerald-200">
                4 根配齐
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {(['daisy', 'rose', 'twig'] as PlantType[]).map((type) => (
              <div
                key={type}
                className="bg-white rounded-lg p-1.5 border border-rose-200 flex flex-col items-center text-center shadow-2xs"
              >
                <SinglePlantSvg type={type} height={40} showName />
                <span className="text-[9px] text-slate-400 mt-0.5">
                  {PLANT_DEFS[type].tag}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. 底部思考指引 */}
      <div className="w-full bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 px-3 shrink-0">
        <span className="flex items-center gap-1.5 text-rose-950">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>解题提示：算一算【选菊花】和【选玫瑰】各自得到的组合，看右侧哪个选项符合！</span>
        </span>
        <span className="text-slate-500 font-bold hidden sm:inline">
          👉 请在右侧选出正确花束
        </span>
      </div>
    </div>
  );
};
