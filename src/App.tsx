import { useState } from 'react';
import { ViewMode, GradeLevel, Question } from './types';
import { TopNavBar } from './components/TopNavBar';
import { LobbyView } from './components/LobbyView';
import { AssessmentView } from './components/AssessmentView';
import { ProfileView } from './components/ProfileView';
import { QuestionBankView } from './components/QuestionBankView';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { generateQuest } from './utils/questionGenerator';
import { sounds } from './utils/audio';
import { CheckCircle2, Sparkles, RotateCcw } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('lobby');
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [activeQuestions, setActiveQuestions] = useState<Question[] | undefined>(undefined);
  const [currentSubTitle, setCurrentSubTitle] = useState<string>('当前关卡：数据编码探秘');
  const [sessionKey, setSessionKey] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  const [assessmentStartIndex, setAssessmentStartIndex] = useState<number>(0);

  const handleStartCustomQuest = (config: {
    gradeLevel: GradeLevel;
    count: number;
    yearFilter: 'all' | '2023' | '2024' | '2025' | '经典';
  }) => {
    const { gradeLevel, count, yearFilter } = config;
    const questQuestions = generateQuest({
      gradeLevel,
      count,
      mode: 'random',
      yearFilter,
    });
    setActiveQuestions(questQuestions);
    setAssessmentStartIndex(0);
    const titleMap: Record<GradeLevel, string> = {
      '1-2': '启蒙岛：生活小侦探',
      '3-4': '探险林：编码探险家',
      '5-6': '极客港：算法架构师',
    };
    const yearLabel = yearFilter === 'all' ? '综合真题' : `${yearFilter}真题`;
    setCurrentSubTitle(
      `${titleMap[gradeLevel] || '计算思维探险'} · 随机挑战 (${yearLabel} · ${questQuestions.length}题)`
    );
    setCurrentView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuestWithQuestions = (questions: Question[], startIndex: number = 0) => {
    setActiveQuestions(questions);
    setAssessmentStartIndex(startIndex);
    setCurrentSubTitle(
      questions.length === 1
        ? `单题模拟演练 · #${questions[0].id} ${questions[0].category}`
        : `题库演练模式 (${questions.length}题 · 当前第 ${startIndex + 1} 题)`
    );
    setCurrentView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishAssessment = (
    answers?: Record<number, string>,
    evaluatedQuestions?: Question[]
  ) => {
    if (answers) {
      setUserAnswers(answers);
    }
    if (evaluatedQuestions) {
      setActiveQuestions(evaluatedQuestions);
    }
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetAllData = (startNewTestImmediately = false) => {
    sounds.playLockSuccess();
    setUserAnswers({});
    setActiveQuestions(undefined);
    setCurrentSubTitle('当前关卡：数据编码探秘');
    setSessionKey((prev) => prev + 1);

    if (startNewTestImmediately) {
      setCurrentView('assessment');
    } else {
      setCurrentView('lobby');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setToastMessage('✨ 测评环境已重置！所有答题记录与学员画像已清空，欢迎下一位探索学员！');
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  return (
    <div className="min-h-screen bg-[#F9FBF9] text-[#1b1c1c] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col antialiased selection:bg-[#07C160]/20 selection:text-[#006d33] relative">
      {/* Floating Success Toast Notification for Data Reset */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md text-slate-800 px-5 py-3 rounded-full shadow-xl border-2 border-[#07C160] flex items-center gap-2.5 text-xs sm:text-sm font-black">
            <div className="w-6 h-6 rounded-full bg-[#07C160] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Navigation Bar (Hidden during assessment mode for 100% full-screen cockpit immersion) */}
      {currentView !== 'assessment' && (
        <TopNavBar
          currentView={currentView}
          onNavigate={handleNavigate}
          onRequestReset={() => setShowResetModal(true)}
        />
      )}

      {/* Main Content Area depending on current active view */}
      <main key={sessionKey} className="flex-1 flex flex-col">
        {currentView === 'lobby' && (
          <LobbyView
            onStartCustomQuest={handleStartCustomQuest}
            onViewProfile={() => handleNavigate('profile')}
            onOpenQuestionBank={() => handleNavigate('bank')}
          />
        )}

        {currentView === 'bank' && (
          <QuestionBankView
            onStartQuestWithQuestions={handleStartQuestWithQuestions}
            onBackToLobby={() => handleNavigate('lobby')}
          />
        )}

        {currentView === 'assessment' && (
          <AssessmentView
            questionsList={activeQuestions}
            initialIndex={assessmentStartIndex}
            onBackToLobby={() => handleNavigate('lobby')}
            onFinishAssessment={handleFinishAssessment}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            userAnswers={userAnswers}
            evaluatedQuestions={activeQuestions}
            onRestartAssessment={() => handleNavigate('assessment')}
            onOpenQuestionBank={() => handleNavigate('bank')}
            onRequestReset={() => setShowResetModal(true)}
          />
        )}
      </main>

      {/* Global Reset / New Student Confirmation Modal (Mounted at Top Root Level) */}
      <ResetConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirmReset={(startNewTest) => {
          setShowResetModal(false);
          handleResetAllData(startNewTest);
        }}
      />
    </div>
  );
}
