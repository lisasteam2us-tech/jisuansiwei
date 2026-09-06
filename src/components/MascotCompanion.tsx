import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Bot, Sparkles, Heart, Zap, Star, MessageCircle, HelpCircle } from 'lucide-react';

interface MascotCompanionProps {
  onOpenHelp?: () => void;
}

const MASCOT_QUOTES = [
  '准备好挑战今天的数字谜题了吗？点击营地即可出发！🚀',
  '你真棒！探险家，每天练习 5 分钟，逻辑思维大提升！🧠',
  '点击右下角的宝箱，可以领取今天的 STEAM 探索秘宝哦！🎁',
  '小智已为你充能完毕！今日探险能量满格 100% ⚡',
  '在测评中遇到难题别担心，随时呼叫小智获取启发式提示！💡',
  '听说获得 90 分以上可以点亮超稀有的璀璨钻石勋章哦！💎',
];

export const MascotCompanion: React.FC<MascotCompanionProps> = ({ onOpenHelp }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMascotClick = (e: React.MouseEvent) => {
    setIsBouncing(true);
    sounds.playSelect();
    
    // Cycle quote
    setQuoteIndex((prev) => (prev + 1) % MASCOT_QUOTES.length);

    // Spawn tiny celebration sparkles
    try {
      confetti({
        particleCount: 15,
        spread: 35,
        origin: { y: 0.4 },
        colors: ['#07C160', '#FFD54F', '#4FC3F7', '#FF80AB'],
      });
    } catch {}

    setTimeout(() => {
      setIsBouncing(false);
    }, 600);
  };

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      {/* Speech Bubble Above Mascot */}
      <div className="relative mb-3 max-w-[240px] sm:max-w-[280px] bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border-2 border-[#07C160]/40 shadow-lg text-xs sm:text-sm font-black text-[#1b1c1c] text-center leading-snug animate-float">
        <div className="flex items-center justify-center gap-1.5 text-[#006d33] mb-0.5">
          <Sparkles className="w-3.5 h-3.5 text-[#07C160] animate-pulse" />
          <span className="text-[11px] font-extrabold tracking-wider uppercase">向导小智 伴学中</span>
        </div>
        <p className="text-[#2e3b2e] font-bold text-xs">{MASCOT_QUOTES[quoteIndex]}</p>
        
        {/* Little triangle arrow at bottom of bubble */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-[#07C160]/40 rotate-45"></div>
      </div>

      {/* Mascot Cute Robot Body */}
      <div
        onClick={handleMascotClick}
        className={`relative group cursor-pointer transition-transform duration-300 ${
          isBouncing ? 'scale-110 -translate-y-2' : 'hover:scale-105'
        }`}
      >
        {/* Aura Ring Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07C160]/30 to-[#4FC3F7]/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>

        {/* Mascot Character Shell */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9] border-4 border-white shadow-xl flex flex-col items-center justify-center overflow-hidden">
          {/* Cute Explorer Hat / Headband */}
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-[#006d33] to-[#07C160] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#FFD54F] border border-white"></div>
          </div>

          {/* Cute Robot Face Screen */}
          <div className="w-16 h-12 sm:w-20 sm:h-14 bg-[#1b1c1c] rounded-2xl border-2 border-white/80 flex items-center justify-center gap-3 relative shadow-inner">
            {/* Blinking Cyan LED Eyes */}
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#4FC3F7] shadow-[0_0_8px_#4FC3F7] flex items-center justify-center animate-pulse">
              <div className="w-1 h-1 rounded-full bg-white"></div>
            </div>
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#4FC3F7] shadow-[0_0_8px_#4FC3F7] flex items-center justify-center animate-pulse">
              <div className="w-1 h-1 rounded-full bg-white"></div>
            </div>

            {/* Cute Blush Cheek Dots */}
            <div className="absolute -bottom-0.5 left-2 w-2 h-1 rounded-full bg-[#ff80ab]/60"></div>
            <div className="absolute -bottom-0.5 right-2 w-2 h-1 rounded-full bg-[#ff80ab]/60"></div>
          </div>

          {/* Bottom Chest Tag */}
          <div className="mt-1.5 flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full text-[9px] font-black text-[#006d33] border border-[#07C160]/20">
            <Zap className="w-2.5 h-2.5 text-[#f57f17] fill-[#f57f17]" />
            <span>AI向导</span>
          </div>
        </div>

        {/* Floating Interactive Badge (Click me) */}
        <div className="absolute -bottom-2 -right-2 bg-[#FFD54F] text-[#574500] text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow-md animate-bounce">
          ✨ 点我有惊喜
        </div>
      </div>
    </div>
  );
};
