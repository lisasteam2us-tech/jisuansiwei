import React, { useState, useEffect, useMemo } from 'react';
import { Question } from '../types';
import { QUESTIONS_DATA } from '../data/questions';
import { shuffleQuestionOptions } from '../utils/questionGenerator';
import { DynamicClueIllustration } from './DynamicClueIllustration';
import {
  BlockModelA,
  BlockModelB,
  BlockModelC,
  BlockModelD,
} from './illustrations/ShapeFactoryStaticIllustration';
import { BraceletIllustration } from './illustrations/BraceletBoxIllustration';
import { OptionBallsPreview } from './illustrations/RattleCycleIllustration';
import { OptionAnimalChainPreview } from './illustrations/OnlineClassWebcamIllustration';
import { OptionMonsterPreview } from './illustrations/AlienCreatureTreeIllustration';
import { OptionLogPhotoPreview } from './illustrations/PhotoLogCluesIllustration';
import { OptionBouquetPreview } from './illustrations/FlowerBouquetTreeIllustration';
import { OptionPhotoSetPreview } from './illustrations/BeaverPhotoWalkIllustration';
import { XiaoZhiModal } from './XiaoZhiModal';
import { ScratchpadModal } from './ScratchpadModal';
import { InformaticsCardModal } from './InformaticsCardModal';
import { AmbientStarfieldCanvas } from './AmbientStarfieldCanvas';
import { HyperspaceTransition } from './HyperspaceTransition';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Volume2,
  Brain,
  Bot,
  Sparkles,
  CheckCircle2,
  Edit3,
  Lightbulb,
  Zap,
  Music,
  Radio,
  Flame,
} from 'lucide-react';

interface AssessmentViewProps {
  questionsList?: Question[];
  initialIndex?: number;
  onBackToLobby: () => void;
  onFinishAssessment: (answers?: Record<number, string>, evaluatedQuestions?: Question[]) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  questionsList,
  initialIndex = 0,
  onBackToLobby,
  onFinishAssessment,
}) => {
  const activeQuestions = useMemo(() => {
    if (questionsList && questionsList.length > 0) return questionsList;
    return QUESTIONS_DATA.map(shuffleQuestionOptions);
  }, [questionsList]);

  const [currentIdx, setCurrentIdx] = useState<number>(initialIndex);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(false);
  const [showXiaoZhiModal, setShowXiaoZhiModal] = useState<boolean>(false);
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);
  const [showInformaticsCard, setShowInformaticsCard] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(765); // 12:45
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);
  const [isStoryExpanded, setIsStoryExpanded] = useState<boolean>(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState<boolean>(false);
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false);
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
  const [showUnansweredModal, setShowUnansweredModal] = useState<boolean>(false);
  const [warningToast, setWarningToast] = useState<string | null>(null);
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [comboToast, setComboToast] = useState<{ text: string; sub: string } | null>(null);
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);

  // Sync initialIndex when it changes externally
  useEffect(() => {
    if (initialIndex !== undefined && initialIndex >= 0 && initialIndex < activeQuestions.length) {
      setCurrentIdx(initialIndex);
    }
  }, [initialIndex, activeQuestions.length]);

  // Loading & Progress feedback state when calculating capability profile
  const [isCalculatingProfile, setIsCalculatingProfile] = useState<boolean>(false);
  const [calcProgress, setCalcProgress] = useState<number>(0);
  const [calcStepText, setCalcStepText] = useState<string>('正在汇总答题数据...');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const question: Question | undefined = activeQuestions[currentIdx] || activeQuestions[0];

  // Sync selectedOption and story expand when switching questions
  useEffect(() => {
    setIsStoryExpanded(false);
    if (question && userAnswers[question.id]) {
      setSelectedOption(userAnswers[question.id]);
    } else {
      setSelectedOption('');
    }
  }, [currentIdx, question?.id]);

  // Timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cleanup BGM on unmount
  useEffect(() => {
    return () => {
      sounds.stopBgm();
    };
  }, []);

  const handleToggleBgm = () => {
    sounds.playTap();
    if (isBgmActive) {
      sounds.stopBgm();
      setIsBgmActive(false);
    } else {
      sounds.startBgm();
      setIsBgmActive(true);
    }
  };

  if (!question || activeQuestions.length === 0) {
    return (
      <div className="flex-1 min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 border-3 border-emerald-200 flex items-center justify-center text-4xl mb-4 shadow-sm">
          📂
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">题库已清空（准备全新录入）</h2>
        <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
          目前题库已全部重置清空，等待全新标准的高质量计算思维与信息科技题目录入。
        </p>
        <button
          onClick={onBackToLobby}
          className="bg-[#07C160] hover:brightness-110 text-white font-black px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
        >
          返回探索大厅
        </button>
      </div>
    );
  }

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (key: string) => {
    if (isAnswerLocked) return;
    sounds.playSelect();
    setSelectedOption(key);
    setUserAnswers((prev) => ({
      ...prev,
      [question.id]: key,
    }));
  };

  const handleLockAnswer = () => {
    if (!selectedOption) {
      sounds.playRobot();
      setWarningToast('⚠️ 请先在右侧选择一个能量电芯（A/B/C/D）哦！');
      setTimeout(() => setWarningToast(null), 2000);
      return;
    }
    
    // Increment combo streak & play audio
    const newStreak = comboStreak + 1;
    setComboStreak(newStreak);
    sounds.playCombo(newStreak);
    setIsAnswerLocked(true);
    setShowAnswerFeedback(true);

    setUserAnswers((prev) => ({
      ...prev,
      [question.id]: selectedOption,
    }));

    // Trigger Game Combo Floating Badge
    let toastText = '🌟 能量已充能 +120 EXP!';
    let toastSub = '探索坐标已锁定';
    if (newStreak === 2) {
      toastText = '⚡ Combo x2! 算法敏锐!';
      toastSub = '连续推导命中能量节点';
    } else if (newStreak === 3) {
      toastText = '🚀 Combo x3! 思维超频!';
      toastSub = '计算思维正在全速运转';
    } else if (newStreak >= 4) {
      toastText = `🔥 Combo x${newStreak}! 算法架构大师!`;
      toastSub = '势不可挡的探险先锋';
    }
    setComboToast({ text: toastText, sub: toastSub });
    setTimeout(() => setComboToast(null), 1800);

    if (selectedOption === question.correctAnswer) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#07C160', '#FFD54F', '#4FC3F7', '#FF8A80'],
        });
      } catch {}
    }
  };

  const startCalculatingProfileAndNavigate = (latestAnswers?: Record<number, string>) => {
    sounds.playLockSuccess();
    setIsCalculatingProfile(true);
    setCalcProgress(12);
    setCalcStepText(`正在汇总 ${activeQuestions.length} 道关卡答题数据...`);
    setCompletedSteps([]);

    const answersToSubmit = latestAnswers || {
      ...userAnswers,
      ...(selectedOption ? { [question.id]: selectedOption } : {}),
    };

    // Step 1: Logic & Algorithm Dimension
    setTimeout(() => {
      setCalcProgress(42);
      setCalcStepText('正在评估【逻辑思维】与【算法理解】维度...');
      setCompletedSteps(['答题数据收集完毕']);
    }, 450);

    // Step 2: Data & Innovation Dimension
    setTimeout(() => {
      setCalcProgress(74);
      setCalcStepText('正在计算【数据抽象】与【数字创造】综合得分...');
      setCompletedSteps(['答题数据收集完毕', '计算思维五维能力模型构建']);
    }, 1000);

    // Step 3: Peer Norms & Piaget Cognitive Stage
    setTimeout(() => {
      setCalcProgress(96);
      setCalcStepText('正在匹配同龄人 Bebras 常模击败率与皮亚杰认知定位...');
      setCompletedSteps([
        '答题数据收集完毕',
        '计算思维五维能力模型构建',
        '同龄人击败率 (Percentile) 换算',
      ]);
      try {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#07C160', '#FFD54F', '#4FC3F7', '#FF8A80'],
        });
      } catch {}
    }, 1500);

    // Step 4: Smooth transition to ProfileView
    setTimeout(() => {
      setIsCalculatingProfile(false);
      onFinishAssessment(answersToSubmit, activeQuestions);
    }, 2100);
  };

  const handleNextTask = () => {
    setShowAnswerFeedback(false);
    setIsAnswerLocked(false);

    // Save current selection if made
    const latestAnswers = {
      ...userAnswers,
      ...(selectedOption ? { [question.id]: selectedOption } : {}),
    };
    if (selectedOption) {
      setUserAnswers(latestAnswers);
    }

    if (currentIdx < activeQuestions.length - 1) {
      // Trigger Hyperspace transition effect
      sounds.playWarp();
      setIsWarping(true);
      setTimeout(() => {
        setCurrentIdx(currentIdx + 1);
      }, 150);
    } else {
      // Must answer ALL questions to generate capability profile
      const unanswered = activeQuestions.filter((q) => !latestAnswers[q.id]);
      if (unanswered.length > 0) {
        sounds.playRobot();
        setShowUnansweredModal(true);
        return;
      }
      startCalculatingProfileAndNavigate(latestAnswers);
    }
  };

  const handlePrevTask = () => {
    setShowAnswerFeedback(false);
    setIsAnswerLocked(false);
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    } else {
      setShowExitConfirmModal(true);
    }
  };

  const handleAudioPromptClick = () => {
    if (isSpeaking) {
      sounds.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      sounds.speakText(question.stemText, () => setIsSpeaking(false));
    }
  };

  const answeredCount = Object.keys(userAnswers).length + (selectedOption && !userAnswers[question.id] ? 1 : 0);
  const currentExp = answeredCount * 120;

  return (
    <div className="w-full h-screen bg-slate-50 text-slate-900 relative select-none overflow-hidden font-sans flex flex-col justify-between">
      
      {/* 2. Hyperspace Warp Speed Level Transition */}
      <HyperspaceTransition isActive={isWarping} onComplete={() => setIsWarping(false)} />

      {/* 3. Interactive Tool Modals */}
      <XiaoZhiModal
        isOpen={showXiaoZhiModal}
        onClose={() => setShowXiaoZhiModal(false)}
        question={question}
      />

      <ScratchpadModal
        isOpen={showScratchpad}
        onClose={() => setShowScratchpad(false)}
        questionStem={question.stemText}
        taskNumber={question.taskNumber || currentIdx + 1}
      />

      <InformaticsCardModal
        isOpen={showInformaticsCard}
        onClose={() => setShowInformaticsCard(false)}
        concept={question.informaticsConcept}
        questionTitle={question.stemText}
      />

      {/* Main Holographic Cockpit Zero-Scroll Container (Full Screen Width & Height) */}
      <div className="w-full h-full flex flex-col px-3 sm:px-5 py-2.5 overflow-hidden select-none justify-between relative z-10">
        
        {/* Floating Game Combo Toast Notification */}
        {comboToast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-6 sm:px-8 py-2.5 rounded-full shadow-[0_10px_35px_rgba(245,158,11,0.6)] border-2 border-white animate-bounce flex items-center gap-3 select-none pointer-events-none">
            <Sparkles className="w-5 h-5 text-yellow-200 fill-yellow-200 animate-spin" style={{ animationDuration: '3s' }} />
            <div className="text-center">
              <div className="text-sm sm:text-base font-black tracking-wide drop-shadow-sm">{comboToast.text}</div>
              <div className="text-[11px] text-amber-100 font-bold">{comboToast.sub}</div>
            </div>
            <Flame className="w-5 h-5 text-yellow-200 animate-pulse" />
          </div>
        )}

        {/* Warning Toast Floating Notification */}
        {warningToast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-rose-600 text-white px-6 py-2.5 rounded-full shadow-[0_10px_35px_rgba(244,63,94,0.6)] border-2 border-white animate-bounce flex items-center gap-2 select-none pointer-events-none text-xs sm:text-sm font-black">
            <span>{warningToast}</span>
          </div>
        )}

        {/* Top Kid-Friendly Clean Header */}
        <div className="w-full flex items-center justify-between bg-white rounded-2xl px-4 py-2.5 border-2 border-slate-200 shadow-xs shrink-0 mb-2">
          
          {/* Left: Current Level & Simple Navigator */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                onClick={() => {
                  sounds.playTap();
                  handlePrevTask();
                }}
                disabled={currentIdx === 0}
                className="p-1.5 rounded-lg hover:bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                title="上一题"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                onClick={() => setShowProgressModal(true)}
                className="bg-amber-400 text-slate-950 px-3.5 py-1 rounded-lg font-black text-xs sm:text-sm border border-amber-300 shadow-2xs flex items-center gap-1.5 cursor-pointer hover:brightness-105 transition-all"
                title="点击查看进度"
              >
                <span>🎈 第 {currentIdx + 1} / {activeQuestions.length} 题</span>
              </div>

              <button
                onClick={() => {
                  sounds.playTap();
                  handleNextTask();
                }}
                disabled={currentIdx >= activeQuestions.length - 1}
                className="p-1.5 rounded-lg hover:bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                title="下一题"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center: Clean Topic Badge */}
          <div className="flex items-center gap-2">
            <span className="bg-sky-50 text-sky-800 px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 border border-sky-200 shadow-2xs">
              <Brain className="w-3.5 h-3.5 text-sky-600" />
              <span>{question.domain || question.dimension || '计算思维'}</span>
            </span>
            <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-xl text-xs font-black border border-amber-200">
              {'★'.repeat(question.difficultyHearts || 2)} 难度
            </span>
          </div>

          {/* Right: Simple Tools (Read aloud, Hint, Timer) */}
          <div className="flex items-center gap-2">
            {/* Question Library ID Badge (e.g. 1005, 1008) */}
            <div
              className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs text-xs font-black flex items-center gap-1.5 transition-all"
              title={`题库编号: ${question.id}`}
            >
              <span className="text-slate-500 font-bold text-[11px]">题号</span>
              <span className="font-mono text-slate-900 font-black text-xs sm:text-sm">{question.id}</span>
            </div>

            <button
              onClick={() => {
                sounds.playRobot();
                setShowXiaoZhiModal(true);
              }}
              className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-2xs cursor-pointer flex items-center gap-1.5 transition-all"
              title="提示向导"
            >
              <Bot className="w-3.5 h-3.5 text-white" />
              <span>小智提示</span>
            </button>

            <button
              onClick={() => setShowTimerModal(true)}
              className="text-xs font-mono font-black text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer flex items-center gap-1"
              title="计时器"
            >
              <span>⏱️ {formatTimer(secondsRemaining)}</span>
            </button>
          </div>
        </div>

        {/* Main Two-Wing Interactive Stage */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3.5 min-h-0 overflow-hidden">
          
          {/* LEFT WING: Clean Interactive Illustration Card (col-span-7, ~58% width) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-3 sm:p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden h-full text-slate-900">
            
            {/* Dynamic Clue Component (Full Stage Area, No Distractions) */}
            <div className="flex-1 flex items-center justify-center w-full min-h-0 overflow-hidden">
              <DynamicClueIllustration
                clueType={question.clueType}
                clueBadgeText={question.clueBadgeText}
                question={question}
              />
            </div>
          </div>

          {/* RIGHT WING: Question & Options (col-span-5, ~42% width) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden h-full text-slate-900">
            
            {/* Top: Story Context Callout + Question Stem Headline */}
            <div className="space-y-2 shrink-0">
              {/* Story Context (Interactive Expandable Story Box) */}
              {question.storyContext && (
                <div
                  onClick={() => setIsStoryExpanded(!isStoryExpanded)}
                  className={`bg-sky-50/90 hover:bg-sky-50 border border-sky-200 rounded-2xl p-2.5 sm:p-3 flex flex-col gap-1.5 text-xs sm:text-sm text-sky-950 font-semibold leading-relaxed transition-all cursor-pointer ${
                    isStoryExpanded ? 'shadow-xs ring-2 ring-sky-300/60' : ''
                  }`}
                  title={isStoryExpanded ? '点击收起背景' : '点击展开查看完整背景故事'}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5 text-sky-900 font-black text-xs">
                      <span className="text-sm">📖</span>
                      <span>任务探索情境</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsStoryExpanded(!isStoryExpanded);
                      }}
                      className="text-[11px] font-black text-sky-700 hover:text-sky-900 bg-sky-100 hover:bg-sky-200 px-2 py-0.5 rounded-full flex items-center gap-0.5 cursor-pointer transition-colors shadow-2xs"
                    >
                      <span>{isStoryExpanded ? '收起 ▴' : '展开全文 ▾'}</span>
                    </button>
                  </div>

                  <p className={`text-sky-950 transition-all ${
                    isStoryExpanded ? 'max-h-32 overflow-y-auto pr-1' : 'line-clamp-2'
                  }`}>
                    {question.storyContext}
                  </p>
                </div>
              )}

              {/* Question Stem Headline (Bigger & High Contrast) */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-white to-transparent border-l-4 border-[#07C160]">
                <div className="flex items-start gap-2.5">
                  <span className="text-lg shrink-0 font-black text-[#006d33]">❓</span>
                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug tracking-tight text-left">
                      {question.stemText}
                    </h2>

                    {/* Highlight Keywords */}
                    {question.highlightWords && question.highlightWords.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {question.highlightWords.map((hw, i) => (
                          <span
                            key={i}
                            className={`text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-lg ${
                              hw.type === 'blue'
                                ? 'bg-sky-100 text-sky-900 border border-sky-300'
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}
                          >
                            {hw.text}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: 4 Vertical Stacked Quantum Power Cell Options */}
            <div className="space-y-1.5 flex-1 flex flex-col justify-center my-1 min-h-0">
              {question.options.map((opt) => {
                const isSelected = selectedOption === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full py-1.5 px-2.5 sm:py-2 sm:px-3 flex items-center gap-2.5 text-left relative rounded-xl cursor-pointer transition-all duration-150 border-2 ${
                      isSelected
                        ? 'border-[#07C160] bg-[#f0fdf4] shadow-xs ring-2 ring-[#07C160]/30 scale-[1.005]'
                        : 'border-slate-200 bg-white hover:border-[#07C160]/60 hover:bg-slate-50 hover:shadow-2xs'
                    }`}
                  >
                    {/* Option Letter Hex Pad */}
                    <div
                      className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center font-black text-xs sm:text-sm transition-all shrink-0 ${
                        isSelected
                          ? 'bg-[#07C160] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {opt.key}
                    </div>

                    {/* Option Text Label & Model Graphics */}
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-xs sm:text-sm font-black leading-tight block transition-colors ${
                            isSelected ? 'text-[#006d33]' : 'text-slate-900'
                          }`}
                        >
                          {opt.label}
                        </span>
                        {opt.description && opt.label.startsWith('选项') && (
                          <span className="text-[10.5px] text-slate-500 font-medium leading-snug mt-0.5 line-clamp-1">
                            {opt.description}
                          </span>
                        )}
                      </div>

                      {/* 1039 题专属积木拼装模型选项图 */}
                      {question.id === 1039 && (
                        <div className="shrink-0">
                          {opt.key === 'A' && <BlockModelA size={24} />}
                          {opt.key === 'B' && <BlockModelB size={24} />}
                          {opt.key === 'C' && <BlockModelC size={24} />}
                          {opt.key === 'D' && <BlockModelD size={24} />}
                        </div>
                      )}

                      {/* 1041 题专属手链双色串珠选项图 */}
                      {question.id === 1041 && (
                        <div className="shrink-0">
                          {opt.key === 'A' && <BraceletIllustration color1="red" color2="yellow" size="sm" />}
                          {opt.key === 'B' && <BraceletIllustration color1="blue" color2="green" size="sm" />}
                          {opt.key === 'C' && <BraceletIllustration color1="black" color2="white" size="sm" />}
                          {opt.key === 'D' && <BraceletIllustration color1="purple" color2="pink" size="sm" />}
                        </div>
                      )}

                      {/* 1044 题专属双空位滚珠选项图 */}
                      {question.id === 1044 && (
                        <div className="shrink-0">
                          {opt.key === 'A' && <OptionBallsPreview firstColor="cyan" secondColor="red" />}
                          {opt.key === 'B' && <OptionBallsPreview firstColor="yellow" secondColor="purple" />}
                          {opt.key === 'C' && <OptionBallsPreview firstColor="cyan" secondColor="yellow" />}
                          {opt.key === 'D' && <OptionBallsPreview firstColor="red" secondColor="green" />}
                        </div>
                      )}

                      {/* 1045 题专属 9 人动物队列选项图 */}
                      {question.id === 1045 && (
                        <div className="w-full mt-1.5 overflow-x-auto">
                          {opt.key === 'A' && (
                            <OptionAnimalChainPreview
                              sequenceEmojis={['🦊', '🐻', '🐰', '🦌', '🦝', '🐱', '🐼', '🐶', '🐵']}
                            />
                          )}
                          {opt.key === 'B' && (
                            <OptionAnimalChainPreview
                              sequenceEmojis={['🦊', '🐰', '🐻', '🦌', '🦝', '🐱', '🐼', '🐶', '🐵']}
                            />
                          )}
                          {opt.key === 'C' && (
                            <OptionAnimalChainPreview
                              sequenceEmojis={['🦊', '🐻', '🐰', '🦌', '🐱', '🦝', '🐼', '🐶', '🐵']}
                            />
                          )}
                          {opt.key === 'D' && (
                            <OptionAnimalChainPreview
                              sequenceEmojis={['🐻', '🦊', '🐰', '🦌', '🦝', '🐱', '🐼', '🐶', '🐵']}
                            />
                          )}
                        </div>
                      )}

                      {/* 1068 题专属特征规律选项标记 */}
                      {question.id === 1068 && (
                        <div className="w-full mt-1.5 overflow-x-auto">
                          <OptionMonsterPreview ruleKey={opt.key} />
                        </div>
                      )}

                      {/* 1069 题专属木头照片选项标记 */}
                      {question.id === 1069 && (
                        <div className="w-full mt-1.5 overflow-x-auto">
                          {opt.key === 'A' && (
                            <OptionLogPhotoPreview logs={['striped', 'leafy', 'pointed', 'plain']} />
                          )}
                          {opt.key === 'B' && (
                            <OptionLogPhotoPreview logs={['leafy', 'pointed', 'striped', 'plain']} />
                          )}
                          {opt.key === 'C' && (
                            <OptionLogPhotoPreview logs={['striped', 'plain', 'pointed', 'leafy']} />
                          )}
                          {opt.key === 'D' && (
                            <OptionLogPhotoPreview logs={['striped', 'plain', 'leafy', 'pointed']} />
                          )}
                        </div>
                      )}

                      {/* 1071 题专属花束植物组合选项标记 */}
                      {question.id === 1071 && (
                        <div className="w-full mt-1.5 overflow-x-auto">
                          {opt.key === 'A' && (
                            <OptionBouquetPreview plants={['daisy', 'daisy', 'twig', 'twig']} />
                          )}
                          {opt.key === 'B' && (
                            <OptionBouquetPreview plants={['daisy', 'twig', 'twig', 'twig']} />
                          )}
                          {opt.key === 'C' && (
                            <OptionBouquetPreview plants={['rose', 'daisy', 'twig', 'twig']} />
                          )}
                          {opt.key === 'D' && (
                            <OptionBouquetPreview plants={['rose', 'rose', 'twig', 'twig']} />
                          )}
                        </div>
                      )}

                      {/* 1072 题专属散步拍照组合选项标记 */}
                      {question.id === 1072 && (
                        <div className="shrink-0">
                          {opt.key === 'A' && (
                            <OptionPhotoSetPreview
                              photos={[
                                { left: 'none', right: 'house' },
                                { left: 'house', right: 'tree' },
                                { left: 'none', right: 'tree' },
                              ]}
                              size="xs"
                            />
                          )}
                          {opt.key === 'B' && (
                            <OptionPhotoSetPreview
                              photos={[
                                { left: 'house', right: 'none' },
                                { left: 'tree', right: 'house' },
                                { left: 'tree', right: 'none' },
                              ]}
                              size="xs"
                            />
                          )}
                          {opt.key === 'C' && (
                            <OptionPhotoSetPreview
                              photos={[
                                { left: 'none', right: 'tree' },
                                { left: 'house', right: 'tree' },
                                { left: 'house', right: 'none' },
                              ]}
                              size="xs"
                            />
                          )}
                          {opt.key === 'D' && (
                            <OptionPhotoSetPreview
                              photos={[
                                { left: 'house', right: 'none' },
                                { left: 'none', right: 'house' },
                                { left: 'none', right: 'tree' },
                              ]}
                              size="xs"
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Checkmark indicator */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#07C160] scale-100 opacity-100 shadow-xs'
                          : 'bg-transparent border-2 border-slate-200 scale-75 opacity-0'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback Box (Positioned right below option cards, NEVER covering action buttons) */}
            {showAnswerFeedback && (
              <div className="w-full my-1.5 bg-[#f0fdf4] p-3 rounded-2xl border-2 border-[#07C160] shadow-sm animate-in fade-in duration-150 shrink-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-[#006d33] font-black text-xs sm:text-sm">
                    <Check className="w-4 h-4 text-[#07C160] stroke-[3]" />
                    <span>
                      {selectedOption === question.correctAnswer
                        ? '🎉 判定正确！官方解析如下：'
                        : '💡 官方题解推导过程：'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {question.informaticsConcept && (
                      <button
                        onClick={() => setShowInformaticsCard(true)}
                        className="text-xs font-black text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200 cursor-pointer flex items-center gap-0.5 transition-colors"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                        <span>CS原理</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowAnswerFeedback(false)}
                      className="text-slate-400 hover:text-slate-700 text-xs font-black p-0.5 rounded-full cursor-pointer ml-1"
                      title="关闭解析"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-800 font-medium leading-relaxed max-h-20 overflow-y-auto pr-1">
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Bottom: Tactical Flight Control Strip */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 shrink-0 relative z-10">
              {/* 3-Column Primary Flight Console */}
              <div className="grid grid-cols-12 gap-2.5 w-full">
                {/* 1. Prev Question Button */}
                <button
                  onClick={() => {
                    sounds.playTap();
                    handlePrevTask();
                  }}
                  className={`col-span-3 py-3 sm:py-3.5 px-2 rounded-2xl font-black text-xs sm:text-sm border-2 flex items-center justify-center gap-1 cursor-pointer transition-all ${
                    currentIdx === 0
                      ? 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-400 hover:bg-emerald-50 shadow-2xs'
                  }`}
                  title={currentIdx === 0 ? '返回大厅' : '返回上一题'}
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                  <span>{currentIdx === 0 ? '返回' : '上一关'}</span>
                </button>

                {/* 2. Main Confirm & Lock Button */}
                <button
                  onClick={handleLockAnswer}
                  disabled={!selectedOption || isAnswerLocked}
                  className={`col-span-6 py-3 sm:py-3.5 px-3 rounded-2xl font-black text-sm sm:text-base border-b-3 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isAnswerLocked
                      ? 'bg-[#dcfce7] text-[#166534] border-[#86efac] shadow-none cursor-default'
                      : selectedOption
                      ? 'bg-[#07C160] text-white hover:brightness-110 active:translate-y-0.5 border-[#005225] shadow-lg shadow-[#07C160]/30 animate-pulse'
                      : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>
                    {isAnswerLocked
                      ? `已锁定【${selectedOption}】`
                      : selectedOption
                      ? `确认锁定【${selectedOption}】`
                      : '请选择选项'}
                  </span>
                </button>

                {/* 3. Next Question Button */}
                <button
                  onClick={() => {
                    sounds.playTap();
                    handleNextTask();
                  }}
                  className={`col-span-3 py-3 sm:py-3.5 px-2 rounded-2xl font-black text-xs sm:text-sm border-2 flex items-center justify-center gap-1 cursor-pointer transition-all ${
                    currentIdx === activeQuestions.length - 1
                      ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md hover:brightness-105'
                      : 'bg-[#07C160] text-white border-[#005225] hover:brightness-110 shadow-md shadow-[#07C160]/25'
                  }`}
                  title={currentIdx === activeQuestions.length - 1 ? '交卷并查看能力画像' : '跃迁至下一关'}
                >
                  <span>{currentIdx === activeQuestions.length - 1 ? '交卷画像' : '下一关'}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

              {/* Secondary Sub-actions Row */}
              <div className="flex items-center justify-between gap-2 px-1">
                <button
                  onClick={() => {
                    sounds.playTap();
                    setShowExitConfirmModal(true);
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <span>🏠 返回大厅</span>
                </button>

                {/* Real-time Answering Progress Badge */}
                <button
                  onClick={() => setShowProgressModal(true)}
                  className="flex items-center gap-1.5 text-xs font-black text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 hover:border-emerald-400 cursor-pointer transition-all"
                  title="点击查看航线总览"
                >
                  <span className="w-2 h-2 rounded-full bg-[#07C160] animate-pulse"></span>
                  <span>答题进度：{answeredCount} / {activeQuestions.length} 关</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 4. Holographic Timer Hub Modal */}
      {showTimerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in select-none text-slate-100"
          onClick={() => setShowTimerModal(false)}
        >
          <div
            className="bg-slate-900/95 rounded-[36px] max-w-md w-full border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col p-6 gap-5 animate-in zoom-in-95 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-2xl shrink-0">
                  ⏱️
                </div>
                <div>
                  <h3 className="font-black text-lg text-cyan-300">
                    星际探索任务计时器
                  </h3>
                  <p className="text-xs text-slate-400 font-bold">
                    保持平稳推导节奏，时间非常充足
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playTap();
                  setShowTimerModal(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Giant Glowing Digital Clock */}
            <div className="bg-slate-950/80 border border-cyan-500/30 rounded-3xl p-6 flex flex-col items-center justify-center gap-2 shadow-inner">
              <div className="text-4xl sm:text-5xl font-mono font-black text-cyan-400 tracking-wider drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                {formatTimer(secondsRemaining)}
              </div>
              <div className="text-xs text-emerald-400 font-black flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>能量系统运转正常 · 推荐答题时长 15~20 分钟</span>
              </div>
            </div>

            {/* AI Companion Advice */}
            <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-2xl p-3.5 flex items-center gap-3 text-xs text-cyan-200">
              <span className="text-2xl shrink-0">🤖</span>
              <p className="leading-relaxed font-medium">
                小智向导提示：“不用着急，遇到难题先观察左侧实验台的数据流转，理清规律再做选择！”
              </p>
            </div>

            <button
              onClick={() => {
                sounds.playSelect();
                setShowTimerModal(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer transition-all active:scale-95"
            >
              保持专注，继续探索 🚀
            </button>
          </div>
        </div>
      )}

      {/* 5. Holographic Star Route Progress Modal */}
      {showProgressModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in select-none text-slate-100"
          onClick={() => setShowProgressModal(false)}
        >
          <div
            className="bg-slate-900/95 rounded-[36px] max-w-lg w-full border-2 border-emerald-400/50 shadow-[0_0_50px_rgba(7,193,96,0.3)] overflow-hidden flex flex-col p-6 gap-5 animate-in zoom-in-95 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-2xl shrink-0">
                  🗺️
                </div>
                <div>
                  <h3 className="font-black text-lg text-emerald-300">
                    星际探索总航线图
                  </h3>
                  <p className="text-xs text-slate-400 font-bold">
                    当前已完成 {answeredCount} / {activeQuestions.length} 关 · 累计能量 {currentExp} EXP
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playTap();
                  setShowProgressModal(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar Gauge */}
            <div className="w-full bg-slate-950 rounded-2xl p-3.5 border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-400">总探索进度</span>
                <span className="text-emerald-400">{Math.round((answeredCount / activeQuestions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#07C160] to-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / activeQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Interactive Level Grid */}
            <div className="max-h-56 overflow-y-auto pr-1">
              <div className="grid grid-cols-5 gap-2.5">
                {activeQuestions.map((q, index) => {
                  const isCompleted = userAnswers[q.id] !== undefined;
                  const isActive = index === currentIdx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        sounds.playTap();
                        setCurrentIdx(index);
                        setSelectedOption(userAnswers[q.id] || '');
                        setIsAnswerLocked(false);
                        setShowAnswerFeedback(false);
                        setShowProgressModal(false);
                      }}
                      className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        isActive
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 ring-2 ring-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-102'
                          : isCompleted
                          ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300 hover:bg-emerald-500/30'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-base">{isCompleted ? '💎' : index === activeQuestions.length - 1 ? '🏆' : '📍'}</span>
                      <span className="text-xs font-black">第 {index + 1} 关</span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {isCompleted ? `已答【${userAnswers[q.id]}】` : '待探索'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playSelect();
                setShowProgressModal(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-[#07C160] hover:bg-[#059669] text-white font-black text-sm shadow-[0_0_20px_rgba(7,193,96,0.4)] cursor-pointer transition-all active:scale-95"
            >
              继续当前关卡 🚀
            </button>
          </div>
        </div>
      )}

      {/* 6. Unanswered Directives Holographic Modal */}
      {showUnansweredModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in select-none text-slate-100"
          onClick={() => setShowUnansweredModal(false)}
        >
          <div
            className="bg-slate-900/95 rounded-[36px] max-w-md w-full border-2 border-amber-400/50 shadow-[0_0_50px_rgba(245,158,11,0.35)] overflow-hidden flex flex-col p-6 gap-5 animate-in zoom-in-95 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0">
                  ⚠️
                </div>
                <div>
                  <h3 className="font-black text-lg text-amber-300">
                    尚有未探索关卡
                  </h3>
                  <p className="text-xs text-slate-400 font-bold">
                    必须全部完成答题后才能生成能力画像
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playTap();
                  setShowUnansweredModal(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Unanswered Badges List */}
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-amber-200 flex items-center gap-1.5">
                <span>📋 待完成关卡清单：</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeQuestions.map((q, idx) => {
                  if (userAnswers[q.id]) return null;
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        sounds.playTap();
                        setCurrentIdx(idx);
                        setSelectedOption('');
                        setIsAnswerLocked(false);
                        setShowAnswerFeedback(false);
                        setShowUnansweredModal(false);
                      }}
                      className="px-3 py-1 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400 text-amber-300 text-xs font-black cursor-pointer transition-all hover:scale-105"
                    >
                      关卡 {idx + 1} ➔ 前往
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playSelect();
                const firstUnansweredIndex = activeQuestions.findIndex((q) => !userAnswers[q.id]);
                if (firstUnansweredIndex !== -1) {
                  setCurrentIdx(firstUnansweredIndex);
                  setSelectedOption('');
                  setIsAnswerLocked(false);
                  setShowAnswerFeedback(false);
                }
                setShowUnansweredModal(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer transition-all active:scale-95"
            >
              前往第一道未答关卡 🎯
            </button>
          </div>
        </div>
      )}

      {/* 7. Exit Confirmation Dialog Modal */}
      {showExitConfirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in select-none text-slate-900"
          onClick={() => setShowExitConfirmModal(false)}
        >
          <div
            className="bg-white rounded-[32px] max-w-md w-full border-4 border-amber-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col p-6 gap-5 animate-in zoom-in-95 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shrink-0">
                  ⚠️
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 leading-tight">
                    确认终止答题并返回大厅？
                  </h3>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">
                    当前测评正在进行中（已作答 {answeredCount} / {activeQuestions.length} 关）
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playTap();
                  setShowExitConfirmModal(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Warning Details Callout */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 space-y-2 text-xs text-amber-950">
              <div className="flex items-center gap-1.5 font-black text-amber-900 text-sm">
                <span>🚨 重要提示：</span>
              </div>
              <p className="leading-relaxed font-medium">
                若现在返回大厅，<strong className="text-rose-700 font-black">本次测评未完成的答题进度将无法保留</strong>。下次测评需要重新开始。
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => {
                  sounds.playSelect();
                  setShowExitConfirmModal(false);
                }}
                className="py-3 px-4 rounded-2xl bg-[#07C160] hover:bg-[#059669] text-white font-black text-sm border-b-3 border-[#005225] shadow-md shadow-[#07C160]/25 cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>继续答题 ✍️</span>
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setShowExitConfirmModal(false);
                  onBackToLobby();
                }}
                className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 hover:border-rose-300 font-black text-sm border-2 border-slate-200 cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>终止并退出 🏠</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Loading Modal with Progress when computing capability profile */}
      {isCalculatingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300 text-slate-900">
          <div className="relative w-full max-w-md bg-white rounded-[36px] p-8 border-4 border-[#07C160] shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#07C160] border-4 border-white flex items-center justify-center text-white text-3xl mb-4 shadow-md animate-bounce">
              🧠
            </div>
            <h3 className="text-2xl font-black text-[#1b1c1c] tracking-tight">
              正在构建四维计算思维画像
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-bold mt-1">
              华儿街 AI 算法引擎正在进行认知分析...
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-4 mt-6 border-2 border-gray-200 overflow-hidden relative">
              <div
                className="bg-[#07C160] h-full transition-all duration-300 rounded-full"
                style={{ width: `${calcProgress}%` }}
              ></div>
            </div>

            {/* Step text */}
            <div className="text-xs font-bold text-[#006d33] mt-3">
              {calcStepText} ({calcProgress}%)
            </div>

            {/* Steps Checklist */}
            <div className="w-full mt-4 space-y-1.5 text-left text-xs bg-[#f8fafc] p-3.5 rounded-2xl border border-gray-200">
              {completedSteps.map((st, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#07C160]" />
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
