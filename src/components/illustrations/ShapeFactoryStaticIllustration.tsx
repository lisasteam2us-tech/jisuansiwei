import React from 'react';
import { ArrowRight, RotateCcw, Wrench } from 'lucide-react';

/* ================= 2D 绘本风格矢量积木图形 ================= */

// 1. 红色三角形 (可切换旋转角度: 0度正立 / -90度向左倒 / 90度向右倒)
export const BlockTriangle: React.FC<{
  size?: number;
  rotation?: number; // 角度: 0, -90, 90, 180
}> = ({ size = 32, rotation = 0 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
      className="flex items-center justify-center select-none transition-transform shrink-0"
    >
      <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-xs">
        <polygon
          points="25,5 45,43 5,43"
          fill="#EF4444"
          stroke="#991B1B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <polygon points="25,12 39,39 11,39" fill="#F87171" opacity="0.4" />
      </svg>
    </div>
  );
};

// 2. 黄色五角星 (可切换旋转角度: 0度正立 / -90度向左倒)
export const BlockStar: React.FC<{
  size?: number;
  rotation?: number;
}> = ({ size = 32, rotation = 0 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
      className="flex items-center justify-center select-none transition-transform shrink-0"
    >
      <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-xs">
        <polygon
          points="25,4 31,18 46,19 34,29 38,44 25,35 12,44 16,29 4,19 19,18"
          fill="#FBBF24"
          stroke="#B45309"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle cx="25" cy="24" r="4" fill="#FEF08A" opacity="0.75" />
      </svg>
    </div>
  );
};

// 3. 绿色方块
export const BlockSquare: React.FC<{
  size?: number;
  rotation?: number;
}> = ({ size = 30, rotation = 0 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
      className="flex items-center justify-center select-none transition-transform shrink-0"
    >
      <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-xs">
        <rect
          x="6"
          y="6"
          width="38"
          height="38"
          rx="6"
          fill="#10B981"
          stroke="#047857"
          strokeWidth="2.5"
        />
        <rect x="12" y="12" width="26" height="26" rx="3" fill="#34D399" opacity="0.5" />
      </svg>
    </div>
  );
};

/* ================= 4 个选项对应的最终积木模型渲染组件 ================= */

// 选项 A 模型（正确答案）：顶层是向左倒的三连块 [⭐(左倒) 🟩 🔺(尖朝左)]，底层是正立的 [🔺]
export const BlockModelA: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-50/70 p-1.5 rounded-xl border border-amber-200 shadow-2xs">
      {/* 顶层：向左倒下的三连排积木 */}
      <div className="flex items-center gap-0.5 bg-white px-1 py-0.5 rounded-lg border border-slate-300 shadow-xs">
        <BlockStar size={size} rotation={-90} />
        <BlockSquare size={size - 2} rotation={-90} />
        <BlockTriangle size={size} rotation={-90} />
      </div>
      {/* 底层：正立的红色三角形 */}
      <div className="mt-0.5 bg-white px-1 py-0.5 rounded-lg border border-slate-300 shadow-xs">
        <BlockTriangle size={size} rotation={0} />
      </div>
    </div>
  );
};

// 选项 B 模型（干扰项 1）：左侧是直立三角形，右侧是未旋转的星星和方块
export const BlockModelB: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <div className="flex items-center justify-center gap-1 bg-amber-50/70 p-1.5 rounded-xl border border-amber-200 shadow-2xs">
      <div className="bg-white px-1 py-0.5 rounded-lg border border-slate-300 shadow-xs">
        <BlockTriangle size={size} rotation={0} />
      </div>
      <div className="flex flex-col items-center gap-0.5 bg-white px-1 py-0.5 rounded-lg border border-slate-300 shadow-xs">
        <BlockStar size={size} rotation={0} />
        <BlockSquare size={size - 2} rotation={0} />
      </div>
    </div>
  );
};

// 选项 C 模型（干扰项 2）：颠倒上下层，顶层是方块，底层是左倒的三角形和星星
export const BlockModelC: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-50/70 p-1.5 rounded-xl border border-amber-200 shadow-2xs">
      <div className="bg-white px-1 py-0.5 rounded-lg border border-slate-300 shadow-xs">
        <BlockSquare size={size - 2} rotation={0} />
      </div>
      <div className="flex items-center gap-0.5 bg-white px-1 py-0.5 rounded-lg border border-slate-300 shadow-xs mt-0.5">
        <BlockTriangle size={size} rotation={-90} />
        <BlockStar size={size} rotation={-90} />
        <BlockTriangle size={size} rotation={0} />
      </div>
    </div>
  );
};

// 选项 D 模型（干扰项 3）：顶层是星星，底层是向右倒（顺时针）的方块与三角形
export const BlockModelD: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-50/70 p-1.5 rounded-xl border border-amber-200 shadow-2xs">
      <div className="bg-white px-1 py-0.5 rounded-lg border border-slate-300 shadow-xs">
        <BlockStar size={size} rotation={0} />
      </div>
      <div className="flex items-center gap-0.5 bg-white px-1 py-0.5 rounded-lg border border-slate-300 shadow-xs mt-0.5">
        <BlockSquare size={size - 2} rotation={90} />
        <BlockTriangle size={size} rotation={90} />
      </div>
    </div>
  );
};

/* ================= 1039 题 紧凑高饱满度的工厂流水线场景 ================= */
export const ShapeFactoryStaticIllustration: React.FC = () => {
  return (
    <div
      id="shape-factory-static-display"
      className="w-full h-full flex flex-col p-2.5 bg-white text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200 shadow-xs justify-between gap-1.5"
    >
      {/* 1. 顶部紧凑标题栏 */}
      <div className="w-full bg-amber-50/90 rounded-xl px-3 py-1.5 border border-amber-200 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base">🏭</span>
          <h3 className="text-xs sm:text-sm font-black text-amber-950">
            玩具工厂 · 积木合成流水线图纸
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-amber-800 font-bold border border-amber-200">
            静态工程图
          </span>
        </div>
        <div className="text-[11px] font-bold text-amber-800">
          💡 追踪每台机器的“上下堆叠”与“向左旋转倒下”
        </div>
      </div>

      {/* 2. 机器 A 和 机器 B 的功能定义图解卡（明亮、清晰图示） */}
      <div className="w-full grid grid-cols-2 gap-2 shrink-0">
        {/* 机器 A 规则 */}
        <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/60 p-2 flex items-center justify-between gap-2 shadow-2xs">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center shadow-xs">
                A
              </span>
              <span className="text-xs font-black text-indigo-950">机器 A（上下堆叠）</span>
            </div>
            <p className="text-[10px] text-indigo-700 font-bold mt-0.5">
              第1块在上，第2块在下
            </p>
          </div>

          {/* 机器 A 示意图示 */}
          <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-indigo-200 shadow-2xs">
            <div className="flex items-center gap-0.5 text-[9px] font-bold text-slate-500">
              <span className="px-1 py-0.5 bg-slate-100 rounded">①</span>
              <span>+</span>
              <span className="px-1 py-0.5 bg-slate-100 rounded">②</span>
            </div>
            <ArrowRight className="w-3 h-3 text-indigo-500" />
            <div className="flex flex-col items-center gap-0.5">
              <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-800 text-[8px] font-black rounded">①在上</span>
              <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 text-[8px] font-bold rounded">②在下</span>
            </div>
          </div>
        </div>

        {/* 机器 B 规则 */}
        <div className="rounded-xl border-2 border-rose-200 bg-rose-50/60 p-2 flex items-center justify-between gap-2 shadow-2xs">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-rose-600 text-white text-[11px] font-black flex items-center justify-center shadow-xs">
                B
              </span>
              <span className="text-xs font-black text-rose-950">机器 B（左倒并排）</span>
            </div>
            <p className="text-[10px] text-rose-700 font-bold mt-0.5">
              向左倒下(↺)，①排在②左边
            </p>
          </div>

          {/* 机器 B 示意图示 */}
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-rose-200 shadow-2xs">
            <RotateCcw className="w-3 h-3 text-rose-500" />
            <ArrowRight className="w-3 h-3 text-rose-500" />
            <div className="flex items-center gap-0.5">
              <span className="px-1 py-0.5 bg-rose-100 text-rose-800 text-[8px] font-black rounded">①左倒</span>
              <span className="px-1 py-0.5 bg-slate-200 text-slate-700 text-[8px] font-bold rounded">②左倒</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 中部核心：流水线工艺路线图 (SVG 纯白底矢量拓扑图，撑满视觉区域) */}
      <div className="w-full flex-1 relative flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-slate-200 p-2 min-h-[190px]">
        <svg
          viewBox="0 0 540 185"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker id="arrow_pipe" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748B" />
            </marker>
          </defs>

          {/* ===== 阶段 1：两块初始积木 (黄色五角星 + 绿色方块) 进入机器 A ===== */}
          {/* 输入 1: 黄色五角星 */}
          <foreignObject x="10" y="14" width="44" height="44">
            <BlockStar size={38} rotation={0} />
          </foreignObject>
          <text x="32" y="68" fill="#D97706" fontSize="11" fontWeight="900" textAnchor="middle">第1块</text>

          {/* 输入 2: 绿色方块 */}
          <foreignObject x="10" y="82" width="44" height="44">
            <BlockSquare size={36} rotation={0} />
          </foreignObject>
          <text x="32" y="134" fill="#047857" fontSize="11" fontWeight="900" textAnchor="middle">第2块</text>

          {/* 进管 1 & 2 连线到 机器 A1 */}
          <path d="M 56 36 L 95 56" stroke="#94A3B8" strokeWidth="2.8" fill="none" markerEnd="url(#arrow_pipe)" />
          <path d="M 56 100 L 95 76" stroke="#94A3B8" strokeWidth="2.8" fill="none" markerEnd="url(#arrow_pipe)" />

          {/* 机器 A1 实体框 */}
          <g transform="translate(100, 36)">
            <rect x="0" y="0" width="60" height="60" rx="14" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2.8" />
            <text x="30" y="33" fill="#4338CA" fontSize="20" fontWeight="900" textAnchor="middle">A</text>
            <text x="30" y="49" fill="#6366F1" fontSize="9.5" fontWeight="bold" textAnchor="middle">上下叠</text>
          </g>

          {/* ===== 阶段 2：A1 输出结果 + 第3块积木 (红色三角形) 进入机器 B ===== */}
          <path d="M 163 66 L 225 66" stroke="#94A3B8" strokeWidth="2.8" fill="none" markerEnd="url(#arrow_pipe)" />

          {/* 输入 3: 红色三角形 */}
          <foreignObject x="175" y="102" width="44" height="44">
            <BlockTriangle size={38} rotation={0} />
          </foreignObject>
          <text x="197" y="154" fill="#B91C1C" fontSize="11" fontWeight="900" textAnchor="middle">第3块</text>

          {/* 第3块连接线到 机器 B */}
          <path d="M 218 122 L 242 100" stroke="#94A3B8" strokeWidth="2.8" fill="none" markerEnd="url(#arrow_pipe)" />

          {/* 机器 B 实体框 */}
          <g transform="translate(230, 40)">
            <rect x="0" y="0" width="60" height="60" rx="14" fill="#FFF1F2" stroke="#E11D48" strokeWidth="2.8" />
            <text x="30" y="33" fill="#BE123C" fontSize="20" fontWeight="900" textAnchor="middle">B</text>
            <text x="30" y="49" fill="#FB7185" fontSize="9.5" fontWeight="bold" textAnchor="middle">左倒并排</text>
          </g>

          {/* ===== 阶段 3：B 输出结果 + 第4块积木 (红色三角形) 进入机器 A2 ===== */}
          <path d="M 293 70 L 355 70" stroke="#94A3B8" strokeWidth="2.8" fill="none" markerEnd="url(#arrow_pipe)" />

          {/* 输入 4: 红色三角形 */}
          <foreignObject x="305" y="102" width="44" height="44">
            <BlockTriangle size={38} rotation={0} />
          </foreignObject>
          <text x="327" y="154" fill="#B91C1C" fontSize="11" fontWeight="900" textAnchor="middle">第4块</text>

          {/* 第4块连接线到 机器 A2 */}
          <path d="M 348 122 L 372 100" stroke="#94A3B8" strokeWidth="2.8" fill="none" markerEnd="url(#arrow_pipe)" />

          {/* 机器 A2 实体框 */}
          <g transform="translate(360, 40)">
            <rect x="0" y="0" width="60" height="60" rx="14" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2.8" />
            <text x="30" y="33" fill="#4338CA" fontSize="20" fontWeight="900" textAnchor="middle">A</text>
            <text x="30" y="49" fill="#6366F1" fontSize="9.5" fontWeight="bold" textAnchor="middle">上下叠</text>
          </g>

          {/* ===== 阶段 4：最终输出目标问号盒子 ===== */}
          <path d="M 423 70 L 465 70" stroke="#4F46E5" strokeWidth="3" strokeDasharray="5,3" fill="none" markerEnd="url(#arrow_pipe)" />

          {/* 问号终点盒子 */}
          <g transform="translate(470, 38)">
            <rect x="0" y="0" width="64" height="64" rx="16" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.8" />
            <text x="32" y="39" fill="#B45309" fontSize="28" fontWeight="900" textAnchor="middle">?</text>
            <text x="32" y="55" fill="#92400E" fontSize="9.5" fontWeight="black" textAnchor="middle">最终模型</text>
          </g>
        </svg>
      </div>

      {/* 4. 底部引导提示栏 */}
      <div className="w-full bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 px-3 shrink-0">
        <span className="flex items-center gap-1.5 text-indigo-700">
          <Wrench className="w-3.5 h-3.5" />
          <span>推导步骤：按“A上下叠 ➔ B左倒并排 ➔ A上下叠”逐步推理</span>
        </span>
        <span className="text-slate-500 font-bold hidden sm:inline">
          👉 请在右侧选择最终拼出来的积木模型
        </span>
      </div>
    </div>
  );
};
