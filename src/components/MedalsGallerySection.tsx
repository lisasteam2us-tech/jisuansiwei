import React, { useState } from 'react';
import { Medal } from '../data/medals';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Award,
  Crown,
  Zap,
  Brain,
  Cpu,
  ShieldCheck,
  Sparkles,
  Lock,
  CheckCircle2,
  X,
  Share2,
  Flame,
} from 'lucide-react';

interface MedalsGallerySectionProps {
  medals: Medal[];
  unlockedCount: number;
}

export const MedalsGallerySection: React.FC<MedalsGallerySectionProps> = ({
  medals,
  unlockedCount,
}) => {
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);

  const getMedalIcon = (iconName: string, className: string = 'w-7 h-7') => {
    switch (iconName) {
      case 'crown':
        return <Crown className={className} />;
      case 'zap':
        return <Zap className={className} />;
      case 'brain':
        return <Brain className={className} />;
      case 'cpu':
        return <Cpu className={className} />;
      case 'shield-check':
        return <ShieldCheck className={className} />;
      case 'sparkles':
        return <Sparkles className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'diamond':
        return (
          <span className="bg-[#9c27b0] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
            💎 璀璨钻石
          </span>
        );
      case 'gold':
        return (
          <span className="bg-[#f57f17] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
            🥇 荣耀黄金
          </span>
        );
      case 'silver':
        return (
          <span className="bg-[#0288d1] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
            🥈 卓越白银
          </span>
        );
      default:
        return (
          <span className="bg-[#6c7b6c] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
            🥉 先锋青铜
          </span>
        );
    }
  };

  const handleMedalClick = (medal: Medal) => {
    if (medal.unlocked) {
      sounds.playLockSuccess();
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.7 },
        });
      } catch {}
    } else {
      sounds.playSelect();
    }
    setSelectedMedal(medal);
  };

  return (
    <section
      id="honor-medals-section"
      className="bg-white rounded-[40px] p-6 sm:p-10 border-4 border-white shadow-sm flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#efeded]/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD54F]/25 flex items-center justify-center rotate-6 shrink-0 border-2 border-[#FFD54F]/50">
            <Award className="w-7 h-7 text-[#735c00] -rotate-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#1b1c1c]">
                荣誉勋章馆
              </h2>
              <span className="bg-[#07C160]/15 text-[#006d33] text-[11px] font-black px-2.5 py-0.5 rounded-full border border-[#07C160]/30 flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#07C160]" />
                已点亮 {unlockedCount}/{medals.length} 枚
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6c7b6c] font-bold mt-0.5">
              根据你在逻辑推理、解题速度与四维素养的卓越表现动态生成
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#fffde7] border border-[#ffe082] px-4 py-2 rounded-2xl text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#f57f17]" />
            <span className="font-bold text-[#574500]">
              成就达成率：<strong className="text-[#e65100]">{Math.round((unlockedCount / medals.length) * 100)}%</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Medals Grid (Responsive 2 to 3 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {medals.map((medal) => {
          return (
            <div
              key={medal.id}
              onClick={() => handleMedalClick(medal)}
              className={`group rounded-3xl p-5 sm:p-6 border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between gap-4 ${
                medal.unlocked
                  ? 'bg-white border-[#efeded] hover:border-[#FFD54F] hover:shadow-lg hover:-translate-y-1'
                  : 'bg-[#fafafa] border-[#e9e8e7] opacity-75 hover:opacity-100 hover:border-[#b0bec5]'
              }`}
            >
              {/* Top Row: Badge Level & Unlock Status */}
              <div className="flex items-center justify-between">
                {getLevelBadge(medal.level)}

                {medal.unlocked ? (
                  <span className="text-[11px] font-bold text-[#006d33] bg-[#e8f5e9] px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#c8e6c9]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#07C160]" />
                    已解锁
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-[#6c7b6c] bg-[#f5f3f3] px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#e3e2e2]">
                    <Lock className="w-3 h-3 text-[#9e9e9e]" />
                    待解锁
                  </span>
                )}
              </div>

              {/* Middle: 3D-styled Medal Emblem and Title */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-transform group-hover:scale-105 shadow-sm ${
                    medal.unlocked
                      ? `bg-gradient-to-br ${medal.gradientBg} border-white shadow-md`
                      : 'bg-[#eceff1] border-[#cfd8dc] text-[#90a4ae]'
                  }`}
                  style={{
                    color: medal.unlocked ? medal.accentColor : '#90a4ae',
                  }}
                >
                  {getMedalIcon(medal.icon, 'w-8 h-8')}
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <h3
                    className={`font-black text-base truncate transition-colors ${
                      medal.unlocked
                        ? 'text-[#1b1c1c] group-hover:text-[#006d33]'
                        : 'text-[#6c7b6c]'
                    }`}
                  >
                    {medal.name}
                  </h3>
                  <p className="text-[11px] font-bold text-[#6c7b6c] truncate">
                    {medal.rarity}
                  </p>
                </div>
              </div>

              {/* Bottom: Description & Trigger Condition */}
              <div className="bg-[#F9FBF9] p-3 rounded-2xl border border-[#efeded] text-xs space-y-1.5">
                <p className="text-[#3d4a3d] font-medium leading-relaxed line-clamp-2">
                  {medal.description}
                </p>
                <div className="pt-1.5 border-t border-[#efeded] flex items-center justify-between text-[11px] font-bold">
                  <span className="text-[#6c7b6c] truncate max-w-[170px]">
                    🎯 {medal.conditionDescription}
                  </span>
                  <span
                    className={
                      medal.unlocked ? 'text-[#006d33]' : 'text-[#888]'
                    }
                  >
                    {medal.progressText}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Medal Detail Modal */}
      {selectedMedal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-[36px] p-6 sm:p-8 max-w-md w-full border-4 border-[#efeded] shadow-2xl flex flex-col items-center text-center gap-5 relative overflow-hidden animate-in zoom-in-95">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMedal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f5f3f3] flex items-center justify-center text-[#6c7b6c] hover:text-[#1b1c1c] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Big Emblem */}
            <div className="relative mt-2">
              <div
                className={`w-28 h-28 rounded-3xl flex items-center justify-center border-4 border-white shadow-xl ${
                  selectedMedal.unlocked
                    ? `bg-gradient-to-br ${selectedMedal.gradientBg}`
                    : 'bg-[#eceff1]'
                }`}
                style={{
                  color: selectedMedal.unlocked
                    ? selectedMedal.accentColor
                    : '#90a4ae',
                }}
              >
                {getMedalIcon(selectedMedal.icon, 'w-14 h-14')}
              </div>
              {selectedMedal.unlocked && (
                <div className="absolute -bottom-2 bg-[#FFD54F] text-[#574500] px-3 py-0.5 rounded-full text-[10px] font-black border-2 border-white shadow-md">
                  ✨ 已点亮勋章
                </div>
              )}
            </div>

            {/* Medal Name & Level */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                {getLevelBadge(selectedMedal.level)}
                <span className="text-xs font-bold text-[#6c7b6c]">
                  {selectedMedal.rarity}
                </span>
              </div>
              <h3 className="text-2xl font-black text-[#1b1c1c]">
                {selectedMedal.name}
              </h3>
            </div>

            {/* Description Box */}
            <div className="bg-[#F9FBF9] p-4 rounded-2xl border border-[#efeded] text-left text-xs sm:text-sm text-[#3d4a3d] space-y-2.5 w-full">
              <p className="font-medium leading-relaxed">
                {selectedMedal.description}
              </p>

              <div className="pt-2 border-t border-[#efeded] flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#6c7b6c] font-bold">达成要求：</span>
                  <span className="font-black text-[#1b1c1c]">
                    {selectedMedal.conditionDescription}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6c7b6c] font-bold">当前状态：</span>
                  <span
                    className={`font-black ${
                      selectedMedal.unlocked
                        ? 'text-[#006d33]'
                        : 'text-[#d84315]'
                    }`}
                  >
                    {selectedMedal.unlocked
                      ? '已达成 · 表现优异'
                      : '待继续闯关提升'}
                  </span>
                </div>
                {selectedMedal.progressText && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#6c7b6c] font-bold">数据指标：</span>
                    <span className="font-extrabold text-[#006688]">
                      {selectedMedal.progressText}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 w-full pt-1">
              <button
                onClick={() => setSelectedMedal(null)}
                className="w-full bg-[#07C160] text-white py-3 rounded-full text-xs sm:text-sm font-black shadow-md hover:brightness-110 cursor-pointer"
              >
                太棒了！收入荣誉册
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
