import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { sounds } from '../../utils/audio';

// 精细矢量手绘零食道具
const PropApple: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="drop-shadow-md">
    <path d="M42 22C46 14 56 12 58 14C60 16 58 24 50 26C45 27 42 24 42 22Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M40 24C39 17 42 12 45 8" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
    <path
      d="M40 25C34 18 16 20 14 38C12 54 26 70 38 72C39.5 72.3 40.5 72.3 42 72C54 70 68 54 66 38C64 20 46 18 40 25Z"
      fill="#EF4444"
      stroke="#991B1B"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path d="M22 32C22 28 26 24 32 23" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const PropPear: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="drop-shadow-md">
    <path d="M40 18C44 10 52 9 55 11C57 13 54 21 47 22C43 23 40 20 40 18Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M38 20C37 14 39 10 42 7" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
    <path
      d="M39 20C33 20 28 28 28 36C28 44 20 50 18 58C15 69 26 73 40 73C54 73 65 69 62 58C60 50 52 44 52 36C52 28 47 20 39 20Z"
      fill="#A3E635"
      stroke="#4D7C0F"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path d="M32 30C32 26 34 24 37 23" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const PropMango: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="drop-shadow-md">
    <path d="M26 22C24 14 30 10 34 11C38 12 37 19 32 23C29 24 27 23 26 22Z" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
    <path d="M28 24C26 19 25 14 26 10" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
    <path
      d="M28 23C36 15 54 18 62 30C71 44 68 62 52 69C36 76 18 68 16 52C14 36 20 28 28 23Z"
      fill="#FBBF24"
      stroke="#B45309"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path d="M26 36C26 46 32 58 44 62" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
  </svg>
);

const PropCandy: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="drop-shadow-md">
    <path d="M28 48L12 70" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
    <circle cx="46" cy="32" r="22" fill="#FDF4FF" stroke="#A855F7" strokeWidth="3.5" />
    <path d="M46 10C58.15 10 68 19.85 68 32C68 44.15 58.15 54 46 54C33.85 54 24 44.15 24 32C24 19.85 33.85 10 46 10Z" fill="#E879F9" />
    <path d="M46 18C53.73 18 60 24.27 60 32C60 39.73 53.73 46 46 46C38.27 46 32 39.73 32 32C32 24.27 38.27 18 46 18Z" fill="#EC4899" />
    <circle cx="46" cy="32" r="6" fill="#FFFFFF" />
    <path d="M38 18C42 15 50 16 54 19" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
  </svg>
);

// 猪妈妈经典动画形象
const AnimatedMummyPig: React.FC<{ isSpeaking?: boolean; gesture?: 'talk' | 'warn' | 'smile' }> = ({
  isSpeaking = false,
  gesture = 'talk',
}) => {
  return (
    <motion.div
      animate={isSpeaking ? { y: [0, -4, 0] } : { y: 0 }}
      transition={{ repeat: isSpeaking ? Infinity : 0, duration: 0.6 }}
      className="relative flex flex-col items-center select-none"
    >
      <svg width={130} height={165} viewBox="0 0 120 150" fill="none" className="drop-shadow-lg">
        {/* 橙色长裙 */}
        <path d="M36 78 L12 136 L108 136 L84 78 Z" fill="#FB923C" stroke="#C2410C" strokeWidth="3.5" strokeLinejoin="round" />
        
        {/* 双脚 */}
        <line x1="46" y1="136" x2="46" y2="145" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="41" cy="145" rx="7" ry="3" fill="#1E293B" />
        <line x1="74" y1="136" x2="74" y2="145" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="69" cy="145" rx="7" ry="3" fill="#1E293B" />

        {/* 手臂动作 */}
        {gesture === 'warn' ? (
          // 摇手指提醒
          <motion.g animate={{ rotate: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 0.5 }}>
            <path d="M80 88 Q98 84 102 68" stroke="#F472B6" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <circle cx="102" cy="66" r="3" fill="#F472B6" />
          </motion.g>
        ) : (
          <path d="M80 88 Q96 95 106 86" stroke="#F472B6" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        )}
        <path d="M34 88 Q18 95 12 86" stroke="#F472B6" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* 猪耳朵 */}
        <ellipse cx="44" cy="22" rx="6" ry="13" fill="#FBCFE8" stroke="#F472B6" strokeWidth="3" transform="rotate(-15 44 22)" />
        <ellipse cx="58" cy="19" rx="6" ry="13" fill="#FBCFE8" stroke="#F472B6" strokeWidth="3" transform="rotate(10 58 19)" />

        {/* 头部经典形状 */}
        <path
          d="M60 32 Q98 28 106 42 Q110 56 96 60 Q82 64 64 68 Q38 68 38 48 Q38 32 60 32 Z"
          fill="#FBCFE8"
          stroke="#F472B6"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* 猪鼻孔 */}
        <ellipse cx="101" cy="44" rx="2.5" ry="4.5" fill="#DB2777" />
        <ellipse cx="107" cy="49" rx="2.5" ry="4.5" fill="#DB2777" />

        {/* 眼睛与妈妈睫毛 */}
        <circle cx="56" cy="38" r="6" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.5" />
        <circle cx="57" cy="38" r="2.8" fill="#1E293B" />
        <line x1="52" y1="30" x2="53" y2="34" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="57" y1="29" x2="57" y2="33" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="62" y1="30" x2="61" y2="34" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />

        <circle cx="70" cy="39" r="6" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.5" />
        <circle cx="71" cy="39" r="2.8" fill="#1E293B" />
        <line x1="66" y1="31" x2="67" y2="35" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="71" y1="30" x2="71" y2="34" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="76" y1="31" x2="75" y2="35" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />

        {/* 腮红 */}
        <circle cx="46" cy="53" r="9" fill="#F472B6" opacity="0.65" />

        {/* 嘴巴（随说话张合或微笑） */}
        {isSpeaking ? (
          <ellipse cx="76" cy="55" rx="6" ry="4" fill="#DB2777" />
        ) : (
          <path d="M66 54 Q76 63 85 53" fill="none" stroke="#DB2777" strokeWidth="3.5" strokeLinecap="round" />
        )}
      </svg>
      <span className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full mt-1">
        猪妈妈 Mummy Pig
      </span>
    </motion.div>
  );
};

// 小猪佩奇经典动画形象
const AnimatedPeppaPig: React.FC<{ isSpeaking?: boolean; isJumping?: boolean; mood?: 'happy' | 'thinking' | 'excited' }> = ({
  isSpeaking = false,
  isJumping = false,
  mood = 'happy',
}) => {
  return (
    <motion.div
      animate={
        isJumping
          ? { y: [-14, 0], scale: [1, 1.08, 1] }
          : isSpeaking
          ? { y: [0, -3, 0] }
          : { y: 0 }
      }
      transition={{ repeat: isJumping || isSpeaking ? Infinity : 0, duration: 0.5 }}
      className="relative flex flex-col items-center select-none"
    >
      <svg width={110} height={140} viewBox="0 0 100 130" fill="none" className="drop-shadow-lg">
        {/* 红色裙子 */}
        <path d="M30 68 L10 118 L90 118 L70 68 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" strokeLinejoin="round" />

        {/* 细脚小鞋 */}
        <line x1="38" y1="118" x2="38" y2="126" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="33" cy="126" rx="6" ry="2.5" fill="#1E293B" />
        <line x1="62" y1="118" x2="62" y2="126" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="57" cy="126" rx="6" ry="2.5" fill="#1E293B" />

        {/* 佩奇小手 */}
        <path d="M26 80 Q10 85 4 76" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M74 80 Q90 85 96 76" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* 卷曲小尾巴 */}
        <path d="M10 108 C2 108 2 98 8 98 C14 98 14 112 4 112" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* 耳朵 */}
        <ellipse cx="36" cy="18" rx="5" ry="11" fill="#FBCFE8" stroke="#F472B6" strokeWidth="2.5" transform="rotate(-15 36 18)" />
        <ellipse cx="48" cy="16" rx="5" ry="11" fill="#FBCFE8" stroke="#F472B6" strokeWidth="2.5" transform="rotate(10 48 16)" />

        {/* 佩奇圆圆粉脸 */}
        <path
          d="M48 28 Q80 24 88 36 Q94 48 80 52 Q68 55 54 57 Q28 57 28 42 Q28 28 48 28 Z"
          fill="#FBCFE8"
          stroke="#F472B6"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 猪鼻孔 */}
        <ellipse cx="84" cy="38" rx="2.5" ry="3.5" fill="#DB2777" />
        <ellipse cx="89" cy="42" rx="2.5" ry="3.5" fill="#DB2777" />

        {/* 眼睛 */}
        <circle cx="46" cy="33" r="5" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
        <circle cx="47" cy="33" r="2.2" fill="#1E293B" />
        <circle cx="58" cy="34" r="5" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
        <circle cx="59" cy="34" r="2.2" fill="#1E293B" />

        {/* 腮红 */}
        <circle cx="36" cy="45" r="7.5" fill="#F472B6" opacity="0.6" />

        {/* 嘴巴 */}
        {isSpeaking ? (
          <ellipse cx="64" cy="46" rx="5" ry="3.5" fill="#DB2777" />
        ) : (
          <path d="M54 46 Q63 54 72 45" fill="none" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
        )}
      </svg>
      <span className="text-xs font-black text-rose-900 bg-rose-100 border border-rose-300 px-2.5 py-0.5 rounded-full mt-1">
        小猪佩奇 Peppa
      </span>
    </motion.div>
  );
};

// 剧情台词动画帧定义
interface DialogueScene {
  id: number;
  speaker: 'mummy' | 'peppa';
  speakerName: string;
  mummyGesture: 'talk' | 'warn' | 'smile';
  peppaMood: 'happy' | 'thinking' | 'excited';
  dialogueText: string;
  subTip?: string;
  propElement?: React.ReactNode;
}

const DIALOGUES: DialogueScene[] = [
  {
    id: 0,
    speaker: 'mummy',
    speakerName: '猪妈妈',
    mummyGesture: 'talk',
    peppaMood: 'happy',
    dialogueText: '佩奇，未来的 5 天我们要制定一个健康的零食计划哦！',
    subTip: '💡 共有苹果 🍎、雪梨 🍐、芒果 🥭、棒棒糖 🍬 四种美味零食。',
    propElement: (
      <div className="flex items-center justify-center gap-3">
        <PropApple size={44} />
        <PropPear size={44} />
        <PropMango size={44} />
        <PropCandy size={44} />
      </div>
    ),
  },
  {
    id: 1,
    speaker: 'peppa',
    speakerName: '小猪佩奇',
    mummyGesture: 'smile',
    peppaMood: 'excited',
    dialogueText: '好耶！妈妈，那我能不能天天都吃甜甜的熟芒果和棒棒糖呢？',
    subTip: '🐷 佩奇最喜欢香甜的芒果和漂亮的棒棒糖啦！',
    propElement: (
      <div className="flex items-center justify-center gap-3 animate-bounce">
        <PropMango size={48} />
        <PropCandy size={48} />
      </div>
    ),
  },
  {
    id: 2,
    speaker: 'mummy',
    speakerName: '猪妈妈',
    mummyGesture: 'warn',
    peppaMood: 'thinking',
    dialogueText: '不行哦~ 芒果吃多会上火，第一条规则：【绝对不能连续两天吃芒果】！',
    subTip: '⚠️ 规则①：两次吃芒果必须隔开至少一天（芒果 🚫 芒果）。',
    propElement: (
      <div className="flex items-center justify-center gap-2 bg-amber-50 px-4 py-1.5 rounded-2xl border-2 border-amber-300 shadow-sm">
        <PropMango size={40} />
        <span className="text-xl font-black text-rose-500">🚫 不能连着</span>
        <PropMango size={40} />
      </div>
    ),
  },
  {
    id: 3,
    speaker: 'mummy',
    speakerName: '猪妈妈',
    mummyGesture: 'talk',
    peppaMood: 'happy',
    dialogueText: '还有第二条规则：吃了甜甜的糖果之后，第二天一定要吃【苹果】或【雪梨】解腻！',
    subTip: '🍏 规则②：糖果 🍬 ➡️ 第二天必须是苹果 🍎 或雪梨 🍐。',
    propElement: (
      <div className="flex items-center justify-center gap-2 bg-pink-50 px-4 py-1.5 rounded-2xl border-2 border-pink-300 shadow-sm">
        <PropCandy size={40} />
        <span className="text-lg font-black text-pink-600">➡️ 紧接着吃 ➡️</span>
        <div className="flex items-center gap-1">
          <PropApple size={40} />
          <span className="text-xs font-bold text-slate-500">或</span>
          <PropPear size={40} />
        </div>
      </div>
    ),
  },
  {
    id: 4,
    speaker: 'peppa',
    speakerName: '小猪佩奇',
    mummyGesture: 'smile',
    peppaMood: 'excited',
    dialogueText: '我记住啦！不能连吃两天芒果，糖果后要吃苹果或雪梨！看我来挑选！',
    subTip: '✨ 佩奇明白了！小朋友，请你根据这两条规则在右边选出正确的 5 天计划吧！',
    propElement: (
      <div className="flex items-center justify-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-2xl border-2 border-emerald-300 shadow-sm">
        <span className="text-xs font-black text-emerald-800">🌟 遵守全部规则的健康计划是哪一个呢？</span>
      </div>
    ),
  },
];

export const FruitSortingSimulation: React.FC = () => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const autoPlayTimerRef = useRef<number | null>(null);

  const scene = DIALOGUES[currentSceneIdx];

  // 自动播放剧情动画
  useEffect(() => {
    if (!isPlaying) return;

    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);

    autoPlayTimerRef.current = window.setInterval(() => {
      setCurrentSceneIdx((prev) => {
        const next = prev + 1;
        if (next >= DIALOGUES.length) {
          if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
          setIsPlaying(false);
          sounds.playVictory();
          return prev;
        }
        sounds.playTap();
        return next;
      });
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    sounds.playTap();
    if (currentSceneIdx < DIALOGUES.length - 1) {
      setCurrentSceneIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    sounds.playTap();
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx((prev) => prev - 1);
    }
  };

  const handleReplay = () => {
    sounds.playTap();
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    setCurrentSceneIdx(0);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    sounds.playTap();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div id="peppa-cartoon-animation" className="w-full h-full flex flex-col justify-between p-3 bg-white text-slate-800 font-sans select-none rounded-3xl border-2 border-pink-100 shadow-sm relative overflow-hidden">
      
      {/* 顶部白色清爽标题栏与剧集步进进度 */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-sm font-black shadow-xs">
            🎬
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
              <span>小猪佩奇的零食小剧场</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-900 border border-pink-200 font-bold">
                第 {currentSceneIdx + 1} / {DIALOGUES.length} 幕
              </span>
            </h3>
          </div>
        </div>

        {/* 动画片播放控制器 */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={currentSceneIdx === 0}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 border border-slate-200 cursor-pointer active:scale-95 transition-all shadow-2xs"
            title="上一句"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-black cursor-pointer active:scale-95 transition-all shadow-2xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>暂停</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>播放动画</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentSceneIdx === DIALOGUES.length - 1}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 border border-slate-200 cursor-pointer active:scale-95 transition-all shadow-2xs"
            title="下一句"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReplay}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer active:scale-95 transition-all shadow-2xs ml-0.5"
            title="从头重新看"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 动画片主舞台：上方大号动画片对话气泡与道具，下方角色面对面对话 */}
      <div className="w-full flex-1 flex flex-col justify-between items-center py-2 min-h-[300px]">
        
        {/* 1. 动画片大号台词对话气泡 (Speech Bubble) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSceneIdx}
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-2xl p-4 rounded-3xl border-3 shadow-sm relative flex flex-col items-center justify-center text-center ${
              scene.speaker === 'mummy'
                ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}
          >
            {/* 说话者头像标签 */}
            <div
              className={`absolute -top-3.5 px-3 py-0.5 rounded-full text-xs font-black shadow-xs flex items-center gap-1 ${
                scene.speaker === 'mummy'
                  ? 'bg-amber-500 text-white left-8'
                  : 'bg-rose-500 text-white right-8'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{scene.speakerName} 说：</span>
            </div>

            {/* 对话正文台词 */}
            <p className="text-sm sm:text-base font-black leading-relaxed mt-1">
              “{scene.dialogueText}”
            </p>

            {/* 剧情道具展示（如水果、规则连线等） */}
            {scene.propElement && (
              <div className="mt-2.5 w-full flex justify-center">
                {scene.propElement}
              </div>
            )}

            {/* 底部辅助启发提示 */}
            {scene.subTip && (
              <div className="mt-2 text-[11px] font-bold text-slate-500 opacity-90">
                {scene.subTip}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 2. 动画角色互动舞台：左边猪妈妈，右边小猪佩奇 */}
        <div className="w-full flex items-end justify-around px-4 pt-4">
          
          {/* 左侧：猪妈妈 */}
          <div className="flex flex-col items-center">
            <AnimatedMummyPig
              isSpeaking={scene.speaker === 'mummy'}
              gesture={scene.mummyGesture}
            />
          </div>

          {/* 中间动画小装饰（爱心与小花） */}
          <div className="flex flex-col items-center gap-2 mb-8 opacity-60">
            <motion.div
              animate={{ scale: [1, 1.25, 1], rotate: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="text-2xl select-none"
            >
              🌸
            </motion.div>
            <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
          </div>

          {/* 右侧：小猪佩奇 */}
          <div className="flex flex-col items-center">
            <AnimatedPeppaPig
              isSpeaking={scene.speaker === 'peppa'}
              isJumping={scene.speaker === 'peppa' && scene.peppaMood === 'excited'}
              mood={scene.peppaMood}
            />
          </div>

        </div>

      </div>

      {/* 底部剧情进度小圆点 */}
      <div className="w-full flex items-center justify-center gap-1.5 pt-1 border-t border-slate-100">
        {DIALOGUES.map((d, index) => (
          <button
            key={index}
            onClick={() => {
              sounds.playTap();
              setCurrentSceneIdx(index);
              setIsPlaying(false);
            }}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentSceneIdx === index
                ? 'w-6 bg-pink-500 shadow-xs'
                : 'w-2 bg-slate-200 hover:bg-slate-300'
            }`}
            title={`跳转到第 ${index + 1} 幕`}
          />
        ))}
      </div>

    </div>
  );
};
