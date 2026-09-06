import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { sounds } from '../utils/audio';
import { Bot, Volume2, Sparkles, X, Lightbulb, CheckCircle2, ChevronRight } from 'lucide-react';

interface XiaoZhiModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
}

export const XiaoZhiModal: React.FC<XiaoZhiModalProps> = ({
  isOpen,
  onClose,
  question,
}) => {
  const [hintStep, setHintStep] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Reset hint step when question changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setHintStep(1);
    }
  }, [isOpen, question.id]);

  if (!isOpen) return null;

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    sounds.speakText(text, () => setIsSpeaking(false));
  };

  const stageHints = question.stageHints || [
    { level: 1, title: '观察关键线索', content: question.hint || '仔细阅读题干并观察左侧图示标记。' },
    { level: 2, title: '排除干扰信息', content: '尝试对比各个选项的差异，寻找最符合规律的解法。' },
    { level: 3, title: '逻辑推导演算', content: question.explanation || '回顾核心原理，逐步推导正确答案。' },
  ];

  const currentHint = stageHints[hintStep - 1] || stageHints[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[36px] p-6 sm:p-8 border-4 border-[#efeded] shadow-2xl overflow-hidden flex flex-col gap-5">
        {/* Header decoration */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#4FC3F7]/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Top bar with Close Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#006688] flex items-center justify-center text-white border-2 border-white shadow-md">
              <Bot className="w-7 h-7 text-[#75d1ff]" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#1b1c1c] flex items-center gap-1.5">
                <span>向导小智</span>
                <span className="text-xs bg-[#4FC3F7]/20 text-[#006688] px-2 py-0.5 rounded-full font-bold">
                  AI 伴学
                </span>
              </h3>
              <p className="text-xs text-[#6c7b6c]">分级启发式思维脚手架</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.stopSpeaking();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-[#f5f3f3] hover:bg-[#efeded] text-[#6c7b6c] hover:text-[#1b1c1c] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Question Stem */}
        <div className="bg-[#f0f9ff] rounded-2xl p-4 border-2 border-[#b3e5fc] flex items-start gap-3">
          <button
            onClick={() => handleSpeak(question.stemText)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-transform active:scale-90 cursor-pointer ${
              isSpeaking
                ? 'bg-[#07C160] text-white border-[#006d33] animate-bounce'
                : 'bg-[#FFD54F] text-[#574500] border-[#ebc23e] hover:scale-105'
            }`}
            title="朗读题目"
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="text-xs font-bold text-[#006688] flex items-center gap-1">
              <span>语音朗读题干</span>
              {isSpeaking && <span className="text-[10px] text-[#07C160] font-black">正在朗读...</span>}
            </div>
            <p className="text-sm font-bold text-[#1b1c1c] mt-1 leading-snug">{question.stemText}</p>
          </div>
        </div>

        {/* 3-Tier Scaffold Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#f1f5f9] rounded-2xl">
          {stageHints.map((sh, idx) => (
            <button
              key={idx}
              onClick={() => {
                sounds.playSelect();
                setHintStep(idx + 1);
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                hintStep === idx + 1
                  ? 'bg-white text-[#006688] shadow-xs border border-gray-200'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              第{idx + 1}步 {sh.title}
            </button>
          ))}
        </div>

        {/* Progressive Clue content */}
        <div className="space-y-2">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F9FBF9] border-2 border-[#efeded] text-sm text-[#3d4a3d] leading-relaxed shadow-inner">
            <div className="flex items-center gap-2 font-black text-[#006688] mb-1.5">
              <Lightbulb className="w-4 h-4 text-[#f59e0b]" />
              <span>
                💡 思考阶梯 #{hintStep}：{currentHint.title}
              </span>
            </div>
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              {currentHint.content}
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-2">
          {hintStep < stageHints.length ? (
            <button
              onClick={() => {
                sounds.playSelect();
                const nextStep = hintStep + 1;
                setHintStep(nextStep);
                handleSpeak(stageHints[nextStep - 1]?.content || '');
              }}
              className="text-xs font-bold text-[#006688] hover:text-[#004d67] bg-[#c2e8ff]/50 hover:bg-[#c2e8ff] px-4 py-2 rounded-full transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>深入思考（第 {hintStep + 1} 步）</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs font-bold text-[#07C160] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>已展示全部思考线索</span>
            </span>
          )}

          <button
            onClick={() => {
              sounds.stopSpeaking();
              onClose();
            }}
            className="bg-[#07C160] hover:bg-[#006d33] text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-[0_3px_0_0_#00471f] transition-all cursor-pointer"
          >
            我明白了，去答题
          </button>
        </div>
      </div>
    </div>
  );
};
