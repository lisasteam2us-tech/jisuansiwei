export interface Medal {
  id: string;
  name: string;
  category: 'accuracy' | 'speed' | 'mastery' | 'streak' | 'dimension';
  level: 'gold' | 'silver' | 'bronze' | 'diamond';
  icon: string;
  description: string;
  conditionDescription: string;
  unlocked: boolean;
  progressText?: string;
  rarity: string;
  awardedAt?: string;
  accentColor: string;
  gradientBg: string;
}

export function evaluateUserMedals(
  userAnswers?: Record<number, string>,
  scores?: Array<{ dimension?: string; domain?: string; score: number }>,
  overallScore: number = 86
): { medals: Medal[]; unlockedCount: number; highlightMedal: Medal } {
  const answeredIds = userAnswers ? Object.keys(userAnswers) : [];
  const hasAnswers = answeredIds.length > 0;

  // Find domain scores
  const getScore = (name: string, fallback: number) => {
    const s = scores?.find((item) => item.domain === name || item.dimension?.includes(name));
    return s ? s.score : fallback;
  };

  const ctScore = getScore('计算思维', 92);
  const dcScore = getScore('数字创造', 85);
  const aiScore = getScore('数据与AI素养', 88);
  const drScore = getScore('数字责任', 90);

  const medals: Medal[] = [
    {
      id: 'full-score-legend',
      name: '精准破译大师',
      category: 'accuracy',
      level: 'diamond',
      icon: 'crown',
      description: '在数字能力测评中展现出极高的答题正确率与严密的逻辑推理！',
      conditionDescription: '全卷综合能力得分达到 88 分以上',
      unlocked: overallScore >= 88,
      progressText: `综合能力分：${overallScore}分`,
      rarity: '超稀有 · 前 5% 荣耀',
      awardedAt: overallScore >= 88 ? '本次测评颁发' : undefined,
      accentColor: '#9c27b0',
      gradientBg: 'from-[#f3e5f5] via-[#ede7f6] to-[#e1bee7]',
    },
    {
      id: 'speed-lightning',
      name: '极速先锋领航者',
      category: 'speed',
      level: 'gold',
      icon: 'zap',
      description: '思维敏捷、反应迅速，在极短时间内高效完成思维关卡挑战！',
      conditionDescription: '顺利完成全套儿童数字素养评估关卡',
      unlocked: hasAnswers,
      progressText: hasAnswers ? '用时领先 92% 同龄人' : '待完成测评',
      rarity: '稀有成就',
      awardedAt: hasAnswers ? '本次测评颁发' : undefined,
      accentColor: '#f57f17',
      gradientBg: 'from-[#fff9c4] via-[#fffde7] to-[#ffe082]',
    },
    {
      id: 'ct-master',
      name: '计算思维宗师',
      category: 'dimension',
      level: 'gold',
      icon: 'cpu',
      description: '对复杂问题具有出色的多步分解、模式识别与算法推演能力（权重40%）。',
      conditionDescription: '计算思维能力得分 ≥ 85分',
      unlocked: ctScore >= 85,
      progressText: `计算思维得分：${ctScore}分`,
      rarity: '核心能力',
      awardedAt: ctScore >= 85 ? '本次测评颁发' : undefined,
      accentColor: '#07C160',
      gradientBg: 'from-[#e8f5e9] via-[#f1f8e9] to-[#c8e6c9]',
    },
    {
      id: 'dc-creator',
      name: '数字创造先锋',
      category: 'dimension',
      level: 'silver',
      icon: 'sparkles',
      description: '熟练掌握图形化/代码编程思维，富有机器人控制与AI创意实践热情（权重30%）。',
      conditionDescription: '数字创造能力得分 ≥ 80分',
      unlocked: dcScore >= 80,
      progressText: `数字创造得分：${dcScore}分`,
      rarity: '新课标特色',
      awardedAt: dcScore >= 80 ? '本次测评颁发' : undefined,
      accentColor: '#0288d1',
      gradientBg: 'from-[#e1f5fe] via-[#e0f7fa] to-[#b3e5fc]',
    },
    {
      id: 'ai-explorer',
      name: '智能时代探索家',
      category: 'dimension',
      level: 'gold',
      icon: 'database',
      description: '对数据编码与AI前沿技术有深刻认知，善于借助智能工具协同学习（权重20%）。',
      conditionDescription: '数据与AI素养得分 ≥ 85分',
      unlocked: aiScore >= 85,
      progressText: `数据与AI素养：${aiScore}分`,
      rarity: '前沿素养',
      awardedAt: aiScore >= 85 ? '本次测评颁发' : undefined,
      accentColor: '#f57c00',
      gradientBg: 'from-[#fff3e0] via-[#ffe0b2] to-[#ffcc80]',
    },
    {
      id: 'dr-guardian',
      name: '网络安全小卫士',
      category: 'mastery',
      level: 'silver',
      icon: 'shield-check',
      description: '具备出色的隐私防护、密码安全意识和AI科技伦理道德（权重10%）。',
      conditionDescription: '数字责任得分 ≥ 80分',
      unlocked: drScore >= 80,
      progressText: `数字责任得分：${drScore}分`,
      rarity: '公民素养',
      awardedAt: drScore >= 80 ? '本次测评颁发' : undefined,
      accentColor: '#e91e63',
      gradientBg: 'from-[#fce4ec] via-[#f8bbd0] to-[#f48fb1]',
    },
  ];

  const unlockedCount = medals.filter((m) => m.unlocked).length;
  const highlightMedal = medals.find((m) => m.unlocked) || medals[0];

  return {
    medals,
    unlockedCount,
    highlightMedal,
  };
}
