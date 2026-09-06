import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Sparkles,
  RotateCcw,
  Footprints,
  CheckCircle2,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Mountain,
  Waves,
} from 'lucide-react';
import { sounds } from '../../utils/audio';

// 5x4 地图网格配置
export type TerrainType = 'grass' | 'water' | 'mountain';

export interface GridCell {
  x: number;
  y: number;
  terrain: TerrainType;
}

export const MAP_GRID: GridCell[][] = [
  // y = 0
  [
    { x: 0, y: 0, terrain: 'grass' },
    { x: 1, y: 0, terrain: 'grass' },
    { x: 2, y: 0, terrain: 'water' },
    { x: 3, y: 0, terrain: 'grass' },
    { x: 4, y: 0, terrain: 'grass' },
  ],
  // y = 1
  [
    { x: 0, y: 1, terrain: 'grass' },
    { x: 1, y: 1, terrain: 'mountain' },
    { x: 2, y: 1, terrain: 'grass' },
    { x: 3, y: 1, terrain: 'water' },
    { x: 4, y: 1, terrain: 'grass' },
  ],
  // y = 2
  [
    { x: 0, y: 2, terrain: 'grass' },
    { x: 1, y: 2, terrain: 'water' },
    { x: 2, y: 2, terrain: 'mountain' },
    { x: 3, y: 2, terrain: 'grass' },
    { x: 4, y: 2, terrain: 'grass' },
  ],
  // y = 3
  [
    { x: 0, y: 3, terrain: 'grass' },
    { x: 1, y: 3, terrain: 'grass' },
    { x: 2, y: 3, terrain: 'grass' },
    { x: 3, y: 3, terrain: 'mountain' },
    { x: 4, y: 3, terrain: 'grass' },
  ],
];

// 小狗可爱矢量角色
const PuppyAvatar: React.FC<{ isMoving?: boolean; isJumping?: boolean }> = ({
  isMoving = false,
  isJumping = false,
}) => {
  return (
    <motion.div
      animate={
        isJumping
          ? { y: [-8, 0], scale: [1, 1.15, 1] }
          : isMoving
          ? { y: [0, -2, 0] }
          : { y: [0, -1, 0] }
      }
      transition={{ duration: 0.3 }}
      className="relative flex items-center justify-center w-9 h-9 select-none pointer-events-none"
    >
      <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-sm">
        <circle cx="25" cy="25" r="18" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
        {/* 耳朵 */}
        <ellipse cx="12" cy="18" rx="4" ry="7" fill="#b45309" transform="rotate(-15 12 18)" />
        <ellipse cx="38" cy="18" rx="4" ry="7" fill="#b45309" transform="rotate(15 38 18)" />
        {/* 红色小头巾 */}
        <path d="M 12 16 Q 25 10 38 16 L 36 20 Q 25 14 14 20 Z" fill="#ef4444" />
        {/* 眼睛 */}
        <circle cx="20" cy="24" r="3" fill="#1e293b" />
        <circle cx="19" cy="23" r="1" fill="#ffffff" />
        <circle cx="30" cy="24" r="3" fill="#1e293b" />
        <circle cx="29" cy="23" r="1" fill="#ffffff" />
        {/* 鼻子与微笑 */}
        <circle cx="25" cy="29" r="2" fill="#1e293b" />
        <path d="M 23 31 Q 25 34 27 31" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

export const PirateIslandMazeSimulation: React.FC = () => {
  // 小狗探索走过的路径坐标数组，起点为 (0,0)
  const [path, setPath] = useState<Array<{ x: number; y: number }>>([{ x: 0, y: 0 }]);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  const currentPos = path[path.length - 1];
  const isAtTreasure = currentPos.x === 4 && currentPos.y === 3;

  // 统计已翻过的高山数量
  const mountainsCrossed = path.filter((p) => {
    return MAP_GRID[p.y][p.x].terrain === 'mountain';
  }).length;

  // 尝试向某个方向直走一步
  const handleMove = (dx: number, dy: number) => {
    const newX = currentPos.x + dx;
    const newY = currentPos.y + dy;

    // 边界检查
    if (newX < 0 || newX > 4 || newY < 0 || newY > 3) {
      sounds.playBuzzer();
      setWarningMsg('⚠️ 撞上海岛边缘啦，只能在地图格子里走哦！');
      setTimeout(() => setWarningMsg(null), 1800);
      return;
    }

    const targetCell = MAP_GRID[newY][newX];

    // 规则 1：绝对不能踩水坑
    if (targetCell.terrain === 'water') {
      sounds.playBuzzer();
      setWarningMsg('🌊 前方是深水坑！小狗不能游泳，必须绕开水坑！');
      setTimeout(() => setWarningMsg(null), 2000);
      return;
    }

    sounds.playTap();
    if (targetCell.terrain === 'mountain') {
      setWarningMsg('🧗 成功翻过一座高山！+1 座山');
      setTimeout(() => setWarningMsg(null), 1500);
    }

    const newPath = [...path, { x: newX, y: newY }];
    setPath(newPath);

    // 抵达终点宝藏
    if (newX === 4 && newY === 3) {
      if (mountainsCrossed > 0 || targetCell.terrain === 'mountain') {
        sounds.playVictory();
        setWarningMsg('🎉 太棒了！顺利抵达宝藏，且路上翻越了高山！');
      } else {
        sounds.playSelect();
        setWarningMsg('💎 找到宝藏了！但路上没有翻过高山，可以再试一条新路线哦！');
      }
    }
  };

  // 点击相邻格子走步
  const handleTileClick = (x: number, y: number) => {
    const dx = x - currentPos.x;
    const dy = y - currentPos.y;

    // 检查是否为上下左右相邻格子
    if ((Math.abs(dx) === 1 && dy === 0) || (Math.abs(dy) === 1 && dx === 0)) {
      handleMove(dx, dy);
    } else if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
      // 点击了斜向格子 -> 规则3：不能斜着走
      sounds.playBuzzer();
      setWarningMsg('❌ 规则约束：只能上下左右直着走，不能斜跳哦！');
      setTimeout(() => setWarningMsg(null), 2000);
    }
  };

  // 后退一步
  const handleUndo = () => {
    if (path.length > 1) {
      sounds.playTap();
      setPath((prev) => prev.slice(0, prev.length - 1));
      setWarningMsg(null);
    }
  };

  // 重新从起点出发
  const handleReset = () => {
    sounds.playTap();
    setPath([{ x: 0, y: 0 }]);
    setWarningMsg(null);
  };

  return (
    <div id="pirate-island-sandbox" className="w-full h-full flex flex-col justify-between p-1.5 select-none font-sans text-slate-800">
      
      {/* 1. 顶部操作栏 */}
      <div className="w-full bg-white border-2 border-slate-200 rounded-2xl px-3 py-2 mb-2 shadow-xs flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400 border border-amber-500 flex items-center justify-center text-lg shadow-2xs">
            🧭
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
              <span>海岛迷宫探路沙盘</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                自由走位体验
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              点击上下左右方向键或相邻格子，引导小狗寻找宝藏
            </p>
          </div>
        </div>

        {/* 重置与撤销按钮 */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleUndo}
            disabled={path.length <= 1}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 border border-slate-200 text-xs font-black cursor-pointer active:scale-95 transition-all shadow-2xs"
          >
            <span>撤销一步</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black cursor-pointer active:scale-95 transition-all shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>回起点</span>
          </button>
        </div>
      </div>

      {/* 2. 主区域：左侧 5x4 海岛网格 + 走位键盘，右侧寻宝状态提示 */}
      <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 items-center min-h-[280px]">
        
        {/* 左侧：5x4 海岛地图 (7 列) */}
        <div className="md:col-span-7 h-full flex flex-col items-center justify-between bg-sky-50/70 rounded-3xl p-2.5 border-2 border-sky-200 relative shadow-inner">
          
          {/* 地图网格 */}
          <div className="w-full max-w-[340px] aspect-5/4 grid grid-cols-5 grid-rows-4 gap-1.5 p-2 bg-amber-100/90 rounded-2xl border-2 border-amber-300 shadow-sm relative">
            {MAP_GRID.map((row, y) =>
              row.map((cell, x) => {
                const isCurrentPuppy = currentPos.x === x && currentPos.y === y;
                const isStart = x === 0 && y === 0;
                const isTreasure = x === 4 && y === 3;
                
                // 是否在此方格留有脚印
                const stepOrder = path.findIndex((p) => p.x === x && p.y === y);
                const hasPassed = stepOrder >= 0;

                return (
                  <div
                    key={`${x}-${y}`}
                    onClick={() => handleTileClick(x, y)}
                    className={`relative rounded-xl flex flex-col items-center justify-center transition-all border cursor-pointer ${
                      cell.terrain === 'water'
                        ? 'bg-sky-400 border-sky-600 text-white hover:brightness-105'
                        : cell.terrain === 'mountain'
                        ? 'bg-amber-200 border-amber-400 text-amber-950 hover:bg-amber-300'
                        : 'bg-emerald-200/90 border-emerald-400 text-emerald-950 hover:bg-emerald-300'
                    } ${hasPassed ? 'ring-2 ring-amber-400' : ''}`}
                  >
                    {/* 地形图标 */}
                    {cell.terrain === 'water' && (
                      <span className="text-base sm:text-lg select-none">🌊</span>
                    )}
                    {cell.terrain === 'mountain' && (
                      <span className="text-base sm:text-lg select-none">⛰️</span>
                    )}
                    {cell.terrain === 'grass' && !isStart && !isTreasure && (
                      <span className="text-xs select-none opacity-30">🌿</span>
                    )}

                    {/* 起点 / 宝藏标 */}
                    {isStart && (
                      <div className="absolute top-0.5 left-0.5 bg-emerald-600 text-white text-[8px] font-black px-1 rounded-sm shadow-2xs">
                        起点
                      </div>
                    )}
                    {isTreasure && (
                      <div className="flex flex-col items-center select-none">
                        <span className="text-lg">💎</span>
                        <span className="text-[8px] font-black text-amber-900 bg-amber-300 px-1 rounded-sm">
                          宝藏
                        </span>
                      </div>
                    )}

                    {/* 走过历史步骤编号 */}
                    {hasPassed && !isCurrentPuppy && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-[10px] font-black bg-white/80 rounded-full w-4 h-4 flex items-center justify-center text-slate-700 shadow-2xs">
                          {stepOrder + 1}
                        </span>
                      </div>
                    )}

                    {/* 当前小狗所在位置 */}
                    {isCurrentPuppy && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <PuppyAvatar
                          isJumping={cell.terrain === 'mountain'}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* 底部小提示 */}
          <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 px-2 mt-1">
            <span className="flex items-center gap-1">📍 步数：{path.length} 步</span>
            <span className="flex items-center gap-1">⛰️ 翻越山峰：{mountainsCrossed} 座</span>
          </div>

        </div>

        {/* 右侧：方向走位盘 + 规则探索小雷达 (5 列) */}
        <div className="md:col-span-5 h-full flex flex-col justify-between gap-2 bg-slate-50 p-3 rounded-3xl border-2 border-slate-200">
          
          <div className="text-xs font-black text-slate-800 flex items-center justify-between border-b border-slate-200 pb-1.5">
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>探索走位控制器</span>
            </span>
            <span className="text-[10px] text-slate-500 font-bold">
              只能上下左右直走
            </span>
          </div>

          {/* 十字方向走位按键 */}
          <div className="flex flex-col items-center gap-1 my-1">
            <button
              onClick={() => handleMove(0, -1)}
              className="w-11 h-9 rounded-xl bg-white hover:bg-amber-50 active:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 flex items-center justify-center text-slate-700 font-black shadow-2xs cursor-pointer transition-all active:scale-95"
              title="向上走"
            >
              <ArrowUp className="w-5 h-5 text-amber-600" />
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMove(-1, 0)}
                className="w-11 h-9 rounded-xl bg-white hover:bg-amber-50 active:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 flex items-center justify-center text-slate-700 font-black shadow-2xs cursor-pointer transition-all active:scale-95"
                title="向左走"
              >
                <ArrowLeft className="w-5 h-5 text-amber-600" />
              </button>

              <div className="w-11 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-base">
                🐶
              </div>

              <button
                onClick={() => handleMove(1, 0)}
                className="w-11 h-9 rounded-xl bg-white hover:bg-amber-50 active:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 flex items-center justify-center text-slate-700 font-black shadow-2xs cursor-pointer transition-all active:scale-95"
                title="向右走"
              >
                <ArrowRight className="w-5 h-5 text-amber-600" />
              </button>
            </div>

            <button
              onClick={() => handleMove(0, 1)}
              className="w-11 h-9 rounded-xl bg-white hover:bg-amber-50 active:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 flex items-center justify-center text-slate-700 font-black shadow-2xs cursor-pointer transition-all active:scale-95"
              title="向下走"
            >
              <ArrowDown className="w-5 h-5 text-amber-600" />
            </button>
          </div>

          {/* 实时状态提示气泡 */}
          <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <span>{warningMsg || (isAtTreasure ? '🎉 找到宝藏啦！' : '🐾 请引导小狗探索路线')}</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">
              💡 规则总结：①避开水坑 🌊 ②中途必须至少翻过一座高山 ⛰️ ③只能沿格子直着走
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
