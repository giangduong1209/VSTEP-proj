-- VSTEP Speaking App — Seed Exercises
-- Run this AFTER 001_initial_schema.sql in Supabase SQL Editor
-- This inserts sample exercises for all 3 parts

-- ============================================================
-- Part 1: Hỏi đáp (Short Q&A) — 5 exercises
-- ============================================================
INSERT INTO public.exercises (part, title, prompt, reference_text, difficulty) VALUES
(1, 'Self Introduction', 
 'Please introduce yourself. What is your name, where are you from, and what do you do?',
 'My name is [Name]. I am from [City], Vietnam. I am a student at [University] and I am studying [Major].',
 1),

(1, 'Daily Routine',
 'Can you describe your daily routine? What do you usually do in the morning?',
 'I usually wake up at 7 in the morning. First, I brush my teeth and wash my face. Then I have breakfast, usually rice or bread with eggs. After that, I go to school by bus.',
 1),

(1, 'Favorite Food',
 'What is your favorite food? Can you describe it and explain why you like it?',
 'My favorite food is pho, which is a traditional Vietnamese noodle soup. It has rice noodles in a flavorful beef broth with herbs and spices. I like it because it is delicious and reminds me of home.',
 2),

(1, 'Hobbies',
 'What are your hobbies? How often do you do them?',
 'My main hobbies are reading books and playing badminton. I usually read for about one hour every evening before bed. I play badminton with my friends twice a week at the park near my house.',
 2),

(1, 'Weather',
 'How is the weather in your hometown? Which season do you like best and why?',
 'The weather in my hometown is quite hot and humid in summer, but cool and pleasant in winter. I prefer autumn because the temperature is comfortable and the scenery is beautiful with falling leaves.',
 2);

-- ============================================================
-- Part 2: Trình bày chủ đề (Topic Presentation) — 5 exercises
-- ============================================================
INSERT INTO public.exercises (part, title, prompt, reference_text, difficulty) VALUES
(2, 'Describe Your Hometown',
 'Describe your hometown. You should say: where it is located, what it is famous for, what you like most about it, and how it has changed over the years. You have 1 minute to prepare and 2 minutes to speak.',
 'My hometown is Da Nang, a beautiful coastal city in central Vietnam. It is located along the coast of the South China Sea. Da Nang is famous for its beautiful beaches, especially My Khe Beach, and the Dragon Bridge. What I like most about my hometown is the friendly people and the delicious local food, especially seafood. Over the past ten years, Da Nang has changed a lot. Many new buildings and bridges have been built, and it has become a popular tourist destination for both Vietnamese and international visitors.',
 2),

(2, 'Technology in Education',
 'Talk about the role of technology in education. You should say: how technology is used in schools today, what advantages it brings, what disadvantages it may have, and what you think about the future of technology in education.',
 'Technology plays an important role in education today. In many schools, students use computers and tablets for learning. Teachers use projectors and online platforms to deliver their lessons. The main advantage of technology in education is that it makes learning more interactive and accessible. Students can access information from anywhere and learn at their own pace. However, there are some disadvantages. Students may become distracted by social media and games. Also, not all students have access to technology at home. In the future, I believe technology will continue to transform education with tools like artificial intelligence and virtual reality.',
 3),

(2, 'A Memorable Trip',
 'Describe a memorable trip you have taken. You should say: where you went, who you went with, what you did there, and why it was memorable.',
 'Last summer, I went on a trip to Hoi An with my family. We stayed for three days and two nights. We visited the ancient town, which is a UNESCO World Heritage Site. We walked along the beautiful streets with old houses and colorful lanterns. We also visited the Japanese Bridge and several traditional craft workshops. The most memorable part was taking a boat ride on the Thu Bon River at night. The river was lit up with hundreds of floating lanterns, and it was absolutely magical. This trip was memorable because it was the first time our whole family traveled together in years.',
 3),

(2, 'Environmental Protection',
 'Talk about environmental protection. You should say: what environmental problems exist in your area, what people are doing to help, what you personally do to protect the environment, and what more should be done.',
 'There are several environmental problems in my area, including air pollution from traffic, plastic waste in rivers, and deforestation. Many people and organizations are working to address these issues. The local government has planted more trees and built more parks. Some volunteer groups regularly clean up beaches and rivers. Personally, I try to reduce plastic waste by using a reusable water bottle and shopping bags. I also separate my garbage for recycling. I think more should be done, such as stricter laws against pollution, better public transportation, and more environmental education in schools.',
 4),

(2, 'Your Dream Job',
 'Describe your dream job. You should say: what the job is, what skills or qualifications are needed, why you want this job, and how you plan to achieve this goal.',
 'My dream job is to become a software engineer at a technology company. To do this job, I need strong programming skills, especially in languages like Python and JavaScript. I also need good problem-solving abilities and teamwork skills. I want this job because I am passionate about technology and I enjoy creating applications that can help people. I plan to achieve this goal by studying hard at university, doing internships at tech companies, and building my own projects to gain practical experience.',
 3);

-- ============================================================
-- Part 3: Thảo luận (Discussion) — 5 exercises
-- ============================================================
INSERT INTO public.exercises (part, title, prompt, reference_text, difficulty) VALUES
(3, 'Online vs Traditional Learning',
 'Some people prefer online learning while others prefer traditional classroom learning. Discuss the advantages and disadvantages of both methods. Which do you think is more effective and why?',
 'Both online learning and traditional classroom learning have their own advantages and disadvantages. Online learning offers flexibility, allowing students to study at their own pace and from any location. It also provides access to a wide range of resources and courses. However, online learning can lead to feelings of isolation and requires strong self-discipline. Traditional classroom learning, on the other hand, provides face-to-face interaction with teachers and peers, which can enhance understanding and motivation. However, it requires students to follow a fixed schedule and commute to school. In my opinion, a combination of both methods would be most effective, as it can leverage the strengths of each approach.',
 3),

(3, 'Social Media Impact',
 'Social media has become an important part of daily life, especially for young people. Discuss the positive and negative effects of social media on young people. What solutions would you suggest to minimize the negative effects?',
 'Social media has both positive and negative effects on young people. On the positive side, it helps people stay connected with friends and family, provides entertainment, and can be a platform for sharing ideas and creativity. It also offers educational content and news updates. On the negative side, excessive use of social media can lead to addiction, cyberbullying, and mental health issues such as anxiety and depression. It can also reduce face-to-face communication skills and lead to misinformation. To minimize the negative effects, I would suggest setting time limits for social media use, educating young people about online safety, and encouraging more offline activities and real-world social interactions.',
 4),

(3, 'Urbanization',
 'Many people are moving from rural areas to cities. Discuss the reasons for this trend and its effects on both rural and urban areas. What should the government do to address the challenges of urbanization?',
 'There are several reasons why people move from rural areas to cities. The main reasons include better job opportunities, higher salaries, better education and healthcare facilities, and more entertainment options. However, urbanization has significant effects on both areas. In cities, it leads to overcrowding, traffic congestion, pollution, and housing shortages. In rural areas, it causes a decline in the workforce, abandoned farmland, and a loss of traditional culture. The government should address these challenges by developing infrastructure in rural areas, creating job opportunities outside major cities, improving public transportation in urban areas, and implementing sustainable urban planning policies.',
 4),

(3, 'Work-Life Balance',
 'Many working people today find it difficult to maintain a good work-life balance. Discuss the causes of this problem and suggest solutions for both employers and employees.',
 'There are several causes of poor work-life balance. Many companies expect employees to work long hours and be available outside office hours through email and messaging apps. The high cost of living in cities forces people to take on more work. Additionally, the competitive job market creates pressure to perform. For employers, solutions include offering flexible working hours, remote work options, and encouraging employees to take their vacation days. They should also avoid contacting employees outside working hours. For employees, solutions include setting clear boundaries between work and personal time, prioritizing tasks, learning to say no to excessive workload, and making time for exercise, hobbies, and family.',
 5),

(3, 'Tourism Development',
 'Tourism brings many benefits to a country, but it can also cause problems. Discuss the advantages and disadvantages of tourism development and suggest ways to develop tourism sustainably.',
 'Tourism brings several advantages to a country. It creates jobs, generates income, and promotes cultural exchange. It also encourages the preservation of historical sites and natural areas. However, tourism can also cause problems such as environmental damage, overcrowding in popular destinations, increased cost of living for local residents, and the loss of local culture. To develop tourism sustainably, we should promote eco-tourism and responsible travel practices. The government should implement regulations to protect the environment and local communities. Tour operators should educate tourists about respecting local customs and the environment. Revenue from tourism should be reinvested in conservation and community development.',
 5);
