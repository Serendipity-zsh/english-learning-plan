/* Original learning material. These practice questions are not official IELTS questions. */
(function () {
  'use strict';
  const lessons = [
    {
      week: 1, phase: 'rebuild', level: 'B1', title: '用证据介绍现在的自己',
      canDo: '不看稿完成 90 秒自我介绍，说明职责、当前项目和一个待提升点。',
      g: ['一般现在时与现在进行时', '稳定职责用一般现在时；当前正在推进的项目用现在进行时。不要把每个工作动词都写成进行时。', 'I design mobile experiences for new customers.', 'This month, I am testing a simpler sign-up flow.'],
      textTitle: 'A Clear Introduction',
      body: `My name is Nico, and I work on digital products. I turn complicated tasks into experiences that people can understand. At the moment, I am improving a sign-up flow for a small service. The current version asks for too much information before users can explore the product. I am interviewing three new users and testing a shorter form. I can explain my design decisions in writing, but I sometimes need extra time in meetings. My goal this year is to speak more clearly, ask useful questions, and support my ideas with evidence.`,
      c: [['work on', '参与或推进某事'], ['at the moment', '目前；此刻'], ['sign-up flow', '注册流程'], ['design decisions', '设计决策'], ['support my ideas with evidence', '用证据支持自己的想法']],
      q: [
        ['What is Nico improving?', 'A sign-up flow.', 'A delivery route.', 'A payment policy.', '文中明确说正在改进注册流程。'],
        ['What is the problem with the current version?', 'It asks for too much information too early.', 'It has no pictures.', 'It cannot display prices.', '问题是用户探索产品之前就被索要过多信息。'],
        ['What does Nico want to improve in meetings?', 'Speaking clearly and asking useful questions.', 'Drawing faster pictures.', 'Avoiding all questions.', '结尾列出清晰表达、有效提问和用证据支持想法。'],
        ['Choose the sentence for a temporary project.', 'I am testing a shorter form this month.', 'I testing a shorter form this month.', 'I am test a shorter form this month.', '现在进行时是 am/is/are + 动词-ing。'],
        ['Which introduction gives a clear professional role?', 'I design mobile products for small businesses.', 'I am a person with many things.', 'My work is very, very good.', '具体说明做什么、服务谁，比空泛评价更清楚。']
      ],
      s: ['回答：What do you do, what are you working on, and what would you like to improve? 先录音，再听一次并重录。', '说明一个稳定职责', '用现在进行时说明一个当前项目', '说出一个具体待提升点'],
      w: ['写一段给新同事的自我介绍邮件，包含职责、当前项目和希望如何合作。120–160 words；这是站内基线作品，不是雅思评分。', 120, 160, '职责与当前项目时态不同且合理', '包含一个具体合作邀请', '保存初稿与修改稿各一份'],
      p: ['第一次加入远程设计团队', '一条可发送到团队频道的 60–80 words 介绍', '你是新加入的设计师，向产品经理和工程师介绍自己，并邀请他们分享项目背景。'],
      resources: ['bc-b1', 'write-improve'], reviewTip: '明天不看稿复述三个信息点；第 7 天重录同一道题，比较停顿和信息完整度。'
    },
    {
      week: 2, phase: 'rebuild', level: 'B1', title: '把用户访谈问清楚',
      canDo: '提出 5 个不诱导回答的访谈问题，并追问一次具体经历。',
      g: ['过去经历的特殊疑问句', '询问已发生的行为用 What/How/When + did + 主语 + 动词原形；避免只问用户喜不喜欢你的方案。', 'What did you do after the page stopped loading?', 'How did you decide which option to choose?'],
      textTitle: 'Ask About the Last Time',
      body: `During a research session, Nico wants to understand how people book appointments. The first question is, “Would you like a faster booking page?” Almost everyone says yes, but the answer gives little useful detail. Nico changes the question: “Tell me about the last time you booked an appointment.” One participant describes opening three different websites to compare available times. Another explains that she called the clinic because she could not find the cancellation rules. Nico writes down these actions before suggesting solutions. A real example often reveals more than an imagined preference.`,
      c: [['research session', '研究访谈场次'], ['available times', '可预约时段'], ['cancellation rules', '取消规则'], ['write down', '记下'], ['imagined preference', '假设情境下的偏好']],
      q: [
        ['Why is the first question not very useful?', 'It produces agreement without detailed behavior.', 'It is about a different service.', 'It is too difficult to read.', '多数人回答 yes，但没有提供实际行为细节。'],
        ['Why did one participant call the clinic?', 'She could not find the cancellation rules.', 'She wanted a different doctor.', 'She lost her password.', '原文给出的原因是找不到取消规则。'],
        ['What does Nico record before suggesting solutions?', 'The participants’ actions.', 'A finished screen design.', 'The clinic’s revenue.', '先记录行为，再提出解决方案。'],
        ['Choose the correct question.', 'What did you do next?', 'What did you did next?', 'What you did next?', 'did 后用动词原形，疑问句需要倒装。'],
        ['Which question is least leading?', 'Tell me about the last time you cancelled a booking.', 'You prefer our new page, right?', 'Would you love a perfect app?', '询问真实经历不预设对方案的正面评价。']
      ],
      s: ['模拟访谈：Tell me about the last time you booked a service online. 先提出开放问题，再根据回答追问。', '问出 3 个过去经历问题', '至少一次追问具体动作', '没有用“你是不是更喜欢”引导答案'],
      w: ['写一份 130–170 words 访谈备忘录：研究问题、两条行为发现、一项仍需验证的问题。没有真实访谈时明确标记为模拟。', 130, 170, '区分观察与猜测', '记录两条具体行为', '提出下一次访谈的开放问题'],
      p: ['为预约服务设计一份访谈提纲', '5 个开放问题＋2 个中性追问', '你负责研究预约失败原因，向产品经理解释为什么先问过去经历。'],
      resources: ['bc-b1', 'work-email'], reviewTip: '48 小时后把 5 个问题脱稿说出；删除含“更好、更喜欢、是不是”的诱导表达。'
    },
    {
      week: 3, phase: 'rebuild', level: 'B1', title: '汇报进展和仍未完成的事',
      canDo: '用 3 句话分别说明已完成、最近变化和下一步。',
      g: ['一般过去时与现在完成时', '有明确已结束时间用过去时；强调截至现在的结果用 have/has + 过去分词。不要写 yesterday with have done。', 'We interviewed four customers yesterday.', 'We have identified two recurring problems.'],
      textTitle: 'An Update That Helps the Team',
      body: `Last Tuesday, the team watched four customers use a delivery app. Two people entered the wrong building number, and one person could not correct an address after paying. Since then, Nico has grouped the notes into two themes: entering information and correcting mistakes. The team has not chosen a solution yet. Tomorrow, Nico will share two low-fidelity options with the engineer. The update does not say that the redesign is successful. It explains what happened, what the team has learned so far, and what decision comes next. This makes progress visible without making promises.`,
      c: [['since then', '从那以后'], ['recurring problem', '反复出现的问题'], ['low-fidelity option', '低保真方案'], ['so far', '到目前为止'], ['make progress visible', '让进展可见']],
      q: [
        ['What did two customers enter incorrectly?', 'The building number.', 'The discount code.', 'The delivery date.', '文中两人输错的是楼号。'],
        ['Has the team selected a solution?', 'No, it has not selected one yet.', 'Yes, it has launched both options.', 'Yes, a customer selected it.', '原文明确使用 has not chosen a solution yet。'],
        ['What will Nico share tomorrow?', 'Two low-fidelity options.', 'A guaranteed revenue forecast.', 'A completed marketing campaign.', '下一步是和工程师分享两个低保真方案。'],
        ['Which sentence uses time correctly?', 'We interviewed four customers last Tuesday.', 'We have interviewed four customers last Tuesday.', 'We has interview customers last Tuesday.', 'last Tuesday 是明确结束的过去时间，用过去时。'],
        ['Which update avoids an unsupported claim?', 'We found two issues; we still need to test the options.', 'The redesign will definitely succeed.', 'Everyone will love the final screen.', '尚未测试时应说明证据与未知，而非保证成功。']
      ],
      s: ['回答：What did you finish, what have you learned, and what will you do next? 用一个真实或明确标记的模拟项目。', '包含一个明确过去时间', '用 have/has done 总结当前结果', '说明一个未完成决定'],
      w: ['写 120–170 words 周进展邮件，使用 Done / Learned / Next 三小段，每段提供一项具体信息。', 120, 170, '明确过去事实和当前结果', '至少一句说明限制或未知', '下一步含负责人或时间'],
      p: ['向跨时区团队发异步进展', '一条 3 段状态更新', '你已完成访谈但没有验证方案，向工程师解释目前能开始什么、不能承诺什么。'],
      resources: ['bc-b1', 'work-email'], reviewTip: '复习第 1 周介绍；把其中一个项目句改成“上周做了／截至现在完成了”两个版本。'
    },
    {
      week: 4, phase: 'rebuild', level: 'B1', title: '谈可访问性而不说空话',
      canDo: '指出 3 个具体可访问性问题，并写出可检查的修复标准。',
      g: ['可数、不可数与数量表达', 'information、feedback 通常不可数；用 some information / a piece of feedback。many 修饰可数复数，much 修饰不可数。', 'We received useful feedback from three participants.', 'There are too many steps and not enough instructions.'],
      textTitle: 'A Small Change With a Clear Test',
      body: `A form uses pale grey text to explain which fields are required. During a test, a participant overlooks the instructions and submits an incomplete form. Another participant uses a keyboard but cannot see which button is selected. Nico does not describe these as minor visual preferences. The team writes two checks: required fields must be clearly identified, and keyboard focus must remain visible. They also review the error messages because “Something went wrong” provides little information. The first repair changes the instructions and focus style. A later test will check whether people can complete the form independently.`,
      c: [['required field', '必填字段'], ['keyboard focus', '键盘焦点'], ['remain visible', '保持可见'], ['error message', '错误提示'], ['complete independently', '独立完成']],
      q: [
        ['What does the first participant overlook?', 'The instructions about required fields.', 'A promotional video.', 'The account balance.', '第一位参与者漏看了必填说明。'],
        ['What is the keyboard user unable to see?', 'Which button is selected.', 'The page title.', 'The price of the service.', '键盘焦点不可见，无法判断选中的按钮。'],
        ['Why is “Something went wrong” weak?', 'It provides little useful information.', 'It contains too many numbers.', 'It asks for a new password.', '它没有帮助用户理解错误和下一步。'],
        ['Choose the natural sentence.', 'We need more information about the error.', 'We need more informations about the error.', 'We need many information about the error.', 'information 不可数，不能加 s 或用 many。'],
        ['Which repair standard is observable?', 'Keyboard focus remains visible on every control.', 'The page feels amazing.', 'The form looks modern enough.', '能逐个控件检查焦点，标准可观察。']
      ],
      s: ['回答：What prevents someone from completing this form, and how would you test the repair? 选一个你常用的表单。', '描述 2 个具体障碍', '避免仅说好看或不好看', '给出一个可重复检查动作'],
      w: ['写 130–180 words 可访问性修复说明：问题、受影响的操作、修复及验证方式。', 130, 180, '不用障碍替代用户能力评价', '包含两项可检查标准', '正确使用 information / feedback'],
      p: ['设计评审中讨论表单错误状态', '3 条可验收的 issue 描述', '你是设计师，向工程师说明当前行为、预期行为和验证步骤。'],
      resources: ['bc-b1', 'write-improve'], reviewTip: '第 7 天不看原文解释 required field、keyboard focus、error message，并各举一个例子。'
    },
    {
      week: 5, phase: 'rebuild', level: 'B1', title: '礼貌提出明确请求',
      canDo: '把 3 条模糊消息改写为包含动作、原因和期限的请求。',
      g: ['请求中的 could / would', 'Could you + 动词原形用于礼貌请求；Would you mind + 动词-ing。礼貌并不等于隐藏动作与期限。', 'Could you review the empty state by Thursday?', 'Would you mind checking the updated labels?'],
      textTitle: 'A Request People Can Act On',
      body: `Nico sends a message saying, “Please take a look when you have time.” The engineer cannot tell which screen matters or when a reply is needed. Nico rewrites it: “Could you review the empty state on the saved-items screen by Thursday afternoon? I need to confirm whether we can support the illustration before Friday’s review.” The new message includes a link and one focused question. It does not ask the engineer to review every design decision. When the engineer says Thursday is too late for implementation, Nico suggests using a simple icon for the first release.`,
      c: [['take a look', '看一下'], ['empty state', '空状态'], ['focused question', '聚焦的问题'], ['first release', '首个发布版本'], ['by Thursday afternoon', '最晚周四下午']],
      q: [
        ['Why is the first message difficult to act on?', 'The target and deadline are unclear.', 'The link has expired.', 'It is written in another language.', '原消息没有说明具体屏幕和回复期限。'],
        ['What does Nico need to confirm?', 'Whether the illustration can be supported.', 'How many users have paid.', 'Which office to visit.', '请求用于确认插图能否实现。'],
        ['What alternative does Nico suggest?', 'A simple icon for the first release.', 'Cancelling every design review.', 'Adding more illustrations immediately.', '在时间不足时建议首版使用简单图标。'],
        ['Choose the correct request.', 'Could you review the updated labels?', 'Could you reviewed the updated labels?', 'Could you to review the updated labels?', '情态动词 could 后接动词原形。'],
        ['Which message is both polite and actionable?', 'Could you check screen B by 3 pm so we can approve the release?', 'Please help with everything soon.', 'Why have you not fixed my design?', '明确对象、期限和原因，同时保持礼貌。']
      ],
      s: ['模拟：Ask an engineer to check one design detail, then respond when they cannot meet the deadline.', '请求说明具体对象', '说明期限和业务原因', '给出一个可协商替代方案'],
      w: ['写两条工作消息共 120–160 words：首次请求，以及对方表示来不及时的跟进。', 120, 160, '每条有一个主要请求', '期限用 by 而非含糊 soon', '跟进提出替代而不指责'],
      p: ['实现前确认一个空状态', '一条含链接占位、问题、截止时间的请求', '向忙碌的工程师请求技术可行性反馈；允许对方协商范围和时间。'],
      resources: ['bc-b1', 'work-email'], reviewTip: '从自己的聊天中选一条模糊请求，按“动作＋对象＋期限＋原因”重写，不发送也可。'
    },
    {
      week: 6, phase: 'rebuild', level: 'B1', title: '比较方案和确定优先级',
      canDo: '按相同的 3 个标准比较两个方案，并明确一项取舍。',
      g: ['比较级与比较结构', '比较要说明维度。less + 形容词；as...as；than 后保持比较对象平行。', 'Option A is easier to build than option B.', 'The shorter flow is not as flexible as the original one.'],
      textTitle: 'Choose With the Same Criteria',
      body: `The team has two ideas for helping users find old orders. Option A adds a search box to the existing page. Option B creates a new order-history section with filters. Nico compares both ideas using the same criteria: user value, implementation effort, and maintenance. The new section is more flexible, but it requires more engineering work. The search box is less powerful, yet it addresses the most common request. The team chooses the search box for the next release and records what it will not support. They will review filter requests after collecting usage data.`,
      c: [['the same criteria', '相同的标准'], ['implementation effort', '实现工作量'], ['maintenance', '维护'], ['address a request', '回应一项需求'], ['usage data', '使用数据']],
      q: [
        ['What does option A add?', 'A search box to the existing page.', 'A new delivery service.', 'A separate billing system.', '方案 A 是在已有页面增加搜索框。'],
        ['Why is option B not selected for the next release?', 'It requires more engineering work.', 'It cannot support filters.', 'It has no user value at all.', '文本承认它灵活，但实现成本更高。'],
        ['When will the team review filter requests?', 'After collecting usage data.', 'Before anyone can search.', 'Only after deleting old orders.', '后续根据使用数据复查筛选需求。'],
        ['Choose the correct comparison.', 'Option A is easier to build than option B.', 'Option A is more easier to build than option B.', 'Option A is easiest than option B.', 'easier 已是比较级，不能再加 more。'],
        ['Which comparison is most useful?', 'A is faster to build; B supports more filters.', 'A is better because I like it.', 'B looks expensive and therefore must be good.', '明确可讨论的比较维度，比个人喜好有用。']
      ],
      s: ['回答：Which of two design options would you choose for a limited release, and why? 自选真实或模拟方案。', '使用同样 3 个比较标准', '说出被选方案的一个缺点', '说明何时重新评估'],
      w: ['写 140–180 words 决策备忘录：两个方案、三个标准、选择和保留问题。', 140, 180, '比较对象平行', '至少正确使用两个比较结构', '结论与前文证据相符'],
      p: ['有限开发资源下确定搜索需求', '一张 2 方案×3 标准的小表及决策句', '向产品经理说明为什么首版不做全部筛选，并定义复查信号。'],
      resources: ['bc-b1', 'write-improve'], reviewTip: '隔两天用英文重述被否决方案的优势，防止只记住自己偏好的论点。'
    },
    {
      week: 7, phase: 'rebuild', level: 'B1', title: '安排计划与提前暴露风险',
      canDo: '说明时间安排、一个依赖和一个风险后的调整方案。',
      g: ['未来安排与意图', '已安排好的会议可用现在进行时；计划与意图用 be going to；当场承诺可用 will。', 'We are meeting the researcher on Wednesday.', 'I am going to test the new labels before the review.'],
      textTitle: 'A Plan With a Dependency',
      body: `Nico is presenting a prototype next Friday. Before the presentation, the team is going to test the main task with three people. The researcher is available on Wednesday, but the engineer needs the updated text by Tuesday. Nico notices that the plan depends on receiving legal feedback about consent. Instead of silently waiting, Nico shares the dependency in the team channel. If the feedback does not arrive on Monday, the test will use a clearly labelled sample statement. The prototype will not collect real personal information. Everyone can now see both the intended plan and the fallback.`,
      c: [['depend on', '依赖'], ['legal feedback', '法务意见'], ['consent', '同意；授权'], ['fallback', '备用方案'], ['personal information', '个人信息']],
      q: [
        ['When does the engineer need the updated text?', 'By Tuesday.', 'By Friday evening.', 'After the presentation.', '文中明确工程师周二需要文案。'],
        ['What dependency does Nico identify?', 'Legal feedback about consent.', 'A new office location.', 'The launch of a competitor’s app.', '计划依赖法务对授权文字的反馈。'],
        ['What will the prototype avoid collecting?', 'Real personal information.', 'Feedback on the main task.', 'The number of completed steps.', '备用测试不采集真实个人信息。'],
        ['Which sentence describes an arranged meeting?', 'We are meeting the researcher on Wednesday.', 'We meeting researcher Wednesday.', 'We are meet the researcher Wednesday.', '现在进行时可以表达已安排的未来活动。'],
        ['Which risk update is most actionable?', 'If legal feedback is late, we will use a labelled sample.', 'Something might happen one day.', 'There are no possible risks.', '明确触发条件和应对动作的风险说明可执行。']
      ],
      s: ['回答：What will happen next week, what does it depend on, and what is your fallback? 用 3–4 句说明。', '给出两个日期或时间点', '指出一项依赖', '用 if 说明备用动作'],
      w: ['写 130–170 words 测试计划邮件，包括时间、人员、依赖、风险处理和需要的回复。', 130, 170, '时间顺序一致', '每个关键动作有负责人', '备用方案不把原型误说成正式产品'],
      p: ['用户测试前一天发现法务意见未到', '一条风险更新＋调整后的三步计划', '向产品经理说明测试如何继续，以及哪些数据不应采集。'],
      resources: ['bc-b1', 'work-email'], reviewTip: '复述第 3 周进展，再加本周未来安排；辨别已完成、正在做、将要做。'
    },
    {
      week: 8, phase: 'rebuild', level: 'B1', title: '第一轮复盘：结果不等于自信',
      canDo: '独立完成阶段复测，用录音、改稿和题目结果说明进步及不足。',
      g: ['because 与 so：因果表达', 'because 引导原因；so 引出结果。标准英文中避免同一句 because...so... 双重连接。', 'We shortened the instructions because users missed the main action.', 'Users missed the main action, so we shortened the instructions.'],
      textTitle: 'Measure a Repeatable Task',
      body: `After seven weeks of practice, Nico feels more comfortable speaking English. Feeling comfortable is useful, but it does not show exactly what has improved. Nico repeats the introduction recorded in week one without reading the old script. A friend checks whether the new recording explains the role, the current project, and a learning goal. Nico also rewrites the original email and counts repeated errors. The recordings and drafts remain saved together. The review does not produce an IELTS band. It identifies one stronger skill and one task that still needs practice before the next stage.`,
      c: [['repeatable task', '可重复的任务'], ['without reading', '不看稿'], ['repeated error', '反复出现的错误'], ['remain saved', '保持保存'], ['the next stage', '下一阶段']],
      q: [
        ['Why does Nico repeat the original introduction?', 'To compare performance on the same task.', 'To memorise a new advertisement.', 'To avoid all speaking practice.', '同一任务更方便比较前后表现。'],
        ['What does the friend check?', 'Whether three required information points are included.', 'Whether the accent sounds American.', 'Whether the recording has background music.', '检查的是职责、项目、目标三个信息点。'],
        ['What does this review not produce?', 'An IELTS band score.', 'A saved recording.', 'A practice priority.', '站内任务复盘不能生成真实雅思等级分。'],
        ['Choose the correct cause-and-effect sentence.', 'The message was unclear, so I rewrote it.', 'Because the message was unclear, so I rewrote it.', 'The message was unclear because I rewrote so.', '用 so 连接结果即可，不同时加 because。'],
        ['Which evidence best supports improvement?', 'A new recording covers all three points with fewer long pauses.', 'I bought a new notebook.', 'I opened the learning site daily.', '可比较作品表现比打开网站或购物更能证明能力变化。']
      ],
      s: ['重答第 1 周原题，不看旧稿。请同伴按“职责、当前项目、改进目标”逐项标记有／无，再比较长停顿。', '覆盖 3 个原始信息点', '保留原录音与复测录音', '记录一个仍需练习的表达'],
      w: ['不看旧稿重写第 1 周介绍邮件，120–160 words。对照两稿，列出三类变化；不能用站内题目推算雅思分。', 120, 160, '表达完整且语气适合同事', '逐项检查动词时态与请求', '保留前后对照和一个下一步'],
      p: ['向导师汇报八周英语学习证据', '一页阶段回顾：作品链接、已会任务、下阶段重点', '扮演学习者，解释自己能独立完成什么，并请导师验证尚不确定的部分。'],
      resources: ['bc-b1', 'write-improve', 'ielts-scoring'], reviewTip: '本周复习第 1、3、5、6 周词块；答错题隔 48 小时闭卷重做，不能只看解析。'
    },
    {
      week: 9, phase: 'bridge', level: 'B1–B2', title: '从观察到研究结论',
      canDo: '将 3 条观察整理为一个有依据且有限定的研究洞察。',
      g: ['因果、相关与不确定性', 'because 表达有根据的原因；may / might 表达可能。观察到同时发生，不等于证明因果。', 'Users may hesitate because the delivery date is unclear.', 'The interviews suggest a problem, but they do not prove its frequency.'],
      textTitle: 'A Pattern Is Not a Population',
      body: `Five participants test a grocery app. Three pause when choosing a delivery slot, and two ask whether the displayed time is guaranteed. Nico groups the notes under “uncertainty about delivery.” This pattern suggests a question worth investigating, but five interviews cannot show how common the issue is across all customers. The team checks support messages and plans a short survey. Nico avoids writing, “Most users hate the delivery page.” Instead, the finding states what happened in this sample, explains a possible interpretation, and proposes a way to gather broader evidence before changing the product.`,
      c: [['delivery slot', '配送时段'], ['in this sample', '在这个样本中'], ['possible interpretation', '可能的解释'], ['broader evidence', '更广泛的证据'], ['worth investigating', '值得进一步调查']],
      q: [
        ['How many participants paused at the delivery choice?', 'Three.', 'All five.', 'Two hundred.', '文中说三人停顿，两人询问是否保证时段。'],
        ['What will the team examine next?', 'Support messages and a short survey.', 'Only the designer’s preference.', 'A guaranteed sales increase.', '团队结合客服消息与问卷补充证据。'],
        ['Why avoid “Most users hate the page”?', 'The small sample does not support that broad claim.', 'The word page is not English.', 'No one used the app.', '小样本中的观察不能直接泛化成多数用户的态度。'],
        ['Which sentence expresses a cautious interpretation?', 'Unclear timing may cause hesitation.', 'Unclear timing always destroys every order.', 'Timing definitely caused every problem.', 'may 保留不确定性，与有限证据匹配。'],
        ['Which finding separates observation from interpretation?', 'Three people paused; unclear timing may be one reason.', 'Everyone is confused because our designer is right.', 'The product is bad, which needs no evidence.', '先报告观察，再给出有限定的解释。']
      ],
      s: ['回答：What did you observe, what might it mean, and what evidence would you collect next? 使用文中样本。', '准确说出样本数量', '用 may / suggest 表达解释', '提出一种补充证据'],
      w: ['写 150–190 words 研究发现：观察、解释、限制和下一步。不要把模拟数据写成真实业务数据。', 150, 190, '观察和解释分开', '明确样本限制', '不使用无依据的 all / most / always'],
      p: ['研究复盘会上解释小样本发现', '一条包含证据与限制的 insight 卡片', '产品经理想马上宣称多数用户不满意，你需要准确说明当前证据支持到哪里。'],
      resources: ['bc-b2', 'write-improve'], reviewTip: '复习第 2 周中性提问；将一个绝对化结论改为观察、解释、验证三句。'
    },
    {
      week: 10, phase: 'bridge', level: 'B1–B2', title: '有分寸地表达不同意见',
      canDo: '先复述对方考虑，再提出有证据的异议和可测试建议。',
      g: ['情态动词与缓和表达', 'could / might / may 可降低没有证据的确定性；缓和语气后仍应把核心问题说明白。', 'This approach could increase the number of accidental clicks.', 'Could we compare both versions before making the change?'],
      textTitle: 'Disagree With the Idea, Help the Decision',
      body: `A stakeholder wants the subscription button to fill the whole screen. Nico understands the aim: make the offer easier to notice. However, the larger button pushes important pricing details below the visible area. Nico says, “I agree that the offer should be clear. I am concerned that people may miss the renewal price. Could we test a version that keeps both the price and the action visible?” The discussion moves from personal taste to a testable question. The stakeholder does not have to admit being wrong. Both people can agree on what they want users to understand.`,
      c: [['renewal price', '续订价格'], ['I am concerned that', '我担心……'], ['personal taste', '个人审美偏好'], ['testable question', '可验证的问题'], ['keep both visible', '让两者都保持可见']],
      q: [
        ['What is the stakeholder trying to improve?', 'The visibility of the offer.', 'The company’s office furniture.', 'The length of legal contracts.', '对方希望优惠更容易被注意。'],
        ['What concern does Nico raise?', 'Users may miss the renewal price.', 'The button cannot contain text.', 'The product has no subscription.', '大按钮挤走了价格信息。'],
        ['What helps both people move forward?', 'Agreeing on what users should understand.', 'Deciding whose taste is superior.', 'Removing all pricing details.', '共同用户目标让讨论成为可验证决策。'],
        ['Which sentence raises a measured concern?', 'This change might make the price harder to find.', 'This change absolutely ruins everything.', 'You always make terrible decisions.', 'might 与具体影响一起表达有限而清楚的担忧。'],
        ['Which reply combines acknowledgment and a proposal?', 'I see the visibility goal; could we test a version that also shows the price?', 'No, because I am the designer.', 'Fine, do whatever you like.', '先认可目标，再提出实验方案，能推进决策。']
      ],
      s: ['角色扮演：A manager wants a huge subscribe button. Respond with acknowledgment, concern, and a test proposal.', '复述对方目标而不讽刺', '说明一个具体用户风险', '提出可比较的替代方案'],
      w: ['写 150–190 words 设计评审回复，反对隐藏续订价格的方案，并提出验证办法。', 150, 190, '先说明共同目标', '论点围绕用户影响', '最后提出一个明确决定或实验'],
      p: ['与利益相关方讨论订阅页', '一段 4 句设计异议和测试提案', '你需要保护价格透明度，同时让讨论继续推进；避免人身评价。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '把三条“这是错误的”改成“目标＋风险＋建议”；第 3 天脱稿说其中一条。'
    },
    {
      week: 11, phase: 'bridge', level: 'B1–B2', title: '提出可验证的实验假设',
      canDo: '写出一个包含改动、预期影响和观察指标的假设。',
      g: ['第一条件句', '真实可能的未来条件：if + 一般现在时，主句 will / may + 动词原形；if 从句通常不加 will。', 'If we explain the delivery window, fewer people may contact support.', 'If the test reveals new confusion, we will revise the wording.'],
      textTitle: 'Before Calling a Change Successful',
      body: `The team wants to replace “Continue” with “Choose delivery time” on a checkout button. Nico writes a hypothesis: if the label describes the next step, more participants will predict where the button leads. In a small usability test, the team will ask that question before anyone clicks. They will also watch whether the longer label fits on small screens. The test can reveal comprehension problems, but it cannot establish a reliable sales effect. If people understand the label better, the team may run a separate experiment with enough traffic to examine completion rates.`,
      c: [['write a hypothesis', '写出假设'], ['predict the next step', '预测下一步'], ['completion rate', '完成率'], ['enough traffic', '足够的流量'], ['a separate experiment', '另一项独立实验']],
      q: [
        ['What is the proposed new button label?', 'Choose delivery time.', 'Pay without checking.', 'Contact the office.', '改动是将 Continue 换成更具体的下一步动作。'],
        ['When will the comprehension question be asked?', 'Before the participant clicks.', 'After the product is deleted.', 'Only after the participant pays.', '避免点击结果影响回答，先问预测。'],
        ['What can this small test not establish?', 'A reliable sales effect.', 'Whether the label fits.', 'Whether participants understand the next step.', '小规模可用性测试不能可靠证明销售效果。'],
        ['Choose the correct first conditional.', 'If the label is clearer, more people may understand it.', 'If the label will be clearer, more people understanded it.', 'If the label clearer, more people may understands it.', '条件从句一般现在时，主句可用 may。'],
        ['Which hypothesis is testable?', 'If we name the next step, more people will predict it correctly.', 'If we make it nicer, everything will be perfect.', 'Our design is modern, so no testing is necessary.', '改动与可观察行为之间有明确关系。']
      ],
      s: ['回答：What would you change, what do you expect, and how would you check it? 以按钮文案为例。', '说出一项独立改动', '用 if 连接改动与预期', '区分理解测试与转化实验'],
      w: ['写 150–200 words 实验提案，列出假设、观察方式、潜在副作用和本次无法回答的问题。', 150, 200, '假设可被证据反驳', '指标与目标匹配', '包含小屏幕等副作用检查'],
      p: ['设计师向数据分析师请求实验支持', '一条假设＋两个观察指标＋一个限制', '请分析师评估后续实验需要什么数据，不虚构样本量或成功概率。'],
      resources: ['bc-b2', 'write-improve'], reviewTip: '第 2 天只看改动说出假设；第 7 天再解释为什么这不是销售提升的证明。'
    },
    {
      week: 12, phase: 'bridge', level: 'B1–B2', title: '讲清一次项目意外',
      canDo: '按背景、事件、应对、结果四部分讲述一次项目问题。',
      g: ['过去进行时与一般过去时', '过去进行时提供当时正在发生的背景；一般过去时描述打断背景的事件或完成动作。', 'We were testing the prototype when the connection failed.', 'I explained the problem and switched to a local copy.'],
      textTitle: 'When the Demo Stopped',
      body: `Nico was presenting a booking prototype when the meeting connection failed. The team had ten minutes left, and a stakeholder needed to leave early. Instead of spending the remaining time repeatedly reconnecting, Nico shared a local recording and described the two decisions that still needed input. The stakeholder watched the main task and replied in the chat. After the meeting, Nico sent a short summary separating approved decisions from open questions. The incident was inconvenient, but the team did not lose the whole review. For the next demo, Nico prepared an offline copy and tested it beforehand.`,
      c: [['the remaining time', '剩余时间'], ['local recording', '本地录屏'], ['open question', '待定问题'], ['offline copy', '离线副本'], ['test beforehand', '事先测试']],
      q: [
        ['What interrupted Nico’s presentation?', 'The meeting connection failed.', 'The client cancelled the product.', 'The prototype had no screens.', '连接失败打断演示。'],
        ['How did the stakeholder provide input?', 'By replying in the chat.', 'By redesigning every screen.', 'By waiting until next year.', '对方看了关键流程，通过聊天回复。'],
        ['What did the summary separate?', 'Approved decisions and open questions.', 'Full-time and part-time staff.', 'Free and paid illustrations.', '复盘邮件区分已批准与未解决事项。'],
        ['Choose the correct narrative sentence.', 'I was presenting when the connection failed.', 'I was presented when the connection was fail.', 'I presenting when the connection fails yesterday.', '进行时背景＋过去时事件。'],
        ['Which closing sentence shows learning?', 'Next time, I will test an offline copy before the meeting.', 'The internet is always impossible.', 'There is nothing I could ever prepare.', '将经历转化为具体准备动作才是有效反思。']
      ],
      s: ['回答：Tell me about a time something went wrong during a project. 使用真实经历；若用文中情境请说明是模拟。', '交代当时正在做什么', '说明自己采取的两个动作', '结尾包含下一次的改进'],
      w: ['写 160–200 words 项目复盘，按背景、问题、处理、学习组织，不夸大个人贡献。', 160, 200, '过去时态基本一致', '区分团队结果与个人动作', '学习点能转化为下一次动作'],
      p: ['远程评审演示故障', '一份 5 行故障后会议总结', '你是会议主持人，汇总已经确认的决定、待定问题及下一位负责人。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '隔 48 小时不看稿讲同一经历；用四个关键词代替整段背诵。'
    },
    {
      week: 13, phase: 'bridge', level: 'B1–B2', title: '把需求写成验收条件',
      canDo: '把一句模糊需求拆成 3 条可验证的验收条件。',
      g: ['must / should / can 的要求强度', 'must 表达必要条件；should 是建议或期望；can 表达能力或许可。不要用 should 隐藏发布阻断条件。', 'Users must be able to correct an address before paying.', 'The form should explain why a phone number is requested.'],
      textTitle: 'Make “Easy to Use” Checkable',
      body: `A ticket asks the team to make address editing “easy to use.” The phrase sounds positive but does not define completion. Nico meets the engineer and writes three acceptance checks. A customer must be able to open editing from the order summary. The form must preserve unchanged fields after an error. The confirmation screen must show the updated address before payment. The team also recommends shorter help text, but that improvement is not required for this release. Separating necessary behavior from recommendations prevents a useful suggestion from becoming an unexpected blocker at the last minute.`,
      c: [['acceptance check', '验收检查项'], ['preserve unchanged fields', '保留未修改字段'], ['order summary', '订单概览'], ['release blocker', '发布阻断项'], ['at the last minute', '在最后一刻']],
      q: [
        ['What is wrong with “easy to use” in this ticket?', 'It does not define how to check completion.', 'It is grammatically impossible.', 'It specifies too many test steps.', '模糊形容词无法直接验收。'],
        ['What must the form preserve after an error?', 'Unchanged fields.', 'Only the error message.', 'An empty address.', '错误后要保留用户未修改的字段。'],
        ['Which change is a recommendation rather than a release requirement?', 'Shorter help text.', 'Opening editing from the summary.', 'Showing the updated address.', '文中将简化帮助文字列为建议，非本版必要项。'],
        ['Which sentence states a mandatory requirement?', 'The confirmation screen must show the updated address.', 'The screen might possibly show something.', 'It could maybe be nicer.', 'must 明确表达必要行为。'],
        ['Which acceptance check is directly testable?', 'After an error, unchanged fields keep their values.', 'The experience feels premium.', 'The page should be delightful enough.', '可执行一个错误场景观察字段是否保留。']
      ],
      s: ['回答：What does “done” mean for editing an address? 用 must / should 区分必要项和建议。', '提出 3 条可测试行为', '明确一项非阻断建议', '说明用户动作与预期结果'],
      w: ['写 160–200 words 需求说明，将“让修改地址更容易”转成验收条件和范围外事项。', 160, 200, '至少三项明确行为', '必要与建议强度清晰', '没有只有形容词的标准'],
      p: ['工程交接前清理模糊需求', '3 条 acceptance criteria＋1 条 out of scope', '你与工程师逐项确认可测试的行为，并说明当前版本不包含什么。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '重看第 4 周可访问性标准，把其中一个改成可执行的验收条件。'
    },
    {
      week: 14, phase: 'bridge', level: 'B1–B2', title: '异步交接：状态与责任都明确',
      canDo: '写清已完成内容、未决事项和每项下一步的负责人。',
      g: ['被动语态与明确责任', '被动语态用于强调对象或状态：be + 过去分词；需要责任明确时直接写负责人，避免全篇无人负责。', 'The prototype was updated yesterday.', 'Maya will check the error states by Thursday.'],
      textTitle: 'A Handover Across Time Zones',
      body: `Nico finishes work before the London team starts its day. A handover saying “The design is done” would leave too many questions. Instead, Nico links the latest prototype, lists the approved changes, and marks the empty states as still under review. The interaction notes were updated yesterday, but the accessibility check has not been completed. Maya will review keyboard behavior by Thursday. The engineer can begin the approved screens while waiting for that review. This handover explains both the state of the work and who owns the remaining decisions, so colleagues do not need to wait for Nico to wake up.`,
      c: [['under review', '正在审核'], ['interaction notes', '交互说明'], ['keyboard behavior', '键盘操作行为'], ['own a decision', '负责一项决策'], ['the latest prototype', '最新原型']],
      q: [
        ['Why does the handover need detail?', 'The teams work in different time zones.', 'The prototype has no link.', 'The London team never reads.', '时区不同，信息应足以让同事独立推进。'],
        ['What remains under review?', 'The empty states.', 'Every approved screen.', 'The company name.', '文中将空状态标为审核中。'],
        ['Who will review keyboard behavior?', 'Maya.', 'A customer from London.', 'No one has responsibility.', 'Maya 是明确的负责人。'],
        ['Choose the correct passive sentence.', 'The interaction notes were updated yesterday.', 'The interaction notes was update yesterday.', 'The interaction notes updated by yesterday are.', '复数主语用 were，后接过去分词。'],
        ['Which sentence makes ownership clearest?', 'Maya will review keyboard behavior by Thursday.', 'It will be looked at by someone.', 'A review may happen eventually.', '姓名、动作与期限让责任清晰。']
      ],
      s: ['回答：What is ready, what is still open, and who will do the next action? 模拟跨时区交接。', '分开已批准与待审内容', '每项未决事项有负责人', '说明同事现在能开始什么'],
      w: ['写 160–210 words 异步交接，含原型链接占位、状态、限制和 action owners。', 160, 210, '链接有描述而非仅写 here', '未完成事项不写成 done', '至少两项明确动作与期限'],
      p: ['向伦敦工程团队交接设计', '一条无需再次询问即可开工的消息', '你下线后无法立即回复；标出可实施屏幕、待确认事项与接手人。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '第 3 天用同一个项目做 60 秒口头交接；对照文字检查是否遗漏限制。'
    },
    {
      week: 15, phase: 'bridge', level: 'B1–B2', title: '解释取舍而不是堆连接词',
      canDo: '解释一个方案的收益、代价和适用条件，论点不自相矛盾。',
      g: ['although / however / despite', 'although 后接完整分句；despite 后接名词或动词-ing；however 通常作为句间转折。避免 although...but...重复。', 'Although the dashboard is flexible, it takes longer to learn.', 'Despite its flexibility, the dashboard is difficult for beginners.'],
      textTitle: 'Less Choice, Faster Decisions',
      body: `A reporting tool offers twelve chart styles. Experienced analysts appreciate the flexibility, but new users often select a style that does not match their data. Nico proposes showing three recommended styles first and keeping the others in an advanced menu. Although this adds a step for some experts, it may help beginners make a reasonable choice. The team does not remove the advanced options. It plans to test whether the recommendations reduce mismatched charts without making common expert tasks slower. The proposal succeeds only if both groups can complete their main tasks; a cleaner screen alone is not enough.`,
      c: [['recommended style', '推荐样式'], ['advanced menu', '高级选项菜单'], ['match the data', '适合数据'], ['a reasonable choice', '合理选择'], ['a step for experts', '专家用户多走的一步']],
      q: [
        ['What difficulty do new users experience?', 'They select styles that do not match their data.', 'They cannot access any chart.', 'They need to learn twelve languages.', '新手难以选择适合数据的图表。'],
        ['What happens to the advanced options?', 'They remain available in another menu.', 'They are removed permanently.', 'They become the only default.', '高级图表保留在高级菜单里。'],
        ['What must the test consider?', 'Both beginner success and expert task speed.', 'Only how empty the screen looks.', 'Only the number of chart colours.', '文中明确两类用户都要能完成主要任务。'],
        ['Choose the grammatically correct contrast.', 'Although it is flexible, it takes time to learn.', 'Although it is flexible, but it takes time to learn.', 'Despite it is flexible, it takes time to learn.', 'although 后接分句，不再加 but；despite 不能直接接分句。'],
        ['Which statement gives an honest trade-off?', 'Recommendations may help beginners but add a step for experts.', 'Fewer options always help every user.', 'Any clean screen proves success.', '收益与代价都具体，避免绝对化。']
      ],
      s: ['回答：Should a tool hide advanced options from beginners? 给出收益、代价和验证条件。', '使用一个正确的让步结构', '公平说明专家用户的代价', '用任务结果定义成功'],
      w: ['写 170–220 words 方案解释，讨论默认推荐与高级菜单的取舍。', 170, 220, '中心观点明确', '转折连接词结构正确', '结论包含条件而非绝对保证'],
      p: ['分析工具默认图表改版', '一份 benefits / costs / validation 决策摘要', '向资深分析师解释推荐设计，并请求他们提供必须快速完成的任务。'],
      resources: ['bc-b2', 'write-improve'], reviewTip: '把 although、despite、however 各写一版相同意思，再检查它们后面的结构。'
    },
    {
      week: 16, phase: 'bridge', level: 'B1–B2', title: '阶段复盘：讲一条完整产品故事',
      canDo: '在 2 分钟内讲清问题、证据、取舍、结果和限制。',
      g: ['定语从句：补充必要信息', 'who 指人，which 指事物，that 可用于限定从句；不要让一个长句塞入所有项目细节。', 'We interviewed customers who had abandoned the form.', 'The change that we tested kept the price visible.'],
      textTitle: 'A Story With an Honest Ending',
      body: `For the second review, Nico prepares a short story about the delivery project. It starts with the problem, not a gallery of finished screens. The story explains who experienced difficulty, what the team observed, and which alternatives were considered. Nico then describes a small test that improved participants’ understanding of the delivery window. The story does not claim that revenue increased, because no sales experiment was conducted. It ends with an unresolved question about repeat customers. A clear project story includes limitations as well as achievements, and it gives the listener enough detail to ask a meaningful follow-up question.`,
      c: [['abandon a form', '放弃填写表单'], ['alternatives considered', '考虑过的替代方案'], ['unresolved question', '尚未解决的问题'], ['repeat customer', '复购客户'], ['follow-up question', '追问']],
      q: [
        ['Where does Nico’s story start?', 'With the user problem.', 'With a gallery of polished screens.', 'With a claim about revenue.', '好的项目叙述先说明问题。'],
        ['What improved in the small test?', 'Participants’ understanding of the delivery window.', 'Annual revenue, with certainty.', 'The number of offices.', '结果只涉及测试中的理解表现。'],
        ['Why is revenue growth not claimed?', 'No sales experiment was conducted.', 'Revenue is never relevant.', 'Nico forgot to make a chart.', '没有相应证据就不能宣称销售增长。'],
        ['Choose the correct relative clause.', 'We spoke to customers who had abandoned the form.', 'We spoke to customers which had abandoned the form.', 'We spoke to customers where had abandoned the form.', '指代人用 who。'],
        ['Which ending makes the story more credible?', 'We still need to check how repeat customers use the change.', 'Every possible problem is solved forever.', 'Our design must be perfect because it is finished.', '说明尚待验证的范围，让结论与证据一致。']
      ],
      s: ['用 2 分钟回答：Tell me about a product decision you helped make. 再回答一个“证据有什么限制”的追问。', '覆盖问题、证据、取舍、结果', '明确个人贡献', '主动说明一个限制'],
      w: ['写 180–220 words 项目摘要，保存为作品集草稿；与第 8 周相比列出三项可观察变化。', 180, 220, '不是单纯屏幕清单', '结果有证据与范围', '至少一个自然的定语从句'],
      p: ['向新同事交代一个设计决定的来龙去脉', '一页项目叙事＋3 个可追问问题', '同事没有项目背景，解释清楚为什么这样做以及未来还需要查什么。'],
      resources: ['bc-b2', 'write-improve', 'ielts-scoring'], reviewTip: '本周复测第 9–15 周错题；请听者复述你的项目，若信息不符先修结构再修单词。'
    },
    {
      week: 17, phase: 'ielts', level: 'B2', title: '先确定考试任务再练习',
      canDo: '准确区分 Academic 和 General Training 写作 Task 1，并记录待选考试类型。',
      g: ['表达区别与共同点', 'both...and... 表达共同点；whereas 对比差异。比较对象应同类，不能混淆备考练习和官方评分。', 'Both tests include a Task 2 essay.', 'Academic Task 1 uses visual information, whereas General Training Task 1 requires a letter.'],
      textTitle: 'Choose the Right Preparation Route',
      body: `Nico opens two IELTS writing examples and notices that they ask for different types of response. One asks the writer to summarise visual information. The other describes a situation and asks for a letter. These are not interchangeable Task 1 exercises. Academic and General Training also have different reading materials, while both include a Task 2 essay. Nico records the test type as “not yet confirmed” and checks the receiving organisation’s requirements before booking. Until that choice is clear, Nico practises shared language skills and studies both Task 1 formats without pretending that a practice quiz predicts a band score.`,
      c: [['visual information', '图表等视觉信息'], ['not interchangeable', '不能互换'], ['receiving organisation', '接受成绩的机构'], ['not yet confirmed', '尚未确认'], ['shared language skills', '共同语言能力']],
      q: [
        ['What is the letter exercise associated with?', 'General Training Task 1.', 'Academic Task 1 only.', 'The speaking introduction.', 'GT Task 1 是情景信件。'],
        ['What do both test types include?', 'A Task 2 essay.', 'Exactly the same reading texts.', 'Only diagram descriptions.', '两类考试都有 Task 2 议论文。'],
        ['What should Nico check before booking?', 'The receiving organisation’s requirements.', 'Which test has the prettiest cover.', 'A quiz-generated band prediction.', '应按目标机构要求确定类型。'],
        ['Choose the correct comparison.', 'Both tests include an essay, whereas their Task 1 formats differ.', 'Both tests includes an essay whereas Task 1 same always.', 'Academic writes letters whereas General graphs only.', '主谓一致且事实正确；whereas 表达差异。'],
        ['What is an appropriate conclusion from a site quiz?', 'It shows which practice questions need review.', 'It certifies an IELTS band of 6.5.', 'It replaces the official examination.', '自编题只能定位练习中的问题，不能作为雅思评分。']
      ],
      s: ['解释：Which IELTS test type might you need, and what do you still need to verify? 未确定时明确说未确定。', '说清两类 Task 1 差别', '指出需要核对的目标机构', '不把站内测验说成官方预测'],
      w: ['写 160–210 words 备考路线说明，分别列出 Academic、GT 的 Task 1 任务及自己的待确认项。', 160, 210, '图表与信件不混淆', '写明 Task 1 至少 150 words、Task 2 至少 250 words', '考试类型未定则保留双分支'],
      p: ['向招聘或院校联系人核实语言要求', '一封含考试类型、最低分及有效期问题的简短询问信', '你不确定组织是否接受某类考试，礼貌询问，不假定 6.5 足够所有岗位。'],
      resources: ['ielts-academic', 'ielts-general', 'ielts-scoring'], reviewTip: '把考试类型、目标日期、各项要求写入自己的记录；机构未回复前不把假设改成事实。'
    },
    {
      week: 18, phase: 'ielts', level: 'B2', title: '阅读：找到主旨和证据位置',
      canDo: '为 3 个段落各写一句主旨，并标出答案的原文证据。',
      g: ['指代与段落衔接', 'this / these 常回指前句概念；先找到具体指代，再判断作者的结论，避免只匹配相同单词。', 'The team reduced the number of steps. This change helped first-time users.', 'Several labels were unclear. These were revised before the next test.'],
      textTitle: 'When a Garden Changes a Street',
      body: `A neighbourhood converts an unused car park into a shared garden. At first, residents mainly value the new benches and shade. Over time, the space also becomes a place to exchange tools and organise small events. This social role was not the original purpose of the project. However, the garden does not benefit everyone equally. Residents who work at night rarely attend daytime activities, and some nearby shops worry about losing parking. Evaluating the project therefore requires more than counting visitors. Interviews at different times could reveal whose needs remain unmet and help the organisers plan more inclusive activities.`,
      c: [['over time', '随着时间推移'], ['shared garden', '共享花园'], ['benefit equally', '获得同等收益'], ['needs remain unmet', '需求尚未满足'], ['more than counting', '不只是统计']],
      q: [
        ['What was the space before the project?', 'An unused car park.', 'A busy library.', 'A private swimming pool.', '开头明确原址是闲置停车场。'],
        ['What does “This social role” refer to?', 'Exchanging tools and organising events.', 'Charging drivers for parking.', 'Working night shifts.', '回指前句的社交用途，而不是停车或夜班。'],
        ['Why is visitor count insufficient?', 'Some groups’ needs may remain unmet.', 'Nobody visits the garden.', 'The organisers already know every need.', '游客数量不能覆盖受益不均和遗漏人群。'],
        ['What does “these” refer to in “Several labels were unclear. These were revised”?', 'The unclear labels.', 'The next test.', 'All visitors.', 'these 回指前句复数名词 labels。'],
        ['Which heading best covers the whole text?', 'A garden’s benefits and uneven impact.', 'How to grow one kind of tree.', 'Why all parking should disappear.', '主旨同时包含新增收益和不同群体的局限。']
      ],
      s: ['回答：What is the main point of this text, and whose perspective is missing? 不逐句翻译。', '一句话概括核心观点', '正确解释 this social role', '提出一个被遗漏群体'],
      w: ['写 150–190 words 阅读摘要与证据记录：主旨、三条证据、作者保留意见。此任务不是 IELTS Task 1。', 150, 190, '每个结论对应原文句子', '区分作者观点和个人建议', '不添加原文没有的数据'],
      p: ['产品研究中阅读社区反馈报告', '一份主旨＋证据＋未知项摘要', '向项目经理解释为什么单一活跃人数不能代表全部用户体验。'],
      resources: ['bc-b2', 'cambridge-practice'], reviewTip: '48 小时后只看标题复述主旨，再回原文验证；错题记录“定位错／指代错／推断过度”。'
    },
    {
      week: 19, phase: 'ielts', level: 'B2', title: '听力：识别改口与同义表达',
      canDo: '从一段更正信息中记录最终日期、地点和要带的物品。',
      g: ['更正与间接转述', '听见 initially / actually / instead 时更新最终答案；转述时保留最终事实，而非把所有听到的数字都记作答案。', 'The meeting was initially planned for Tuesday, but it is now on Thursday.', 'She said that we should bring a laptop instead of printed slides.'],
      textTitle: 'Listen for the Final Arrangement',
      body: `The workshop organiser leaves a voice message for the design team. The session was initially scheduled for Tuesday, but the speaker is unavailable that day. It will now take place on Thursday morning in Room 204, not the main hall. Participants do not need to print the slides. They should bring a laptop with the prototype downloaded, because the wireless connection may be unreliable. Nico writes only the final arrangements in the calendar, then sends a confirmation message. To practise listening, a partner can read this message aloud while Nico keeps the text closed and records the essential details.`,
      c: [['initially scheduled', '原定安排'], ['take place', '举行'], ['final arrangement', '最终安排'], ['unreliable connection', '不稳定连接'], ['confirmation message', '确认消息']],
      q: [
        ['When will the workshop take place?', 'Thursday morning.', 'Tuesday afternoon.', 'Monday evening.', 'Tuesday 是旧安排，最终为 Thursday morning。'],
        ['Where is the workshop?', 'Room 204.', 'The main hall.', 'The library entrance.', 'not the main hall 是排除信息。'],
        ['What should participants bring?', 'A laptop with the prototype downloaded.', 'Printed slides only.', 'A new wireless router.', '需要带下载好原型的电脑，不必打印幻灯片。'],
        ['Which sentence preserves the final arrangement?', 'The session has moved from Tuesday to Thursday.', 'The session is on Tuesday and Thursday.', 'The session was cancelled forever.', 'moved from...to...准确转述更改，而非两个日期都有效。'],
        ['Which is a useful confirmation?', 'Just to confirm: Thursday morning, Room 204, with an offline prototype?', 'I heard a lot of words and will guess.', 'Please repeat every message for no reason.', '复述关键事实并请求确认，可降低误解。']
      ],
      s: ['请同伴或系统朗读本课文本，你关闭文本后复述最终日期、地点、物品；没有音频时先做阅读理解并明确标记，不当作听力成绩。', '记录最终三个安排', '不把原日期写成最终日期', '用确认句核对一次'],
      w: ['写 150–180 words 工作坊确认邮件，说明变更、地点、准备事项与原因；再用官方听力材料做一次独立练习。', 150, 180, '最终信息无冲突', '解释离线准备原因', '阅读练习与真实听力结果分开记录'],
      p: ['收到语音中的会议改期', '一条 3 项最终安排的确认消息', '你负责更新团队日历，先核对最终信息，再通知同事准备离线原型。'],
      resources: ['cambridge-practice', 'bc-b2'], reviewTip: '隔一天用不同语速再次听；只统计听前没看过的题，阅读后回听记作精听复习。'
    },
    {
      week: 20, phase: 'ielts', level: 'B2', title: 'Academic Task 1：先写总览',
      canDo: '根据给定模拟数据写出不含推测原因的总览与对比。',
      g: ['数量变化与近似表达', 'rose from...to... 描述起点终点；by 描述变化量；approximately 表示近似。百分点与百分比变化不同。', 'The share rose from 20% to 35%.', 'This was an increase of 15 percentage points.'],
      textTitle: 'Describe What the Data Shows',
      body: `Nico practises with a small invented dataset, not an official IELTS question. In a survey of commuting choices, the share choosing cycling rises from 20% in 2015 to 35% in 2025. Public transport increases from 30% to 40%, while driving falls from 50% to 25%. The overview should highlight that both cycling and public transport gain share, whereas driving declines substantially. Public transport is the largest category at the end. Nico must not invent reasons such as cheaper tickets, because the figures do not provide them. After the overview, selected comparisons can support the main patterns.`,
      c: [['gain share', '占比增加'], ['percentage point', '百分点'], ['the largest category', '最大类别'], ['selected comparison', '有选择的对比'], ['invent a reason', '编造原因']],
      q: [
        ['Which category is largest in 2025?', 'Public transport.', 'Driving.', 'Cycling.', '2025 年公共交通 40%，高于 35% 与 25%。'],
        ['How many percentage points does cycling gain?', '15 percentage points.', '75 percentage points.', '35 percentage points.', '35%−20%=15 个百分点；不要混淆相对增幅。'],
        ['Why should Nico avoid explaining cheaper tickets?', 'The data gives no evidence for that cause.', 'Tickets are never related to travel.', 'All causes must appear in the overview.', '给定数据没有原因信息，不应添加推测。'],
        ['Choose the accurate description.', 'Driving fell from 50% to 25%.', 'Driving fell by 50 percentage points.', 'Driving rose to 50% in 2025.', '起终点准确；下降为 25 个百分点。'],
        ['Which sentence works as an overview?', 'Cycling and public transport gained share, while driving declined.', 'Cycling was 20% in 2015, and that is the entire overview.', 'Cheaper tickets caused every change.', '总览抓主要趋势，不只列一个数字或编造原因。']
      ],
      s: ['用 90 秒解释三类通勤方式的变化；先给总览，再选两项数字。明确这是模拟数据。', '总览包含增加与减少', '准确引用起终点', '不加入未经提供的原因'],
      w: ['Academic 分支：用本课模拟数据写 150–190 words Task 1 练习，建议 20 分钟；GT 分支也可练数据描述，但不当作 GT Task 1。类型未定者先完成总览并保留第 21 周信件练习。', 150, 190, '总览包含主要趋势和末年最大项', '至少两组准确对比', '全文描述数据且无个人意见'],
      p: ['向产品团队汇报渠道占比变化', '2 句总览＋2 句数字对比', '把模拟通勤数据视为训练素材，练习客观报数；不要当作真实业务结果。'],
      resources: ['ielts-academic', 'ielts-scoring'], reviewTip: '第二天遮住原文只看三组数字重写总览；核对 to、by 和百分点。'
    },
    {
      week: 21, phase: 'ielts', level: 'B2', title: 'GT Task 1：完整回应信件要求',
      canDo: '按三个内容点写一封语气一致、请求明确的正式信件。',
      g: ['正式请求与间接疑问句', 'I would be grateful if... 用于正式请求；Could you tell me + 陈述语序，而非重复疑问倒装。', 'Could you tell me when the room will be available?', 'I would be grateful if you could confirm the booking.'],
      textTitle: 'A Letter With a Purpose',
      body: `Nico needs a meeting room for a small community workshop. The booking page does not explain whether the venue provides a projector. In a formal enquiry, Nico introduces the event, gives the preferred date and expected attendance, and asks about equipment and accessibility. The letter does not begin with a long personal story. Each paragraph serves the request. Nico also asks for the total cost and the cancellation terms before confirming. A clear letter covers every requested point and makes it easy for the recipient to reply. The tone remains polite from the opening greeting to the final sentence.`,
      c: [['formal enquiry', '正式询问信'], ['expected attendance', '预计人数'], ['cancellation terms', '取消条款'], ['total cost', '总费用'], ['the recipient', '收信人']],
      q: [
        ['What information is missing from the booking page?', 'Whether a projector is provided.', 'The name of the country.', 'The workshop’s final essay.', '页面没有说明投影设备是否提供。'],
        ['What should Nico ask before confirming?', 'The total cost and cancellation terms.', 'Only the colour of the curtains.', 'A personal story from the manager.', '确认前应问清总费用与取消条款。'],
        ['Why should each paragraph have a purpose?', 'To make the request easy to understand and answer.', 'To make the letter as long as possible.', 'To hide the preferred date.', '每段服务一个信息点，方便对方回复。'],
        ['Choose the correct indirect question.', 'Could you tell me when the room will be available?', 'Could you tell me when will the room be available?', 'Could you tell me when the room will available?', '间接疑问部分用陈述语序。'],
        ['Which opening fits a formal enquiry?', 'I am writing to enquire about hiring a room for a workshop.', 'Hey mate, give me your room now.', 'Yo, what is up with this building?', '正式询问需要与陌生机构匹配的语气。']
      ],
      s: ['模拟电话询问：Ask about room availability, equipment, and the total cost. 结束前复述需要对方确认的内容。', '覆盖三项询问', '至少一次间接疑问句', '结尾核对后续回复方式'],
      w: ['GT 分支：写 150–190 words 正式询问信，包含活动与日期、设备与无障碍需求、费用及取消条款，建议 20 分钟。Academic 分支将其作为工作邮件练习；考试类型未定者同时保留两种 Task 1 作品。', 150, 190, '三个内容点全部回应', '称呼结尾和整体语气一致', '间接疑问语序正确'],
      p: ['为线下设计工作坊询价', '一封可供场地方逐项回复的询问信', '你负责安排 12 人工作坊；日期与预算可自拟，注明它们是模拟条件。'],
      resources: ['ielts-general', 'work-email', 'ielts-scoring'], reviewTip: '隔 48 小时不看原稿重新列出三个内容点，再检查是否遗漏任何一点。'
    },
    {
      week: 22, phase: 'ielts', level: 'B2', title: 'Task 2：立场与段落论证',
      canDo: '写出清楚立场，并用“理由—解释—例子”发展两个主体段。',
      g: ['论证中的条件与范围', '避免 all / always 把论点写得过大；some / in many cases / when 能限定范围。例子应解释理由，不只是换句话重复。', 'Remote work can improve access when teams document decisions clearly.', 'This does not mean that every role can be performed remotely.'],
      textTitle: 'An Opinion Needs Development',
      body: `A practice question asks whether employers should offer remote work whenever possible. Nico agrees in principle but notices that simply repeating “remote work is convenient” will not develop an argument. One paragraph explains how flexible location can widen access for people who cannot commute every day. A concrete example then shows why clear documentation matters for those employees. A second paragraph discusses coordination costs and proposes planned collaboration hours. Nico keeps the same position throughout the essay while acknowledging conditions. The aim is a reasoned response to the question, not a collection of impressive phrases unrelated to the argument.`,
      c: [['agree in principle', '原则上赞同'], ['develop an argument', '展开论证'], ['widen access', '扩大参与机会'], ['coordination cost', '协调成本'], ['acknowledge conditions', '承认适用条件']],
      q: [
        ['What is the practice question about?', 'Whether employers should offer remote work when possible.', 'Whether all offices should close today.', 'Whether commuting is always free.', '题目问在可行时是否应提供远程工作。'],
        ['What develops the first paragraph?', 'An explanation and a concrete example about access.', 'Repeating “convenient” several times.', 'An unrelated memorised quotation.', '观点需要解释和相关例子支持。'],
        ['How does Nico handle coordination costs?', 'By discussing them and proposing collaboration hours.', 'By pretending they do not exist.', 'By abandoning the position without explanation.', '回应反面限制并不等于立场混乱。'],
        ['Which claim has a reasonable scope?', 'Remote work can help some people who cannot commute daily.', 'Remote work always solves every employment problem.', 'Every job can be remote with no cost.', 'can 与 some 让结论符合实际范围。'],
        ['Which paragraph plan develops an argument?', 'Reason, explanation, relevant example, link to the question.', 'Four synonyms for convenient and no explanation.', 'A memorised story with no connection to the task.', '段落要展示理由如何支持对题目的回答。']
      ],
      s: ['回答：Should employers offer remote work whenever possible? 用立场、两个理由和一个限制组织两分钟回答。', '开头明确立场', '一个理由有具体例子', '限定适用范围而非绝对化'],
      w: ['Task 2 原创练习：Employers should offer remote work whenever possible. To what extent do you agree or disagree? 写 250–290 words，建议 40 分钟；适用 Academic / GT，不生成站内雅思分数。', 250, 290, '立场从头到尾清楚', '两个主体段各有解释与例子', '回应题目而非背通用模板'],
      p: ['向团队提出混合办公安排', '一段立场＋条件＋可试行建议', '你需要同时回应通勤困难和跨团队协调，说明怎样试行与复查。'],
      resources: ['ielts-scoring', 'write-improve'], reviewTip: '第二天只看题目重列提纲；圈出每段最薄弱的解释句并重写，不只替换高级词。'
    },
    {
      week: 23, phase: 'ielts', level: 'B2', title: 'Task 2：公平讨论两种观点',
      canDo: '区分讨论双方和表明自己立场，双方论点均有解释。',
      g: ['while / whereas 与立场表达', 'while 可表达对照；讨论双方不意味着结尾不表态。I tend to believe... 后接完整理由，而非只写口号。', 'While some people value formal qualifications, others prioritise practical experience.', 'I tend to believe that the best balance depends on the role.'],
      textTitle: 'Understand Before Choosing',
      body: `Some employers use qualifications to compare candidates, while others prefer evidence of practical work. Nico prepares an essay that explains both views fairly. Qualifications can signal structured study and may be essential for regulated roles. Practical projects can reveal how a person deals with constraints and collaborates with others. Neither point proves that one form of evidence is sufficient for every job. Nico’s position is that employers should combine relevant qualifications with work samples when the role allows it. Before writing the conclusion, Nico checks whether the two body paragraphs actually explain the views rather than merely naming them.`,
      c: [['formal qualification', '正式学历或资格'], ['practical experience', '实践经验'], ['regulated role', '受专业监管的岗位'], ['work sample', '工作样本'], ['deal with constraints', '应对限制条件']],
      q: [
        ['What can qualifications signal?', 'Structured study.', 'Perfect performance in every job.', 'The absence of practical skills.', '学历可体现系统学习，但不保证全部表现。'],
        ['What may practical projects reveal?', 'How a person handles constraints and collaboration.', 'Their official exam registration number.', 'A guaranteed future salary.', '工作样本可体现现实约束下的实践行为。'],
        ['What is Nico’s preferred approach?', 'Combine relevant qualifications and work samples where appropriate.', 'Ignore both qualifications and experience.', 'Require one identical method for every role.', '结论强调按岗位适当结合。'],
        ['Choose a grammatically correct comparison.', 'While some employers value qualifications, others prioritise experience.', 'While some employers values qualifications, others experience prioritise.', 'Whereas qualifications and experience same all jobs.', 'while 连接两个完整且主谓一致的分句。'],
        ['What must a “discuss both views and give your opinion” response do?', 'Explain both views and state a clear position.', 'Mention one side and avoid a conclusion.', 'List fancy words without answering.', '需要完成两个讨论对象和自己的观点。']
      ],
      s: ['回答：Should hiring focus on qualifications or practical experience? 各给一个理由后表明立场。', '公平解释双方', '说明岗位差异', '自己的立场清楚且有理由'],
      w: ['Task 2 原创练习：Some employers prioritise qualifications, while others value practical experience more. Discuss both views and give your own opinion. 写 250–300 words，建议 40 分钟。', 250, 300, '双方都得到实质解释', '自己的立场明确', '例子与招聘主题相关且不假造统计'],
      p: ['设计团队制定候选人评估方式', '一份学历、工作样本、合作能力的评估建议', '向招聘经理解释哪些信息有用，以及为什么不能只按一项标签筛人。'],
      resources: ['ielts-scoring', 'write-improve'], reviewTip: '用两种颜色标记双方论点；若一边只有一句空话，补解释而非补连接词。'
    },
    {
      week: 24, phase: 'ielts', level: 'B2', title: '阶段诊断：分清练习和模拟',
      canDo: '按真实任务时间完成一次分项诊断，并用错误类别安排下一周期。',
      g: ['完成、持续与尚未完成', 'have completed 说明结果；have been practising 强调持续练习。练习时数与独立完成表现应分别记录。', 'I have completed two timed writing tasks.', 'I have been practising paraphrasing, but I still miss corrections in audio.'],
      textTitle: 'A Diagnostic Is a Decision Tool',
      body: `Nico schedules a diagnostic weekend using official practice materials. Reading gets its own sixty-minute block, and writing gets a separate sixty-minute block. Listening follows the timing instructions for the chosen practice format, while speaking is recorded separately. Nico does not call a short site quiz a full mock exam. After checking answers, the review groups mistakes into locating evidence, understanding paraphrases, and managing time. Writing and speaking are reviewed against published criteria, preferably with a qualified teacher. The result is a set of priorities, not a guaranteed band prediction. The next fortnight will focus on the two most frequent problems.`,
      c: [['timed block', '限时学习时段'], ['published criteria', '已公布评分标准'], ['qualified teacher', '有相应资质的教师'], ['locate evidence', '定位证据'], ['the next fortnight', '接下来两周']],
      q: [
        ['How much time is reserved for reading?', 'A separate sixty-minute block.', 'Five minutes including writing.', 'Only the time left after speaking.', '阅读有独立 60 分钟时段。'],
        ['What should a short site quiz not be called?', 'A full mock exam.', 'A comprehension exercise.', 'A way to find errors.', '短自编题不能等同完整模拟。'],
        ['What determines the next fortnight’s priorities?', 'The two most frequent problems.', 'The most attractive website colour.', 'The number of apps installed.', '按诊断中高频问题确定练习重点。'],
        ['Which sentence emphasises an ongoing practice activity?', 'I have been practising paraphrasing.', 'I have being practise paraphrasing.', 'I has been practised paraphrasing.', '现在完成进行时是 have/has been + ing。'],
        ['Which review note is most actionable?', 'I missed final corrections in 4 items; I will practise revised details.', 'My English is bad.', 'I need every skill equally forever.', '错误类型和下一步具体，能指导练习。']
      ],
      s: ['本周先完成本课微课，再另约一段按官方结构录制的口语模拟；使用公布标准记观察，不自动估分。', '按顺序保留完整录音', '记录追问回应和长停顿', '列出两项下一周期重点'],
      w: ['额外安排独立 60 分钟写作诊断：Task 1 建议 20 分钟、至少 150 words；Task 2 建议 40 分钟、至少 250 words。考试类型未定者先确认或分别练，不能混合两种 Task 1。本课记录写 150–200 words 诊断复盘。', 150, 200, '模拟与精修作品分开保存', '写明实际用时和完成程度', '结论是弱项清单而非虚假分数'],
      p: ['把学习诊断转为接下来两周的行动', '两项弱项、各两次练习和一次复测日期', '你向学习伙伴解释时间如何分配，并展示支持这个选择的错题或作品。'],
      resources: ['cambridge-practice', 'ielts-academic', 'ielts-general', 'ielts-scoring'], reviewTip: '本周不堆新资料；错误先分类，48 小时后重做，再安排 7 天后的陌生同类题检验迁移。'
    },
    {
      week: 25, phase: 'work', level: 'B2', title: '项目启动：先对齐成功标准',
      canDo: '主持一个简短启动讨论，明确目标、范围和三个待确认问题。',
      g: ['将来完成时与时间边界', 'by + 时间说明最迟完成点；will have + 过去分词用于预计到未来某时已完成。先保证计划真实再使用复杂时态。', 'By Friday, we will have agreed on the main task.', 'We will not begin visual design until the scope is clear.'],
      textTitle: 'Start With the Decision',
      body: `A team is starting a redesign of a customer-support portal. The first meeting could easily become a discussion of colours and page layouts. Nico begins with a different question: what should customers be able to do more successfully? The group chooses finding an existing support request as the main task. They agree to exclude live chat from the first release. By the end of the week, the researcher will have collected examples of failed searches. Three questions remain open: which users to recruit, what data is available, and who approves the scope. The meeting ends with owners for each question.`,
      c: [['support portal', '客服门户'], ['main task', '主要任务'], ['exclude from scope', '排除在范围外'], ['failed search', '失败的搜索'], ['approve the scope', '批准范围']],
      q: [
        ['What main task does the group select?', 'Finding an existing support request.', 'Changing every brand colour.', 'Launching live chat immediately.', '目标是找到已有客服请求。'],
        ['What is excluded from the first release?', 'Live chat.', 'Search examples.', 'A named owner.', '在线聊天被明确排除在首版外。'],
        ['How does the meeting end?', 'With owners for each open question.', 'With all questions hidden.', 'With a guarantee of success.', '未决问题逐项指定负责人。'],
        ['Choose the correct future perfect.', 'By Friday, we will have collected the examples.', 'By Friday, we will has collect the examples.', 'By Friday, we have will collected examples.', 'will have + 过去分词表达未来时点前完成。'],
        ['Which kickoff question focuses on an outcome?', 'What should customers be able to do more successfully?', 'Which colour do I personally prefer?', 'Can we skip all scope decisions?', '关注用户可完成的任务，才能确定成功标准。']
      ],
      s: ['模拟主持启动会：Clarify the goal, first-release scope, and three open questions.', '先问用户结果', '明确一项范围外事项', '每个未决问题有负责人'],
      w: ['写 180–230 words 启动会总结：目标、范围、证据收集和决策负责人。', 180, 230, '目标是用户行为而非纯交付物', '期限与责任可执行', '未决定事项清楚标记'],
      p: ['客服门户改版启动', '一页 kickoff brief', '你是设计负责人，用英文邀请产品与工程确认范围，不提前保证上线日期。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '复习第 7 周依赖与第 13 周验收条件，将三者写成同一项目的简要计划。'
    },
    {
      week: 26, phase: 'work', level: 'B2', title: 'Academic Task 1：解释流程',
      canDo: '按顺序描述一个七步流程，区分参与者与被处理对象。',
      g: ['流程中的一般现在时被动语态', '流程重点是物品如何被处理，可用 is/are + 过去分词；如果执行者很重要则保留主动语态。', 'Returned devices are inspected before they are repaired.', 'A technician replaces damaged components.'],
      textTitle: 'From Return to Reuse',
      body: `This invented process describes how a small company refurbishes returned tablets. First, devices are collected and registered. They are then inspected to identify damaged parts. Tablets that cannot be repaired are sent for material recovery. Repairable devices are cleaned, and faulty components are replaced. After that, each tablet is tested for basic performance and safety. Devices that pass the checks are packaged and sold with a clear description of their condition. The overview should describe a sequence from collection to resale, with a branch for unrepairable devices. It should not add factory details that the process does not show.`,
      c: [['returned device', '退回的设备'], ['faulty component', '故障部件'], ['material recovery', '材料回收'], ['pass the checks', '通过检查'], ['a branch in the process', '流程中的分支']],
      q: [
        ['What happens after registration?', 'The devices are inspected.', 'All devices are immediately sold.', 'The company prints an essay.', '登记之后检查设备。'],
        ['Where do unrepairable tablets go?', 'For material recovery.', 'Directly to full-price resale.', 'Back into the safety test endlessly.', '无法修复的设备进入材料回收。'],
        ['What is the overall process?', 'Collection to resale, with a recovery branch.', 'An increase in sales over ten years.', 'A comparison of customer ages.', '流程是从收集到再销售，含不可修复分支。'],
        ['Choose the correct passive description.', 'Faulty components are replaced.', 'Faulty components is replace.', 'Faulty components replacing by.', '复数主语用 are + 过去分词。'],
        ['Which detail should not be added?', 'A precise factory temperature that is not provided.', 'The inspection stage.', 'The branch for unrepairable devices.', '没有出现在给定流程中的工厂参数不能编造。']
      ],
      s: ['用 90–120 秒按顺序解释本课流程，不看原文；说明哪些设备走不同分支。', '顺序与原文一致', '包含不可修复分支', '主动与被动按需要使用'],
      w: ['Academic 分支：根据本课模拟流程写 150–190 words 描述，建议 20 分钟；GT 分支作为工作流程说明练习，并继续第 27 周信件。类型未定者保留两分支。', 150, 190, '有流程总览', '所有关键阶段与分支准确', '不编造额外技术细节'],
      p: ['向客服解释退货翻新流程', '一份客户可读的 7 步说明', '把技术流程写成清楚文字，并标出哪些设备不会再销售。'],
      resources: ['ielts-academic', 'ielts-scoring', 'work-email'], reviewTip: '次日用箭头画出流程，再闭卷口述；检查 is/are 和过去分词，不做无关精听任务。'
    },
    {
      week: 27, phase: 'work', level: 'B2', title: 'GT Task 1：道歉后提供补救',
      canDo: '写清失误、影响和具体补救，不把道歉写成借口。',
      g: ['道歉与补救表达', 'apologise for + 名词/动词-ing；解释原因后明确承担的行动。区别 explain a delay 与 excuse every impact。', 'I apologise for sending the wrong file.', 'I will send the corrected version by 2 pm and highlight the changes.'],
      textTitle: 'An Apology That Reduces Uncertainty',
      body: `Nico sends an outdated prototype to a workshop organiser. Several participants prepare comments on screens that are no longer part of the project. Nico writes a short apology acknowledging the mistake and the extra work it caused. The message explains that the corrected file is attached and that changed screens are clearly marked. Nico offers a short call to answer questions before the workshop. It does not promise that no mistake will ever happen again. Instead, Nico describes a new version-checking step before sharing future files. The recipient now knows what went wrong, what has been repaired, and what help is available.`,
      c: [['outdated prototype', '过期原型'], ['acknowledge a mistake', '承认失误'], ['corrected version', '修正版本'], ['version-checking step', '版本检查步骤'], ['extra work', '额外工作']],
      q: [
        ['What mistake did Nico make?', 'Sending an outdated prototype.', 'Cancelling the workshop without notice.', 'Deleting the organiser’s account.', '错误是发错原型版本。'],
        ['What help does Nico offer?', 'A short call before the workshop.', 'An unrelated job interview.', 'A guarantee of perfect future work.', '提供短通话以帮助大家消除疑问。'],
        ['What preventive action is described?', 'Checking the version before sharing files.', 'Never sharing any file again.', 'Asking recipients to guess the newest version.', '改进是分享前检查版本。'],
        ['Choose the correct apology.', 'I apologise for sending the wrong file.', 'I apologise to sending the wrong file.', 'I apologise for send the wrong file.', 'for 是介词，后接 sending。'],
        ['Which response takes responsibility?', 'I sent the wrong version; here is the corrected file and the repair plan.', 'You should have known which version I meant.', 'Mistakes happen, so I will not help.', '承认动作、影响与补救，避免推责。']
      ],
      s: ['角色扮演：You sent the wrong prototype. Apologise, explain the impact, and offer a practical repair.', '直接承认自己的动作', '补救包含时间点', '不作永不出错的承诺'],
      w: ['GT 分支：写 150–190 words 半正式信件，向工作坊组织者道歉，解释发错文件、提供修复并避免再次发生，建议 20 分钟。Academic 分支作为工作邮件，不称为其 Task 1。', 150, 190, '三项要求完整覆盖', '语气与组织者关系一致', '补救行动具体可执行'],
      p: ['跨团队交付发错版本', '一封道歉＋补救＋版本预防邮件', '你向合作团队说明错误影响，附上明确标记的修正版并提供帮助。'],
      resources: ['ielts-general', 'work-email', 'ielts-scoring'], reviewTip: '把道歉中的 because 从句暂时删除，检查补救是否仍足够清楚，防止整封信只剩解释。'
    },
    {
      week: 28, phase: 'work', level: 'B2', title: '用证据回应业务压力',
      canDo: '区分事实、假设和建议，向利益相关方说明结论边界。',
      g: ['report / suggest / demonstrate 的证据强度', 'reports 说明记录；suggests 提示可能；demonstrates 表示有较强证据。不要用 proves 包装小样本。', 'The interviews suggest that the labels are confusing.', 'The report shows a decline, but it does not explain the cause.'],
      textTitle: 'What the Numbers Do Not Say',
      body: `A dashboard shows fewer completed registrations this month. A stakeholder assumes the new page caused the decline and asks Nico to reverse it immediately. Nico checks the context. The advertising team changed the traffic sources during the same period, and the reporting tool missed two days of events. These facts do not prove that the redesign is harmless, but they make a simple causal claim unsafe. Nico proposes repairing the tracking, comparing similar traffic groups, and reviewing user sessions. The response acknowledges the business concern while explaining why a confident explanation would be premature. A decision can be urgent without pretending the evidence is complete.`,
      c: [['traffic source', '流量来源'], ['causal claim', '因果判断'], ['repair the tracking', '修复埋点或追踪'], ['similar groups', '可比较的群体'], ['a premature explanation', '过早下的解释']],
      q: [
        ['What does the stakeholder assume?', 'The new page caused fewer registrations.', 'Advertising never changed.', 'The reporting data is complete.', '对方把下降直接归因于新页面。'],
        ['What data problem does Nico find?', 'Two days of events are missing.', 'Every event was recorded twice for a year.', 'No customer has ever registered.', '报告工具漏了两天事件。'],
        ['What is Nico’s proposed response?', 'Repair tracking and compare similar groups.', 'Claim the redesign is definitely harmless.', 'Ignore the business concern entirely.', '先修数据再做可比较分析。'],
        ['Which sentence matches limited evidence?', 'The decline may have several contributing factors.', 'The redesign definitely caused every lost registration.', 'Missing data proves the redesign is perfect.', 'may 和 several factors 与多因素不完整证据相符。'],
        ['Which update separates fact and interpretation?', 'Registrations fell; the cause remains uncertain because tracking is incomplete.', 'The page is ugly, so the numbers must be wrong.', 'I like the design; therefore it cannot affect users.', '先说已观测事实，再说明原因不确定。']
      ],
      s: ['回应：Registrations dropped. Should we immediately reverse the redesign? 先认可压力，再解释证据和应急动作。', '说出两个混杂因素', '不宣称改版一定无害', '提出一项马上能做的检查'],
      w: ['写 190–240 words 决策说明，分 Facts / Unknowns / Next actions 三段。', 190, 240, '事实与解释分开', '不确定性有具体原因', '行动包含修数据和可比分析'],
      p: ['产品负责人要求立刻回滚', '一条证据摘要与临时决策建议', '你需要在业务紧急情况下解释为何仍须验证，并给出可立即执行的方案。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '复习第 9 周小样本限制；把 proves、shows、suggests 各写一句并解释强度差别。'
    },
    {
      week: 29, phase: 'work', level: 'B2', title: 'Task 2：问题和措施要对应',
      canDo: '提出两项原因及对应措施，并解释措施如何发挥作用。',
      g: ['原因与结果链', 'lead to + 名词/动词-ing；result in 表示导致结果，result from 表示由某事造成。措施应回应前文原因。', 'Poor transport links can lead to longer commutes.', 'Long journeys may result from limited housing near workplaces.'],
      textTitle: 'Match the Solution to the Cause',
      body: `A practice essay asks why commuting takes longer in many cities and what could be done. Nico first lists possible causes, then checks whether the proposed solutions address them. If housing near employment centres is unaffordable, adding an attractive station sign will not solve that problem. Better transport connections may help some commuters, while changes to housing supply require a different discussion. Each body paragraph explains a cause, the resulting difficulty, and a relevant response. Nico avoids claiming that one policy will eliminate congestion everywhere. A strong solution paragraph shows how the measure works and acknowledges at least one practical limit.`,
      c: [['employment centre', '就业集中区域'], ['unaffordable housing', '难以负担的住房'], ['transport connection', '交通连接'], ['address a cause', '回应一个原因'], ['practical limit', '现实限制']],
      q: [
        ['What does Nico check before choosing solutions?', 'Whether they address the proposed causes.', 'Whether they contain rare words.', 'Whether every policy is free.', '措施需要与原因对应。'],
        ['Why is an attractive station sign insufficient for high housing costs?', 'It does not address the housing cause.', 'Signs cannot contain English.', 'Commuters never read signs.', '改善标识并没有解决住房负担问题。'],
        ['What should a strong solution paragraph explain?', 'How the measure works and a practical limit.', 'Only the name of a policy.', 'Why no action could ever help.', '需要机制解释和现实限制。'],
        ['Choose the correct cause expression.', 'Long commutes may result from limited nearby housing.', 'Long commutes may result in from limited nearby housing.', 'Long commutes may resulting from housing.', 'result from 表示结果由何原因造成。'],
        ['Which solution directly addresses poor transport connections?', 'Improve reliable links between residential areas and workplaces.', 'Change only the station logo.', 'Add unrelated shopping adverts.', '交通连接问题应由交通线路和可靠性措施回应。']
      ],
      s: ['回答：Why do some people spend too long commuting, and what could help? 用一条原因—影响—措施链展开。', '不把个人例子泛化全部城市', '措施与原因直接对应', '说明措施的一项限制'],
      w: ['Task 2 原创练习：In many cities, people spend increasing amounts of time commuting. What are the reasons, and what measures could reduce this problem? 写 250–300 words，40 分钟。', 250, 300, '题目两部分均回应', '每项措施解释作用方式', '避免无依据统计与万能方案'],
      p: ['研究报告中的问题与建议对应', '两行 cause → consequence → response', '把客户服务等待时间过长的问题拆成原因和相应干预，注明未知证据。'],
      resources: ['ielts-scoring', 'write-improve'], reviewTip: '用箭头连每项措施与前文原因；连不上时重写论证，不只是增加连接词。'
    },
    {
      week: 30, phase: 'work', level: 'B2', title: '演示：让听众知道现在听到哪里',
      canDo: '做三分钟方案演示，有清楚开头、过渡和需要的决策。',
      g: ['演示中的指路表达', '先说明结构，再用过渡语连接论点。避免每句都用 firstly；结尾明确请求而非仅说 thank you。', 'I will start with the problem, then compare two options.', 'That brings us to the decision we need today.'],
      textTitle: 'A Presentation Built for a Decision',
      body: `Nico has three minutes to present a search redesign. The opening states the purpose: agree on which option to test next. The first section explains the user problem with one example. The second compares two options using the same criteria. The final section recommends one option and names the remaining risk. Nico uses short transitions so listeners can follow without reading every slide. The closing question is specific: “Can we approve a small test of option A this week?” A presentation with a clear decision is easier to discuss than a tour of every screen the designer has produced.`,
      c: [['state the purpose', '说明目的'], ['compare two options', '比较两个方案'], ['remaining risk', '尚存风险'], ['short transition', '简短过渡'], ['approve a small test', '批准小规模测试']],
      q: [
        ['What is the presentation’s purpose?', 'Agree on which option to test next.', 'Display every finished screen.', 'Choose a new office location.', '开头明确决策是选下一个测试方案。'],
        ['What does the final section include?', 'A recommendation and a remaining risk.', 'Only a thank-you slide.', 'A complete company history.', '推荐与剩余风险让讨论可行动。'],
        ['Why are transitions useful?', 'They help listeners follow the structure.', 'They replace all evidence.', 'They guarantee approval.', '短过渡为听众提供结构指路。'],
        ['Which sentence is a clear transition to a decision?', 'That brings us to the decision we need today.', 'There are many things, things, and things.', 'I maybe have done some stuff.', '明确说明进入决策部分。'],
        ['Which closing asks for a specific next step?', 'Can we approve a small test of option A this week?', 'Any thoughts about anything at any time?', 'Thank you, but no action exists.', '结尾有对象、动作和时间。']
      ],
      s: ['录制 3 分钟演示：problem → options → recommendation → decision。可用三张静态页面，不要求制作精美幻灯片。', '开头说明决策目标', '至少两处自然过渡', '结尾提出具体请求'],
      w: ['写 180–230 words 演示讲稿与会后摘要，讲稿不逐字描述每个屏幕。', 180, 230, '结构服务决策', '一项风险与推荐并存', '会后摘要保留决定和 owner'],
      p: ['在跨职能评审会上争取测试资源', '3 分钟演示＋一个决策问题', '你要让工程、产品和研究同意一个小测试，说明工作量、风险和所需回复。'],
      resources: ['bc-b2', 'language-reactor'], reviewTip: '回听录音，只统计听者能否说出目的、推荐、请求；不用口音像母语者作标准。'
    },
    {
      week: 31, phase: 'work', level: 'B2', title: 'Academic Task 1：静态数据分组',
      canDo: '在没有时间趋势的数据中找出最大值、最小值和主要对比。',
      g: ['倍数、占比与静态对比', 'twice as...as 表达两倍；account for 描述占比。只有不同类别时不要捏造随时间变化的趋势。', 'Email accounts for half of the sample.', 'The number choosing email is twice the number choosing phone support.'],
      textTitle: 'Not Every Chart Shows a Trend',
      body: `An invented survey asks one hundred customers which support channel they prefer. Fifty choose email, twenty-five choose phone calls, fifteen choose live chat, and ten choose a community forum. The figures describe preferences at one point in time, so Nico should not write that email “increased” or the forum “declined.” The overview can identify email as the dominant choice and the forum as the least popular. Details can group the two smaller channels or compare email with phone support. The response should report preferences in this sample without claiming that every customer in the market behaves the same way.`,
      c: [['at one point in time', '在某一时间点'], ['dominant choice', '占主导的选择'], ['least popular', '最不受欢迎'], ['account for', '占……比例'], ['in this sample', '在本样本中']],
      q: [
        ['What share chooses email?', 'Half of the sample.', 'A quarter of the sample.', 'Ten percent of the sample.', '50/100 为一半。'],
        ['Which channel is least popular?', 'The community forum.', 'Phone support.', 'Email.', '论坛 10 人，是最小类别。'],
        ['Why is “email increased” inappropriate?', 'Only one time point is provided.', 'Email cannot be counted.', 'The sample contains no customers.', '没有时间比较，不能描述上升趋势。'],
        ['Which comparison is accurate?', 'Twice as many people choose email as phone support.', 'Three times as many people choose phone as email.', 'Live chat accounts for half the sample.', '50 是 25 的两倍。'],
        ['Which overview fits the data?', 'Email is the leading choice, while the forum is the least preferred.', 'All channels become more popular each year.', 'The forum dominates because it is free.', '总览抓最大最小，且不加未提供时间或原因。']
      ],
      s: ['用 90 秒报告本课四类偏好数据，先总览，再做两组对比。', '没有使用虚假的上升下降', '准确表达倍数或占比', '说明是模拟样本'],
      w: ['Academic 分支：按本课模拟数据写 150–190 words 静态图表描述，20 分钟；GT 分支作为工作数据摘要，并选官方 GT 信件另练。考试类型仍未定时先确认要求。', 150, 190, '有最大最小总览', '数字与分组准确', '未将样本泛化全部市场'],
      p: ['向客服主管解释支持渠道偏好', '四类数字的简报和一条限制', '你不应仅凭偏好问卷撤掉其他渠道；说明还需要知道什么。'],
      resources: ['ielts-academic', 'ielts-general', 'ielts-scoring'], reviewTip: '用同一数据写两个不同分组版本，比较哪个更易读；核对倍数和分母。'
    },
    {
      week: 32, phase: 'work', level: 'B2', title: '邮件编辑：减少读者的推理成本',
      canDo: '将长邮件压缩成目的、必要背景和明确动作，保留关键限制。',
      g: ['简洁句与名词化改写', '将 make a decision about 改为 decide，将 provide an explanation 改为 explain；简洁不能删除负责人、时间和关键条件。', 'Please confirm the scope by Wednesday.', 'We recommend testing the shorter flow before implementation.'],
      textTitle: 'Shorter Is Not Always Clearer',
      body: `Nico receives an email with six paragraphs of background and a request hidden near the end. The sender needs approval for a user test by Wednesday, but the deadline is easy to miss. Nico rewrites the opening to state the decision and date. The next paragraph gives only the context needed to decide, including participant numbers and the remaining privacy check. A short list names the requested actions. The message is shorter, but it is not reduced to “Please approve.” Good editing removes repetition while keeping the information that allows another person to respond responsibly.`,
      c: [['hidden request', '被埋住的请求'], ['the context needed', '必要背景'], ['privacy check', '隐私检查'], ['remove repetition', '删除重复'], ['respond responsibly', '有依据地作出回复']],
      q: [
        ['What does the sender need?', 'Approval for a user test by Wednesday.', 'A new six-paragraph biography.', 'Permission to ignore privacy.', '请求是周三前批准用户测试。'],
        ['What context is preserved?', 'Participant numbers and the remaining privacy check.', 'Every old discussion in full.', 'Only a decorative greeting.', '保留对决策必要的信息。'],
        ['Why is “Please approve” insufficient?', 'It removes information needed for a responsible decision.', 'It contains too many words.', 'It is always grammatically wrong.', '过度缩减会丢失范围、条件和风险。'],
        ['Which is the concise equivalent of “make a decision about the scope”?', 'Decide on the scope.', 'Do a making about scope decision.', 'Have a decision of making scope.', '用直接动词 decide on 更简洁自然。'],
        ['Which email opening is most actionable?', 'Please approve the five-person test by Wednesday; one privacy check remains.', 'Here is a long history before I mention anything needed.', 'Please do it without knowing what it is.', '前置动作、范围、期限和关键限制。']
      ],
      s: ['用 60 秒讲清一封请求邮件的目的、必要背景与下一步；请听者复述请求。', '第一句说明要什么', '保留一项关键限制', '听者能重复动作与期限'],
      w: ['写 180–220 words 测试审批邮件，再删减约四分之一；另保存精简稿，不能删掉范围、owner 或隐私条件。', 180, 220, '首段包含请求与时间', '只保留决策必要背景', '明确谁需要回复什么'],
      p: ['向忙碌的负责人申请研究审批', '一封首屏可理解的审批邮件', '写明五人测试的目标、资料处理方式和剩余隐私检查，避免仅催批准。'],
      resources: ['work-email', 'write-improve'], reviewTip: '第 2 天只看主题行和首段，检查是否仍能知道请求、期限和重要限制。'
    },
    {
      week: 33, phase: 'work', level: 'B2', title: 'Task 2：权衡优缺点',
      canDo: '回应 outweigh 问题，比较影响的重要性而非只数论点数量。',
      g: ['比较论点的重要性', 'outweigh 表达优势超过代价；理由要说明影响范围、严重性或可缓解性。不要认为三条优点必胜两条缺点。', 'The benefits may outweigh the costs when training is accessible.', 'One serious privacy risk can matter more than several minor conveniences.'],
      textTitle: 'More Points Do Not Mean a Stronger Case',
      body: `A practice task asks whether the advantages of digital public services outweigh the disadvantages. Nico lists faster access and reduced travel as benefits, then identifies exclusion and privacy risks as costs. Counting two points on each side would not answer the question. The essay needs to explain their importance. For people who live far from offices, online access can remove a major barrier. However, removing every offline route could seriously disadvantage people without reliable internet. Nico argues that the benefits are stronger only when support and alternatives remain available. The conclusion follows this condition rather than claiming digital services help everyone equally.`,
      c: [['outweigh the disadvantages', '优势大于劣势'], ['digital public service', '数字公共服务'], ['offline route', '线下办理渠道'], ['a major barrier', '重要障碍'], ['support and alternatives', '支持与替代途径']],
      q: [
        ['What question must the essay answer?', 'Whether the benefits are more important than the costs.', 'How many linking words exist.', 'Which website has more colours.', 'outweigh 要比较重要性，而非只罗列。'],
        ['Who could lose access if offline routes disappear?', 'People without reliable internet.', 'Only professional web designers.', 'Everyone with a fast connection.', '缺少稳定网络的人可能被排除。'],
        ['What condition supports Nico’s position?', 'Support and alternatives remain available.', 'Every office closes immediately.', 'Privacy is ignored.', '支持与替代渠道是有条件赞同的基础。'],
        ['Which sentence makes a weighted comparison?', 'A serious privacy risk can outweigh several small conveniences.', 'Three benefits always beat two costs.', 'The essay with more words is always correct.', '比较影响程度，不是简单计数。'],
        ['Which conclusion fits the passage?', 'Digital services can offer greater benefits if inclusive alternatives are kept.', 'Digital services have no disadvantages.', 'All public services must stay completely offline.', '结论应保持文中的条件和权衡。']
      ],
      s: ['回答：Do the advantages of digital public services outweigh the disadvantages? 给出判断依据和必要条件。', '明确回答 outweigh', '比较至少一项影响的重要性', '承认不利群体与条件'],
      w: ['Task 2 原创练习：More public services are moving online. Do the advantages outweigh the disadvantages? 写 250–300 words，40 分钟。', 250, 300, '明确权衡后的立场', '优缺点都有机制解释', '结论不突然改变条件'],
      p: ['政府服务产品方案讨论', '一项收益、一项严重风险及缓解建议', '向产品负责人解释为什么在线转型需要保留帮助与替代渠道。'],
      resources: ['ielts-scoring', 'write-improve'], reviewTip: '删掉论点编号，只看段落能否说明“为什么更重要”；不能时补机制与适用范围。'
    },
    {
      week: 34, phase: 'work', level: 'B2', title: '会议：澄清、插话与收束',
      canDo: '在模拟会议中礼貌插话一次、核对一项理解，并确认行动人。',
      g: ['澄清疑问与复述确认', 'Do you mean that...? 核对含义；Just to clarify,... 缩小歧义；避免在没听懂时只说 yes。', 'Just to clarify, does “ready” mean approved or ready for review?', 'So Maya will confirm the labels by Friday, is that right?'],
      textTitle: 'Do Not Agree With an Unclear Word',
      body: `During a remote meeting, someone says the checkout design must be “ready” on Friday. Nico is unsure whether this means ready for review or ready for implementation. Rather than silently agreeing, Nico asks a short clarification question. The product manager explains that Friday is the review date, and engineering will start the following week. Nico then checks who will approve the error messages. The team names a content designer and records the decision. The interruption takes less than a minute but prevents two teams from planning around different assumptions. At the end, Nico repeats the actions and asks whether anything is missing.`,
      c: [['ready for review', '可供评审'], ['ready for implementation', '可供开发实现'], ['clarification question', '澄清问题'], ['different assumptions', '不同的假设'], ['repeat the actions', '复述行动事项']],
      q: [
        ['What is ambiguous in the meeting?', 'The meaning of “ready.”', 'The name Nico.', 'Whether Friday is a weekday.', 'ready 可指待评审或可实施，造成歧义。'],
        ['When will engineering start?', 'The week after the review.', 'Before the Friday meeting starts.', 'Never, because the design was cancelled.', '开发安排在评审后的下一周。'],
        ['Who will approve the error messages?', 'A content designer.', 'Every customer individually.', 'An unnamed person in another company.', '团队明确由内容设计师确认错误文案。'],
        ['Which clarification is most precise?', 'Does “ready” mean ready for review or ready for implementation?', 'Can you explain everything in the world?', 'Yes, whatever ready means.', '给出具体歧义选项能快速澄清。'],
        ['Which closing confirms ownership?', 'Maya will approve the labels by Friday; is that correct?', 'Someone will probably do something.', 'No need to record any action.', '复述负责人、动作、时间并核对。']
      ],
      s: ['模拟会议：Clarify an ambiguous deadline, ask who approves the content, and close with the agreed actions.', '至少一次礼貌插话', '核对 ready 的具体含义', '复述负责人和日期'],
      w: ['写 180–220 words 会议纪要，包含决定、未决问题和 action list，避免逐字抄所有对话。', 180, 220, '决定与讨论分开', '每项行动有 owner 与期限', '含一项澄清前后的差别'],
      p: ['跨职能发布会议', '一份决策摘要与 3 条 action items', '你是参会设计师，遇到模糊词时主动确认，会议结束前核对执行人。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '用同伴快速说一段含模糊词的安排，练习打断澄清；不以沉默当作理解。'
    },
    {
      week: 35, phase: 'work', level: 'B2', title: '面试：真实的 STAR 故事',
      canDo: '用两分钟回答一个行为面试题，具体区分个人动作和团队结果。',
      g: ['个人贡献与团队动作', 'I 表达自己的具体行为；we 表达团队结果。过去完成时可说明过去事件之前的背景，但不必每句复杂化。', 'I organised the notes and proposed two alternatives.', 'We tested the revised flow after the engineer had fixed the loading issue.'],
      textTitle: 'Make Your Contribution Visible',
      body: `An interviewer asks Nico about a disagreement with an engineer. Nico describes the situation briefly: a proposed animation would delay the release. The task was to preserve useful feedback without adding too much implementation work. Nico explains the personal actions: asking about constraints, identifying the essential state change, and sketching a simpler alternative. The team then tested the static version and agreed to release it. Nico does not claim sole ownership of the result or invent a conversion increase. The story ends with a lesson about discussing technical limits earlier. The interviewer can now ask about a specific decision rather than a vague success.`,
      c: [['personal contribution', '个人贡献'], ['implementation constraint', '实现限制'], ['essential state change', '必要的状态变化'], ['sole ownership', '独自承担全部功劳'], ['discuss limits earlier', '更早讨论限制']],
      q: [
        ['Why was the animation challenged?', 'It would delay the release.', 'It could not use any colour.', 'No one was allowed to design.', '技术实现会延迟发布。'],
        ['What did Nico personally do?', 'Asked about constraints and sketched a simpler option.', 'Built every technical component alone.', 'Invented a conversion statistic.', '个人动作包括询问约束、识别核心反馈和画替代方案。'],
        ['What lesson concludes the story?', 'Discuss technical limits earlier.', 'Never work with engineers.', 'Always insist on complex animation.', '经验是更早沟通技术限制。'],
        ['Which sentence separates personal action and team result?', 'I sketched the alternative; we tested and selected it together.', 'I alone did everything that every teammate did.', 'The result happened, but nobody knows what I did.', 'I 与 we 各自承担对应动作，贡献清楚不夸大。'],
        ['Which result should be avoided without evidence?', 'A claimed 30% conversion increase that was never measured.', 'The team selected the static version.', 'The release used the simpler feedback.', '未测量的数字不能为了故事好听而编造。']
      ],
      s: ['回答：Tell me about a disagreement with an engineer. 按 Situation / Task / Action / Result，结尾补学习点。', '背景不超过总时长三分之一', '至少两项自己的动作', '结果真实并有范围说明'],
      w: ['写 190–240 words STAR 故事，再压缩成 5 个关键词；真实经历没有量化结果也可以说明可观察结果。', 190, 240, '个人与团队贡献分开', '有具体约束与动作', '结果不含编造指标'],
      p: ['海外设计岗位行为面试', '一个可接受两次追问的 STAR 答案', '面试官追问你做了什么和为什么，你需要给出细节而非背通用成功故事。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '让同伴追问 What did you personally do? 和 What would you change?，检查故事是否经得起细问。'
    },
    {
      week: 36, phase: 'work', level: 'B2', title: '阶段复测：工作任务与考试分开看',
      canDo: '完成一次项目讲解与一次独立限时写作，分别记录可观察差距。',
      g: ['反思中的条件表达', 'would have + 过去分词用于回顾没发生的选择；反思后补未来行动，避免只说本可以更好。', 'I would have asked for clarification earlier if I had noticed the ambiguity.', 'Next time, I will confirm the deadline before agreeing.'],
      textTitle: 'Two Different Forms of Readiness',
      body: `Nico can now lead a short design discussion, but that does not automatically mean an IELTS target has been reached. The review therefore has two parts. A colleague listens to a project explanation and asks two unprepared follow-up questions. Separately, Nico completes timed writing using the confirmed test type and reviews it against published criteria. The work task reveals whether Nico can clarify and collaborate. The writing task reveals task completion, organisation, vocabulary, and language-control issues under time pressure. Both matter, but they answer different questions. Nico saves the evidence separately and chooses one improvement goal for each area.`,
      c: [['unprepared follow-up', '未预先准备的追问'], ['confirmed test type', '已确认考试类型'], ['under time pressure', '在时间压力下'], ['language control', '语言准确与灵活运用'], ['different forms of readiness', '不同维度的准备程度']],
      q: [
        ['Why are there two review parts?', 'Workplace performance and exam writing answer different questions.', 'One task automatically proves every skill.', 'The team wants to avoid evidence.', '工作协作与考试任务各检验不同能力。'],
        ['What does the colleague add?', 'Two unprepared follow-up questions.', 'A fake official band certificate.', 'A memorised answer to read aloud.', '陌生追问检验真实回应能力。'],
        ['How should the evidence be saved?', 'Separately for the work and examination tasks.', 'As one invented score.', 'Only as total app time.', '两类证据应分别记录和解释。'],
        ['Choose the correct past hypothetical.', 'If I had noticed the ambiguity, I would have asked earlier.', 'If I have noticed yesterday, I will asked earlier.', 'If I had notice, I would have ask earlier.', '过去假设用 had done 与 would have done。'],
        ['Which conclusion is justified?', 'I can explain the project, but my timed essay still needs stronger development.', 'A good meeting proves an IELTS 7.', 'A quiz mistake proves I cannot work abroad.', '按任务证据得出具体结论，避免跨维度推断。']
      ],
      s: ['做 3 分钟项目讲解，由同伴提出两个未提前给出的追问；记录是否回答到点、澄清和承认未知。', '主线完整', '两次追问均作直接回应', '需要时明确澄清或承认未知'],
      w: ['额外预约 60 分钟完成官方样题写作：Task 1 至少 150 words、建议 20 分钟；Task 2 至少 250 words、建议 40 分钟。本课另写 150–190 words 复盘；考试类型未定者先确认，不拼接不同类型 Task 1。', 150, 190, '独立限时作品与精修稿分开', '按公布标准记录问题而不自造分数', '工作与考试各选一个改进目标'],
      p: ['季度学习与工作英语回顾', '两类证据各一页＋未来四周重点', '向学习伙伴解释你已能完成什么、什么需要外部反馈，以及如何重测。'],
      resources: ['cambridge-practice', 'ielts-scoring', 'ielts-academic', 'ielts-general'], reviewTip: '复做第 24 周高频错误同类题；比较错误机制是否减少，不直接比较不同难度题目的百分比。'
    },
    {
      week: 37, phase: 'confidence', level: 'B2', title: '简历：动作、范围与可信结果',
      canDo: '写出 4 条具体英文简历 bullet，每条说明动作和可证实的贡献。',
      g: ['简历中的平行动词结构', '完成项目通常用过去式动词开头；当前职责可用现在式。动词与实际贡献一致，不把参与写成领导。', 'Conducted five interviews and synthesised the recurring issues.', 'Collaborated with engineers to define error states.'],
      textTitle: 'A CV Line That Survives a Follow-Up',
      body: `Nico reviews a CV bullet that says, “Responsible for excellent user experience.” It does not tell a recruiter what Nico actually did. The revised version names the action, scope, and evidence: “Interviewed five customers and translated recurring booking problems into three prototype changes.” If a result was not measured, Nico does not invent a percentage. Another bullet explains collaboration with engineers on error states. The verbs remain consistent, and every statement can be supported by a project example. A useful CV is selective, but selection is different from exaggeration. The reader should be able to ask a follow-up and receive a credible answer.`,
      c: [['action verb', '动作动词'], ['recurring issue', '反复出现的问题'], ['translate findings into changes', '把发现转成改动'], ['support a statement', '为陈述提供依据'], ['selective, not exaggerated', '有所筛选但不夸大']],
      q: [
        ['What is missing from the original CV bullet?', 'A specific action and contribution.', 'More adjectives about excellence.', 'The entire company history.', 'excellent user experience 没说明具体做了什么。'],
        ['How many customers are in the revised example?', 'Five.', 'Fifty thousand.', 'The number is not stated.', '例句明确 interviewed five customers。'],
        ['What should Nico do if an outcome was not measured?', 'Avoid inventing a percentage.', 'Add a large number for impact.', 'Delete all project evidence.', '可以说明可观察贡献，但不能伪造指标。'],
        ['Which bullet uses parallel past-tense actions?', 'Interviewed users, analysed notes, and proposed changes.', 'Interviewed users, analysing notes, and proposes changes.', 'Interviews users, analysed notes, and to propose.', '并列完成动作保持过去式一致。'],
        ['Which verb should be used for a supporting role?', 'Collaborated, when the decision was shared.', 'Led, even when someone else led it.', 'Owned everything, regardless of facts.', '贡献动词应与真实角色吻合。']
      ],
      s: ['选择一条 CV bullet，回答：What did you personally do, and what evidence supports it? 接受一次细节追问。', '解释动作与范围', '能给出作品或过程证据', '不把协作说成独自负责'],
      w: ['写 160–210 words 简历素材库，包括 4 条 bullet 和每条的证据说明；最后选最相关的两条用于目标岗位。', 160, 210, '每条以具体动词开头', '数字均可核实或明确模拟', '与目标岗位要求相关'],
      p: ['投递海外产品设计岗位', '4 条可追问的英文简历 bullet', '根据一个真实职位描述选择相关证据，不复制不存在的经历。'],
      resources: ['bc-b2', 'work-email', 'write-improve'], reviewTip: '隔两天让同伴从 bullet 随机挑一条追问，记录解释不清的词并修改。'
    },
    {
      week: 38, phase: 'confidence', level: 'B2', title: '作品集：用故事结构展示决策',
      canDo: '用五分钟讲解一个案例，听者能复述问题、贡献和结果。',
      g: ['叙事中的时态一致', '案例背景与已完成动作以过去时为主；仍适用的原则用现在时。不要一段中无原因切换时间。', 'We tested two approaches and selected the simpler one.', 'This case shows why clear constraints matter.'],
      textTitle: 'A Portfolio Is Not a Screen Archive',
      body: `Nico prepares a portfolio case for an interview. The first draft contains many attractive screens but almost no explanation of decisions. Nico restructures it around five questions: what problem mattered, what evidence was available, what options were considered, what Nico contributed, and what happened next. A single example shows how an interview finding changed the design. The result includes an honest limitation: the work reached testing but was not launched. Nico removes confidential customer details and asks permission before sharing team material. The revised case is shorter and more useful because the interviewer can understand the thinking behind the screens.`,
      c: [['portfolio case', '作品集案例'], ['the thinking behind', '背后的思考'], ['confidential detail', '保密细节'], ['reached testing', '进入测试阶段'], ['restructure around', '围绕……重组结构']],
      q: [
        ['What is weak about the first draft?', 'It shows screens without explaining decisions.', 'It has no colourful cover.', 'It is written in five languages.', '原稿缺少决策理由。'],
        ['What limitation is reported?', 'The work was tested but not launched.', 'The project improved every company metric.', 'No one worked on the design.', '说明测试与上线状态的边界。'],
        ['What does Nico do before sharing team material?', 'Checks permission and removes confidential details.', 'Publishes every customer name.', 'Assumes all internal data is public.', '应尊重保密与分享权限。'],
        ['Which sentence keeps past actions consistent?', 'We interviewed users, tested two options, and revised the flow.', 'We interviewed users, test options, and will revised yesterday.', 'We interviewing users and has tested last year.', '并列叙述过去事件用一致过去式。'],
        ['Which slide best supports design thinking?', 'A finding, the resulting design change, and its evidence.', 'Twelve unexplained screen thumbnails.', 'A vague claim that all users loved it.', '展示发现如何影响决策，比屏幕堆叠有效。']
      ],
      s: ['录制 5 分钟案例讲解，按问题、证据、选项、个人贡献、结果组织；让同伴复述三个关键点。', '时间内覆盖五部分', '解释一个证据到设计的变化', '明确上线与未上线状态'],
      w: ['写 220–280 words 案例摘要，用作作品集开头及结尾；不复制公司保密资料。', 220, 280, '决策逻辑可跟随', '个人角色与限制明确', '时间表达一致且无保密信息'],
      p: ['海外设计面试作品集环节', '一个 5 分钟主线＋三个备用细节', '面试官随时打断，你要能回到主线并按追问提供细节。'],
      resources: ['bc-b2', 'write-improve'], reviewTip: '下次只用 5 张提示卡重讲，防止逐字背稿；比较听者复述准确度。'
    },
    {
      week: 39, phase: 'confidence', level: 'B2', title: 'Task 2：避免为了高级而不自然',
      canDo: '修改一篇议论文，优先修复论证和搭配，而不是机械替换同义词。',
      g: ['搭配与准确用词', '动词名词搭配应自然，如 provide access、make a decision。词汇多样性不能以改错意义为代价。', 'Public libraries provide access to reliable information.', 'Online resources complement libraries rather than automatically replacing them.'],
      textTitle: 'Precision Before Decoration',
      body: `Nico rereads an essay about public libraries. The first draft replaces ordinary words with longer alternatives, but several phrases sound unnatural and one paragraph stops answering the question. Nico returns to the argument: libraries provide information, shared space, and assistance that online sources do not always offer. Each sentence is checked for meaning before vocabulary is changed. A repeated key term can remain if a synonym would be less precise. Nico also removes an invented statistic and replaces it with a clearly labelled example. The revision improves clarity through accurate language and stronger explanation, not through decoration.`,
      c: [['reliable information', '可靠信息'], ['sound unnatural', '听起来不自然'], ['a precise term', '准确词语'], ['clearly labelled example', '明确标记为例子的情境'], ['stronger explanation', '更充分的解释']],
      q: [
        ['What is wrong with the first draft?', 'Some phrases are unnatural and a paragraph loses focus.', 'It contains no long words.', 'It mentions libraries at all.', '问题在准确度与任务相关性，不在词不够长。'],
        ['When can Nico keep a repeated key term?', 'When a synonym would be less precise.', 'Only when every sentence is identical.', 'Never, because repetition is always forbidden.', '必要术语可重复，避免不准确替换。'],
        ['What replaces the invented statistic?', 'A clearly labelled example.', 'A larger invented statistic.', 'A fake official citation.', '可用明确例子说明，不能伪造数据。'],
        ['Which collocation is natural?', 'Provide access to reliable information.', 'Do access for reliable informations.', 'Make a reliable information accessness.', 'provide access to 是自然搭配，information 不可数。'],
        ['Which revision should come first?', 'Repair a paragraph that does not answer the question.', 'Replace every common word with a rare one.', 'Add five memorised phrases to the conclusion.', '先解决任务回应和论证，再修语言。']
      ],
      s: ['回答：Are public libraries still useful when information is available online? 优先清楚解释，不强行使用陌生大词。', '至少一个具体服务例子', '区分线上与线下的作用', '不编造统计支持观点'],
      w: ['Task 2 原创练习：Some people believe public libraries are no longer necessary because information is available online. To what extent do you agree or disagree? 写 250–300 words；次日按任务、论证、搭配三轮修改。', 250, 300, '观点持续回应题目', '每段至少一个展开的理由', '修改中记录 3 个真实搭配问题'],
      p: ['把复杂研究结论改写给非专业同事', '一段清楚且保留原意的说明', '请同事标出不懂的词，优先修改理解障碍而非追求更高级词汇。'],
      resources: ['ielts-scoring', 'write-improve', 'bc-b2'], reviewTip: '把修改分成内容与语言两遍，保留每次改变的原因，不只收集最终范文。'
    },
    {
      week: 40, phase: 'confidence', level: 'B2', title: 'Academic Task 1：总览不被细节淹没',
      canDo: '把地图变化分成保持不变、新增和替换三类，并准确写总览。',
      g: ['空间关系与变化描述', 'to the north of 表达在某物北侧；was replaced by 表达被替换。地图没给出的使用原因不要推测。', 'The storage building was replaced by a café.', 'The entrance remained on the eastern side of the site.'],
      textTitle: 'A Site Before and After',
      body: `This invented map description compares a small visitor centre in 2010 and 2025. The entrance remains on the eastern side. A storage building in the north is replaced by a café, and a path is added between the café and the central reception. The exhibition room in the west becomes larger, while the car park in the south stays the same size. Nico groups these details before writing. The overview notes expanded visitor facilities and an unchanged entrance and parking area. The description does not claim that attendance increased, because the maps show physical changes rather than visitor numbers.`,
      c: [['was replaced by', '被……替换'], ['remained unchanged', '保持不变'], ['on the eastern side', '在东侧'], ['visitor facilities', '访客设施'], ['physical changes', '实体空间变化']],
      q: [
        ['What replaces the northern storage building?', 'A café.', 'A car park.', 'A new entrance.', '北侧仓库被咖啡馆替换。'],
        ['What remains the same size?', 'The southern car park.', 'The western exhibition room.', 'Every visitor facility.', '南侧停车场面积不变，展厅扩大。'],
        ['Why should attendance growth not be claimed?', 'The maps contain no visitor-number evidence.', 'Maps always prove fewer visitors.', 'The café has no northern wall.', '地图呈现空间变化，不提供客流。'],
        ['Choose the correct change description.', 'The storage building was replaced by a café.', 'The storage building replaced of a café.', 'The storage building was replace to café.', 'be replaced by 为正确被动结构。'],
        ['Which overview best fits the map?', 'Visitor facilities expanded, while the entrance and parking area remained unchanged.', 'Every part of the site was removed.', 'Visitor numbers doubled because coffee was cheaper.', '概括主要变化和不变项，不加入未给数据。']
      ],
      s: ['用 90–120 秒描述 2010 到 2025 的模拟地图变化，先总览再按方位展开。', '清楚区分变化和不变', '至少两处准确方位', '不推测客流和营业收入'],
      w: ['Academic 分支：根据本课模拟地图写 150–190 words，20 分钟。GT 分支把它改为设施变动通知，并按官方 GT 材料另练信件；类型未定需核实。', 150, 190, '总览抓设施扩展与不变项', '方位和替换关系准确', '描述不添加地图外原因'],
      p: ['向访客说明中心设施更新', '一段总览＋三项方位变化', '你需要让第一次到访的人理解变化；先注明这是模拟练习地图。'],
      resources: ['ielts-academic', 'ielts-general', 'ielts-scoring'], reviewTip: '用纸画出原文地图后再写，核对 north / south / east / west 与变动是否一致。'
    },
    {
      week: 41, phase: 'confidence', level: 'B2', title: '协商：交换范围，不只说不',
      canDo: '在时间不足的情境中提出两个有条件的交付方案。',
      g: ['协商中的条件句与选择', 'We could...if... 提出条件选项；unless 表达除非。明确条件变化对范围和日期的影响。', 'We could deliver the core flow by Friday if we postpone the animation.', 'We cannot confirm the full scope unless the dependency is resolved.'],
      textTitle: 'Offer a Choice With Consequences',
      body: `A manager asks Nico to add three extra features before Friday’s review. Nico knows the full request will not fit the remaining time. Instead of replying only “That is impossible,” Nico offers two choices. The team could finish the core flow by Friday if the extra features move to the following week. Alternatively, it could include all three additions and move the review to Tuesday. Nico explains the dependency on engineering feedback and asks which outcome matters more. The conversation becomes a choice about scope and time. Neither option hides the cost, and neither promises work that the team has not agreed to do.`,
      c: [['core flow', '核心流程'], ['the remaining time', '剩余时间'], ['move the review', '调整评审时间'], ['scope and time', '范围与时间'], ['a choice with consequences', '带明确后果的选择']],
      q: [
        ['Why can Nico not accept the whole request as it is?', 'It does not fit the remaining time.', 'The manager asked no question.', 'All three features are already finished.', '新增范围超出剩余时间。'],
        ['What happens if the Friday date is kept?', 'The extra features move to the following week.', 'All scope is completed with no trade-off.', 'Engineering feedback is no longer needed.', '保留时间则后移额外功能。'],
        ['What does Nico ask the manager to clarify?', 'Which outcome matters more.', 'Why English has conditions.', 'Which person should be blamed.', '协商围绕优先结果而非指责。'],
        ['Choose the correct conditional offer.', 'We could finish the core flow if we postponed the additions.', 'We could finished if we postponeed additions.', 'We could to finish if we postponed additions.', 'could + 原形，if + 过去式可表达较假设的协商选项。'],
        ['Which response exposes the trade-off?', 'We can keep Friday with less scope, or move the review for the full scope.', 'Yes to everything, even though we have no time.', 'No, and I will explain nothing.', '给出两个有范围与日期代价的方案。']
      ],
      s: ['角色扮演：A manager adds three features before Friday. Offer two options and ask which outcome matters most.', '提出两个真实可行选项', '各说明时间或范围代价', '请求对方明确优先级'],
      w: ['写 180–230 words 范围协商邮件，提供两个选项、依赖和需要的决定日期。', 180, 230, '不承诺未经团队确认的工作', '条件与后果写清楚', '结尾有一个具体选择请求'],
      p: ['临近评审新增需求', '两个交付方案与推荐', '你是设计负责人，基于容量与工程依赖协商，而不是只靠加班吞下范围。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '第 2 天把同一请求分别用口头和邮件回应，核对两版条件是否一致。'
    },
    {
      week: 42, phase: 'confidence', level: 'B2', title: '听不懂时怎样继续合作',
      canDo: '在陌生口音或快语速下，用具体澄清问题核对关键行动。',
      g: ['复述确认与具体请求', 'Could you repeat the last part? 缩小重复范围；Did you mean X or Y? 核对关键歧义。不用假装听懂。', 'Could you repeat the deadline rather than the whole explanation?', 'Did you mean thirteen participants or thirty?'],
      textTitle: 'Repair the Conversation',
      body: `In a call with an international team, Nico misses part of a sentence because the speaker talks quickly and the audio briefly breaks up. Asking everyone to repeat the whole meeting would be inefficient. Nico names the uncertainty: “I understood the design change, but could you repeat the deadline?” The colleague says Thursday, and Nico confirms the time zone. Later, Nico checks an unfamiliar abbreviation in the chat. These small repairs keep the conversation accurate without turning every unfamiliar sound into a crisis. For listening practice, Nico uses unfamiliar recordings with transcripts and reviews missed meaning after the first independent attempt.`,
      c: [['audio breaks up', '音频断续'], ['name the uncertainty', '指出具体不确定点'], ['confirm the time zone', '确认时区'], ['unfamiliar abbreviation', '不熟悉的缩写'], ['independent attempt', '独立首次尝试']],
      q: [
        ['What does Nico ask the colleague to repeat?', 'The deadline.', 'The entire meeting from the beginning.', 'The company’s complete history.', '针对没听清的截止时间澄清。'],
        ['What does Nico confirm after hearing Thursday?', 'The time zone.', 'A colour palette.', 'The colleague’s passport number.', '国际团队需确认时区。'],
        ['When should the transcript be reviewed in independent listening practice?', 'After the first attempt.', 'Always before hearing the recording.', 'Never, even during review.', '首次独立听后使用文本分析漏听。'],
        ['Which question targets a specific ambiguity?', 'Did you mean thirteen participants or thirty?', 'What is every possible thing you said?', 'Do you speak real English?', '明确候选信息，礼貌且高效。'],
        ['Which action best supports accurate collaboration?', 'State what you understood and ask about the missing detail.', 'Agree silently when the deadline is unclear.', 'Pretend the audio was perfect.', '已懂部分与未知部分分开说，便于修复。']
      ],
      s: ['和同伴模拟快语速更新，练习只澄清漏掉的一项；独自练习时从官方材料选陌生音频先听后核对文本。', '提出两次具体澄清', '核对一个数字或时区', '记录首次结果与复习结果的区别'],
      w: ['写 160–210 words 会后确认，列出已理解事项、待确认细节和最终行动；另记录真实音频的三处漏听原因。', 160, 210, '未知内容不自行补全', '确认中包含时间与时区', '漏听原因是可练习类别'],
      p: ['国际团队中音质不佳的电话会议', '一段 4 轮澄清对话＋最终确认', '你听到的可能是 thirteen 或 thirty，不猜，核对后再更新招募计划。'],
      resources: ['bc-b2', 'cambridge-practice', 'language-reactor'], reviewTip: '同段音频 48 小时后回听属于复习；要测迁移请换一段未读文本的同类材料。'
    },
    {
      week: 43, phase: 'confidence', level: 'B2', title: 'Task 2：连贯来自逻辑而非词表',
      canDo: '为每段写一句功能说明，检查句间指代和因果是否成立。',
      g: ['逻辑连接与指代清楚', 'therefore 必须承接因果；however 必须存在转折；this 应有清楚指代。连接词不能替代论点发展。', 'Training takes time. Therefore, employers need to allocate learning hours.', 'This investment can reduce repeated mistakes.'],
      textTitle: 'Follow the Chain of Ideas',
      body: `Nico reviews an essay about whether employers should fund staff training. Every paragraph contains linking words, yet the argument is difficult to follow. One sentence describes training costs, the next jumps to public transport, and “therefore” connects two unrelated claims. Nico removes the connectors and checks the underlying sequence. A revised paragraph explains that new tools require skills, that staff need time to develop those skills, and that employers benefit when mistakes decrease. Now a connector can clarify a relationship that already exists. Nico also replaces an unclear “this” with “this investment in training” so the reader knows what the sentence refers to.`,
      c: [['underlying sequence', '底层逻辑顺序'], ['unrelated claim', '不相关的论断'], ['allocate learning hours', '安排学习时间'], ['this investment in training', '这项培训投入'], ['clarify a relationship', '阐明关系']],
      q: [
        ['Why is the first draft hard to follow?', 'It jumps between unrelated ideas despite many linking words.', 'It has too few rare adverbs.', 'It uses the word training.', '连接词多但论证关系断裂。'],
        ['What does Nico check after removing connectors?', 'The sequence of the ideas.', 'The colour of each paragraph.', 'The alphabetic order of the words.', '先看内容逻辑，再加连接词。'],
        ['Why replace “this” with “this investment in training”?', 'To make the reference explicit.', 'To increase the word count without meaning.', 'To remove every repeated noun.', '补足名词明确指代。'],
        ['When is “therefore” appropriate?', 'When the next statement follows as a result.', 'Whenever two ideas are unrelated.', 'Only at the beginning of every paragraph.', 'therefore 表示结果，不能随机当装饰。'],
        ['Which chain is coherent?', 'New tools require skills; training develops them; fewer errors can benefit employers.', 'Training costs money; buses are blue; therefore all managers agree.', 'People learn; however the moon exists; therefore skills vanish.', '每个信息点与下一个有可解释联系。']
      ],
      s: ['回答：Should employers pay for staff training? 用一条完整因果链解释，再回应一个限制。', '句间逻辑连续', '连接词有真实作用', 'this / they 指代明确'],
      w: ['Task 2 原创练习：Employers should pay for employees to develop skills needed for their work. To what extent do you agree or disagree? 写 250–300 words；修改时先删连接词检查逻辑。', 250, 300, '各段有单一主要功能', '原因到结果解释完整', '代词和 this 指向清楚'],
      p: ['向经理申请英语或工具培训', '一段成本、机制、预期价值与限制的论证', '不要保证培训必然涨收入，说明学习如何改变具体工作行为。'],
      resources: ['ielts-scoring', 'write-improve'], reviewTip: '在每段旁写“这段为什么在这里”；答不出时重组段落，不再加连接词。'
    },
    {
      week: 44, phase: 'confidence', level: 'B2', title: '难题面试：失败、未知与边界',
      canDo: '面对未准备的问题先直接回应，再给证据和反思，不编造答案。',
      g: ['承认知识边界的表达', 'I have not worked with...yet 承认经验边界；I would start by... 说明可行思路。不要把假设写成过去做过。', 'I have not led a pricing study yet.', 'I would start by clarifying the decision and the available evidence.'],
      textTitle: 'An Honest Answer Can Still Be Strong',
      body: `An interviewer asks Nico about leading a pricing study. Nico has supported product research but has never owned a pricing project. Claiming experience would create a fragile answer. Instead, Nico states the boundary, explains relevant research work, and outlines a reasonable starting approach: clarify the business decision, understand available evidence, and involve someone with pricing expertise. The interviewer then asks about a failed design assumption. Nico gives a real example and explains what changed afterward. The answers do not need to make Nico appear perfect. They need to show accurate self-awareness, transferable skills, and a sensible way to learn.`,
      c: [['state the boundary', '说明经验边界'], ['relevant experience', '相关经验'], ['transferable skill', '可迁移能力'], ['failed assumption', '被证明不成立的假设'], ['self-awareness', '自我认知']],
      q: [
        ['Has Nico led a pricing study?', 'No, Nico has not owned one.', 'Yes, dozens of completed projects.', 'The text gives a pricing certificate.', '原文明确没有主导过定价研究。'],
        ['What does Nico offer instead of a false claim?', 'Relevant experience and a starting approach.', 'A fabricated business result.', 'Silence with no explanation.', '承认边界后展示相关能力和思路。'],
        ['What should the failed-assumption answer include?', 'A real example and what changed afterward.', 'An accusation against every colleague.', 'A claim that no assumption ever fails.', '失败题需要具体经历和学习后的改变。'],
        ['Which sentence clearly labels a hypothetical approach?', 'I would start by clarifying the business decision.', 'I led the study, although I never did.', 'I have secretly solved every pricing issue.', 'would start 说明假设方案，不冒充过去经历。'],
        ['Which answer is both honest and useful?', 'I have not led one yet; my research experience would help me structure the questions.', 'I know everything and have no learning needs.', 'I will invent a result to sound senior.', '经验边界和可迁移技能并列，可信且有信息。']
      ],
      s: ['随机回答两题：Tell me about a failed assumption. / How would you approach an unfamiliar research problem? 每题先停 5 秒组织再答。', '直接回应问题', '真实经历与假设分开', '结尾有具体学习动作'],
      w: ['写 200–250 words 面试素材：一个真实失败故事＋一个未知领域应对框架；不要背成同一个通用答案。', 200, 250, '不把假设写成经历', '个人动作与结果清楚', '说明会向谁或什么证据求助'],
      p: ['资深设计岗位追问', '两段诚实且可追问的回答', '面试官问到没做过的事，你需要说明能力迁移、求助对象与第一步。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '让同伴临时换一个陌生主题，检查你能否迁移回答结构，而不是死背词句。'
    },
    {
      week: 45, phase: 'confidence', level: 'B2', title: '建立联系：低负担且具体',
      canDo: '写一条个性化职业联系消息，并在对话中提出一个适度的问题。',
      g: ['关系建立中的语气与请求范围', 'I was interested in... 指出具体内容；Would you be open to...? 允许对方拒绝。不要首次联系就要求推荐。', 'I was interested in your case study about accessible onboarding.', 'Would you be open to answering one question about your process?'],
      textTitle: 'Start With a Genuine Connection',
      body: `Nico wants to contact a designer whose public case study discusses accessible onboarding. A generic message asking for a job referral would give the person little reason to respond. Nico mentions one specific insight from the case and asks a focused question about involving engineers early. The request is small and does not assume a reply is owed. If the designer responds, Nico thanks them and explains how the advice helped. If there is no answer, Nico avoids repeated pressure. Professional networking can begin with shared learning, and a useful conversation is more valuable than collecting a long list of names.`,
      c: [['genuine connection', '真实联系'], ['job referral', '岗位内推'], ['focused question', '聚焦的问题'], ['a reply is owed', '认为对方有义务回复'], ['shared learning', '共同学习']],
      q: [
        ['What specific topic connects Nico to the designer?', 'Accessible onboarding.', 'An unrelated celebrity post.', 'A private salary document.', '对方公开案例讨论可访问性引导流程。'],
        ['What does Nico ask about?', 'Involving engineers early.', 'An immediate guaranteed job.', 'The designer’s private password.', '聚焦早期工程协作的一个问题。'],
        ['What happens if no reply arrives?', 'Nico avoids repeated pressure.', 'Nico sends demands every hour.', 'Nico assumes a job offer exists.', '尊重对方选择，不反复施压。'],
        ['Which request allows the other person to decline?', 'Would you be open to answering one question about your process?', 'You must refer me today.', 'Send your contacts because I demand it.', 'would you be open to 用礼貌且可拒绝的方式请求。'],
        ['Which first message is most personalised?', 'Your onboarding case changed how I think about error recovery; may I ask one question?', 'Hello, I send this exact message to everyone.', 'I did not read your work, but give me a job.', '提到真实具体内容并给出小请求。']
      ],
      s: ['模拟行业活动：Introduce yourself, refer to a shared topic, and ask one relevant question. 不编造对方说过的话。', '介绍控制在 30 秒内', '提出具体相关问题', '回应对方答案而非继续背稿'],
      w: ['写 150–190 words，包括一条首次联系消息和一条收到建议后的感谢；先保存草稿，不自动发给任何人。', 150, 190, '包含真实可核对的公开内容', '请求范围小而清楚', '尊重回复与拒绝的自由'],
      p: ['联系公开分享案例的海外设计师', '一条 70–100 words 消息与后续感谢', '选择一篇你实际读过的公开作品，提出对流程的真实问题，不默认索取内推。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '回看消息删除空泛夸赞；能指出具体案例观点才保留“我很喜欢你的作品”。'
    },
    {
      week: 46, phase: 'confidence', level: 'B2', title: 'Task 1：选择正确分支并精修',
      canDo: '按已选考试类型完成一篇 Task 1，并定位三项实质修改。',
      g: ['数字与语气的精确编辑', '图表检查数字、范围与比较；信件检查内容点、关系与语气。两者不能套同一模板。', 'The proportion doubled from 10% to 20%.', 'I would appreciate a replacement if a repair is not possible.'],
      textTitle: 'Use the Right Editing Checklist',
      body: `Nico has two old Task 1 drafts: an Academic data description and a General Training complaint letter. They need different editing checks. The data description requires a clear overview, accurate figures, and useful comparisons. It should not speculate about causes. The letter requires a clear purpose, coverage of all situation points, and a tone appropriate to the recipient. It should state the requested action. Nico practises the branch required by the confirmed test type and keeps the other as general language practice. If the test type is still undecided, the next action is to verify the requirement rather than merge both formats into one response.`,
      c: [['editing checklist', '修改清单'], ['speculate about causes', '推测原因'], ['coverage of all points', '覆盖全部要求点'], ['appropriate tone', '合适语气'], ['requested action', '希望对方采取的动作']],
      q: [
        ['What does an Academic data description need?', 'A clear overview and accurate comparisons.', 'A complaint greeting in every paragraph.', 'An invented explanation for each number.', '图表要总览、准确数字和对比。'],
        ['What does the GT letter need?', 'A purpose, all content points, and appropriate tone.', 'Only a data overview.', 'A graph in every sentence.', '信件任务要求目的、内容覆盖与语气。'],
        ['What if the test type is undecided?', 'Verify the requirement instead of merging formats.', 'Combine a graph and a complaint into one Task 1.', 'Assume the two formats are identical.', '先核对目标类型，不混写格式。'],
        ['Which numeric statement is accurate?', 'An increase from 10% to 20% is a doubling.', 'An increase from 10% to 20% is ten times larger.', 'An increase from 10% to 20% is a decrease.', '20 为 10 的两倍，同时增加 10 个百分点。'],
        ['Which request suits a formal complaint?', 'I would appreciate a replacement if repair is not possible.', 'Yo, give me things now.', 'You are always wrong about everything.', '正式投诉仍应明确、礼貌、可执行。']
      ],
      s: ['用 90 秒解释自己的考试类型和 Task 1 修改清单；未确认则说明要向哪个机构核实。', '不混淆两种任务', '说出三条本类型检查项', '说明一项上次作品的实质修改'],
      w: ['按已确认类型择一，150–190 words、20 分钟。Academic：重写第 31 周模拟数据（email 50、phone 25、chat 15、forum 10，共100人）。GT：给商家写投诉信，说明收到的灯损坏、已尝试的解决办法、希望退款或更换。两种均为原创练习。', 150, 190, '类型与格式一致', '内容覆盖或数字准确', '修改后标记三处有理由的变化'],
      p: ['工作中按文体选择编辑标准', '一份数据摘要或正式售后请求', '先确认读者和目的，再选择总览式说明或请求式信件，不盲套模板。'],
      resources: ['ielts-academic', 'ielts-general', 'ielts-scoring', 'write-improve'], reviewTip: '把三项实质修改写成自己的检查卡，48 小时后用陌生 Task 1 检查迁移。'
    },
    {
      week: 47, phase: 'confidence', level: 'B2', title: '设计批评：描述、影响、建议',
      canDo: '给出三条针对作品而非人的反馈，每条有观察、影响和建议。',
      g: ['反馈中的观察与判断', 'I noticed that... 描述可见事实；This may... 说明可能影响；Could we... 提出建议。不要把个人偏好伪装成用户证据。', 'I noticed that the two buttons use the same label.', 'This may make the next step unclear; could we name the actions?'],
      textTitle: 'Critique the Work, Protect the Conversation',
      body: `In a design critique, a colleague says the new settings page is “confusing.” Nico asks for a specific example. The colleague points out that two buttons have the same label but lead to different actions. This observation is more useful than a general judgment. Nico summarises the possible impact and suggests testing more descriptive labels. Another comment concerns the illustration style; the group marks it as a preference until there is evidence of a user problem. The critique ends with three prioritised actions and one question to investigate. People can challenge the design without treating a teammate’s taste or competence as the problem.`,
      c: [['specific observation', '具体观察'], ['descriptive label', '描述动作的标签'], ['mark as a preference', '标记为偏好'], ['prioritised action', '按优先级排列的行动'], ['challenge the design', '质疑设计方案']],
      q: [
        ['What makes the button feedback useful?', 'It identifies identical labels for different actions.', 'It repeats that everything is confusing.', 'It criticises the designer’s personality.', '指出可观察行为比笼统判断更有帮助。'],
        ['How is the illustration-style comment treated?', 'As a preference until evidence shows a user issue.', 'As proof the designer is incompetent.', 'As an automatic release blocker.', '风格偏好与用户问题证据分开。'],
        ['What does the critique produce?', 'Three prioritised actions and one investigation question.', 'An agreement to ignore all feedback.', 'A ranking of teammates’ personalities.', '反馈要转为有顺序的行动与待研究问题。'],
        ['Which feedback begins with an observation?', 'I noticed that both buttons say “Continue.”', 'You never understand good design.', 'This is bad because I said so.', '可见标签事实是观察，而非人身判断。'],
        ['Which comment distinguishes preference from evidence?', 'I prefer a quieter illustration, but we have not shown it causes a task problem.', 'My taste is always user research.', 'All users must agree with my favourite style.', '清楚标记偏好，避免冒充证据。']
      ],
      s: ['选择一页公开产品或自己的练习稿，给出三条 critique：observation → possible impact → suggestion。', '每条有具体页面行为', '区分偏好和证据', '不评价设计者人格或能力'],
      w: ['写 190–240 words 设计评审纪要，包含三条优先行动、一条待查问题及对应理由。', 190, 240, '反馈针对作品', '优先级与用户影响相关', '建议不超出证据强度'],
      p: ['加入海外团队的每周 critique', '三条结构化反馈及一段回应', '你既要给反馈，也要回应别人质疑；先澄清观察再决定修改。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '把反馈中的 bad、nice、confusing 圈出，逐个补“具体哪里、影响什么、如何验证”。'
    },
    {
      week: 48, phase: 'confidence', level: 'B2', title: 'Task 2：限时完成与分层修改',
      canDo: '40 分钟内完成一篇至少 250 words 的回应，之后按内容和语言分层修改。',
      g: ['检查句子边界与一致性', '一个句号连接过多独立分句会形成 run-on sentence；检查主谓一致和代词，再考虑句式多样性。', 'Cities need public spaces, and planners should protect them.', 'A useful space offers safety, access, and opportunities to meet.'],
      textTitle: 'Finish, Then Diagnose',
      body: `Nico sets a forty-minute writing timer and keeps the dictionary closed. The goal is an independent response, not a perfect sentence at every moment. A few minutes are reserved for understanding the question and planning, followed by drafting and a final check. After the timer ends, Nico saves the original before making changes. The first review checks whether every part of the question is answered and the position is consistent. The second checks paragraph development. Only then does Nico edit vocabulary and grammar. This order prevents a polished sentence from hiding an essay that never answered the actual task.`,
      c: [['independent response', '独立作答'], ['keep the dictionary closed', '不查词典'], ['save the original', '保存原稿'], ['paragraph development', '段落论证展开'], ['sentence boundary', '句子边界']],
      q: [
        ['What is the timer length?', 'Forty minutes.', 'Four minutes.', 'Two hours for Task 2 alone.', 'Task 2 练习设 40 分钟。'],
        ['What happens before editing?', 'The timed original is saved.', 'All evidence of the first attempt is deleted.', 'A dictionary is used throughout the timed attempt.', '保存独立限时原稿，避免精修结果冒充首次表现。'],
        ['What is reviewed first?', 'Whether the question is answered and the position is consistent.', 'Only the number of rare words.', 'The font of the draft.', '任务回应与立场优先于局部语言打磨。'],
        ['Which sentence has correct agreement?', 'A useful public space offers safety and access.', 'A useful public space offer safety and access.', 'A useful public spaces offers safety and access.', '单数 space 与 offers 一致。'],
        ['Which record best separates practice conditions?', '40-minute unaided draft, then an untimed revised version.', 'One final text labelled perfect without conditions.', 'A copied model answer called my independent attempt.', '分别记录时间与工具条件，证据才可解释。']
      ],
      s: ['用 2 分钟回答：Should cities prioritise shared public spaces when planning new neighbourhoods? 先给立场，再解释一项价值与限制。', '回应优先级问题', '例子支持论点', '不背写作全文当口语'],
      w: ['Task 2 原创限时练习：Cities should prioritise shared public spaces when planning new neighbourhoods. To what extent do you agree or disagree? 写 250–300 words，40 分钟，不查词；保留原稿，次日再分三轮修改。', 250, 300, '至少 250 words 且完成结论', '回应程度并保持一致', '记录内容与语言各一项修改'],
      p: ['在有截止时间的提案中保持清晰', '一份限时初稿及优先修订列表', '模拟赶提案，先确保读者能做决定，再处理不影响意思的小错误。'],
      resources: ['ielts-scoring', 'write-improve', 'cambridge-practice'], reviewTip: '只把未查词、限时、未见题条件下的首次作品用于比较；精修稿用于学习。'
    },
    {
      week: 49, phase: 'confidence', level: 'B2', title: '完整模拟：条件和证据都真实',
      canDo: '按选定考试格式安排完整模拟，准确记录每部分条件与未完成项。',
      g: ['记录事实与条件', 'under exam conditions 表示考试条件；before/after 清楚标明何时查看答案。不能把修订稿视为独立表现。', 'I completed the reading section before checking the answers.', 'The revised essay was written after I received feedback.'],
      textTitle: 'Prepare the Conditions, Not Just the Answers',
      body: `Nico plans a full practice cycle with official materials that have not been studied before. Reading and writing each receive sixty minutes. Listening follows the instructions and transfer rules for the chosen format, rather than an invented universal timing. Speaking is practised separately with a partner who can ask follow-up questions. Breaks, interruptions, dictionary use, and unfinished items are recorded honestly. Afterwards, objective answers are checked using the supplied key. Writing and speaking need criterion-based feedback, ideally from a qualified teacher. A mock can reveal readiness gaps, but it cannot promise an official result. The short weekly lesson remains a warm-up, not the whole mock.`,
      c: [['exam conditions', '考试条件'], ['answer key', '答案表'], ['unfinished item', '未完成题目'], ['criterion-based feedback', '依据标准的反馈'], ['readiness gap', '备考差距']],
      q: [
        ['What materials does Nico choose for the mock?', 'Official practice materials not previously studied.', 'Only memorised site questions.', 'A favourite essay copied again.', '陌生官方材料更适合诊断独立表现。'],
        ['How is listening timing selected?', 'By the instructions for the chosen practice format.', 'By a random universal five-minute timer.', 'By the length of the coffee break.', '听力要遵循所选纸笔或机考等格式说明。'],
        ['What is recorded about conditions?', 'Interruptions, tool use, and unfinished work.', 'Only the most flattering result.', 'Nothing, because conditions never matter.', '条件影响结果解释，须如实保存。'],
        ['Which statement clearly identifies independent work?', 'I finished the timed section before viewing the answer key.', 'I read the answers first, so it was an unseen test.', 'My copied model answer proves my unaided level.', '先完成限时任务，再查答案才是独立首次尝试。'],
        ['What conclusion can a mock support?', 'A list of readiness gaps requiring further practice.', 'A guaranteed official band.', 'Proof that all job interviews will succeed.', '模拟可暴露差距，不能担保考试或工作结果。']
      ],
      s: ['另约一次按官方结构的口语模拟，保留完整录音并接受陌生追问；本课文本先做热身，不代替模拟。', '不提前背本次具体答案', '保存完整而非只剪精彩片段', '记录两项标准对应的问题'],
      w: ['完整模拟需额外预约时段：阅读独立 60 分钟；写作独立 60 分钟（Task 1 至少150 words，Task 2 至少250 words）；听力按所选格式说明；口语另排。本课写 150–200 words 条件与结果记录，类型未确认者先核实。', 150, 200, '不把微课计成完整模考', '各部分条件如实记录', '写作口语反馈不由自编题换算分数'],
      p: ['检查海外工作与考试准备状态', '模拟结果档案与下周优先修复项', '你向导师展示原始证据，说明结果能支持什么、不能说明什么。'],
      resources: ['cambridge-practice', 'ielts-academic', 'ielts-general', 'ielts-scoring'], reviewTip: '先休息后复盘；按错误机制选两项高频问题，避免临考前突然增加大量新材料。'
    },
    {
      week: 50, phase: 'confidence', level: 'B2', title: '只修高频且影响大的错误',
      canDo: '从真实作品选 3 类反复错误，用陌生任务验证是否迁移。',
      g: ['自我编辑的核对顺序', '先检查影响意思的否定、时态与主谓关系，再看冠词拼写；不要把每个小错视为同等严重。', 'The change has not been approved yet.', 'We tested the flow yesterday, but we have not launched it.'],
      textTitle: 'An Error Log That Changes Practice',
      body: `After the mock, Nico has a long list of mistakes. Trying to practise every item equally would spread attention too thin. Nico selects three recurring patterns: missing final corrections in listening, unclear paragraph examples, and confusing completed work with future plans. For each pattern, the log includes an original example, a corrected version, and one short explanation. Nico then creates a new sentence or uses an unfamiliar task to check transfer. Repeating a memorised correction is not enough. The review also protects sleep and avoids replacing the whole study system during the final weeks. Improvement comes from targeted repetitions, not from collecting more applications.`,
      c: [['recurring pattern', '反复出现的模式'], ['spread attention too thin', '注意力过度分散'], ['check transfer', '检验迁移'], ['targeted repetition', '针对性重复练习'], ['protect sleep', '保证睡眠']],
      q: [
        ['How many recurring patterns does Nico prioritise?', 'Three.', 'Every possible language error equally.', 'None, because errors are irrelevant.', '从长清单选三类重点。'],
        ['What does each log entry include?', 'An original example, a correction, and an explanation.', 'Only a colourful sticker.', 'A copied score certificate.', '原错、修正、原因形成可复用记录。'],
        ['How does Nico check transfer?', 'With a new sentence or unfamiliar task.', 'By memorising only the same corrected answer.', 'By installing another app without practice.', '换新情境才能区分背答案与真正掌握。'],
        ['Which sentence clearly distinguishes tested from launched?', 'We tested it yesterday, but we have not launched it.', 'We tested it yesterday so every customer now uses it.', 'We have launch tomorrow yesterday.', '过去测试不等于已经上线，时态与意义均须准确。'],
        ['Which error deserves priority in a status update?', 'Accidentally saying approved when it has not been approved.', 'A harmless extra space after a full stop.', 'A preference for one acceptable spelling variety.', '影响事实含义和协作决策的错误优先。']
      ],
      s: ['重新回答一题第 49 周较弱的口语题，再换一道同类陌生题；比较是否还出现同一问题。', '不用背旧答案代替新回答', '重点纠正一个高频模式', '保留新旧录音及观察'],
      w: ['写 180–230 words 错误复盘，包含三类真实错误、原因和下一次检查动作；然后写三句新例句检验迁移。', 180, 230, '错误来自自己的原始作品', '先处理影响理解的模式', '每类有一次陌生情境检验'],
      p: ['给自己制定上线前英文检查清单', '一张仅含 3 项的高价值检查卡', '选择否定、时间或责任等容易造成工作误解的模式，写成发送前问题。'],
      resources: ['anki', 'write-improve', 'ielts-scoring'], reviewTip: '在第 2、4、7 天各练一条新句；卡片保存纠错原因，不只保存正确答案。'
    },
    {
      week: 51, phase: 'confidence', level: 'B2', title: '入职前沟通与前三十天',
      canDo: '明确询问岗位职责、协作方式和入职预期，并提出可调整的学习计划。',
      g: ['礼貌核实与避免预设', 'Could you clarify...? 询问尚未确定事项；I understand that...is that correct? 核对理解。offer 条款要按真实文件确认，不凭课程猜测。', 'Could you clarify how design decisions are reviewed?', 'I understand that onboarding starts on Monday; is that correct?'],
      textTitle: 'Start by Learning the Team',
      body: `Before joining a new team, Nico receives a welcome message but still has questions about the first month. Instead of assuming every company works the same way, Nico asks how decisions are reviewed, which tools are used, and who can explain the product history. The initial thirty-day plan focuses on understanding customers, observing meetings, and delivering one small agreed task. It does not promise a major redesign before learning the context. Nico also checks practical arrangements through the appropriate company contact. Clear questions help establish realistic expectations and make it easier to ask for support after starting.`,
      c: [['realistic expectation', '合理预期'], ['product history', '产品历史与背景'], ['observe meetings', '旁听会议'], ['agreed task', '双方同意的任务'], ['appropriate contact', '对应负责联系人']],
      q: [
        ['Why does Nico ask about the team’s process?', 'Different companies may work differently.', 'Every team uses identical methods.', 'The welcome message contains all possible answers.', '不要预设所有公司流程相同。'],
        ['What is included in the initial plan?', 'Learning context and delivering one small agreed task.', 'A guaranteed major redesign in the first week.', 'Avoiding all customer information.', '先理解背景，再交付小型已对齐任务。'],
        ['Who should confirm practical arrangements?', 'The appropriate company contact.', 'A random online comment.', 'The site’s invented answer key.', '具体安排需向对应公司联系人核实。'],
        ['Which question politely verifies a process?', 'Could you clarify how design decisions are reviewed?', 'Tell me why your process must be wrong.', 'I assume you do everything my old way.', 'Could you clarify 加具体事项可礼貌核实。'],
        ['Which first-month goal is realistic?', 'Understand users and agree on one manageable delivery.', 'Redesign the whole product before learning the context.', 'Guarantee that all metrics will improve immediately.', '目标与新人了解背景、逐步交付的实际条件一致。']
      ],
      s: ['模拟入职交流：Ask about review rituals, product context, and first-month expectations. 然后复述自己的理解。', '提出三个具体问题', '不把假设说成已确认', '复述一个可调整目标'],
      w: ['写 180–230 words 入职前询问邮件和 30 天计划摘要；若尚未获得 offer，明确作为模拟而非真实入职。', 180, 230, '问题发给对应角色', '目标先学习后交付', '安排与条款不凭空假定'],
      p: ['海外产品团队入职准备', '一封确认邮件＋前三十天三项重点', '你需要知道团队决策方式、可寻求支持的人和首个可交付任务。'],
      resources: ['bc-b2', 'work-email'], reviewTip: '复习第 1 周介绍与第 14 周交接；各重录一次，检查能否自然应对第一次团队交流。'
    },
    {
      week: 52, phase: 'confidence', level: 'B2', title: '年度验收：证据、边界与下一年',
      canDo: '用纵向作品说明三项已具备能力和两项继续练习目标，考试结果单独记录。',
      g: ['回顾变化与持续目标', 'used to + 动词原形描述过去习惯；now 对比当前能力；still + 动词说明仍有的限制。不要把努力与达标混为一谈。', 'I used to avoid follow-up questions, but now I can ask for clarification.', 'I still need practice with unfamiliar topics under time pressure.'],
      textTitle: 'Keep the Evidence, Continue the Practice',
      body: `Nico opens the recordings and drafts saved across the year. The final review repeats the original introduction, includes a new project discussion with follow-up questions, and examines a recent independent writing task. The comparison can show clearer structure, more accurate requests, and fewer repeated errors. It may also reveal remaining difficulty with unfamiliar topics. If Nico has taken IELTS, the official result is recorded separately from site practice. If not, the target remains unverified. The next plan is based on current evidence and actual work needs. Completing fifty-two weeks is a meaningful achievement, but learning continues through new tasks and honest feedback.`,
      c: [['longitudinal evidence', '纵向积累的证据'], ['the target remains unverified', '目标仍未得到验证'], ['actual work needs', '真实工作需求'], ['honest feedback', '诚实具体的反馈'], ['continue through new tasks', '通过新任务继续学习']],
      q: [
        ['What does the final review repeat?', 'The original introduction.', 'Only a memorised answer key.', 'The same app installation process.', '复测基线自我介绍便于纵向比较。'],
        ['How is an official IELTS result recorded?', 'Separately from site practice.', 'As a number automatically generated by the quiz.', 'As proof of every workplace skill.', '官方考试与站内练习证据分开。'],
        ['What if Nico has not taken IELTS?', 'The exam target remains unverified.', 'Finishing the course automatically certifies 6.5.', 'The site must invent a result.', '没有考试不能宣称已达官方分数。'],
        ['Choose the correct past-habit sentence.', 'I used to avoid follow-up questions.', 'I used to avoided follow-up questions.', 'I use to avoiding follow-up questions before.', 'used to 后接动词原形。'],
        ['Which next-year plan follows the evidence?', 'Practise two remaining weaknesses using new tasks and feedback.', 'Stop because all possible English is finished.', 'Repeat only material whose answers are memorised.', '继续练仍存在的弱项并用新情境验证。']
      ],
      s: ['重录第 1 周介绍，另讲一个新项目并回答两次陌生追问；把三段录音与第 1、16、36 周对照。', '展示三个已能独立完成的任务', '指出两个仍需要练习的情境', '官方分数与工作表达分别解释'],
      w: ['写 220–280 words 年度学习回顾：基线、三项有作品支持的变化、两项限制、未来四周行动。若另做正式模考，仍须预留完整分项时段。', 220, 280, '每项进步有录音或文本证据', '不把完成周数当作雅思认证', '未来行动含材料、次数和复测日期'],
      p: ['向导师或自己汇报年度能力与下一步', '一页能力档案：介绍、案例、邮件、独立测评、下一步', '展示自己已能完成的真实任务，清楚说明尚未验证的考试目标及需要的反馈。'],
      resources: ['ielts-scoring', 'cambridge-practice', 'bc-b2', 'write-improve'], reviewTip: '保存年度原始证据，下一周期每四周做一次陌生任务复测；已熟词块逐步降低频率。'
    }
  ];

  const phases = [
    { id: 'rebuild', title: '表达自动化', from: 1, to: 8, level: 'B1', goal: '校准四项基线；能独立介绍自己、提问、汇报与提出明确请求。', checks: ['90 秒介绍覆盖职责、当前项目和目标三个信息点', '完成一封 120–180 words 工作邮件并保留初稿、修改稿'] },
    { id: 'bridge', title: '从信息到论证', from: 9, to: 16, level: 'B1–B2', goal: '解释研究证据、设计取舍和项目故事；在追问中澄清而非背稿。', checks: ['2 分钟讲清问题、证据、取舍和结果，并说明限制', '用具体观察和验收条件完成交接，负责人和期限无歧义'] },
    { id: 'ielts', title: '考试任务桥接', from: 17, to: 24, level: 'B2', goal: '确认考试类型；建立阅读证据、听力更正和 Task 1 / Task 2 的独立作答方法。', checks: ['明确 Academic 与 GT 的 Task 1 差异并核对目标机构要求', '独立完成 Task 1 至少 150 words、Task 2 至少 250 words；使用公布标准复盘'] },
    { id: 'work', title: '职场协作与考试并行', from: 25, to: 36, level: 'B2', goal: '能主持简短讨论、解释数据和决策、讲真实 STAR 故事；定期检验限时表现。', checks: ['3 分钟项目演示有目标、证据、风险和明确请求', '完成独立 60 分钟写作诊断，工作与考试证据分开保存'] },
    { id: 'confidence', title: '稳定发挥与求职迁移', from: 37, to: 52, level: 'B2', goal: '形成可信简历和作品集，能应对陌生追问；官方考试目标以真实考试结果验证。', checks: ['5 分钟案例讲解并回应两次陌生追问，贡献与结果可核实', '用陌生官方材料完成分项模拟；站内正确率不换算雅思分'] }
  ];

  function buildWeek(item) {
    return {
      week: item.week,
      phase: item.phase,
      title: item.title,
      canDo: item.canDo,
      level: item.level,
      grammar: { title: item.g[0], note: item.g[1], examples: item.g.slice(2) },
      text: { title: item.textTitle, body: item.body },
      chunks: item.c.map(([en, zh]) => ({ en, zh })),
      quiz: item.q.map(([question, correct, wrongA, wrongB, explanation], index) => {
        const answer = (item.week + index) % 3;
        const options = [wrongA, wrongB];
        options.splice(answer, 0, correct);
        return { id: `nico-w${String(item.week).padStart(2, '0')}-q${index + 1}`, question, options, answer, explanation };
      }),
      speaking: { prompt: item.s[0], checklist: item.s.slice(1), seconds: item.week < 9 ? 90 : item.week === 38 ? 300 : item.week >= 30 ? 180 : 120 },
      writing: { prompt: item.w[0], minWords: item.w[1], maxWords: item.w[2], checklist: item.w.slice(3) },
      workplace: { scenario: item.p[0], goal: item.p[1], prompt: item.p[2] },
      resourceIds: item.resources,
      reviewTip: item.reviewTip
    };
  }

  window.COURSES = window.COURSES || {};
  window.COURSES.nico = {
    id: 'nico',
    learner: 'Nico',
    baselineLabel: '原计划起点：IELTS 5.5（待重测）',
    description: '52 周原创微课，连接设计／产品协作、海外求职与 IELTS 6.5+ 挑战目标。先重测当前四项能力并核对考试类型；站内练习用于学习与诊断，不产生官方雅思评分或达标保证。',
    phases,
    weeks: lessons.map(buildWeek)
  };
})();
