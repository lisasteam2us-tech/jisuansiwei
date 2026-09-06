import React from 'react';
import { Sparkles, Check, X, Box } from 'lucide-react';

/* ================= 珠子与手链组件 ================= */

export type BeadColor = 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'purple' | 'pink' | 'black';

export const COLOR_MAP: Record<BeadColor, { name: string; bg: string; border: string; text: string }> = {
  red: { name: '红', bg: '#EF4444', border: '#B91C1C', text: '#FFFFFF' },
  yellow: { name: '黄', bg: '#FBBF24', border: '#D97706', text: '#78350F' },
  blue: { name: '蓝', bg: '#3B82F6', border: '#1D4ED8', text: '#FFFFFF' },
  green: { name: '绿', bg: '#10B981', border: '#047857', text: '#FFFFFF' },
  white: { name: '白', bg: '#F8FAFC', border: '#94A3B8', text: '#334155' },
  purple: { name: '紫', bg: '#A855F7', border: '#7E22CE', text: '#FFFFFF' },
  pink: { name: '粉', bg: '#F472B6', border: '#BE185D', text: '#FFFFFF' },
  black: { name: '黑', bg: '#1E293B', border: '#0F172A', text: '#FFFFFF' },
};

// 渲染单个圆珠
export const SingleBead: React.FC<{ color: BeadColor; size?: number }> = ({ color, size = 16 }) => {
  const conf = COLOR_MAP[color] || COLOR_MAP.white;
  return (
    <div
      style={{ width: size, height: size, backgroundColor: conf.bg, borderColor: conf.border }}
      className="rounded-full border-2 shadow-xs shrink-0 flex items-center justify-center select-none"
    />
  );
};

// 渲染双色交替手链（环形或条形手链展示）
export const BraceletIllustration: React.FC<{
  color1: BeadColor;
  color2: BeadColor;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'ring' | 'strip';
}> = ({ color1, color2, size = 'md', layout = 'strip' }) => {
  const beadSize = size === 'sm' ? 12 : size === 'md' ? 16 : 20;
  const sequence: BeadColor[] = [color1, color2, color1, color2, color1, color2];

  if (layout === 'ring') {
    // 环形手链展示
    return (
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* 串绳底环 */}
        <div className="absolute w-14 h-14 rounded-full border-2 border-dashed border-amber-300 pointer-events-none" />
        {sequence.map((c, i) => {
          const angle = (i * 360) / sequence.length;
          const radius = 22;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);
          return (
            <div
              key={i}
              className="absolute"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <SingleBead color={c} size={beadSize} />
            </div>
          );
        })}
      </div>
    );
  }

  // 条形展示
  return (
    <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-full border border-slate-200 shadow-2xs">
      {sequence.map((c, i) => (
        <SingleBead key={i} color={c} size={beadSize} />
      ))}
    </div>
  );
};

/* ================= 首饰盒单个收纳格子 ================= */
interface BoxCompartment {
  id: number;
  c1: BeadColor;
  c2: BeadColor;
  label: string;
  hasSample?: boolean;
}

// 7 个特定双色格子
export const COMPARTMENTS: BoxCompartment[] = [
  { id: 1, c1: 'red', c2: 'white', label: '红 + 白', hasSample: true },
  { id: 2, c1: 'red', c2: 'yellow', label: '红 + 黄' },
  { id: 3, c1: 'blue', c2: 'green', label: '蓝 + 绿' },
  { id: 4, c1: 'blue', c2: 'yellow', label: '蓝 + 黄' },
  { id: 5, c1: 'purple', c2: 'pink', label: '紫 + 粉' },
  { id: 6, c1: 'green', c2: 'white', label: '绿 + 白' },
  { id: 7, c1: 'purple', c2: 'white', label: '紫 + 白' },
];

/* ================= 1041 题 核心首饰盒与手链主插图 ================= */
export const BraceletBoxIllustration: React.FC = () => {
  return (
    <div
      id="bracelet-box-organizer-display"
      className="w-full h-full flex flex-col p-2.5 bg-white text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200 shadow-xs justify-between gap-2"
    >
      {/* 1. 顶部标题 */}
      <div className="w-full bg-rose-50/90 rounded-xl px-3 py-1.5 border border-rose-200 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base">📿</span>
          <h3 className="text-xs sm:text-sm font-black text-rose-950">
            比巴公主的 7 格首饰收纳盒
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-rose-700 font-bold border border-rose-200">
            双色配对规则
          </span>
        </div>
        <div className="text-[11px] font-bold text-rose-800">
          💡 手链上的两种颜色必须与格子标记完全一致
        </div>
      </div>

      {/* 2. 规则提示卡片：红白手链示范 */}
      <div className="w-full bg-amber-50/80 rounded-xl p-2 border border-amber-200 flex items-center justify-between gap-2 shrink-0 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center">
            例
          </span>
          <span className="font-bold text-amber-950">
            示例：【红白相间手链】只能放入标有【红+白】的第 1 格中
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-amber-200 shadow-2xs shrink-0">
          <SingleBead color="red" size={14} />
          <SingleBead color="white" size={14} />
          <span className="text-[10px] font-bold text-amber-900 ml-1">➔ 格子 ①</span>
        </div>
      </div>

      {/* 3. 首饰盒 7 个格子立体视图 */}
      <div className="w-full flex-1 bg-slate-50/80 rounded-2xl border-2 border-slate-200 p-2.5 flex flex-col justify-center gap-2 min-h-[170px]">
        <div className="flex items-center gap-1.5 text-xs font-black text-slate-700">
          <Box className="w-4 h-4 text-rose-500" />
          <span>首饰盒现有 7 个专属格子（颜色标签）：</span>
        </div>

        {/* 7 格网格展示 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          {COMPARTMENTS.map((comp) => {
            const c1Info = COLOR_MAP[comp.c1];
            const c2Info = COLOR_MAP[comp.c2];
            return (
              <div
                key={comp.id}
                className="bg-white rounded-xl p-2 border-2 border-slate-200 shadow-2xs flex flex-col items-center justify-between gap-1.5 relative overflow-hidden"
              >
                {/* 格子序号 */}
                <div className="w-full flex items-center justify-between text-[10px] font-black text-slate-400">
                  <span className="px-1.5 py-0.2 bg-slate-100 rounded text-slate-600">
                    格 #{comp.id}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">{comp.label}</span>
                </div>

                {/* 格子内部的双色标记示意 */}
                <div className="flex items-center gap-1.5 my-1 bg-slate-50 px-2 py-1 rounded-full border border-slate-200">
                  <div className="flex items-center gap-1">
                    <SingleBead color={comp.c1} size={15} />
                    <span className="text-[10px] font-bold text-slate-700">{c1Info.name}</span>
                  </div>
                  <span className="text-slate-300 font-bold">+</span>
                  <div className="flex items-center gap-1">
                    <SingleBead color={comp.c2} size={15} />
                    <span className="text-[10px] font-bold text-slate-700">{c2Info.name}</span>
                  </div>
                </div>

                {/* 已经有收纳示例或空位 */}
                {comp.hasSample ? (
                  <div className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                    <Check className="w-2.5 h-2.5" />
                    <span>已放红白手链</span>
                  </div>
                ) : (
                  <div className="text-[9px] text-slate-400 font-medium">空位待收纳</div>
                )}
              </div>
            );
          })}

          {/* 补充一个虚线格，生动引导思考 */}
          <div className="bg-rose-50/40 rounded-xl p-2 border-2 border-dashed border-rose-300 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-black text-rose-700">❓ 哪个手链</span>
            <span className="text-[10px] text-rose-500 font-bold mt-0.5">找不到它的格子？</span>
          </div>
        </div>
      </div>

      {/* 4. 底部引导说明 */}
      <div className="w-full bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 px-3 shrink-0">
        <span className="flex items-center gap-1.5 text-rose-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>核对方法：查看选项中手链的两种颜色，检查盒中是否存在该颜色对</span>
        </span>
        <span className="text-slate-500 font-bold hidden sm:inline">
          👉 请在右侧选项中选择【无法收纳】的手链
        </span>
      </div>
    </div>
  );
};
