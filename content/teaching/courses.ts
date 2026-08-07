import type { Course, LocalizedText, MockSlide } from "./types";

const t = (zh: string, en: string): LocalizedText => ({ zh, en });

const makeSlides = (
  prefix: string,
  visual: MockSlide["visual"],
  slides: Array<Omit<MockSlide, "id" | "visual"> & { visual?: MockSlide["visual"] }>
): MockSlide[] => slides.map((slide, index) => ({ id: `${prefix}-${index + 1}`, visual, ...slide }));

const bridgeDecks: Course["decks"] = [
  {
    id: "bridge-forces", lessonId: "bridge-01", title: t("认识力", "Meet the Forces"), description: t("从纸张与载荷开始认识桥梁受力。", "Start with paper, loads, and the forces inside a bridge."), slideCount: 5,
    slides: makeSlides("bridge-forces", "bridge", [
      { eyebrow: t("第 01 课 · 认识力", "Lesson 01 · Meet the Forces"), title: t("为什么桥不会塌？", "WHY DON'T BRIDGES FALL?"), subtitle: t("从一个纸桥实验开始", "A paper bridge investigation") },
      { title: t("桥只有一个任务。", "A bridge has one job."), body: t("安全地把载荷从这里，传到地面。", "Carry LOAD safely from here → to the ground."), visual: "forces" },
      { title: t("拉力", "TENSION"), body: t("把材料往两边拉开。", "Pulling apart"), visual: "forces" },
      { title: t("压力", "COMPRESSION"), body: t("把材料从两端往中间推。", "Pushing together"), visual: "forces" },
      { eyebrow: t("课堂挑战", "YOUR CHALLENGE"), title: t("一张纸能承受多大重量？", "How much weight can one sheet of paper hold?"), quote: t("先预测，再搭建，再让失败说话。", "Predict. Build. Let failure speak.") }
    ])
  },
  {
    id: "bridge-triangles", lessonId: "bridge-02", title: t("三角形的力量", "The Power of Triangles"), description: t("从变形的正方形到稳定的桁架。", "From wobbly squares to sturdy trusses."), slideCount: 5,
    slides: makeSlides("bridge-triangles", "triangles", [
      { title: t("为什么是三角形？", "Why triangles?"), subtitle: t("稳定不是偶然。", "Stability is designed.") },
      { title: t("正方形 vs 三角形", "Square vs triangle"), body: t("哪个形状会先改变？", "Which shape changes first?") },
      { title: t("什么是桁架？", "What is a truss?"), body: t("用很多小三角形把力送到支撑处。", "Small triangles move force toward supports.") },
      { title: t("在真实桥梁中找三角形", "Find triangles in real bridges"), bullets: [t("观察斜杆", "Look for diagonal members"), t("找到连接点", "Find the joints"), t("追踪受力路径", "Trace the load path")] },
      { eyebrow: t("搭建挑战", "BUILD CHALLENGE"), title: t("不增加材料，让结构保持刚性。", "Stay rigid without adding more material.") }
    ])
  },
  {
    id: "bridge-build", lessonId: "bridge-03", title: t("搭一座桥", "Build a Bridge"), description: t("在有限材料与跨度中做工程选择。", "Make engineering choices within a material budget."), slideCount: 5,
    slides: makeSlides("bridge-build", "brief", [
      { eyebrow: t("工程任务书", "ENGINEERING BRIEF"), title: t("搭一座桥。", "Build a bridge."), subtitle: t("跨过 30 cm 的空隙。", "Span a 30 cm gap.") },
      { title: t("约束条件", "Constraints"), bullets: [t("固定跨度", "Fixed span"), t("有限材料", "Limited materials"), t("承受指定载荷", "Carry the test load")] },
      { title: t("材料预算", "Material budget"), body: t("少并不代表弱；每一条纸带都要有工作。", "Less is not weaker when every strip has a job.") },
      { title: t("设计 → 搭建 → 测试", "Design → Build → Test"), body: t("把第一版当成一个问题，而不是最终答案。", "Treat version one as a question, not an answer.") },
      { title: t("载荷测试规则", "Load-testing rules"), bullets: [t("慢慢增加重量", "Add weight slowly"), t("观察形变", "Watch deformation"), t("记录断裂处", "Record where it breaks")] }
    ])
  },
  {
    id: "bridge-failure", lessonId: "bridge-04", title: t("让失败变得更好", "Fail Better"), description: t("读懂断裂处，然后重新设计。", "Read the break, then redesign."), slideCount: 5,
    slides: makeSlides("bridge-failure", "failure", [
      { title: t("失败也是数据。", "Failure is data."), subtitle: t("它告诉我们下一次从哪里开始。", "It tells us where to begin again.") },
      { title: t("它从哪里断了？", "Where did it break?"), body: t("看接点、跨度中央和薄弱材料。", "Look at joints, the center span, and thin members.") },
      { title: t("找到薄弱点", "Find the weak point"), bullets: [t("弯曲", "Bending"), t("接点滑动", "Slipping joints"), t("材料压皱", "Buckling")] },
      { title: t("重新设计", "Redesign"), body: t("一次只改一个变量，才能读懂变化。", "Change one variable at a time so the change can teach you.") },
      { eyebrow: t("最终工程挑战", "FINAL ENGINEERING CHALLENGE"), title: t("你会留下哪一种改动？", "Which revision will you keep?") }
    ])
  }
];

const probabilityDecks: Course["decks"] = [
  {
    id: "probability-random", lessonId: "probability-01", title: t("随机长什么样？", "What Does Random Look Like?"), description: t("用硬币、骰子和直觉开始调查。", "Investigate with coins, dice, and intuition."), slideCount: 5,
    slides: makeSlides("probability-random", "coin", [
      { eyebrow: t("第 01 课 · 随机", "Lesson 01 · Random"), title: t("这真的是随机的吗？", "Is this random?"), subtitle: t("先相信你的直觉。再测试它。", "Trust your intuition. Then test it.") },
      { title: t("正面还是反面？", "Heads or tails?"), body: t("每次抛掷之前，你会怎么预测？", "What would you predict before every flip?") },
      { title: t("样本空间", "Sample space"), body: t("把所有可能结果摆在桌面上。", "Put every possible outcome on the table.") },
      { title: t("人类的随机", "Human randomness"), body: t("人会避免连续出现同一个结果。随机不一定看起来平均。", "Humans avoid streaks. Random does not always look evenly mixed.") },
      { eyebrow: t("班级实验", "CLASS EXPERIMENT"), title: t("我们能造出真正随机的序列吗？", "Can humans create a truly random sequence?") }
    ])
  },
  {
    id: "probability-machines", lessonId: "probability-02", title: t("概率机器", "Probability Machines"), description: t("比较理论结果与一次次实验。", "Compare theoretical results with repeated trials."), slideCount: 5,
    slides: makeSlides("probability-machines", "probability", [
      { title: t("概率在 0 到 1 之间", "Probability from 0 → 1"), subtitle: t("不可能、也许、一定。", "Impossible, maybe, certain.") },
      { title: t("理论概率", "Theoretical probability"), body: t("在实验开始前，数学说会发生什么？", "Before a trial begins, what does mathematics predict?") },
      { title: t("实验概率", "Experimental probability"), body: t("真正发生了什么？", "What actually happened?") },
      { title: t("结果为什么摇摆？", "Why results wobble"), body: t("小样本会很吵；重复更多次会带来新的证据。", "Small samples are noisy; more trials bring more evidence.") },
      { title: t("10 vs 100 vs 1000 次", "10 vs 100 vs 1000 trials"), quote: t("更多数据不保证完美，却让模式更清楚。", "More data is not perfection. It makes patterns clearer.") }
    ])
  },
  {
    id: "probability-fair", lessonId: "probability-03", title: t("这个游戏公平吗？", "Is This Game Fair?"), description: t("把游戏直觉变成可验证的证据。", "Turn a game hunch into testable evidence."), slideCount: 5,
    slides: makeSlides("probability-fair", "tree", [
      { title: t("你会玩吗？", "Would you play?"), subtitle: t("先看规则，再看机会。", "Read the rules, then read the chances.") },
      { title: t("可能的结果", "Possible outcomes"), body: t("谁能赢？每一种结果有多常见？", "Who can win? How often can each outcome occur?") },
      { title: t("概率树", "Probability tree"), body: t("一步一步画出选择和结果。", "Draw choices and outcomes one step at a time.") },
      { title: t("玩家 A vs 玩家 B", "Player A vs Player B"), bullets: [t("机会一样吗？", "Same chances?"), t("奖励一样吗？", "Same rewards?"), t("风险由谁承担？", "Who carries the risk?")] },
      { eyebrow: t("判断", "VERDICT"), title: t("你能证明它不公平吗？", "Can you prove a game is unfair?") }
    ])
  },
  {
    id: "probability-game", lessonId: "probability-04", title: t("设计你自己的游戏", "Design Your Own Game"), description: t("设计、计算、试玩，然后让游戏变公平。", "Design, calculate, playtest, then make it fair."), slideCount: 5,
    slides: makeSlides("probability-game", "game", [
      { eyebrow: t("游戏设计任务书", "GAME DESIGN BRIEF"), title: t("设计一个游戏。", "Design your own game."), subtitle: t("它要有风险，也要公平。", "It should feel risky and remain fair.") },
      { title: t("定义规则", "Define the rules"), body: t("玩家做什么？什么情况会赢？", "What do players do? What counts as a win?") },
      { title: t("计算概率", "Calculate probability"), body: t("写下每种结果，再检查机会。", "List each outcome, then check the chances.") },
      { title: t("试玩", "Playtest"), body: t("玩十次、二十次，再听参与者的感受。", "Play ten times, twenty times, then listen to players.") },
      { title: t("让它公平", "Make it fair"), quote: t("一个好游戏让人想再来一次，而不是觉得被规则骗了。", "A good game invites another turn, not a complaint about the rules.") }
    ])
  }
];

export const courses: Course[] = [
  {
    id: "bridge-builders", catalog: "ENG · 001", title: t("桥梁工程：为什么桥不会塌？", "Bridge Builders: Why Don't Bridges Fall?"), shortTitle: t("桥梁工程", "Bridge Builders"), subtitle: t("从纸桥、桁架到一次次重新设计。", "Paper bridges, trusses, and the craft of redesign."), description: t("这门课程通过纸桥、桁架和载荷实验，让学生从“为什么桥不会塌？”这一问题出发，逐步理解力、结构、三角形稳定性和工程设计迭代。学生不需要预先学习力学，而是通过动手实验、观察失败和重新设计建立工程直觉。", "This course introduces forces, structures, trusses, and engineering iteration through paper bridges and load-testing experiments. Students begin with a simple question—why don't bridges fall?—and develop engineering intuition by building, failing, observing, and redesigning."), category: t("工程", "Engineering"), year: "2025–2026", grades: "Grades 5–8", duration: t("4 课 × 60 分钟", "4 Lessons × 60 min"), color: "coral", icon: "bridge",
    objectives: [t("区分 tension 与 compression。", "Distinguish tension from compression."), t("解释三角形为什么常出现在桁架结构中。", "Explain why triangles appear in truss structures."), t("根据载荷位置预测结构的薄弱位置。", "Predict weak points from a load position."), t("使用简单约束完成一个工程设计。", "Work within simple engineering constraints."), t("根据实验结果重新设计结构。", "Redesign a structure using experiment results.")],
    lessons: [
      { id: "bridge-01", number: "01", title: t("认识力", "Meet the Forces"), duration: "60 min", description: t("从生活中的桥梁观察，到一张纸的承重实验。", "From observing everyday bridges to one sheet of paper under load."), topics: [t("什么是 load？", "What is a load?"), t("tension / compression / bending", "Tension / compression / bending"), t("生活中的桥梁观察", "Everyday bridge observations"), t("纸条实验", "Paper strip experiment")], challenge: t("一张纸能承受多大重量？", "How much weight can one sheet of paper hold?") },
      { id: "bridge-02", number: "02", title: t("三角形的力量", "The Power of Triangles"), duration: "60 min", description: t("用会变形的正方形理解桁架的稳定。", "Use a deforming square to understand truss stability."), topics: [t("正方形变形", "Square deformation"), t("三角形稳定性", "Triangle stability"), t("桁架结构", "Truss structures"), t("牙签 / 纸桁架活动", "Toothpick / paper truss activity")], challenge: t("不增加材料，能让结构保持刚性吗？", "Can you stay rigid without adding more material?") },
      { id: "bridge-03", number: "03", title: t("搭一座桥", "Build a Bridge"), duration: "60 min", description: t("在跨度与材料预算里做取舍。", "Make tradeoffs between span and material budget."), topics: [t("设计约束", "Design constraints"), t("跨度", "Span"), t("材料预算", "Material budget"), t("原型与载荷测试", "Prototype and load testing")], challenge: t("用最少材料搭一座最结实的桥。", "Build the strongest bridge with the least material.") },
      { id: "bridge-04", number: "04", title: t("让失败变得更好", "Fail Better"), duration: "60 min", description: t("分析倒塌、重新设计，并比较不同方案。", "Analyze collapse, redesign, and compare bridge choices."), topics: [t("失败分析", "Failure analysis"), t("重新设计", "Redesign"), t("工程迭代", "Engineering iteration"), t("最终测试", "Final test")], challenge: t("失败能教会工程师什么？", "What can failure teach an engineer?") }
    ], decks: bridgeDecks
  },
  {
    id: "probability-playground", catalog: "MATH · 001", title: t("概率游乐场：随机真的随机吗？", "Probability Playground: Is Random Really Random?"), shortTitle: t("概率游乐场", "Probability Playground"), subtitle: t("把运气、游戏和证据放到同一张桌子上。", "Put luck, games, and evidence on the same table."), description: t("这门课程通过硬币、骰子、游戏和模拟实验，让学生从直觉中的“运气”进入概率思维。学生会比较理论概率和实验概率，并尝试设计公平与不公平的游戏。", "This course turns coins, dice, games, and simulations into an introduction to probabilistic thinking. Students compare intuition with evidence, distinguish theoretical from experimental probability, and eventually design games of their own."), category: t("数学", "Mathematics"), year: "2025–2026", grades: "Grades 5–8", duration: t("4 课 × 60 分钟", "4 Lessons × 60 min"), color: "blue", icon: "dice",
    objectives: [t("描述一个简单随机实验的 sample space。", "Describe the sample space of a simple random experiment."), t("计算基础事件概率。", "Calculate basic event probabilities."), t("区分 theoretical probability 与 experimental probability。", "Distinguish theoretical and experimental probability."), t("理解样本数量增加后实验结果趋于稳定的现象。", "See how results stabilise as samples grow."), t("分析一个游戏是否公平。", "Analyze whether a game is fair.")],
    lessons: [
      { id: "probability-01", number: "01", title: t("随机长什么样？", "What Does Random Look Like?"), duration: "60 min", description: t("用预测、硬币和骰子挑战随机直觉。", "Challenge random intuition with predictions, coins, and dice."), topics: [t("抛硬币", "Coin flips"), t("骰子", "Dice"), t("预测", "Prediction"), t("样本空间", "Sample space")], challenge: t("人类能造出真正随机的序列吗？", "Can humans create a truly random sequence?") },
      { id: "probability-02", number: "02", title: t("概率机器", "Probability Machines"), duration: "60 min", description: t("对比理论、频率和反复实验。", "Compare theory, frequency, and repeated trials."), topics: [t("理论概率", "Theoretical probability"), t("实验概率", "Experimental probability"), t("频率", "Frequency"), t("简单模拟", "Simple simulations")], challenge: t("为什么 10 次抛硬币不一定恰好 50/50？", "Why do 10 flips not look exactly 50/50?") },
      { id: "probability-03", number: "03", title: t("这个游戏公平吗？", "Is This Game Fair?"), duration: "60 min", description: t("用概率树与结果比较拆解游戏。", "Use probability trees and outcomes to unpack games."), topics: [t("预期结果", "Expected outcomes"), t("不公平游戏", "Unfair games"), t("概率树", "Probability trees"), t("策略比较", "Comparing strategies")], challenge: t("你能证明一个游戏不公平吗？", "Can you prove a game is unfair?") },
      { id: "probability-04", number: "04", title: t("设计你自己的游戏", "Design Your Own Game"), duration: "60 min", description: t("用规则、概率与试玩做一次小型设计迭代。", "Use rules, probability, and playtests for a small design iteration."), topics: [t("规则", "Rules"), t("概率", "Probability"), t("平衡", "Balance"), t("测试与重做", "Test and redesign")], challenge: t("设计一个有风险、但数学上公平的游戏。", "Design a game that feels risky but remains mathematically fair.") }
    ], decks: probabilityDecks
  }
];
