import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Tv,
  Users,
  Video,
  Sparkles,
} from 'lucide-react';

/* ================= 9 位小动物角色定义 ================= */
export interface AnimalInfo {
  id: string;
  name: string;
  emoji: string;
  color: string;
  borderColor: string;
}

export const ANIMALS: AnimalInfo[] = [
  { id: 'fox', name: '小狐狸', emoji: '🦊', color: 'bg-orange-100 text-orange-800', borderColor: 'border-orange-300' },
  { id: 'bear', name: '小熊', emoji: '🐻', color: 'bg-amber-100 text-amber-800', borderColor: 'border-amber-300' },
  { id: 'rabbit', name: '小兔', emoji: '🐰', color: 'bg-rose-100 text-rose-800', borderColor: 'border-rose-300' },
  { id: 'deer', name: '小鹿', emoji: '🦌', color: 'bg-emerald-100 text-emerald-800', borderColor: 'border-emerald-300' },
  { id: 'raccoon', name: '浣熊', emoji: '🦝', color: 'bg-slate-100 text-slate-800', borderColor: 'border-slate-300' },
  { id: 'cat', name: '小猫', emoji: '🐱', color: 'bg-yellow-100 text-yellow-800', borderColor: 'border-yellow-300' },
  { id: 'panda', name: '熊猫', emoji: '🐼', color: 'bg-teal-100 text-teal-800', borderColor: 'border-teal-300' },
  { id: 'dog', name: '小狗', emoji: '🐶', color: 'bg-blue-100 text-blue-800', borderColor: 'border-blue-300' },
  { id: 'monkey', name: '小猴', emoji: '🐵', color: 'bg-red-100 text-red-800', borderColor: 'border-red-300' },
];

/* ================= 6 个摄像头同屏分镜头画面 ================= */
export interface CameraTile {
  id: number;
  label: string;
  animalIds: string[];
}

export const CAMERA_TILES: CameraTile[] = [
  { id: 1, label: '画面 1', animalIds: ['fox', 'bear'] },
  { id: 2, label: '画面 2', animalIds: ['bear', 'rabbit'] },
  { id: 3, label: '画面 3', animalIds: ['rabbit', 'deer', 'raccoon'] },
  { id: 4, label: '画面 4', animalIds: ['raccoon', 'cat'] },
  { id: 5, label: '画面 5', animalIds: ['cat', 'panda', 'dog'] },
  { id: 6, label: '画面 6', animalIds: ['dog', 'monkey'] },
];

/* 选项中的缩略动物队列链条预览 */
export const OptionAnimalChainPreview: React.FC<{
  sequenceEmojis: string[];
}> = ({ sequenceEmojis }) => {
  return (
    <div className="flex items-center gap-0.5 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200 overflow-x-auto max-w-full">
      {sequenceEmojis.map((emoji, idx) => (
        <React.Fragment key={idx}>
          <span className="text-xs">{emoji}</span>
          {idx < sequenceEmojis.length - 1 && (
            <span className="text-[9px] text-slate-300">➔</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/* ================= 1045 核心主图组件 ================= */
export const OnlineClassWebcamIllustration: React.FC = () => {
  const [selectedTileId, setSelectedTileId] = useState<number | null>(null);
  const [focusedAnimalId, setFocusedAnimalId] = useState<string | null>(null);

  // 获取动物对象
  const getAnimal = (id: string) => ANIMALS.find((a) => a.id === id)!;

  return (
    <div
      id="online-class-webcam-puzzle"
      className="w-full h-full flex flex-col p-2.5 bg-white text-slate-800 font-sans select-none rounded-2xl border-2 border-slate-200 shadow-xs justify-between gap-2"
    >
      {/* 1. 顶部标题栏 */}
      <div className="w-full bg-indigo-50/70 rounded-xl px-3 py-1.5 border border-indigo-200 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Tv className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs sm:text-sm font-black text-indigo-950">
            网课摄像头画面 · 找准相邻同桌
          </h3>
        </div>
        <div className="text-[11px] font-bold text-indigo-800">
          💡 同一画面里的动物紧挨着坐
        </div>
      </div>

      {/* 2. 6 个同屏分镜头画面展示（纯白高亮卡片） */}
      <div className="w-full bg-slate-50/80 rounded-2xl p-2.5 border border-slate-200 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 px-1">
          <span>6 组网课分屏画面：</span>
          <span className="text-[10px] text-slate-400">点击画面可高亮关联</span>
        </div>

        {/* 6 个分屏画面网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CAMERA_TILES.map((tile) => {
            const isTileSelected = selectedTileId === tile.id;
            const containsFocusedAnimal =
              focusedAnimalId !== null && tile.animalIds.includes(focusedAnimalId);

            return (
              <motion.div
                key={tile.id}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() =>
                  setSelectedTileId(selectedTileId === tile.id ? null : tile.id)
                }
                className={`cursor-pointer rounded-xl p-2 border-2 transition-all flex flex-col justify-between gap-1.5 ${
                  isTileSelected || containsFocusedAnimal
                    ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-indigo-300'
                }`}
              >
                {/* 摄像头编号 */}
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-black flex items-center gap-1 border border-indigo-100">
                    <Video className="w-2.5 h-2.5 text-indigo-600" />
                    <span>{tile.label}</span>
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium">紧挨着</span>
                </div>

                {/* 画面内同屏小动物 */}
                <div className="flex items-center justify-center gap-1.5 py-1.5 bg-slate-50/60 rounded-lg border border-slate-200/80 px-1">
                  {tile.animalIds.map((aid, idx) => {
                    const animal = getAnimal(aid);
                    const isAnimalMatch = focusedAnimalId === aid;
                    return (
                      <React.Fragment key={aid}>
                        <div
                          className={`flex items-center gap-1 px-1.5 py-1 rounded-lg border text-xs font-bold transition-transform ${
                            animal.color
                          } ${animal.borderColor} ${
                            isAnimalMatch ? 'scale-110 ring-2 ring-amber-400 shadow-xs' : ''
                          }`}
                        >
                          <span className="text-sm">{animal.emoji}</span>
                          <span className="text-[10px]">{animal.name}</span>
                        </div>
                        {idx < tile.animalIds.length - 1 && (
                          <span className="text-slate-300 font-black text-xs">↔</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. 9 位小动物角色名册 */}
      <div className="w-full bg-white rounded-xl p-2 border border-slate-200 flex flex-col gap-1">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 px-1">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>9位小动物（点击可查找谁在哪组）：</span>
          </span>
          {focusedAnimalId && (
            <button
              onClick={() => setFocusedAnimalId(null)}
              className="text-[10px] text-indigo-600 font-bold underline"
            >
              清除高亮
            </button>
          )}
        </div>

        {/* 9 位小动物横排展示 */}
        <div className="grid grid-cols-9 gap-1">
          {ANIMALS.map((animal) => (
            <div
              key={animal.id}
              onClick={() =>
                setFocusedAnimalId(focusedAnimalId === animal.id ? null : animal.id)
              }
              className={`cursor-pointer flex flex-col items-center p-1 rounded-xl border transition-all text-center ${
                focusedAnimalId === animal.id
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300'
                  : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <span className="text-base leading-tight">{animal.emoji}</span>
              <span className="text-[9px] font-extrabold text-slate-700 truncate w-full mt-0.5">
                {animal.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 底部思考指引 */}
      <div className="w-full bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 px-3 shrink-0">
        <span className="flex items-center gap-1.5 text-indigo-900">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>解题提示：找到在两个画面里都出现的小动物，把它两边的伙伴串起来成一条长队！</span>
        </span>
        <span className="text-slate-500 font-bold hidden sm:inline">
          👉 请在右侧选出正确的一长排排队顺序
        </span>
      </div>
    </div>
  );
};
