import type { Exercise } from "./types/database";

export const SEED_EXERCISES: Exercise[] = [
  // ============================================================
  // PART 1: TƯƠNG TÁC XÃ HỘI (Social Interaction) — 3 phút
  // Trả lời câu hỏi về 2 chủ đề quen thuộc (3 câu hỏi / chủ đề)
  // ============================================================
  {
    id: "vstep-part1-hobbies-hometown",
    part: 1,
    title: "Chủ đề 1: Free Time & Hometown",
    prompt: "Part 1: Social Interaction (3 minutes). In this part, you are asked questions about 2 familiar topics. Answer all questions directly, fluently, and naturally.",
    reference_text: "In my free time, I really enjoy reading personal development books and playing badminton with my friends. On weekends, I definitely prefer going outdoors because it helps me recharge my energy after a stressful week of studying. As for my hometown, I was born in Da Nang, a coastal city in central Vietnam. What I love most is the peaceful atmosphere and the fresh seafood. In recent years, my hometown has developed rapidly with modern bridges and higher living standards.",
    difficulty: 2,
    is_active: true,
    prep_time_seconds: 0,
    speaking_time_seconds: 180,
    part1_topics: [
      {
        title: "Topic 1: Free Time & Weekends",
        questions: [
          "What do you usually like doing in your free time?",
          "Do you prefer spending your weekends at home or going out? Why?",
          "How much time do you think people should spend relaxing every day?",
        ],
      },
      {
        title: "Topic 2: Your Hometown",
        questions: [
          "Where is your hometown located?",
          "What do you like most about living in or visiting your hometown?",
          "How has your hometown changed over the past five years?",
        ],
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "vstep-part1-family-sports",
    part: 1,
    title: "Chủ đề 2: Family & Physical Exercise",
    prompt: "Part 1: Social Interaction (3 minutes). You will answer questions about Family and Physical Exercise. Keep your speech natural and expressive.",
    reference_text: "My family has four members: my parents, my younger sister, and me. We love gathering for dinner every evening to share stories about our day. In terms of sports, I try to go jogging around the park three times a week. Jogging helps me stay fit, clear my mind, and maintain good cardiovascular health.",
    difficulty: 2,
    is_active: true,
    prep_time_seconds: 0,
    speaking_time_seconds: 180,
    part1_topics: [
      {
        title: "Topic 1: Family Life",
        questions: [
          "How many people are there in your family?",
          "What activity do you enjoy doing together with your family members?",
          "Who in your family are you closest to, and why?",
        ],
      },
      {
        title: "Topic 2: Sports & Keeping Fit",
        questions: [
          "What kinds of physical exercise or sports do you play?",
          "How often do you exercise during the week?",
          "Why is physical health important for students and office workers?",
        ],
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "vstep-part1-technology-food",
    part: 1,
    title: "Chủ đề 3: Technology Habits & Food Culture",
    prompt: "Part 1: Social Interaction (3 minutes). Answer questions regarding Daily Technology and Vietnamese Food culture.",
    reference_text: "I use my smartphone mostly for studying online and communicating with my classmates. However, I try to limit screen time before going to sleep. When it comes to food, Vietnamese cuisine is renowned for its harmony of fresh herbs and light broths. My favorite dish is traditional Beef Pho with plenty of herbs and lemon.",
    difficulty: 3,
    is_active: true,
    prep_time_seconds: 0,
    speaking_time_seconds: 180,
    part1_topics: [
      {
        title: "Topic 1: Everyday Technology",
        questions: [
          "What digital device do you use most frequently every day?",
          "What do you mainly use the Internet for?",
          "Do you think people spend too much time on smartphones nowadays?",
        ],
      },
      {
        title: "Topic 2: Food & Eating Habits",
        questions: [
          "What is your favorite Vietnamese dish, and why?",
          "Do you prefer eating at home or dining out at restaurants?",
          "Is fast food becoming more popular among young people in Vietnam?",
        ],
      },
    ],
    created_at: new Date().toISOString(),
  },

  // ============================================================
  // PART 2: THẢO LUẬN GIẢI PHÁP (Solution Discussion) — 4 phút
  // 1 phút chuẩn bị, 3 phút nói.
  // 1 tình huống + 3 phương án. Chọn 1 tối ưu, bảo vệ & phản biện 2 cái còn lại.
  // ============================================================
  {
    id: "vstep-part2-graduation-gift",
    part: 2,
    title: "Tình huống 1: Món quà tốt nghiệp đại học",
    prompt: "Part 2: Solution Discussion (4 minutes: 1 min prep, 3 mins speaking).\nSituation: Your younger sister is graduating from university next month, and you want to give her a meaningful graduation gift. Three options are suggested: (1) A new laptop, (2) A vacation trip to Da Nang, (3) An English communication course.\nWhich option do you think is the best choice? Explain your choice and explain why you reject the other two options.",
    reference_text: "Given the situation where my younger sister is graduating from university, I believe an English communication course is the most beneficial choice. First and foremost, as a fresh graduate entering the competitive job market, mastering fluent English will significantly boost her career prospects and open doors to multinational companies. While a new laptop is undoubtedly useful, she likely already owns a functional computer from her university studies, making a new one an unnecessary financial burden. Regarding the vacation trip to Da Nang, while it offers pleasant relaxation, the enjoyment is only short-lived. In contrast, language skills are a long-term investment that will benefit her entire professional life. Therefore, I strongly advocate for the English communication course.",
    difficulty: 3,
    is_active: true,
    prep_time_seconds: 60,
    speaking_time_seconds: 180,
    part2_situation: "Your younger sister is graduating from university next month, and you want to give her a meaningful graduation gift to support her future. Three options are suggested: A new laptop, A vacation trip to Da Nang, or An English communication course.",
    part2_options: [
      "Option A: A new laptop (Một chiếc máy tính xách tay mới)",
      "Option B: A vacation trip to Da Nang (Một chuyến du lịch nghỉ dưỡng tại Đà Nẵng)",
      "Option C: An English communication course (Một khóa học tiếng Anh giao tiếp chuyên nghiệp)",
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "vstep-part2-part-time-job",
    part: 2,
    title: "Tình huống 2: Lựa chọn việc làm thêm cho sinh viên",
    prompt: "Part 2: Solution Discussion (4 minutes: 1 min prep, 3 mins speaking).\nSituation: A first-year university student wants to find a part-time job to earn extra money and gain experience. Three options are available: (1) Working as a waiter/waitress at a coffee shop, (2) Working as a private tutor for elementary school pupils, (3) Doing online marketing from home.\nWhich option would you recommend? Justify your recommendation and state why the other two options are less suitable.",
    reference_text: "If I were in this position, I would strongly advise the freshman to choose working as a private tutor. Firstly, tutoring offers flexible working hours that can easily fit around a demanding university schedule. Secondly, it provides a much higher hourly rate compared to other entry-level student jobs, while sharpening communication and patience skills. On the other hand, working as a coffee shop barista or waitress can be physically exhausting and often requires late night shifts that disrupt morning lectures. Online marketing, though convenient, often requires existing technical expertise and carries a risk of unreliable payment for beginners. For these reasons, tutoring remains the superior option.",
    difficulty: 3,
    is_active: true,
    prep_time_seconds: 60,
    speaking_time_seconds: 180,
    part2_situation: "A first-year university student wants to find a part-time job to earn pocket money and develop practical skills. Three options are available: Waiting tables at a coffee shop, Working as a private tutor for elementary pupils, or Doing freelance online marketing from home.",
    part2_options: [
      "Option A: Waiter / Waitress at a coffee shop (Phục vụ quán cà phê)",
      "Option B: Private tutor for elementary pupils (Gia sư dạy kèm học sinh tiểu học)",
      "Option C: Freelance online marketing from home (Làm tiếp thị trực tuyến tại nhà)",
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "vstep-part2-club-activity",
    part: 2,
    title: "Tình huống 3: Hoạt động cuối tuần của câu lạc bộ",
    prompt: "Part 2: Solution Discussion (4 minutes: 1 min prep, 3 mins speaking).\nSituation: Your English club is organizing a team-building weekend for 30 members. Three options have been proposed: (1) A picnic in an eco-park, (2) A charity visit to a local orphanage, (3) A karaoke and board-game party.\nWhich option is the most suitable? Explain your choice and explain why you do not choose the other two.",
    reference_text: "Among the three proposals for our 30-member English club, I firmly believe that organizing a picnic in an eco-park is the ideal choice. An outdoor picnic provides a spacious and natural environment where all members can participate in large-scale team-building games, practice English conversations, and build lasting friendships. Meanwhile, a karaoke and board-game party would be too noisy and chaotic for meaningful English practice, and the indoor venue would be cramped for 30 people. Visiting a local orphanage is a noble and heartfelt activity, but it requires thorough psychological preparation and fundraising rather than serving as an informal team-bonding event. Therefore, the eco-park picnic is the most balanced and engaging option.",
    difficulty: 3,
    is_active: true,
    prep_time_seconds: 60,
    speaking_time_seconds: 180,
    part2_situation: "Your university English club is planning a weekend team-building activity for 30 members. Three ideas are proposed: A picnic in an eco-park, A charity visit to an orphanage, or A karaoke and indoor games party.",
    part2_options: [
      "Option A: A picnic in an eco-park (Dã ngoại tại công viên sinh thái)",
      "Option B: A charity visit to a local orphanage (Chuyến đi từ thiện tại trại trẻ mồ côi)",
      "Option C: A karaoke & indoor games party (Tiệc karaoke và trò chơi bàn cờ trong nhà)",
    ],
    created_at: new Date().toISOString(),
  },

  // ============================================================
  // PART 3: PHÁT TRIỂN ĐỀ TÀI (Topic Development) — 5 phút
  // 1 phút chuẩn bị, 3-4 phút nói.
  // Chủ đề học thuật + Sơ đồ tư duy (Mindmap với 3 gợi ý + own idea) + Câu hỏi mở rộng.
  // ============================================================
  {
    id: "vstep-part3-reading-benefits",
    part: 3,
    title: "Đề tài 1: Lợi ích của việc đọc sách (Reading Books)",
    prompt: "Part 3: Topic Development (5 minutes: 1 min prep, 4 mins speaking).\nTopic: Reading books provides tremendous benefits to young people.\nUse the mindmap suggestions and your own ideas to deliver a structured speech. Afterwards, answer the follow-up questions.",
    reference_text: "It is widely acknowledged that reading books brings immense intellectual and emotional benefits to young people. First of all, regular reading dramatically enriches vocabulary and deepens academic knowledge across diverse disciplines. Secondly, reading enhances cognitive focus and provides a calming retreat from the digital distractions of social media. Furthermore, immersing oneself in literature stimulates creative imagination and empathy by exposing readers to various cultures and life perspectives. In addition to these points, I would like to emphasize that reading fosters critical thinking, helping students discern credible facts from fake information online.\n\nRegarding the follow-up question, I do not believe e-books will completely replace physical books. While e-books provide remarkable convenience, physical books deliver a tactile experience that screens cannot replicate.",
    difficulty: 4,
    is_active: true,
    prep_time_seconds: 60,
    speaking_time_seconds: 240,
    part3_mindmap: {
      central_topic: "Benefits of Reading Books for Young People",
      ideas: [
        "Expanding knowledge & vocabulary (Mở rộng vốn từ & tri thức)",
        "Improving focus & reducing stress (Tăng khả năng tập trung & xả stress)",
        "Stimulating imagination & empathy (Kích thích trí tưởng tượng & sự thấu cảm)",
      ],
      own_idea_prompt: "Your own idea (Ý kiến sáng tạo của riêng bạn)",
    },
    part3_follow_up_questions: [
      "Do you think digital e-books will eventually replace printed paper books completely? Why or why not?",
      "What concrete measures can schools and parents take to cultivate a reading habit in children?",
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "vstep-part3-remote-working",
    part: 3,
    title: "Đề tài 2: Làm việc từ xa (Remote Working)",
    prompt: "Part 3: Topic Development (5 minutes: 1 min prep, 4 mins speaking).\nTopic: Working from home (remote work) has become increasingly prevalent in the modern economy.\nDeliver a comprehensive presentation using the mindmap nodes and answer the follow-up questions.",
    reference_text: "In recent years, remote working has emerged as a revolutionary trend reshaping the global workforce. One of the clearest advantages is the elimination of daily commuting, which saves countless hours and reduces transportation costs and carbon emissions. In addition, working from home provides workers with flexible scheduling, enabling a healthier work-life balance. Employers also benefit by reducing office rental and utility expenditures. Nevertheless, we must recognize that remote work can cause feelings of social isolation and blurred boundaries between professional duties and private life.\n\nAnswering the follow-up question, I believe hybrid working—splitting the week between office and home—is the optimal model for long-term productivity and employee wellbeing.",
    difficulty: 4,
    is_active: true,
    prep_time_seconds: 60,
    speaking_time_seconds: 240,
    part3_mindmap: {
      central_topic: "The Rise and Impact of Remote Working (Làm việc từ xa)",
      ideas: [
        "Saving commuting time & travel expenses (Tiết kiệm thời gian & chi phí di chuyển)",
        "Flexible schedule & work-life balance (Linh hoạt thời gian, cân bằng cuộc sống)",
        "Lower overhead costs for companies (Giảm thiểu chi phí mặt bằng cho doanh nghiệp)",
      ],
      own_idea_prompt: "Your own idea (Ý kiến sáng tạo của riêng bạn)",
    },
    part3_follow_up_questions: [
      "What are the major psychological drawbacks that remote workers might face?",
      "Which industries are most and least suitable for a permanent remote work model?",
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "vstep-part3-social-media",
    part: 3,
    title: "Đề tài 3: Ảnh hưởng của mạng xã hội (Social Media)",
    prompt: "Part 3: Topic Development (5 minutes: 1 min prep, 4 mins speaking).\nTopic: Social media has transformed human communication and society.\nAnalyze the positive and negative facets using the mindmap and address the examiner's follow-up questions.",
    reference_text: "Social media has undeniably redefined how human beings interact in the 21st century. On the positive side, platforms like Facebook, LinkedIn, and Instagram allow instant global connectivity, enabling families and colleagues to maintain touch across continents. Furthermore, social networks democratize information dissemination and provide unprecedented business marketing avenues for small enterprises. However, the darker side cannot be overlooked: excessive usage is strongly linked to mental health concerns such as anxiety, cyberbullying, and sleep deprivation among adolescents.\n\nIn response to the follow-up inquiry, governments and tech giants must enforce stricter age verification and promote digital literacy curricula in schools.",
    difficulty: 5,
    is_active: true,
    prep_time_seconds: 60,
    speaking_time_seconds: 240,
    part3_mindmap: {
      central_topic: "Impact of Social Media on Modern Society (Tác động của Mạng xã hội)",
      ideas: [
        "Instant global communication (Kết nối toàn cầu tức thì)",
        "Powerful marketing & educational sharing (Kênh học tập & quảng bá kinh doanh)",
        "Risks of cyberbullying & digital addiction (Nguy cơ nghiện mạng & bắt nạt online)",
      ],
      own_idea_prompt: "Your own idea (Ý kiến sáng tạo của riêng bạn)",
    },
    part3_follow_up_questions: [
      "Should social media platforms be held legally responsible for fake news published by users?",
      "At what age do you think children should be permitted to create personal social media accounts?",
    ],
    created_at: new Date().toISOString(),
  },
];
