import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Info,
  Navigation,
  Anchor,
  Plane,
} from 'lucide-react';
import { sounds } from '../../utils/audio';

// 岛屿节点定义
export interface IslandNode {
  id: string;
  name: string;
  x: number;
  y: number;
  groupId: 1 | 2 | 3;
  icon: string;
  themeColor: string;
  badgeBg: string;
  borderColor: string;
}

// 7 个海岛布局与强连通分组
// 组 1: A(椰树岛), B(海星岛)  -> 互通闭环 (A<->B)
// 组 2: C(珊瑚岛), D(海龟岛), E(贝壳岛) -> 互通闭环 (C->D->E->C)
// 组 3: F(灯塔岛), G(珍珠岛) -> 互通闭环 (F<->G)
export const ISLANDS: IslandNode[] = [
  // 圈子 1 (西北水域)
  { id: 'A', name: '椰树岛 A', x: 60, y: 70, groupId: 1, icon: '🌴', themeColor: '#059669', badgeBg: 'bg-emerald-500 text-white', borderColor: 'border-emerald-300' },
  { id: 'B', name: '海星岛 B', x: 150, y: 55, groupId: 1, icon: '⭐', themeColor: '#059669', badgeBg: 'bg-emerald-500 text-white', borderColor: 'border-emerald-300' },

  // 圈子 2 (中部水域)
  { id: 'C', name: '珊瑚岛 C', x: 140, y: 150, groupId: 2, icon: '🪸', themeColor: '#0284c7', badgeBg: 'bg-sky-500 text-white', borderColor: 'border-sky-300' },
  { id: 'D', name: '海龟岛 D', x: 230, y: 120, groupId: 2, icon: '🐢', themeColor: '#0284c7', badgeBg: 'bg-sky-500 text-white', borderColor: 'border-sky-300' },
  { id: 'E', name: '贝壳岛 E', x: 220, y: 210, groupId: 2, icon: '🐚', themeColor: '#0284c7', badgeBg: 'bg-sky-500 text-white', borderColor: 'border-sky-300' },

  // 圈子 3 (南部水域)
  { id: 'F', name: '灯塔岛 F', x: 90, y: 240, groupId: 3, icon: '🗼', themeColor: '#d97706', badgeBg: 'bg-amber-500 text-white', borderColor: 'border-amber-300' },
  { id: 'G', name: '珍珠岛 G', x: 180, y: 275, groupId: 3, icon: '🫧', themeColor: '#d97706', badgeBg: 'bg-amber-500 text-white', borderColor: 'border-amber-300' },
];

// 单向航线定义
// [起点, 终点, 是否组间跨区单行道]
export const SEA_ROUTES: { from: string; to: string; isCrossGroup?: boolean; label?: string }[] = [
  // 圈子 1 内部双向/回路
  { from: 'A', to: 'B' },
  { from: 'B', to: 'A' },

  // 跨圈单行道 1 -> 2 (去得去不得返)
  { from: 'B', to: 'C', isCrossGroup: true, label: '单向大洋流 (无法逆流返回)' },

  // 圈子 2 内部三岛闭环回路
  { from: 'C', to: 'D' },
  { from: 'D', to: 'E' },
  { from: 'E', to: 'C' },

  // 跨圈单行道 2 -> 3 (去得去不得返)
  { from: 'E', to: 'G', isCrossGroup: true, label: '单向瀑布洋流 (无法逆流返回)' },

  // 圈子 3 内部回路
  { from: 'G', to: 'F' },
  { from: 'F', to: 'G' },
];

// 2D 纯矢量可爱海獭水手船长（纯白卡通底色适配）
const CuteOtterCaptain: React.FC<{ scale?: number; isSailing?: boolean }> = ({
  scale = 1,
  isSailing,
}) => {
  return (
    <motion.div
      animate={isSailing ? { y: [0, -3, 0], rotate: [-2, 2, -2] } : { y: [0, -2, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      style={{ transform: `scale(${scale})` }}
      className="flex flex-col items-center justify-center pointer-events-none"
    >
      <svg viewBox="0 0 100 110" className="w-16 h-18 sm:w-20 sm:h-22">
        {/* 橙色橡皮充气小皮艇 */}
        <ellipse cx="50" cy="85" rx="38" ry="15" fill="#f97316" stroke="#c2410c" strokeWidth="2.5" />
        <ellipse cx="50" cy="85" rx="28" ry="9" fill="#fed7aa" />
        {/* 小木桨 */}
        <rect x="18" y="70" width="6" height="30" rx="3" fill="#b45309" transform="rotate(-30 18 70)" />
        <ellipse cx="14" cy="98" rx="8" ry="4" fill="#92400e" transform="rotate(-30 14 98)" />

        {/* 海獭圆耳朵 */}
        <circle cx="32" cy="28" r="8" fill="#78350f" stroke="#451a03" strokeWidth="2" />
        <circle cx="32" cy="28" r="4" fill="#fde68a" />
        <circle cx="68" cy="28" r="8" fill="#78350f" stroke="#451a03" strokeWidth="2" />
        <circle cx="68" cy="28" r="4" fill="#fde68a" />

        {/* 海獭小头颅 */}
        <ellipse cx="50" cy="45" rx="25" ry="22" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />

        {/* 水手小水兵帽 */}
        <ellipse cx="50" cy="28" rx="18" ry="7" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
        <circle cx="50" cy="22" r="3.5" fill="#0284c7" />
        <path d="M42 28 L36 20 M58 28 L64 20" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />

        {/* 眼睛与高光 */}
        <circle cx="40" cy="42" r="3.5" fill="#1e293b" />
        <circle cx="60" cy="42" r="3.5" fill="#1e293b" />
        <circle cx="41.5" cy="40.5" r="1.2" fill="#ffffff" />
        <circle cx="61.5" cy="40.5" r="1.2" fill="#ffffff" />
        {/* 粉嫩腮红 */}
        <circle cx="33" cy="49" r="4" fill="#fca5a5" opacity="0.7" />
        <circle cx="67" cy="49" r="4" fill="#fca5a5" opacity="0.7" />

        {/* 浅色吻部与小黑鼻 */}
        <ellipse cx="50" cy="50" rx="9" ry="7" fill="#fef3c7" />
        <ellipse cx="50" cy="47" rx="3.5" ry="2.5" fill="#1e293b" />
        <path d="M47 52 Q50 55 53 52" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
        {/* 可爱胡须 */}
        <path d="M35 50 L25 48 M35 53 L26 54 M65 50 L75 48 M65 53 L74 54" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />

        {/* 救生衣 */}
        <ellipse cx="50" cy="68" rx="20" ry="14" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        <path d="M42 60 L42 76 M58 60 L58 76" stroke="#ffffff" strokeWidth="2.5" />
      </svg>
    </motion.div>
  );
};

// 2D 纯矢量卡通直升机（螺旋桨持续转动）
const VectorHelicopter: React.FC<{ isHovering?: boolean }> = ({ isHovering = true }) => {
  return (
    <g className="pointer-events-none select-none">
      {/* 直升机轻微悬停上下浮动 */}
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
      >
        {/* 旋转顶翼螺旋桨 */}
        <motion.g
          animate={{ scaleX: [1, 0.1, 1, 0.1, 1] }}
          transition={{ repeat: Infinity, duration: 0.25, ease: 'linear' }}
        >
          <line x1="-18" y1="-14" x2="18" y2="-14" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="0" cy="-14" r="2" fill="#ef4444" />
        </motion.g>
        {/* 桨轴 */}
        <line x1="0" y1="-14" x2="0" y2="-7" stroke="#475569" strokeWidth="2" />

        {/* 尾梁与尾翼 */}
        <path d="M -8 -2 L -22 -6 L -22 -10" fill="none" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
        {/* 尾桨旋转 */}
        <motion.circle
          cx="-22"
          cy="-8"
          r="4"
          fill="none"
          stroke="#0284c7"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.3, ease: 'linear' }}
        />

        {/* 主机身（明亮黄色卡通） */}
        <ellipse cx="0" cy="0" rx="12" ry="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        {/* 驾驶舱大挡风玻璃 */}
        <path d="M 3 -4 Q 10 -4 10 1 Q 6 4 2 4 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
        <circle cx="6" cy="-1" r="1" fill="#ffffff" />

        {/* 起落架滑撬 */}
        <line x1="-8" y1="8" x2="-4" y2="5" stroke="#334155" strokeWidth="1.5" />
        <line x1="4" y1="8" x2="6" y2="5" stroke="#334155" strokeWidth="1.5" />
        <line x1="-12" y1="8" x2="10" y2="8" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </g>
  );
};

// 2D 纯矢量卡通探险小船（载着小海獭和水花）
const VectorExpeditionBoat: React.FC<{ isMoving?: boolean }> = ({ isMoving = false }) => {
  return (
    <g className="pointer-events-none select-none">
      {/* 小船波浪起伏 */}
      <motion.g
        animate={isMoving ? { rotate: [-4, 4, -4], y: [0, -2, 0] } : { y: [0, -1.5, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
      >
        {/* 船底水花波纹 */}
        {isMoving && (
          <g opacity="0.6">
            <ellipse cx="-12" cy="5" rx="5" ry="2" fill="#bae6fd" />
            <ellipse cx="12" cy="5" rx="5" ry="2" fill="#bae6fd" />
          </g>
        )}

        {/* 船体（明亮橙色冲锋舟） */}
        <path
          d="M -12 2 Q 0 7 12 2 L 9 -3 L -9 -3 Z"
          fill="#f97316"
          stroke="#c2410c"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect x="-7" y="-2" width="14" height="2" rx="1" fill="#fed7aa" />

        {/* 船上的可爱海獭头像 */}
        <circle cx="0" cy="-6" r="4.5" fill="#92400e" stroke="#451a03" strokeWidth="1" />
        <circle cx="-1.5" cy="-7" r="0.8" fill="#ffffff" />
        <circle cx="1.5" cy="-7" r="0.8" fill="#ffffff" />
        <ellipse cx="0" cy="-5" rx="1.8" ry="1.2" fill="#fef3c7" />
        {/* 蓝色小水手帽 */}
        <ellipse cx="0" cy="-10" rx="3.5" ry="1.5" fill="#0284c7" />

        {/* 船头小旗帜 */}
        <line x1="8" y1="2" x2="8" y2="-9" stroke="#64748b" strokeWidth="1" />
        <polygon points="8,-9 14,-7 8,-5" fill="#22c55e" />
      </motion.g>
    </g>
  );
};

export const OtterIslandExpeditionSimulation: React.FC = () => {
  // 教学实验 5 阶段：
  // 0: 情境建立与洋流海图介绍 (0~2.5s)
  // 1: 探索圈 1 演示（直升机降落A岛 ➔ 划船到B岛 ➔ 顺利乘回A岛 ➔ 形成第1圈）(2.5~5.5s)
  // 2: 探索陷阱演示（尝试从B岛前往C岛 ➔ 洋流单向无法返回A ➔ 必须直升机另行安排）(5.5~8.5s)
  // 3: 探索圈 2 演示（直升机新降落C岛 ➔ C->D->E->C 闭环 ➔ 形成第2圈）(8.5~11s)
  // 4: 实验结束，全图归位，交还控制权让学生推导总圈数 (11s~)
  const [animStage, setAnimStage] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(true);
  const timelineRef = useRef<number[]>([]);
  const [activeIsland, setActiveIsland] = useState<IslandNode | null>(null);

  // 动画时间轴编排（8~12s，严格不提前透露选项A 3次的最终全部计算答案）
  useEffect(() => {
    if (!isPlayingAuto) return;

    timelineRef.current.forEach((id) => clearTimeout(id));
    timelineRef.current = [];

    setAnimStage(0);

    // Stage 1: 演示圈子 1 顺利回航 (2.5s)
    const t1 = window.setTimeout(() => {
      setAnimStage(1);
      sounds.playTap();
    }, 2500);

    // Stage 2: 演示单向大洋流陷阱 (5.5s)
    const t2 = window.setTimeout(() => {
      setAnimStage(2);
      sounds.playSelect();
    }, 5500);

    // Stage 3: 演示圈子 2 形成 (8.5s)
    const t3 = window.setTimeout(() => {
      setAnimStage(3);
      sounds.playSelect();
    }, 8500);

    // Stage 4: 实验结束，交还控制权 (11.5s)
    const t4 = window.setTimeout(() => {
      setAnimStage(4);
      setIsPlayingAuto(false);
      sounds.playVictory();
    }, 11500);

    timelineRef.current = [t1, t2, t3, t4];

    return () => {
      timelineRef.current.forEach((id) => clearTimeout(id));
    };
  }, [isPlayingAuto]);

  const handleReplay = () => {
    sounds.playTap();
    setActiveIsland(null);
    setIsPlayingAuto(true);
  };

  const handleJumpStage = (stageIdx: number) => {
    timelineRef.current.forEach((id) => clearTimeout(id));
    setIsPlayingAuto(false);
    sounds.playTap();
    setAnimStage(stageIdx);
  };

  return (
    <div id="otter-island-expedition-simulation" className="w-full flex flex-col select-none text-slate-800 font-sans">
      {/* 1. 顶部操作与状态栏（纯白明亮卡通风格） */}
      <div className="w-full bg-white border-2 border-emerald-100 rounded-2xl p-3 mb-2.5 shadow-sm flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-xl shadow-xs">
            🗺️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900 tracking-wide">
                海獭群岛科学考察 · 洋流闭环实验
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                强连通分量探索
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              规则：乘小船顺箭头探险 ➔ 必须能转圈返回直升机基地 ➔ 分割独立圈子
            </p>
          </div>
        </div>

        {/* 阶段切换胶囊 & 重播按钮 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            {[
              { idx: 0, label: '海图初始' },
              { idx: 1, label: '🟢第1圈(A-B)' },
              { idx: 2, label: '⚠️单向陷阱' },
              { idx: 3, label: '🔵第2圈(C-D-E)' },
            ].map((st) => (
              <button
                key={st.idx}
                onClick={() => handleJumpStage(st.idx)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  animStage === st.idx
                    ? 'bg-white text-emerald-900 shadow-xs border border-emerald-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleReplay}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white text-xs font-black flex items-center gap-1 shadow-xs transition cursor-pointer border border-emerald-600"
            title="重新播放动画"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>重播动画</span>
          </button>
        </div>
      </div>

      {/* 2. 纯白大画布舞台 */}
      <div className="w-full bg-white border-2 border-slate-100 rounded-3xl p-4 min-h-[350px] flex flex-col justify-between shadow-sm relative overflow-hidden">
        
        {/* 顶部卡通剧情解说条 */}
        <div className="w-full mb-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={animStage}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="w-full px-4 py-2.5 rounded-2xl bg-emerald-50/90 border-2 border-emerald-200 text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2.5 shadow-xs"
            >
              <span className="text-xl shrink-0">
                {animStage === 0 && '🚁'}
                {animStage === 1 && '🟢'}
                {animStage === 2 && '⚠️'}
                {animStage === 3 && '🔵'}
                {animStage === 4 && '🎯'}
              </span>
              <div className="leading-snug">
                {animStage === 0 && (
                  <span>
                    <strong>【出海规则】</strong> 直升机先降落在一个岛作为基地，海獭划小船顺着箭头探险，<strong>必须能坐小船回到基地岛屿</strong>！
                  </span>
                )}
                {animStage === 1 && (
                  <span>
                    <strong>【探索圈 1 示范】</strong> 直升机降落 A 岛 ➔ 划船 A ➔ B ➔ A 顺利闭环回航！➔ <strong className="text-emerald-700">A、B 两岛组成第 1 次探险圈！</strong>
                  </span>
                )}
                {animStage === 2 && (
                  <span>
                    <strong>【单向陷阱示范】</strong> 若从小船 B 顺洋流漂到 C 岛，发现箭头全指向外，<strong>再也回不去 A 岛</strong> ➔ 必须为后面的岛安排新的直升机旅行！
                  </span>
                )}
                {animStage === 3 && (
                  <span>
                    <strong>【探索圈 2 示范】</strong> 直升机重新降落 C 岛 ➔ 划船 C ➔ D ➔ E ➔ C 成功闭环！➔ <strong className="text-sky-700">C、D、E 三岛组成第 2 次探险圈！</strong>
                  </span>
                )}
                {animStage === 4 && (
                  <span>
                    <strong>【轮到你啦】</strong> 规则演示完毕！请观察整张海图，数一数所有岛屿一共最少需要分成几个‘圈子’（坐几次直升飞机），并在右侧作答。
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. 中间核心：群岛洋流海图 (SVG 矢量地图 + 航线光轨) */}
        <div className="w-full my-auto grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* 左侧/主区：SVG 群岛地图 (8 列) */}
          <div className="md:col-span-8 flex flex-col items-center justify-center relative bg-sky-50/50 rounded-3xl p-2 border-2 border-sky-100">
            <svg
              viewBox="0 0 300 320"
              className="w-full max-w-[340px] h-[260px] sm:h-[285px]"
            >
              {/* 背景浅水波纹 */}
              <g opacity="0.25">
                <path d="M 20 50 Q 40 45 60 50 T 100 50" fill="none" stroke="#0284c7" strokeWidth="2" />
                <path d="M 180 80 Q 200 75 220 80 T 260 80" fill="none" stroke="#0284c7" strokeWidth="2" />
                <path d="M 50 180 Q 70 175 90 180 T 130 180" fill="none" stroke="#0284c7" strokeWidth="2" />
                <path d="M 210 270 Q 230 265 250 270 T 290 270" fill="none" stroke="#0284c7" strokeWidth="2" />
              </g>

              {/* 强连通分量圈子外包围光环 (根据阶段点亮) */}
              {/* 圈子 1 (A-B) */}
              {(animStage === 1 || animStage >= 4) && (
                <rect
                  x="35"
                  y="30"
                  width="145"
                  height="75"
                  rx="35"
                  fill="#d1fae5"
                  fillOpacity="0.4"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              )}

              {/* 圈子 2 (C-D-E) */}
              {(animStage === 3 || animStage >= 4) && (
                <polygon
                  points="140,135 250,110 240,230 130,170"
                  fill="#e0f2fe"
                  fillOpacity="0.4"
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              )}

              {/* 洋流单向航线箭头 */}
              <defs>
                <marker
                  id="arrow-green"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
                </marker>
                <marker
                  id="arrow-blue"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284c7" />
                </marker>
                <marker
                  id="arrow-amber"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#d97706" />
                </marker>
                <marker
                  id="arrow-warn"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#ef4444" />
                </marker>
              </defs>

              {/* 绘制所有航线及其清晰方向箭头 */}
              {SEA_ROUTES.map((route, idx) => {
                const nodeA = ISLANDS.find((i) => i.id === route.from)!;
                const nodeB = ISLANDS.find((i) => i.id === route.to)!;

                // 弯曲弧线控制点偏移
                const dx = nodeB.x - nodeA.x;
                const dy = nodeB.y - nodeA.y;
                const midX = (nodeA.x + nodeB.x) / 2;
                const midY = (nodeA.y + nodeB.y) / 2;

                // 针对双向路径进行曲率偏移，使去向与回向弧线分离
                let curveOffset = 12;
                if (route.from === 'B' && route.to === 'A') curveOffset = -18;
                if (route.from === 'A' && route.to === 'B') curveOffset = 18;
                if (route.from === 'F' && route.to === 'G') curveOffset = -16;
                if (route.from === 'G' && route.to === 'F') curveOffset = 16;
                if (route.from === 'E' && route.to === 'C') curveOffset = -14;

                const dist = Math.hypot(dx, dy);
                const qx = midX - (dy / dist) * curveOffset;
                const qy = midY + (dx / dist) * curveOffset;

                const pathData = `M ${nodeA.x} ${nodeA.y} Q ${qx} ${qy} ${nodeB.x} ${nodeB.y}`;

                // 计算贝塞尔曲线 58% 处的精确位置与切线角度，绘制醒目方向箭头
                const t = 0.58;
                const arrowX = (1 - t) * (1 - t) * nodeA.x + 2 * (1 - t) * t * qx + t * t * nodeB.x;
                const arrowY = (1 - t) * (1 - t) * nodeA.y + 2 * (1 - t) * t * qy + t * t * nodeB.y;
                const tangentDx = 2 * (1 - t) * (qx - nodeA.x) + 2 * t * (nodeB.x - qx);
                const tangentDy = 2 * (1 - t) * (qy - nodeA.y) + 2 * t * (nodeB.y - qy);
                const arrowAngle = (Math.atan2(tangentDy, tangentDx) * 180) / Math.PI;

                let strokeColor = '#94a3b8';
                let fillColor = '#64748b';

                if (route.isCrossGroup) {
                  strokeColor = '#ef4444';
                  fillColor = '#dc2626';
                } else if (nodeA.groupId === 1) {
                  strokeColor = '#10b981';
                  fillColor = '#059669';
                } else if (nodeA.groupId === 3) {
                  strokeColor = '#f59e0b';
                  fillColor = '#d97706';
                } else {
                  strokeColor = '#0284c7';
                  fillColor = '#0284c7';
                }

                // 阶段高亮判断
                const isHighlight =
                  (animStage === 1 && (route.from === 'A' || route.from === 'B') && !route.isCrossGroup) ||
                  (animStage === 2 && route.from === 'B' && route.to === 'C') ||
                  (animStage === 3 && nodeA.groupId === 2 && !route.isCrossGroup);

                return (
                  <g key={idx}>
                    {/* 航道弧线 */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isHighlight ? 3.5 : route.isCrossGroup ? 2.5 : 2.2}
                      strokeDasharray={route.isCrossGroup ? '5 3' : 'none'}
                    />

                    {/* 路径正中央高对比度方向箭头（清晰可见、绝不被遮挡） */}
                    <g transform={`translate(${arrowX}, ${arrowY}) rotate(${arrowAngle})`}>
                      <polygon
                        points="-7,-5 7,0 -7,5"
                        fill={isHighlight ? '#ffffff' : fillColor}
                        stroke={isHighlight ? fillColor : '#ffffff'}
                        strokeWidth={isHighlight ? 2 : 1}
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                );
              })}

              {/* 绘制 7 座小岛 */}
              {ISLANDS.map((island) => {
                const isSelected = activeIsland?.id === island.id;
                const isInActiveStage =
                  (animStage === 1 && island.groupId === 1) ||
                  (animStage === 2 && (island.id === 'B' || island.id === 'C')) ||
                  (animStage === 3 && island.groupId === 2);

                return (
                  <g
                    key={island.id}
                    className="cursor-pointer group"
                    onClick={() => {
                      sounds.playTap();
                      setActiveIsland(isSelected ? null : island);
                    }}
                  >
                    {/* 岛屿高亮圈 */}
                    {isInActiveStage && (
                      <circle
                        cx={island.x}
                        cy={island.y}
                        r="24"
                        fill={island.groupId === 1 ? '#a7f3d0' : island.groupId === 2 ? '#bae6fd' : '#fde68a'}
                        opacity="0.5"
                        className="animate-pulse"
                      />
                    )}

                    {/* 鼠标悬停时的柔和微光底圈（替代有抖动风险的全局 scale） */}
                    <circle
                      cx={island.x}
                      cy={island.y}
                      r="20"
                      fill="transparent"
                      className="group-hover:fill-sky-100/60 transition-colors"
                    />

                    {/* 岛屿沙滩底座 */}
                    <ellipse
                      cx={island.x}
                      cy={island.y + 4}
                      rx="18"
                      ry="12"
                      fill="#fef08a"
                      stroke="#ca8a04"
                      strokeWidth="1.5"
                    />
                    <ellipse
                      cx={island.x}
                      cy={island.y}
                      rx="15"
                      ry="9"
                      fill="#86efac"
                      stroke="#16a34a"
                      strokeWidth="1"
                    />

                    {/* 岛屿图标 */}
                    <text
                      x={island.x}
                      y={island.y + 3}
                      textAnchor="middle"
                      fontSize="13"
                    >
                      {island.icon}
                    </text>

                    {/* 岛屿名称标签 */}
                    <rect
                      x={island.x - 14}
                      y={island.y + 14}
                      width="28"
                      height="14"
                      rx="4"
                      fill="#ffffff"
                      stroke={isSelected ? '#f43f5e' : '#94a3b8'}
                      strokeWidth={isSelected ? 2.5 : 1}
                      className="group-hover:stroke-sky-500 transition-colors"
                    />
                    <text
                      x={island.x}
                      y={island.y + 24}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="900"
                      fill="#1e293b"
                    >
                      {island.id}岛
                    </text>
                  </g>
                );
              })}

              {/* 动态直升机 (Helicopter) 飞行与空降动画 */}
              <motion.g
                initial={{ x: 20, y: -20, opacity: 0 }}
                animate={
                  animStage === 0
                    ? { x: 60, y: 35, opacity: 1, scale: 1 }
                    : animStage === 1
                    ? { x: 60, y: 35, opacity: 1, scale: 1 }
                    : animStage === 2
                    ? { x: [60, 100, 140], y: [35, 60, 115], opacity: 1, scale: 1 }
                    : animStage === 3 || animStage === 4
                    ? { x: 140, y: 115, opacity: 1, scale: 1 }
                    : { x: 60, y: 35, opacity: 1 }
                }
                transition={
                  animStage === 2
                    ? { duration: 2.5, ease: 'easeInOut' }
                    : { duration: 1.2, ease: 'easeOut' }
                }
              >
                <VectorHelicopter />
                {/* 直升机基地说明小标签 */}
                <g transform="translate(0, -22)">
                  <rect
                    x="-26"
                    y="-8"
                    width="52"
                    height="14"
                    rx="4"
                    fill="#fef08a"
                    stroke="#ca8a04"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="2"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#854d0e"
                  >
                    {animStage >= 2 ? '🚁 基地2' : '🚁 基地1'}
                  </text>
                </g>
              </motion.g>

              {/* 动态探险小船 (Boat) 航行轨迹动画 */}
              <motion.g
                initial={{ x: 60, y: 70 }}
                animate={
                  animStage === 0
                    ? { x: 60, y: 70 }
                    : animStage === 1
                    ? {
                        x: [60, 105, 150, 105, 60],
                        y: [70, 46, 55, 80, 70],
                      }
                    : animStage === 2
                    ? {
                        x: [150, 145, 140],
                        y: [55, 100, 150],
                      }
                    : animStage === 3
                    ? {
                        x: [140, 185, 230, 238, 220, 170, 140],
                        y: [150, 122, 120, 165, 210, 195, 150],
                      }
                    : { x: 140, y: 150 }
                }
                transition={
                  animStage === 1
                    ? { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }
                    : animStage === 2
                    ? { duration: 2.2, ease: 'easeInOut' }
                    : animStage === 3
                    ? { repeat: Infinity, duration: 4.5, ease: 'easeInOut' }
                    : { duration: 0.8 }
                }
              >
                <VectorExpeditionBoat isMoving={animStage > 0 && animStage < 4} />
                
                {/* 航行动态状态气泡 */}
                {animStage === 1 && (
                  <g transform="translate(0, -18)">
                    <rect x="-24" y="-7" width="48" height="13" rx="3.5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                    <text x="0" y="2" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#15803d">
                      🔁 顺畅回航
                    </text>
                  </g>
                )}
                {animStage === 2 && (
                  <g transform="translate(0, -18)">
                    <rect x="-28" y="-7" width="56" height="13" rx="3.5" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
                    <text x="0" y="2" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#b91c1c">
                      ⚠️ 无法逆流回A
                    </text>
                  </g>
                )}
                {animStage === 3 && (
                  <g transform="translate(0, -18)">
                    <rect x="-24" y="-7" width="48" height="13" rx="3.5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
                    <text x="0" y="2" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#0369a1">
                      🔁 圈2闭环
                    </text>
                  </g>
                )}
              </motion.g>
            </svg>

            {/* 图例底标 */}
            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-600 mt-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>🟢 组1 (A-B)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span>🔵 组2 (C-D-E)</span>
              </span>
              <span className="flex items-center gap-1 text-red-600">
                <span>🔴 虚线 = 单向洋流(不可逆)</span>
              </span>
            </div>
          </div>

          {/* 右侧：海獭探险手册 + 关键定理卡片 (4 列) */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            {/* 定理卡片 1：什么是能回家的圈子 */}
            <div className="bg-emerald-50/80 border-2 border-emerald-200 rounded-2xl p-2.5 text-xs shadow-xs">
              <div className="flex items-center justify-between mb-1 font-black text-emerald-900">
                <span className="flex items-center gap-1">
                  <Anchor className="w-3.5 h-3.5 text-emerald-600" />
                  <span>核心规则：必须回到基地</span>
                </span>
                <span className="text-[10px] bg-emerald-200 text-emerald-950 px-1.5 py-0.5 rounded font-bold">
                  出海条件
                </span>
              </div>
              <p className="text-[11px] text-emerald-950 leading-tight">
                坐小船出海后，<strong>顺着箭头必须能绕回下直升机的岛屿</strong>。
              </p>
              <div className="mt-1.5 flex items-center justify-around bg-white p-1 rounded-xl border border-emerald-200 text-[10px] font-bold">
                <span>A ➔ B ➔ A 🔁 <strong className="text-emerald-700">可以回家</strong></span>
              </div>
            </div>

            {/* 定理卡片 2：单行道意味着什么 */}
            <div className="bg-rose-50/80 border-2 border-rose-200 rounded-2xl p-2.5 text-xs shadow-xs">
              <div className="flex items-center justify-between mb-1 font-black text-rose-900">
                <span className="flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-rose-600" />
                  <span>单向洋流 = 无法返航</span>
                </span>
                <span className="text-[10px] bg-rose-200 text-rose-950 px-1.5 py-0.5 rounded font-bold">
                  新直升机
                </span>
              </div>
              <p className="text-[11px] text-rose-950 leading-tight">
                如果顺箭头开去别的岛之后<strong>再也转不回来</strong>，就必须乘坐另一次直升飞机！
              </p>
            </div>

            {/* 海獭队长助手卡片 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 flex items-center gap-2.5">
              <CuteOtterCaptain scale={0.75} isSailing={animStage > 0 && animStage < 4} />
              <div className="text-xs">
                {activeIsland ? (
                  <div>
                    <div className="font-black text-slate-800">{activeIsland.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      属于第 {activeIsland.groupId} 个探索圈子，点击其他岛屿观察连通！
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-slate-800">海獭队长的提示</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      数数地图上几个互相转圈圈的小组，就是答案需要的直升机次数！
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* 4. 底部思考提示条 */}
        <div className="w-full mt-2.5 pt-2.5 border-t-2 border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-600 font-bold">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-200">
              思维总结
            </span>
            <span>
              图论中的【强连通分量】= 顺着单向箭头能互相走通回家的岛屿集合
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <Info className="w-4 h-4 text-emerald-500" />
            <span>在右侧选择探险队最少需要的直升机出海次数</span>
          </div>
        </div>
      </div>
    </div>
  );
};
