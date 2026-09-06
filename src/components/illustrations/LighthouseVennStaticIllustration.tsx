import React from 'react';

/* ================= 2D 儿童绘本风格矢量灯塔 ================= */
const VectorLighthouse: React.FC<{
  label: string;
  themeColor: string;
  badgeBg: string;
  badgeText: string;
}> = ({ label, themeColor, badgeBg, badgeText }) => {
  return (
    <div className="flex flex-col items-center select-none">
      <svg viewBox="0 0 60 68" className="w-12 h-14 drop-shadow-xs">
        {/* 灯光顶部小光环 */}
        <circle cx="30" cy="16" r="9" fill="#FEF08A" opacity="0.95" />
        <circle cx="30" cy="16" r="4.5" fill="#FBBF24" />

        {/* 屋顶圆锥 */}
        <polygon points="30,4 21,14 39,14" fill={themeColor} stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />

        {/* 玻璃灯房 */}
        <rect x="22" y="14" width="16" height="9" rx="2" fill="#FEF9C3" stroke="#1E293B" strokeWidth="2" />
        <line x1="30" y1="14" x2="30" y2="23" stroke="#F59E0B" strokeWidth="1.8" />

        {/* 塔身基座 */}
        <polygon points="22,23 38,23 41,51 19,51" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
        {/* 彩色条纹 */}
        <polygon points="21,31 39,31 40,40 20,40" fill={themeColor} />
        {/* 小门窗 */}
        <rect x="27" y="26" width="6" height="4" rx="1" fill="#334155" />
        <path d="M26 44 A4 4 0 0 1 34 44 L34 51 L26 51 Z" fill="#334155" />

        {/* 底部绿色草地小岛礁 */}
        <ellipse cx="30" cy="54" rx="20" ry="6" fill="#86EFAC" stroke="#1E293B" strokeWidth="2" />
      </svg>

      {/* 醒目的儿童友好铭牌徽章 */}
      <span
        className="text-xs font-black px-2.5 py-0.5 rounded-full mt-0.5 border-2 shadow-xs"
        style={{ backgroundColor: badgeBg, color: badgeText, borderColor: themeColor }}
      >
        {label}
      </span>
    </div>
  );
};

/* ================= 1038 题 充满画布的高饱满清爽海图韦恩图 ================= */
export const LighthouseVennStaticIllustration: React.FC = () => {
  return (
    <div
      id="lighthouse-venn-kids-chart"
      className="w-full h-full flex flex-col p-2 bg-white text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200 shadow-xs"
    >
      {/* 顶部紧凑标题与提示栏 */}
      <div className="w-full bg-sky-50/90 rounded-xl px-3 py-1.5 border border-sky-200 flex items-center justify-between gap-2 mb-1.5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base">🧭</span>
          <h3 className="text-xs sm:text-sm font-black text-sky-950">
            三座灯塔的彩色光圈海图
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-sky-700 font-bold border border-sky-200">
            位置观察
          </span>
        </div>
        <div className="text-[11px] font-bold text-sky-800">
          💡 “看得到光”在圆内，“看不到光”在圆外
        </div>
      </div>

      {/* 主区域：铺满整个容器的高清矢量海图 (无额外空白，高空间利用率) */}
      <div className="w-full flex-1 relative flex items-center justify-center min-h-[300px]">
        <svg
          viewBox="0 0 540 380"
          className="w-full h-full select-none"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* 浅蓝水波纹背景网格 */}
            <pattern id="kids_sea_grid_dense" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="1.2" fill="#BAE6FD" opacity="0.7" />
            </pattern>

            {/* 3 个柔和明亮的半透明彩色圆盘 */}
            {/* 灯塔 A: 顶部粉红色圆盘 */}
            <radialGradient id="kidLightA_dense" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.16" />
            </radialGradient>

            {/* 灯塔 B: 左下天蓝色圆盘 */}
            <radialGradient id="kidLightB_dense" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.18" />
            </radialGradient>

            {/* 灯塔 C: 右下柔和暖黄色圆盘 */}
            <radialGradient id="kidLightC_dense" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#EAB308" stopOpacity="0.22" />
            </radialGradient>
          </defs>

          {/* 清爽浅蓝海面底卡 */}
          <rect x="0" y="0" width="540" height="380" rx="14" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="2" />
          <rect x="0" y="0" width="540" height="380" rx="14" fill="url(#kids_sea_grid_dense)" />

          {/* 装饰性水波小线 */}
          <path d="M25 35 Q40 38 55 35" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M480 345 Q495 348 510 345" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M30 345 Q45 348 60 345" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />

          {/* 3 个大幅放大的相互重叠光盘（充分撑满 540x380 画布） */}
          {/* 圆 A: 顶部 (cx: 270, cy: 135, r: 122) */}
          <circle
            cx="270"
            cy="135"
            r="122"
            fill="url(#kidLightA_dense)"
            stroke="#F43F5E"
            strokeWidth="3"
            strokeDasharray="6,4"
          />

          {/* 圆 B: 左下 (cx: 190, cy: 235, r: 122) */}
          <circle
            cx="190"
            cy="235"
            r="122"
            fill="url(#kidLightB_dense)"
            stroke="#0284C7"
            strokeWidth="3"
            strokeDasharray="6,4"
          />

          {/* 圆 C: 右下 (cx: 350, cy: 235, r: 122) */}
          <circle
            cx="350"
            cy="235"
            r="122"
            fill="url(#kidLightC_dense)"
            stroke="#D97706"
            strokeWidth="3"
            strokeDasharray="6,4"
          />

          {/* 各区域清晰文字标签 */}
          <g fontWeight="bold" textAnchor="middle">
            {/* 仅在 A 中 */}
            <text x="270" y="65" fill="#BE123C" fontSize="13" fontWeight="900">
              仅在 A 圈内
            </text>
            {/* 仅在 B 中 */}
            <text x="110" y="265" fill="#0369A1" fontSize="13" fontWeight="900">
              仅在 B 圈内
            </text>
            {/* 仅在 C 中 */}
            <text x="430" y="265" fill="#B45309" fontSize="13" fontWeight="900">
              仅在 C 圈内
            </text>

            {/* A 与 B 重叠 (不含 C) */}
            <rect x="135" y="132" width="90" height="22" rx="6" fill="#FFFFFF" fillOpacity="0.85" stroke="#CBD5E1" strokeWidth="1" />
            <text x="180" y="147" fill="#334155" fontSize="11" fontWeight="bold">
              A 与 B 重叠
            </text>

            {/* A 与 C 重叠 (不含 B) */}
            <rect x="315" y="132" width="90" height="22" rx="6" fill="#FFFFFF" fillOpacity="0.85" stroke="#CBD5E1" strokeWidth="1" />
            <text x="360" y="147" fill="#334155" fontSize="11" fontWeight="bold">
              A 与 C 重叠
            </text>

            {/* B 与 C 重叠区 (A 圈外) - 纯客观呈现 */}
            <rect x="195" y="292" width="150" height="26" rx="8" fill="#FFFFFF" fillOpacity="0.92" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="270" y="309" fill="#1E293B" fontSize="12" fontWeight="900">
              B 与 C 重叠区 (A 圈外)
            </text>

            {/* 三圆中心重叠 */}
            <rect x="225" y="196" width="90" height="22" rx="6" fill="#FFFFFF" fillOpacity="0.9" stroke="#94A3B8" strokeWidth="1.2" />
            <text x="270" y="211" fill="#0F172A" fontSize="11" fontWeight="900">
              三灯中心重叠
            </text>
          </g>

          {/* 三座矢量灯塔 */}
          {/* 灯塔 A: 顶部 (放置在圆 A 上半部偏中) */}
          <foreignObject x="235" y="80" width="70" height="75">
            <VectorLighthouse label="灯塔 A" themeColor="#F43F5E" badgeBg="#FFE4E6" badgeText="#9F1239" />
          </foreignObject>

          {/* 灯塔 B: 左下 */}
          <foreignObject x="155" y="180" width="70" height="75">
            <VectorLighthouse label="灯塔 B" themeColor="#0284C7" badgeBg="#E0F2FE" badgeText="#075985" />
          </foreignObject>

          {/* 灯塔 C: 右下 */}
          <foreignObject x="315" y="180" width="70" height="75">
            <VectorLighthouse label="灯塔 C" themeColor="#D97706" badgeBg="#FEF3C7" badgeText="#92400E" />
          </foreignObject>

          {/* 右上角指北针 */}
          <g transform="translate(490, 45)">
            <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
            <polygon points="0,-13 4.5,0 -4.5,0" fill="#EF4444" />
            <polygon points="0,13 4.5,0 -4.5,0" fill="#64748B" />
            <text x="0" y="-15" fill="#EF4444" fontSize="9" fontWeight="900" textAnchor="middle">北</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
