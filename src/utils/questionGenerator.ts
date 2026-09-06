import { ALL_BEBRAS_QUESTIONS } from '../data/questions';
import { GradeLevel, Question, DigitalDomain, SubCompetency } from '../types';

export interface GenerateQuestOptions {
  gradeLevel?: GradeLevel;
  count?: number;
  mode?: 'standard' | 'random' | 'dimension-focus';
  focusDimension?: string;
  focusDomain?: DigitalDomain;
  focusSubSkill?: SubCompetency;
  yearFilter?: 'all' | '2021' | '2022' | '2023' | '2024' | '2025' | '经典' | string;
  selectedQuestionIds?: number[];
}

/**
 * Generates a structured sequence of questions for assessment based on the 4-Domain Competency Model:
 * A. 计算思维能力 (40%)
 * B. 数字创造能力 (30%)
 * C. 数据与AI素养 (20%)
 * D. 数字责任 (10%)
 */
export function generateQuest(options: GenerateQuestOptions = {}): Question[] {
  const {
    gradeLevel = '3-4',
    count = 10,
    mode = 'random',
    focusDimension,
    focusDomain,
    focusSubSkill,
    yearFilter = 'all',
    selectedQuestionIds,
  } = options;

  let candidatePool = [...ALL_BEBRAS_QUESTIONS];

  // Specific IDs requested (e.g. from Question Bank Explorer)
  if (selectedQuestionIds && selectedQuestionIds.length > 0) {
    const specificList = candidatePool.filter((q) => selectedQuestionIds.includes(q.id));
    if (specificList.length > 0) {
      return specificList.map((q, idx) => ({
        ...q,
        taskNumber: idx + 1,
        totalTasks: specificList.length,
      }));
    }
  }

  // Filter by Grade
  if (gradeLevel) {
    const gradeMatches = candidatePool.filter((q) => q.gradeLevel === gradeLevel);
    if (gradeMatches.length > 0) {
      candidatePool = gradeMatches;
    }
  }

  // Filter by Year if specified
  if (yearFilter && yearFilter !== 'all') {
    const yearMatches = candidatePool.filter((q) => {
      if (yearFilter === '经典') {
        return !q.year || q.year === '经典';
      }
      return q.year === yearFilter;
    });
    if (yearMatches.length > 0) {
      candidatePool = yearMatches;
    }
  }

  // Filter by Domain or Sub-skill if in focus mode
  const targetDomain = focusDomain || (focusDimension as DigitalDomain);
  if (mode === 'dimension-focus' && targetDomain) {
    const dimMatches = candidatePool.filter(
      (q) => q.domain === targetDomain || q.dimension === targetDomain
    );
    if (dimMatches.length > 0) {
      candidatePool = dimMatches;
    }
  }

  if (focusSubSkill) {
    const subMatches = candidatePool.filter((q) => q.subSkill === focusSubSkill);
    if (subMatches.length > 0) {
      candidatePool = subMatches;
    }
  }

  let selected: Question[] = [];

  if (mode === 'random') {
    // Balanced allocation according to the 4 modules:
    // A: 40%, B: 30%, C: 20%, D: 10%
    const targetA = Math.max(1, Math.round(count * 0.40));
    const targetB = Math.max(1, Math.round(count * 0.30));
    const targetC = Math.max(1, Math.round(count * 0.20));
    const targetD = Math.max(1, count - (targetA + targetB + targetC));

    const poolA = candidatePool.filter((q) => q.domain === '计算思维' || (!q.domain && q.dimension === '计算思维'));
    const poolB = candidatePool.filter((q) => q.domain === '数字创造' || (!q.domain && q.dimension === '数字创造'));
    const poolC = candidatePool.filter((q) => q.domain === '数据与AI素养' || (!q.domain && q.dimension === '数据与AI素养'));
    const poolD = candidatePool.filter((q) => q.domain === '数字责任' || (!q.domain && q.dimension === '数字责任'));

    const sampleRandom = (pool: Question[], targetNum: number): Question[] => {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, targetNum);
    };

    const sampledA = sampleRandom(poolA, targetA);
    const sampledB = sampleRandom(poolB, targetB);
    const sampledC = sampleRandom(poolC, targetC);
    const sampledD = sampleRandom(poolD, targetD);

    const gathered = [...sampledA, ...sampledB, ...sampledC, ...sampledD];
    const gatheredIds = new Set(gathered.map((q) => q.id));

    // If still need more to meet exact count, pick from remaining candidates
    if (gathered.length < count) {
      const remainder = candidatePool.filter((q) => !gatheredIds.has(q.id)).sort(() => Math.random() - 0.5);
      gathered.push(...remainder.slice(0, count - gathered.length));
    }

    // Shuffle the final quest sequence so it flows naturally
    selected = gathered.sort(() => Math.random() - 0.5).slice(0, count);
  } else {
    // Standard ordered
    selected = candidatePool.slice(0, Math.min(count, candidatePool.length));
  }

  // Normalize taskNumber, totalTasks and shuffle options so A/B/C/D are evenly distributed
  return selected.map((q, idx) => {
    const shuffledQ = shuffleQuestionOptions(q);
    return {
      ...shuffledQ,
      taskNumber: idx + 1,
      totalTasks: selected.length,
    };
  });
}

/**
 * Shuffles options for a question and synchronizes the correctAnswer key
 */
export function shuffleQuestionOptions(q: Question): Question {
  if (!q.options || q.options.length <= 1) return q;

  const originalCorrectOpt = q.options.find((o) => o.key === q.correctAnswer) || q.options[0];
  const shuffledRaw = [...q.options].sort(() => Math.random() - 0.5);
  const keys = ['A', 'B', 'C', 'D', 'E', 'F'];
  let newCorrectKey = 'A';

  const remappedOptions = shuffledRaw.map((opt, idx) => {
    const key = keys[idx] || String.fromCharCode(65 + idx);
    if (opt.label === originalCorrectOpt.label && opt.description === originalCorrectOpt.description) {
      newCorrectKey = key;
    }
    return {
      ...opt,
      key,
    };
  });

  return {
    ...q,
    options: remappedOptions,
    correctAnswer: newCorrectKey,
  };
}


/**
 * Returns statistics for the Question Bank Explorer across the 4 Core Domains & 15 Sub-skills
 */
export function getQuestionBankStats() {
  const totalQuestions = ALL_BEBRAS_QUESTIONS.length;
  const gradeCounts: Record<GradeLevel, number> = {
    '1-2': 0,
    '3-4': 0,
    '5-6': 0,
  };
  const domainCounts: Record<DigitalDomain, number> = {
    计算思维: 0,
    数字创造: 0,
    数据与AI素养: 0,
    数字责任: 0,
  };
  const subSkillCounts: Record<string, number> = {};
  const yearCounts: Record<string, number> = {
    '2021': 0,
    '2022': 0,
    '2023': 0,
    '2024': 0,
    '2025': 0,
    经典: 0,
  };
  const categoryCounts: Record<string, number> = {};

  ALL_BEBRAS_QUESTIONS.forEach((q) => {
    if (q.gradeLevel) {
      gradeCounts[q.gradeLevel] = (gradeCounts[q.gradeLevel] || 0) + 1;
    }
    const dom: DigitalDomain = q.domain || (q.dimension as DigitalDomain) || '计算思维';
    domainCounts[dom] = (domainCounts[dom] || 0) + 1;

    if (q.subSkill) {
      subSkillCounts[q.subSkill] = (subSkillCounts[q.subSkill] || 0) + 1;
    }
    const yr = q.year || '经典';
    yearCounts[yr] = (yearCounts[yr] || 0) + 1;
    categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
  });

  return {
    totalQuestions,
    gradeCounts,
    domainCounts,
    subSkillCounts,
    yearCounts,
    categoryCounts,
  };
}
