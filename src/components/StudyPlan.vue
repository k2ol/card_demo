<template>
  <div class="study-plan">
    <div class="plan-header">
      <h2>{{ studyPlan.name }}</h2>
      <div class="plan-meta">
        <span class="plan-type">{{ studyPlan.type.toUpperCase() }}</span>
        <span class="created-date">Created: {{ formatDate(studyPlan.createdAt) }}</span>
      </div>
    </div>

    <!-- Study Stats -->
    <div class="study-stats">
      <div class="stat-card">
        <div class="stat-number">{{ stats.totalWords }}</div>
        <div class="stat-label">Total Words</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.studiedWords }}</div>
        <div class="stat-label">Studied</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.masteredWords }}</div>
        <div class="stat-label">Mastered</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.averageAccuracy }}%</div>
        <div class="stat-label">Accuracy</div>
      </div>
    </div>

    <!-- Today's Study Session -->
    <div class="todays-session">
      <h3>Today's Study Session</h3>
      <div class="session-info">
        <div class="session-stats">
          <span class="review-count">{{ todaysWords.review }} to review</span>
          <span class="new-count">{{ todaysWords.new }} new words</span>
          <span class="total-count">{{ todaysWords.total }} total</span>
        </div>
        <button 
          @click="startStudySession" 
          :disabled="todaysWords.total === 0"
          class="start-session-btn"
        >
          Start Study Session
        </button>
      </div>
    </div>

    <!-- Weekly Schedule -->
    <div class="weekly-schedule">
      <h3>Weekly Schedule</h3>
      <div class="schedule-grid">
        <div 
          v-for="day in weeklySchedule" 
          :key="day.date.getTime()"
          class="schedule-day"
          :class="{ today: isToday(day.date) }"
        >
          <div class="day-name">{{ day.dayName }}</div>
          <div class="day-date">{{ formatShortDate(day.date) }}</div>
          <div class="day-words">
            <span class="review">{{ day.reviewWords }} review</span>
            <span class="new">{{ day.newWords }} new</span>
          </div>
          <div class="estimated-time">{{ day.estimatedTime }}min</div>
        </div>
      </div>
    </div>

    <!-- Progress Chart -->
    <div class="progress-section">
      <h3>Learning Progress</h3>
      <div class="progress-chart">
        <div class="progress-bar">
          <div 
            class="progress-fill mastered" 
            :style="{ width: (stats.masteredWords / stats.totalWords * 100) + '%' }"
          ></div>
          <div 
            class="progress-fill studied" 
            :style="{ 
              width: ((stats.studiedWords - stats.masteredWords) / stats.totalWords * 100) + '%',
              left: (stats.masteredWords / stats.totalWords * 100) + '%'
            }"
          ></div>
        </div>
        <div class="progress-labels">
          <span class="mastered-label">Mastered: {{ stats.masteredWords }}</span>
          <span class="studied-label">In Progress: {{ stats.studiedWords - stats.masteredWords }}</span>
          <span class="remaining-label">Remaining: {{ stats.totalWords - stats.studiedWords }}</span>
        </div>
      </div>
    </div>

    <!-- Word List with Levels -->
    <div class="word-levels">
      <h3>Word Mastery Levels</h3>
      <div class="level-filters">
        <button 
          v-for="level in 8" 
          :key="level - 1"
          @click="selectedLevel = selectedLevel === level - 1 ? null : level - 1"
          :class="{ active: selectedLevel === level - 1 }"
          class="level-filter"
        >
          Level {{ level - 1 }} ({{ getWordsAtLevel(level - 1).length }})
        </button>
      </div>
      
      <div v-if="selectedLevel !== null" class="level-words">
        <div 
          v-for="word in getWordsAtLevel(selectedLevel)" 
          :key="word.id"
          class="word-item"
        >
          <div class="word-info">
            <strong>{{ word.english }}</strong>
            <span class="translation">{{ word.chinese }}</span>
          </div>
          <div class="word-stats">
            <span class="accuracy">{{ getWordAccuracy(word) }}%</span>
            <span class="next-review">Next: {{ formatNextReview(word.nextReview) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { StudyPlanService } from '../services/studyPlanService.js'

const props = defineProps({
  studyPlan: Object
})

const emit = defineEmits(['start-session', 'back-to-manage'])

const selectedLevel = ref(null)

// Computed properties
const stats = computed(() => StudyPlanService.getStudyStats(props.studyPlan))
const todaysWords = computed(() => StudyPlanService.getTodaysWords(props.studyPlan))
const weeklySchedule = computed(() => StudyPlanService.generateWeeklySchedule(props.studyPlan))

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatShortDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

const formatNextReview = (date) => {
  const now = new Date()
  const reviewDate = new Date(date)
  const diffTime = reviewDate - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays <= 0) return 'Due now'
  if (diffDays === 1) return 'Tomorrow'
  return `${diffDays} days`
}

const isToday = (date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const getWordsAtLevel = (level) => {
  return props.studyPlan.words.filter(word => word.level === level)
}

const getWordAccuracy = (word) => {
  if (word.reviewCount === 0) return 0
  return Math.round((word.correctCount / word.reviewCount) * 100)
}

const startStudySession = () => {
  emit('start-session', todaysWords.value.words)
}
</script>

<style scoped>
.study-plan {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.plan-header {
  text-align: center;
  margin-bottom: 30px;
}

.plan-header h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.plan-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 0.9em;
  color: #666;
}

.plan-type {
  background: #667eea;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.study-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 2em;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 0.9em;
}

.todays-session {
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.todays-session h3 {
  margin: 0 0 15px 0;
}

.session-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.session-stats {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.session-stats span {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9em;
}

.start-session-btn {
  background: white;
  color: #ff6b6b;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.start-session-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.start-session-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.weekly-schedule {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.weekly-schedule h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

.schedule-day {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  transition: background 0.3s;
}

.schedule-day.today {
  background: #e3f2fd;
  border: 2px solid #2196f3;
}

.day-name {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.day-date {
  font-size: 0.8em;
  color: #666;
  margin-bottom: 10px;
}

.day-words {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 8px;
}

.day-words span {
  font-size: 0.8em;
  padding: 2px 6px;
  border-radius: 10px;
}

.review {
  background: #ffecb3;
  color: #f57c00;
}

.new {
  background: #c8e6c9;
  color: #388e3c;
}

.estimated-time {
  font-size: 0.8em;
  color: #666;
  font-weight: bold;
}

.progress-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.progress-section h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.progress-chart {
  position: relative;
}

.progress-bar {
  height: 30px;
  background: #f0f0f0;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-fill {
  height: 100%;
  position: absolute;
  top: 0;
  transition: width 0.5s ease;
}

.progress-fill.mastered {
  background: linear-gradient(90deg, #4caf50, #8bc34a);
}

.progress-fill.studied {
  background: linear-gradient(90deg, #ff9800, #ffc107);
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
}

.mastered-label { color: #4caf50; }
.studied-label { color: #ff9800; }
.remaining-label { color: #666; }

.word-levels {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.word-levels h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.level-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.level-filter {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.3s;
}

.level-filter:hover {
  border-color: #667eea;
}

.level-filter.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.level-words {
  max-height: 400px;
  overflow-y: auto;
}

.word-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: border-color 0.3s;
}

.word-item:hover {
  border-color: #667eea;
}

.word-info strong {
  color: #333;
  margin-right: 10px;
}

.translation {
  color: #666;
}

.word-stats {
  display: flex;
  gap: 15px;
  font-size: 0.9em;
}

.accuracy {
  color: #4caf50;
  font-weight: bold;
}

.next-review {
  color: #666;
}

/* Responsive design */
@media (max-width: 768px) {
  .session-info {
    flex-direction: column;
    align-items: stretch;
  }
  
  .session-stats {
    justify-content: center;
  }
  
  .schedule-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  
  .progress-labels {
    flex-direction: column;
    gap: 5px;
  }
  
  .word-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>