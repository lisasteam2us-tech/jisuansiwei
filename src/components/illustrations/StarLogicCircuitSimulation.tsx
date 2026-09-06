import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Info,
  Layers,
  Cpu,
  Eye,
} from 'lucide-react';
import { sounds } from '../../utils/audio';

// 节点数据类型定义
export interface StarCircuitNode {
  id: number;
  layer: 'outer' | 'middle' | 'center';
  x: number;
  y: number;
  gateType?: 'AND' | 'XOR' | 'INPUT';
  minNeighbors?: number[]; // 相连且序号最小的两个邻居
  initialState?: boolean;  // 是否初始点亮
  solvedState?: boolean;   // 正确推导状态
  name: string;
}

// 15个星形节点坐标与逻辑关系配置（标准五角星三层拓扑）
// 顶点 5 个（1~5），中圈凹点 5 个（6~10），中心五边形 5 个（11~15）
const CX = 160;
const CY = 150;

function getStarPoint(radius: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Math.round((CX + radius * Math.cos(rad)) * 10) / 10,
    y: Math.round((CY + radius * Math.sin(rad)) * 10) / 10,
  };
}

// 外层半径 120, 中层半径 75, 内层中心半径 38
const P1 = getStarPoint(120, 0);    // 1号 (顶)
const P2 = getStarPoint(120, 72);   // 2号 (右上)
const P3 = getStarPoint(120, 144);  // 3号 (右下)
const P4 = getStarPoint(120, 216);  // 4号 (左下)
const P5 = getStarPoint(120, 288);  // 5号 (左上)

const P6 = getStarPoint(72, 36);    // 6号
const P7 = getStarPoint(72, 108);   // 7号
const P8 = getStarPoint(72, 180);   // 8号
const P9 = getStarPoint(72, 252);   // 9号
const P10 = getStarPoint(72, 324);  // 10号

const P11 = getStarPoint(36, 0);    // 11号
const P12 = getStarPoint(36, 72);   // 12号
const P13 = getStarPoint(36, 144);  // 13号
const P14 = getStarPoint(36, 216);  // 14号
const P15 = getStarPoint(36, 288);  // 15号

export const STAR_NODES: StarCircuitNode[] = [
  // 外层输入灯（1, 2, 4 亮；3, 5 灭）
  { id: 1, layer: 'outer', x: P1.x, y: P1.y, gateType: 'INPUT', initialState: true, solvedState: true, name: '1号灯 (输入)' },
  { id: 2, layer: 'outer', x: P2.x, y: P2.y, gateType: 'INPUT', initialState: true, solvedState: true, name: '2号灯 (输入)' },
  { id: 3, layer: 'outer', x: P3.x, y: P3.y, gateType: 'INPUT', initialState: false, solvedState: false, name: '3号灯 (输入)' },
  { id: 4, layer: 'outer', x: P4.x, y: P4.y, gateType: 'INPUT', initialState: true, solvedState: true, name: '4号灯 (输入)' },
  { id: 5, layer: 'outer', x: P5.x, y: P5.y, gateType: 'INPUT', initialState: false, solvedState: false, name: '5号灯 (输入)' },

  // 中层过渡灯
  { id: 6, layer: 'middle', x: P6.x, y: P6.y, gateType: 'AND', minNeighbors: [1, 2], initialState: false, solvedState: true, name: '6号灯 (双亮门)' },
  { id: 7, layer: 'middle', x: P7.x, y: P7.y, gateType: 'XOR', minNeighbors: [2, 3], initialState: false, solvedState: true, name: '7号灯 (单亮门)' },
  { id: 8, layer: 'middle', x: P8.x, y: P8.y, gateType: 'AND', minNeighbors: [3, 4], initialState: false, solvedState: false, name: '8号灯 (双亮门)' },
  { id: 9, layer: 'middle', x: P9.x, y: P9.y, gateType: 'XOR', minNeighbors: [4, 5], initialState: false, solvedState: true, name: '9号灯 (单亮门)' },
  { id: 10, layer: 'middle', x: P10.x, y: P10.y, gateType: 'AND', minNeighbors: [1, 5], initialState: false, solvedState: false, name: '10号灯 (双亮门)' },

  // 中心目标灯 (正确点亮的是 11, 13, 14)
  { id: 11, layer: 'center', x: P11.x, y: P11.y, gateType: 'XOR', minNeighbors: [6, 10], initialState: false, solvedState: true, name: '11号灯 (单亮门)' },
  { id: 12, layer: 'center', x: P12.x, y: P12.y, gateType: 'AND', minNeighbors: [6, 7], initialState: false, solvedState: false, name: '12号灯 (双亮门)' },
  { id: 13, layer: 'center', x: P13.x, y: P13.y, gateType: 'XOR', minNeighbors: [7, 8], initialState: false, solvedState: true, name: '13号灯 (单亮门)' },
  { id: 14, layer: 'center', x: P14.x, y: P14.y, gateType: 'XOR', minNeighbors: [8, 9], initialState: false, solvedState: true, name: '14号灯 (单亮门)' },
  { id: 15, layer: 'center', x: P15.x, y: P15.y, gateType: 'AND', minNeighbors: [9, 10], initialState: false, solvedState: false, name: '15号灯 (双亮门)' },
];

// 电路连线列表
const CIRCUIT_WIRES = [
  // 外层到中层
  [1, 6], [2, 6],
  [2, 7], [3, 7],
  [3, 8], [4, 8],
  [4, 9], [5, 9],
  [5, 10], [1, 10],
  // 中层到中心
  [6, 11], [10, 11],
  [6, 12], [7, 12],
  [7, 13], [8, 13],
  [8, 14], [9, 14],
  [9, 15], [10, 15],
  // 中心互连闭环
  [11, 12], [12, 13], [13, 14], [14, 15], [15, 11]
];

// 简单可爱的 2D 矢量海狸工程师卡通形象（纯白底色适配，明亮、干净）
const CuteBeaverEngineer: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      style={{ transform: `scale(${scale})` }}
      className="flex flex-col items-center justify-center pointer-events-none"
    >
      <svg viewBox="0 0 100 110" className="w-16 h-18 sm:w-20 sm:h-22">
        {/* 海狸大扁尾巴 */}
        <ellipse cx="22" cy="85" rx="16" ry="9" fill="#78350f" stroke="#451a03" strokeWidth="2" transform="rotate(-25 22 85)" />
        <path d="M12 80 L32 90 M14 88 L30 82" stroke="#451a03" strokeWidth="1.5" />

        {/* 身体 */}
        <ellipse cx="50" cy="72" rx="28" ry="24" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />
        <ellipse cx="50" cy="74" rx="16" ry="14" fill="#fef3c7" />

        {/* 工程师工装背带 */}
        <path d="M36 60 L36 86 M64 60 L64 86" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        <rect x="42" y="70" width="16" height="12" rx="3" fill="#0284c7" />

        {/* 圆耳朵 */}
        <circle cx="28" cy="30" r="9" fill="#78350f" stroke="#451a03" strokeWidth="2" />
        <circle cx="28" cy="30" r="4.5" fill="#fde68a" />
        <circle cx="72" cy="30" r="9" fill="#78350f" stroke="#451a03" strokeWidth="2" />
        <circle cx="72" cy="30" r="4.5" fill="#fde68a" />

        {/* 头 */}
        <ellipse cx="50" cy="45" rx="26" ry="22" fill="#b45309" stroke="#451a03" strokeWidth="2.5" />
        
        {/* 黄色安全帽 */}
        <path d="M26 34 Q50 14 74 34 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <ellipse cx="50" cy="34" rx="26" ry="5" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
        {/* 帽子手电筒/电波 */}
        <circle cx="50" cy="24" r="3.5" fill="#ffffff" stroke="#eab308" strokeWidth="1.5" />

        {/* 眼睛与腮红 */}
        <circle cx="39" cy="42" r="3.5" fill="#1e293b" />
        <circle cx="61" cy="42" r="3.5" fill="#1e293b" />
        <circle cx="40.5" cy="40.5" r="1.2" fill="#ffffff" />
        <circle cx="62.5" cy="40.5" r="1.2" fill="#ffffff" />
        <circle cx="31" cy="48" r="4" fill="#fca5a5" opacity="0.7" />
        <circle cx="69" cy="48" r="4" fill="#fca5a5" opacity="0.7" />

        {/* 鼻子与大白牙 */}
        <ellipse cx="50" cy="47" rx="6" ry="4.5" fill="#fef3c7" />
        <ellipse cx="50" cy="46" rx="3.5" ry="2.5" fill="#1e293b" />
        {/* 海狸标志性大板牙 */}
        <rect x="46" y="51" width="4" height="6" fill="#ffffff" stroke="#1e293b" strokeWidth="1" rx="1" />
        <rect x="50" y="51" width="4" height="6" fill="#ffffff" stroke="#1e293b" strokeWidth="1" rx="1" />

        {/* 手中握着测试电笔 */}
        <rect x="70" y="65" width="4" height="14" rx="2" fill="#ef4444" transform="rotate(25 70 65)" />
        <circle cx="77" cy="62" r="3" fill="#38bdf8" />
      </svg>
    </motion.div>
  );
};

export const StarLogicCircuitSimulation: React.FC = () => {
  // 教学实验 5 阶段：
  // 0: 情境建立与初始灯（1, 2, 4点亮）(0~2.5s)
  // 1: 规则探索（🟡双亮门 vs 🔷单亮门原理）(2.5~5.5s)
  // 2: 局部推演示范（中层6号灯：邻居1亮+2亮 ➔ 触发双亮门点亮）(5.5~8.5s)
  // 3: 信号传导探索（中层7号灯：邻居2亮+3灭 ➔ 触发单亮门点亮）(8.5~11s)
  // 4: 实验结束，交还控制权，提示推导中心11~15号灯并在右侧作答 (11s~)
  const [animStage, setAnimStage] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(true);
  const timelineRef = useRef<number[]>([]);
  const [selectedNode, setSelectedNode] = useState<StarCircuitNode | null>(null);

  // 动画时间轴编排
  useEffect(() => {
    if (!isPlayingAuto) return;

    timelineRef.current.forEach((id) => clearTimeout(id));
    timelineRef.current = [];

    setAnimStage(0);

    // Stage 1: 认识两种逻辑门 (2.5s)
    const t1 = window.setTimeout(() => {
      setAnimStage(1);
      sounds.playTap();
    }, 2500);

    // Stage 2: 示范6号灯 (5.5s)
    const t2 = window.setTimeout(() => {
      setAnimStage(2);
      sounds.playSelect();
    }, 5500);

    // Stage 3: 示范7号灯 (8.5s)
    const t3 = window.setTimeout(() => {
      setAnimStage(3);
      sounds.playSelect();
    }, 8500);

    // Stage 4: 演示结束，交还控制权 (11.5s)
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
    setSelectedNode(null);
    setIsPlayingAuto(true);
  };

  const handleJumpStage = (stageIdx: number) => {
    timelineRef.current.forEach((id) => clearTimeout(id));
    setIsPlayingAuto(false);
    sounds.playTap();
    setAnimStage(stageIdx);
  };

  // 根据当前阶段计算每个节点的显示点亮状态
  // 严格规则：绝不直接在动画中给出最终中心11~15题目的全量答案！
  const getNodeVisualState = (node: StarCircuitNode) => {
    // 初始外层：1, 2, 4 始终亮；3, 5 始终灭
    if (node.layer === 'outer') {
      return node.initialState;
    }

    // 中层节点在阶段2、3、4的示范演示：
    if (node.id === 6) {
      return animStage >= 2; // 阶段2及之后示范点亮
    }
    if (node.id === 7) {
      return animStage >= 3; // 阶段3及之后示范点亮
    }

    // 其他中层与中心节点：
    // 在阶段4保持探索状态（未点亮，待推导），孩子可点击探索
    return false;
  };

  return (
    <div id="star-logic-circuit-simulation" className="w-full flex flex-col select-none text-slate-800 font-sans">
      {/* 1. 顶部操作与切换栏（纯白卡片，明亮卡通风） */}
      <div className="w-full bg-white border-2 border-sky-100 rounded-2xl p-3 mb-2.5 shadow-sm flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-xl shadow-xs">
            🌟
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900 tracking-wide">
                星形逻辑门电路 · 点灯实验台
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-bold">
                逻辑传导实验
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              观察逻辑门规则 ➔ 看懂信号传导 ➔ 在右侧推断中心亮灯
            </p>
          </div>
        </div>

        {/* 阶段切换胶囊 & 重放按钮 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            {[
              { idx: 0, label: '外圈初始' },
              { idx: 1, label: '认识两种门' },
              { idx: 2, label: '🟡6号示范' },
              { idx: 3, label: '🔷7号示范' },
            ].map((st) => (
              <button
                key={st.idx}
                onClick={() => handleJumpStage(st.idx)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  animStage === st.idx
                    ? 'bg-white text-sky-900 shadow-xs border border-sky-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleReplay}
            className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-white text-xs font-black flex items-center gap-1 shadow-xs transition cursor-pointer border border-sky-600"
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
              className="w-full px-4 py-2.5 rounded-2xl bg-sky-50/90 border-2 border-sky-200 text-xs sm:text-sm font-bold text-sky-950 flex items-center gap-2.5 shadow-xs"
            >
              <span className="text-xl shrink-0">
                {animStage === 0 && '⚡'}
                {animStage === 1 && '💡'}
                {animStage === 2 && '🟡'}
                {animStage === 3 && '🔷'}
                {animStage === 4 && '🎯'}
              </span>
              <div className="leading-snug">
                {animStage === 0 && (
                  <span>
                    <strong>【初始状态】</strong> 外圈 5 个灯中，<strong>1、2、4 号灯</strong> 已经点亮 (💡)，<strong>3、5 号灯</strong> 熄灭 (⚪)。
                  </span>
                )}
                {animStage === 1 && (
                  <span>
                    <strong>【两种神奇开关】</strong> 🟡 <strong>双亮门</strong>：两个邻居都亮它才亮；🔷 <strong>单亮门</strong>：只有一个邻居亮它才亮！
                  </span>
                )}
                {animStage === 2 && (
                  <span>
                    <strong>【推导演示·6号灯】</strong> 6号是🟡双亮门，相连最小邻居是 <strong>1号(亮) + 2号(亮)</strong> ➔ 两个都亮 ➔ <strong className="text-amber-700">6号点亮！</strong>
                  </span>
                )}
                {animStage === 3 && (
                  <span>
                    <strong>【推导演示·7号灯】</strong> 7号是🔷单亮门，相连最小邻居是 <strong>2号(亮) + 3号(灭)</strong> ➔ 刚好一个亮 ➔ <strong className="text-sky-700">7号点亮！</strong>
                  </span>
                )}
                {animStage === 4 && (
                  <span>
                    <strong>【轮到你啦】</strong> 规则演示完毕！请根据上述规则，一步步推算中心 <strong>11~15 号灯</strong> 哪些会亮起，并在右侧作答。
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. 中间核心：五角星逻辑电路图 + 规则对照卡片 */}
        <div className="w-full my-auto grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* 左侧/主区：SVG 五角星电路图 (占据 8 列) */}
          <div className="md:col-span-8 flex flex-col items-center justify-center relative bg-slate-50/60 rounded-2xl p-2 border border-slate-200">
            <svg
              viewBox="0 0 320 300"
              className="w-full max-w-[340px] h-[260px] sm:h-[280px]"
            >
              {/* 背景导线连线 */}
              <g stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round">
                {CIRCUIT_WIRES.map(([fromId, toId], idx) => {
                  const nodeA = STAR_NODES.find((n) => n.id === fromId)!;
                  const nodeB = STAR_NODES.find((n) => n.id === toId)!;
                  
                  // 判断连线是否通电（两端如果都亮，显示高亮光轨）
                  const isAOn = getNodeVisualState(nodeA);
                  const isBOn = getNodeVisualState(nodeB);
                  const isEnergized = isAOn && isBOn;

                  return (
                    <line
                      key={idx}
                      x1={nodeA.x}
                      y1={nodeA.y}
                      x2={nodeB.x}
                      y2={nodeB.y}
                      stroke={isEnergized ? '#38bdf8' : '#e2e8f0'}
                      strokeWidth={isEnergized ? 3 : 2}
                      strokeDasharray={nodeA.layer === 'center' || nodeB.layer === 'center' ? '4 3' : 'none'}
                    />
                  );
                })}
              </g>

              {/* 绘制 15 个电路节点灯泡 */}
              {STAR_NODES.map((node) => {
                const isOn = getNodeVisualState(node);
                const isSelected = selectedNode?.id === node.id;
                const isCenter = node.layer === 'center';
                const isMiddle = node.layer === 'middle';

                // 图标背景与边框色彩
                let fillBg = '#f1f5f9';
                let strokeColor = '#94a3b8';
                if (isOn) {
                  fillBg = node.gateType === 'AND' ? '#fef3c7' : '#e0f2fe';
                  strokeColor = node.gateType === 'AND' ? '#f59e0b' : '#0284c7';
                }

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer group"
                    onClick={() => {
                      sounds.playTap();
                      setSelectedNode(isSelected ? null : node);
                    }}
                  >
                    {/* 发光外晕 */}
                    {isOn && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isCenter ? 18 : 20}
                        fill={node.gateType === 'AND' ? '#fde047' : '#38bdf8'}
                        opacity="0.35"
                        className="animate-pulse"
                      />
                    )}

                    {/* 鼠标悬停光圈（防抖） */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isCenter ? 16 : 18}
                      fill="transparent"
                      className="group-hover:fill-sky-100/60 transition-colors"
                    />

                    {/* 节点底圆 */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isCenter ? 13 : 15}
                      fill={fillBg}
                      stroke={isSelected ? '#f43f5e' : strokeColor}
                      strokeWidth={isSelected ? 3 : 2}
                      className="group-hover:stroke-sky-500 transition-colors"
                    />

                    {/* 节点类型标记 */}
                    {node.gateType === 'AND' && (
                      <circle cx={node.x} cy={node.y - 7} r="2.5" fill="#f59e0b" />
                    )}
                    {node.gateType === 'XOR' && (
                      <polygon
                        points={`${node.x},${node.y - 10} ${node.x + 3},${node.y - 6} ${node.x - 3},${node.y - 6}`}
                        fill="#0284c7"
                      />
                    )}

                    {/* 灯泡状态文字/符号 */}
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fontSize={isCenter ? '10' : '11'}
                      fontWeight="900"
                      fill={isOn ? '#0f172a' : '#64748b'}
                    >
                      {node.id}
                    </text>

                    {/* 状态小角标 (💡 / ⚪) */}
                    <text
                      x={node.x + (isCenter ? 10 : 12)}
                      y={node.y - 6}
                      fontSize="9"
                    >
                      {isOn ? '💡' : isCenter && animStage === 4 ? '❓' : '⚪'}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* 图例底标 */}
            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-600 mt-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500"></span>
                <span>🟡 双亮门(AND)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 border border-sky-600"></span>
                <span>🔷 单亮门(XOR)</span>
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span>💡=亮 · ⚪=灭 · ❓=待推导</span>
              </span>
            </div>
          </div>

          {/* 右侧：小海狸工程助手 + 规则图解卡片 (占据 4 列) */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            {/* 规则图解卡片 1：双亮门 */}
            <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-2.5 text-xs shadow-xs">
              <div className="flex items-center justify-between mb-1 font-black text-amber-900">
                <span className="flex items-center gap-1">
                  <span>🟡</span>
                  <span>双亮门 (两个都亮)</span>
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded font-mono font-bold">
                  AND
                </span>
              </div>
              <p className="text-[11px] text-amber-950 leading-tight">
                相连序号最小的 <strong>两个邻居都为💡亮</strong> 时，它才会点亮！
              </p>
              <div className="mt-1.5 flex items-center justify-around bg-white p-1 rounded-xl border border-amber-200 text-[10px] font-bold">
                <span>💡 + 💡 ➔ <strong className="text-emerald-600">💡 亮</strong></span>
                <span className="text-slate-300">|</span>
                <span>💡 + ⚪ ➔ <strong className="text-slate-400">⚪ 灭</strong></span>
              </div>
            </div>

            {/* 规则图解卡片 2：单亮门 */}
            <div className="bg-sky-50/80 border-2 border-sky-200 rounded-2xl p-2.5 text-xs shadow-xs">
              <div className="flex items-center justify-between mb-1 font-black text-sky-900">
                <span className="flex items-center gap-1">
                  <span>🔷</span>
                  <span>单亮门 (刚好一个亮)</span>
                </span>
                <span className="text-[10px] bg-sky-200 text-sky-950 px-1.5 py-0.5 rounded font-mono font-bold">
                  XOR
                </span>
              </div>
              <p className="text-[11px] text-sky-950 leading-tight">
                相连序号最小的 <strong>两个邻居只有一个为💡亮</strong> 时点亮；两个都亮反而熄灭！
              </p>
              <div className="mt-1.5 flex items-center justify-around bg-white p-1 rounded-xl border border-sky-200 text-[10px] font-bold">
                <span>💡 + ⚪ ➔ <strong className="text-emerald-600">💡 亮</strong></span>
                <span className="text-slate-300">|</span>
                <span>💡 + 💡 ➔ <strong className="text-slate-400">⚪ 灭</strong></span>
              </div>
            </div>

            {/* 选中小节点查看面板 / 海狸提示 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 flex items-center gap-2.5">
              <CuteBeaverEngineer scale={0.75} />
              <div className="text-xs">
                {selectedNode ? (
                  <div>
                    <div className="font-black text-slate-800">{selectedNode.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {selectedNode.minNeighbors
                        ? `最小邻居：${selectedNode.minNeighbors.join('号 & ')}号`
                        : '外层初始输入电源'}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-slate-800">小海狸的推导技巧</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      点击左侧任意节点，查看其连接的两个最小邻居！
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
            <span className="px-2 py-0.5 rounded-lg bg-sky-100 text-sky-900 border border-sky-200">
              推导思路
            </span>
            <span>
              外层输入 (1,2,4亮) ➔ 推算中层 6~10号 ➔ 再推算中心 11~15号
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <Info className="w-4 h-4 text-sky-500" />
            <span>推导出中心亮起的灯，在右侧选择选项</span>
          </div>
        </div>
      </div>
    </div>
  );
};
