-- VSTEP Speaking App — Official Standard Seed Exercises
-- Run this in Supabase SQL Editor
-- Part 1: Tương tác xã hội (3 phút - 2 chủ đề)
-- Part 2: Thảo luận giải pháp (4 phút - 1p chuẩn bị, 3p nói: Tình huống & 3 lựa chọn)
-- Part 3: Phát triển đề tài (5 phút - 1p chuẩn bị, 4p nói: Sơ đồ tư duy & câu hỏi mở rộng)

DELETE FROM public.exercises;

-- ============================================================
-- Part 1: Tương tác xã hội (Social Interaction) — 3 phút
-- ============================================================
INSERT INTO public.exercises (part, title, prompt, reference_text, difficulty) VALUES
(1, 'Chủ đề 1: Free Time & Hometown',
 'Part 1: Social Interaction (3 minutes). You are asked questions about 2 familiar topics: Free Time & Weekends, and Your Hometown. Answer all questions directly, fluently, and naturally.',
 'In my free time, I really enjoy reading personal development books and playing badminton with my friends. On weekends, I definitely prefer going outdoors because it helps me recharge my energy after a stressful week of studying. As for my hometown, I was born in Da Nang, a coastal city in central Vietnam. What I love most is the peaceful atmosphere and the fresh seafood. In recent years, my hometown has developed rapidly with modern bridges and higher living standards.',
 2),

(1, 'Chủ đề 2: Family & Physical Exercise',
 'Part 1: Social Interaction (3 minutes). Answer questions regarding Family Life and Sports / Keeping Fit. Maintain a confident tone and natural pace.',
 'My family has four members: my parents, my younger sister, and me. We love gathering for dinner every evening to share stories about our day. In terms of sports, I try to go jogging around the park three times a week. Jogging helps me stay fit, clear my mind, and maintain good cardiovascular health.',
 2),

(1, 'Chủ đề 3: Everyday Technology & Food Culture',
 'Part 1: Social Interaction (3 minutes). Answer questions on Daily Technology Habits and Vietnamese Food Culture.',
 'I use my smartphone mostly for studying online and communicating with my classmates. However, I try to limit screen time before going to sleep. When it comes to food, Vietnamese cuisine is renowned for its harmony of fresh herbs and light broths. My favorite dish is traditional Beef Pho with plenty of herbs and lemon.',
 3);

-- ============================================================
-- Part 2: Thảo luận giải pháp (Solution Discussion) — 4 phút
-- ============================================================
INSERT INTO public.exercises (part, title, prompt, reference_text, difficulty) VALUES
(2, 'Tình huống 1: Món quà tốt nghiệp đại học',
 'Part 2: Solution Discussion (4 minutes: 1 min prep, 3 mins speaking).\nSituation: Your younger sister is graduating from university next month, and you want to give her a meaningful graduation gift. Three options are suggested: (1) A new laptop, (2) A vacation trip to Da Nang, (3) An English communication course.\nWhich option do you think is the best choice? Explain your choice and explain why you reject the other two options.',
 'Given the situation where my younger sister is graduating from university, I believe an English communication course is the most beneficial choice. First and foremost, as a fresh graduate entering the competitive job market, mastering fluent English will significantly boost her career prospects and open doors to multinational companies. While a new laptop is undoubtedly useful, she likely already owns a functional computer from her university studies, making a new one an unnecessary financial burden. Regarding the vacation trip to Da Nang, while it offers pleasant relaxation, the enjoyment is only short-lived. In contrast, language skills are a long-term investment that will benefit her entire professional life. Therefore, I strongly advocate for the English communication course.',
 3),

(2, 'Tình huống 2: Việc làm thêm cho sinh viên',
 'Part 2: Solution Discussion (4 minutes: 1 min prep, 3 mins speaking).\nSituation: A first-year university student wants to find a part-time job to earn extra money and gain experience. Three options are available: (1) Working as a waiter/waitress at a coffee shop, (2) Working as a private tutor for elementary school pupils, (3) Doing online marketing from home.\nWhich option would you recommend? Justify your recommendation and state why the other two options are less suitable.',
 'If I were in this position, I would strongly advise the freshman to choose working as a private tutor. Firstly, tutoring offers flexible working hours that can easily fit around a demanding university schedule. Secondly, it provides a much higher hourly rate compared to other entry-level student jobs, while sharpening communication and patience skills. On the other hand, working as a coffee shop barista or waitress can be physically exhausting and often requires late night shifts that disrupt morning lectures. Online marketing, though convenient, often requires existing technical expertise and carries a risk of unreliable payment for beginners. For these reasons, tutoring remains the superior option.',
 3),

(2, 'Tình huống 3: Hoạt động cuối tuần của câu lạc bộ',
 'Part 2: Solution Discussion (4 minutes: 1 min prep, 3 mins speaking).\nSituation: Your English club is organizing a team-building weekend for 30 members. Three options have been proposed: (1) A picnic in an eco-park, (2) A charity visit to a local orphanage, (3) A karaoke and board-game party.\nWhich option is the most suitable? Explain your choice and explain why you do not choose the other two.',
 'Among the three proposals for our 30-member English club, I firmly believe that organizing a picnic in an eco-park is the ideal choice. An outdoor picnic provides a spacious and natural environment where all members can participate in large-scale team-building games, practice English conversations, and build lasting friendships. Meanwhile, a karaoke and board-game party would be too noisy and chaotic for meaningful English practice, and the indoor venue would be cramped for 30 people. Visiting a local orphanage is a noble and heartfelt activity, but it requires thorough psychological preparation and fundraising rather than serving as an informal team-bonding event. Therefore, the eco-park picnic is the most balanced and engaging option.',
 3);

-- ============================================================
-- Part 3: Phát triển đề tài (Topic Development) — 5 phút
-- ============================================================
INSERT INTO public.exercises (part, title, prompt, reference_text, difficulty) VALUES
(3, 'Đề tài 1: Lợi ích của việc đọc sách',
 'Part 3: Topic Development (5 minutes: 1 min prep, 4 mins speaking).\nTopic: Reading books provides tremendous benefits to young people.\nUse the mindmap suggestions (expanding vocabulary, reducing stress, stimulating imagination) and your own ideas to deliver a structured speech. Afterwards, answer the follow-up questions.',
 'It is widely acknowledged that reading books brings immense intellectual and emotional benefits to young people. First of all, regular reading dramatically enriches vocabulary and deepens academic knowledge across diverse disciplines. Secondly, reading enhances cognitive focus and provides a calming retreat from the digital distractions of social media. Furthermore, immersing oneself in literature stimulates creative imagination and empathy by exposing readers to various cultures and life perspectives. In addition to these points, I would like to emphasize that reading fosters critical thinking, helping students discern credible facts from fake information online.\n\nRegarding the follow-up question, I do not believe e-books will completely replace physical books. While e-books provide remarkable convenience, physical books deliver a tactile experience that screens cannot replicate.',
 4),

(3, 'Đề tài 2: Làm việc từ xa (Remote Working)',
 'Part 3: Topic Development (5 minutes: 1 min prep, 4 mins speaking).\nTopic: Working from home (remote work) has become increasingly prevalent in the modern economy.\nDeliver a comprehensive presentation using the mindmap nodes (saving commute, flexible schedule, lower overhead) and answer the follow-up questions.',
 'In recent years, remote working has emerged as a revolutionary trend reshaping the global workforce. One of the clearest advantages is the elimination of daily commuting, which saves countless hours and reduces transportation costs and carbon emissions. In addition, working from home provides workers with flexible scheduling, enabling a healthier work-life balance. Employers also benefit by reducing office rental and utility expenditures. Nevertheless, we must recognize that remote work can cause feelings of social isolation and blurred boundaries between professional duties and private life.\n\nAnswering the follow-up question, I believe hybrid working—splitting the week between office and home—is the optimal model for long-term productivity and employee wellbeing.',
 4),

(3, 'Đề tài 3: Ảnh hưởng của mạng xã hội (Social Media)',
 'Part 3: Topic Development (5 minutes: 1 min prep, 4 mins speaking).\nTopic: Social media has transformed human communication and society.\nAnalyze the positive and negative facets using the mindmap nodes and address the examiner follow-up questions.',
 'Social media has undeniably redefined how human beings interact in the 21st century. On the positive side, platforms like Facebook, LinkedIn, and Instagram allow instant global connectivity, enabling families and colleagues to maintain touch across continents. Furthermore, social networks democratize information dissemination and provide unprecedented business marketing avenues for small enterprises. However, the darker side cannot be overlooked: excessive usage is strongly linked to mental health concerns such as anxiety, cyberbullying, and sleep deprivation among adolescents.\n\nIn response to the follow-up inquiry, governments and tech giants must enforce stricter age verification and promote digital literacy curricula in schools.',
 5);
