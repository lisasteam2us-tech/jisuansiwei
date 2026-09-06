import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';

/* ================= 6 只卡卡小怪兽样本数据 ================= */
export interface KakaSpecimen {
  id: number;
  label: string;
  name: string;
  isNewDiscovery?: boolean;
  arms: number; // 胳膊数量 (2 或 4)
  legs: number; // 腿数量 (2 或 4)
  hasTeeth: boolean; // 是否露尖牙 (全为 true)
  hasWings: boolean; // 是否有粉红翅膀
  hornCount: number; // 独角数量 (1 或 0)
  eyeCount: number; // 眼睛数量 (2 或 3)
  themeColor: string; // 身体主色调
  bellyColor: string; // 肚皮颜色
  accentColor: string; // 斑点/高光颜色
  desc: string;
}

export const KAKA_PHOTOS: KakaSpecimen[] = [
  {
    id: 1,
    label: '照片 1',
    name: '橙晶卡卡',
    arms: 2,
    legs: 2,
    hasTeeth: true,
    hasWings: false,
    hornCount: 1,
    eyeCount: 2,
    themeColor: '#FB923C',
    bellyColor: '#FFEDD5',
    accentColor: '#F59E0B',
    desc: '2臂 · 2腿 · 露齿 · 无翅 · 独角2眼',
  },
  {
    id: 2,
    label: '照片 2',
    name: '翠绿卡卡',
    arms: 4,
    legs: 4,
    hasTeeth: true,
    hasWings: true,
    hornCount: 0,
    eyeCount: 3,
    themeColor: '#4ADE80',
    bellyColor: '#DCFCE7',
    accentColor: '#16A34A',
    desc: '4臂 · 4腿 · 露齿 · 🪽有翅 · 无角3眼',
  },
  {
    id: 3,
    label: '照片 3',
    name: '紫雾卡卡',
    arms: 4,
    legs: 2,
    hasTeeth: true,
    hasWings: false,
    hornCount: 1,
    eyeCount: 2,
    themeColor: '#C084FC',
    bellyColor: '#F3E8FF',
    accentColor: '#9333EA',
    desc: '4臂 · 2腿 · 露齿 · 无翅 · 独角2眼',
  },
  {
    id: 4,
    label: '照片 4',
    name: '金阳卡卡',
    arms: 4,
    legs: 4,
    hasTeeth: true,
    hasWings: true,
    hornCount: 1,
    eyeCount: 2,
    themeColor: '#FBBF24',
    bellyColor: '#FEF3C7',
    accentColor: '#D97706',
    desc: '4臂 · 4腿 · 露齿 · 🪽有翅 · 独角2眼',
  },
  {
    id: 5,
    label: '照片 5',
    name: '粉萌卡卡',
    arms: 2,
    legs: 2,
    hasTeeth: true,
    hasWings: false,
    hornCount: 1,
    eyeCount: 2,
    themeColor: '#EC4899',
    bellyColor: '#FCE7F3',
    accentColor: '#FBBF24',
    desc: '2臂 · 2腿 · 露齿 · 无翅 · 独角2眼',
  },
  {
    id: 6,
    label: '照片 6',
    name: '星夜卡卡',
    isNewDiscovery: true,
    arms: 2,
    legs: 4,
    hasTeeth: true,
    hasWings: false,
    hornCount: 1,
    eyeCount: 2,
    themeColor: '#3B82F6',
    bellyColor: '#DBEAFE',
    accentColor: '#F59E0B',
    desc: '2臂 · 4腿 · 露齿 · 独角2眼',
  },
];

/* ================= 卡卡怪兽可爱 SVG 矢量绘图 ================= */
export const KakaMonsterSvg: React.FC<{
  specimen: KakaSpecimen;
  size?: number;
}> = ({ specimen, size = 100 }) => {
  const {
    arms,
    legs,
    hasTeeth,
    hasWings,
    hornCount,
    eyeCount,
    themeColor,
    bellyColor,
  } = specimen;

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center select-none"
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-2xs overflow-visible"
      >
        {/* 1. 翅膀 (如果有) */}
        {hasWings && (
          <g className="animate-pulse">
            {/* 左翅膀 */}
            <path
              d="M 45 65 C 10 35 15 80 40 90 Z"
              fill="#F472B6"
              stroke="#DB2777"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* 右翅膀 */}
            <path
              d="M 115 65 C 150 35 145 80 120 90 Z"
              fill="#F472B6"
              stroke="#DB2777"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* 2. 腿部 */}
        {legs === 2 ? (
          <g>
            {/* 左腿 */}
            <rect
              x="55"
              y="118"
              width="16"
              height="26"
              rx="8"
              fill={themeColor}
              stroke="#1E293B"
              strokeWidth="2.5"
            />
            <ellipse
              cx="60"
              cy="144"
              rx="12"
              ry="7"
              fill={themeColor}
              stroke="#1E293B"
              strokeWidth="2.5"
            />
            {/* 右腿 */}
            <rect
              x="89"
              y="118"
              width="16"
              height="26"
              rx="8"
              fill={themeColor}
              stroke="#1E293B"
              strokeWidth="2.5"
            />
            <ellipse
              cx="100"
              cy="144"
              rx="12"
              ry="7"
              fill={themeColor}
              stroke="#1E293B"
              strokeWidth="2.5"
            />
          </g>
        ) : (
          <g>
            {/* 4 条腿 */}
            <rect x="36" y="118" width="13" height="24" rx="6.5" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
            <ellipse cx="40" cy="142" rx="9" ry="6" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
            <rect x="58" y="118" width="13" height="24" rx="6.5" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
            <ellipse cx="63" cy="142" rx="9" ry="6" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
            <rect x="89" y="118" width="13" height="24" rx="6.5" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
            <ellipse cx="95" cy="142" rx="9" ry="6" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
            <rect x="109" y="118" width="13" height="24" rx="6.5" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
            <ellipse cx="117" cy="142" rx="9" ry="6" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
          </g>
        )}

        {/* 3. 身体躯干 */}
        <ellipse
          cx="80"
          cy="85"
          rx="44"
          ry="48"
          fill={themeColor}
          stroke="#1E293B"
          strokeWidth="3"
        />

        {/* 肚子浅色斑块 */}
        <ellipse
          cx="80"
          cy="94"
          rx="27"
          ry="30"
          fill={bellyColor}
          stroke="#1E293B"
          strokeWidth="1.5"
        />

        {/* 4. 胳膊 */}
        {arms === 2 ? (
          <g>
            <path
              d="M 40 82 C 22 75 20 62 25 55 C 32 48 40 68 45 76"
              fill={themeColor}
              stroke="#1E293B"
              strokeWidth="2.5"
            />
            <path
              d="M 120 82 C 138 75 140 62 135 55 C 128 48 120 68 115 76"
              fill={themeColor}
              stroke="#1E293B"
              strokeWidth="2.5"
            />
          </g>
        ) : (
          <g>
            <path d="M 40 70 C 18 60 18 45 26 40 C 34 38 38 56 42 66" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
            <path d="M 40 92 C 18 95 18 108 26 112 C 34 114 38 98 42 88" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
            <path d="M 120 70 C 142 60 142 45 134 40 C 126 38 122 56 118 66" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
            <path d="M 120 92 C 142 95 142 108 134 112 C 126 114 122 98 118 88" fill={themeColor} stroke="#1E293B" strokeWidth="2" />
          </g>
        )}

        {/* 5. 独角 */}
        {hornCount === 1 && (
          <polygon
            points="80,12 70,42 90,42"
            fill="#FBBF24"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        )}

        {/* 6. 眼睛 */}
        {eyeCount === 2 ? (
          <g>
            <circle cx="66" cy="68" r="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="68" cy="68" r="5" fill="#1E293B" />
            <circle cx="94" cy="68" r="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="92" cy="68" r="5" fill="#1E293B" />
          </g>
        ) : (
          <g>
            <circle cx="56" cy="72" r="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="58" cy="72" r="4" fill="#1E293B" />
            <circle cx="80" cy="58" r="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="80" cy="58" r="4" fill="#1E293B" />
            <circle cx="104" cy="72" r="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="102" cy="72" r="4" fill="#1E293B" />
          </g>
        )}

        {/* 7. 嘴巴与牙齿 */}
        <path
          d="M 64 96 Q 80 114 96 96 Z"
          fill="#BE123C"
          stroke="#1E293B"
          strokeWidth="2"
        />
        {hasTeeth && (
          <g>
            <polygon points="68,96 74,96 71,102" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1" />
            <polygon points="77,96 83,96 80,103" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1" />
            <polygon points="86,96 92,96 89,102" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1" />
          </g>
        )}
      </svg>
    </div>
  );
};

/* 选项中的特征规律胶囊速览 */
export const OptionMonsterPreview: React.FC<{
  ruleKey: string;
}> = ({ ruleKey }) => {
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-bold py-0.5">
      {ruleKey === 'A' && (
        <>
          <span className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200">💪 2条胳膊</span>
          <span className="text-slate-400">➔</span>
          <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">🦵 必为2条腿？</span>
        </>
      )}
      {ruleKey === 'B' && (
        <>
          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">🦷 全部怪兽</span>
          <span className="text-slate-400">➔</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">都有白牙齿</span>
        </>
      )}
      {ruleKey === 'C' && (
        <>
          <span className="px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200">🪽 有的长翅膀</span>
          <span className="text-slate-400">/</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200">有的无翅膀</span>
        </>
      )}
      {ruleKey === 'D' && (
        <>
          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">🦄 独角兽</span>
          <span className="text-slate-400">或</span>
          <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">👀 3只眼睛</span>
        </>
      )}
    </div>
  );
};

/* ================= 1068 核心主图组件 ================= */
export const AlienCreatureTreeIllustration: React.FC = () => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [filterTrait, setFilterTrait] = useState<
    'all' | 'two_arms' | 'four_legs' | 'wings' | 'horn_or_eyes'
  >('all');

  const selectedSpecimen = selectedPhotoId
    ? KAKA_PHOTOS.find((p) => p.id === selectedPhotoId)
    : null;

  return (
    <div
      id="alien-creature-decision-tree"
      className="w-full h-full flex flex-col p-2.5 bg-white text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200 shadow-xs justify-between gap-2"
    >
      {/* 1. 顶部标题栏 */}
      <div className="w-full bg-indigo-50/70 rounded-xl px-3 py-1.5 border border-indigo-200 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs sm:text-sm font-black text-indigo-950">
            卡卡小怪兽 6 张照片档案
          </h3>
        </div>
        <div className="text-[11px] font-bold text-indigo-800">
          🔬 找出被新照片推翻的错误结论
        </div>
      </div>

      {/* 2. 6 张怪兽照片网格展示（纯白明亮卡片） */}
      <div className="w-full bg-slate-50/80 rounded-2xl p-2.5 border border-slate-200 flex flex-col justify-between gap-2">
        {/* 工具栏：特征筛选测试器 */}
        <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 border-b border-slate-200/80 pb-1.5 px-1 gap-1 flex-wrap">
          <div className="flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-indigo-600" />
            <span>小怪兽照片：</span>
          </div>

          {/* 筛选特征按钮组 */}
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => setFilterTrait('all')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                filterTrait === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilterTrait('two_arms')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                filterTrait === 'two_arms'
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              💪 2条胳膊
            </button>
            <button
              onClick={() => setFilterTrait('four_legs')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                filterTrait === 'four_legs'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              🦵 4条腿
            </button>
            <button
              onClick={() => setFilterTrait('wings')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                filterTrait === 'wings'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              🪽 翅膀
            </button>
            <button
              onClick={() => setFilterTrait('horn_or_eyes')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                filterTrait === 'horn_or_eyes'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              🦄 独角/3眼
            </button>
          </div>
        </div>

        {/* 6 张照片网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {KAKA_PHOTOS.map((photo) => {
            const isSelected = selectedPhotoId === photo.id;

            // 特征匹配计算
            let isTraitMatched = true;
            if (filterTrait === 'two_arms') isTraitMatched = photo.arms === 2;
            if (filterTrait === 'four_legs') isTraitMatched = photo.legs === 4;
            if (filterTrait === 'wings') isTraitMatched = photo.hasWings;
            if (filterTrait === 'horn_or_eyes')
              isTraitMatched =
                (photo.hornCount === 1 && photo.eyeCount === 2) ||
                (photo.hornCount === 0 && photo.eyeCount === 3);

            return (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() =>
                  setSelectedPhotoId(selectedPhotoId === photo.id ? null : photo.id)
                }
                className={`cursor-pointer rounded-xl p-2 border-2 transition-all flex flex-col justify-between gap-1 relative overflow-hidden ${
                  isSelected
                    ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-xs'
                    : isTraitMatched
                    ? 'bg-white border-slate-200 hover:border-indigo-300'
                    : 'bg-slate-100/50 border-slate-200 opacity-40'
                }`}
              >
                {/* 顶部标签 */}
                <div className="flex items-center justify-between text-[10px] w-full">
                  <span
                    className={`px-1.5 py-0.5 rounded font-black flex items-center gap-1 ${
                      photo.isNewDiscovery
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{photo.label}</span>
                    {photo.isNewDiscovery && (
                      <span className="text-[9px] bg-amber-400 text-slate-900 px-1 rounded font-black">
                        新发现
                      </span>
                    )}
                  </span>
                  <span className="text-[9.5px] font-bold text-slate-600">
                    {photo.name}
                  </span>
                </div>

                {/* 卡卡怪兽可爱图形 */}
                <div className="w-full flex items-center justify-center py-1 bg-slate-50/60 rounded-lg border border-slate-100">
                  <KakaMonsterSvg specimen={photo} size={85} />
                </div>

                {/* 底部结构特征胶囊 */}
                <div className="w-full flex items-center justify-center gap-1 text-[9px] font-bold text-slate-600 bg-slate-50 rounded py-0.5 px-1 flex-wrap border border-slate-100">
                  <span className="text-violet-700">{photo.arms}臂</span>
                  <span>·</span>
                  <span
                    className={
                      photo.legs === 4 ? 'text-rose-700 font-black' : 'text-slate-700'
                    }
                  >
                    {photo.legs}腿
                  </span>
                  <span>·</span>
                  <span className="text-emerald-700">露齿</span>
                  <span>·</span>
                  <span>{photo.hasWings ? '🪽翅' : '无翅'}</span>
                  <span>·</span>
                  <span className="text-amber-700">
                    {photo.hornCount === 1 ? '1角' : '3眼'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. 选中小怪兽特征清单 */}
      <div className="w-full bg-white rounded-xl p-2 border border-slate-200 flex flex-col gap-1">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 px-1">
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {selectedSpecimen
                ? `【${selectedSpecimen.label} · ${selectedSpecimen.name}】特征清单：`
                : '特征比对备忘（点击任意照片查看）：'}
            </span>
          </span>
          {selectedSpecimen && (
            <button
              onClick={() => setSelectedPhotoId(null)}
              className="text-[10px] text-indigo-600 font-bold underline"
            >
              收起
            </button>
          )}
        </div>

        {selectedSpecimen ? (
          <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-50 rounded-lg border border-slate-200 text-center text-[10px]">
            <div className="bg-white p-1 rounded border border-slate-200">
              <div className="text-slate-400">胳膊</div>
              <div className="font-black text-violet-700 text-xs">
                {selectedSpecimen.arms} 条
              </div>
            </div>
            <div className="bg-white p-1 rounded border border-slate-200">
              <div className="text-slate-400">腿部</div>
              <div className="font-black text-blue-700 text-xs">
                {selectedSpecimen.legs} 条
              </div>
            </div>
            <div className="bg-white p-1 rounded border border-slate-200">
              <div className="text-slate-400">牙齿</div>
              <div className="font-black text-emerald-700 text-xs">
                {selectedSpecimen.hasTeeth ? '✅ 尖牙' : '❌ 无'}
              </div>
            </div>
            <div className="bg-white p-1 rounded border border-slate-200">
              <div className="text-slate-400">翅膀</div>
              <div className="font-black text-pink-700 text-xs">
                {selectedSpecimen.hasWings ? '🪽 有' : '无'}
              </div>
            </div>
            <div className="bg-white p-1 rounded border border-slate-200">
              <div className="text-slate-400">头脸</div>
              <div className="font-black text-amber-700 text-xs">
                {selectedSpecimen.hornCount === 1 ? '1角2眼' : '3只眼'}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[10px] text-slate-600 px-1">
            <div className="bg-slate-50 p-1 rounded border border-slate-200 flex items-center gap-1">
              <span className="text-violet-600 font-bold">A.</span>
              <span>2条胳膊 ➔ 必2条腿？</span>
            </div>
            <div className="bg-slate-50 p-1 rounded border border-slate-200 flex items-center gap-1">
              <span className="text-emerald-600 font-bold">B.</span>
              <span>全部长着牙齿？</span>
            </div>
            <div className="bg-slate-50 p-1 rounded border border-slate-200 flex items-center gap-1">
              <span className="text-pink-600 font-bold">C.</span>
              <span>有的有翅膀有的没有？</span>
            </div>
            <div className="bg-slate-50 p-1 rounded border border-slate-200 flex items-center gap-1">
              <span className="text-amber-600 font-bold">D.</span>
              <span>要么独角要么3只眼？</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. 底部思考指引 */}
      <div className="w-full bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 px-3 shrink-0">
        <span className="flex items-center gap-1.5 text-indigo-900">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>解题提示：仔细对比新发现的【照片6】，看它推翻了哪个规则！</span>
        </span>
        <span className="text-slate-500 font-bold hidden sm:inline">
          👉 请在右侧选出错误的结论
        </span>
      </div>
    </div>
  );
};
