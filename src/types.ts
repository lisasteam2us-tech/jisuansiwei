export type ViewMode = 'lobby' | 'assessment' | 'profile' | 'bank';

export type GradeLevel = '1-2' | '3-4' | '5-6';

// 4 Core Domains in the Children's Digital Competency Profile Model
export type DigitalDomain = '计算思维' | '数字创造' | '数据与AI素养' | '数字责任';

// Backward compatibility alias
export type CTDimension = DigitalDomain | '逻辑思维' | '算法理解' | '数据处理' | '创新应用';

// 15 Sub-Competencies categorized under the 4 Major Domains
export type SubCompetency =
  // A. 计算思维能力 (40%) - Bebras 体系
  | '分解'
  | '规律'
  | '抽象'
  | '算法'
  | '逻辑'
  // B. 数字创造能力 (30%) - 中国新课标特色
  | 'Scratch'
  | 'Python'
  | '机器人'
  | 'AI创作'
  // C. 数据与AI素养 (20%) - 前沿素养
  | '数据理解'
  | 'AI认知'
  | 'AI使用能力'
  // D. 数字责任 (10%) - 安全合规与伦理
  | '网络安全'
  | '隐私'
  | 'AI伦理';

export interface DomainMeta {
  key: DigitalDomain;
  name: string;
  weight: number; // 40, 30, 20, 10
  weightText: string; // '40%', '30%', '20%', '10%'
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  subSkills: SubCompetency[];
  referenceStandard: string;
  description: string;
}

export type BebrasCategory =
  | '模式识别'
  | '算法设计'
  | '数据编码'
  | '图论网络'
  | '逻辑抽象'
  | '信息意识'
  | '计算思维'
  | '数字化学习与创新';

export type ClueType =
  | 'bookshelf'
  | 'dam-pipeline'
  | 'beaver-bracelet'
  | 'pixel-matrix'
  | 'robot-maze'
  | 'network-graph'
  | 'sorting-scale'
  | 'firefly-logic'
  | 'flowchart'
  | 'binary'
  | 'stack-queue'
  | 'tree-graph'
  | 'state-machine'
  | 'grid-puzzle'
  | 'venn-logic'
  | 'cipher-code'
  | 'sorting-network'
  | 'water-flow'
  | 'card-matching'
  | 'timeline-schedule'
  | 'pattern-sequence'
  | 'hanoi-tower'
  | 'graph-coloring'
  | 'logic-gates'
  | 'barcode-scan'
  | 'gear-mesh'
  | 'decision-tree'
  | 'drone-grid'
  | 'conveyor-stack'
  | 'qr-mask'
  | 'llm-bpe'
  | 'zkp-cave'
  | 'consistent-hash'
  | 'mst-network'
  | 'hash-collision'
  | 'cnn-kernel'
  | 'dynamic-programming'
  | 'custom-svg';

export interface CampInfo {
  id: GradeLevel;
  title: string;
  gradeText: string;
  description: string;
  iconName: 'search' | 'lock' | 'tree';
  colorTheme: 'yellow' | 'green' | 'blue';
  highlighted?: boolean;
}

export interface QuestionOption {
  key: string;
  label: string;
  description: string;
  isCorrect?: boolean;
}

export interface StageHint {
  level: number;
  title: string;
  content: string;
}

export interface InformaticsConcept {
  title: string;
  coreConcept: string;
  realWorldApplication: string;
  icon?: string;
}

export interface Question {
  id: number;
  gradeLevel?: GradeLevel;
  year?: string; // '2021' ~ '2025' or '经典'
  source?: string; // e.g. "2024 Bebras Japan", "2025 国际真题"
  taskNumber?: number;
  totalTasks?: number;
  domain: DigitalDomain; // Main Domain: '计算思维' | '数字创造' | '数据与AI素养' | '数字责任'
  subSkill: SubCompetency; // Detailed Sub-skill: '分解' | '规律' | '抽象' | '算法' | '逻辑' | 'Scratch' | 'Python' | '机器人' | 'AI创作' | '数据理解' | 'AI认知' | 'AI使用能力' | '网络安全' | '隐私' | 'AI伦理'
  category: string; // e.g. "模式识别", "算法设计", "Scratch图形化"
  dimension?: CTDimension; // Alias for domain
  difficultyHearts: number; // 1, 2, or 3
  title?: string;
  stemText: string;
  storyContext?: string;
  highlightWords?: { text: string; type: 'green' | 'dark' | 'blue' | 'yellow' }[];
  clueBadgeText: string;
  clueType?: ClueType;
  audioPrompt?: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  mistakeReason?: string;
  hint?: string;
  stageHints?: StageHint[];
  informaticsConcept?: InformaticsConcept;
  division?: string;

}

export interface QuestConfig {
  gradeLevel: GradeLevel;
  mode: 'standard' | 'random' | 'dimension-focus';
  focusDimension?: CTDimension;
  focusDomain?: DigitalDomain;
  focusSubSkill?: SubCompetency;
  questionCount: number;
  yearFilter?: string; // 'all' | '2025' | '2024' | '2023'
}

export interface UserAssessmentState {
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string>;
  isSubmitted: Record<number, boolean>;
  timeRemainingSeconds: number;
  score: number;
  isCompleted: boolean;
}

export interface CapabilityScore {
  dimension: string; // Domain name
  domain?: DigitalDomain;
  weight?: number; // 40, 30, 20, 10
  weightText?: string;
  subSkills?: SubCompetency[];
  score: number; // 0 - 100
  fullScore: number;
  level: string;
  description: string;
  color: string;
  borderColor: string;
  iconName: string;
  answeredCount?: number;
  correctCount?: number;
  accuracyRate?: number; // 0 - 100%
  difficultyWeightedScore?: number;
  calculationNote?: string;
}

export interface QuestionDiagnostic {
  questionId: number;
  taskNumber?: number;
  stemText: string;
  storyContext?: string;
  domain: DigitalDomain;
  subSkill: SubCompetency;
  category: string;
  difficultyHearts: number;
  userAnswer?: string;
  correctAnswer: string;
  isCorrect: boolean;
  userOptionLabel?: string;
  correctOptionLabel?: string;
  explanation: string;
  mistakeReason?: string;
  informaticsConcept?: InformaticsConcept;
  division?: string;

}

export interface SubSkillMastery {
  name: SubCompetency;
  domain: DigitalDomain;
  total: number;
  correct: number;
  accuracy: number;
  masteryLevel: '精通' | '熟练' | '需加强' | '未考查';
  description: string;
}

export interface CognitiveDiagnostics {
  strengths: {
    title: string;
    description: string;
    subSkill: string;
    domain: DigitalDomain;
  }[];
  weaknesses: {
    title: string;
    description: string;
    subSkill: string;
    domain: DigitalDomain;
    causeAnalysis: string;
    actionAdvice: string;
  }[];
  cognitiveStage: {
    stageName: string;
    stageTitle: string;
    description: string;
    currentMilestone: string;
    nextMilestone: string;
  };
  difficultyStats: {
    level1: { total: number; correct: number; accuracy: number };
    level2: { total: number; correct: number; accuracy: number };
    level3: { total: number; correct: number; accuracy: number };
  };
  overallAccuracyRate: number;
  scoreExplanation: string;
}

export interface DimensionScoreData {
  subject: string;
  score: number;
  fullMark: number;
  level: string;
  benchmark: number; // 同龄人均值
}

export interface AdviseTask {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'green' | 'blue' | 'yellow' | 'red';
}

export interface RecommendedCourse {
  id: string;
  title: string;
  tag: string;
  duration: string;
  level: string;
  description: string;
  targetSkill: string;
  iconName: string;
  type: 'video' | 'practice' | 'project';
}

export interface DimensionAdvice {
  dimension: string;
  keyChallenge: string;
  diagnosis: string;
  recommendedCourses: RecommendedCourse[];
  tasks: AdviseTask[];
}

