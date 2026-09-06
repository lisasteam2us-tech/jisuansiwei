import React from 'react';

/* ================= 2D 纯手绘矢量小茶壶与小茶杯 ================= */

// 1. 2D 手绘青釉小茶壶
export const VectorTeapot: React.FC<{ size?: number }> = ({ size = 36 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
        {/* 壶把手 */}
        <path d="M20 36 C10 36 8 56 22 60" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        {/* 壶嘴 */}
        <path d="M60 42 C68 38 72 26 74 24 C72 32 68 50 58 54" fill="#14B8A6" stroke="#0D9488" strokeWidth="2.5" strokeLinejoin="round" />
        {/* 壶身 */}
        <ellipse cx="42" cy="48" rx="22" ry="18" fill="url(#teapot_glaze_static)" stroke="#0D9488" strokeWidth="2.5" />
        {/* 壶盖与顶纽 */}
        <ellipse cx="42" cy="30" rx="13" ry="4.5" fill="#2DD4BF" stroke="#0D9488" strokeWidth="2" />
        <circle cx="42" cy="24" r="3" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        {/* 高光 */}
        <path d="M28 42 C28 36 34 34 40 34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        {/* 拟人化小眼珠 */}
        <circle cx="37" cy="46" r="1.8" fill="#0F172A" />
        <circle cx="47" cy="46" r="1.8" fill="#0F172A" />
        <path d="M40 50 Q42 53 44 50" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <defs>
          <linearGradient id="teapot_glaze_static" x1="20" y1="30" x2="64" y2="66" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="60%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// 2. 2D 手绘暖橙小茶杯
export const VectorTeacup: React.FC<{ size?: number }> = ({ size = 30 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
        {/* 碟托 */}
        <ellipse cx="35" cy="54" rx="20" ry="4.5" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
        {/* 把手 */}
        <path d="M48 34 C55 34 55 45 48 47" stroke="#D97706" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* 杯身 */}
        <path d="M20 28 L24 49 C25 52 45 52 46 49 L50 28 Z" fill="url(#teacup_glaze_static)" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
        {/* 杯口 */}
        <ellipse cx="35" cy="28" rx="14" ry="3" fill="#FEF08A" stroke="#D97706" strokeWidth="1.8" />
        {/* 高光 */}
        <path d="M26 34 L28 45" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        <defs>
          <linearGradient id="teacup_glaze_static" x1="20" y1="28" x2="50" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

/* ================= 机器人管家形象 ================= */
export const VectorRobotHead: React.FC<{ size?: number }> = ({ size = 36 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* 天线 */}
        <line x1="30" y1="12" x2="30" y2="4" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="4" r="3" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1" />
        {/* 头部外壳 */}
        <rect x="10" y="12" width="40" height="34" rx="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
        {/* 面部黑晶屏幕 */}
        <rect x="15" y="18" width="30" height="20" rx="6" fill="#0F172A" />
        {/* 眼睛 */}
        <circle cx="24" cy="28" r="3.5" fill="#38BDF8" />
        <circle cx="36" cy="28" r="3.5" fill="#38BDF8" />
        <circle cx="25" cy="26.5" r="1" fill="#FFFFFF" />
        <circle cx="37" cy="26.5" r="1" fill="#FFFFFF" />
        {/* 脖子 */}
        <rect x="25" y="46" width="10" height="4" rx="1" fill="#94A3B8" />
      </svg>
    </div>
  );
};

/* ================= 单个静态橱柜陈列架卡片（客观中立，绝不剧透答案） ================= */
interface CabinetShelfProps {
  shelfLabel: string;
  items: ('teapot' | 'teacup' | 'empty')[];
}

const CabinetShelfCard: React.FC<CabinetShelfProps> = ({
  shelfLabel,
  items,
}) => {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-colors">
      {/* 顶部标签 */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
        <span className="font-black text-xs text-slate-800 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">
          {shelfLabel}
        </span>
        <span className="text-[11px] font-medium text-slate-400">
          6 槽位橱柜
        </span>
      </div>

      {/* 静态置物架槽位陈列 (一排 6 格，完全平权中立展示) */}
      <div className="w-full bg-amber-50/60 rounded-xl p-2 border border-amber-200/70">
        <div className="grid grid-cols-6 gap-1.5 w-full">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="h-14 rounded-lg bg-white border border-amber-200/60 flex flex-col items-center justify-center p-0.5 shadow-2xs relative"
            >
              <span className="text-[8px] font-bold text-slate-300 absolute top-0.5 left-1">
                {idx + 1}
              </span>
              <div className="flex-1 flex items-center justify-center">
                {item === 'teapot' && <VectorTeapot size={32} />}
                {item === 'teacup' && <VectorTeacup size={26} />}
                {item === 'empty' && (
                  <span className="text-[10px] text-slate-300 font-mono">空</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* 木质置物托板线条 */}
        <div className="h-1.5 w-full bg-amber-400/60 rounded-full mt-2 border border-amber-500/30" />
      </div>
    </div>
  );
};

/* ================= 1036 题 纯静态陈列展示组件（无任何勾叉、数量提示或答案高亮） ================= */
export const RobotCabinetParitySimulation: React.FC = () => {
  // 四个柜子的静态陈列（与题干 A/B/C/D 选项一致，完全客观呈现）
  const cabinetList: CabinetShelfProps[] = [
    {
      shelfLabel: 'A 号柜子',
      items: ['teapot', 'teapot', 'teacup', 'teapot', 'teapot', 'teacup'],
    },
    {
      shelfLabel: 'B 号柜子',
      items: ['teapot', 'teapot', 'teapot', 'teapot', 'teapot', 'teapot'],
    },
    {
      shelfLabel: 'C 号柜子',
      items: ['teapot', 'teapot', 'teapot', 'teacup', 'teacup', 'empty'],
    },
    {
      shelfLabel: 'D 号柜子',
      items: ['teacup', 'teapot', 'teapot', 'teacup', 'teacup', 'empty'],
    },
  ];

  return (
    <div
      id="robot-cabinet-neutral-display"
      className="w-full h-full flex flex-col justify-between p-3 bg-slate-50/60 text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200/80"
    >
      {/* 1. 顶部规则陈述卡片（仅说明情境，客观中立） */}
      <div className="w-full bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-200 flex items-center justify-center shrink-0">
            <VectorRobotHead size={30} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900">
              机器人管家的餐具橱柜
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              观察各柜子中餐具的摆放情况，找出哪一个柜子<strong>不符合</strong>摆放规则。
            </p>
          </div>
        </div>

        {/* 餐具图例 */}
        <div className="hidden sm:flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <div className="flex items-center gap-1.5">
            <VectorTeapot size={22} />
            <span className="text-[11px] font-bold text-slate-600">小茶壶</span>
          </div>
          <div className="h-3 w-px bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <VectorTeacup size={18} />
            <span className="text-[11px] font-bold text-slate-600">小茶杯</span>
          </div>
        </div>
      </div>

      {/* 2. 主区域：四个柜子的纯客观静态陈列 (2x2 网格，完全平等一致的样式) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 my-2.5 flex-1 items-stretch">
        {cabinetList.map((cabinet, idx) => (
          <CabinetShelfCard key={idx} {...cabinet} />
        ))}
      </div>

      {/* 3. 底部提示（仅引导观察，无任何判定与剧透） */}
      <div className="w-full bg-white rounded-xl p-2.5 border border-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-500">
        💡 仔细数一数每个柜子中餐具的数量与组合，在下方选项中选出正确答案。
      </div>
    </div>
  );
};
