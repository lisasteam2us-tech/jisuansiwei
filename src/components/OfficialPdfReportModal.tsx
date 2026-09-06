import React, { useState, useRef } from 'react';
import {
  CapabilityScore,
  RecommendedCourse,
  QuestionDiagnostic,
  SubSkillMastery,
  CognitiveDiagnostics,
} from '../types';
import { Medal } from '../data/medals';
import { SUB_SKILLS_META } from '../data/questions';
import { exportElementToPdf, exportElementToImage } from '../utils/pdfExport';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Download,
  Printer,
  X,
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  BookOpen,
  Eye,
  Cpu,
  ShieldCheck,
  Zap,
  Image as ImageIcon,
  Loader2,
  Calendar,
  Compass,
  Target,
  Brain,
  Layers,
  Check,
  TrendingUp,
  Info,
} from 'lucide-react';

export interface RadarDataPoint {
  subject: string;
  score: number;
  benchmark: number;
  fullMark: number;
}

interface OfficialPdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  onStudentNameChange: (name: string) => void;
  scores: CapabilityScore[];
  radarData: RadarDataPoint[];
  overallScore: number;
  percentile: number;
  medals: Medal[];
  unlockedCount: number;
  highlightMedal: Medal;
  lowestDimension: CapabilityScore;
  recommendedCourse: RecommendedCourse;
  totalQuestionsCount?: number;
  questionDiagnostics?: QuestionDiagnostic[];
  subSkillsMasteryList?: SubSkillMastery[];
  cognitiveDiagnostics?: CognitiveDiagnostics;
}

export const OfficialPdfReportModal: React.FC<OfficialPdfReportModalProps> = ({
  isOpen,
  onClose,
  studentName,
  onStudentNameChange,
  scores,
  radarData,
  overallScore,
  percentile,
  medals,
  unlockedCount,
  highlightMedal,
  lowestDimension,
  recommendedCourse,
  totalQuestionsCount = 10,
  questionDiagnostics = [],
  subSkillsMasteryList = [],
  cognitiveDiagnostics,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState('');
  const [exportPercent, setExportPercent] = useState(0);
  const [reportSerial] = useState(() => `WK-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
  const [reportDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  });

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (!reportRef.current || isExporting) return;
    try {
      setIsExporting(true);
      sounds.playTap();
      const filename = `华儿街计算思维深度测评报告_${studentName || '探索学员'}_${reportSerial}.pdf`;

      await exportElementToPdf({
        element: reportRef.current,
        filename,
        onProgress: (step, pct) => {
          setExportStep(step);
          setExportPercent(pct);
        },
      });

      sounds.playLockSuccess();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {}
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('导出PDF失败，请重试或直接使用系统打印功能。');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!reportRef.current || isExporting) return;
    try {
      setIsExporting(true);
      setExportStep('正在渲染 3 页完整高清长图...');
      setExportPercent(50);
      sounds.playTap();
      const filename = `华儿街计算思维深度测评报告_${studentName || '探索学员'}_${reportSerial}.png`;

      await exportElementToImage(reportRef.current, filename);

      sounds.playLockSuccess();
      try {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.6 },
        });
      } catch {}
    } catch (err) {
      console.error('Image generation error:', err);
      alert('导出长图失败，请重试。');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    sounds.playTap();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-5xl w-full border-4 border-[#07C160] shadow-2xl flex flex-col max-h-[94vh] overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#07C160]/15 flex items-center justify-center text-[#006d33]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-[#1b1c1c] flex items-center gap-2">
                <span>官方认证计算思维测评报告</span>
                <span className="text-xs bg-[#dcfce7] text-[#006d33] px-2.5 py-0.5 rounded-full font-bold border border-[#bbf7d0]">
                  完整 3 页 A4 深度诊断版
                </span>
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                涵盖四维画像、15 项二级子技能矩阵、AI 认知成因分析与逐题答题明细
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Name Quick Customizer Toolbar */}
        <div className="px-6 py-3 bg-[#f0fdf4] border-b border-[#bbf7d0] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <label htmlFor="modal-student-name" className="font-bold text-[#006d33] shrink-0">
              报告姓名定制：
            </label>
            <input
              id="modal-student-name"
              type="text"
              value={studentName}
              onChange={(e) => onStudentNameChange(e.target.value)}
              placeholder="请输入学员真实姓名"
              className="px-3 py-1 bg-white border-2 border-[#86efac] rounded-lg text-xs font-black text-[#006d33] focus:outline-none focus:ring-2 focus:ring-[#07C160] w-36 sm:w-48"
            />
            <span className="text-gray-400 text-[11px]">（实时同步至 3 页报告上方）</span>
          </div>

          <div className="flex items-center gap-4 text-gray-600 font-medium text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#07C160]" />
              {reportDate}
            </span>
            <span className="font-mono text-gray-400">NO.{reportSerial}</span>
          </div>
        </div>

        {/* Report Preview Container (Scrollable Multi-Page View) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/80 flex flex-col items-center gap-8">
          <div ref={reportRef} id="official-pdf-report-document" className="w-full flex flex-col items-center gap-8">
            
            {/* ================= PAGE 1: 官方评估认证与核心四维素养画像 ================= */}
            <div
              className="pdf-page-sheet w-full max-w-[760px] min-h-[1060px] bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-md text-slate-800 flex flex-col justify-between relative select-text"
              style={{
                pageBreakAfter: 'always',
                WebkitFontSmoothing: 'antialiased',
                textRendering: 'optimizeLegibility',
              }}
            >
              {/* Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.025] select-none">
                <span className="text-8xl font-black rotate-[-30deg] tracking-widest text-black">
                  WONDERKIDS STEAM
                </span>
              </div>

              {/* Header */}
              <header className="flex items-start justify-between pb-4 border-b-2 border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#07C160] flex items-center justify-center text-white text-2xl font-black shadow-md">
                    🧠
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-[#006d33] tracking-tight">
                        华儿街少儿探索中心
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider bg-[#e8f5e9] text-[#07C160] px-2 py-0.5 rounded border border-[#c8e6c9]">
                        WonderKids STEAM Lab
                      </span>
                    </div>
                    <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      青少年计算思维与数字素养深度评估报告
                    </h1>
                    <p className="text-[10px] text-slate-500 font-bold">
                      对标《义务教育信息科技课程标准(2022年版)》及国际 Bebras 测评模型
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="inline-block bg-amber-50 text-amber-900 border border-amber-300 rounded-lg px-2 py-0.5 text-[10px] font-mono font-bold">
                    {reportSerial}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{reportDate}</div>
                </div>
              </header>

              {/* Student Info & Index Bar */}
              <section className="bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-blue-50/50 rounded-2xl p-3.5 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-emerald-400 flex items-center justify-center text-xl shadow-xs">
                    🎓
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-slate-900">{studentName || '探索学员'}</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                        正式受测者
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">
                      完成 {totalQuestionsCount} 项任务 · 荣获【{highlightMedal.name}】勋章
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-slate-500">综合素养指数</div>
                    <div className="text-xl font-black text-[#006d33]">{overallScore} <span className="text-[10px] font-bold text-slate-400">/ 100</span></div>
                  </div>
                  <div className="w-px h-7 bg-emerald-200"></div>
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-slate-500">同龄击败率</div>
                    <div className="text-xl font-black text-[#0284c7]">Top {Math.max(1, 100 - percentile)}%</div>
                  </div>
                  <div className="w-px h-7 bg-emerald-200"></div>
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-slate-500">点亮勋章</div>
                    <div className="text-xl font-black text-amber-600">{unlockedCount} <span className="text-[10px] font-bold text-slate-400">枚</span></div>
                  </div>
                </div>
              </section>

              {/* Cognitive Stage Banner */}
              {cognitiveDiagnostics && (
                <section className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-[#07C160]" />
                      <span>认知发展阶段定位：<strong>{cognitiveDiagnostics.cognitiveStage.stageName}</strong></span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded">
                      {cognitiveDiagnostics.cognitiveStage.stageTitle}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {cognitiveDiagnostics.cognitiveStage.description}
                  </p>
                </section>
              )}

              {/* 4 Core Dimensions Cards Grid */}
              <section className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>儿童数字能力四维画像评估（加权总分制）</span>
                  </h2>
                  <span className="text-[10px] font-bold text-slate-400">
                    40%计算思维 + 30%数字创造 + 20%数据AI + 10%数字责任
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {scores.map((s) => {
                    const weightBadge = s.weightText || (s.dimension.includes('计算思维') ? '40%' : s.dimension.includes('数字创造') ? '30%' : s.dimension.includes('数据') ? '20%' : '10%');
                    return (
                      <div
                        key={s.dimension}
                        className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {s.dimension.includes('计算思维') && <Cpu className="w-3.5 h-3.5 text-emerald-600" />}
                            {s.dimension.includes('数字创造') && <Sparkles className="w-3.5 h-3.5 text-sky-600" />}
                            {s.dimension.includes('数据') && <FileText className="w-3.5 h-3.5 text-amber-600" />}
                            {s.dimension.includes('责任') && <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />}
                            <span className="font-bold text-xs text-slate-900">{s.dimension}</span>
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                              权重 {weightBadge}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-black text-xs text-slate-900">{s.score}分</span>
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.2 rounded text-white"
                              style={{ backgroundColor: s.color || '#07C160' }}
                            >
                              {s.level}
                            </span>
                          </div>
                        </div>

                        {/* Subskills */}
                        {s.subSkills && s.subSkills.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {s.subSkills.map((sub) => (
                              <span
                                key={sub}
                                className="text-[9px] bg-white text-slate-600 px-1.5 py-0.2 rounded border border-slate-200 font-medium"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Progress */}
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.max(4, s.score)}%`,
                              backgroundColor: s.color || '#07C160',
                            }}
                          ></div>
                        </div>

                        <p className="text-[10px] text-slate-600 leading-snug">
                          {s.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Official Seal & Footer */}
              <footer className="pt-3 border-t border-slate-200 flex items-end justify-between relative mt-2">
                <div className="space-y-0.5 text-[9px] text-slate-500">
                  <div>检测机构：华儿街少儿探索中心学术教研部 (WonderKids SteamClub)</div>
                  <div>官方查验：www.onecode.pro · 证书唯一防伪码：{reportSerial}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-full border-2 border-red-600/80 flex flex-col items-center justify-center text-red-600/90 font-black p-1 rotate-[-10deg] select-none shadow-xs">
                    <div className="text-[8px] text-center leading-tight">华儿街少儿探索中心</div>
                    <div className="text-xs my-0.2">★</div>
                    <div className="text-[7px] uppercase">测评认证专用章</div>
                    <div className="text-[6px] text-red-500 font-mono">CERTIFIED 2026</div>
                  </div>
                </div>
              </footer>

              <div className="text-center text-[9px] text-slate-400 font-mono pt-1">
                — 第 1 页 / 共 3 页 —
              </div>
            </div>

            {/* ================= PAGE 2: 15项二级细分子能力掌握度矩阵与AI认知画像 ================= */}
            <div
              className="pdf-page-sheet w-full max-w-[760px] min-h-[1060px] bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-md text-slate-800 flex flex-col justify-between relative select-text"
              style={{
                pageBreakAfter: 'always',
                WebkitFontSmoothing: 'antialiased',
                textRendering: 'optimizeLegibility',
              }}
            >
              {/* Header */}
              <header className="flex items-center justify-between pb-3 border-b-2 border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-[#006d33]">华儿街少儿探索中心</span>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs font-bold text-slate-700">15 项细分子能力掌握度下钻矩阵与认知归因</span>
                </div>
                <div className="text-xs font-mono text-slate-500 font-bold">
                  {studentName || '探索学员'} · NO.{reportSerial}
                </div>
              </header>

              {/* 15 Sub-Skills In-depth Table */}
              <section className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-700" />
                    <span>15 项细分子能力掌握度矩阵（课标与 Bebras 二级指标）</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    涵盖分解、规律、抽象、算法、逻辑、编程、AI应用与安全
                  </span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden text-[10px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-1.5">能力名称</th>
                        <th className="p-1.5">所属领域</th>
                        <th className="p-1.5">答题命中</th>
                        <th className="p-1.5">正确率</th>
                        <th className="p-1.5">常模均值</th>
                        <th className="p-1.5">掌握评级</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {subSkillsMasteryList.map((sub, i) => {
                        const meta = SUB_SKILLS_META[sub.name] || {
                          name: sub.name,
                          domain: sub.domain,
                          description: sub.description,
                          benchmark: 75,
                        };
                        const badgeStyle =
                          sub.masteryLevel === '精通'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sub.masteryLevel === '熟练'
                            ? 'bg-sky-100 text-sky-800'
                            : sub.masteryLevel === '需加强'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-500';

                        return (
                          <tr key={sub.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                            <td className="p-1.5 font-bold text-slate-900">{meta.name}</td>
                            <td className="p-1.5 text-slate-600">{sub.domain}</td>
                            <td className="p-1.5 text-slate-600">
                              {sub.total > 0 ? `${sub.correct}/${sub.total} 题` : '未抽题'}
                            </td>
                            <td className="p-1.5 font-bold text-[#006d33]">
                              {sub.total > 0 ? `${sub.accuracy}%` : '-'}
                            </td>
                            <td className="p-1.5 text-slate-500">{meta.benchmark}%</td>
                            <td className="p-1.5">
                              <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${badgeStyle}`}>
                                {sub.masteryLevel}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* AI Cognitive Diagnostics (Strengths & Weaknesses Attribution) */}
              {cognitiveDiagnostics && (
                <section className="space-y-2.5">
                  <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-purple-700" />
                    <span>AI 深度认知画像与失分成因归因</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Strengths */}
                    <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                      <span className="text-[11px] font-black text-emerald-950 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>🌟 学员优势思维亮点</span>
                      </span>
                      {cognitiveDiagnostics.strengths.slice(0, 2).map((st, idx) => (
                        <div key={idx} className="p-2 bg-white rounded-lg border border-emerald-100 space-y-0.5">
                          <div className="font-bold text-[10px] text-emerald-900">{st.title}</div>
                          <p className="text-[9px] text-slate-600 leading-snug">{st.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Weaknesses */}
                    <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1.5">
                      <span className="text-[11px] font-black text-rose-950 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-rose-600" />
                        <span>⚠️ 薄弱环节失分根因剖析</span>
                      </span>
                      {cognitiveDiagnostics.weaknesses.slice(0, 2).map((wk, idx) => (
                        <div key={idx} className="p-2 bg-white rounded-lg border border-rose-100 space-y-0.5">
                          <div className="font-bold text-[10px] text-rose-900">{wk.title}</div>
                          <p className="text-[9px] text-slate-700 leading-snug"><strong>原因：</strong>{wk.causeAnalysis}</p>
                          <p className="text-[9px] text-[#006d33] font-bold leading-snug"><strong>建议：</strong>{wk.actionAdvice}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Recommended Course & Next Actions */}
              <section className="bg-amber-50/80 rounded-xl p-3 border border-amber-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-amber-900 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-amber-700" />
                    <span>华儿街进阶推荐微课与实操任务</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-800">
                    针对【{lowestDimension.dimension}】专项提分
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-2 rounded-lg border border-amber-200 text-[10px]">
                  <BookOpen className="w-3.5 h-3.5 text-[#006d33] shrink-0" />
                  <span className="font-bold text-slate-800 shrink-0">专属微课：</span>
                  <span className="font-bold text-[#006d33] truncate">《{recommendedCourse.title}》</span>
                  <span className="text-slate-500 shrink-0">({recommendedCourse.duration} · {recommendedCourse.level})</span>
                </div>
              </section>

              <div className="text-center text-[9px] text-slate-400 font-mono pt-1">
                — 第 2 页 / 共 3 页 —
              </div>
            </div>

            {/* ================= PAGE 3: 逐题答题明细与思维误区对错归因清单 ================= */}
            <div
              className="pdf-page-sheet w-full max-w-[760px] min-h-[1060px] bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-md text-slate-800 flex flex-col justify-between relative select-text"
              style={{
                pageBreakAfter: 'always',
                WebkitFontSmoothing: 'antialiased',
                textRendering: 'optimizeLegibility',
              }}
            >
              {/* Header */}
              <header className="flex items-center justify-between pb-3 border-b-2 border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-[#006d33]">华儿街少儿探索中心</span>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs font-bold text-slate-700">逐题答题明细与思维误区深度归因清单</span>
                </div>
                <div className="text-xs font-mono text-slate-500 font-bold">
                  {studentName || '探索学员'} · NO.{reportSerial}
                </div>
              </header>

              {/* Item-Level Question Diagnostics Table */}
              <section className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>本次测评逐题答题明细与考点分析 (共 {questionDiagnostics.length} 题)</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    含题目情境、用户选择、正确答案与 CS 原理
                  </span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden text-[9px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-1.5 w-8">题号</th>
                        <th className="p-1.5">考查子技能与题目情境</th>
                        <th className="p-1.5 w-12">难度</th>
                        <th className="p-1.5 w-16">学员选择</th>
                        <th className="p-1.5 w-14">判定</th>
                        <th className="p-1.5">考查计算机科学原理 / 思维归因</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {questionDiagnostics.map((q, idx) => (
                        <tr key={q.questionId} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                          <td className="p-1.5 font-black text-slate-900">#{idx + 1}</td>
                          <td className="p-1.5">
                            <div className="font-bold text-slate-900">{q.domain} · {q.subSkill}</div>
                            <div className="text-slate-500 truncate max-w-[190px]">{q.stemText}</div>
                          </td>
                          <td className="p-1.5 text-amber-600 font-bold">
                            {'★'.repeat(q.difficultyHearts || 2)}
                          </td>
                          <td className="p-1.5">
                            <span className={q.isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                              {q.userAnswer || '未选'}
                            </span>
                            {!q.isCorrect && (
                              <span className="text-slate-400 text-[8px] block">正解: {q.correctAnswer}</span>
                            )}
                          </td>
                          <td className="p-1.5">
                            {q.isCorrect ? (
                              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                                <CheckCircle2 className="w-2.5 h-2.5" /> 正确
                              </span>
                            ) : (
                              <span className="text-rose-600 font-bold flex items-center gap-0.5">
                                <XCircle className="w-2.5 h-2.5" /> 需巩固
                              </span>
                            )}
                          </td>
                          <td className="p-1.5 text-slate-700">
                            {q.informaticsConcept ? (
                              <span className="text-sky-900 font-medium block truncate max-w-[210px]">
                                💡 {q.informaticsConcept.title}
                              </span>
                            ) : (
                              <span className="text-slate-600 block truncate max-w-[210px]">{q.category}</span>
                            )}
                            {!q.isCorrect && q.mistakeReason && (
                              <span className="text-rose-700 text-[8px] block truncate max-w-[210px]">
                                ⚠️ 误区：{q.mistakeReason}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Honors Snapshot */}
              <section className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 mt-2">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-[11px] font-bold text-slate-800">已解锁荣誉勋章：</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  {medals.filter(m => m.unlocked).map((m) => (
                    <span
                      key={m.id}
                      className="text-[9px] font-bold bg-white text-slate-700 px-1.5 py-0.2 rounded border border-slate-200 flex items-center gap-0.5"
                    >
                      <span>{m.icon}</span>
                      <span>{m.name}</span>
                    </span>
                  ))}
                </div>
              </section>

              {/* Academic Committee Verification Area */}
              <footer className="pt-3 border-t border-slate-200 flex items-end justify-between relative mt-2">
                <div className="space-y-0.5 text-[9px] text-slate-500">
                  <div>学术教研：华儿街少儿探索中心计算思维教研院</div>
                  <div>专家评审意见：该学员逻辑推理与模式识别素养达标，建议持续拓展算法实践。</div>
                </div>

                <div className="text-right text-[9px] text-slate-600 font-bold">
                  <div>教研总监签发：<em>WonderKids Academic Board</em></div>
                  <div className="text-[8px] text-slate-400 font-mono mt-0.5">VERIFIED REPORT 2026</div>
                </div>
              </footer>

              <div className="text-center text-[9px] text-slate-400 font-mono pt-1">
                — 第 3 页 / 共 3 页 —
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-gray-500 font-medium">
            {isExporting ? (
              <span className="flex items-center gap-2 text-[#006d33] font-bold">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{exportStep} ({exportPercent}%)</span>
              </span>
            ) : (
              <span>已生成 3 页完整标准 A4 报告，点击右侧按钮直接下载或打印</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>系统打印</span>
            </button>

            <button
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-[#0284c7] bg-sky-50 hover:bg-sky-100 border border-sky-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ImageIcon className="w-4 h-4" />
              <span>导出 3 页高清长图 (PNG)</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="px-6 py-2.5 rounded-full text-xs font-black text-white bg-[#07C160] hover:brightness-110 shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{isExporting ? '正在生成PDF...' : '下载完整 3 页 PDF 报告'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

