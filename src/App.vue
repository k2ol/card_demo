<script setup>
import { ref, onMounted, computed } from 'vue'
import WordCard from './components/WordCard.vue'
import WordManager from './components/WordManager.vue'
import StudyPlan from './components/StudyPlan.vue'

// App state
const currentView = ref('study') // 'study', 'manage', or 'plan'
const words = ref([])
const currentWordIndex = ref(0)
const studyMode = ref('sequential') // 'sequential' or 'random'
const studiedWords = ref(new Set())
const currentStudyPlan = ref(null)
const studySession = ref(null)

// Default words for demo
const defaultWords = [
  {
    english: 'Hello',
    chinese: '你好',
    pronunciation: '/həˈloʊ/',
    example: 'Hello, how are you today?'
  },
  {
    english: 'Beautiful',
    chinese: '美丽的',
    pronunciation: '/ˈbjuːtɪfl/',
    example: 'The sunset is beautiful tonight.'
  },
  {
    english: 'Knowledge',
    chinese: '知识',
    pronunciation: '/ˈnɑːlɪdʒ/',
    example: 'Knowledge is power.'
  },
  {
    english: 'Adventure',
    chinese: '冒险',
    pronunciation: '/ədˈventʃər/',
    example: 'Life is a great adventure.'
  },
  {
    english: 'Friendship',
    chinese: '友谊',
    pronunciation: '/ˈfrendʃɪp/',
    example: 'True friendship lasts forever.'
  }
]

// Computed properties
const currentWord = computed(() => {
  if (words.value.length === 0) return null
  return words.value[currentWordIndex.value]
})

const progress = computed(() => {
  if (words.value.length === 0) return 0
  return Math.round((studiedWords.value.size / words.value.length) * 100)
})

const hasWords = computed(() => words.value.length > 0)

// Methods
const loadWords = () => {
  const saved = localStorage.getItem('englishWords')
  if (saved) {
    try {
      words.value = JSON.parse(saved)
    } catch (error) {
      words.value = [...defaultWords]
    }
  } else {
    words.value = [...defaultWords]
  }
}

const saveWords = () => {
  localStorage.setItem('englishWords', JSON.stringify(words.value))
}

const nextWord = () => {
  if (words.value.length === 0) return
  
  // Mark current word as studied
  studiedWords.value.add(currentWordIndex.value)
  
  if (studyMode.value === 'random') {
    currentWordIndex.value = Math.floor(Math.random() * words.value.length)
  } else {
    currentWordIndex.value = (currentWordIndex.value + 1) % words.value.length
  }
}

const previousWord = () => {
  if (words.value.length === 0) return
  
  if (studyMode.value === 'sequential') {
    currentWordIndex.value = currentWordIndex.value === 0 
      ? words.value.length - 1 
      : currentWordIndex.value - 1
  } else {
    currentWordIndex.value = Math.floor(Math.random() * words.value.length)
  }
}

const resetProgress = () => {
  studiedWords.value.clear()
  currentWordIndex.value = 0
}

const addWord = (word) => {
  words.value.push(word)
  saveWords()
}

const removeWord = (index) => {
  words.value.splice(index, 1)
  if (currentWordIndex.value >= words.value.length) {
    currentWordIndex.value = Math.max(0, words.value.length - 1)
  }
  saveWords()
}

const importWords = (importedWords) => {
  words.value = [...words.value, ...importedWords]
  saveWords()
}

const createStudyPlan = (studyPlan) => {
  currentStudyPlan.value = studyPlan
  localStorage.setItem('currentStudyPlan', JSON.stringify(studyPlan))
  currentView.value = 'plan'
}

const startStudySession = (sessionWords) => {
  studySession.value = {
    words: sessionWords,
    currentIndex: 0,
    startTime: new Date()
  }
  currentView.value = 'study'
}

const loadStudyPlan = () => {
  const saved = localStorage.getItem('currentStudyPlan')
  if (saved) {
    try {
      currentStudyPlan.value = JSON.parse(saved)
    } catch (error) {
      console.error('Failed to load study plan:', error)
    }
  }
}

const switchView = (view) => {
  currentView.value = view
}

const toggleStudyMode = () => {
  studyMode.value = studyMode.value === 'sequential' ? 'random' : 'sequential'
}

// Lifecycle
onMounted(() => {
  loadWords()
  loadStudyPlan()
})
</script>

<template>
  <div class="app">
    <!-- Header -->
    <header class="app-header">
      <h1>📚 English Word Cards</h1>
      <nav class="nav-tabs">
        <button 
          @click="switchView('study')" 
          :class="{ active: currentView === 'study' }"
          class="nav-tab"
        >
          Study
        </button>
        <button 
          @click="switchView('manage')" 
          :class="{ active: currentView === 'manage' }"
          class="nav-tab"
        >
          Manage Words
        </button>
        <button 
          @click="switchView('plan')" 
          :class="{ active: currentView === 'plan' }"
          class="nav-tab"
          :disabled="!currentStudyPlan"
        >
          Study Plan
        </button>
      </nav>
    </header>

    <!-- Study View -->
    <main v-if="currentView === 'study'" class="study-view">
      <div v-if="hasWords" class="study-container">
        <!-- Progress and Controls -->
        <div class="study-header">
          <div class="progress-section">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <p class="progress-text">
              Progress: {{ studiedWords.size }}/{{ words.length }} ({{ progress }}%)
            </p>
          </div>
          
          <div class="study-controls">
            <button @click="toggleStudyMode" class="mode-btn">
              Mode: {{ studyMode === 'sequential' ? 'Sequential' : 'Random' }}
            </button>
            <button @click="resetProgress" class="reset-btn">
              Reset Progress
            </button>
          </div>
        </div>

        <!-- Word Card -->
        <div class="card-section">
          <WordCard :word="currentWord" />
        </div>

        <!-- Navigation -->
        <div class="navigation">
          <button @click="previousWord" class="nav-btn prev-btn">
            ← Previous
          </button>
          <span class="word-counter">
            {{ currentWordIndex + 1 }} / {{ words.length }}
          </span>
          <button @click="nextWord" class="nav-btn next-btn">
            Next →
          </button>
        </div>
      </div>

      <div v-else class="empty-study">
        <h2>No words to study</h2>
        <p>Add some words in the "Manage Words" tab to start studying!</p>
        <button @click="switchView('manage')" class="add-words-btn">
          Add Words
        </button>
      </div>
    </main>

    <!-- Manage View -->
    <main v-if="currentView === 'manage'" class="manage-view">
      <WordManager 
        :words="words"
        @add-word="addWord"
        @remove-word="removeWord"
        @import-words="importWords"
        @create-study-plan="createStudyPlan"
      />
    </main>

    <!-- Study Plan View -->
    <main v-if="currentView === 'plan'" class="plan-view">
      <StudyPlan 
        v-if="currentStudyPlan"
        :study-plan="currentStudyPlan"
        @start-session="startStudySession"
        @back-to-manage="switchView('manage')"
      />
      <div v-else class="no-plan">
        <h2>No Study Plan</h2>
        <p>Create a study plan in the "Manage Words" section to get started with spaced repetition learning.</p>
        <button @click="switchView('manage')" class="create-plan-btn">
          Go to Manage Words
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.app-header {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.app-header h1 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 2.5rem;
}

.nav-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.nav-tab {
  padding: 12px 24px;
  border: none;
  background: #f8f9fa;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.nav-tab.active {
  background: #007bff;
  color: white;
}

.nav-tab:hover:not(.active):not(:disabled) {
  background: #e9ecef;
}

.nav-tab:disabled {
  background: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.study-view {
  padding: 40px 20px;
}

.study-container {
  max-width: 800px;
  margin: 0 auto;
}

.study-header {
  margin-bottom: 40px;
}

.progress-section {
  margin-bottom: 20px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #28a745, #20c997);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  color: #666;
  margin: 0;
}

.study-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.mode-btn,
.reset-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.mode-btn {
  background: #17a2b8;
  color: white;
}

.reset-btn {
  background: #6c757d;
  color: white;
}

.card-section {
  margin: 40px 0;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
}

.nav-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.prev-btn {
  background: #6f42c1;
  color: white;
}

.next-btn {
  background: #fd7e14;
  color: white;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.word-counter {
  font-size: 18px;
  font-weight: 500;
  color: #495057;
}

.empty-study {
  text-align: center;
  padding: 80px 20px;
  max-width: 500px;
  margin: 0 auto;
}

.empty-study h2 {
  color: #6c757d;
  margin-bottom: 15px;
}

.empty-study p {
  color: #868e96;
  margin-bottom: 30px;
  font-size: 18px;
}

.add-words-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-words-btn:hover {
  background: #218838;
  transform: translateY(-2px);
}

.manage-view {
  padding: 40px 20px;
}

.plan-view {
  padding: 20px;
}

.no-plan {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.no-plan h2 {
  color: #333;
  margin-bottom: 15px;
}

.no-plan p {
  color: #666;
  margin-bottom: 25px;
  line-height: 1.6;
}

.no-plan .create-plan-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.no-plan .create-plan-btn:hover {
  background: #5a67d8;
}

/* Responsive design */
@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }
  
  .nav-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-tab {
    width: 200px;
  }
  
  .study-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .navigation {
    flex-direction: column;
    gap: 20px;
  }
  
  .word-counter {
    order: -1;
  }
}

@media (max-width: 480px) {
  .study-view,
  .manage-view {
    padding: 20px 10px;
  }
  
  .app-header {
    padding: 15px;
  }
  
  .app-header h1 {
    font-size: 1.8rem;
  }
}
</style>