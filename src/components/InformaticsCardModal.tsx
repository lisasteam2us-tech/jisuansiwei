import React, { useState } from 'react';
import { X, Cpu, Globe2, Lightbulb, Sparkles, Volume2, Award, CheckCircle } from 'lucide-react';
import { InformaticsConcept } from '../types';
import { sounds } from '../utils/audio';

interface InformaticsCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  concept?: InformaticsConcept;
  questionTitle?: string;
}

export const InformaticsCardModal: React.FC<InformaticsCardModalProps> = ({
  isOpen,
  onClose,
  concept,
  questionTitle = 'Bebras 计算思维核心原理',
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen || !concept) return null;

  const handleSpeak = () => {
    if (isSpeaking) {
      sounds.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `${concept.title}。${concept.coreConcept}。现实生活中的应用：${concept.realWorldApplication}`;
      sounds.speakText(textToRead, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-[36px] border-4 border-[#3b82f6] shadow-[0_16px_0_0_#1d4ed8] w-full max-w-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#eff6ff] to-[#dbeafe] px-6 py-5 border-b-3 border-[#bfdbfe] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#3b82f6] text-white flex items-center justify-center text-2xl shadow-md">
              💡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-[#1e40af]">It's Informatics!</span>
                <span className="bg-[#fef08a] text-[#854d0e] text-xs font-black px-2.5 py-0.5 rounded-full border border-[#fde047]">
                  计算机科学原理
                </span>
              </div>
              <p className="text-xs text-blue-700 font-bold mt-0.5">
                这道题目背后蕴含着怎样的科技奥秘？
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              title="语音朗读原理"
              className={`p-2.5 rounded-full border-2 transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-[#3b82f6] text-white border-[#1d4ed8] animate-pulse'
                  : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sounds.playTap();
                sounds.stopSpeaking();
                onClose();
              }}
              className="p-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-600 border-2 border-gray-200 cursor-pointer active:scale-95 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Concept Title Card */}
          <div className="p-5 rounded-2xl bg-[#eff6ff] border-2 border-[#bfdbfe] flex items-start gap-4">
            <div className="p-2 rounded-xl bg-[#3b82f6] text-white mt-0.5">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
                核心原理与算法
              </span>
              <h3 className="text-xl font-black text-[#1e3a8a] mt-0.5">
                {concept.title}
              </h3>
            </div>
          </div>

          {/* Deep Concept Explanation */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-black text-gray-800">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>为什么这体现了计算思维？</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#fafaf9] border border-gray-200 text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              {concept.coreConcept}
            </div>
          </div>

          {/* Real World Applications */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-black text-gray-800">
              <Globe2 className="w-4 h-4 text-blue-500" />
              <span>现实世界与前沿科技应用：</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#f0fdf4] border-2 border-[#bbf7d0] text-sm sm:text-base text-[#065f46] leading-relaxed font-medium flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
              <span>{concept.realWorldApplication}</span>
            </div>
          </div>

          {/* Reward Note */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fefce8] to-[#fef9c3] border-2 border-[#fef08a] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#facc15] text-[#854d0e] flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
              🎖️
            </div>
            <div className="text-xs sm:text-sm text-[#854d0e] font-bold">
              探索思维奥秘 +20 经验值！掌握计算机底层思维，你就是未来的小小架构师！
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#fafaf9] px-6 py-4 border-t-2 border-gray-200 flex justify-end">
          <button
            onClick={() => {
              sounds.playTap();
              sounds.stopSpeaking();
              onClose();
            }}
            className="bg-[#3b82f6] text-white px-7 py-2.5 rounded-full font-black text-sm shadow-[0_4px_0_0_#1d4ed8] hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>我已领悟！继续探索</span>
          </button>
        </div>
      </div>
    </div>
  );
};
