// Enhanced Study plan service with customizable spaced repetition
export class StudyPlanService {
  // Customizable spaced repetition intervals (in days) based on Ebbinghaus forgetting curve
  static defaultIntervals = [1, 3, 7, 14, 30, 90, 180, 365];
  static customIntervals = {
    aggressive: [0.5, 1, 2, 4, 8, 20, 45, 120], // Faster progression for quick learners
    conservative: [2, 5, 10, 21, 45, 120, 240, 480], // Slower progression for better retention
    exam: [1, 2, 4, 7, 14, 21, 30, 60], // Optimized for exam preparation
    longterm: [1, 4, 10, 25, 60, 150, 365, 730] // Focus on long-term retention
  };
  
  static createStudyPlan(words, planType = 'balanced', intervalType = 'default') {
    const now = new Date();
    const plan = {
      id: Date.now(),
      name: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Study Plan`,
      createdAt: now,
      type: planType,
      intervalType: intervalType,
      totalWords: words.length,
      words: words.map((word, index) => ({
        ...word,
        id: `word_${index}_${Date.now()}`,
        level: 0, // Mastery level (0-7)
        nextReview: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
        lastReviewed: null,
        reviewCount: 0,
        correctCount: 0,
        difficulty: this.calculateWordDifficulty(word),
        addedAt: now,
        intervalType: intervalType
      })),
      settings: this.getPlanSettings(planType)
    };
    
    return plan;
  }

  static getPlanSettings(planType) {
    const settings = {
      balanced: {
        dailyTarget: 10,
        newWordsPerDay: 5,
        reviewWordsPerDay: 15,
        maxSessionTime: 30, // minutes
        difficultyWeight: 0.5
      },
      intensive: {
        dailyTarget: 20,
        newWordsPerDay: 10,
        reviewWordsPerDay: 30,
        maxSessionTime: 45,
        difficultyWeight: 0.7
      },
      relaxed: {
        dailyTarget: 5,
        newWordsPerDay: 3,
        reviewWordsPerDay: 8,
        maxSessionTime: 15,
        difficultyWeight: 0.3
      },
      exam: {
        dailyTarget: 25,
        newWordsPerDay: 15,
        reviewWordsPerDay: 40,
        maxSessionTime: 60,
        difficultyWeight: 0.8
      }
    };
    
    return settings[planType] || settings.balanced;
  }

  static calculateWordDifficulty(word) {
    let difficulty = 1;
    
    // Length factor
    if (word.english.length > 8) difficulty += 0.5;
    if (word.english.length > 12) difficulty += 0.5;
    
    // Syllable estimation (rough)
    const syllables = word.english.split(/[aeiou]/i).length - 1;
    if (syllables > 3) difficulty += 0.3;
    
    // Common letter patterns
    if (/[qxz]/.test(word.english.toLowerCase())) difficulty += 0.2;
    if (/ph|gh|ough/.test(word.english.toLowerCase())) difficulty += 0.3;
    
    return Math.min(difficulty, 3); // Cap at 3
  }

  static getTodaysWords(studyPlan) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Words due for review
    const reviewWords = studyPlan.words.filter(word => {
      const reviewDate = new Date(word.nextReview);
      const reviewDay = new Date(reviewDate.getFullYear(), reviewDate.getMonth(), reviewDate.getDate());
      return reviewDay <= today && word.level < 7;
    });

    // New words to learn
    const newWords = studyPlan.words.filter(word => 
      word.reviewCount === 0
    ).slice(0, studyPlan.settings.newWordsPerDay);

    // Combine and prioritize
    const todaysWords = [
      ...reviewWords.slice(0, studyPlan.settings.reviewWordsPerDay),
      ...newWords
    ].slice(0, studyPlan.settings.dailyTarget);

    return {
      review: reviewWords.length,
      new: newWords.length,
      total: todaysWords.length,
      words: todaysWords
    };
  }

  static updateWordProgress(word, isCorrect, responseTime = null) {
    const now = new Date();
    word.lastReviewed = now;
    word.reviewCount++;
    
    if (isCorrect) {
      word.correctCount++;
      // Move to next level if accuracy is good
      if (word.correctCount / word.reviewCount >= 0.8) {
        word.level = Math.min(word.level + 1, 7);
      }
    } else {
      // Reset to earlier level if incorrect
      word.level = Math.max(word.level - 1, 0);
    }

    // Calculate next review date based on spaced repetition
    const intervals = this.getIntervals(word.intervalType || 'default');
    const interval = intervals[word.level] || intervals[intervals.length - 1];
    const difficultyMultiplier = word.difficulty || 1;
    const adjustedInterval = Math.round(interval * difficultyMultiplier);
    
    word.nextReview = new Date(now.getTime() + adjustedInterval * 24 * 60 * 60 * 1000);
    
    return word;
  }

  static getStudyStats(studyPlan) {
    const words = studyPlan.words;
    const totalWords = words.length;
    const studiedWords = words.filter(w => w.reviewCount > 0).length;
    const masteredWords = words.filter(w => w.level >= 6).length;
    const strugglingWords = words.filter(w => w.reviewCount > 0 && w.correctCount / w.reviewCount < 0.6).length;
    
    const averageAccuracy = words.reduce((sum, word) => {
      if (word.reviewCount === 0) return sum;
      return sum + (word.correctCount / word.reviewCount);
    }, 0) / Math.max(studiedWords, 1);

    return {
      totalWords,
      studiedWords,
      masteredWords,
      strugglingWords,
      averageAccuracy: Math.round(averageAccuracy * 100),
      completionRate: Math.round((masteredWords / totalWords) * 100)
    };
  }

  static generateWeeklySchedule(studyPlan) {
    const schedule = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Simulate daily word distribution
      const dayWords = this.getTodaysWords(studyPlan);
      
      schedule.push({
        date: date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
        reviewWords: Math.max(0, dayWords.review - i), // Decrease over week
        newWords: i < 5 ? studyPlan.settings.newWordsPerDay : 0, // No new words on weekends
        totalWords: dayWords.total,
        estimatedTime: Math.round(dayWords.total * 2) // 2 minutes per word
      });
    }
    
    return schedule;
  }

  static getIntervals(intervalType = 'default') {
    return this.customIntervals[intervalType] || this.defaultIntervals;
  }

  static getIntervalTypes() {
    return [
      {
        value: 'default',
        label: 'Standard Memory Curve',
        description: 'Balanced intervals based on Ebbinghaus curve',
        intervals: this.defaultIntervals
      },
      {
        value: 'aggressive',
        label: 'Aggressive Learning',
        description: 'Faster progression for quick learners',
        intervals: this.customIntervals.aggressive
      },
      {
        value: 'conservative',
        label: 'Conservative Retention',
        description: 'Slower progression for better retention',
        intervals: this.customIntervals.conservative
      },
      {
        value: 'exam',
        label: 'Exam Preparation',
        description: 'Optimized for test preparation',
        intervals: this.customIntervals.exam
      },
      {
        value: 'longterm',
        label: 'Long-term Memory',
        description: 'Focus on permanent retention',
        intervals: this.customIntervals.longterm
      }
    ];
  }

  static getPlanTypes() {
    return [
      {
        value: 'balanced',
        label: 'Balanced Plan',
        description: '10 words/day, good for steady progress',
        icon: 'balance'
      },
      {
        value: 'intensive',
        label: 'Intensive Plan',
        description: '20 words/day, for fast learners',
        icon: 'rocket'
      },
      {
        value: 'relaxed',
        label: 'Relaxed Plan',
        description: '5 words/day, perfect for beginners',
        icon: 'leaf'
      },
      {
        value: 'exam',
        label: 'Exam Preparation',
        description: '25 words/day, intensive exam prep',
        icon: 'book'
      }
    ];
  }
}