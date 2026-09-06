import React from 'react';
import { ClueType, Question } from '../types';
import { BookshelfIllustration } from './BookshelfIllustration';
import { BinaryTreeLanternSimulation } from './illustrations/BinaryTreeLanternSimulation';
import { FruitSortingSimulation } from './illustrations/FruitSortingSimulation';
import { StarLogicCircuitSimulation } from './illustrations/StarLogicCircuitSimulation';
import { OtterIslandExpeditionSimulation } from './illustrations/OtterIslandExpeditionSimulation';
import { DiceMonsterScratchSimulation } from './illustrations/DiceMonsterScratchSimulation';
import { PirateIslandMazeSimulation } from './illustrations/PirateIslandMazeSimulation';
import { RobotCabinetParitySimulation } from './illustrations/RobotCabinetParitySimulation';
import { LighthouseVennStaticIllustration } from './illustrations/LighthouseVennStaticIllustration';
import { ShapeFactoryStaticIllustration } from './illustrations/ShapeFactoryStaticIllustration';
import { BraceletBoxIllustration } from './illustrations/BraceletBoxIllustration';
import { BbqSkewersIllustration } from './illustrations/BbqSkewersIllustration';
import { RattleCycleIllustration } from './illustrations/RattleCycleIllustration';
import { OnlineClassWebcamIllustration } from './illustrations/OnlineClassWebcamIllustration';
import { AlienCreatureTreeIllustration } from './illustrations/AlienCreatureTreeIllustration';
import { PhotoLogCluesIllustration } from './illustrations/PhotoLogCluesIllustration';
import { FlowerBouquetTreeIllustration } from './illustrations/FlowerBouquetTreeIllustration';
import { BeaverPhotoWalkIllustration } from './illustrations/BeaverPhotoWalkIllustration';
import {
  GitBranch,
  Network,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Bot,
  Compass,
  CheckCircle,
  Brain,
  Search,
  ArrowRight,
  ShieldCheck,
  Code,
  Hash,
  Database,
  Radio,
  Clock,
  Shuffle,
  Eye,
  Sliders,
  FolderTree,
  FileCode,
  Lock,
  Play,
  RotateCw,
} from 'lucide-react';

interface DynamicClueIllustrationProps {
  clueType: ClueType;
  clueBadgeText?: string;
  question?: Question;
}

export const DynamicClueIllustration: React.FC<DynamicClueIllustrationProps> = ({
  clueType,
  clueBadgeText = '任务线索',
  question,
}) => {
  const qId = question?.id;
  const stem = question?.stemText || '';

  if (qId === 1036 || stem.includes('餐具橱柜') || (stem.includes('机器人管家') && stem.includes('茶壶') && stem.includes('茶杯')) || stem.includes('成双成对')) {
    return <RobotCabinetParitySimulation />;
  }

  if (qId === 1038 || (stem.includes('小熊船长') && stem.includes('灯塔')) || (stem.includes('灯台') && stem.includes('海图')) || (stem.includes('灯塔A') && stem.includes('灯塔B') && stem.includes('灯塔C'))) {
    return <LighthouseVennStaticIllustration />;
  }

  if (qId === 1039 || (stem.includes('玩具工厂') && (stem.includes('合成机') || stem.includes('机器A'))) || stem.includes('几何图形的布尔逻辑合成机')) {
    return <ShapeFactoryStaticIllustration />;
  }

  if (qId === 1041 || stem.includes('首饰盒') || (stem.includes('手链') && stem.includes('格子')) || stem.includes('手链串珠')) {
    return <BraceletBoxIllustration />;
  }

  if (qId === 1042 || stem.includes('烤肉') || stem.includes('烤串') || (stem.includes('小海狸') && stem.includes('大蒜') && stem.includes('洋葱圈'))) {
    return <BbqSkewersIllustration />;
  }

  if (qId === 1044 || stem.includes('五彩滚珠筒') || stem.includes('滚珠摇铃') || (stem.includes('小球') && stem.includes('循环顺序') && stem.includes('空位'))) {
    return <RattleCycleIllustration />;
  }

  if (qId === 1045 || stem.includes('在线课堂') || stem.includes('同屏') || (stem.includes('小动物') && stem.includes('图书馆') && stem.includes('网课'))) {
    return <OnlineClassWebcamIllustration />;
  }

  if (qId === 1068 || stem.includes('卡卡') || stem.includes('奇幻生物') || (stem.includes('小怪兽') && stem.includes('照片') && stem.includes('规律'))) {
    return <AlienCreatureTreeIllustration />;
  }

  if (qId === 1069 || stem.includes('写真') || (stem.includes('木头') && stem.includes('尖顶') && stem.includes('斑纹') && stem.includes('照片'))) {
    return <PhotoLogCluesIllustration />;
  }

  if (qId === 1071 || stem.includes('花店') || (stem.includes('花束') && stem.includes('三步魔法')) || (stem.includes('菊花') && stem.includes('玫瑰') && stem.includes('树枝'))) {
    return <FlowerBouquetTreeIllustration />;
  }

  if (qId === 1072 || stem.includes('散步') || stem.includes('波波') || (stem.includes('照片') && (stem.includes('面朝北') || stem.includes('面朝南') || stem.includes('相机')))) {
    return <BeaverPhotoWalkIllustration />;
  }

  if (qId === 1009 || stem.includes('零食计划表') || stem.includes('佩奇') || (stem.includes('芒果') && stem.includes('糖果') && stem.includes('雪梨')) || stem.includes('甜品时光')) {
    return <FruitSortingSimulation />;
  }

  if (qId === 1008 || stem.includes('海盗岛迷宫') || (stem.includes('小狗汪汪') && stem.includes('水坑') && stem.includes('高山')) || stem.includes('海盗宝藏图')) {
    return <PirateIslandMazeSimulation />;
  }

  if (qId === 1006 || stem.includes('骰子怪兽') || (stem.includes('小熊猫') && stem.includes('骰子') && stem.includes('怪兽')) || stem.includes('红骰子是3')) {
    return <DiceMonsterScratchSimulation />;
  }

  // 1. Specific High-Fidelity Custom Renderers by Question ID or Keywords
  if (qId === 1005 || stem.includes('海獭群岛') || stem.includes('强连通分量') || (stem.includes('直升飞机') && stem.includes('岛屿') && stem.includes('圈子'))) {
    return <OtterIslandExpeditionSimulation />;
  }

  if (qId === 1004 || stem.includes('星形逻辑门') || stem.includes('星形电路') || stem.includes('星形灯光秀') || (stem.includes('两个数字最小的邻居') && stem.includes('电路'))) {
    return <StarLogicCircuitSimulation />;
  }

  if (qId === 1002 || (stem.includes('智慧森林') && stem.includes('点灯')) || (stem.includes('左灯') && stem.includes('中灯'))) {
    return <BinaryTreeLanternSimulation />;
  }

  if (qId === 1003 || stem.includes('果园女王') || stem.includes('水果盛宴') || (stem.includes('苹果') && stem.includes('香蕉') && stem.includes('接见'))) {
    return <FruitSortingSimulation />;
  }

  if (qId === 101 || (stem.includes('苹果') && stem.includes('香蕉') && stem.includes('胡萝卜'))) {
    return (
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
        <div className="flex items-center gap-2 mb-3 bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-full text-xs font-black border border-[#fde68a]">
          <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
          <span>水果循环序列：每3样一轮</span>
        </div>
        <div className="w-full bg-white rounded-2xl p-4 border-2 border-[#fed7aa] shadow-sm flex flex-col items-center">
          <div className="flex items-center justify-center gap-1.5 py-2 flex-wrap">
            <div className="flex flex-col items-center bg-red-50 p-1.5 rounded-xl border border-red-200">
              <span className="text-2xl">🍎</span>
              <span className="text-[10px] text-red-600 font-bold">1.苹果</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            <div className="flex flex-col items-center bg-amber-50 p-1.5 rounded-xl border border-amber-200">
              <span className="text-2xl">🍌</span>
              <span className="text-[10px] text-amber-600 font-bold">2.香蕉</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            <div className="flex flex-col items-center bg-orange-50 p-1.5 rounded-xl border border-orange-200">
              <span className="text-2xl">🥕</span>
              <span className="text-[10px] text-orange-600 font-bold">3.胡萝卜</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            <div className="flex flex-col items-center bg-red-50 p-1.5 rounded-xl border border-red-200">
              <span className="text-2xl">🍎</span>
              <span className="text-[10px] text-red-600 font-bold">4.苹果</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            <div className="flex flex-col items-center bg-amber-50 p-1.5 rounded-xl border border-amber-200">
              <span className="text-2xl">🍌</span>
              <span className="text-[10px] text-amber-600 font-bold">5.香蕉</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            <div className="flex flex-col items-center bg-emerald-100 p-2 rounded-xl border-2 border-dashed border-emerald-500 animate-pulse">
              <span className="text-2xl">❓</span>
              <span className="text-[10px] text-emerald-800 font-black">第6个?</span>
            </div>
          </div>
          <div className="mt-2 bg-[#f0fdf4] text-[#065f46] px-3 py-1.5 rounded-lg text-xs font-bold w-full text-center border border-[#bbf7d0]">
            周期规律：[ 🍎 ➔ 🍌 ➔ 🥕 ] 重复出现
          </div>
        </div>
      </div>
    );
  }

  if (qId === 102 || (stem.includes('翻页') && stem.includes('垃圾桶') && stem.includes('静音'))) {
    return (
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
        <div className="flex items-center gap-2 mb-3 bg-[#e0f2fe] text-[#0369a1] px-3 py-1 rounded-full text-xs font-black border border-[#bae6fd]">
          <Eye className="w-3.5 h-3.5" />
          <span>常用 UI 交互图标语义</span>
        </div>
        <div className="w-full bg-[#f8fafc] rounded-2xl p-4 border-2 border-[#cbd5e1] shadow-sm flex flex-col items-center">
          <div className="grid grid-cols-3 gap-3 w-full">
            <div className="flex flex-col items-center bg-white p-3 rounded-xl border-2 border-sky-300 shadow-sm">
              <span className="text-3xl mb-1">➡️</span>
              <span className="text-xs font-black text-sky-800">下一页 (Next)</span>
              <span className="text-[10px] text-gray-400">向右翻页</span>
            </div>
            <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm opacity-75">
              <span className="text-3xl mb-1">🗑️</span>
              <span className="text-xs font-black text-gray-700">删除 (Delete)</span>
              <span className="text-[10px] text-gray-400">清空垃圾</span>
            </div>
            <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm opacity-75">
              <span className="text-3xl mb-1">🔇</span>
              <span className="text-xs font-black text-gray-700">静音 (Mute)</span>
              <span className="text-[10px] text-gray-400">关闭声音</span>
            </div>
          </div>
          <div className="mt-3 bg-sky-50 text-sky-900 px-3 py-1.5 rounded-lg text-xs font-bold w-full text-center border border-sky-200">
            图标对应动作：向右箭头 ➔ 继续翻看下一页
          </div>
        </div>
      </div>
    );
  }

  if (qId === 103 || (stem.includes('小花') && stem.includes('面朝东'))) {
    return (
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
        <div className="flex items-center gap-2 mb-3 bg-[#ecfdf5] text-[#065f46] px-3 py-1 rounded-full text-xs font-black border border-[#a7f3d0]">
          <Compass className="w-3.5 h-3.5" />
          <span>直线距离与前进步数</span>
        </div>
        <div className="w-full bg-white rounded-2xl p-4 border-2 border-[#a7f3d0] shadow-sm flex flex-col items-center">
          <div className="grid grid-cols-3 gap-2 w-full p-2 bg-[#f0fdf4] rounded-xl border border-[#86efac]">
            <div className="h-16 bg-[#07C160] rounded-lg flex flex-col items-center justify-center text-white border-2 border-[#006d33] shadow-sm">
              <span className="text-xl">🤖👉</span>
              <span className="text-[10px] font-black">起点(朝东)</span>
            </div>
            <div className="h-16 bg-white rounded-lg flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-300">
              <span className="text-xs font-bold text-emerald-600">第1步 ➔</span>
              <span className="text-[9px] text-gray-400">途径格</span>
            </div>
            <div className="h-16 bg-amber-50 rounded-lg flex flex-col items-center justify-center text-amber-800 border-2 border-amber-400 shadow-sm animate-pulse">
              <span className="text-2xl">🌸</span>
              <span className="text-[10px] font-black text-amber-700">终点(小花)</span>
            </div>
          </div>
          <div className="mt-3 bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-lg text-xs font-bold w-full text-center border border-emerald-200">
            方向朝东无需转向：只需直走 2 步即可到达小花
          </div>
        </div>
      </div>
    );
  }

  if (qId === 104 || (stem.includes('小积木') && stem.includes('金字塔'))) {
    return (
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
        <div className="flex items-center gap-2 mb-3 bg-[#e0e7ff] text-[#3730a3] px-3 py-1 rounded-full text-xs font-black border border-[#c7d2fe]">
          <Layers className="w-3.5 h-3.5" />
          <span>台阶层级积木递增规律</span>
        </div>
        <div className="w-full bg-white rounded-2xl p-4 border-2 border-[#c7d2fe] shadow-sm flex flex-col items-center">
          <div className="flex flex-col items-center gap-1.5 py-1">
            <div className="flex gap-1 items-center">
              <span className="text-xs text-gray-400 w-12 text-right font-bold">第 1 层:</span>
              <div className="w-6 h-6 bg-indigo-500 rounded border border-indigo-700 text-white text-[10px] font-black flex items-center justify-center">1</div>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-xs text-gray-400 w-12 text-right font-bold">第 2 层:</span>
              <div className="w-6 h-6 bg-indigo-500 rounded border border-indigo-700 text-white text-[10px] font-black flex items-center justify-center">1</div>
              <div className="w-6 h-6 bg-indigo-500 rounded border border-indigo-700 text-white text-[10px] font-black flex items-center justify-center">2</div>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-xs text-gray-400 w-12 text-right font-bold">第 3 层:</span>
              <div className="w-6 h-6 bg-indigo-500 rounded border border-indigo-700 text-white text-[10px] font-black flex items-center justify-center">1</div>
              <div className="w-6 h-6 bg-indigo-500 rounded border border-indigo-700 text-white text-[10px] font-black flex items-center justify-center">2</div>
              <div className="w-6 h-6 bg-indigo-500 rounded border border-indigo-700 text-white text-[10px] font-black flex items-center justify-center">3</div>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-xs text-indigo-700 w-12 text-right font-black">第 4 层:</span>
              <div className="flex gap-1 p-1 bg-indigo-50 rounded-lg border-2 border-dashed border-indigo-400 animate-pulse">
                <div className="w-6 h-6 bg-indigo-600 rounded text-white text-[10px] font-black flex items-center justify-center">1</div>
                <div className="w-6 h-6 bg-indigo-600 rounded text-white text-[10px] font-black flex items-center justify-center">2</div>
                <div className="w-6 h-6 bg-indigo-600 rounded text-white text-[10px] font-black flex items-center justify-center">3</div>
                <div className="w-6 h-6 bg-indigo-600 rounded text-white text-[10px] font-black flex items-center justify-center">4</div>
              </div>
            </div>
          </div>
          <div className="mt-3 bg-indigo-50 text-indigo-900 px-3 py-1.5 rounded-lg text-xs font-bold w-full text-center border border-indigo-200">
            层数 n 对应 n 块积木：第 4 层需要 4 块
          </div>
        </div>
      </div>
    );
  }

  if (qId === 106 || (stem.includes('小松鼠') && stem.includes('小熊') && stem.includes('小兔'))) {
    return (
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
        <div className="flex items-center gap-2 mb-3 bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-full text-xs font-black border border-[#fde68a]">
          <Sliders className="w-3.5 h-3.5" />
          <span>身高传递性全序关系比较</span>
        </div>
        <div className="w-full bg-white rounded-2xl p-4 border-2 border-[#fde68a] shadow-sm flex flex-col items-center">
          <div className="flex items-end justify-center gap-6 h-28 w-full border-b-2 border-gray-400 pb-1">
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">🐿️</span>
              <div className="w-12 h-10 bg-amber-200 rounded-t-lg border border-amber-400 flex items-center justify-center text-[10px] font-bold">矮</div>
              <span className="text-[10px] text-gray-500 font-bold mt-1">小松鼠</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">🐻</span>
              <div className="w-12 h-16 bg-amber-400 rounded-t-lg border border-amber-600 flex items-center justify-center text-[10px] font-bold text-amber-950">中</div>
              <span className="text-[10px] text-gray-500 font-bold mt-1">小熊</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">🐰</span>
              <div className="w-12 h-24 bg-emerald-500 rounded-t-lg border border-emerald-700 flex items-center justify-center text-[10px] font-black text-white shadow-sm">最高★</div>
              <span className="text-[10px] text-emerald-700 font-black mt-1">小兔子</span>
            </div>
          </div>
          <div className="mt-3 bg-amber-50 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-bold w-full text-center border border-amber-200">
            传递性：松鼠 &lt; 小熊 &lt; 兔子 ➔ 小兔子最高
          </div>
        </div>
      </div>
    );
  }

  if (qId === 108 || (stem.includes('小红旗') && stem.includes('小绿旗'))) {
    return (
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
        <div className="flex items-center gap-2 mb-3 bg-[#e0f2fe] text-[#0369a1] px-3 py-1 rounded-full text-xs font-black border border-[#bae6fd]">
          <Compass className="w-3.5 h-3.5" />
          <span>旗语动作映射协议</span>
        </div>
        <div className="w-full bg-white rounded-2xl p-4 border-2 border-[#bae6fd] shadow-sm flex flex-col items-center">
          <div className="grid grid-cols-2 gap-3 w-full mb-3">
            <div className="flex items-center gap-2 bg-red-50 p-2 rounded-xl border border-red-200">
              <span className="text-2xl">🚩</span>
              <div className="text-left">
                <div className="text-xs font-black text-red-700">红旗 🚩</div>
                <div className="text-[10px] text-gray-600 font-bold">向左走 1 步</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
              <span className="text-2xl">🟢</span>
              <div className="text-left">
                <div className="text-xs font-black text-emerald-700">绿旗 🟢</div>
                <div className="text-[10px] text-gray-600 font-bold">向右走 1 步</div>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f8fafc] p-2 rounded-xl border border-gray-200 flex items-center justify-around text-xs font-bold">
            <span className="text-red-600">🚩 左1</span>
            <span className="text-gray-400">➔</span>
            <span className="text-emerald-600">🟢 右1</span>
            <span className="text-gray-400">➔</span>
            <span className="text-red-600 font-black">🚩 左1 (当前)</span>
          </div>
          <div className="mt-2 bg-sky-50 text-sky-900 px-3 py-1 rounded-lg text-xs font-bold w-full text-center">
            抵消规律：左1 + 右1 = 回到原点；最后左1 = 在原点左边 1 步
          </div>
        </div>
      </div>
    );
  }

  // 2. Comprehensive Switch Statement for all ClueTypes
  switch (clueType) {
    case 'bookshelf':
      return <BookshelfIllustration />;

    case 'dam-pipeline':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#e0f2fe] text-[#0369a1] px-3 py-1 rounded-full text-xs font-black border border-[#bae6fd]">
            <GitBranch className="w-3.5 h-3.5" />
            <span>海狸水坝多向分流管道图</span>
          </div>
          <div className="w-full bg-[#f0fdf4] rounded-2xl p-3 border-2 border-[#bbf7d0] shadow-inner relative overflow-hidden">
            <svg viewBox="0 0 300 210" className="w-full h-auto drop-shadow-sm">
              <circle cx="150" cy="18" r="12" fill="#0284c7" />
              <text x="150" y="22" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">IN</text>
              <path d="M150,30 L150,55" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
              <rect x="130" y="55" width="40" height="24" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
              <text x="150" y="71" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">阀门 1</text>
              <path d="M135,79 Q70,95 60,140" fill="none" stroke="#94a3b8" strokeWidth="5" strokeDasharray="4 3" />
              <path d="M165,79 Q200,95 190,115" fill="none" stroke="#0284c7" strokeWidth="7" />
              <rect x="170" y="115" width="40" height="24" rx="6" fill="#10b981" stroke="#059669" strokeWidth="2" />
              <text x="190" y="131" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">阀门 2</text>
              <path d="M190,139 L150,165" fill="none" stroke="#0284c7" strokeWidth="7" strokeLinecap="round" />
              <path d="M210,139 Q245,150 240,165" fill="none" stroke="#94a3b8" strokeWidth="5" strokeDasharray="4 3" />
              <g transform="translate(35, 145)">
                <rect width="50" height="42" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                <text x="25" y="24" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="900">水池 A</text>
              </g>
              <g transform="translate(125, 155)">
                <rect width="55" height="46" rx="10" fill="#0284c7" stroke="#0369a1" strokeWidth="3" />
                <circle cx="27" cy="20" r="10" fill="#38bdf8" />
                <text x="27" y="24" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">水池 B</text>
                <text x="27" y="38" textAnchor="middle" fill="#e0f2fe" fontSize="8">★ 主水池</text>
              </g>
              <g transform="translate(215, 145)">
                <rect width="50" height="42" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                <text x="25" y="24" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="900">水池 C</text>
              </g>
            </svg>
          </div>
          <span className="text-[11px] font-bold text-[#059669] mt-2 flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#10b981]" /> 提示：追踪蓝色连通管道的走向
          </span>
        </div>
      );

    case 'drone-grid':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#e0e7ff] text-[#3730a3] px-3 py-1 rounded-full text-xs font-black border border-[#c7d2fe]">
            <Compass className="w-3.5 h-3.5" />
            <span>无人机网格启发式寻路 (2023 Bebras)</span>
          </div>
          <div className="w-full bg-white rounded-2xl p-3 border-2 border-[#c7d2fe] shadow-sm flex flex-col items-center">
            <div className="grid grid-cols-4 gap-1.5 p-2 bg-[#f1f5f9] rounded-xl border border-gray-300 w-full">
              <div className="h-10 bg-indigo-600 rounded flex items-center justify-center text-white text-xs font-black shadow-xs">🚁 起点</div>
              <div className="h-10 bg-indigo-100 rounded flex items-center justify-center text-indigo-700 text-xs font-bold">➔</div>
              <div className="h-10 bg-red-100 rounded flex items-center justify-center text-red-700 text-xs font-bold">❌ 障碍</div>
              <div className="h-10 bg-white rounded flex items-center justify-center text-gray-400 text-xs">空地</div>
              <div className="h-10 bg-white rounded flex items-center justify-center text-gray-400 text-xs">空地</div>
              <div className="h-10 bg-indigo-100 rounded flex items-center justify-center text-indigo-700 text-xs font-bold">⬇️</div>
              <div className="h-10 bg-indigo-100 rounded flex items-center justify-center text-indigo-700 text-xs font-bold">➔</div>
              <div className="h-10 bg-emerald-500 rounded flex items-center justify-center text-white text-xs font-black shadow-sm animate-pulse">🎯 充电桩</div>
            </div>
            <div className="mt-2 text-center text-xs font-bold text-indigo-800 bg-indigo-50 py-1 px-3 rounded-lg w-full">
              曼哈顿最优距离：绕过障碍物最少耗电 4 步到达
            </div>
          </div>
        </div>
      );

    case 'conveyor-stack':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-full text-xs font-black border border-[#fde68a]">
            <Layers className="w-3.5 h-3.5" />
            <span>传送带与栈式暂存区 (2023 Bebras)</span>
          </div>
          <div className="w-full bg-white rounded-2xl p-3 border-2 border-[#fed7aa] shadow-sm flex flex-col items-center">
            <svg viewBox="0 0 280 120" className="w-full h-auto">
              <line x1="20" y1="30" x2="260" y2="30" stroke="#64748b" strokeWidth="4" />
              <rect x="30" y="15" width="25" height="15" fill="#3b82f6" rx="2" />
              <text x="42" y="26" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">包裹1</text>
              <rect x="70" y="15" width="25" height="15" fill="#10b981" rx="2" />
              <text x="82" y="26" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">包裹2</text>
              <path d="M 120,30 L 120,90 L 160,90 L 160,30" fill="none" stroke="#ea580c" strokeWidth="3" />
              <rect x="125" y="70" width="30" height="16" fill="#f59e0b" rx="2" />
              <text x="140" y="82" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">底层 1</text>
              <rect x="125" y="50" width="30" height="16" fill="#ef4444" rx="2" />
              <text x="140" y="62" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">顶层 2★</text>
              <text x="140" y="110" textAnchor="middle" fill="#c2410c" fontSize="9" fontWeight="bold">栈式暂存区 (后进先出)</text>
            </svg>
            <div className="mt-1 text-center text-xs font-bold text-amber-900 bg-amber-50 py-1 px-3 rounded-lg w-full">
              后推入暂存区的包裹会最先被取出
            </div>
          </div>
        </div>
      );

    case 'qr-mask':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#f1f5f9] text-[#334155] px-3 py-1 rounded-full text-xs font-black border border-[#cbd5e1]">
            <Hash className="w-3.5 h-3.5" />
            <span>QR 码掩模异或运算 (2025 Bebras)</span>
          </div>
          <div className="w-full bg-white rounded-2xl p-4 border-2 border-gray-300 shadow-sm flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 w-full">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500 font-bold mb-1">原图模块</span>
                <div className="w-12 h-12 bg-black rounded-lg border-2 border-gray-800 flex items-center justify-center text-white text-xs font-black">⬛ 1</div>
              </div>
              <span className="text-lg font-black text-sky-600">⊕ XOR</span>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500 font-bold mb-1">掩模黑格</span>
                <div className="w-12 h-12 bg-black rounded-lg border-2 border-gray-800 flex items-center justify-center text-white text-xs font-black">⬛ 1</div>
              </div>
              <span className="text-lg font-black text-emerald-600">➔</span>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-emerald-700 font-black mb-1">最终输出</span>
                <div className="w-12 h-12 bg-white rounded-lg border-2 border-emerald-500 shadow-md flex items-center justify-center text-gray-900 text-xs font-black animate-pulse">⬜ 0 (白)</div>
              </div>
            </div>
            <div className="mt-3 bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold w-full text-center">
              异或法则：1 ⊕ 1 = 0 (黑黑翻转为白，消除大片色块)
            </div>
          </div>
        </div>
      );

    case 'logic-gates':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#e0f2fe] text-[#0369a1] px-3 py-1 rounded-full text-xs font-black border border-[#bae6fd]">
            <Zap className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>布尔逻辑门电路 (Logic Gates)</span>
          </div>
          <div className="w-full bg-[#0f172a] p-4 rounded-2xl border-2 border-gray-700 shadow-sm flex flex-col items-center text-white">
            <svg viewBox="0 0 260 110" className="w-full h-auto">
              <line x1="20" y1="35" x2="80" y2="35" stroke="#38bdf8" strokeWidth="3" />
              <text x="15" y="30" fill="#38bdf8" fontSize="10" fontWeight="bold">A (输入)</text>
              <line x1="20" y1="75" x2="80" y2="75" stroke="#38bdf8" strokeWidth="3" />
              <text x="15" y="90" fill="#38bdf8" fontSize="10" fontWeight="bold">B (输入)</text>
              <path d="M 80,20 L 120,20 Q 150,55 120,90 L 80,90 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="105" y="60" textAnchor="middle" fill="#facc15" fontSize="12" fontWeight="black">OR / 或</text>
              <line x1="135" y1="55" x2="200" y2="55" stroke="#4ade80" strokeWidth="3" />
              <circle cx="215" cy="55" r="14" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
              <text x="215" y="59" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">灯亮</text>
            </svg>
            <div className="mt-1 text-center text-xs font-bold text-sky-300 bg-slate-800 py-1.5 px-3 rounded-lg w-full border border-slate-700">
              或门特性：只要输入 A 或 B 中至少有一个为 1，输出即为 1
            </div>
          </div>
        </div>
      );

    case 'timeline-schedule':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-full text-xs font-black border border-[#fde68a]">
            <Clock className="w-3.5 h-3.5 text-[#d97706]" />
            <span>周期公倍数与任务对齐 (LCM)</span>
          </div>
          <div className="w-full bg-white rounded-2xl p-4 border-2 border-[#fde68a] shadow-sm flex flex-col items-center">
            <div className="w-full flex flex-col gap-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-14 text-gray-500 font-bold font-sans">3h周期:</span>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">3h</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">6h</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">9h</span>
                  <span className="px-2 py-0.5 bg-emerald-500 text-white rounded font-black shadow-xs">12h★</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-14 text-gray-500 font-bold font-sans">4h周期:</span>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">4h</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">8h</span>
                  <span className="px-2 py-0.5 bg-emerald-500 text-white rounded font-black shadow-xs">12h★</span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded">16h</span>
                </div>
              </div>
            </div>
            <div className="mt-3 bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-lg text-xs font-bold w-full text-center border border-emerald-200">
              重合周期 = LCM(3, 4) = 12 小时后再次同时发生
            </div>
          </div>
        </div>
      );

    case 'decision-tree':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#ecfdf5] text-[#065f46] px-3 py-1 rounded-full text-xs font-black border border-[#a7f3d0]">
            <FolderTree className="w-3.5 h-3.5" />
            <span>语法解析树与层级语义拆解 (AST)</span>
          </div>
          <div className="w-full bg-white rounded-2xl p-3 border-2 border-[#a7f3d0] shadow-sm flex flex-col items-center">
            <svg viewBox="0 0 280 120" className="w-full h-auto">
              <rect x="90" y="10" width="100" height="22" rx="6" fill="#047857" />
              <text x="140" y="24" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">【指令：打开客厅台灯】</text>
              <line x1="120" y1="32" x2="60" y2="60" stroke="#10b981" strokeWidth="2" />
              <line x1="160" y1="32" x2="200" y2="60" stroke="#10b981" strokeWidth="2" />
              <rect x="30" y="60" width="60" height="20" rx="5" fill="#10b981" />
              <text x="60" y="74" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">动作: 打开</text>
              <rect x="170" y="60" width="80" height="20" rx="5" fill="#0284c7" />
              <text x="210" y="74" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">目标: 客厅台灯</text>
              <line x1="200" y1="80" x2="175" y2="98" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="220" y1="80" x2="245" y2="98" stroke="#0284c7" strokeWidth="1.5" />
              <text x="175" y="110" textAnchor="middle" fill="#64748b" fontSize="8">地点:客厅</text>
              <text x="245" y="110" textAnchor="middle" fill="#64748b" fontSize="8">对象:台灯</text>
            </svg>
            <div className="mt-1 text-center text-xs font-bold text-emerald-800 bg-emerald-50 py-1 px-3 rounded-lg w-full">
              将连续语言按照主谓宾、属性修饰分解为语法树
            </div>
          </div>
        </div>
      );

    case 'gear-mesh':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#fff7ed] text-[#c2410c] px-3 py-1 rounded-full text-xs font-black border border-[#ffedd5]">
            <RotateCw className="w-3.5 h-3.5" />
            <span>齿轮啮合转向反转规律</span>
          </div>
          <div className="w-full bg-white rounded-2xl p-4 border-2 border-[#fed7aa] shadow-sm flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-orange-100 border-4 border-dashed border-orange-500 flex items-center justify-center text-orange-700 font-black text-sm">
                  齿轮 A ↻
                </div>
                <span className="text-[10px] text-orange-800 font-bold mt-1">顺时针 (CW)</span>
              </div>
              <span className="text-gray-400 font-bold">➔</span>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-sky-100 border-4 border-dashed border-sky-500 flex items-center justify-center text-sky-700 font-black text-sm">
                  齿轮 B ↺
                </div>
                <span className="text-[10px] text-sky-800 font-bold mt-1">逆时针 (CCW)</span>
              </div>
              <span className="text-gray-400 font-bold">➔</span>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border-4 border-dashed border-emerald-500 flex items-center justify-center text-emerald-700 font-black text-sm animate-spin">
                  齿轮 C ↻
                </div>
                <span className="text-[10px] text-emerald-800 font-black mt-1">顺时针★</span>
              </div>
            </div>
            <div className="mt-2 bg-orange-50 text-orange-900 px-3 py-1.5 rounded-lg text-xs font-bold w-full text-center border border-orange-200">
              啮合规律：每相邻一级啮合齿轮转向相反
            </div>
          </div>
        </div>
      );

    case 'pixel-matrix':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#f3e8ff] text-[#6b21a8] px-3 py-1 rounded-full text-xs font-black border border-[#e9d5ff]">
            <Layers className="w-3.5 h-3.5" />
            <span>4×4 黑白点阵图像与行程编码</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#e9d5ff] shadow-sm flex flex-col items-center w-full">
            <div className="grid grid-cols-4 gap-1.5 p-2 bg-[#1e293b] rounded-xl border-2 border-[#0f172a]">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-[10px] font-black text-gray-400">白</div>
              <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center text-[10px] font-black text-gray-500">黑</div>
              <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center text-[10px] font-black text-gray-500">黑</div>
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-[10px] font-black text-gray-400">白</div>
              <div className="w-10 h-10 bg-black rounded-md"></div>
              <div className="w-10 h-10 bg-white rounded-md"></div>
              <div className="w-10 h-10 bg-white rounded-md"></div>
              <div className="w-10 h-10 bg-black rounded-md"></div>
              <div className="w-10 h-10 bg-black rounded-md"></div>
              <div className="w-10 h-10 bg-white rounded-md"></div>
              <div className="w-10 h-10 bg-white rounded-md"></div>
              <div className="w-10 h-10 bg-black rounded-md"></div>
              <div className="w-10 h-10 bg-white rounded-md"></div>
              <div className="w-10 h-10 bg-black rounded-md"></div>
              <div className="w-10 h-10 bg-black rounded-md"></div>
              <div className="w-10 h-10 bg-white rounded-md"></div>
            </div>
            <div className="mt-3 text-center text-xs font-bold text-[#6b21a8] bg-[#faf5ff] py-1 px-3 rounded-lg border border-[#f3e8ff]">
              🔍 仔细观察第 1 行的黑白像素排列
            </div>
          </div>
        </div>
      );

    case 'robot-maze':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#e0e7ff] text-[#3730a3] px-3 py-1 rounded-full text-xs font-black border border-[#c7d2fe]">
            <Compass className="w-3.5 h-3.5" />
            <span>坐标网格与机器小车路径</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#c7d2fe] shadow-sm flex flex-col items-center w-full">
            <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#f8fafc] rounded-xl border border-gray-200">
              <div className="w-16 h-14 bg-[#ecfdf5] rounded-lg border border-[#a7f3d0] flex flex-col items-center justify-center text-xs font-bold text-gray-700">
                <span>🌵</span>
                <span className="text-[9px] text-gray-400">(0,2)</span>
              </div>
              <div className="w-16 h-14 bg-[#fef9c3] rounded-lg border-2 border-[#facc15] flex flex-col items-center justify-center text-xs font-black text-[#854d0e] animate-bounce">
                <span>⭐ 能量站</span>
                <span className="text-[9px] text-[#ca8a04]">(1,2)</span>
              </div>
              <div className="w-16 h-14 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">(2,2)</div>
              <div className="w-16 h-14 bg-blue-50 rounded-lg border border-blue-200 flex flex-col items-center justify-center text-xs font-bold text-blue-600">
                <span>↑ 途径</span>
                <span className="text-[9px] text-blue-400">(0,1)</span>
              </div>
              <div className="w-16 h-14 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">(1,1)</div>
              <div className="w-16 h-14 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">(2,1)</div>
              <div className="w-16 h-14 bg-[#07C160] rounded-lg border-2 border-[#006d33] flex flex-col items-center justify-center text-xs font-black text-white shadow-sm">
                <span>🤖 起点↑</span>
                <span className="text-[9px] text-[#dcfce7]">(0,0)</span>
              </div>
              <div className="w-16 h-14 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-[10px] text-gray-400">(1,0)</div>
              <div className="w-16 h-14 bg-blue-100 rounded-lg border border-blue-300 flex flex-col items-center justify-center text-xs font-bold text-blue-800">
                <span>🌊 水潭</span>
                <span className="text-[9px] text-blue-500">(2,0)</span>
              </div>
            </div>
            <div className="mt-2 text-center text-xs font-bold text-blue-700 bg-blue-50 py-1 px-3 rounded-lg w-full border border-blue-100">
              指令：前进2步 ➔ 右转90° ➔ 前进1步
            </div>
          </div>
        </div>
      );

    case 'sorting-scale':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-full text-xs font-black border border-[#fde68a]">
            <Cpu className="w-3.5 h-3.5" />
            <span>天平平衡代数关系图</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border-2 border-[#fde68a] shadow-sm flex flex-col items-center w-full">
            <svg viewBox="0 0 280 140" className="w-full h-auto">
              <line x1="40" y1="60" x2="240" y2="60" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
              <polygon points="140,60 125,105 155,105" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
              <line x1="100" y1="105" x2="180" y2="105" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
              <line x1="60" y1="60" x2="60" y2="85" stroke="#94a3b8" strokeWidth="2" />
              <rect x="30" y="85" width="60" height="6" rx="3" fill="#64748b" />
              <rect x="36" y="63" width="20" height="20" rx="4" fill="#10b981" stroke="#059669" strokeWidth="2" />
              <text x="46" y="77" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">🟩</text>
              <circle cx="72" cy="73" r="10" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
              <text x="72" y="77" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">🔴</text>
              <line x1="220" y1="60" x2="220" y2="85" stroke="#94a3b8" strokeWidth="2" />
              <rect x="190" y="85" width="60" height="6" rx="3" fill="#64748b" />
              <circle cx="198" cy="73" r="8" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
              <circle cx="218" cy="73" r="8" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
              <circle cx="238" cy="73" r="8" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            </svg>
            <div className="mt-2 text-center text-xs font-bold text-[#b45309] bg-[#fffbeb] py-1 px-3 rounded-lg border border-[#fef3c7] w-full">
              平衡关系：【 1个 🟩 + 1个 🔴 】 = 【 3个 🔴 】
            </div>
          </div>
        </div>
      );

    case 'network-graph':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#e0f2fe] text-[#0369a1] px-3 py-1 rounded-full text-xs font-black border border-[#bae6fd]">
            <Network className="w-3.5 h-3.5" />
            <span>网络节点与连通拓扑</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#bae6fd] shadow-sm flex flex-col items-center w-full">
            <svg viewBox="0 0 260 140" className="w-full h-auto">
              <line x1="50" y1="40" x2="130" y2="30" stroke="#0284c7" strokeWidth="3" strokeDasharray="2 2" />
              <text x="90" y="28" fill="#0284c7" fontSize="9" fontWeight="bold">2米</text>
              <line x1="130" y1="30" x2="210" y2="50" stroke="#0284c7" strokeWidth="3" strokeDasharray="2 2" />
              <text x="170" y="36" fill="#0284c7" fontSize="9" fontWeight="bold">3米</text>
              <line x1="50" y1="40" x2="110" y2="110" stroke="#0284c7" strokeWidth="3" strokeDasharray="2 2" />
              <text x="70" y="80" fill="#0284c7" fontSize="9" fontWeight="bold">4米</text>
              <line x1="130" y1="30" x2="110" y2="110" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
              <text x="125" y="75" fill="#94a3b8" fontSize="8">6米</text>
              <circle cx="50" cy="40" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <text x="50" y="44" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">木屋1</text>
              <circle cx="130" cy="30" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <text x="130" y="34" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">木屋2</text>
              <circle cx="210" cy="50" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <text x="210" y="54" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">木屋3</text>
              <circle cx="110" cy="110" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <text x="110" y="114" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">木屋4</text>
            </svg>
            <div className="mt-2 text-center text-xs font-bold text-[#0369a1] bg-[#f0f9ff] py-1 px-3 rounded-lg w-full border border-[#e0f2fe]">
              最少线缆：优先选用 2米 + 3米 + 4米 即可全连通
            </div>
          </div>
        </div>
      );

    case 'pattern-sequence':
    case 'beaver-bracelet':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-full text-xs font-black border border-[#fde68a]">
            <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
            <span>周期规律与符号序列</span>
          </div>
          <div className="w-full bg-white rounded-2xl p-4 border-2 border-[#fed7aa] shadow-sm flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 py-3 flex-wrap">
              <div className="w-9 h-9 rounded-full bg-[#ef4444] border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-black">🔴</div>
              <div className="w-9 h-9 rounded-full bg-[#f59e0b] border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-black">🟡</div>
              <div className="w-9 h-9 rounded-full bg-[#3b82f6] border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-black">🔵</div>
              <div className="w-9 h-9 rounded-full bg-[#ef4444] border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-black">🔴</div>
              <div className="w-9 h-9 rounded-full bg-[#f59e0b] border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-black">🟡</div>
              <div className="w-9 h-9 rounded-full bg-[#3b82f6] border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-black">🔵</div>
              <div className="w-10 h-10 rounded-full bg-[#10b981] border-2 border-dashed border-[#059669] shadow-md flex items-center justify-center text-white text-base font-black animate-pulse">❓</div>
            </div>
            <div className="mt-2 bg-[#f0fdf4] text-[#065f46] px-3 py-1.5 rounded-lg text-xs font-bold w-full text-center border border-[#bbf7d0]">
              周期规律：按固定步长循环重复出现
            </div>
          </div>
        </div>
      );

    case 'stack-queue':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#e0e7ff] text-[#3730a3] px-3 py-1 rounded-full text-xs font-black border border-[#c7d2fe]">
            <Layers className="w-3.5 h-3.5" />
            <span>栈(LIFO)与队列(FIFO)数据结构模型</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#c7d2fe] shadow-sm flex flex-col items-center w-full">
            <svg viewBox="0 0 280 130" className="w-full h-auto">
              <path d="M 30,20 L 30,110 L 110,110 L 110,20" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
              <rect x="36" y="80" width="68" height="24" rx="4" fill="#818cf8" />
              <text x="70" y="96" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">第1入[底部]</text>
              <rect x="36" y="50" width="68" height="24" rx="4" fill="#6366f1" />
              <text x="70" y="66" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">第2入</text>
              <rect x="36" y="20" width="68" height="24" rx="4" fill="#4f46e5" stroke="#fbbf24" strokeWidth="2" />
              <text x="70" y="36" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">第3入★先出</text>
              <text x="70" y="124" textAnchor="middle" fill="#4338ca" fontSize="10" fontWeight="black">栈 (后进先出)</text>
              <line x1="160" y1="35" x2="265" y2="35" stroke="#0ea5e9" strokeWidth="3" />
              <line x1="160" y1="85" x2="265" y2="85" stroke="#0ea5e9" strokeWidth="3" />
              <rect x="220" y="42" width="40" height="36" rx="6" fill="#0284c7" />
              <text x="240" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">头(出)</text>
              <rect x="170" y="42" width="40" height="36" rx="6" fill="#38bdf8" />
              <text x="190" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">尾(进)</text>
              <text x="212" y="105" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="black">队列 (先进先出)</text>
            </svg>
            <div className="mt-1 text-center text-[11px] font-bold text-indigo-700 bg-indigo-50 py-1 px-3 rounded-lg w-full">
              出栈口在顶部；队列出队在队头
            </div>
          </div>
        </div>
      );

    case 'state-machine':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#fff7ed] text-[#c2410c] px-3 py-1 rounded-full text-xs font-black border border-[#ffedd5]">
            <Zap className="w-3.5 h-3.5" />
            <span>自动机状态转移图 (FSM)</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#fed7aa] shadow-sm flex flex-col items-center w-full">
            <svg viewBox="0 0 280 110" className="w-full h-auto">
              <circle cx="50" cy="55" r="22" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.5" />
              <text x="50" y="59" textAnchor="middle" fill="#9a3412" fontSize="11" fontWeight="900">锁定 🔒</text>
              <path d="M 72,45 Q 140,20 208,45" fill="none" stroke="#ea580c" strokeWidth="2.5" />
              <text x="140" y="24" textAnchor="middle" fill="#c2410c" fontSize="9" fontWeight="bold">刷卡 ➔ 解锁</text>
              <path d="M 208,65 Q 140,90 72,65" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" />
              <text x="140" y="96" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">推杆通行 ➔ 锁定</text>
              <circle cx="230" cy="55" r="22" fill="#fdba74" stroke="#c2410c" strokeWidth="3" />
              <text x="230" y="59" textAnchor="middle" fill="#7c2d12" fontSize="11" fontWeight="900">解锁 🔓</text>
            </svg>
            <div className="mt-1 text-center text-[11px] font-bold text-orange-800 bg-orange-50 py-1 px-3 rounded-lg w-full">
              根据当前状态和输入指令决定下一个状态
            </div>
          </div>
        </div>
      );

    case 'venn-logic':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#e0f2fe] text-[#0369a1] px-3 py-1 rounded-full text-xs font-black border border-[#bae6fd]">
            <Brain className="w-3.5 h-3.5" />
            <span>韦恩图集合与逻辑交集运算</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#bae6fd] shadow-sm flex flex-col items-center w-full">
            <svg viewBox="0 0 260 120" className="w-full h-auto">
              <circle cx="95" cy="60" r="45" fill="#60a5fa" fillOpacity="0.4" stroke="#2563eb" strokeWidth="2.5" />
              <text x="65" y="64" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="900">🐶小狗(6)</text>
              <circle cx="165" cy="60" r="45" fill="#34d399" fillOpacity="0.4" stroke="#059669" strokeWidth="2.5" />
              <text x="195" y="64" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="900">🏖️海滩(5)</text>
              <text x="130" y="64" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="black">交集(3)</text>
            </svg>
            <div className="mt-1 text-center text-[11px] font-bold text-sky-800 bg-sky-50 py-1 px-3 rounded-lg w-full">
              差集计算：只带小狗 = 6 - 3 = 3 张
            </div>
          </div>
        </div>
      );

    case 'cipher-code':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#f1f5f9] text-[#334155] px-3 py-1 rounded-full text-xs font-black border border-[#cbd5e1]">
            <Cpu className="w-3.5 h-3.5" />
            <span>凯撒位移加密与解密逆映射</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#cbd5e1] shadow-sm flex flex-col items-center w-full">
            <div className="flex items-center justify-center gap-2 font-mono text-xs font-black py-2">
              <div className="flex flex-col items-center bg-gray-100 p-2 rounded-lg">
                <span className="text-gray-500 text-[10px]">原文字母</span>
                <span className="text-emerald-700 text-base">I</span>
              </div>
              <span className="text-blue-600 font-bold">➔ +2 位移 ➔</span>
              <div className="flex flex-col items-center bg-amber-50 p-2 rounded-lg border border-amber-300">
                <span className="text-amber-600 text-[10px]">密文字母</span>
                <span className="text-amber-900 text-base">K</span>
              </div>
            </div>
            <div className="mt-1 text-center text-[11px] font-bold text-slate-700 bg-slate-100 py-1 px-3 rounded-lg w-full">
              解密执行逆运算：K 往前移 2 位得到原文字母 I
            </div>
          </div>
        </div>
      );

    case 'graph-coloring':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#fdf2f8] text-[#9d174d] px-3 py-1 rounded-full text-xs font-black border border-[#fbcfe8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>地图染色与平面图四色定理</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#fbcfe8] shadow-sm flex flex-col items-center w-full">
            <svg viewBox="0 0 240 110" className="w-full h-auto">
              <polygon points="40,20 120,20 80,60" fill="#f87171" stroke="#dc2626" strokeWidth="2" />
              <text x="80" y="36" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">红区</text>
              <polygon points="120,20 200,20 160,60" fill="#60a5fa" stroke="#2563eb" strokeWidth="2" />
              <text x="160" y="36" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">蓝区</text>
              <polygon points="80,60 160,60 120,100" fill="#4ade80" stroke="#16a34a" strokeWidth="2" />
              <text x="120" y="76" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">绿区</text>
              <polygon points="160,60 220,60 190,100" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
              <text x="190" y="76" textAnchor="middle" fill="#713f12" fontSize="9" fontWeight="bold">黄区</text>
            </svg>
            <div className="mt-1 text-center text-[11px] font-bold text-pink-800 bg-pink-50 py-1 px-3 rounded-lg w-full">
              四色定理：平面地图最少只需 4 种颜色即可无冲突着色
            </div>
          </div>
        </div>
      );

    case 'barcode-scan':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#f1f5f9] text-[#334155] px-3 py-1 rounded-full text-xs font-black border border-[#cbd5e1]">
            <Zap className="w-3.5 h-3.5" />
            <span>一维条形码与二进制黑白宽度编码</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#cbd5e1] shadow-sm flex flex-col items-center w-full">
            <svg viewBox="0 0 240 70" className="w-full h-auto">
              <rect x="20" y="10" width="6" height="40" fill="#000" />
              <rect x="32" y="10" width="12" height="40" fill="#000" />
              <rect x="52" y="10" width="4" height="40" fill="#000" />
              <rect x="62" y="10" width="16" height="40" fill="#000" />
              <rect x="86" y="10" width="8" height="40" fill="#000" />
              <rect x="100" y="10" width="4" height="40" fill="#000" />
              <rect x="112" y="10" width="14" height="40" fill="#000" />
              <rect x="134" y="10" width="6" height="40" fill="#000" />
              <rect x="148" y="10" width="10" height="40" fill="#000" />
              <rect x="166" y="10" width="16" height="40" fill="#000" />
              <rect x="190" y="10" width="8" height="40" fill="#000" />
              <rect x="206" y="10" width="6" height="40" fill="#000" />
              <text x="120" y="64" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold" fontFamily="monospace">6 901234 567890</text>
            </svg>
            <div className="mt-1 text-center text-[11px] font-bold text-slate-700 bg-slate-100 py-1 px-3 rounded-lg w-full">
              不同粗细的黑条与白空对应二进制数字序列
            </div>
          </div>
        </div>
      );

    case 'hanoi-tower':
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#e0e7ff] text-[#3730a3] px-3 py-1 rounded-full text-xs font-black border border-[#c7d2fe]">
            <Layers className="w-3.5 h-3.5" />
            <span>汉诺塔与递归盘片移动模型</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#c7d2fe] shadow-sm flex flex-col items-center w-full">
            <svg viewBox="0 0 260 110" className="w-full h-auto">
              <rect x="20" y="90" width="220" height="10" rx="3" fill="#64748b" />
              <rect x="55" y="25" width="6" height="65" rx="3" fill="#94a3b8" />
              <rect x="127" y="25" width="6" height="65" rx="3" fill="#94a3b8" />
              <rect x="199" y="25" width="6" height="65" rx="3" fill="#94a3b8" />
              <rect x="30" y="74" width="56" height="14" rx="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
              <rect x="37" y="58" width="42" height="14" rx="4" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
              <rect x="44" y="42" width="28" height="14" rx="4" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
              <text x="58" y="106" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">柱 A</text>
              <text x="130" y="106" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">柱 B</text>
              <text x="202" y="106" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">柱 C</text>
            </svg>
            <div className="mt-1 text-center text-[11px] font-bold text-indigo-700 bg-indigo-50 py-1 px-3 rounded-lg w-full">
              大盘片绝不能放在小盘片之上
            </div>
          </div>
        </div>
      );

    case 'custom-svg':
      return (
        <div className="w-full max-w-[360px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-2 bg-[#e0f2fe] text-[#0369a1] px-3 py-1 rounded-full text-xs font-black border border-[#bae6fd]">
            <Brain className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>{clueBadgeText || '线索情境'} · {question?.subSkill || '计算思维'}</span>
          </div>
          <div className="w-full bg-white rounded-2xl p-4 border-2 border-[#bae6fd] shadow-sm flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-sky-100 pb-2">
              <span className="text-xs font-black text-sky-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {question?.source || 'Bebras 国际真题'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                ★ {question?.difficultyHearts || 1} 星难度
              </span>
            </div>
            <div className="bg-sky-50/60 rounded-xl p-3 border border-sky-100/80 text-left">
              <p className="text-xs font-bold text-sky-950 leading-relaxed">
                {question?.storyContext || question?.stemText}
              </p>
            </div>
            {question?.informaticsConcept && (
              <div className="bg-emerald-50/70 rounded-xl p-2.5 border border-emerald-200/80 text-left flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-black text-emerald-900">{question.informaticsConcept.title}</div>
                  <div className="text-[10px] text-emerald-700 leading-snug line-clamp-2 mt-0.5">
                    {question.informaticsConcept.coreConcept}
                  </div>
                </div>
              </div>
            )}
            <div className="text-center text-[10px] font-bold text-gray-400 bg-gray-50 py-1 rounded-lg border border-dashed border-gray-200">
              ⚡ 动态过程动画待阶段二审核后绑定上线
            </div>
          </div>
        </div>
      );

    case 'flowchart':
    default:
      return (
        <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-2 select-none">
          <div className="flex items-center gap-2 mb-3 bg-[#e8f5e9] text-[#006d33] px-3 py-1 rounded-full text-xs font-black border border-[#c8e6c9]">
            <GitBranch className="w-3.5 h-3.5" />
            <span>算法结构与决策流程</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-[#c8e6c9] shadow-sm flex flex-col items-center w-full">
            <div className="w-full flex flex-col items-center gap-2">
              <div className="bg-[#07C160] text-white px-4 py-1.5 rounded-full text-xs font-black shadow-xs">
                开始：输入目标数据
              </div>
              <div className="w-0.5 h-4 bg-gray-300"></div>
              <div className="bg-[#FFD54F] text-[#574500] px-4 py-1.5 rounded-xl text-xs font-black border border-[#f59e0b] shadow-xs">
                ◇ 分支判断：分流处理
              </div>
              <div className="w-0.5 h-4 bg-gray-300"></div>
              <div className="bg-[#4FC3F7] text-[#004f70] px-4 py-1.5 rounded-xl text-xs font-black shadow-xs">
                执行步骤：得到最终目标
              </div>
            </div>
          </div>
        </div>
      );
  }
};
