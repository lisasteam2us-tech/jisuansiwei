import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices, Sparkles, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/audio';

// 3 个核心魔法骰子：红(眼睛 1~4)、绿(手臂 1~6)、黄(犄角 0~3)
interface DiceConfig {
  id: 'eyes' | 'arms' | 'horns';
  name: string;
  colorName: string;
  bgClass: string;
  borderClass: string;
  shadowClass: string;
  feature: string;
  icon: string;
  min: number;
  max: number;
}

const DICE_CONFIGS: DiceConfig[] = [
  {
    id: 'eyes',
    name: '红骰子',
    colorName: '红色',
    bgClass: 'bg-rose-500',
    borderClass: 'border-rose-600',
    shadowClass: 'shadow-rose-200',
    feature: '眼睛',
    icon: '👀',
    min: 1,
    max: 4,
  },
  {
    id: 'arms',
    name: '绿骰子',
    colorName: '绿色',
    bgClass: 'bg-emerald-500',
    borderClass: 'border-emerald-600',
    shadowClass: 'shadow-emerald-200',
    feature: '手臂',
    icon: '💪',
    min: 1,
    max: 6,
  },
  {
    id: 'horns',
    name: '黄骰子',
    colorName: '黄色',
    bgClass: 'bg-amber-400',
    borderClass: 'border-amber-500',
    shadowClass: 'shadow-amber-200',
    feature: '犄角',
    icon: '🦄',
    min: 0,
    max: 3,
  },
];

// 3D 风格高质感纯矢量骰子面
const DicePips: React.FC<{ value: number }> = ({ value }) => {
  // 标准骰子点数坐标点
  const renderPips = () => {
    switch (value) {
      case 0:
        return <span className="text-xl font-black text-white/90">0</span>;
      case 1:
        return <circle cx="20" cy="20" r="4.5" fill="#ffffff" />;
      case 2:
        return (
          <>
            <circle cx="11" cy="11" r="3.5" fill="#ffffff" />
            <circle cx="29" cy="29" r="3.5" fill="#ffffff" />
          </>
        );
      case 3:
        return (
          <>
            <circle cx="10" cy="10" r="3.5" fill="#ffffff" />
            <circle cx="20" cy="20" r="3.5" fill="#ffffff" />
            <circle cx="30" cy="30" r="3.5" fill="#ffffff" />
          </>
        );
      case 4:
        return (
          <>
            <circle cx="11" cy="11" r="3.5" fill="#ffffff" />
            <circle cx="29" cy="11" r="3.5" fill="#ffffff" />
            <circle cx="11" cy="29" r="3.5" fill="#ffffff" />
            <circle cx="29" cy="29" r="3.5" fill="#ffffff" />
          </>
        );
      case 5:
        return (
          <>
            <circle cx="10" cy="10" r="3.2" fill="#ffffff" />
            <circle cx="30" cy="10" r="3.2" fill="#ffffff" />
            <circle cx="20" cy="20" r="3.2" fill="#ffffff" />
            <circle cx="10" cy="30" r="3.2" fill="#ffffff" />
            <circle cx="30" cy="30" r="3.2" fill="#ffffff" />
          </>
        );
      case 6:
        return (
          <>
            <circle cx="11" cy="9" r="3" fill="#ffffff" />
            <circle cx="29" cy="9" r="3" fill="#ffffff" />
            <circle cx="11" cy="20" r="3" fill="#ffffff" />
            <circle cx="29" cy="20" r="3" fill="#ffffff" />
            <circle cx="11" cy="31" r="3" fill="#ffffff" />
            <circle cx="29" cy="31" r="3" fill="#ffffff" />
          </>
        );
      default:
        return <span className="text-xl font-black text-white">{value}</span>;
    }
  };

  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      {renderPips()}
    </svg>
  );
};

// 纯矢量超级萌怪兽（根据 3 颗骰子数值实时动态渲染变身）
const CuteMorphingMonster: React.FC<{
  eyeCount: number;
  armCount: number;
  hornCount: number;
  isBouncing?: boolean;
}> = ({ eyeCount, armCount, hornCount, isBouncing }) => {
  return (
    <div className="relative w-full max-w-[280px] h-[250px] flex items-center justify-center">
      <svg viewBox="0 0 280 250" className="w-full h-full">
        {/* 1. 犄角 (0~3 个) */}
        {hornCount === 1 && (
          <motion.path
            key="horn-1"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            d="M 132 80 Q 140 30 148 80 Z"
            fill="#f59e0b"
            stroke="#b45309"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        )}
        {hornCount === 2 && (
          <g key="horn-2">
            <motion.path
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              d="M 108 85 Q 92 38 116 34 Q 128 55 124 82 Z"
              fill="#f59e0b"
              stroke="#b45309"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <motion.path
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              d="M 172 85 Q 188 38 164 34 Q 152 55 156 82 Z"
              fill="#f59e0b"
              stroke="#b45309"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </g>
        )}
        {hornCount === 3 && (
          <g key="horn-3">
            <motion.path
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              d="M 102 85 Q 86 42 110 38 Q 120 58 116 82 Z"
              fill="#f59e0b"
              stroke="#b45309"
              strokeWidth="3"
            />
            <motion.path
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              d="M 134 76 Q 140 28 146 76 Z"
              fill="#facc15"
              stroke="#b45309"
              strokeWidth="3"
            />
            <motion.path
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              d="M 178 85 Q 194 42 170 38 Q 160 58 164 82 Z"
              fill="#f59e0b"
              stroke="#b45309"
              strokeWidth="3"
            />
          </g>
        )}

        {/* 2. 手臂 (1~6 只) */}
        {/* 左侧手臂 */}
        {armCount >= 1 && (
          <motion.path
            key="arm-l-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            d="M 72 135 Q 32 120 28 135 Q 42 148 70 146"
            fill="#10b981"
            stroke="#047857"
            strokeWidth="3"
          />
        )}
        {armCount >= 3 && (
          <motion.path
            key="arm-l-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            d="M 75 110 Q 38 90 35 105 Q 48 118 78 120"
            fill="#10b981"
            stroke="#047857"
            strokeWidth="3"
          />
        )}
        {armCount >= 5 && (
          <motion.path
            key="arm-l-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            d="M 76 160 Q 38 175 42 190 Q 60 185 80 168"
            fill="#10b981"
            stroke="#047857"
            strokeWidth="3"
          />
        )}

        {/* 右侧手臂 */}
        {armCount >= 2 && (
          <motion.path
            key="arm-r-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            d="M 208 135 Q 248 120 252 135 Q 238 148 210 146"
            fill="#10b981"
            stroke="#047857"
            strokeWidth="3"
          />
        )}
        {armCount >= 4 && (
          <motion.path
            key="arm-r-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            d="M 205 110 Q 242 90 245 105 Q 232 118 202 120"
            fill="#10b981"
            stroke="#047857"
            strokeWidth="3"
          />
        )}
        {armCount >= 6 && (
          <motion.path
            key="arm-r-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            d="M 204 160 Q 242 175 238 190 Q 220 185 200 168"
            fill="#10b981"
            stroke="#047857"
            strokeWidth="3"
          />
        )}

        {/* 3. 怪兽圆滚滚身体（明亮天蓝色） */}
        <motion.g
          animate={isBouncing ? { scale: [1, 1.06, 0.96, 1] } : { y: [0, -3, 0] }}
          transition={
            isBouncing
              ? { duration: 0.4 }
              : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
          }
        >
          {/* 小短腿 */}
          <ellipse cx="110" cy="215" rx="14" ry="10" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
          <ellipse cx="170" cy="215" rx="14" ry="10" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />

          {/* 圆润躯干 */}
          <ellipse cx="140" cy="148" rx="68" ry="62" fill="#38bdf8" stroke="#0284c7" strokeWidth="3.5" />
          
          {/* 奶黄肚皮 */}
          <ellipse cx="140" cy="162" rx="44" ry="40" fill="#fef9c3" />
          
          {/* 肚皮可爱小肚脐 */}
          <circle cx="140" cy="180" r="2.5" fill="#ca8a04" opacity="0.6" />

          {/* 微笑大嘴巴 */}
          <path
            d="M 122 152 Q 140 168 158 152"
            fill="none"
            stroke="#0369a1"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* 两个小粉腮红 */}
          <circle cx="95" cy="155" r="7" fill="#fca5a5" opacity="0.8" />
          <circle cx="185" cy="155" r="7" fill="#fca5a5" opacity="0.8" />

          {/* 4. 动态眼睛 (1~4 只) */}
          {eyeCount === 1 && (
            <g key="eye-1">
              <circle cx="140" cy="120" r="16" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
              <circle cx="140" cy="120" r="6.5" fill="#e11d48" />
              <circle cx="137" cy="117" r="2.5" fill="#ffffff" />
            </g>
          )}

          {eyeCount === 2 && (
            <g key="eye-2">
              <circle cx="118" cy="122" r="13" fill="#ffffff" stroke="#e11d48" strokeWidth="2.5" />
              <circle cx="119" cy="122" r="5" fill="#e11d48" />
              <circle cx="116" cy="119" r="2" fill="#ffffff" />

              <circle cx="162" cy="122" r="13" fill="#ffffff" stroke="#e11d48" strokeWidth="2.5" />
              <circle cx="161" cy="122" r="5" fill="#e11d48" />
              <circle cx="158" cy="119" r="2" fill="#ffffff" />
            </g>
          )}

          {eyeCount === 3 && (
            <g key="eye-3">
              <circle cx="112" cy="125" r="11" fill="#ffffff" stroke="#e11d48" strokeWidth="2.5" />
              <circle cx="113" cy="125" r="4.5" fill="#e11d48" />
              <circle cx="111" cy="123" r="1.5" fill="#ffffff" />

              <circle cx="140" cy="110" r="14" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
              <circle cx="140" cy="110" r="5.5" fill="#e11d48" />
              <circle cx="138" cy="108" r="2" fill="#ffffff" />

              <circle cx="168" cy="125" r="11" fill="#ffffff" stroke="#e11d48" strokeWidth="2.5" />
              <circle cx="167" cy="125" r="4.5" fill="#e11d48" />
              <circle cx="165" cy="123" r="1.5" fill="#ffffff" />
            </g>
          )}

          {eyeCount === 4 && (
            <g key="eye-4">
              <circle cx="106" cy="126" r="9.5" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
              <circle cx="106" cy="126" r="4" fill="#e11d48" />
              <circle cx="104" cy="124" r="1.2" fill="#ffffff" />

              <circle cx="128" cy="114" r="11" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
              <circle cx="128" cy="114" r="4.5" fill="#e11d48" />
              <circle cx="126" cy="112" r="1.5" fill="#ffffff" />

              <circle cx="152" cy="114" r="11" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
              <circle cx="152" cy="114" r="4.5" fill="#e11d48" />
              <circle cx="150" cy="112" r="1.5" fill="#ffffff" />

              <circle cx="174" cy="126" r="9.5" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
              <circle cx="174" cy="126" r="4" fill="#e11d48" />
              <circle cx="172" cy="124" r="1.2" fill="#ffffff" />
            </g>
          )}
        </motion.g>
      </svg>
    </div>
  );
};

export const DiceMonsterScratchSimulation: React.FC = () => {
  // 3 个骰子的点数状态
  const [eyesVal, setEyesVal] = useState<number>(3);
  const [armsVal, setArmsVal] = useState<number>(4);
  const [hornsVal, setHornsVal] = useState<number>(2);

  // 动画状态
  const [rollingDiceId, setRollingDiceId] = useState<string | null>(null);
  const [monsterBouncing, setMonsterBouncing] = useState<boolean>(false);

  // 掷单个骰子（带有真实感滚动动画与音效）
  const rollSingleDice = (diceId: 'eyes' | 'arms' | 'horns') => {
    if (rollingDiceId) return;

    sounds.playTap();
    setRollingDiceId(diceId);

    // 快速随机翻滚 6 次营造生动的掷骰子效果
    let rollCount = 0;
    const interval = setInterval(() => {
      const targetConfig = DICE_CONFIGS.find((c) => c.id === diceId)!;
      const randVal =
        Math.floor(Math.random() * (targetConfig.max - targetConfig.min + 1)) +
        targetConfig.min;

      if (diceId === 'eyes') setEyesVal(randVal);
      if (diceId === 'arms') setArmsVal(randVal);
      if (diceId === 'horns') setHornsVal(randVal);

      rollCount++;
      if (rollCount >= 6) {
        clearInterval(interval);
        setRollingDiceId(null);
        setMonsterBouncing(true);
        sounds.playSelect();
        setTimeout(() => setMonsterBouncing(false), 500);
      }
    }, 80);
  };

  // 一键投掷全部 3 颗骰子
  const rollAllDice = () => {
    if (rollingDiceId) return;

    sounds.playTap();
    setRollingDiceId('all');

    let rollCount = 0;
    const interval = setInterval(() => {
      setEyesVal(Math.floor(Math.random() * 4) + 1); // 1~4
      setArmsVal(Math.floor(Math.random() * 6) + 1); // 1~6
      setHornsVal(Math.floor(Math.random() * 4)); // 0~3

      rollCount++;
      if (rollCount >= 8) {
        clearInterval(interval);
        setRollingDiceId(null);
        setMonsterBouncing(true);
        sounds.playVictory();
        setTimeout(() => setMonsterBouncing(false), 500);
      }
    }, 80);
  };

  const getDiceValue = (id: string) => {
    if (id === 'eyes') return eyesVal;
    if (id === 'arms') return armsVal;
    if (id === 'horns') return hornsVal;
    return 1;
  };

  return (
    <div id="dice-monster-toy-sandbox" className="w-full h-full flex flex-col justify-between p-2 select-none">
      
      {/* 1. 顶部亲切指引条（小朋友一看就懂） */}
      <div className="w-full bg-amber-50/95 border-2 border-amber-200 rounded-2xl px-4 py-2.5 mb-2 shadow-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-bounce">🎲</span>
          <div>
            <span className="text-sm font-black text-amber-950">
              点一点彩色骰子，看看小怪兽会怎么变！
            </span>
            <p className="text-xs text-amber-800 font-bold">
              红骰子变眼睛 · 绿骰子变手臂 · 黄骰子变犄角
            </p>
          </div>
        </div>

        {/* 一键投掷全部按钮 */}
        <button
          onClick={rollAllDice}
          disabled={rollingDiceId !== null}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:brightness-105 active:scale-95 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-md border border-amber-300 cursor-pointer disabled:opacity-50 transition-all shrink-0"
        >
          <Dices className="w-4 h-4" />
          <span>一起投掷 🎲</span>
        </button>
      </div>

      {/* 2. 主互动区：左边 3 个超大彩色骰子，右边变身大怪兽 */}
      <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 items-center min-h-[280px]">
        
        {/* 左侧：3 个可以独立点击投掷的立体大骰子 (5 列) */}
        <div className="md:col-span-5 flex flex-col gap-2.5 bg-slate-50/90 p-3.5 rounded-3xl border-2 border-slate-200">
          <div className="text-xs font-black text-slate-700 flex items-center justify-between">
            <span>👇 点击任意骰子单独投掷：</span>
            <span className="text-[11px] text-slate-500">点数即数量</span>
          </div>

          <div className="flex flex-col gap-2">
            {DICE_CONFIGS.map((config) => {
              const currentVal = getDiceValue(config.id);
              const isThisRolling = rollingDiceId === config.id || rollingDiceId === 'all';

              return (
                <motion.div
                  key={config.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => rollSingleDice(config.id)}
                  className={`flex items-center justify-between p-2.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-400 shadow-sm cursor-pointer transition-all ${
                    isThisRolling ? 'ring-4 ring-amber-300' : ''
                  }`}
                >
                  {/* 左侧：立体生动的骰子 */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={
                        isThisRolling
                          ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 0.9, 1] }
                          : {}
                      }
                      transition={isThisRolling ? { duration: 0.4, repeat: Infinity } : {}}
                      className={`w-12 h-12 rounded-2xl ${config.bgClass} border-2 ${config.borderClass} shadow-md flex items-center justify-center p-1.5 relative overflow-hidden`}
                    >
                      {/* 顶部微光高光 */}
                      <div className="absolute top-0 left-0 right-0 h-3 bg-white/20 rounded-t-xl pointer-events-none"></div>
                      <DicePips value={currentVal} />
                    </motion.div>

                    <div>
                      <div className="text-xs font-black text-slate-900 flex items-center gap-1">
                        <span>{config.icon}</span>
                        <span>{config.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-bold mt-0.5">
                        控制怪兽的【{config.feature}】
                      </div>
                    </div>
                  </div>

                  {/* 右侧：当前变化数量 */}
                  <div className="flex flex-col items-end pr-1">
                    <span className="text-sm font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
                      {currentVal} {config.feature === '犄角' ? '个' : '只'}
                    </span>
                    <span className="text-[10px] text-amber-600 font-bold mt-0.5">点击摇一摇</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 右侧：动态超大变形怪兽舞台 (7 列) */}
        <div className="md:col-span-7 h-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-sky-100/50 rounded-3xl border-2 border-sky-200 p-3 relative overflow-hidden">
          
          {/* 背景轻微小星星装饰 */}
          <div className="absolute top-3 left-4 text-sky-300 text-sm">✨</div>
          <div className="absolute top-4 right-6 text-sky-300 text-base">⭐</div>

          {/* 实时怪兽形象 */}
          <CuteMorphingMonster
            eyeCount={eyesVal}
            armCount={armsVal}
            hornCount={hornsVal}
            isBouncing={monsterBouncing}
          />

          {/* 底部实时状态泡泡 */}
          <div className="w-full flex items-center justify-center mt-1">
            <span className="bg-white/90 text-slate-800 font-black text-xs px-4 py-1.5 rounded-full border border-sky-300 shadow-sm flex items-center gap-1.5">
              <span>👾 当前怪兽：</span>
              <strong className="text-rose-600">{eyesVal} 只眼</strong> ·{' '}
              <strong className="text-emerald-600">{armsVal} 只手</strong> ·{' '}
              <strong className="text-amber-600">{hornsVal} 个角</strong>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
