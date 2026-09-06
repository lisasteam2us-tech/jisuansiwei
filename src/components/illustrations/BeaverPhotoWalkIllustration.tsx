import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  Compass,
  Sparkles,
  MapPin,
  Footprints,
} from 'lucide-react';

/* ================= 拍照位置与方向定义 ================= */
export type PhotoSpotId = 1 | 2 | 3;

export interface PhotoRecord {
  id: PhotoSpotId;
  label: string;
  stationName: string;
  gridPos: { row: number; col: number }; // 3x3 坐标 (1-based)
  direction: 'north' | 'south' | 'west';
  dirName: string;
  dirArrow: string;
  leftObject: 'house' | 'tree' | 'none';
  rightObject: 'house' | 'tree' | 'none';
  tip: string;
}

export const PHOTO_RECORDS: PhotoRecord[] = [
  {
    id: 1,
    label: '照片 1',
    stationName: '第 1 站 (西南角)',
    gridPos: { row: 3, col: 1 },
    direction: 'north',
    dirName: '面朝北边',
    dirArrow: '⬆️',
    leftObject: 'none',
    rightObject: 'house',
    tip: '波波在第1站面朝北⬆️看：右手边是小房子 🏠，左手边是草地',
  },
  {
    id: 2,
    label: '照片 2',
    stationName: '第 2 站 (正北边)',
    gridPos: { row: 1, col: 2 },
    direction: 'south',
    dirName: '面朝南边',
    dirArrow: '⬇️',
    leftObject: 'house',
    rightObject: 'tree',
    tip: '波波在第2站面朝南⬇️看：左手边是小房子 🏠，右手边是大绿树 🌳',
  },
  {
    id: 3,
    label: '照片 3',
    stationName: '第 3 站 (正东边)',
    gridPos: { row: 2, col: 3 },
    direction: 'west',
    dirName: '面朝西边',
    dirArrow: '⬅️',
    leftObject: 'none',
    rightObject: 'tree',
    tip: '波波在第3站面朝西⬅️看：右手边是大绿树 🌳，左手边是草地',
  },
];

/* ================= 可爱地标矢量 SVG ================= */

/* 1. 小房子 SVG */
export const CuteHouseSvg: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg
    viewBox="0 0 60 60"
    style={{ width: size, height: size }}
    className="drop-shadow-2xs overflow-visible select-none"
  >
    {/* 烟囱 */}
    <rect x="38" y="10" width="8" height="16" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1.5" rx="1" />
    <ellipse cx="42" cy="8" rx="4" ry="2" fill="#E2E8F0" opacity="0.8" />
    {/* 屋顶三角 */}
    <polygon points="30,8 6,28 54,28" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" strokeLinejoin="round" />
    {/* 房屋主体 */}
    <rect x="12" y="27" width="36" height="28" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="2" />
    {/* 门 */}
    <rect x="23" y="38" width="14" height="17" fill="#B45309" stroke="#78350F" strokeWidth="1.5" rx="2" />
    <circle cx="34" cy="46" r="1.5" fill="#FBBF24" />
    {/* 窗户 */}
    <rect x="15" y="31" width="8" height="8" fill="#60A5FA" stroke="#2563EB" strokeWidth="1" rx="1" />
    <line x1="19" y1="31" x2="19" y2="39" stroke="#2563EB" strokeWidth="1" />
    <line x1="15" y1="35" x2="23" y2="35" stroke="#2563EB" strokeWidth="1" />
  </svg>
);

/* 2. 大绿树 SVG */
export const CuteTreeSvg: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg
    viewBox="0 0 60 60"
    style={{ width: size, height: size }}
    className="drop-shadow-2xs overflow-visible select-none"
  >
    {/* 树干 */}
    <rect x="25" y="34" width="10" height="22" fill="#92400E" stroke="#78350F" strokeWidth="1.5" rx="2" />
    {/* 树冠底层 */}
    <ellipse cx="30" cy="32" rx="22" ry="14" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" />
    {/* 树冠中层 */}
    <ellipse cx="30" cy="23" rx="18" ry="13" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
    {/* 树冠顶层 */}
    <ellipse cx="30" cy="14" rx="13" ry="10" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
    {/* 树叶光斑 */}
    <circle cx="26" cy="12" r="3" fill="#BBF7D0" opacity="0.7" />
    <circle cx="36" cy="20" r="2.5" fill="#BBF7D0" opacity="0.7" />
  </svg>
);

/* 3. 小海狸波波带相机 SVG */
export const BoboBeaverSvg: React.FC<{
  direction: 'north' | 'south' | 'west';
  size?: number;
}> = ({ direction, size = 44 }) => {
  // 朝向旋转角 (北: 0, 南: 180, 西: -90 / 270)
  const rotationDeg = direction === 'north' ? 0 : direction === 'south' ? 180 : -90;

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center select-none"
    >
      <motion.div
        animate={{ rotate: rotationDeg }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-full h-full flex items-center justify-center relative"
      >
        {/* 视线视野光芒扇形 (正前方) */}
        <div
          className="absolute -top-7 w-12 h-8 bg-amber-400/25 rounded-t-full pointer-events-none border-t-2 border-dashed border-amber-500"
          style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }}
        />

        <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-sm overflow-visible">
          {/* 海狸大扁尾巴 */}
          <ellipse cx="30" cy="52" rx="11" ry="6" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <line x1="24" y1="52" x2="36" y2="52" stroke="#451A03" strokeWidth="1" strokeDasharray="2 1" />

          {/* 圆圆身体 */}
          <circle cx="30" cy="30" r="18" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          {/* 肚皮 */}
          <ellipse cx="30" cy="33" rx="11" ry="12" fill="#FDE68A" />

          {/* 圆耳朵 */}
          <circle cx="16" cy="18" r="5" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <circle cx="16" cy="18" r="2.5" fill="#FDE68A" />
          <circle cx="44" cy="18" r="5" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <circle cx="44" cy="18" r="2.5" fill="#FDE68A" />

          {/* 眼睛 */}
          <circle cx="24" cy="24" r="3" fill="#1E293B" />
          <circle cx="23" cy="23" r="1" fill="#FFFFFF" />
          <circle cx="36" cy="24" r="3" fill="#1E293B" />
          <circle cx="35" cy="23" r="1" fill="#FFFFFF" />

          {/* 鼻子 */}
          <ellipse cx="30" cy="28" rx="3.5" ry="2.5" fill="#451A03" />

          {/* 大板牙 */}
          <rect x="28" y="30.5" width="4" height="4.5" fill="#FFFFFF" stroke="#451A03" strokeWidth="0.8" rx="0.5" />
          <line x1="30" y1="30.5" x2="30" y2="35" stroke="#451A03" strokeWidth="0.6" />

          {/* 挂在脖子上的小相机 */}
          <rect x="23" y="37" width="14" height="9" fill="#0284C7" stroke="#0369A1" strokeWidth="1.2" rx="1.5" />
          <circle cx="30" cy="41.5" r="3" fill="#38BDF8" stroke="#0C4A6E" strokeWidth="0.8" />
          <rect x="25" y="35.5" width="3" height="2" fill="#E0F2FE" />
        </svg>

        {/* 车头正前方箭头指示 */}
        <div className="absolute -top-2 bg-amber-500 text-white rounded-full p-0.5 shadow-2xs">
          <span className="text-[8px] font-black leading-none block">▲</span>
        </div>
      </motion.div>
    </div>
  );
};

/* ================= 相片预览单张卡片 ================= */
export const SinglePhotoPolaroid: React.FC<{
  label: string;
  leftObj: 'house' | 'tree' | 'none';
  rightObj: 'house' | 'tree' | 'none';
  size?: 'xs' | 'sm' | 'md';
}> = ({ label, leftObj, rightObj, size = 'sm' }) => {
  const isXs = size === 'xs';
  const isSm = size === 'sm';

  const widthClass = isXs ? 'w-[50px] p-0.5' : isSm ? 'w-[68px] p-1' : 'w-[92px] p-1.5';
  const heightClass = isXs ? 'h-7' : isSm ? 'h-9' : 'h-12';
  const svgSize = isXs ? 14 : isSm ? 20 : 26;

  return (
    <div
      className={`flex flex-col items-center bg-white rounded-md border border-slate-300 shadow-2xs ${widthClass}`}
    >
      {/* 照片标签 */}
      <span className={`${isXs ? 'text-[7.5px]' : 'text-[8.5px]'} font-black text-slate-700 leading-none mb-0.5`}>
        {label}
      </span>

      {/* 相机取景框内部：左侧与右侧风景 */}
      <div
        className={`w-full bg-sky-50 rounded border border-sky-200 flex items-center justify-between px-0.5 relative ${heightClass}`}
      >
        {/* 左边 */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {leftObj === 'house' && <CuteHouseSvg size={svgSize} />}
          {leftObj === 'tree' && <CuteTreeSvg size={svgSize} />}
          {leftObj === 'none' && (
            <span className={`${isXs ? 'text-[6.5px]' : 'text-[7.5px]'} text-slate-300 font-bold`}>空</span>
          )}
        </div>

        {/* 中间镜头十字参考线 */}
        <div className="w-[1px] h-full bg-sky-200/80 mx-0.5" />

        {/* 右边 */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {rightObj === 'house' && <CuteHouseSvg size={svgSize} />}
          {rightObj === 'tree' && <CuteTreeSvg size={svgSize} />}
          {rightObj === 'none' && (
            <span className={`${isXs ? 'text-[6.5px]' : 'text-[7.5px]'} text-slate-300 font-bold`}>空</span>
          )}
        </div>
      </div>
      {/* 底部微型左右标识 */}
      <div className={`w-full flex justify-between px-0.5 mt-0.5 ${isXs ? 'text-[6px]' : 'text-[7px]'} font-bold text-slate-400 leading-none`}>
        <span>👈左</span>
        <span>右👉</span>
      </div>
    </div>
  );
};

/* ================= 选项中的 3 张照片微缩组合 ================= */
export const OptionPhotoSetPreview: React.FC<{
  photos: Array<{
    left: 'house' | 'tree' | 'none';
    right: 'house' | 'tree' | 'none';
  }>;
  size?: 'xs' | 'sm';
}> = ({ photos, size = 'xs' }) => {
  return (
    <div className="flex items-center gap-1 bg-slate-50/90 px-1 py-0.5 rounded-lg border border-slate-200 shrink-0">
      {photos.map((p, idx) => (
        <SinglePhotoPolaroid
          key={idx}
          label={`📸${idx + 1}`}
          leftObj={p.left}
          rightObj={p.right}
          size={size}
        />
      ))}
    </div>
  );
};

/* ================= 1072 核心主图组件 ================= */
export const BeaverPhotoWalkIllustration: React.FC = () => {
  // 当前选中的拍照站：1 | 2 | 3
  const [selectedSpotId, setSelectedSpotId] = useState<PhotoSpotId>(1);

  const currentRecord =
    PHOTO_RECORDS.find((r) => r.id === selectedSpotId) || PHOTO_RECORDS[0];

  return (
    <div
      id="beaver-photo-walk-workbench"
      className="w-full h-full flex flex-col p-2.5 bg-white text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200 shadow-xs justify-between gap-2"
    >
      {/* 1. 顶部标题栏 */}
      <div className="w-full bg-sky-50/70 rounded-xl px-3 py-1.5 border border-sky-200 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-sky-600" />
          <h3 className="text-xs sm:text-sm font-black text-sky-950">
            小海狸散步拍照 · 路线与相对视角
          </h3>
        </div>
        {/* 四向指南针简标 */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-sky-800 bg-white/90 px-2 py-0.5 rounded-lg border border-sky-200">
          <Compass className="w-3 h-3 text-sky-600" />
          <span>⬆️北 · ⬇️南 · ⬅️西 · ➡️东</span>
        </div>
      </div>

      {/* 2. 中央核心区：全宽公园秘密地图与互动站点 */}
      <div className="w-full flex-1 min-h-0 bg-slate-50/80 rounded-2xl p-3 border border-slate-200 flex flex-col justify-between gap-2.5">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700 px-1">
          <span className="flex items-center gap-1.5">
            <Footprints className="w-4 h-4 text-sky-600" />
            <span>公园散步地图（点击地点或下方按钮切换波波位置）：</span>
          </span>
          <span className="text-xs bg-sky-100 text-sky-900 px-2 py-0.5 rounded-lg font-black border border-sky-200">
            📍当前：{currentRecord.label} · {currentRecord.dirName} {currentRecord.dirArrow}
          </span>
        </div>

        {/* 3x3 公园小地图网格 */}
        {/*
            地图几何布局设计：
            Row 1 (北): [ (1,1) 大绿树 🌳,  (1,2) 📍第2站,       (1,3) 空草地 ]
            Row 2 (中): [ (2,1) 空草地,     (2,2) 小房子 🏠,     (2,3) 📍第3站 ]
            Row 3 (南): [ (3,1) 📍第1站,    (3,2) 空草地,        (3,3) 空草地 ]
        */}
        <div className="relative w-full max-w-md aspect-[4/3] max-h-[220px] bg-emerald-50/70 rounded-2xl border-2 border-emerald-200 p-2.5 grid grid-cols-3 grid-rows-3 gap-2 shadow-inner mx-auto">
          {/* (1,1)：大绿树 🌳 */}
          <div className="flex flex-col items-center justify-center bg-emerald-100/70 rounded-xl border border-emerald-300 relative shadow-2xs">
            <CuteTreeSvg size={44} />
            <span className="text-[9px] font-black text-emerald-900 absolute bottom-1 bg-white/70 px-1 rounded-full">
              大绿树 🌳
            </span>
          </div>

          {/* (1,2)：第 2 站 (面朝南 ⬇️) */}
          <div
            onClick={() => setSelectedSpotId(2)}
            className={`cursor-pointer flex flex-col items-center justify-center rounded-xl border-2 transition-all relative ${
              selectedSpotId === 2
                ? 'bg-amber-100 border-amber-500 shadow-md scale-102 ring-3 ring-amber-300/60'
                : 'bg-white/80 border-dashed border-sky-300 hover:bg-sky-50'
            }`}
          >
            {selectedSpotId === 2 ? (
              <>
                <BoboBeaverSvg direction="south" size={44} />
                <span className="text-[8.5px] font-black text-amber-950 absolute -bottom-1 bg-amber-200 px-1.5 py-0.2 rounded-full border border-amber-400">
                  第2站(南⬇️)
                </span>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-sky-700">
                <span className="text-xs font-black">📍第 2 站</span>
                <span className="text-[9px] text-slate-500 font-bold">朝南 ⬇️</span>
              </div>
            )}
          </div>

          {/* (1,3)：东北角草地 */}
          <div className="flex items-center justify-center text-slate-300 text-xs">
            <span className="text-emerald-700/50 font-black text-[10px]">北 ⬆️</span>
          </div>

          {/* (2,1)：正西草地 */}
          <div className="flex items-center justify-center text-slate-300 text-xs">
            <span className="text-emerald-700/50 font-black text-[10px]">⬅️ 西</span>
          </div>

          {/* (2,2)：中心小房子 🏠 */}
          <div className="flex flex-col items-center justify-center bg-amber-100/70 rounded-xl border border-amber-300 relative shadow-2xs">
            <CuteHouseSvg size={44} />
            <span className="text-[9px] font-black text-amber-900 absolute bottom-1 bg-white/70 px-1 rounded-full">
              小房子 🏠
            </span>
          </div>

          {/* (2,3)：第 3 站 (面朝西 ⬅️) */}
          <div
            onClick={() => setSelectedSpotId(3)}
            className={`cursor-pointer flex flex-col items-center justify-center rounded-xl border-2 transition-all relative ${
              selectedSpotId === 3
                ? 'bg-amber-100 border-amber-500 shadow-md scale-102 ring-3 ring-amber-300/60'
                : 'bg-white/80 border-dashed border-sky-300 hover:bg-sky-50'
            }`}
          >
            {selectedSpotId === 3 ? (
              <>
                <BoboBeaverSvg direction="west" size={44} />
                <span className="text-[8.5px] font-black text-amber-950 absolute -bottom-1 bg-amber-200 px-1.5 py-0.2 rounded-full border border-amber-400">
                  第3站(西⬅️)
                </span>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-sky-700">
                <span className="text-xs font-black">📍第 3 站</span>
                <span className="text-[9px] text-slate-500 font-bold">朝西 ⬅️</span>
              </div>
            )}
          </div>

          {/* (3,1)：第 1 站 (面朝北 ⬆️) */}
          <div
            onClick={() => setSelectedSpotId(1)}
            className={`cursor-pointer flex flex-col items-center justify-center rounded-xl border-2 transition-all relative ${
              selectedSpotId === 1
                ? 'bg-amber-100 border-amber-500 shadow-md scale-102 ring-3 ring-amber-300/60'
                : 'bg-white/80 border-dashed border-sky-300 hover:bg-sky-50'
            }`}
          >
            {selectedSpotId === 1 ? (
              <>
                <BoboBeaverSvg direction="north" size={44} />
                <span className="text-[8.5px] font-black text-amber-950 absolute -bottom-1 bg-amber-200 px-1.5 py-0.2 rounded-full border border-amber-400">
                  第1站(北⬆️)
                </span>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-sky-700">
                <span className="text-xs font-black">📍第 1 站</span>
                <span className="text-[9px] text-slate-500 font-bold">朝北 ⬆️</span>
              </div>
            )}
          </div>

          {/* (3,2)：正南草地 */}
          <div className="flex items-center justify-center text-slate-300 text-xs">
            <span className="text-emerald-700/50 font-black text-[10px]">南 ⬇️</span>
          </div>

          {/* (3,3)：东南角草地 */}
          <div className="flex items-center justify-center text-slate-300 text-xs">
            <span className="text-emerald-700/50 font-black text-[10px]">东 ➡️</span>
          </div>
        </div>

        {/* 3 个拍照站点切换按钮 */}
        <div className="grid grid-cols-3 gap-2">
          {PHOTO_RECORDS.map((rec) => {
            const isSelected = selectedSpotId === rec.id;
            return (
              <button
                key={rec.id}
                onClick={() => setSelectedSpotId(rec.id)}
                className={`cursor-pointer p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-0.5 ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-700 shadow-xs ring-2 ring-sky-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
                }`}
              >
                <span className="text-xs font-black flex items-center gap-1">
                  <span>{rec.label}</span>
                  <span>{rec.dirArrow}</span>
                </span>
                <span
                  className={`text-[10.5px] font-bold ${
                    isSelected ? 'text-sky-100' : 'text-slate-500'
                  }`}
                >
                  {rec.stationName} · {rec.dirName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 底部思考指引 */}
      <div className="w-full bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 px-3 shrink-0">
        <span className="flex items-center gap-1.5 text-sky-950">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>解题提示：注意波波在不同站点散步时，身体面朝的方向和左右手边的风景哦！</span>
        </span>
        <span className="text-slate-500 font-bold hidden sm:inline">
          👉 请在右侧选出正确的一组照片
        </span>
      </div>
    </div>
  );
};
