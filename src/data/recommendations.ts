import { DimensionAdvice } from '../types';

export const DIMENSION_ADVICES: Record<string, DimensionAdvice> = {
  计算思维: {
    dimension: '计算思维 (40%)',
    keyChallenge: '问题分解 · 规律识别 · 抽象建模 · 算法设计 · 逻辑推理',
    diagnosis:
      '参考国际 Bebras 计算思维标准，计算思维是数字时代问题解决的核心。建议从多步逻辑因果推导、递推数列规律和算法流程图绘制入手，持续强化结构化思维和算法推演能力。',
    recommendedCourses: [
      {
        id: 'ct-101',
        title: 'Bebras 国际计算思维挑战专题精讲',
        tag: '思维核心',
        duration: '20分钟 · 8节微课',
        level: '核心能力',
        description: '系统拆解分解、模式识别、抽象与算法四大基石，学会像计算机科学家一样思考与建模。',
        targetSkill: '问题分解 · 算法建模',
        iconName: 'cpu',
        type: 'video',
      },
      {
        id: 'ct-flowchart',
        title: '算法与流程图魔法：把解题步骤画出来',
        tag: '实战工坊',
        duration: '15分钟 · 动手实操',
        level: '进阶应用',
        description: '掌握标准流程图符号（起止、分支判断、循环），清晰可视化你的解题与算法推演步骤。',
        targetSkill: '流程图推演 · 逻辑分支',
        iconName: 'git-fork',
        type: 'practice',
      },
    ],
    tasks: [
      {
        id: 'ct-task-1',
        title: '画出生活任务的算法流程图',
        description: '选择一件日常事务（如收拾书包或整理路线），将其拆解为严密的“如果…否则…”分支步骤。',
        icon: 'git-fork',
        color: 'green',
      },
      {
        id: 'ct-task-2',
        title: '挑战 3 道 Bebras 经典谜题',
        description: '在题库中挑选 3 道高星级的图论或递归难题，写出你的推理排除依据。',
        icon: 'puzzle',
        color: 'blue',
      },
      {
        id: 'ct-task-3',
        title: '寻找自然中的规律与周期',
        description: '观察生活中的交替图案或数字序列，提炼出其循环重复的数学规律公式。',
        icon: 'help-circle',
        color: 'yellow',
      },
    ],
  },
  数字创造: {
    dimension: '数字创造 (30%)',
    keyChallenge: 'Scratch 图形化 · Python 代码 · 智能机器人 · AIGC 创意创作',
    diagnosis:
      '紧扣中国新课标特色，数字创造强调将计算思维落地为真实的软硬件作品。建议多尝试在 Scratch/Python 中实现复杂动画与交互算法，并体验向 AI 输入优质 Prompt 生成创意作品。',
    recommendedCourses: [
      {
        id: 'dc-scratch-python',
        title: '从 Scratch 积木到 Python 代码跨越',
        tag: '课标必修',
        duration: '25分钟 · 项目实训',
        level: '创意编程',
        description: '理解图形化积木与代码语句的对应关系，掌握角色运动、事件监听与变量控制核心逻辑。',
        targetSkill: 'Scratch 积木 · Python 基础',
        iconName: 'sparkles',
        type: 'project',
      },
      {
        id: 'dc-robot-ai',
        title: '智能机器人与 AIGC 创意工坊',
        tag: '前沿创新',
        duration: '18分钟 · 互动微课',
        level: '综合实践',
        description: '探索智能小车传感器避障原理与 AIGC 提示词设计，动手设计你的第一个智能创意互动作品。',
        targetSkill: '传感器控制 · AI 提示词创作',
        iconName: 'cpu',
        type: 'video',
      },
    ],
    tasks: [
      {
        id: 'dc-task-1',
        title: '在 Scratch 中实现一个趣味小游戏',
        description: '制作一个包含角色碰撞检测、分数计数器和音效反馈的互动小游戏。',
        icon: 'sparkles',
        color: 'blue',
      },
      {
        id: 'dc-task-2',
        title: '设计一组精准的 AI 绘图提示词',
        description: '包含【主体 + 环境 + 艺术风格 + 光影细节】，体验如何用自然语言指挥 AI 精准创作。',
        icon: 'puzzle',
        color: 'red',
      },
      {
        id: 'dc-task-3',
        title: '规划机器人的避障行走逻辑',
        description: '绘制超声波传感器检测到障碍物时的转弯与避障决策图，感受智能硬件的魅力。',
        icon: 'git-fork',
        color: 'green',
      },
    ],
  },
  数据与AI素养: {
    dimension: '数据与AI素养 (20%)',
    keyChallenge: '数据理解 · 编码检索 · AI 认知 · 智能工具高效协同',
    diagnosis:
      '数据是信息时代的基石，AI认知与工具使用是未来学习者的必备素养。建议深入理解二进制、条形码与数据表结构，同时学会向 AI 提问并辨析结果的真实性与局限性。',
    recommendedCourses: [
      {
        id: 'ai-data-master',
        title: '数字世界的密码：从二进制到大语言模型',
        tag: '素养核心',
        duration: '16分钟 · 6节微课',
        level: '认知拓展',
        description: '揭秘计算机如何用 0 和 1 存储图像与声音，浅显易懂讲透大模型与机器学习的运行原理。',
        targetSkill: '数据编码 · 机器学习认知',
        iconName: 'database',
        type: 'video',
      },
      {
        id: 'ai-prompt-skill',
        title: '小学生的 AI 学习助手协同指南',
        tag: '高效工具',
        duration: '15分钟 · 场景实战',
        level: '实用技能',
        description: '学会向 AI 提问的 3 个黄金技巧，利用 AI 辅助背单词、解数学题与拓宽科学视野。',
        targetSkill: 'AI 对话技巧 · 批判性辨析',
        iconName: 'book-open',
        type: 'practice',
      },
    ],
    tasks: [
      {
        id: 'ai-task-1',
        title: '破解生活中的 3 种数据编码',
        description: '找到食品包装条形码、书籍 ISBN 码和二维码，记录它们分别代表哪些结构化数据。',
        icon: 'shield-check',
        color: 'yellow',
      },
      {
        id: 'ai-task-2',
        title: '向 AI 提问并验证答案真伪',
        description: '向智能助手请教一个科学问题，并通过查阅书籍或权威网站核实 AI 给出的内容是否准确。',
        icon: 'help-circle',
        color: 'blue',
      },
      {
        id: 'ai-task-3',
        title: '制作一周学习数据小表格',
        description: '用表格记录自己每天的学习和运动时长，体验用数据图表总结分析个人成长的乐趣。',
        icon: 'layers',
        color: 'green',
      },
    ],
  },
  数字责任: {
    dimension: '数字责任 (10%)',
    keyChallenge: '网络安全防范 · 个人隐私保护 · AI 伦理与健康用网',
    diagnosis:
      '数字公民素养决定了我们在数字世界的安全与合规底线。建议强化强密码设置、防范钓鱼网站/虚假信息，树立保护个人隐私以及不利用 AI 投机取巧的学术诚信意识。',
    recommendedCourses: [
      {
        id: 'dr-security-privacy',
        title: '少年数字安全盾牌：保护隐私与防范网络陷阱',
        tag: '安全必修',
        duration: '12分钟 · 互动情境课',
        level: '安全规范',
        description: '通过真实情景案例剖析钓鱼链接、恶意软件、权限越界索取，筑牢网络安全防线。',
        targetSkill: '密码安全 · 隐私保护',
        iconName: 'shield-check',
        type: 'video',
      },
      {
        id: 'dr-ai-ethics',
        title: 'AI 时代的科技伦理与真实性辨别',
        tag: '伦理导向',
        duration: '14分钟 · 讨论专题',
        level: '前沿思辨',
        description: '辨别 Deepfake 深度伪造与虚假新闻，探讨 AI 版权归属，树立学术诚信与健康用网观念。',
        targetSkill: '虚假信息辨析 · 学术诚信',
        iconName: 'book-open',
        type: 'practice',
      },
    ],
    tasks: [
      {
        id: 'dr-task-1',
        title: '为自己的账号设计一个高强度密码',
        description: '使用【大小写字母 + 数字 + 特殊符号】组合，且不包含生日姓名等个人隐私。',
        icon: 'shield-check',
        color: 'red',
      },
      {
        id: 'dr-task-2',
        title: '辨析网络虚假信息的 3 个小妙招',
        description: '总结如何通过看信源、查图片出处、比对多家报道来识别网络上的假新闻。',
        icon: 'help-circle',
        color: 'yellow',
      },
      {
        id: 'dr-task-3',
        title: '制定健康的数字设备使用公约',
        description: '与父母共同制定每天使用平板/电脑的时长与护眼公约，做到劳逸结合与健康用网。',
        icon: 'puzzle',
        color: 'green',
      },
    ],
  },
};

// Aliases for backward compatibility
DIMENSION_ADVICES['逻辑思维'] = DIMENSION_ADVICES['计算思维'];
DIMENSION_ADVICES['算法理解'] = DIMENSION_ADVICES['计算思维'];
DIMENSION_ADVICES['数据处理'] = DIMENSION_ADVICES['数据与AI素养'];
DIMENSION_ADVICES['创新应用'] = DIMENSION_ADVICES['数字创造'];

export function getDimensionAdvice(dimensionName: string): DimensionAdvice {
  // Strip any (40%) suffix
  const cleanName = dimensionName.replace(/\s*\(\d+%\)/, '').trim();
  return (
    DIMENSION_ADVICES[cleanName] ||
    DIMENSION_ADVICES[dimensionName] ||
    DIMENSION_ADVICES['计算思维']
  );
}
