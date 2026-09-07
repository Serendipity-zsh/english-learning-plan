window.LEARNING_PLAN = (() => {
  const phases = [
    { id: 1, name: '高 A1 到 A2', range: '第 1–12 周', level: 'A2', hours: 12, milestone: '第 12 周 A2 验收', target: '多邻国 50–60；10 分钟熟悉主题对话；150 词短文；IELTS 听力 Part 1 正确率约 70%。' },
    { id: 2, name: 'A2 到 B1', range: '第 13–24 周', level: 'B1', hours: 12.5, milestone: '第 24 周 B1 验收', target: '多邻国 75–85；IELTS 模考 5–5.5；15 分钟对话；200 词结构完整写作。' },
    { id: 3, name: 'B1 到 B2', range: '第 25–39 周', level: 'B2', hours: 13, milestone: '第 39 周 B2 验收', target: '多邻国 100–115；IELTS 模考约 6；完成 5 分钟项目介绍并回答追问。' },
    { id: 4, name: '雅思与海外求职', range: '第 40–52 周', level: 'IELTS 6.5', hours: 14, milestone: '第 52 周年度验收', target: '连续 3 次完整模考达到 6.5 附近且单项不低于 6；完成 30 分钟英文面试。' },
  ];

  const rows = [
    [1,'建立基线','完成听读样题、150 词写作、2 分钟自我介绍和 5 分钟项目介绍','IELTS 官方样题；VOA 1–4；be 动词与人称代词','保存四项原始结果和录音','四项均留存证据；本周有效学习至少 10 小时'],
    [1,'介绍自己与所在地点','姓名、职业、住址、物品与方位；一般疑问句','VOA 5–8；Grammar in Use 对应章节','2 分钟自我介绍第二版','脱稿 90 秒以上；VOA 测验平均至少 75%'],
    [1,'日常作息与时间','一般现在时、时间、频率副词和日常活动','VOA 9–13；Oxford Bookworms Starter','100 词 My Typical Day','语法错误不影响理解；朗读和复述各 2 分钟'],
    [1,'邀请与简单交流','提出邀请、接受和拒绝；can 与基础情态表达','VOA 14–18；ChatGPT 情景对话','10 分钟邀请与安排角色扮演','能提出 5 个问题并正确回应；月度有效时长至少 45 小时'],
    [1,'工作能力与计划','描述会做什么、工作职责和近期安排','VOA 19–22；一般将来表达','2 分钟 My Job 录音','连续表达 2 分钟；至少使用 8 个工作相关表达'],
    [1,'需求与选择','want、need、可数名词、数量和点餐表达','VOA 23–26；Bookworms Level 1','餐厅和购物双场景模拟','两段对话各 5 分钟；测验平均至少 80%'],
    [1,'讲述过去事件','一般过去时、时间顺序和故事基本结构','VOA 27–30；过去时章节','讲述一次难忘经历','连续 3 分钟；过去时关键动词正确率约 70%'],
    [1,'协作与解决问题','提出建议、简单反馈、同意和不同意','VOA 31–35；ChatGPT 同事角色扮演','15 分钟问题解决对话','主动提问至少 5 次；完成阶段小测并复盘'],
    [1,'表达观点','because、but、so、比较级和简单论据','VOA 36–40；Real Easy English 1 期','150 词观点短文','有明确观点和 2 个理由；完成一次重写'],
    [1,'描述持续动作','现在完成时入门、持续动作和经历','VOA 41–44；Grammar in Use','3 分钟学习经历复述','正确使用至少 5 个现在完成时句子'],
    [1,'求助与职场礼貌','借用、请求、提供帮助和礼貌澄清','VOA 45–48；工作场景对话','写一封 120–150 词请求邮件','包含背景、请求、截止时间和感谢'],
    [1,'A2 阶段验收','整合 VOA Level 1 和前三个月语法','VOA 49–52；IELTS Listening Part 1','A2 验收包','多邻国 50–60；10 分钟对话；150 词写作；听力 Part 1 约 70%'],
    [2,'进入真实对话','适应非脚本化慢速对话，提取主题和关键词','BBC Real Easy English 3 期；Modern Family 1 集','复述一段 3 分钟对话','首次理解至少 70%；复听后达到 85%'],
    [2,'发音可懂度','句子重音、连读、弱读和常见音','BBC Pronunciation Lounge；ChatGPT Voice','保存同一段话前后录音','前后录音对比；自查至少 5 个发音问题'],
    [2,'现在完成时与经历','区分过去时和现在完成时，描述经历','Real Easy English 3 期；Grammar in Use','5 分钟经历访谈','时态选择基本正确；能够追问细节'],
    [2,'第一次 B1 月测','综合听说读写，不追求刷题量','BBC；分级读物 Level 2；IELTS 样题','四项月度测评','相对基线至少两项明显改善；累计有效学习约 190 小时'],
    [2,'抓取语块','按意群听辨，不逐词翻译','BBC 6 Minute English 2 期；Modern Family 2 集','整理并使用 20 个语块','每个语块至少造 1 个工作相关句子'],
    [2,'扩展观点','观点、理由、例子和简单让步','6 Minute English 2 期；ChatGPT 讨论','200 词观点文章','四段结构完整；重写后消除前三类错误'],
    [2,'工作邮件','主题、背景、动作、时间和礼貌结尾','BBC English for Work；真实邮件脱敏改写','3 封不同目的邮件','每封 120–180 词；读者能明确下一步'],
    [2,'会议参与','澄清、确认、补充、同意和礼貌反对','BBC English for Work；ChatGPT 会议模拟','20 分钟项目会议','主动发言至少 6 次；会后写 100 词纪要'],
    [2,'影视精听','适应自然语速和日常幽默','Modern Family 2 集；每集精学 5 分钟','5 分钟片段跟读和复述','不用中文字幕；复述覆盖主要情节'],
    [2,'阅读与摘要','识别主旨、段落功能、指代和作者态度','Bookworms Level 3；BBC Reading Room','完成 2 篇英文摘要','每篇 120 词；原文查词每页不超过 5 个'],
    [2,'四项整合','用同一主题完成听、说、读、写','BBC 主题材料；ChatGPT','主题学习作品集','包含笔记、录音、200 词文章和错误复盘'],
    [2,'B1 阶段验收','完成第一次相对完整的雅思模拟','IELTS 官方样题或 Cambridge IELTS','B1 验收包','多邻国 75–85；模考 5–5.5；15 分钟对话；200 词写作'],
    [3,'中级精听','推断态度、记录细节、总结观点','BBC 6 Minute English 3 期','每期 90 秒英文口头摘要','首次理解约 60%；精听后能复述 80% 信息'],
    [3,'复杂句与准确度','条件句、定语从句和常见连接方式','English Grammar in Use；BBC Grammar','250 词观点文章','至少使用 6 个复杂句，避免为复杂而复杂'],
    [3,'叙事与解释','清楚说明背景、问题、行动和结果','ChatGPT Voice；STAR 框架','准备 2 个 STAR 故事','每个 2–3 分钟；追问后仍能给出具体细节'],
    [3,'B2 月测','听说读写综合检查和错因分类','BBC；Cambridge IELTS 单项','月度测评报告','列出最高频 3 类错误并安排下月训练'],
    [3,'英文站会','Yesterday Today Blockers 和简洁表达','BBC English for Work；ChatGPT','连续 5 天英文站会录音','每天 2–3 分钟；信息完整且无长时间停顿'],
    [3,'解释技术问题','复现、影响、根因、修复和验证','英文技术文档；ChatGPT 同事角色','5 分钟 Bug 说明','覆盖五部分；回答至少 5 个追问'],
    [3,'项目演示','结构、过渡、数据说明和结论','TED 风格短讲；自己的项目材料','5 分钟项目演示','脱稿完成；每分钟约 100–130 词'],
    [3,'主持会议','设定议程、控制话题、总结决定和行动项','BBC English for Work；ChatGPT','30 分钟会议模拟','输出包含 owner 和 deadline 的英文纪要'],
    [3,'办公室交流','工作闲聊、反馈和文化语境','The Office 2 集；每集精学 5–8 分钟','20 个可复用办公室表达','至少 10 个表达用于自己的工作场景'],
    [3,'技术团队交流','产品、工程、优先级和取舍表达','Silicon Valley 2 集；技术播客片段','取舍讨论录音','清楚比较 2 个方案并给出推荐和理由'],
    [3,'真实技术阅读','快速定位定义、限制、步骤和风险','工作相关英文文档或 GitHub Issue','2 份一页英文摘要','30 分钟内读完熟悉主题并提取约 70% 关键信息'],
    [3,'雅思题型建立','了解四项格式、时间和评分维度','IELTS 官方资源；Cambridge IELTS','题型与错因清单','完成一套听力和阅读，所有错误都有分类'],
    [3,'雅思口语','Part 1 简洁、Part 2 展开、Part 3 论证','IELTS 口语题；ChatGPT Voice','2 次完整口语模拟','Part 2 连续接近 2 分钟；整体训练评分约 6'],
    [3,'雅思写作','任务回应、段落推进、词汇准确和语法范围','IELTS 官方评分标准；Cambridge IELTS','Task 1 和 Task 2 各 1 篇','限时完成；批改后自行重写，不直接背范文'],
    [3,'B2 阶段验收','综合验证工作英语和雅思基础','Cambridge IELTS；真人或 ChatGPT 模拟','B2 验收包','多邻国 100–115；模考约 6；项目介绍 5 分钟并回答追问'],
    [4,'冲刺诊断','完整模拟并按题型、语言和时间分类失分','Cambridge IELTS 完整套题','冲刺诊断报告','得到四项分数和前三个提分优先级'],
    [4,'听力专项','预判答案、同义替换、拼写和注意力恢复','Cambridge IELTS 听力 2 套','错题同义替换表','两套平均达到目标分数对应正确题数'],
    [4,'阅读专项','定位、同义替换、判断题和时间分配','Cambridge IELTS 阅读 2 套','题型正确率表','60 分钟完成；弱题型正确率比诊断提高 10%'],
    [4,'写作 Task 1','选择关键特征、比较数据或按文体完成书信','IELTS 官方范例；Cambridge IELTS','2 篇限时 Task 1','20 分钟完成；结构清晰，数据或写作目的准确'],
    [4,'写作 Task 2','回应题目、论证展开、例子和语言准确度','IELTS 官方评分标准；Cambridge IELTS','2 篇限时 Task 2','40 分钟完成；观点一致，每段有充分展开'],
    [4,'口语专项','流利度、扩展、词汇、语法和发音','IELTS 口语题；ChatGPT Voice','3 次完整模拟','训练评分稳定约 6–6.5；每次解决一个重复问题'],
    [4,'最弱单项强化','把 50% 本周时间投入当前最低单项','个人错题库；官方材料','专项前后对比','同类型测试提升至少 0.5 分或正确率 10%'],
    [4,'完整模考循环一','严格模拟考试时间并当天复盘','Cambridge IELTS 完整套题','完整模考和复盘','总分达到 6–6.5；每个失分都有下一步动作'],
    [4,'完整模考循环二','稳定时间分配并进行人工评分校准','Cambridge IELTS；真人教师或官方 Trial Test','第二次完整模考','写作和口语至少获得一次真人反馈'],
    [4,'海外面试','自我介绍、项目、冲突、失败和领导力','ChatGPT 面试官；STAR 故事库','30 分钟模拟面试','准备 10 个 STAR 故事；回答具体且不背稿'],
    [4,'连续稳定','连续完成三次可比较的完整模考','最近三套未做过的 Cambridge IELTS','三次成绩趋势','平均达到 6.5 附近；最低单项不低于 6'],
    [4,'考前减量','复习错题、睡眠和考试流程，不新增大量材料','个人错题库；IELTS 考试说明','个人考前清单','按正式时间完成最后一次模拟；状态稳定'],
    [4,'年度验收','正式考试或最终模拟，并完成工作能力测试','IELTS；英文会议与面试模拟','年度成果包','IELTS 6.5 目标；30 分钟面试；15 分钟演示；英文会议纪要'],
  ];

  const phasesById = Object.fromEntries(phases.map(p => [p.id, p]));
  const weeks = rows.map((r, index) => {
    const [phase, title, focus, materials, output, check] = r;
    const p = phasesById[phase];
    return { week: index + 1, phase, title, focus, materials, output, check, hours: p.hours,
      tasks: [
        { title: '基础与复习', detail: `Duolingo 与语法词汇 · ${phase < 3 ? 120 : 90} 分钟` },
        { title: '听力与跟读', detail: `${materials.split('；')[0]} · 180 分钟` },
        { title: '口语输出', detail: `围绕“${title}”录音或对话 · 120 分钟` },
        { title: '阅读与写作', detail: `${output} · 150 分钟` },
        { title: '测试与复盘', detail: `${check} · 90 分钟` },
      ]
    };
  });

  const materials = [
    { name:'Duolingo', use:'每日基础训练', phase:'全年，每天约 20 分钟', points:['词汇和基础句型','维持连续学习习惯','分数仅作进度参考'], url:'https://www.duolingo.com/' },
    { name:'VOA Learning English', use:'初级主课程', phase:'第 1–12 周', points:['Let’s Learn English Level 1 共 52 课','视频、口语、词汇、写作和测验','每周完成 4–5 课'], url:'https://learningenglish.voanews.com/p/5644.html' },
    { name:'BBC Learning English', use:'中高级输入主平台', phase:'第 13–39 周', points:['Real Easy English','6 Minute English','English for Work 与发音语法'], url:'https://www.bbc.co.uk/learningenglish/' },
    { name:'ChatGPT Voice', use:'口语和工作场景', phase:'全年，每周 2–3 次', points:['对话、会议和面试模拟','先完成表达，再集中纠错','保留录音或会话文字'], url:'https://chatgpt.com/' },
    { name:'Grammar in Use', use:'语法参考和练习', phase:'全年', points:['前半年 Essential 版本','后半年 English Grammar in Use','只学习本周会使用的章节'], url:'https://www.cambridge.org/elt/grammarinuse' },
    { name:'Oxford Bookworms', use:'分级阅读', phase:'第 1–24 周', points:['Starter 到 Level 3','读后必须口头或书面摘要','每页查词逐步降至 5 个以内'], url:'https://elt.oup.com/catalogue/items/global/graded_readers/oxford_bookworms_library/' },
    { name:'IELTS Official', use:'评分标准和免费样题', phase:'第 24 周后逐步增加', points:['先熟悉题型再刷题','使用官方评分维度','每次测试严格计时'], url:'https://ielts.org/take-a-test/preparation-resources/sample-test-questions' },
    { name:'Cambridge IELTS', use:'完整真题和模考', phase:'第 36–52 周', points:['购买最近三册对应考试类型','未做过的套题留给完整模考','错题按题型和原因分类'], url:'https://www.cambridge.org/elt/blog/category/exams/ielts/' },
    { name:'影视材料', use:'自然语速和职场语境', phase:'第 13–39 周', points:['A2–B1 Modern Family','B1–B2 The Office','技术职场 Silicon Valley'], url:'https://www.imdb.com/' },
  ];
  return { phases, weeks, materials };
})();
