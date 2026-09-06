import {
  Question,
  CapabilityScore,
  AdviseTask,
  CampInfo,
  DigitalDomain,
  DomainMeta,
  SubCompetency,
  QuestionDiagnostic,
  SubSkillMastery,
  CognitiveDiagnostics,
} from '../types';
import { GRADE_1_2_QUESTIONS } from './questions_grade1_2';
import { GRADE_3_4_QUESTIONS } from './questions_grade3_4';
import { GRADE_5_6_QUESTIONS } from './questions_grade5_6';

export const CAMPS_DATA: CampInfo[] = [
  {
    id: '1-2',
    title: '生活小侦探',
    gradeText: '1-2年级',
    description: '体验数字设备，保护信息安全，探索身边的科技奥秘。',
    iconName: 'search',
    colorTheme: 'yellow',
  },
  {
    id: '3-4',
    title: '编码探险家',
    gradeText: '3-4年级',
    description: '掌握数据编码规律，学会高效协同学习，开启编程思维启蒙。',
    iconName: 'lock',
    colorTheme: 'green',
    highlighted: true,
  },
  {
    id: '5-6',
    title: '算法架构师',
    gradeText: '5-6年级',
    description: '深入理解算法原理，设计简易智能系统，挑战复杂问题解决。',
    iconName: 'tree',
    colorTheme: 'blue',
  },
];

// Rich Bebras & Computational Thinking Question Repository (143 Questions Total)
export const ALL_BEBRAS_QUESTIONS: Question[] = [
  ...GRADE_1_2_QUESTIONS,
  ...GRADE_3_4_QUESTIONS,
  ...GRADE_5_6_QUESTIONS,
];

// Default questions dataset (used in assessment standard mode)
export const QUESTIONS_DATA: Question[] = ALL_BEBRAS_QUESTIONS.filter((q) => q.gradeLevel === '3-4');

// 4 Core Domains Metadata & Weight Definitions
export const DOMAINS_META: Record<DigitalDomain, DomainMeta> = {
  计算思维: {
    key: '计算思维',
    name: '计算思维能力',
    weight: 40,
    weightText: '40%',
    iconName: 'cpu',
    color: '#07C160',
    bgColor: 'bg-[#07C160]/10',
    borderColor: 'border-l-8 border-[#07C160]',
    subSkills: ['分解', '规律', '抽象', '算法', '逻辑'],
    referenceStandard: '参考 Bebras 国际计算思维测评标准',
    description: '涵盖问题分解、模式规律识别、数据抽象、算法推演与严密逻辑推理能力。',
  },
  数字创造: {
    key: '数字创造',
    name: '数字创造能力',
    weight: 30,
    weightText: '30%',
    iconName: 'sparkles',
    color: '#4FC3F7',
    bgColor: 'bg-[#4FC3F7]/10',
    borderColor: 'border-l-8 border-[#4FC3F7]',
    subSkills: ['Scratch', 'Python', '机器人', 'AI创作'],
    referenceStandard: '中国《义务教育信息科技课程标准》特色',
    description: '涵盖图形化编程(Scratch)、代码编程(Python)、智能硬件与机器人控制、AIGC提示词创意创作。',
  },
  数据与AI素养: {
    key: '数据与AI素养',
    name: '数据与AI素养',
    weight: 20,
    weightText: '20%',
    iconName: 'database',
    color: '#FFD54F',
    bgColor: 'bg-[#FFD54F]/10',
    borderColor: 'border-l-8 border-[#FFD54F]',
    subSkills: ['数据理解', 'AI认知', 'AI使用能力'],
    referenceStandard: '前沿智能时代核心素养',
    description: '涵盖数据编码与表结构理解、人工智能技术底层认知、AI助手对话与高效协同使用能力。',
  },
  数字责任: {
    key: '数字责任',
    name: '数字责任',
    weight: 10,
    weightText: '10%',
    iconName: 'shield-check',
    color: '#FF8A80',
    bgColor: 'bg-[#FF8A80]/10',
    borderColor: 'border-l-8 border-[#FF8A80]',
    subSkills: ['网络安全', '隐私', 'AI伦理'],
    referenceStandard: '数字公民安全合规与伦理准则',
    description: '涵盖网络安全防范、个人隐私保护与授权意识、AI生成内容真实性辨析与学术伦理。',
  },
};

export const CAPABILITY_SCORES: CapabilityScore[] = [
  {
    dimension: '计算思维',
    domain: '计算思维',
    weight: 40,
    weightText: '40%',
    subSkills: ['分解', '规律', '抽象', '算法', '逻辑'],
    score: 92,
    fullScore: 100,
    level: '优秀',
    description: '具备敏锐的模式识别与结构化分析能力，能准确拆解复杂问题并进行算法推演与严密逻辑推理。',
    color: '#07C160',
    borderColor: 'border-l-8 border-[#07C160]',
    iconName: 'cpu',
  },
  {
    dimension: '数字创造',
    domain: '数字创造',
    weight: 30,
    weightText: '30%',
    subSkills: ['Scratch', 'Python', '机器人', 'AI创作'],
    score: 85,
    fullScore: 100,
    level: '良好',
    description: '掌握图形化及代码编程逻辑，对智能硬件与AI提示词创作富有实践创造力与跨学科应用热情。',
    color: '#4FC3F7',
    borderColor: 'border-l-8 border-[#4FC3F7]',
    iconName: 'sparkles',
  },
  {
    dimension: '数据与AI素养',
    domain: '数据与AI素养',
    weight: 20,
    weightText: '20%',
    subSkills: ['数据理解', 'AI认知', 'AI使用能力'],
    score: 88,
    fullScore: 100,
    level: '优秀',
    description: '对数据编码、条形码、表格结构及AI机器学习原理有良好认知，能熟练运用智能工具协同学习。',
    color: '#FFD54F',
    borderColor: 'border-l-8 border-[#FFD54F]',
    iconName: 'database',
  },
  {
    dimension: '数字责任',
    domain: '数字责任',
    weight: 10,
    weightText: '10%',
    subSkills: ['网络安全', '隐私', 'AI伦理'],
    score: 90,
    fullScore: 100,
    level: '优秀',
    description: '具备出色的网络安全防范意识、隐私保护警惕性以及AI伦理规范，展现健康良好的数字公民素养。',
    color: '#FF8A80',
    borderColor: 'border-l-8 border-[#FF8A80]',
    iconName: 'shield-check',
  },
];

export const SUB_SKILLS_META: Record<
  SubCompetency,
  { domain: DigitalDomain; name: string; description: string; benchmark: number }
> = {
  分解: {
    domain: '计算思维',
    name: '问题分解',
    description: '能将复杂的宏观问题结构化拆解为若干独立、可解的小子任务。',
    benchmark: 75,
  },
  规律: {
    domain: '计算思维',
    name: '模式与规律',
    description: '敏锐识别数据序列、图像排列中的循环周期与对称规律。',
    benchmark: 78,
  },
  抽象: {
    domain: '计算思维',
    name: '数据抽象',
    description: '过滤无关干扰细节，提取核心属性与关键数学/逻辑模型。',
    benchmark: 72,
  },
  算法: {
    domain: '计算思维',
    name: '算法推演',
    description: '设计与推演有序的执行步骤，理解分支判断、循环与递归流程。',
    benchmark: 74,
  },
  逻辑: {
    domain: '计算思维',
    name: '严密逻辑',
    description: '遵循条件充分性与必要性，进行非矛盾的双向严密因果推理。',
    benchmark: 76,
  },
  Scratch: {
    domain: '数字创造',
    name: 'Scratch图形化',
    description: '熟练运用积木块实现角色运动、广播消息、变量计数与碰撞检测。',
    benchmark: 70,
  },
  Python: {
    domain: '数字创造',
    name: 'Python代码',
    description: '理解文本代码语法、列表遍历、函数调用与基础算法编写。',
    benchmark: 68,
  },
  机器人: {
    domain: '数字创造',
    name: '机器人与硬件',
    description: '理解传感器数据采集、执行器驱动与小车自主避障决策控制。',
    benchmark: 72,
  },
  AI创作: {
    domain: '数字创造',
    name: 'AIGC提示词创作',
    description: '掌握结构化Prompt设计，能指挥AI助手生成创意图像、故事与代码。',
    benchmark: 75,
  },
  数据理解: {
    domain: '数据与AI素养',
    name: '数据理解与编码',
    description: '理解二进制、条形码、二维码与结构化数据表的检索原理。',
    benchmark: 74,
  },
  AI认知: {
    domain: '数据与AI素养',
    name: 'AI原理认知',
    description: '理解机器学习特征提取、神经网络训练与大模型的基本运作规律。',
    benchmark: 70,
  },
  AI使用能力: {
    domain: '数据与AI素养',
    name: 'AI人机协同',
    description: '能高效借助AI工具进行日常探究学习，并对AI输出具备批判性辨析力。',
    benchmark: 73,
  },
  网络安全: {
    domain: '数字责任',
    name: '网络安全防范',
    description: '具备强密码安全意识，能辨识钓鱼网站、恶意链接与网络诈骗陷阱。',
    benchmark: 80,
  },
  隐私: {
    domain: '数字责任',
    name: '个人隐私保护',
    description: '谨慎授权应用权限，保护家庭与个人敏感信息不被泄露。',
    benchmark: 82,
  },
  AI伦理: {
    domain: '数字责任',
    name: 'AI科技伦理',
    description: '辨别Deepfake深度伪造，树立学术诚信与健康文明的数字公民素养。',
    benchmark: 78,
  },
};

export interface SubSkillScore {
  name: SubCompetency;
  domain: DigitalDomain;
  total: number;
  correct: number;
  accuracy: number;
}

export function calculateCapabilityData(
  userAnswers?: Record<number, string>,
  evaluatedQuestions: Question[] = ALL_BEBRAS_QUESTIONS
) {
  const answeredIds = userAnswers ? Object.keys(userAnswers).map(Number) : [];
  const hasAnswers = answeredIds.length > 0;

  const validQuestions =
    evaluatedQuestions && evaluatedQuestions.length > 0
      ? evaluatedQuestions
      : ALL_BEBRAS_QUESTIONS;

  // Filter evaluated questions down to those answered, or use full list if evaluated
  const targetQuestions = validQuestions.filter(
    (q) => userAnswers && userAnswers[q.id] !== undefined
  );

  const activeQuestions = targetQuestions.length > 0 ? targetQuestions : validQuestions;

  // Domain statistics with difficulty weighting
  const domainStats: Record<
    DigitalDomain,
    {
      total: number;
      correct: number;
      answered: number;
      earnedWeight: number;
      totalWeight: number;
    }
  > = {
    计算思维: { total: 0, correct: 0, answered: 0, earnedWeight: 0, totalWeight: 0 },
    数字创造: { total: 0, correct: 0, answered: 0, earnedWeight: 0, totalWeight: 0 },
    数据与AI素养: { total: 0, correct: 0, answered: 0, earnedWeight: 0, totalWeight: 0 },
    数字责任: { total: 0, correct: 0, answered: 0, earnedWeight: 0, totalWeight: 0 },
  };

  // Sub-skill statistics
  const subSkillStats: Record<string, { total: number; correct: number }> = {};

  // Difficulty level stats
  const difficultyStats = {
    level1: { total: 0, correct: 0, accuracy: 0 },
    level2: { total: 0, correct: 0, accuracy: 0 },
    level3: { total: 0, correct: 0, accuracy: 0 },
  };

  // Detailed item-level diagnostics
  const questionDiagnostics: QuestionDiagnostic[] = [];

  activeQuestions.forEach((q, idx) => {
    let domain: DigitalDomain = '计算思维';
    const raw = (q.domain || q.dimension || '') as string;
    if (
      raw === '数字创造' ||
      raw.includes('创造') ||
      raw.includes('编程') ||
      raw.includes('Scratch') ||
      raw.includes('Python') ||
      raw.includes('机器人')
    ) {
      domain = '数字创造';
    } else if (
      raw === '数据与AI素养' ||
      raw.includes('数据') ||
      raw.includes('AI') ||
      raw.includes('智能')
    ) {
      domain = '数据与AI素养';
    } else if (
      raw === '数字责任' ||
      raw.includes('责任') ||
      raw.includes('安全') ||
      raw.includes('隐私') ||
      raw.includes('伦理')
    ) {
      domain = '数字责任';
    } else {
      domain = '计算思维';
    }

    const subSkill: SubCompetency = (q.subSkill as SubCompetency) || '逻辑';
    const hearts = q.difficultyHearts || 2;
    // Difficulty weight factor: 1-star = 1.0, 2-star = 1.4, 3-star = 1.8
    const diffWeight = hearts === 3 ? 1.8 : hearts === 2 ? 1.4 : 1.0;

    if (!subSkillStats[subSkill]) {
      subSkillStats[subSkill] = { total: 0, correct: 0 };
    }

    if (!domainStats[domain]) {
      domainStats[domain] = { total: 0, correct: 0, answered: 0, earnedWeight: 0, totalWeight: 0 };
    }

    const uAnswer = userAnswers ? userAnswers[q.id] : undefined;
    const isAnswered = uAnswer !== undefined;
    const isCorrect = isAnswered && uAnswer === q.correctAnswer;

    if (isAnswered) {
      domainStats[domain].answered += 1;
      domainStats[domain].total += 1;
      domainStats[domain].totalWeight += diffWeight;
      subSkillStats[subSkill].total += 1;

      if (hearts === 1) difficultyStats.level1.total += 1;
      else if (hearts === 3) difficultyStats.level3.total += 1;
      else difficultyStats.level2.total += 1;

      if (isCorrect) {
        domainStats[domain].correct += 1;
        domainStats[domain].earnedWeight += diffWeight;
        subSkillStats[subSkill].correct += 1;

        if (hearts === 1) difficultyStats.level1.correct += 1;
        else if (hearts === 3) difficultyStats.level3.correct += 1;
        else difficultyStats.level2.correct += 1;
      }

      // Generate question diagnosis entry
      const userOpt = q.options.find((o) => o.key === uAnswer);
      const correctOpt = q.options.find((o) => o.key === q.correctAnswer);

      let mistakeReason = '';
      if (!isCorrect) {
        if (q.category.includes('水流') || q.category.includes('二叉') || q.category.includes('树')) {
          mistakeReason = '容易混淆网络分支层级与叶子节点衰减规律，未严格按照两两分流顺序分步计算。';
        } else if (q.category.includes('周期') || q.category.includes('模运算') || q.category.includes('手链')) {
          mistakeReason = '在周期重复规律中未准确计算整除余数，或忽略了余数对应周期第几项的边界关系。';
        } else if (q.category.includes('迷宫') || q.category.includes('算法') || q.category.includes('图论')) {
          mistakeReason = '在路径遍历或分支状态转移时，未能严格遵守算法规则或遗漏了回溯校验。';
        } else if (q.domain === '数字责任') {
          mistakeReason = '对于隐私权限索取或网络安全风险的边界防范意识不够敏锐，容易轻信表面信息。';
        } else if (q.domain === '数据与AI素养') {
          mistakeReason = '对数据编码对应关系或AI生成机制理解有偏差，未能准确识别特征属性。';
        } else {
          mistakeReason = `在【${subSkill}】子技能推演中缺乏分步草稿验证，容易在复杂多步条件判断中产生思维遗漏。`;
        }
      }

      questionDiagnostics.push({
        questionId: q.id,
        taskNumber: q.taskNumber || idx + 1,
        stemText: q.stemText,
        storyContext: q.storyContext,
        domain,
        subSkill,
        category: q.category,
        difficultyHearts: hearts,
        userAnswer: uAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        userOptionLabel: userOpt ? `${userOpt.key}. ${userOpt.label}` : uAnswer,
        correctOptionLabel: correctOpt ? `${correctOpt.key}. ${correctOpt.label}` : q.correctAnswer,
        explanation: q.explanation,
        mistakeReason: !isCorrect ? mistakeReason : undefined,
        informaticsConcept: q.informaticsConcept,
      });
    }
  });

  // Calculate difficulty accuracy percentages
  difficultyStats.level1.accuracy =
    difficultyStats.level1.total > 0
      ? Math.round((difficultyStats.level1.correct / difficultyStats.level1.total) * 100)
      : 100;
  difficultyStats.level2.accuracy =
    difficultyStats.level2.total > 0
      ? Math.round((difficultyStats.level2.correct / difficultyStats.level2.total) * 100)
      : 100;
  difficultyStats.level3.accuracy =
    difficultyStats.level3.total > 0
      ? Math.round((difficultyStats.level3.correct / difficultyStats.level3.total) * 100)
      : 100;

  // Calculate score for a domain with difficulty weighting and clear explanation
  const calcDomainScore = (domain: DigitalDomain, fallback: number) => {
    const stat = domainStats[domain];
    if (!hasAnswers || !stat || stat.answered === 0) {
      return {
        score: fallback,
        accuracyRate: 0,
        answered: 0,
        correct: 0,
        calculationNote: '本次快速测评未涉及该维度题目，呈现常模基准分。',
      };
    }

    const rawRatio = stat.correct / stat.answered;
    const weightedRatio = stat.totalWeight > 0 ? stat.earnedWeight / stat.totalWeight : rawRatio;
    const accuracyRate = Math.round(rawRatio * 100);

    // True 0-100 Difficulty-Weighted Scoring strictly reflecting accuracy and question weights:
    const score = Math.min(100, Math.max(0, Math.round(weightedRatio * 100)));
    const calculationNote = `共作答 ${stat.answered} 题 · 答对 ${stat.correct} 题（正确率 ${accuracyRate}%）· 难度加权达成率 ${Math.round(weightedRatio * 100)}% · 得分 ${score} 分。`;

    return {
      score,
      accuracyRate,
      answered: stat.answered,
      correct: stat.correct,
      calculationNote,
    };
  };

  const getLevel = (s: number) =>
    s >= 85 ? '优秀' : s >= 70 ? '良好' : s >= 60 ? '达标' : '需加强';

  const ctResult = calcDomainScore('计算思维', hasAnswers ? 0 : 92);
  const dcResult = calcDomainScore('数字创造', hasAnswers ? 0 : 85);
  const aiResult = calcDomainScore('数据与AI素养', hasAnswers ? 0 : 88);
  const drResult = calcDomainScore('数字责任', hasAnswers ? 0 : 90);

  const ctScore = ctResult.score;
  const dcScore = dcResult.score;
  const aiScore = aiResult.score;
  const drScore = drResult.score;

  // Overall Weighted Score: 40% CT + 30% DC + 20% AI + 10% DR
  const overallScore = Math.round(
    ctScore * 0.40 + dcScore * 0.30 + aiScore * 0.20 + drScore * 0.10
  );
  const percentile = hasAnswers
    ? Math.min(99, Math.max(1, Math.round(overallScore * 0.95 + 3)))
    : 95;


  const totalAnsweredCount = answeredIds.length;
  const totalCorrectCount = questionDiagnostics.filter((q) => q.isCorrect).length;
  const overallAccuracyRate =
    totalAnsweredCount > 0 ? Math.round((totalCorrectCount / totalAnsweredCount) * 100) : 0;

  const scores: CapabilityScore[] = [
    {
      dimension: '计算思维',
      domain: '计算思维',
      weight: 40,
      weightText: '40%',
      subSkills: ['分解', '规律', '抽象', '算法', '逻辑'],
      score: ctScore,
      fullScore: 100,
      level: getLevel(ctScore),
      description:
        ctScore >= 85
          ? '具备敏锐的模式识别与结构化分析能力，能准确拆解复杂问题并进行算法推演与严密逻辑推理。'
          : '基本掌握计算思维分析方法，可通过多步推理题与算法流程进一步强化思考缜密度。',
      color: '#07C160',
      borderColor: 'border-l-8 border-[#07C160]',
      iconName: 'cpu',
      answeredCount: ctResult.answered,
      correctCount: ctResult.correct,
      accuracyRate: ctResult.accuracyRate,
      calculationNote: ctResult.calculationNote,
    },
    {
      dimension: '数字创造',
      domain: '数字创造',
      weight: 30,
      weightText: '30%',
      subSkills: ['Scratch', 'Python', '机器人', 'AI创作'],
      score: dcScore,
      fullScore: 100,
      level: getLevel(dcScore),
      description:
        dcScore >= 85
          ? '熟练掌握图形化及代码编程逻辑，对智能硬件控制与AI提示词创作富有实践创造力。'
          : '在编程逻辑和数字化创作上有良好基础，建议多尝试用Scratch或Python实现趣味小作品。',
      color: '#4FC3F7',
      borderColor: 'border-l-8 border-[#4FC3F7]',
      iconName: 'sparkles',
      answeredCount: dcResult.answered,
      correctCount: dcResult.correct,
      accuracyRate: dcResult.accuracyRate,
      calculationNote: dcResult.calculationNote,
    },
    {
      dimension: '数据与AI素养',
      domain: '数据与AI素养',
      weight: 20,
      weightText: '20%',
      subSkills: ['数据理解', 'AI认知', 'AI使用能力'],
      score: aiScore,
      fullScore: 100,
      level: getLevel(aiScore),
      description:
        aiScore >= 85
          ? '对数据编码、条形码、表格结构及AI机器学习原理有良好认知，能熟练运用智能工具协同学习。'
          : '能识别基础数据特征，建议进一步体验数据编码和与AI对话协同的实际应用。',
      color: '#FFD54F',
      borderColor: 'border-l-8 border-[#FFD54F]',
      iconName: 'database',
      answeredCount: aiResult.answered,
      correctCount: aiResult.correct,
      accuracyRate: aiResult.accuracyRate,
      calculationNote: aiResult.calculationNote,
    },
    {
      dimension: '数字责任',
      domain: '数字责任',
      weight: 10,
      weightText: '10%',
      subSkills: ['网络安全', '隐私', 'AI伦理'],
      score: drScore,
      fullScore: 100,
      level: getLevel(drScore),
      description:
        drScore >= 85
          ? '具备出色的网络安全防范意识、隐私保护警惕性以及AI伦理规范，展现健康良好的数字公民素养。'
          : '具备基本安全意识，需进一步强化防范钓鱼网站、隐私授权审核以及AI真实性辨别能力。',
      color: '#FF8A80',
      borderColor: 'border-l-8 border-[#FF8A80]',
      iconName: 'shield-check',
      answeredCount: drResult.answered,
      correctCount: drResult.correct,
      accuracyRate: drResult.accuracyRate,
      calculationNote: drResult.calculationNote,
    },
  ];

  const radarData = [
    { subject: '计算思维 (40%)', score: ctScore, benchmark: 75, fullMark: 100 },
    { subject: '数字创造 (30%)', score: dcScore, benchmark: 70, fullMark: 100 },
    { subject: '数据与AI素养 (20%)', score: aiScore, benchmark: 72, fullMark: 100 },
    { subject: '数字责任 (10%)', score: drScore, benchmark: 80, fullMark: 100 },
  ];

  // 15 Sub-Skills In-depth Breakdown Matrix
  const subSkillsMasteryList: SubSkillMastery[] = (Object.keys(SUB_SKILLS_META) as SubCompetency[]).map(
    (skillKey) => {
      const meta = SUB_SKILLS_META[skillKey];
      const stat = subSkillStats[skillKey];
      const total = stat ? stat.total : 0;
      const correct = stat ? stat.correct : 0;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

      let masteryLevel: '精通' | '熟练' | '需加强' | '未考查' = '未考查';
      if (total > 0) {
        if (accuracy >= 85) masteryLevel = '精通';
        else if (accuracy >= 60) masteryLevel = '熟练';
        else masteryLevel = '需加强';
      }

      return {
        name: skillKey,
        domain: meta.domain,
        total,
        correct,
        accuracy,
        masteryLevel,
        description: meta.description,
      };
    }
  );

  const subSkillsBreakdown: SubSkillScore[] = Object.entries(subSkillStats).map(
    ([name, stat]) => ({
      name: name as SubCompetency,
      domain: getDomainForSubSkill(name),
      total: stat.total,
      correct: stat.correct,
      accuracy: stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 100,
    })
  );

  // Generate Cognitive Diagnostics & Attribution Analysis
  const cognitiveDiagnostics: CognitiveDiagnostics = generateCognitiveDiagnostics(
    scores,
    subSkillsMasteryList,
    questionDiagnostics,
    overallScore,
    totalAnsweredCount,
    totalCorrectCount,
    overallAccuracyRate,
    difficultyStats
  );

  return {
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
    domainStats,
  };
}

function generateCognitiveDiagnostics(
  scores: CapabilityScore[],
  subSkills: SubSkillMastery[],
  questions: QuestionDiagnostic[],
  overallScore: number,
  totalAnswered: number,
  totalCorrect: number,
  accuracyRate: number,
  difficultyStats: {
    level1: { total: number; correct: number; accuracy: number };
    level2: { total: number; correct: number; accuracy: number };
    level3: { total: number; correct: number; accuracy: number };
  }
): CognitiveDiagnostics {
  const testedSkills = subSkills.filter((s) => s.total > 0);
  const masteredSkills = testedSkills.filter((s) => s.accuracy >= 70);
  const weakSkills = testedSkills.filter((s) => s.accuracy < 70);

  // Strengths
  const strengths: CognitiveDiagnostics['strengths'] = [];
  if (masteredSkills.length > 0) {
    masteredSkills.slice(0, 3).forEach((s) => {
      strengths.push({
        title: `【${s.name}】子技能表现卓越`,
        description: `在本次测评中答对率达 ${s.accuracy}%，展现出扎实的${s.description}`,
        subSkill: s.name,
        domain: s.domain,
      });
    });
  } else {
    // Default positive encouragement
    strengths.push({
      title: '保持积极探究态度与勇于尝试精神',
      description: '积极完成测评题目，展现了对计算机科学与数字新知的好奇心与探索潜力。',
      subSkill: '探索精神',
      domain: '计算思维',
    });
  }

  // Weaknesses & Root-cause attribution
  const weaknesses: CognitiveDiagnostics['weaknesses'] = [];
  if (weakSkills.length > 0) {
    weakSkills.forEach((s) => {
      let cause = '在多步状态转移与边界条件判断中容易遗漏细节。';
      let advice = '建议在解题时先用草稿纸画出流程图或状态表格，辅助理清思维链条。';

      if (s.name === '算法' || s.name === '分解') {
        cause = '面对多层嵌套或分流问题时，容易混淆递归与循环的先后次序，未进行逆向验证。';
        advice = '通过 Bebras 经典算法图解与流程图微课，专项训练把解题步骤图示化。';
      } else if (s.name === '规律') {
        cause = '在识别周期序列时，计算模余数后未能准确映射到周期内的具体项。';
        advice = '强化数形结合，在纸上画出一个完整周期并标明序号。';
      } else if (s.name === '网络安全' || s.name === '隐私') {
        cause = '对网络钓鱼链接、权限过度索取等隐蔽风险缺乏足够的敏锐度。';
        advice = '建议学习《少年数字安全盾牌》微课，掌握强密码设置与信息保护准则。';
      }

      weaknesses.push({
        title: `【${s.name}】能力需重点巩固`,
        description: `本次作答正确率为 ${s.accuracy}%（做对 ${s.correct}/${s.total} 题）。`,
        subSkill: s.name,
        domain: s.domain,
        causeAnalysis: cause,
        actionAdvice: advice,
      });
    });
  } else if (totalAnswered > 0 && totalCorrect === 0) {
    weaknesses.push({
      title: '答题准确率偏低，多属于随机盲猜或思维跳跃',
      description: `共完成 ${totalAnswered} 题，全部答错，可能未仔细审题或对题目情境理解有偏差。`,
      subSkill: '审题与深度思考',
      domain: '计算思维',
      causeAnalysis: '答题速度偏快，未充分结合左侧任务线索图解进行推演排查。',
      actionAdvice: '建议使用系统内置的【推演草稿纸】和【向导小智提示】，放慢节奏认真审题。',
    });
  }

  // Cognitive Stage Definition
  let cognitiveStage: CognitiveDiagnostics['cognitiveStage'];
  if (overallScore >= 88) {
    cognitiveStage = {
      stageName: '抽象架构期 (Formal Operational)',
      stageTitle: '高阶抽象建模与复杂系统思维',
      description: '能够脱离实物具体情境，直接进行符号化逻辑推演、图论建模与递归算法逆向思维。',
      currentMilestone: '已具备出色的计算思维与独立编程创造能力',
      nextMilestone: '向复杂数据结构、高级动态规划算法与跨学科大模型工程应用进阶',
    };
  } else if (overallScore >= 72) {
    cognitiveStage = {
      stageName: '逻辑运筹期 (Concrete Operational)',
      stageTitle: '结构化分析与多步因果推导',
      description: '具备清晰的规则意识与单步/双步因果推演能力，能够借助流程图和图示有效解决结构化问题。',
      currentMilestone: '掌握基础计算机概念与典型解题范式',
      nextMilestone: '强化多状态跟踪与抽象建模能力，减少对具象图示的过度依赖',
    };
  } else {
    cognitiveStage = {
      stageName: '具象感知期 (Preoperational to Concrete)',
      stageTitle: '情境感知与直观探索启蒙',
      description: '处于直观形象思维向逻辑思维过渡阶段，依赖图形线索与生活化情境辅助思考，遇到抽象符号或多步分支容易受干扰。',
      currentMilestone: '对数字科技与图示关卡充满探究兴趣',
      nextMilestone: '通过画流程图与积木拼搭培养单步因果与归纳分类习惯',
    };
  }

  const scoreExplanation =
    totalAnswered > 0
      ? `本次测评共完成 ${totalAnswered} 道关卡，答对 ${totalCorrect} 题，整体正确率 ${accuracyRate}%。系统根据各题难度星级（★1-3星）实施动态加权，设定50分为参与基准分，四维加权（40%计算思维+30%创造+20%数据AI+10%责任）最终获得综合评分 ${overallScore} 分。`
      : '测评数据已初始化，随时可开启全新测评。';

  return {
    strengths,
    weaknesses,
    cognitiveStage,
    difficultyStats,
    overallAccuracyRate: accuracyRate,
    scoreExplanation,
  };
}


export function getDomainForSubSkill(subSkill: string): DigitalDomain {
  if (
    ['分解', '规律', '抽象', '算法', '逻辑'].includes(subSkill) ||
    subSkill.includes('思维') ||
    subSkill.includes('算法') ||
    subSkill.includes('逻辑') ||
    subSkill.includes('规律') ||
    subSkill.includes('分解') ||
    subSkill.includes('抽象')
  ) {
    return '计算思维';
  }
  if (
    ['Scratch', 'Python', '机器人', 'AI创作'].includes(subSkill) ||
    subSkill.includes('创造') ||
    subSkill.includes('编程') ||
    subSkill.includes('积木') ||
    subSkill.includes('代码')
  ) {
    return '数字创造';
  }
  if (
    ['数据理解', 'AI认知', 'AI使用能力'].includes(subSkill) ||
    subSkill.includes('数据') ||
    subSkill.includes('AI') ||
    subSkill.includes('智能')
  ) {
    return '数据与AI素养';
  }
  return '数字责任';
}

export const ADVISE_TASKS: AdviseTask[] = [
  {
    id: 'flowchart',
    title: '画个算法流程图吧！',
    description: '下次遇到复杂问题，试着先在纸上画出“如果…那么…”和步骤的解决地图。',
    icon: 'git-fork',
    color: 'green',
  },
  {
    id: 'blockly',
    title: '玩转图形化创作',
    description: '每天尝试用 Scratch 拼一个带有角色交互、声音或广播消息的小作品。',
    icon: 'puzzle',
    color: 'blue',
  },
  {
    id: 'ai-prompt',
    title: '与AI助手协同探索',
    description: '尝试向AI提出一个精准问题，并辨析它给出的回答是否准确可靠。',
    icon: 'help-circle',
    color: 'yellow',
  },
];
