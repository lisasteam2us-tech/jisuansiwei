import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  Sparkles,
  Layers,
  Check,
} from 'lucide-react';

/* ================= 4 种木头类型定义 ================= */
export type LogType = 'pointed' | 'striped' | 'leafy' | 'plain';

export interface LogItem {
  type: LogType;
  name: string;
  badge: string;
}

export const LOG_TYPES: Record<LogType, { name: string; tag: string; color: string; desc: string }> = {
  pointed: {
    name: '尖顶木头',
    tag: '▲ 尖尖顶',
    color: '#D97706',
    desc: '削尖平直',
  },
  striped: {
    name: '斑纹木头',
    tag: '🦓 斑纹',
    color: '#475569',
    desc: '黑白斑纹',
  },
  leafy: {
    name: '长绿叶木头',
    tag: '🌿 绿叶',
    color: '#16A34A',
    desc: '侧面小嫩叶',
  },
  plain: {
    name: '纯棕木头',
    tag: '🪵 纯棕',
    color: '#92400E',
    desc: '无叶平顶',
  },
};

/* ================= 4 张候选相片数据 ================= */
export interface PhotoCandidate {
  id: string; // 'A' | 'B' | 'C' | 'D'
  title: string;
  logs: LogType[];
}

export const CANDIDATE_PHOTOS: PhotoCandidate[] = [
  {
    id: 'A',
    title: '照片 A',
    logs: ['striped', 'leafy', 'pointed', 'plain'],
  },
  {
    id: 'B',
    title: '照片 B',
    logs: ['leafy', 'pointed', 'striped', 'plain'],
  },
  {
    id: 'C',
    title: '照片 C',
    logs: ['striped', 'plain', 'pointed', 'leafy'],
  },
  {
    id: 'D',
    title: '照片 D',
    logs: ['striped', 'plain', 'leafy', 'pointed'],
  },
];

/* ================= 木头 SVG 独立矢量组件 ================= */
export const SingleLogSvg: React.FC<{
  type: LogType;
  height?: number;
  showTag?: boolean;
}> = ({ type, height = 70, showTag = false }) => {
  return (
    <div className="flex flex-col items-center justify-end select-none">
      <svg
        viewBox="0 0 50 100"
        style={{ height }}
        className="w-auto drop-shadow-2xs overflow-visible"
      >
        {/* 1. 尖顶木头 */}
        {type === 'pointed' && (
          <g>
            <rect
              x="10"
              y="32"
              width="30"
              height="64"
              rx="4"
              fill="#B45309"
              stroke="#451A03"
              strokeWidth="2"
            />
            <polygon
              points="25,4 10,32 40,32"
              fill="#FDE68A"
              stroke="#451A03"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <line x1="25" y1="4" x2="25" y2="32" stroke="#D97706" strokeWidth="1.5" />
            <line x1="18" y1="45" x2="18" y2="85" stroke="#92400E" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="32" y1="40" x2="32" y2="80" stroke="#92400E" strokeWidth="1.5" strokeDasharray="4 4" />
          </g>
        )}

        {/* 2. 斑纹木头 */}
        {type === 'striped' && (
          <g>
            <rect
              x="10"
              y="16"
              width="30"
              height="80"
              rx="4"
              fill="#78716C"
              stroke="#292524"
              strokeWidth="2"
            />
            <ellipse cx="25" cy="18" rx="15" ry="5" fill="#A8A29E" stroke="#292524" strokeWidth="1.5" />
            <rect x="10" y="28" width="30" height="8" fill="#F5F5F4" />
            <rect x="10" y="46" width="30" height="8" fill="#F5F5F4" />
            <rect x="10" y="64" width="30" height="8" fill="#F5F5F4" />
            <rect x="10" y="82" width="30" height="6" fill="#F5F5F4" />
            <line x1="10" y1="28" x2="40" y2="28" stroke="#292524" strokeWidth="1.5" />
            <line x1="10" y1="36" x2="40" y2="36" stroke="#292524" strokeWidth="1.5" />
            <line x1="10" y1="46" x2="40" y2="46" stroke="#292524" strokeWidth="1.5" />
            <line x1="10" y1="54" x2="40" y2="54" stroke="#292524" strokeWidth="1.5" />
            <line x1="10" y1="64" x2="40" y2="64" stroke="#292524" strokeWidth="1.5" />
            <line x1="10" y1="72" x2="40" y2="72" stroke="#292524" strokeWidth="1.5" />
          </g>
        )}

        {/* 3. 长绿叶木头 */}
        {type === 'leafy' && (
          <g>
            <rect
              x="10"
              y="16"
              width="30"
              height="80"
              rx="4"
              fill="#92400E"
              stroke="#451A03"
              strokeWidth="2"
            />
            <ellipse cx="25" cy="18" rx="15" ry="5" fill="#D97706" stroke="#451A03" strokeWidth="1.5" />
            <path d="M 10 40 Q -2 36 2 26 C 8 28 10 35 10 40 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            <path d="M 10 42 Q -4 46 -2 56 C 4 54 8 48 10 42 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1.5" />
            <path d="M 40 60 Q 52 56 48 46 C 42 48 40 55 40 60 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
          </g>
        )}

        {/* 4. 纯棕木头 */}
        {type === 'plain' && (
          <g>
            <rect
              x="10"
              y="16"
              width="30"
              height="80"
              rx="4"
              fill="#78350F"
              stroke="#451A03"
              strokeWidth="2"
            />
            <ellipse cx="25" cy="18" rx="15" ry="5" fill="#B45309" stroke="#451A03" strokeWidth="1.5" />
            <line x1="20" y1="30" x2="20" y2="85" stroke="#92400E" strokeWidth="1.5" strokeDasharray="5 4" />
            <line x1="30" y1="35" x2="30" y2="75" stroke="#92400E" strokeWidth="1.5" strokeDasharray="3 3" />
          </g>
        )}
      </svg>

      {showTag && (
        <span className="text-[9px] font-black text-slate-700 mt-1 whitespace-nowrap">
          {LOG_TYPES[type].name}
        </span>
      )}
    </div>
  );
};

/* 选项中的微缩相片排列表 */
export const OptionLogPhotoPreview: React.FC<{
  logs: LogType[];
}> = ({ logs }) => {
  return (
    <div className="flex items-center gap-1.5 bg-amber-50/70 px-2 py-1 rounded-xl border border-amber-200/80 overflow-x-auto">
      {logs.map((type, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white rounded-lg p-1 border border-amber-300 shadow-2xs shrink-0"
        >
          <SingleLogSvg type={type} height={40} />
          <span className="text-[8.5px] font-bold text-amber-900 mt-0.5 leading-none">
            {LOG_TYPES[type].tag.slice(0, 3)}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ================= 1069 核心主图组件 ================= */
export const PhotoLogCluesIllustration: React.FC = () => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  return (
    <div
      id="photo-log-clues-lab"
      className="w-full h-full flex flex-col p-2.5 bg-white text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200 shadow-xs justify-between gap-2"
    >
      {/* 1. 顶部标题栏 */}
      <div className="w-full bg-amber-50/70 rounded-xl px-3 py-1.5 border border-amber-200 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-amber-700" />
          <h3 className="text-xs sm:text-sm font-black text-amber-950">
            河边木头全景照片 · 找准排位
          </h3>
        </div>
        <div className="text-[11px] font-bold text-amber-900">
          📷 找出满足两条线索的照片
        </div>
      </div>

      {/* 2. 两个关键过滤线索条 */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-1.5 shrink-0">
        <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-1.5 flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-rose-500 text-white font-black text-xs flex items-center justify-center shrink-0">
            1
          </div>
          <div className="text-[11px] leading-tight text-rose-950 font-bold">
            <span>【尖顶木头】与【斑纹木头】</span>
            <span className="text-rose-600 font-black ml-0.5 underline">没挨在一起</span>
          </div>
        </div>

        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-1.5 flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
            2
          </div>
          <div className="text-[11px] leading-tight text-emerald-950 font-bold">
            <span>【尖顶木头】右边紧挨着</span>
            <span className="text-emerald-700 font-black ml-0.5 underline">【纯棕木头】</span>
          </div>
        </div>
      </div>

      {/* 3. 4 张候选全景照片（纯白画框） */}
      <div className="w-full bg-slate-50/80 rounded-2xl p-2.5 border border-slate-200 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 px-1">
          <span>4 张洗印出来的候选照片：</span>
          <span className="text-[10px] text-slate-400">从左往右看 ➔</span>
        </div>

        {/* 4 张相片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CANDIDATE_PHOTOS.map((photo) => {
            const isSelected = selectedPhotoId === photo.id;

            return (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() =>
                  setSelectedPhotoId(selectedPhotoId === photo.id ? null : photo.id)
                }
                className={`cursor-pointer rounded-xl p-2 border-2 transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                {/* 编号与状态 */}
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-black border border-slate-200">
                    {photo.title}
                  </span>
                  <span className="text-[10px] text-slate-400">点击选中</span>
                </div>

                {/* 相片内的 4 根木头排列 */}
                <div className="w-full flex items-end justify-around py-1 bg-amber-50/50 rounded-lg border border-amber-100 px-2 min-h-[75px]">
                  {photo.logs.map((type, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <SingleLogSvg type={type} height={52} />
                      <span className="text-[8.5px] font-bold text-slate-500 mt-0.5">
                        {idx + 1}号
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. 4 种木头标准图鉴 */}
      <div className="w-full bg-white rounded-xl p-2 border border-slate-200 flex flex-col gap-1">
        <div className="text-[11px] font-bold text-slate-700 px-1 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          <span>4 种木头特征：</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {(Object.keys(LOG_TYPES) as LogType[]).map((key) => {
            const item = LOG_TYPES[key];
            return (
              <div
                key={key}
                className="bg-slate-50 rounded-lg p-1 border border-slate-200 flex flex-col items-center text-center"
              >
                <SingleLogSvg type={key} height={36} />
                <span className="text-[9.5px] font-bold text-slate-800 mt-0.5">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. 底部解题指引 */}
      <div className="w-full bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 px-3 shrink-0">
        <span className="flex items-center gap-1.5 text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>解题提示：找到尖顶木头，检查它右边是不是纯棕木头，且没有紧挨斑纹木头！</span>
        </span>
        <span className="text-slate-500 font-bold hidden sm:inline">
          👉 请在右侧选择正确的照片
        </span>
      </div>
    </div>
  );
};
