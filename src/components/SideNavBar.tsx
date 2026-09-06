import React from 'react';
import { sounds } from '../utils/audio';
import {
  ListOrdered,
  BarChart3,
  Timer,
  Bot,
  LogOut,
  UserCheck,
} from 'lucide-react';

interface SideNavBarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  timeRemainingText: string;
  onOpenAssistant: () => void;
  onExit: () => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  activeTab,
  onSelectTab,
  timeRemainingText,
  onOpenAssistant,
  onExit,
}) => {
  return (
    <nav
      id="side-nav-bar"
      className="hidden md:flex flex-col fixed left-0 top-0 h-full w-20 hover:w-64 transition-all duration-300 rounded-r-[40px] z-50 overflow-hidden bg-white border-r-4 border-[#e3e2e2] shadow-xl group"
    >
      {/* Header / Avatar Area */}
      <div className="flex flex-col items-center pt-8 pb-4 border-b-4 border-[#efeded] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap px-4">
        <div className="w-16 h-16 rounded-full bg-[#fdd34d] flex items-center justify-center mb-2 overflow-hidden border-4 border-white shadow-md">
          <div className="w-full h-full bg-gradient-to-br from-[#ffe087] to-[#ebc23e] flex items-center justify-center">
            <UserCheck className="w-8 h-8 text-[#574500]" />
          </div>
        </div>
        <h2 className="font-bold text-lg text-[#1b1c1c]">小小探索者</h2>
        <p className="text-xs text-[#725b00] mt-1 bg-[#fdd34d]/40 px-3 py-1 rounded-full font-extrabold border border-[#ebc23e]/50">
          当前等级：Lv.3
        </p>
      </div>

      {/* Collapsed Avatar Icon for unexpanded state */}
      <div className="flex flex-col justify-center items-center group-hover:hidden pt-8 pb-4">
        <div className="w-12 h-12 rounded-full bg-[#fdd34d] flex items-center justify-center overflow-hidden border-3 border-white shadow-sm">
          <UserCheck className="w-6 h-6 text-[#574500]" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex-1 mt-6 space-y-3 px-2.5">
        {/* Tab 1: 任务导航 */}
        <button
          onClick={() => {
            sounds.playTap();
            onSelectTab('tasks');
          }}
          className={`w-full rounded-[24px] p-3 flex items-center cursor-pointer transition-all duration-150 font-bold border-2 ${
            activeTab === 'tasks'
              ? 'bg-[#07c160] text-white shadow-[0_4px_0_0_#006d33] -translate-y-0.5 border-[#07c160]'
              : 'text-[#3d4a3d] hover:bg-[#efeded] hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#dbdad9] border-transparent'
          }`}
          title="任务导航"
        >
          <ListOrdered className="w-6 h-6 shrink-0 text-center mx-auto group-hover:mx-0" />
          <span className="text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ml-3">
            任务导航
          </span>
        </button>

        {/* Tab 2: 探索进度 */}
        <button
          onClick={() => {
            sounds.playTap();
            onSelectTab('progress');
          }}
          className={`w-full rounded-[24px] p-3 flex items-center cursor-pointer transition-all duration-150 font-bold border-2 ${
            activeTab === 'progress'
              ? 'bg-[#07c160] text-white shadow-[0_4px_0_0_#006d33] -translate-y-0.5 border-[#07c160]'
              : 'text-[#3d4a3d] hover:bg-[#efeded] hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#dbdad9] border-transparent'
          }`}
          title="探索进度"
        >
          <BarChart3 className="w-6 h-6 shrink-0 text-center mx-auto group-hover:mx-0" />
          <span className="text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ml-3">
            探索进度
          </span>
        </button>

        {/* Tab 3: 倒计时 */}
        <button
          onClick={() => {
            sounds.playTap();
            onSelectTab('timer');
          }}
          className="w-full text-[#3d4a3d] hover:bg-[#efeded] rounded-[24px] p-3 flex items-center cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#dbdad9] transition-all duration-150 border-2 border-transparent font-bold"
          title="倒计时"
        >
          <Timer className="w-6 h-6 shrink-0 text-center mx-auto group-hover:mx-0 text-[#006d33]" />
          <span className="text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ml-3 flex-1 text-left">
            倒计时
          </span>
          <span className="text-xs text-[#ba1a1a] opacity-0 group-hover:opacity-100 font-extrabold bg-[#ffdad6] px-2 py-0.5 rounded-full border border-[#ff8a80]/30">
            {timeRemainingText}
          </span>
        </button>

        {/* Tab 4: 呼叫小智 */}
        <button
          onClick={() => {
            sounds.playRobot();
            onOpenAssistant();
          }}
          className="w-full text-[#006688] bg-[#c2e8ff]/40 hover:bg-[#c2e8ff] rounded-[24px] p-3 flex items-center cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#75d1ff] transition-all duration-150 border-2 border-[#75d1ff]/50 font-bold"
          title="呼叫小智"
        >
          <Bot className="w-6 h-6 shrink-0 text-center mx-auto group-hover:mx-0 text-[#006688]" />
          <span className="text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ml-3">
            呼叫小智
          </span>
        </button>
      </div>

      {/* Exit Button at bottom */}
      <div className="mb-6 mt-auto px-2.5">
        <button
          onClick={() => {
            sounds.playTap();
            onExit();
          }}
          className="w-full text-[#6c7b6c] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-[24px] p-3 flex items-center cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#dbdad9] transition-all duration-150 border-2 border-transparent font-bold"
          title="退出探险"
        >
          <LogOut className="w-6 h-6 shrink-0 text-center mx-auto group-hover:mx-0" />
          <span className="text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ml-3">
            退出探险
          </span>
        </button>
      </div>
    </nav>
  );
};
