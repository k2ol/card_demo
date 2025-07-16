// Local word library organized by grade levels
export class WordLibrary {
  static wordDatabase = {
    elementary: [
      { english: 'cat', chinese: '猫', pronunciation: '/kæt/', example: 'The cat is sleeping on the sofa.' },
      { english: 'dog', chinese: '狗', pronunciation: '/dɔːɡ/', example: 'My dog likes to play in the park.' },
      { english: 'book', chinese: '书', pronunciation: '/bʊk/', example: 'I read a book every night.' },
      { english: 'apple', chinese: '苹果', pronunciation: '/ˈæpl/', example: 'An apple a day keeps the doctor away.' },
      { english: 'water', chinese: '水', pronunciation: '/ˈwɔːtər/', example: 'Please drink more water.' },
      { english: 'house', chinese: '房子', pronunciation: '/haʊs/', example: 'We live in a big house.' },
      { english: 'happy', chinese: '快乐的', pronunciation: '/ˈhæpi/', example: 'She feels happy today.' },
      { english: 'run', chinese: '跑', pronunciation: '/rʌn/', example: 'Children run in the playground.' },
      { english: 'blue', chinese: '蓝色的', pronunciation: '/bluː/', example: 'The sky is blue today.' },
      { english: 'big', chinese: '大的', pronunciation: '/bɪɡ/', example: 'The elephant is very big.' },
      { english: 'small', chinese: '小的', pronunciation: '/smɔːl/', example: 'The mouse is small.' },
      { english: 'red', chinese: '红色的', pronunciation: '/red/', example: 'She wears a red dress.' },
      { english: 'green', chinese: '绿色的', pronunciation: '/ɡriːn/', example: 'The grass is green.' },
      { english: 'eat', chinese: '吃', pronunciation: '/iːt/', example: 'We eat dinner at 6 PM.' },
      { english: 'sleep', chinese: '睡觉', pronunciation: '/sliːp/', example: 'Babies sleep a lot.' },
      { english: 'play', chinese: '玩', pronunciation: '/pleɪ/', example: 'Let\'s play games together.' },
      { english: 'school', chinese: '学校', pronunciation: '/skuːl/', example: 'I go to school every day.' },
      { english: 'friend', chinese: '朋友', pronunciation: '/frend/', example: 'She is my best friend.' },
      { english: 'family', chinese: '家庭', pronunciation: '/ˈfæməli/', example: 'I love my family.' },
      { english: 'love', chinese: '爱', pronunciation: '/lʌv/', example: 'I love reading books.' }
    ],
    middle: [
      { english: 'adventure', chinese: '冒险', pronunciation: '/ədˈventʃər/', example: 'Reading is an adventure for the mind.' },
      { english: 'challenge', chinese: '挑战', pronunciation: '/ˈtʃælɪndʒ/', example: 'Learning a new language is a challenge.' },
      { english: 'discover', chinese: '发现', pronunciation: '/dɪˈskʌvər/', example: 'Scientists discover new things every day.' },
      { english: 'environment', chinese: '环境', pronunciation: '/ɪnˈvaɪrənmənt/', example: 'We must protect our environment.' },
      { english: 'experience', chinese: '经验', pronunciation: '/ɪkˈspɪriəns/', example: 'Travel gives you valuable experience.' },
      { english: 'imagination', chinese: '想象力', pronunciation: '/ɪˌmædʒɪˈneɪʃn/', example: 'Children have great imagination.' },
      { english: 'knowledge', chinese: '知识', pronunciation: '/ˈnɑːlɪdʒ/', example: 'Knowledge is power.' },
      { english: 'opportunity', chinese: '机会', pronunciation: '/ˌɑːpərˈtuːnəti/', example: 'Education provides many opportunities.' },
      { english: 'responsibility', chinese: '责任', pronunciation: '/rɪˌspɑːnsəˈbɪləti/', example: 'We have a responsibility to help others.' },
      { english: 'technology', chinese: '技术', pronunciation: '/tekˈnɑːlədʒi/', example: 'Technology changes our daily life.' },
      { english: 'communicate', chinese: '交流', pronunciation: '/kəˈmjuːnɪkeɪt/', example: 'We communicate through various methods.' },
      { english: 'creative', chinese: '创造性的', pronunciation: '/kriˈeɪtɪv/', example: 'Art class helps students be creative.' },
      { english: 'develop', chinese: '发展', pronunciation: '/dɪˈveləp/', example: 'Students develop new skills in school.' },
      { english: 'explore', chinese: '探索', pronunciation: '/ɪkˈsplɔːr/', example: 'Let\'s explore the forest together.' },
      { english: 'independent', chinese: '独立的', pronunciation: '/ˌɪndɪˈpendənt/', example: 'Teenagers want to be independent.' },
      { english: 'organize', chinese: '组织', pronunciation: '/ˈɔːrɡənaɪz/', example: 'Please organize your study materials.' },
      { english: 'participate', chinese: '参与', pronunciation: '/pɑːrˈtɪsɪpeɪt/', example: 'Students participate in school activities.' },
      { english: 'solution', chinese: '解决方案', pronunciation: '/səˈluːʃn/', example: 'We need to find a solution to this problem.' },
      { english: 'strategy', chinese: '策略', pronunciation: '/ˈstrætədʒi/', example: 'Having a study strategy is important.' },
      { english: 'volunteer', chinese: '志愿者', pronunciation: '/ˌvɑːlənˈtɪr/', example: 'Many students volunteer in their community.' }
    ],
    high: [
      { english: 'analyze', chinese: '分析', pronunciation: '/ˈænəlaɪz/', example: 'Students must analyze the data carefully.' },
      { english: 'comprehensive', chinese: '全面的', pronunciation: '/ˌkɑːmprɪˈhensɪv/', example: 'The report provides a comprehensive overview.' },
      { english: 'demonstrate', chinese: '证明', pronunciation: '/ˈdemənstreɪt/', example: 'The experiment demonstrates the theory.' },
      { english: 'evaluate', chinese: '评估', pronunciation: '/ɪˈvæljueɪt/', example: 'Teachers evaluate student performance regularly.' },
      { english: 'hypothesis', chinese: '假设', pronunciation: '/haɪˈpɑːθəsɪs/', example: 'Scientists test their hypothesis through experiments.' },
      { english: 'interpret', chinese: '解释', pronunciation: '/ɪnˈtɜːrprɪt/', example: 'How do you interpret this poem?' },
      { english: 'methodology', chinese: '方法论', pronunciation: '/ˌmeθəˈdɑːlədʒi/', example: 'The research methodology was clearly explained.' },
      { english: 'perspective', chinese: '观点', pronunciation: '/pərˈspektɪv/', example: 'Everyone has a different perspective on this issue.' },
      { english: 'significant', chinese: '重要的', pronunciation: '/sɪɡˈnɪfɪkənt/', example: 'This discovery is significant for science.' },
      { english: 'synthesize', chinese: '综合', pronunciation: '/ˈsɪnθəsaɪz/', example: 'Students need to synthesize information from multiple sources.' },
      { english: 'abstract', chinese: '抽象的', pronunciation: '/ˈæbstrækt/', example: 'Philosophy deals with abstract concepts.' },
      { english: 'contemporary', chinese: '当代的', pronunciation: '/kənˈtempəreri/', example: 'We study contemporary literature in English class.' },
      { english: 'controversy', chinese: '争议', pronunciation: '/ˈkɑːntrəvɜːrsi/', example: 'The new policy caused much controversy.' },
      { english: 'elaborate', chinese: '详细说明', pronunciation: '/ɪˈlæbəreɪt/', example: 'Could you elaborate on your main points?' },
      { english: 'fundamental', chinese: '基本的', pronunciation: '/ˌfʌndəˈmentl/', example: 'Reading is a fundamental skill.' },
      { english: 'inevitable', chinese: '不可避免的', pronunciation: '/ɪnˈevɪtəbl/', example: 'Change is inevitable in life.' },
      { english: 'paradigm', chinese: '范式', pronunciation: '/ˈpærədaɪm/', example: 'The internet created a new paradigm for communication.' },
      { english: 'phenomenon', chinese: '现象', pronunciation: '/fəˈnɑːmɪnən/', example: 'Global warming is a serious phenomenon.' },
      { english: 'substantial', chinese: '大量的', pronunciation: '/səbˈstænʃl/', example: 'There was substantial evidence to support the theory.' },
      { english: 'theoretical', chinese: '理论的', pronunciation: '/ˌθiəˈretɪkl/', example: 'The course covers both practical and theoretical aspects.' }
    ],
    college: [
      { english: 'accommodate', chinese: '容纳', pronunciation: '/əˈkɑːmədeɪt/', example: 'The university can accommodate 5000 students.' },
      { english: 'arbitrary', chinese: '任意的', pronunciation: '/ˈɑːrbɪtreri/', example: 'The decision seemed arbitrary and unfair.' },
      { english: 'coherent', chinese: '连贯的', pronunciation: '/koʊˈhɪrənt/', example: 'Please write a coherent argument in your essay.' },
      { english: 'deteriorate', chinese: '恶化', pronunciation: '/dɪˈtɪriəreɪt/', example: 'Without maintenance, the building will deteriorate.' },
      { english: 'empirical', chinese: '经验的', pronunciation: '/ɪmˈpɪrɪkl/', example: 'The theory is supported by empirical evidence.' },
      { english: 'fluctuate', chinese: '波动', pronunciation: '/ˈflʌktʃueɪt/', example: 'Stock prices fluctuate throughout the day.' },
      { english: 'gregarious', chinese: '群居的', pronunciation: '/ɡrɪˈɡeriəs/', example: 'Humans are naturally gregarious creatures.' },
      { english: 'hierarchy', chinese: '等级制度', pronunciation: '/ˈhaɪərɑːrki/', example: 'The company has a clear management hierarchy.' },
      { english: 'indigenous', chinese: '本土的', pronunciation: '/ɪnˈdɪdʒənəs/', example: 'Indigenous peoples have unique cultural traditions.' },
      { english: 'juxtapose', chinese: '并列', pronunciation: '/ˈdʒʌkstəpoʊz/', example: 'The artist juxtaposed modern and classical elements.' },
      { english: 'kinetic', chinese: '动力学的', pronunciation: '/kɪˈnetɪk/', example: 'Kinetic energy increases with velocity.' },
      { english: 'lucid', chinese: '清晰的', pronunciation: '/ˈluːsɪd/', example: 'The professor gave a lucid explanation of the concept.' },
      { english: 'meticulous', chinese: '细致的', pronunciation: '/məˈtɪkjələs/', example: 'Scientific research requires meticulous attention to detail.' },
      { english: 'nuance', chinese: '细微差别', pronunciation: '/ˈnuːɑːns/', example: 'Understanding cultural nuances is important for communication.' },
      { english: 'obsolete', chinese: '过时的', pronunciation: '/ˌɑːbsəˈliːt/', example: 'Many traditional manufacturing methods are now obsolete.' },
      { english: 'pragmatic', chinese: '实用的', pronunciation: '/præɡˈmætɪk/', example: 'We need a pragmatic approach to solve this problem.' },
      { english: 'quintessential', chinese: '典型的', pronunciation: '/ˌkwɪntɪˈsenʃl/', example: 'This painting is the quintessential example of impressionism.' },
      { english: 'reciprocal', chinese: '相互的', pronunciation: '/rɪˈsɪprəkl/', example: 'Trust should be reciprocal in any relationship.' },
      { english: 'scrutinize', chinese: '仔细检查', pronunciation: '/ˈskruːtənaɪz/', example: 'Researchers scrutinize data for any inconsistencies.' },
      { english: 'tangible', chinese: '有形的', pronunciation: '/ˈtændʒəbl/', example: 'We need tangible results from this project.' }
    ],
    toefl: [
      { english: 'advocate', chinese: '提倡', pronunciation: '/ˈædvəkeɪt/', example: 'Environmental groups advocate for renewable energy.' },
      { english: 'beneficial', chinese: '有益的', pronunciation: '/ˌbenɪˈfɪʃl/', example: 'Regular exercise is beneficial for health.' },
      { english: 'constitute', chinese: '构成', pronunciation: '/ˈkɑːnstɪtuːt/', example: 'These elements constitute the basic framework.' },
      { english: 'diverse', chinese: '多样的', pronunciation: '/daɪˈvɜːrs/', example: 'The university has a diverse student population.' },
      { english: 'enhance', chinese: '增强', pronunciation: '/ɪnˈhæns/', example: 'Technology can enhance the learning experience.' },
      { english: 'facilitate', chinese: '促进', pronunciation: '/fəˈsɪlɪteɪt/', example: 'Good communication facilitates teamwork.' },
      { english: 'generate', chinese: '产生', pronunciation: '/ˈdʒenəreɪt/', example: 'Solar panels generate clean electricity.' },
      { english: 'hypothesis', chinese: '假设', pronunciation: '/haɪˈpɑːθəsɪs/', example: 'The scientist proposed a new hypothesis.' },
      { english: 'implement', chinese: '实施', pronunciation: '/ˈɪmplɪment/', example: 'The school will implement new policies next year.' },
      { english: 'justify', chinese: '证明合理', pronunciation: '/ˈdʒʌstɪfaɪ/', example: 'Can you justify your decision?' },
      { english: 'maintain', chinese: '维持', pronunciation: '/meɪnˈteɪn/', example: 'It\'s important to maintain a healthy lifestyle.' },
      { english: 'obtain', chinese: '获得', pronunciation: '/əbˈteɪn/', example: 'Students must obtain permission before leaving campus.' },
      { english: 'persist', chinese: '坚持', pronunciation: '/pərˈsɪst/', example: 'If you persist, you will eventually succeed.' },
      { english: 'require', chinese: '需要', pronunciation: '/rɪˈkwaɪər/', example: 'This job requires excellent communication skills.' },
      { english: 'subsequent', chinese: '随后的', pronunciation: '/ˈsʌbsɪkwənt/', example: 'The subsequent events proved his theory correct.' },
      { english: 'transmit', chinese: '传输', pronunciation: '/trænsˈmɪt/', example: 'Radio waves transmit information across long distances.' },
      { english: 'utilize', chinese: '利用', pronunciation: '/ˈjuːtəlaɪz/', example: 'We should utilize renewable energy sources.' },
      { english: 'valid', chinese: '有效的', pronunciation: '/ˈvælɪd/', example: 'Please provide a valid identification document.' },
      { english: 'widespread', chinese: '广泛的', pronunciation: '/ˈwaɪdspred/', example: 'The use of smartphones is widespread among teenagers.' },
      { english: 'yield', chinese: '产生', pronunciation: '/jiːld/', example: 'The research will yield important results.' }
    ],
    ielts: [
      { english: 'accumulate', chinese: '积累', pronunciation: '/əˈkjuːmjəleɪt/', example: 'Over time, small savings can accumulate into a large sum.' },
      { english: 'bias', chinese: '偏见', pronunciation: '/ˈbaɪəs/', example: 'Journalists should avoid bias in their reporting.' },
      { english: 'coherence', chinese: '连贯性', pronunciation: '/koʊˈhɪrəns/', example: 'The essay lacks coherence between paragraphs.' },
      { english: 'diminish', chinese: '减少', pronunciation: '/dɪˈmɪnɪʃ/', example: 'The importance of this issue should not diminish over time.' },
      { english: 'explicit', chinese: '明确的', pronunciation: '/ɪkˈsplɪsɪt/', example: 'The instructions were explicit and easy to follow.' },
      { english: 'fluctuation', chinese: '波动', pronunciation: '/ˌflʌktʃuˈeɪʃn/', example: 'There was a significant fluctuation in temperature.' },
      { english: 'guarantee', chinese: '保证', pronunciation: '/ˌɡærənˈtiː/', example: 'Hard work doesn\'t guarantee success, but it helps.' },
      { english: 'highlight', chinese: '强调', pronunciation: '/ˈhaɪlaɪt/', example: 'The report highlights the main environmental concerns.' },
      { english: 'implication', chinese: '含义', pronunciation: '/ˌɪmplɪˈkeɪʃn/', example: 'What are the implications of this new policy?' },
      { english: 'justify', chinese: '证明合理', pronunciation: '/ˈdʒʌstɪfaɪ/', example: 'How can you justify spending so much money?' },
      { english: 'legitimate', chinese: '合法的', pronunciation: '/lɪˈdʒɪtɪmət/', example: 'She has legitimate concerns about the safety measures.' },
      { english: 'modify', chinese: '修改', pronunciation: '/ˈmɑːdɪfaɪ/', example: 'We need to modify our approach to this problem.' },
      { english: 'notion', chinese: '概念', pronunciation: '/ˈnoʊʃn/', example: 'The notion of work-life balance is becoming more important.' },
      { english: 'objective', chinese: '客观的', pronunciation: '/əbˈdʒektɪv/', example: 'Try to give an objective analysis of the situation.' },
      { english: 'proportion', chinese: '比例', pronunciation: '/prəˈpɔːrʃn/', example: 'A large proportion of students prefer online learning.' },
      { english: 'relevant', chinese: '相关的', pronunciation: '/ˈreləvənt/', example: 'Please include only relevant information in your essay.' },
      { english: 'substantial', chinese: '大量的', pronunciation: '/səbˈstænʃl/', example: 'There has been substantial progress in medical research.' },
      { english: 'trend', chinese: '趋势', pronunciation: '/trend/', example: 'There is a growing trend toward sustainable living.' },
      { english: 'underlying', chinese: '潜在的', pronunciation: '/ˌʌndərˈlaɪɪŋ/', example: 'We need to address the underlying causes of the problem.' },
      { english: 'vary', chinese: '变化', pronunciation: '/ˈveri/', example: 'Opinions on this topic vary widely among experts.' }
    ]
  };

  static generateWordsByGrade(grade, count = 5) {
    const words = this.wordDatabase[grade] || [];
    if (words.length === 0) {
      throw new Error(`No words available for grade: ${grade}`);
    }
    
    // Shuffle and select random words
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, words.length));
  }

  static getGradeOptions() {
    return [
      { value: 'elementary', label: 'Elementary School (Grades 1-5)' },
      { value: 'middle', label: 'Middle School (Grades 6-8)' },
      { value: 'high', label: 'High School (Grades 9-12)' },
      { value: 'college', label: 'College Level' },
      { value: 'toefl', label: 'TOEFL Preparation' },
      { value: 'ielts', label: 'IELTS Preparation' }
    ];
  }

  static getAllWords() {
    return Object.values(this.wordDatabase).flat();
  }

  static getWordsByGrade(grade) {
    return this.wordDatabase[grade] || [];
  }
}