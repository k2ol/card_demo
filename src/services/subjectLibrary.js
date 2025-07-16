// Extended word library with subject-specific categories
export class SubjectLibrary {
  static subjectDatabase = {
    business: [
      { english: 'revenue', chinese: '收入', pronunciation: '/ˈrevənjuː/', example: 'The company\'s revenue increased by 20% this year.' },
      { english: 'profit', chinese: '利润', pronunciation: '/ˈprɑːfɪt/', example: 'We need to maximize profit while maintaining quality.' },
      { english: 'investment', chinese: '投资', pronunciation: '/ɪnˈvestmənt/', example: 'This investment will pay off in the long term.' },
      { english: 'marketing', chinese: '市场营销', pronunciation: '/ˈmɑːrkɪtɪŋ/', example: 'Our marketing strategy targets young professionals.' },
      { english: 'budget', chinese: '预算', pronunciation: '/ˈbʌdʒɪt/', example: 'We need to stay within the allocated budget.' },
      { english: 'strategy', chinese: '策略', pronunciation: '/ˈstrætədʒi/', example: 'The business strategy focuses on digital transformation.' },
      { english: 'entrepreneur', chinese: '企业家', pronunciation: '/ˌɑːntrəprəˈnɜːr/', example: 'She is a successful entrepreneur in the tech industry.' },
      { english: 'negotiation', chinese: '谈判', pronunciation: '/nɪˌɡoʊʃiˈeɪʃn/', example: 'The contract negotiation took several weeks.' },
      { english: 'stakeholder', chinese: '利益相关者', pronunciation: '/ˈsteɪkhoʊldər/', example: 'All stakeholders must approve the new policy.' },
      { english: 'acquisition', chinese: '收购', pronunciation: '/ˌækwɪˈzɪʃn/', example: 'The acquisition will strengthen our market position.' }
    ],
    science: [
      { english: 'hypothesis', chinese: '假设', pronunciation: '/haɪˈpɑːθəsɪs/', example: 'The scientist proposed a new hypothesis about climate change.' },
      { english: 'experiment', chinese: '实验', pronunciation: '/ɪkˈsperɪmənt/', example: 'The experiment confirmed our theoretical predictions.' },
      { english: 'molecule', chinese: '分子', pronunciation: '/ˈmɑːlɪkjuːl/', example: 'Water molecules consist of hydrogen and oxygen atoms.' },
      { english: 'evolution', chinese: '进化', pronunciation: '/ˌevəˈluːʃn/', example: 'Darwin\'s theory of evolution revolutionized biology.' },
      { english: 'gravity', chinese: '重力', pronunciation: '/ˈɡrævəti/', example: 'Gravity keeps planets in orbit around the sun.' },
      { english: 'photosynthesis', chinese: '光合作用', pronunciation: '/ˌfoʊtoʊˈsɪnθəsɪs/', example: 'Photosynthesis converts sunlight into chemical energy.' },
      { english: 'ecosystem', chinese: '生态系统', pronunciation: '/ˈiːkoʊsɪstəm/', example: 'The rainforest ecosystem supports incredible biodiversity.' },
      { english: 'chromosome', chinese: '染色体', pronunciation: '/ˈkroʊməsoʊm/', example: 'Humans have 23 pairs of chromosomes.' },
      { english: 'catalyst', chinese: '催化剂', pronunciation: '/ˈkætəlɪst/', example: 'The enzyme acts as a catalyst in the reaction.' },
      { english: 'quantum', chinese: '量子', pronunciation: '/ˈkwɑːntəm/', example: 'Quantum physics explains the behavior of subatomic particles.' }
    ],
    technology: [
      { english: 'algorithm', chinese: '算法', pronunciation: '/ˈælɡərɪðəm/', example: 'The search algorithm processes millions of queries per second.' },
      { english: 'database', chinese: '数据库', pronunciation: '/ˈdeɪtəbeɪs/', example: 'The customer information is stored in a secure database.' },
      { english: 'encryption', chinese: '加密', pronunciation: '/ɪnˈkrɪpʃn/', example: 'Encryption protects sensitive data from unauthorized access.' },
      { english: 'bandwidth', chinese: '带宽', pronunciation: '/ˈbændwɪdθ/', example: 'High bandwidth is essential for video streaming.' },
      { english: 'interface', chinese: '界面', pronunciation: '/ˈɪntərfeɪs/', example: 'The user interface is intuitive and easy to navigate.' },
      { english: 'protocol', chinese: '协议', pronunciation: '/ˈproʊtəkɔːl/', example: 'The communication protocol ensures data integrity.' },
      { english: 'server', chinese: '服务器', pronunciation: '/ˈsɜːrvər/', example: 'The web server handles thousands of requests simultaneously.' },
      { english: 'debugging', chinese: '调试', pronunciation: '/diːˈbʌɡɪŋ/', example: 'Debugging is an essential skill for programmers.' },
      { english: 'framework', chinese: '框架', pronunciation: '/ˈfreɪmwɜːrk/', example: 'The development framework speeds up the coding process.' },
      { english: 'cybersecurity', chinese: '网络安全', pronunciation: '/ˈsaɪbərsɪkjʊrəti/', example: 'Cybersecurity threats are becoming more sophisticated.' }
    ],
    medicine: [
      { english: 'diagnosis', chinese: '诊断', pronunciation: '/ˌdaɪəɡˈnoʊsɪs/', example: 'The doctor made an accurate diagnosis based on the symptoms.' },
      { english: 'treatment', chinese: '治疗', pronunciation: '/ˈtriːtmənt/', example: 'The new treatment shows promising results for cancer patients.' },
      { english: 'symptom', chinese: '症状', pronunciation: '/ˈsɪmptəm/', example: 'Fever is a common symptom of viral infections.' },
      { english: 'antibiotic', chinese: '抗生素', pronunciation: '/ˌæntibaɪˈɑːtɪk/', example: 'Antibiotics are effective against bacterial infections.' },
      { english: 'surgery', chinese: '手术', pronunciation: '/ˈsɜːrdʒəri/', example: 'The patient recovered quickly after the surgery.' },
      { english: 'vaccination', chinese: '疫苗接种', pronunciation: '/ˌvæksɪˈneɪʃn/', example: 'Vaccination prevents many infectious diseases.' },
      { english: 'anatomy', chinese: '解剖学', pronunciation: '/əˈnætəmi/', example: 'Medical students study human anatomy in detail.' },
      { english: 'pathology', chinese: '病理学', pronunciation: '/pəˈθɑːlədʒi/', example: 'Pathology helps understand the causes of diseases.' },
      { english: 'rehabilitation', chinese: '康复', pronunciation: '/ˌriːəˌbɪlɪˈteɪʃn/', example: 'Physical rehabilitation helped him walk again.' },
      { english: 'immunology', chinese: '免疫学', pronunciation: '/ˌɪmjəˈnɑːlədʒi/', example: 'Immunology research leads to better vaccines.' }
    ],
    arts: [
      { english: 'composition', chinese: '构图', pronunciation: '/ˌkɑːmpəˈzɪʃn/', example: 'The painting\'s composition creates a sense of balance.' },
      { english: 'perspective', chinese: '透视', pronunciation: '/pərˈspektɪv/', example: 'Renaissance artists mastered linear perspective.' },
      { english: 'sculpture', chinese: '雕塑', pronunciation: '/ˈskʌlptʃər/', example: 'The marble sculpture took months to complete.' },
      { english: 'palette', chinese: '调色板', pronunciation: '/ˈpælət/', example: 'The artist used a limited color palette for this series.' },
      { english: 'exhibition', chinese: '展览', pronunciation: '/ˌeksɪˈbɪʃn/', example: 'The art exhibition features contemporary works.' },
      { english: 'abstract', chinese: '抽象的', pronunciation: '/ˈæbstrækt/', example: 'Abstract art doesn\'t represent recognizable objects.' },
      { english: 'portrait', chinese: '肖像', pronunciation: '/ˈpɔːrtrət/', example: 'She painted a beautiful portrait of her grandmother.' },
      { english: 'texture', chinese: '质感', pronunciation: '/ˈtekstʃər/', example: 'The artist created interesting textures with thick paint.' },
      { english: 'symmetry', chinese: '对称', pronunciation: '/ˈsɪmətri/', example: 'The building\'s design shows perfect symmetry.' },
      { english: 'aesthetic', chinese: '美学的', pronunciation: '/esˈθetɪk/', example: 'The aesthetic appeal of the design is undeniable.' }
    ],
    travel: [
      { english: 'itinerary', chinese: '行程', pronunciation: '/aɪˈtɪnəreri/', example: 'Our travel itinerary includes five European cities.' },
      { english: 'destination', chinese: '目的地', pronunciation: '/ˌdestɪˈneɪʃn/', example: 'Paris is a popular tourist destination.' },
      { english: 'accommodation', chinese: '住宿', pronunciation: '/əˌkɑːməˈdeɪʃn/', example: 'We booked accommodation near the city center.' },
      { english: 'reservation', chinese: '预订', pronunciation: '/ˌrezərˈveɪʃn/', example: 'Please confirm your hotel reservation.' },
      { english: 'passport', chinese: '护照', pronunciation: '/ˈpæspɔːrt/', example: 'Don\'t forget to bring your passport for international travel.' },
      { english: 'customs', chinese: '海关', pronunciation: '/ˈkʌstəmz/', example: 'We had to go through customs at the airport.' },
      { english: 'luggage', chinese: '行李', pronunciation: '/ˈlʌɡɪdʒ/', example: 'The airline lost my luggage during the connection.' },
      { english: 'excursion', chinese: '短途旅行', pronunciation: '/ɪkˈskɜːrʒn/', example: 'We took a day excursion to the nearby islands.' },
      { english: 'souvenir', chinese: '纪念品', pronunciation: '/ˌsuːvəˈnɪr/', example: 'I bought souvenirs for my family back home.' },
      { english: 'backpacking', chinese: '背包旅行', pronunciation: '/ˈbækpækɪŋ/', example: 'Backpacking through Europe was an amazing experience.' }
    ]
  };

  static generateWordsBySubject(subject, count = 5) {
    const words = this.subjectDatabase[subject] || [];
    if (words.length === 0) {
      throw new Error(`No words available for subject: ${subject}`);
    }
    
    // Shuffle and select random words
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, words.length));
  }

  static getSubjectOptions() {
    return [
      { value: 'business', label: 'Business & Finance', icon: 'briefcase' },
      { value: 'science', label: 'Science & Research', icon: 'microscope' },
      { value: 'technology', label: 'Technology & IT', icon: 'computer' },
      { value: 'medicine', label: 'Medicine & Health', icon: 'medical' },
      { value: 'arts', label: 'Arts & Culture', icon: 'palette' },
      { value: 'travel', label: 'Travel & Tourism', icon: 'plane' }
    ];
  }

  static getAllSubjects() {
    return Object.keys(this.subjectDatabase);
  }

  static getWordsBySubject(subject) {
    return this.subjectDatabase[subject] || [];
  }

  static getAllSubjectWords() {
    return Object.values(this.subjectDatabase).flat();
  }
}