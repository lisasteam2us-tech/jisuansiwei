import React, { useState } from 'react';
import { CampInfo, GradeLevel } from '../types';
import { CAMPS_DATA } from '../data/questions';
import { sounds } from '../utils/audio';
import { MascotCompanion } from './MascotCompanion';
import { DailyMysteryChest } from './DailyMysteryChest';
import { ChallengeSetupModal } from './ChallengeSetupModal';
import {
  Rocket,
  Search,
  Lock,
  GitFork,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Star,
  Gamepad2,
  Compass,
  Trophy,
  Flame,
  Zap,
  Users,
  BookOpen,
  Shuffle,
  Brain,
} from 'lucide-react';

interface LobbyViewProps {
  onStartCustomQuest: (config: {
    gradeLevel: GradeLevel;
    count: number;
    yearFilter: 'all' | '2023' | '2024' | '2025' | '经典';
  }) => void;
  onViewProfile: () => void;
  onOpenQuestionBank: () => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  onStartCustomQuest,
  onViewProfile,
  onOpenQuestionBank,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInitialGrade, setModalInitialGrade] = useState<GradeLevel>('3-4');

  const handleOpenSetupModal = (grade: GradeLevel = '3-4') => {
    setModalInitialGrade(grade);
    setIsModalOpen(true);
  };

  const getIcon = (iconName: CampInfo['iconName']) => {
    switch (iconName) {
      case 'search':
        return <Search className="w-10 h-10 text-[#735c00]" />;
      case 'lock':
        return <Lock className="w-10 h-10 text-[#006d33]" />;
      case 'tree':
        return <GitFork className="w-10 h-10 text-[#006688]" />;
    }
  };

  const getCampDetails = (id: GradeLevel) => {
    switch (id) {
      case '1-2':
        return {
          islandName: '🏝️ 萌新启航岛',
          stars: 1,
          tag: '🔍 启蒙发现 · 趣味感知',
          reward: '🎖️ 赠送【生活小侦探】初级勋章',
          completionRate: '98% 探险者已通关',
          badgeColor: 'bg-[#fffde7] text-[#735c00] border-[#ffe082]',
        };
      case '3-4':
        return {
          islandName: '🏕️ 编码探险林',
          stars: 2,
          tag: '🔥 热门推荐 · 首选探险',
          reward: '💎 赠送【精准破译】钻石勋章',
          completionRate: '94% 探险者已通关',
          badgeColor: 'bg-[#e8f5e9] text-[#006d33] border-[#c8e6c9]',
        };
      case '5-6':
        return {
          islandName: '🚀 算法极客港',
          stars: 3,
          tag: '👑 进阶挑战 · 荣耀殿堂',
          reward: '🏆 赠送【逻辑重构】宗师勋章',
          completionRate: '86% 探险者已通关',
          badgeColor: 'bg-[#e0f7fa] text-[#006688] border-[#b2ebf2]',
        };
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-8 sm:gap-12 select-none">
      {/* Dynamic Modal for Setup */}
      <ChallengeSetupModal
        isOpen={isModalOpen}
        initialGrade={modalInitialGrade}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(config) => {
          setIsModalOpen(false);
          onStartCustomQuest(config);
        }}
      />

      {/* Hero Interactive Game Canvas Banner */}
      <section
        id="hero-banner"
        className="relative rounded-[44px] overflow-hidden bg-white border-4 border-white p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left shadow-[0_16px_50px_rgba(0,109,51,0.09)]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0, 109, 51, 0.07) 2.5px, transparent 2.5px)',
          backgroundSize: '28px 28px',
        }}
      >
        {/* Soft Background Glowing Blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#66ff95]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#4FC3F7]/25 rounded-full blur-3xl pointer-events-none"></div>

        {/* Floating Playful Game Props in Background */}
        <div className="absolute top-6 left-10 text-2xl sm:text-3xl animate-float opacity-80 pointer-events-none">
          ⭐
        </div>
        <div className="absolute top-1/2 left-4 text-2xl sm:text-3xl animate-float-delayed opacity-70 pointer-events-none">
          🧭
        </div>
        <div className="absolute bottom-6 left-1/3 text-2xl sm:text-3xl animate-float opacity-80 pointer-events-none">
          💎
        </div>
        <div className="absolute top-10 right-1/3 text-xl sm:text-2xl animate-wiggle opacity-75 pointer-events-none">
          🎮
        </div>

        {/* Left: Main Content */}
        <div className="relative z-10 flex flex-col items-center lg:items-start gap-4 sm:gap-5 max-w-2xl">
          {/* Welcome Explorer Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#07c160]/10 text-[#006d33] text-xs sm:text-sm font-extrabold tracking-wide border-2 border-[#07c160]/30 shadow-xs">
            <span className="font-black">华儿街少儿探索中心</span>
            <span className="text-[#a5d6a7]">·</span>
            <span className="font-bold tracking-widest uppercase text-xs">
              WonderKids SteamClub
            </span>
          </div>

          {/* Big Hero Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#1b1c1c] leading-[1.18] tracking-tight">
            准备好开始你的
            <br />
            <span className="bg-gradient-to-r from-[#006d33] via-[#07C160] to-[#4FC3F7] bg-clip-text text-transparent drop-shadow-xs">
              少儿数字探险之旅
            </span>
            了吗？ 🚀
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-[#3d4a3d] font-medium leading-relaxed max-w-xl">
            与 AI 向导小智一起闯关！探索密码破译、分支算法与数据奥秘，赢取专属荣誉勋章与四维能力画像！
          </p>

          {/* CTA Buttons */}
          <div className="mt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <button
              onClick={() => {
                sounds.playTap();
                handleOpenSetupModal('3-4');
              }}
              className="group bg-gradient-to-r from-[#006d33] to-[#07C160] hover:brightness-110 active:scale-95 text-white font-black text-base sm:text-lg px-7 sm:px-10 py-4 sm:py-5 rounded-full shadow-[0_8px_0_0_#00471f] hover:shadow-[0_10px_0_0_#00471f] transition-all duration-200 flex items-center gap-3 border-4 border-white/30 cursor-pointer"
            >
              <span>立即启程闯关</span>
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform animate-pulse" />
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                onOpenQuestionBank();
              }}
              className="bg-[#FFD54F] hover:bg-[#ffca28] text-[#574500] font-black text-sm sm:text-base px-6 py-4 rounded-full border-2 border-[#ebc23e] shadow-[0_4px_0_0_#ebc23e] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-[#574500]" />
              <span>Bebras 题库中心</span>
              <span className="bg-[#574500] text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">
                140+真题
              </span>
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                onViewProfile();
              }}
              className="bg-white hover:bg-[#f5f3f3] text-[#006d33] font-black text-sm sm:text-base px-5 py-4 rounded-full border-2 border-[#07C160]/40 shadow-[0_4px_0_0_#e3e2e2] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-5 h-5 text-[#07C160]" />
              <span>查看测评报告</span>
            </button>
          </div>
        </div>

        {/* Right: Interactive Mascot Companion */}
        <div className="relative z-10 shrink-0 flex items-center justify-center pt-4 lg:pt-0">
          <MascotCompanion />
        </div>
      </section>

      {/* 2.5 Bebras Interactive Feature Highlight Banner */}
      <section className="bg-gradient-to-r from-[#eff6ff] via-[#dbeafe] to-[#e0e7ff] rounded-[32px] p-6 sm:p-7 border-4 border-[#bfdbfe] shadow-[0_8px_0_0_#93c5fd] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#3b82f6] text-white flex items-center justify-center text-2xl shadow-md shrink-0">
            🦫
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-[#1e40af]">Bebras 2023-2025 全新真题库已入驻</span>
              <span className="bg-[#fef08a] text-[#854d0e] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#fde047]">
                140+ 题库
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-800 font-bold mt-1">
              全量收录 2023-2025 年日本 Bebras 权威题目，支持年龄段定制、题目数自由选配与随机组卷！
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playTap();
            handleOpenSetupModal('3-4');
          }}
          className="w-full sm:w-auto bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3.5 rounded-full font-black text-sm shadow-[0_4px_0_0_#1d4ed8] active:translate-y-1 active:shadow-none cursor-pointer flex items-center justify-center gap-2 shrink-0 transition-all"
        >
          <Shuffle className="w-4 h-4" />
          <span>自由定制 · 随机抽题挑战</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 3. Daily Mystery Chest Interactive Section (今日幸运探险宝箱) */}
      <DailyMysteryChest />

      {/* 4. Grade Adventure Camps Selection Section (营地闯关地图) */}
      <section id="camps-section" className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#006d33] bg-[#07C160]/10 px-3 py-1 rounded-full border border-[#07C160]/20 mb-2">
              <Gamepad2 className="w-3.5 h-3.5 text-[#07C160]" />
              <span>STEAM 探险关卡营地</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1b1c1c] tracking-tight">
              选择你的闯关探险岛
            </h2>
            <p className="text-xs sm:text-sm text-[#6c7b6c] font-bold mt-1">
              点击心仪的岛屿，自定义题目数量和真题范围即可开启随机探险！
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-black text-[#6c7b6c] bg-white px-4 py-2 rounded-2xl border-2 border-[#efeded]">
            <Trophy className="w-4 h-4 text-[#f57f17]" />
            <span>通关即可解锁完整能力雷达图</span>
          </div>
        </div>

        {/* Camps Grid with Game Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CAMPS_DATA.map((camp) => {
            const isGreen = camp.colorTheme === 'green';
            const isYellow = camp.colorTheme === 'yellow';
            const isBlue = camp.colorTheme === 'blue';
            const extra = getCampDetails(camp.id);

            return (
              <div
                key={camp.id}
                onClick={() => {
                  sounds.playSelect();
                  handleOpenSetupModal(camp.id);
                }}
                className={`bg-white rounded-[36px] p-6 sm:p-8 flex flex-col gap-5 cursor-pointer group hover:-translate-y-2.5 transition-all duration-300 relative overflow-hidden border-4 shadow-sm hover:shadow-xl ${
                  isGreen
                    ? 'border-[#07C160] shadow-[#07C160]/10 ring-4 ring-[#07C160]/15'
                    : isYellow
                    ? 'border-[#efeded] hover:border-[#FFD54F]/80'
                    : 'border-[#efeded] hover:border-[#4FC3F7]/80'
                }`}
              >
                {/* Decorative Top-Right Glow */}
                <div
                  className={`absolute top-0 right-0 w-36 h-36 rounded-bl-full opacity-20 -z-10 group-hover:scale-125 transition-transform duration-500 ${
                    isGreen
                      ? 'bg-[#07C160]'
                      : isYellow
                      ? 'bg-[#FFD54F]'
                      : 'bg-[#4FC3F7]'
                  }`}
                ></div>

                {/* Top Row: Island Name & Difficulty Stars */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-[#1b1c1c] bg-[#f5f3f3] px-3 py-1 rounded-full border border-[#e3e2e2]">
                    {extra.islandName}
                  </span>

                  <div className="flex items-center gap-1 bg-[#fffde7] px-2.5 py-0.5 rounded-full border border-[#ffe082]">
                    <span className="text-[10px] font-bold text-[#8d6e63]">难度</span>
                    <div className="flex text-[#f57f17]">
                      {Array.from({ length: extra.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#f57f17]" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center: 3D-styled Camp Avatar */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-20 h-20 rounded-3xl flex items-center justify-center border-4 border-white shadow-md transition-transform group-hover:scale-110 group-hover:rotate-3 shrink-0 ${
                      isGreen
                        ? 'bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] text-[#006d33]'
                        : isYellow
                        ? 'bg-gradient-to-br from-[#fff9c4] to-[#ffe082] text-[#735c00]'
                        : 'bg-gradient-to-br from-[#e1f5fe] to-[#b3e5fc] text-[#006688]'
                    }`}
                  >
                    {getIcon(camp.iconName)}
                  </div>

                  <div className="space-y-1">
                    <div
                      className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-black border ${extra.badgeColor}`}
                    >
                      {camp.gradeText}
                    </div>
                    <h3 className="text-xl font-black text-[#1b1c1c] group-hover:text-[#006d33] transition-colors leading-tight">
                      {camp.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#3d4a3d] leading-relaxed font-medium">
                  {camp.description}
                </p>

                {/* Extra Game Perks Box */}
                <div className="bg-[#F9FBF9] p-3 rounded-2xl border border-[#efeded] text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#6c7b6c]">
                    <span>🎯 权威 Bebras 真题库</span>
                    <span className="text-[#006d33]">{extra.completionRate}</span>
                  </div>
                  <div className="text-[11px] font-black text-[#e65100] flex items-center gap-1 truncate">
                    <Sparkles className="w-3 h-3 text-[#f57f17] shrink-0" />
                    <span>{extra.reward}</span>
                  </div>
                </div>

                {/* Hover CTA Button */}
                <div className="mt-auto pt-2 flex justify-between items-center text-sm font-bold">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-black ${
                      isGreen
                        ? 'bg-[#07C160]/15 text-[#006d33]'
                        : isYellow
                        ? 'bg-[#FFD54F]/25 text-[#735c00]'
                        : 'bg-[#4FC3F7]/20 text-[#006688]'
                    }`}
                  >
                    {extra.tag}
                  </span>

                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-sm ${
                      isGreen
                        ? 'bg-[#07C160] text-white shadow-[0_3px_0_0_#00471f]'
                        : isYellow
                        ? 'bg-[#FFD54F] text-[#574500] shadow-[0_3px_0_0_#ebc23e]'
                        : 'bg-[#4FC3F7] text-[#004259] shadow-[0_3px_0_0_#39b3e6]'
                    }`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Explorer Community Milestones (少儿探索成就里程碑) */}
      <section className="bg-gradient-to-r from-[#e8f5e9] via-[#f1f8e9] to-[#e0f7fa] rounded-[36px] p-6 sm:p-8 border-4 border-white shadow-xs flex flex-wrap items-center justify-around gap-6 text-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs text-xl">
            🧒
          </div>
          <div className="text-left">
            <div className="text-xl sm:text-2xl font-black text-[#006d33]">
              3,280+
            </div>
            <div className="text-xs font-bold text-[#6c7b6c]">
              全国少儿探索者已参与
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs text-xl">
            🏅
          </div>
          <div className="text-left">
            <div className="text-xl sm:text-2xl font-black text-[#f57f17]">
              12,600+
            </div>
            <div className="text-xs font-bold text-[#6c7b6c]">
              已点亮荣誉勋章总数
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs text-xl">
            💡
          </div>
          <div className="text-left">
            <div className="text-xl sm:text-2xl font-black text-[#0288d1]">
              100%
            </div>
            <div className="text-xs font-bold text-[#6c7b6c]">
              对齐权威科技课标体系
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Info */}
      <footer className="mt-2 pt-6 pb-10 border-t-2 border-[#efeded] text-center flex flex-col items-center gap-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-sm sm:text-base font-black text-[#006d33]">
          <span>华儿街少儿探索中心</span>
          <span className="hidden sm:inline text-[#a5d6a7]">|</span>
          <span className="text-xs sm:text-sm font-extrabold tracking-[0.15em] uppercase text-[#07C160]">
            WonderKids SteamClub
          </span>
        </div>
        <p className="text-xs sm:text-sm font-bold text-[#3d4a3d] flex items-center justify-center gap-2 flex-wrap">
          <ShieldCheck className="w-5 h-5 text-[#07C160] shrink-0" />
          <span>
            测评内容全面对齐《义务教育信息科技课程标准（2022年版）》及最新少儿STEAM素养发展纲要
          </span>
        </p>
        <p className="text-xs text-[#6c7b6c]">
          为保护学生隐私，本系统采用匿名化数据采集与分析机制 · 版权所有 © 华儿街少儿探索中心 WonderKids SteamClub
        </p>
      </footer>
    </div>
  );
};


