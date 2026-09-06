import React, { useState } from 'react';
import { ViewMode } from '../types';
import { sounds } from '../utils/audio';
import { Bell, Map, Sparkles, X, CheckCircle, Volume2, VolumeX, FileText, Zap, RotateCcw } from 'lucide-react';

interface TopNavBarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onRequestReset: () => void;
  subTitle?: string;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentView,
  onNavigate,
  onRequestReset,
  subTitle,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications] = useState([
    { id: 1, title: '测评模式已就绪', desc: '支持免登录即时测评与一键导出评估报告', time: '系统' },
    { id: 2, title: '向导小智提示', desc: '四维计算思维能力雷达已对齐 2022 课标', time: '系统' },
  ]);

  const handleNav = (view: ViewMode) => {
    sounds.playTap();
    onNavigate(view);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.toggleMute();
  };

  return (
    <header
      id="top-nav-bar"
      className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b-2 border-[#efeded] shadow-[0_2px_12px_rgba(0,109,51,0.04)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Context */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => handleNav('lobby')}
            className="flex items-center gap-3 group cursor-pointer focus:outline-hidden text-left"
          >
            {/* Logo Icon */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#07C160] to-[#006d33] flex items-center justify-center text-white shadow-md shadow-[#07C160]/25 group-hover:scale-105 transition-transform shrink-0 border-2 border-white/80">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex flex-col justify-center">
              <span
                className="font-black text-lg sm:text-xl tracking-tight text-[#1b1c1c] group-hover:text-[#006d33] transition-colors leading-tight"
              >
                <span className="text-[#006d33]">华儿街</span>少儿探索中心
              </span>
              <span className="text-xs sm:text-[13px] font-extrabold text-[#006d33] tracking-[0.14em] sm:tracking-[0.18em] uppercase leading-tight mt-0.5">
                WonderKids SteamClub
              </span>
            </div>
          </button>

          {/* If in Assessment Mode, show Level Tag */}
          {currentView === 'assessment' && (
            <>
              <div className="h-6 w-[3px] bg-[#e3e2e2] hidden sm:block rounded-full"></div>
              <div className="flex items-center gap-2 bg-[#fdd34d] text-[#574500] px-3.5 sm:px-4 py-1.5 rounded-full border-2 border-[#ebc23e] shadow-[0_2px_0_0_#ebc23e] text-xs sm:text-sm font-extrabold">
                <Map className="w-4 h-4 text-[#725b00]" />
                <span>{subTitle || '当前关卡：数据编码探秘'}</span>
              </div>
            </>
          )}
        </div>

        {/* Center Desktop Navigation Tabs */}
        {currentView !== 'assessment' && (
          <nav className="hidden md:flex items-center gap-7 text-sm font-bold">
            <button
              onClick={() => handleNav('lobby')}
              className={`pb-1 pt-1 transition-colors cursor-pointer ${
                currentView === 'lobby'
                  ? 'text-[#006d33] border-b-4 border-[#07c160]'
                  : 'text-[#3d4a3d] hover:text-[#006d33]'
              }`}
            >
              测评大厅
            </button>
            <button
              onClick={() => handleNav('bank')}
              className={`pb-1 pt-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'bank'
                  ? 'text-[#006d33] border-b-4 border-[#07c160]'
                  : 'text-[#3d4a3d] hover:text-[#006d33]'
              }`}
            >
              <span>Bebras 题库</span>
              <span className="bg-[#FFD54F] text-[#574500] text-[10px] font-black px-1.5 py-0.2 rounded-full">
                HOT
              </span>
            </button>
            <button
              onClick={() => handleNav('profile')}
              className={`pb-1 pt-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'profile'
                  ? 'text-[#006d33] border-b-4 border-[#07c160]'
                  : 'text-[#3d4a3d] hover:text-[#006d33]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>测评报告</span>
            </button>
          </nav>
        )}

        {/* Right Action Tools (No Login / Direct Access Mode) */}
        <div className="flex items-center gap-3">
          {/* Quick Direct Report Shortcut when in assessment */}
          {currentView === 'assessment' && (
            <button
              onClick={() => handleNav('profile')}
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[#006d33] bg-[#07C160]/10 hover:bg-[#07C160]/20 px-3 py-1.5 rounded-full transition-colors border border-[#07C160]/30 cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>查看测评报告</span>
            </button>
          )}

          {/* Zero-Login Indicator Badge */}
          <div className="hidden lg:flex items-center gap-1 bg-[#f0fdf4] text-[#006d33] px-3 py-1.5 rounded-full text-xs font-black border border-[#bbf7d0]">
            <Zap className="w-3.5 h-3.5 text-[#07C160]" />
            <span>免登录 · 即测即出报告</span>
          </div>

          {/* Reset / New Student Button */}
          <button
            onClick={() => {
              sounds.playTap();
              onRequestReset();
            }}
            className="flex items-center gap-1.5 bg-[#fffbeb] hover:bg-[#fef3c7] text-[#92400e] border-2 border-[#fcd34d] shadow-[0_2px_0_0_#fcd34d] px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer active:translate-y-0.5"
            title="初始化全部数据 · 换下一位学员测试"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#b45309]" />
            <span className="hidden sm:inline">换人测试 / 初始化</span>
            <span className="sm:hidden">重置</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            className="w-10 h-10 rounded-full bg-[#f5f3f3] hover:bg-[#efeded] text-[#006d33] flex items-center justify-center transition-all duration-200 border-2 border-[#e3e2e2] shadow-[0_2px_0_0_#e3e2e2] active:translate-y-0.5 cursor-pointer"
            title={soundEnabled ? '音效已开启' : '音效已静音'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
          </button>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => {
                sounds.playTap();
                setShowNotifications(!showNotifications);
              }}
              className="w-10 h-10 rounded-full bg-[#f5f3f3] hover:bg-[#efeded] text-[#006d33] flex items-center justify-center transition-all duration-200 border-2 border-[#e3e2e2] shadow-[0_2px_0_0_#e3e2e2] active:translate-y-0.5 cursor-pointer relative"
              title="系统提示"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FF8A80] rounded-full ring-2 ring-white"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border-2 border-[#efeded] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#efeded]">
                  <h4 className="font-extrabold text-sm text-[#1b1c1c]">系统提示</h4>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[#6c7b6c] hover:text-[#1b1c1c] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2.5">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-[#fbf9f9] hover:bg-[#f5f3f3] transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#006d33]">{n.title}</span>
                        <span className="text-[10px] text-[#6c7b6c]">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#3d4a3d] mt-1">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
