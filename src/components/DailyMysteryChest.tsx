import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, X, Star, Award, Compass, Key, Lightbulb } from 'lucide-react';

const SECRET_CARDS = [
  {
    title: '计算机的秘密语言：二进制',
    icon: '💡',
    tag: '数字奥秘',
    desc: '所有的电脑和手机内部都只认识“0”和“1”，就像开关的开和关一样！',
    tip: '本次测评在 Q1 中就考到了黑白网格编码哦，找规律就能秒解！',
  },
  {
    title: '算法的超能力：分而治之',
    icon: '🧩',
    tag: '算法思维',
    desc: '遇到超大的难题别害怕！把它拆解成 3 个简单的小步骤，就能轻松解决！',
    tip: '很多编程大神都是通过画流程图来理清思路的！',
  },
  {
    title: '神奇的机器人传感器',
    icon: '🤖',
    tag: '智能硬件',
    desc: '扫地机器人和自动驾驶车通过超声波与摄像头感知周围世界，比人类眼睛还敏锐！',
    tip: '华儿街少儿探索中心 STEAM 营地有超好玩的机器人编程课程哦！',
  },
];

export const DailyMysteryChest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const handleOpenChest = () => {
    sounds.playLockSuccess();
    setCardIndex(Math.floor(Math.random() * SECRET_CARDS.length));
    setIsOpen(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD54F', '#07C160', '#4FC3F7', '#FF4081', '#7C4DFF'],
      });
    } catch {}
  };

  return (
    <>
      {/* Interactive Chest Card in Lobby */}
      <div
        onClick={handleOpenChest}
        className="group relative bg-gradient-to-br from-[#fffde7] via-[#fff9c4] to-[#ffe082] rounded-[36px] p-6 sm:p-8 border-4 border-white shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        {/* Decorative Background Glow */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#FFD54F]/40 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none"></div>

        {/* Left Info */}
        <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
          {/* Animated 3D-styled Chest Emblem */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-b from-[#FFA000] to-[#E65100] border-4 border-white shadow-lg flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-chest">
            🎁
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#FF8F00]/20 text-[#574500] px-3 py-0.5 rounded-full text-xs font-black">
              <Sparkles className="w-3.5 h-3.5 text-[#e65100] animate-pulse" />
              <span>今日探险幸运宝箱</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1b1c1c]">
              点击开启今日 STEAM 智慧宝箱
            </h3>
            <p className="text-xs sm:text-sm text-[#574500] font-bold">
              每日探索开启！免费抽取科技思维锦囊与 +50 探险经验值 🌟
            </p>
          </div>
        </div>

        {/* Right Action Pill */}
        <div className="shrink-0">
          <button className="bg-[#07C160] hover:bg-[#006d33] text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-[0_4px_0_0_#00471f] group-hover:shadow-[0_6px_0_0_#00471f] active:scale-95 transition-all flex items-center gap-2 border-2 border-white/50 cursor-pointer">
            <Key className="w-4 h-4 text-white" />
            <span>开启宝箱</span>
          </button>
        </div>
      </div>

      {/* Reward Detail Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-[36px] p-6 sm:p-8 max-w-md w-full border-4 border-[#FFD54F] shadow-2xl flex flex-col items-center text-center gap-5 relative overflow-hidden animate-in zoom-in-95">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f5f3f3] flex items-center justify-center text-[#6c7b6c] hover:text-[#1b1c1c] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Big Emblem */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#fff9c4] to-[#ffe082] border-4 border-white shadow-xl flex items-center justify-center text-5xl mt-2 animate-bounce">
              {SECRET_CARDS[cardIndex].icon}
            </div>

            {/* Title & Tag */}
            <div className="space-y-1">
              <span className="bg-[#07C160]/15 text-[#006d33] text-xs font-black px-3 py-1 rounded-full border border-[#07C160]/30">
                ✨ {SECRET_CARDS[cardIndex].tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1b1c1c] mt-1">
                {SECRET_CARDS[cardIndex].title}
              </h3>
            </div>

            {/* Content card */}
            <div className="bg-[#F9FBF9] p-4 rounded-2xl border border-[#efeded] text-left text-xs sm:text-sm text-[#3d4a3d] space-y-2.5 w-full">
              <p className="font-medium leading-relaxed">
                {SECRET_CARDS[cardIndex].desc}
              </p>
              <div className="p-3 bg-[#e8f5e9] rounded-xl border border-[#c8e6c9] flex items-start gap-2 text-xs font-bold text-[#006d33]">
                <Lightbulb className="w-4 h-4 text-[#07C160] shrink-0 mt-0.5" />
                <span>通关小贴士：{SECRET_CARDS[cardIndex].tip}</span>
              </div>
            </div>

            {/* Reward claim badge */}
            <div className="flex items-center gap-2 text-xs font-black text-[#f57f17] bg-[#fffde7] px-4 py-2 rounded-xl border border-[#ffe082]">
              <span>🌟 已获得 +50 探险经验值 & 今日知识增益！</span>
            </div>

            {/* Confirm button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#07C160] hover:bg-[#006d33] text-white py-3 rounded-full text-xs sm:text-sm font-black shadow-md active:scale-95 cursor-pointer"
            >
              太棒了，收下秘宝！
            </button>
          </div>
        </div>
      )}
    </>
  );
};
