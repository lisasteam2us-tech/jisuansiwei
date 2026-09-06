import React, { useState } from 'react';
import { calculateCapabilityData, DOMAINS_META, SUB_SKILLS_META } from '../data/questions';
import { getDimensionAdvice, DIMENSION_ADVICES } from '../data/recommendations';
import { evaluateUserMedals } from '../data/medals';
import { RecommendedCourse, Question, DigitalDomain, SubCompetency } from '../types';
import { CapabilityRadarChart } from './CapabilityRadarChart';
import { MedalsGallerySection } from './MedalsGallerySection';
import { OfficialPdfReportModal } from './OfficialPdfReportModal';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Download,
  Share2,
  Award,
  Flag,
  Star,
  Eye,
  Cpu,
  Sparkles,
  ShieldCheck,
  Rocket,
  GitFork,
  Puzzle,
  HelpCircle,
  Radar,
  X,
  Printer,
  Check,
  Copy,
  BookOpen,
  PlayCircle,
  Layers,
  Database,
  ArrowRight,
  Clock,
  Target,
  Flame,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  RefreshCw,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Filter,
  Brain,
  Lightbulb,
  TrendingUp,
  Info,
  CheckCheck,
  Compass,
} from 'lucide-react';

interface ProfileViewProps {
  userAnswers?: Record<number, string>;
  evaluatedQuestions?: Question[];
  onRestartAssessment: () => void;
  onOpenQuestionBank?: () => void;
  onRequestReset?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userAnswers,
  evaluatedQuestions,
  onRestartAssessment,
  onOpenQuestionBank,
  onRequestReset,
}) => {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeCourseModal, setActiveCourseModal] = useState<RecommendedCourse | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, boolean>>({});
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [studentName, setStudentName] = useState('探索学员');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Diagnostic interactive state
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);
  const [diagFilter, setDiagFilter] = useState<'all' | 'wrong' | 'correct'>('all');
  const [activeSubSkillDomain, setActiveSubSkillDomain] = useState<DigitalDomain | 'all'>('all');

  // Compute 4-dimension scores and deep diagnostics based on user answers
  const {
    hasAnswers,
    totalAnsweredCount,
    totalCorrectCount,
    overallAccuracyRate,
    scores,
    radarData,
    overallScore,
    percentile,
    subSkillsBreakdown,
    subSkillsMasteryList,
    questionDiagnostics,
    cognitiveDiagnostics,
    difficultyStats,
  } = calculateCapabilityData(
    isPreviewMode && (!userAnswers || Object.keys(userAnswers).length === 0)
      ? { 201: 'A', 202: 'B', 203: 'A', 204: 'A', 205: 'B' }
      : userAnswers,
    evaluatedQuestions
  );

  // If user reset data and hasn't answered yet and not in preview mode
  const isDataInitialized = !hasAnswers && !isPreviewMode;

  // Dynamically evaluate honor medals earned by user based on performance
  const { medals, unlockedCount, highlightMedal } = evaluateUserMedals(
    userAnswers,
    scores,
    overallScore
  );

  // Find lowest scoring dimension from radar chart scores
  const sortedScores = [...(scores || [])].sort((a, b) => a.score - b.score);
  const lowestDimension =
    sortedScores[0] ||
    scores?.[0] || {
      dimension: '计算思维',
      domain: '计算思维',
      weight: 40,
      weightText: '40%',
      subSkills: ['分解', '规律', '抽象', '算法', '逻辑'],
      score: 85,
      fullScore: 100,
      level: '优秀',
      description: '',
      color: '#07C160',
      borderColor: 'border-l-8 border-[#07C160]',
      iconName: 'cpu',
    };

  // Active advice dimension (defaults to lowest scoring dimension)
  const [selectedDimension, setSelectedDimension] = useState<string>(
    lowestDimension?.dimension || '计算思维'
  );

  const currentAdvice = getDimensionAdvice(
    selectedDimension || lowestDimension?.dimension || '计算思维'
  );
  const activeDimScore =
    scores.find((s) => s.dimension === selectedDimension) || lowestDimension;

  const handleDownloadPdf = () => {
    sounds.playLockSuccess();
    setShowPdfModal(true);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  const handleShare = () => {
    sounds.playSelect();
    setShowShareModal(true);
  };

  const copyShareLink = () => {
    sounds.playTap();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const toggleQuestionAccordion = (qId: number) => {
    sounds.playTap();
    setExpandedQuestionId((prev) => (prev === qId ? null : qId));
  };

  const getDimensionIcon = (iconName: string) => {
    switch (iconName) {
      case 'cpu':
        return <Cpu className="w-5 h-5 text-[#07C160]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#4FC3F7]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#FFD54F]" />;
      case 'shield-check':
        return <ShieldCheck className="w-5 h-5 text-[#FF8A80]" />;
      default:
        return <Cpu className="w-5 h-5 text-[#07C160]" />;
    }
  };

  const getAdviseIcon = (iconName: string, color: string) => {
    const colorClass =
      color === 'green'
        ? 'text-[#07C160]'
        : color === 'blue'
        ? 'text-[#4FC3F7]'
        : color === 'red'
        ? 'text-[#FF8A80]'
        : 'text-[#ebc23e]';
    switch (iconName) {
      case 'git-fork':
        return <GitFork className={`w-9 h-9 ${colorClass}`} />;
      case 'puzzle':
        return <Puzzle className={`w-9 h-9 ${colorClass}`} />;
      case 'help-circle':
        return <HelpCircle className={`w-9 h-9 ${colorClass}`} />;
      case 'shield-check':
        return <ShieldCheck className={`w-9 h-9 ${colorClass}`} />;
      case 'sparkles':
        return <Sparkles className={`w-9 h-9 ${colorClass}`} />;
      default:
        return <Rocket className={`w-9 h-9 ${colorClass}`} />;
    }
  };

  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'book-open':
        return <BookOpen className="w-5 h-5 text-[#07C160]" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-[#4FC3F7]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#FFD54F]" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-[#FF8A80]" />;
      case 'puzzle':
        return <Puzzle className="w-5 h-5 text-[#006688]" />;
      case 'git-fork':
        return <GitFork className="w-5 h-5 text-[#006d33]" />;
      default:
        return <PlayCircle className="w-5 h-5 text-[#07C160]" />;
    }
  };

  const handleEnrollCourse = (courseId: string) => {
    sounds.playTap();
    setEnrolledCourses((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const handleToggleTask = (taskId: string, taskTitle: string) => {
    sounds.playTap();
    setCompletedTasks((prev) => {
      const nextState = !prev[taskId];
      if (nextState) {
        try {
          confetti({
            particleCount: 20,
            spread: 40,
            origin: { y: 0.8 },
          });
        } catch {}
      }
      return {
        ...prev,
        [taskId]: nextState,
      };
    });
  };

  // Filtered question diagnostics
  const filteredDiagnostics = (questionDiagnostics || []).filter((q) => {
    if (diagFilter === 'wrong') return !q.isCorrect;
    if (diagFilter === 'correct') return q.isCorrect;
    return true;
  });

  // Filtered sub-skills mastery list
  const filteredSubSkills = (subSkillsMasteryList || []).filter((s) => {
    if (activeSubSkillDomain === 'all') return true;
    return s.domain === activeSubSkillDomain;
  });

  // If newly reset and no assessment answers exist yet
  if (isDataInitialized) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center gap-8 animate-in fade-in duration-300">
        {/* Initialized Empty State Banner */}
        <div className="w-full bg-white rounded-[36px] p-8 sm:p-12 border-4 border-white shadow-[0_12px_40px_rgba(0,109,51,0.06)] flex flex-col items-center text-center gap-6 relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-[#f0fdf4] border-4 border-[#bbf7d0] flex items-center justify-center text-3xl shadow-sm">
            ✨
          </div>

          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-[#f0fdf4] text-[#006d33] px-4 py-1.5 rounded-full text-xs font-black border border-[#bbf7d0]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#07C160]" />
              <span>测评数据已初始化 · 无数据污染</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              当前尚未进行学员测评
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              系统已重置为干净初始状态，各维度得分与勋章记录已全部清空。随时可为下一位学员开启全新的儿童数字能力测评！
            </p>
          </div>

          {/* New Digital Capability Model 4-Module Highlights */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-4 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-xs text-emerald-950">A. 计算思维</span>
                <span className="text-[10px] font-black bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded">40%</span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium">分解 · 规律 · 抽象 · 算法 · 逻辑</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-xs text-sky-950">B. 数字创造</span>
                <span className="text-[10px] font-black bg-sky-200 text-sky-900 px-1.5 py-0.2 rounded">30%</span>
              </div>
              <p className="text-[11px] text-sky-800 font-medium">Scratch · Python · 机器人 · AI创作</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-xs text-amber-950">C. 数据与AI素养</span>
                <span className="text-[10px] font-black bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded">20%</span>
              </div>
              <p className="text-[11px] text-amber-800 font-medium">数据理解 · AI认知 · AI使用能力</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-xs text-rose-950">D. 数字责任</span>
                <span className="text-[10px] font-black bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded">10%</span>
              </div>
              <p className="text-[11px] text-rose-800 font-medium">网络安全 · 隐私 · AI伦理</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                sounds.playLockSuccess();
                onRestartAssessment();
              }}
              className="bg-[#07C160] hover:brightness-110 active:translate-y-1 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-[#07C160]/30 border-b-[5px] border-[#005225] flex items-center gap-2 cursor-pointer transition-all"
            >
              <Rocket className="w-5 h-5" />
              <span>立即开始新学员测评 (按新模型抽题)</span>
            </button>

            {onOpenQuestionBank && (
              <button
                onClick={() => {
                  sounds.playTap();
                  onOpenQuestionBank();
                }}
                className="bg-white hover:bg-slate-50 active:translate-y-1 text-slate-800 font-bold text-sm px-6 py-3.5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <BookOpen className="w-4 h-4 text-[#006d33]" />
                <span>浏览题库标签与试卷</span>
              </button>
            )}

            <button
              onClick={() => {
                sounds.playTap();
                setIsPreviewMode(true);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer px-3 py-2"
            >
              预览范例报告视图
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-10">
      {/* Decorative Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#07C160]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-[#FFD54F]/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Top Header Completion Card */}
      <header
        id="profile-header-card"
        className="rounded-[40px] p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden bg-gradient-to-r from-white to-[#f5f3f3] border-4 border-white shadow-[0_12px_40px_rgba(0,109,51,0.06)]"
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFD54F]/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>

        {/* 3D Student Avatar */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-8 border-white shadow-xl shrink-0 z-10 bg-gradient-to-br from-[#c2e8ff] to-[#e1f5fe] flex items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="w-24 h-9 bg-[#006688] rounded-full border-2 border-white shadow-md flex items-center justify-around px-2 z-10">
              <div className="w-6 h-6 rounded-full bg-[#4FC3F7] shadow-[0_0_6px_#4FC3F7]"></div>
              <div className="w-6 h-6 rounded-full bg-[#4FC3F7] shadow-[0_0_6px_#4FC3F7]"></div>
            </div>
            <div className="w-20 h-16 bg-[#ffcc80] rounded-b-3xl -mt-3 flex flex-col items-center justify-end pb-2">
              <div className="w-6 h-2.5 border-b-2 border-[#d84315] rounded-full"></div>
            </div>
            <div className="w-28 h-10 bg-[#07C160] rounded-t-2xl -mt-1 border-2 border-white"></div>
          </div>

          <div className="absolute bottom-0 right-0 bg-[#FFD54F] text-[#574500] w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md">
            <Star className="w-5 h-5 fill-[#574500]" />
          </div>
        </div>

        {/* Middle Details */}
        <div className="flex-1 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#FFD54F]/25 text-[#735c00] px-4 py-1.5 rounded-full text-xs font-black mb-3 border border-[#ebc23e]/50">
            <Flag className="w-3.5 h-3.5 fill-[#735c00]" />
            <span>儿童数字能力四维画像已生成 · 实时对齐课标与Bebras模型</span>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
            <h1 className="text-2xl sm:text-4xl font-black text-[#1b1c1c] tracking-tight">
              {studentName}的数字能力报告
            </h1>
          </div>
          <p className="text-sm sm:text-base text-[#3d4a3d] font-medium mb-5">
            涵盖<strong>计算思维(40%)</strong>、<strong>数字创造(30%)</strong>、<strong>数据与AI素养(20%)</strong>及<strong>数字责任(10%)</strong>全面评估。
          </p>

          <div className="inline-flex items-center gap-2 bg-[#FFD54F] text-[#574500] px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold shadow-md border-2 border-white">
            <Award className="w-4 h-4 text-[#725b00]" />
            <span>荣获勋章：{highlightMedal.name}（已解锁 {unlockedCount}/{medals.length} 枚）</span>
          </div>
        </div>

        {/* Right CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto relative z-10 shrink-0">
          <button
            onClick={handleDownloadPdf}
            className="bg-[#07C160] text-white hover:brightness-110 active:translate-y-1 px-7 py-3 rounded-[1.4rem] text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#07C160]/30 border-b-[5px] border-[#005225] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>下载PDF报告</span>
          </button>

          <button
            onClick={handleShare}
            className="bg-[#4FC3F7] text-white hover:brightness-110 active:translate-y-1 px-7 py-3 rounded-[1.4rem] text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#4FC3F7]/30 border-b-[5px] border-[#006688] transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>分享到荣誉墙</span>
          </button>

          {onRequestReset && (
            <button
              onClick={() => {
                sounds.playTap();
                onRequestReset();
              }}
              className="bg-[#fffbeb] hover:bg-[#fef3c7] text-[#92400e] active:translate-y-1 px-7 py-2.5 rounded-[1.4rem] text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-sm border-2 border-[#fcd34d] border-b-[4px] transition-all cursor-pointer"
              title="初始化全部测评数据，为下一位学员准备全新测评"
            >
              <RotateCcw className="w-4 h-4 text-[#b45309]" />
              <span>换人测试 / 初始化</span>
            </button>
          )}
        </div>
      </header>

      {/* Module 1: Assessment KPI Overview & Transparent Scoring Notice */}
      <section className="bg-white rounded-[36px] p-6 sm:p-8 border-4 border-white shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#07C160]/15 flex items-center justify-center text-[#006d33]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#1b1c1c]">
                作答表现概览与做题数据统计
              </h2>
              <p className="text-xs text-slate-500 font-bold">
                实时统计本次闯关各难度题型的作答命中率与做题表现
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            共考查 {totalAnsweredCount} 题 · 耗时 100% 记录
          </span>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#f0fdf4] rounded-2xl p-4 border border-[#bbf7d0] flex flex-col justify-between">
            <span className="text-xs font-bold text-[#006d33] flex items-center gap-1">
              <CheckCheck className="w-4 h-4 text-[#07C160]" />
              <span>作答题量</span>
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-[#006d33]">
                {totalAnsweredCount}
              </span>
              <span className="text-xs font-bold text-emerald-800">题完成</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-medium mt-1">覆盖4大核心素养</span>
          </div>

          <div className="bg-[#f0f9ff] rounded-2xl p-4 border border-[#bae6fd] flex flex-col justify-between">
            <span className="text-xs font-bold text-[#0369a1] flex items-center gap-1">
              <Target className="w-4 h-4 text-[#0284c7]" />
              <span>答对题数</span>
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-[#0369a1]">
                {totalCorrectCount}
              </span>
              <span className="text-xs font-bold text-sky-800">/ {totalAnsweredCount} 题</span>
            </div>
            <span className="text-[11px] text-sky-700 font-medium mt-1">
              错误 {Math.max(0, totalAnsweredCount - totalCorrectCount)} 题已自动归因
            </span>
          </div>

          <div className="bg-[#fdf4ff] rounded-2xl p-4 border border-[#f0abfc] flex flex-col justify-between">
            <span className="text-xs font-bold text-[#86198f] flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#c026d3]" />
              <span>整体正确率</span>
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-[#86198f]">
                {overallAccuracyRate}%
              </span>
              <span className="text-xs font-bold text-fuchsia-800">命中率</span>
            </div>
            <span className="text-[11px] text-fuchsia-700 font-medium mt-1">
              超越 {percentile}% 同龄受测者
            </span>
          </div>

          <div className="bg-[#fffbeb] rounded-2xl p-4 border border-[#fde68a] flex flex-col justify-between">
            <span className="text-xs font-bold text-[#92400e] flex items-center gap-1">
              <Flame className="w-4 h-4 text-[#d97706]" />
              <span>难度星级达成</span>
            </span>
            <div className="mt-1 space-y-0.5 text-[11px] font-bold text-[#78350f]">
              <div className="flex justify-between">
                <span>★ 简单:</span>
                <span>{difficultyStats?.level1.correct}/{difficultyStats?.level1.total || 0} ({difficultyStats?.level1.accuracy}%)</span>
              </div>
              <div className="flex justify-between">
                <span>★★ 中等:</span>
                <span>{difficultyStats?.level2.correct}/{difficultyStats?.level2.total || 0} ({difficultyStats?.level2.accuracy}%)</span>
              </div>
              <div className="flex justify-between">
                <span>★★★ 挑战:</span>
                <span>{difficultyStats?.level3.correct}/{difficultyStats?.level3.total || 0} ({difficultyStats?.level3.accuracy}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transparent Score Explanation Callout */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-black text-xs sm:text-sm text-slate-900">
                打分机制与分值计算透明说明：
              </span>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                50分基础起评 + 难度动态加权
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {cognitiveDiagnostics?.scoreExplanation}
            </p>
          </div>
        </div>
      </section>

      {/* Core Profile Section: Radar Chart (Left) + 4 Capabilities Cards with Weights & Sub-Skills (Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* Left: Recharts Radar Chart Card */}
        <div
          id="radar-chart-card"
          className="rounded-[40px] p-6 sm:p-8 flex flex-col justify-between relative min-h-[480px] border-4 border-white bg-white/90 backdrop-blur-md shadow-[0_12px_40px_rgba(0,109,51,0.06)]"
        >
          {/* Card Title */}
          <div className="flex items-center justify-between w-full mb-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#07C160]/15 flex items-center justify-center">
                <Radar className="w-6 h-6 text-[#07C160]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1b1c1c]">儿童数字能力四维画像</h2>
                <p className="text-xs text-[#6c7b6c] font-bold">加权总分 = 40%计算思维 + 30%创造 + 20%数据AI + 10%责任</p>
              </div>
            </div>

            <span className="text-xs font-black px-3 py-1 bg-[#4FC3F7]/20 text-[#006688] rounded-full border border-[#4FC3F7]/30">
              综合评分 {overallScore} 分
            </span>
          </div>

          {/* Recharts Radar Component */}
          <div className="flex-1 w-full flex items-center justify-center">
            <CapabilityRadarChart
              data={radarData}
              overallScore={overallScore}
              percentile={percentile}
            />
          </div>
        </div>

        {/* Right: 4 Core Domains Cards */}
        <div className="flex flex-col gap-4 justify-between">
          {scores.map((cap) => {
            const meta = DOMAINS_META[cap.domain || (cap.dimension as DigitalDomain)] || DOMAINS_META['计算思维'];
            return (
              <div
                key={cap.dimension}
                className={`rounded-3xl p-5 sm:p-6 bg-white border-2 border-white shadow-sm hover:-translate-y-1 transition-transform ${cap.borderColor}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${cap.color}20` }}
                    >
                      {getDimensionIcon(cap.iconName)}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-black text-base sm:text-lg text-[#1b1c1c]">
                          {cap.dimension}
                        </h3>
                        <span className="text-xs font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          权重 {cap.weightText || `${cap.weight}%`}
                        </span>
                        <span className="text-sm font-black text-[#006d33]">
                          {cap.score}分
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-bold">{meta.referenceStandard}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {cap.answeredCount !== undefined && cap.answeredCount > 0 && (
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md hidden sm:inline">
                        做对 {cap.correctCount}/{cap.answeredCount} 题
                      </span>
                    )}
                    <span
                      className="text-xs font-black px-3 py-1 rounded-full text-white shadow-2xs"
                      style={{ backgroundColor: cap.color }}
                    >
                      {cap.level}
                    </span>
                  </div>
                </div>

                {/* Sub-skill badges */}
                <div className="flex flex-wrap gap-1.5 my-2 pl-13">
                  {cap.subSkills?.map((sub) => (
                    <span
                      key={sub}
                      className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#F9FBF9] text-slate-700 border border-slate-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Calculation Note */}
                {cap.calculationNote && (
                  <div className="text-[11px] text-slate-500 font-medium pl-13 mb-1.5 flex items-center gap-1">
                    <Info className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{cap.calculationNote}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#3d4a3d] font-medium leading-relaxed pl-13">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Module 2: AI Cognitive & Root-Cause Attribution Section */}
      {cognitiveDiagnostics && (
        <section className="bg-white rounded-[40px] p-6 sm:p-10 border-4 border-white shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3.5 pb-2 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#1b1c1c]">
                  AI 深度认知画像与失分成因诊断
                </h2>
                <span className="bg-purple-100 text-purple-800 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                  多维度精准溯源
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6c7b6c] font-bold mt-0.5">
                基于作答行为轨迹深度解析思维优势、失分瓶颈与认知发展阶段
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: Strengths */}
            <div className="bg-emerald-50/70 rounded-3xl p-5 border-2 border-emerald-200 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>🌟 学员优势能力亮点</span>
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                    表现突出
                  </span>
                </div>

                <div className="space-y-2.5">
                  {cognitiveDiagnostics.strengths.map((st, i) => (
                    <div key={i} className="p-3 bg-white/90 rounded-2xl border border-emerald-100 space-y-1">
                      <div className="font-black text-xs sm:text-sm text-emerald-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{st.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed pl-5">
                        {st.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-emerald-800 font-bold bg-emerald-100/60 p-2.5 rounded-xl">
                💡 建议继续保持对优势领域的探究热情，以此驱动其他能力的综合提升。
              </div>
            </div>

            {/* Card 2: Weaknesses & Root Causes */}
            <div className="bg-rose-50/70 rounded-3xl p-5 border-2 border-rose-200 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-950 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>⚠️ 薄弱环节与失分根因深度剖析</span>
                  </span>
                  <span className="text-[10px] font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full">
                    重点攻坚
                  </span>
                </div>

                <div className="space-y-2.5">
                  {cognitiveDiagnostics.weaknesses.map((wk, i) => (
                    <div key={i} className="p-3 bg-white/90 rounded-2xl border border-rose-100 space-y-1.5">
                      <div className="font-black text-xs sm:text-sm text-rose-950 flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{wk.title}</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed pl-5">
                        <strong>失分原因：</strong>{wk.causeAnalysis}
                      </p>
                      <p className="text-xs text-[#006d33] font-bold leading-relaxed pl-5">
                        <strong>提升建议：</strong>{wk.actionAdvice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-rose-800 font-bold bg-rose-100/60 p-2.5 rounded-xl">
                🎯 推荐前往本页下方的【专属微课】和【实操任务】针对性强化该技能。
              </div>
            </div>

            {/* Card 3: Cognitive Developmental Stage */}
            <div className="bg-sky-50/70 rounded-3xl p-5 border-2 border-sky-200 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-sky-950 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-sky-600" />
                    <span>🧭 认知发展阶段与潜能定位</span>
                  </span>
                  <span className="text-[10px] font-bold bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full">
                    皮亚杰认知理论
                  </span>
                </div>

                <div className="p-4 bg-white/90 rounded-2xl border border-sky-100 space-y-2">
                  <div className="inline-block bg-sky-100 text-sky-900 text-xs font-black px-2.5 py-1 rounded-lg">
                    {cognitiveDiagnostics.cognitiveStage.stageName}
                  </div>
                  <h3 className="font-black text-sm text-slate-900">
                    {cognitiveDiagnostics.cognitiveStage.stageTitle}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {cognitiveDiagnostics.cognitiveStage.description}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/80 border border-sky-100">
                    <span className="font-bold text-slate-500">📍 当前达成里程碑：</span>
                    <p className="font-bold text-slate-800 mt-0.5">{cognitiveDiagnostics.cognitiveStage.currentMilestone}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200">
                    <span className="font-bold text-emerald-800">🚀 下一阶成长目标：</span>
                    <p className="font-bold text-emerald-950 mt-0.5">{cognitiveDiagnostics.cognitiveStage.nextMilestone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Module 3: Item-Level Diagnostic Dashboard (逐题答题明细与对错归因看板) */}
      {questionDiagnostics && questionDiagnostics.length > 0 && (
        <section className="bg-white rounded-[40px] p-6 sm:p-10 border-4 border-white shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-[#1b1c1c]">
                    逐题答题明细与对错归因看板
                  </h2>
                  <span className="bg-blue-100 text-blue-800 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                    共 {questionDiagnostics.length} 题
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#6c7b6c] font-bold mt-0.5">
                  点击任意题目可展开查看题目情境、考查的计算机原理与典型思维陷阱剖析
                </p>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl self-start sm:self-auto">
              <button
                onClick={() => setDiagFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  diagFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                全部题目 ({questionDiagnostics.length})
              </button>
              <button
                onClick={() => setDiagFilter('wrong')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                  diagFilter === 'wrong'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-rose-700 hover:bg-rose-50'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>仅看错题 ({questionDiagnostics.filter((q) => !q.isCorrect).length})</span>
              </button>
              <button
                onClick={() => setDiagFilter('correct')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                  diagFilter === 'correct'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>仅看正确 ({questionDiagnostics.filter((q) => q.isCorrect).length})</span>
              </button>
            </div>
          </div>

          {/* Question List Accordion */}
          <div className="space-y-3.5">
            {filteredDiagnostics.map((q, idx) => {
              const isExpanded = expandedQuestionId === q.questionId;
              return (
                <div
                  key={q.questionId}
                  className={`rounded-3xl border-2 transition-all duration-200 overflow-hidden ${
                    q.isCorrect
                      ? 'bg-white border-slate-200 hover:border-emerald-300'
                      : 'bg-[#fffbfb] border-rose-200 hover:border-rose-300'
                  }`}
                >
                  {/* Header Row */}
                  <div
                    onClick={() => toggleQuestionAccordion(q.questionId)}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 flex-1">
                      <span
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                          q.isCorrect
                            ? 'bg-[#07C160] text-white'
                            : 'bg-rose-500 text-white'
                        }`}
                      >
                        #{q.taskNumber || idx + 1}
                      </span>

                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800">
                            {q.domain} · {q.subSkill}
                          </span>
                          <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {'★'.repeat(q.difficultyHearts || 2)} 难度
                          </span>
                          <span className="text-[11px] text-slate-400 font-bold">
                            {q.category}
                          </span>
                        </div>
                        <h4 className="font-black text-sm sm:text-base text-slate-900 line-clamp-1">
                          {q.stemText}
                        </h4>
                      </div>
                    </div>

                    {/* Result Badge & Answer summary */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-right text-xs">
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="text-slate-500 font-medium">你的选择:</span>
                          <span
                            className={`font-black px-2 py-0.5 rounded ${
                              q.isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800 line-through'
                            }`}
                          >
                            {q.userAnswer || '未作答'}
                          </span>
                          {!q.isCorrect && (
                            <span className="font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              正解: {q.correctAnswer}
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 ${
                          q.isCorrect
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {q.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>回答正确</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>错题诊断</span>
                          </>
                        )}
                      </div>

                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                    {/* Expandable Content Drawer */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-4 text-xs sm:text-sm animate-in fade-in">
                        {/* Story / Full Stem */}
                        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                          <span className="font-black text-slate-800 block text-xs">📖 完整题目情境：</span>
                          <p className="text-slate-700 font-medium leading-relaxed">{q.stemText}</p>
                          {q.storyContext && (
                            <p className="text-slate-500 text-xs mt-1">情境背景：{q.storyContext}</p>
                          )}
                        </div>

                        {/* CS Informatics Concept */}
                        {q.informaticsConcept && (
                          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 space-y-1 text-sky-950">
                            <div className="flex items-center gap-1.5 font-black text-xs text-sky-900">
                              <Lightbulb className="w-4 h-4 text-sky-600" />
                              <span>💡 考查计算机科学核心原理：{q.informaticsConcept.title}</span>
                            </div>
                            <p className="text-xs text-sky-900 font-medium pl-5">{q.informaticsConcept.coreConcept}</p>
                            <p className="text-[11px] text-sky-700 font-bold pl-5">实际工业应用：{q.informaticsConcept.realWorldApplication}</p>
                          </div>
                        )}

                        {/* Mistake analysis if wrong */}
                        {!q.isCorrect && q.mistakeReason && (
                          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1 text-rose-950">
                            <div className="flex items-center gap-1.5 font-black text-xs text-rose-900">
                              <AlertCircle className="w-4 h-4 text-rose-600" />
                              <span>🧠 典型思维误区剖析与失分根因：</span>
                            </div>
                            <p className="text-xs text-rose-900 font-medium pl-5 leading-relaxed">{q.mistakeReason}</p>
                          </div>
                        )}

                        {/* Explanation */}
                        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1 text-emerald-950">
                          <span className="font-black text-emerald-900 block text-xs">📝 官方标准解题思路：</span>
                          <p className="text-xs text-emerald-950 font-medium leading-relaxed">{q.explanation}</p>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Module 4: 15 Sub-Skills Mastery Matrix (15项细分子能力掌握度矩阵) */}
      <section className="bg-white rounded-[40px] p-6 sm:p-10 border-4 border-white shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#1b1c1c]">
                  15 项细分子能力掌握度下钻矩阵
                </h2>
                <span className="bg-amber-100 text-amber-900 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                  二级能力标准
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6c7b6c] font-bold mt-0.5">
                对标《义务教育信息科技新课标》与 Bebras 计算思维 15 个二级子技能颗粒度
              </p>
            </div>
          </div>

          {/* Sub-skill Domain Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl overflow-x-auto">
            {(['all', '计算思维', '数字创造', '数据与AI素养', '数字责任'] as const).map((dom) => (
              <button
                key={dom}
                onClick={() => setActiveSubSkillDomain(dom)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  activeSubSkillDomain === dom
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {dom === 'all' ? '全部能力 (15)' : dom}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubSkills.map((sub) => {
            const meta = SUB_SKILLS_META[sub.name] || {
              name: sub.name,
              domain: sub.domain,
              description: sub.description,
              benchmark: 75,
            };

            const isTested = sub.total > 0;
            const badgeColor =
              sub.masteryLevel === '精通'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : sub.masteryLevel === '熟练'
                ? 'bg-sky-100 text-sky-800 border-sky-300'
                : sub.masteryLevel === '需加强'
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : 'bg-slate-100 text-slate-500 border-slate-200';

            return (
              <div
                key={sub.name}
                className="bg-[#F9FBF9] rounded-3xl p-4 sm:p-5 border-2 border-slate-200 hover:border-[#07C160]/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm sm:text-base text-slate-900">
                      {meta.name}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                      {sub.domain}
                    </span>
                  </div>

                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                    {sub.masteryLevel}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {meta.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold">
                      {isTested ? `答对率: ${sub.accuracy}% (${sub.correct}/${sub.total}题)` : '本次未抽检该子技能'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      常模均值: {meta.benchmark}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isTested
                          ? sub.accuracy >= 70
                            ? 'bg-[#07C160]'
                            : 'bg-rose-500'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${isTested ? Math.max(8, sub.accuracy) : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Honor Medals Gallery Section (荣誉勋章馆) */}
      <MedalsGallerySection
        medals={medals}
        unlockedCount={unlockedCount}
      />


      {/* Advanced Secrets & Personalized Recommendations Section */}
      <section
        id="secrets-section"
        className="bg-white rounded-[40px] p-6 sm:p-10 border-4 border-white shadow-sm flex flex-col gap-8"
      >
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#efeded]/80">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#07C160]/15 flex items-center justify-center rotate-6 shrink-0">
              <Rocket className="w-6 h-6 text-[#07C160] -rotate-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#1b1c1c]">
                  进阶秘籍 · 个性化学习建议
                </h2>
                <span className="bg-[#FF8A80]/15 text-[#d84315] text-[11px] font-black px-2.5 py-0.5 rounded-full border border-[#FF8A80]/30 hidden sm:inline-flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  智能动态匹配
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6c7b6c] font-bold mt-0.5">
                依据你的四维雷达图分布，量身定制专属提分路径与实操任务
              </p>
            </div>
          </div>

          <div className="bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-2 rounded-2xl text-xs flex items-center gap-2 shrink-0">
            <Target className="w-4 h-4 text-[#006d33]" />
            <span className="font-bold text-[#3d4a3d]">
              当前聚焦：<strong className="text-[#006d33]">{selectedDimension}</strong> ({activeDimScore?.score}分)
            </span>
          </div>
        </div>

        {/* AI Intelligent Diagnostic Callout Banner */}
        <div className="bg-gradient-to-r from-[#eef8f1] via-[#f7fcf8] to-[#fffde7] rounded-3xl p-5 sm:p-6 border-2 border-[#07C160]/30 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#07C160] text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#006d33] text-white">
                  AI 诊断定位
                </span>
                <h3 className="font-black text-sm sm:text-base text-[#1b1c1c]">
                  雷达图得分最低维度：
                  <span className="text-[#006d33] underline decoration-[#07C160] decoration-2 underline-offset-4">
                    【{lowestDimension.dimension}】（{lowestDimension.score}分）
                  </span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#3d4a3d] font-medium leading-relaxed">
                建议优先强化<strong>【{lowestDimension.dimension}】</strong>相关能力。已为你自动生成对应的<strong>推荐专属微课</strong>与<strong>修炼任务</strong>！
              </p>
            </div>
          </div>

          {selectedDimension !== lowestDimension.dimension && (
            <button
              onClick={() => {
                sounds.playSelect();
                setSelectedDimension(lowestDimension.dimension);
              }}
              className="bg-[#006d33] text-white px-4 py-2 rounded-full text-xs font-black hover:brightness-110 flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer transition-all"
            >
              <span>切换回薄弱维度建议</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 4 Dimension Switcher Tabs */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#1b1c1c] flex items-center gap-1.5">
              <span>选择查看各维度提升建议：</span>
            </span>
            <span className="text-[11px] text-[#6c7b6c] font-medium">点击可切换查看不同维度的建议方案</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {scores.map((dim) => {
              const isSelected = selectedDimension === dim.dimension;
              const isLowest = dim.dimension === lowestDimension.dimension;
              return (
                <button
                  key={dim.dimension}
                  onClick={() => {
                    sounds.playSelect();
                    setSelectedDimension(dim.dimension);
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#07C160] shadow-md -translate-y-0.5'
                      : 'bg-[#F9FBF9] border-[#efeded] hover:border-[#07C160]/40 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${dim.color}20` }}
                      >
                        {getDimensionIcon(dim.iconName)}
                      </div>
                      <span className="font-black text-xs sm:text-sm text-[#1b1c1c]">
                        {dim.dimension}
                      </span>
                    </div>

                    <span className="text-xs font-black text-[#006d33]">
                      {dim.score}分
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: dim.color }}
                    >
                      {dim.level}
                    </span>
                    {isLowest && (
                      <span className="text-[10px] font-black text-[#d84315] bg-[#ffebe6] px-2 py-0.5 rounded-full border border-[#ffccbc] flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" />
                        优先提升
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Dimension Diagnosis Details */}
        <div className="bg-[#F9FBF9] rounded-3xl p-5 sm:p-6 border-2 border-[#efeded] flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#07C160]"></span>
              <h3 className="font-black text-base text-[#1b1c1c]">
                【{currentAdvice.dimension}】专项能力诊断
              </h3>
            </div>
            <span className="text-xs font-extrabold text-[#006688] bg-[#e1f5fe] px-3 py-1 rounded-full border border-[#b3e5fc]">
              核心攻坚点：{currentAdvice.keyChallenge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#3d4a3d] font-medium leading-relaxed">
            {currentAdvice.diagnosis}
          </p>
        </div>

        {/* Module 1: Recommended Courses and Tutorials */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#07C160]" />
              <h3 className="font-black text-base sm:text-lg text-[#1b1c1c]">
                推荐专属微课与入门教程
              </h3>
            </div>
            <span className="text-xs text-[#6c7b6c] font-bold">
              共 {currentAdvice.recommendedCourses.length} 门量身定制课程
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentAdvice.recommendedCourses.map((course) => {
              const isEnrolled = enrolledCourses[course.id];
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#efeded] hover:border-[#07C160]/60 hover:shadow-lg transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#07C160]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-[#07C160]/20">
                      {getCourseIcon(course.iconName)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#07C160] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                          {course.tag}
                        </span>
                        <span className="text-[11px] font-bold text-[#6c7b6c] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </span>
                        <span className="text-[11px] font-bold text-[#006688] bg-[#f0f9ff] px-2 py-0.5 rounded-md border border-[#e0f2fe]">
                          {course.level}
                        </span>
                      </div>
                      <h4 className="font-black text-sm sm:text-base text-[#1b1c1c] group-hover:text-[#006d33] transition-colors">
                        {course.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-[#3d4a3d] font-medium leading-relaxed bg-[#F9FBF9] p-3 rounded-2xl border border-[#efeded]">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#efeded]">
                    <span className="text-[11px] font-bold text-[#006d33] bg-[#f0fdf4] px-2.5 py-1 rounded-lg border border-[#dcfce7]">
                      🎯 {course.targetSkill}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEnrollCourse(course.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                          isEnrolled
                            ? 'bg-[#e2f7ea] text-[#006d33] border border-[#a7f3d0]'
                            : 'bg-[#f5f3f3] text-[#3d4a3d] hover:bg-[#eae8e7]'
                        }`}
                      >
                        {isEnrolled ? '✓ 已入计划' : '+ 计划'}
                      </button>

                      <button
                        onClick={() => {
                          sounds.playSelect();
                          setActiveCourseModal(course);
                        }}
                        className="bg-[#07C160] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-sm hover:brightness-110 flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>立即学习</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module 2: Interactive Practice Tasks */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#07C160]" />
              <h3 className="font-black text-base sm:text-lg text-[#1b1c1c]">
                针对性实操修炼任务（3项）
              </h3>
            </div>
            <span className="text-xs text-[#6c7b6c] font-bold">
              点击卡片可标记完成或加入今日清单
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentAdvice.tasks.map((task) => {
              const isDone = completedTasks[task.id];
              return (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id, task.title)}
                  className={`rounded-3xl p-5 flex flex-col items-center text-center transition-all cursor-pointer group border-2 relative ${
                    isDone
                      ? 'bg-[#f0fdf4] border-[#07C160] shadow-md'
                      : 'bg-[#F9FBF9] border-[#efeded] hover:border-[#07C160]/50 hover:bg-white hover:shadow-md hover:-translate-y-1'
                  }`}
                >
                  {/* Status Badge */}
                  <div className="absolute top-3.5 right-3.5">
                    {isDone ? (
                      <span className="bg-[#07C160] text-white p-1 rounded-full flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-[#d0ced0] group-hover:border-[#07C160] transition-colors"></span>
                    )}
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#efeded] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs">
                    {getAdviseIcon(task.icon, task.color)}
                  </div>
                  <h4 className="font-black text-sm sm:text-base text-[#1b1c1c] mb-1.5 group-hover:text-[#006d33]">
                    {task.title}
                  </h4>
                  <p className="text-xs text-[#3d4a3d] font-medium leading-relaxed">
                    {task.description}
                  </p>

                  <span className="mt-3 text-[11px] font-bold text-[#6c7b6c] group-hover:text-[#006d33]">
                    {isDone ? '🎉 已加入修炼计划' : '👉 点击打卡加入'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Retake or Return */}
        <div className="mt-4 pt-6 border-t-2 border-[#efeded] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-[#6c7b6c] font-medium">
            测评时间：2026-08-28 · 智能分析对齐《义务教育信息科技新课标》与 Bebras 国际计算思维标准
          </span>
          <div className="flex items-center gap-3">
            {onRequestReset && (
              <button
                onClick={() => {
                  sounds.playTap();
                  onRequestReset();
                }}
                className="text-xs font-black text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300 cursor-pointer flex items-center gap-1.5 transition-all shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                <span>初始化数据 (换人测试)</span>
              </button>
            )}
            {onOpenQuestionBank && (
              <button
                onClick={() => {
                  sounds.playTap();
                  onOpenQuestionBank();
                }}
                className="text-xs font-black text-blue-600 hover:text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 cursor-pointer flex items-center gap-1 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>前往题库专项刷题</span>
              </button>
            )}
            <button
              onClick={() => {
                sounds.playTap();
                onRestartAssessment();
              }}
              className="text-xs font-bold text-[#006d33] hover:text-[#07C160] underline cursor-pointer"
            >
              再次挑战测评
            </button>
          </div>
        </div>
      </section>

      {/* Course Interactive Preview Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-[36px] p-6 sm:p-8 max-w-lg w-full border-4 border-[#efeded] shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#efeded]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#07C160]/15 flex items-center justify-center text-[#006d33]">
                  {getCourseIcon(activeCourseModal.iconName)}
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-[#1b1c1c]">
                    {activeCourseModal.title}
                  </h3>
                  <p className="text-xs text-[#6c7b6c] font-bold">
                    {activeCourseModal.duration} · {activeCourseModal.level}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="w-8 h-8 rounded-full bg-[#f5f3f3] flex items-center justify-center text-[#6c7b6c] hover:text-[#1b1c1c] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#F9FBF9] p-4 rounded-2xl border border-[#e3e2e2] space-y-3 text-xs sm:text-sm text-[#3d4a3d]">
              <div className="bg-[#006d33] text-white p-3 rounded-xl flex items-center justify-between">
                <span className="font-black">核心强化技能</span>
                <span className="font-bold bg-white/20 px-2.5 py-0.5 rounded-full text-xs">
                  {activeCourseModal.targetSkill}
                </span>
              </div>

              <p className="leading-relaxed font-medium">
                {activeCourseModal.description}
              </p>

              {/* Course Steps Outline */}
              <div className="pt-2 border-t border-[#efeded] space-y-2">
                <span className="font-black text-xs text-[#1b1c1c] block">
                  课程关卡大纲：
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#efeded]">
                    <span className="w-5 h-5 rounded-full bg-[#07C160] text-white text-[10px] font-black flex items-center justify-center">1</span>
                    <span className="font-bold text-[#1b1c1c]">第1关：情境感知与基础概念图解</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#efeded]">
                    <span className="w-5 h-5 rounded-full bg-[#07C160] text-white text-[10px] font-black flex items-center justify-center">2</span>
                    <span className="font-bold text-[#1b1c1c]">第2关：避开常见逻辑与算法思维陷阱</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#efeded]">
                    <span className="w-5 h-5 rounded-full bg-[#07C160] text-white text-[10px] font-black flex items-center justify-center">3</span>
                    <span className="font-bold text-[#1b1c1c]">第3关：动手拼搭与闯关小实战</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[#3d4a3d] hover:bg-[#f5f3f3] cursor-pointer"
              >
                稍后学习
              </button>
              <button
                onClick={() => {
                  sounds.playLockSuccess();
                  try {
                    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
                  } catch {}
                  alert(`🎉 已成功开启《${activeCourseModal.title}》微课！准备进入第一关吧！`);
                  setActiveCourseModal(null);
                }}
                className="bg-[#07C160] text-white px-6 py-2.5 rounded-full text-xs font-black shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>立即进入微课闯关</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official A4 PDF Report & Certificate Modal */}
      <OfficialPdfReportModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        studentName={studentName}
        onStudentNameChange={setStudentName}
        scores={scores}
        radarData={radarData}
        overallScore={overallScore}
        percentile={percentile}
        medals={medals}
        unlockedCount={unlockedCount}
        highlightMedal={highlightMedal}
        lowestDimension={lowestDimension}
        recommendedCourse={getDimensionAdvice(lowestDimension.dimension).recommendedCourses[0]}
        totalQuestionsCount={evaluatedQuestions?.length || 10}
        questionDiagnostics={questionDiagnostics}
        subSkillsMasteryList={subSkillsMasteryList}
        cognitiveDiagnostics={cognitiveDiagnostics}
      />

      {/* Share Honor Wall Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-[36px] p-6 sm:p-8 max-w-md w-full border-4 border-[#efeded] shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#4FC3F7]/20 flex items-center justify-center text-[#006688] mb-1">
              <Share2 className="w-8 h-8 text-[#006688]" />
            </div>

            <h3 className="font-black text-xl text-[#1b1c1c]">分享到班级荣誉墙</h3>
            <p className="text-xs sm:text-sm text-[#3d4a3d]">
              快将你斩获的“{highlightMedal.name}”等 {unlockedCount} 枚荣誉勋章和四维能力雷达图分享给小伙伴们吧！
            </p>

            <div className="w-full bg-[#f0f9ff] p-3.5 rounded-2xl border border-[#b3e5fc] flex items-center justify-between">
              <span className="text-xs font-bold text-[#006688] truncate mr-2">
                {typeof window !== 'undefined' ? window.location.href : 'https://ais-dev...'}
              </span>
              <button
                onClick={copyShareLink}
                className="bg-[#07C160] text-white text-xs font-black px-4 py-2 rounded-full shrink-0 flex items-center gap-1 cursor-pointer hover:brightness-110"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制' : '复制链接'}</span>
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="mt-2 text-xs font-bold text-[#6c7b6c] hover:text-[#1b1c1c]"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
