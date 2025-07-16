<template>
  <div class="word-manager">
    <h3>Manage Your Words</h3>
    
    <!-- Word Generation by Grade -->
    <div class="generation-section">
      <h4>Generate Words by Grade Level</h4>
      <div class="generation-controls">
        <select v-model="selectedGrade" class="grade-select">
          <option value="">Select Grade Level</option>
          <option v-for="grade in gradeOptions" :key="grade.value" :value="grade.value">
            {{ grade.label }}
          </option>
        </select>
        <input 
          v-model.number="wordCount" 
          type="number" 
          min="1" 
          max="20" 
          placeholder="Count"
          class="count-input"
        />
        <button 
          @click="generateWords" 
          :disabled="!selectedGrade"
          class="generate-btn"
        >
          Generate Words
        </button>
      </div>
    </div>

    <!-- Word Generation by Subject -->
    <div class="subject-section">
      <h4>Generate Words by Subject</h4>
      <div class="generation-controls">
        <select v-model="selectedSubject" class="subject-select">
          <option value="">Select Subject</option>
          <option v-for="subject in subjectOptions" :key="subject.value" :value="subject.value">
            {{ subject.label }}
          </option>
        </select>
        <input 
          v-model.number="subjectWordCount" 
          type="number" 
          min="1" 
          max="20" 
          placeholder="Count"
          class="count-input"
        />
        <button 
          @click="generateSubjectWords" 
          :disabled="!selectedSubject"
          class="generate-btn"
        >
          Generate Subject Words
        </button>
      </div>
      <div v-if="generationError" class="error-message">
        {{ generationError }}
      </div>
      <div v-if="generationSuccess" class="success-message">
        Successfully generated {{ generationSuccess }} words!
      </div>
    </div>
    
    <!-- Study Plan Creation -->
    <div class="study-plan-section">
      <h4>Create Study Plan with Customizable Spaced Repetition</h4>
      <div class="plan-controls">
        <div class="plan-row">
          <select v-model="selectedPlanType" class="plan-select">
            <option v-for="plan in planTypes" :key="plan.value" :value="plan.value">
              {{ plan.label }} - {{ plan.description }}
            </option>
          </select>
          <select v-model="selectedIntervalType" class="interval-select">
            <option v-for="interval in intervalTypes" :key="interval.value" :value="interval.value">
              {{ interval.label }}
            </option>
          </select>
        </div>
        <button 
          @click="createStudyPlan" 
          :disabled="words.length === 0"
          class="create-plan-btn"
        >
          Create Custom Study Plan
        </button>
      </div>
      <div class="interval-preview" v-if="selectedIntervalType">
        <p><strong>{{ getSelectedIntervalInfo().label }} Schedule:</strong></p>
        <div class="interval-display">
          <span v-for="(interval, index) in getSelectedIntervalInfo().intervals" :key="index" class="interval-badge">
            L{{ index }}: {{ interval }}d
          </span>
        </div>
        <p class="interval-description">{{ getSelectedIntervalInfo().description }}</p>
      </div>
      <div class="plan-info">
        <p><strong>Enhanced Memory Curve Features:</strong></p>
        <ul>
          <li>5 customizable spaced repetition algorithms</li>
          <li>Adaptive difficulty based on word complexity</li>
          <li>Personalized review schedules</li>
          <li>Advanced progress analytics</li>
        </ul>
      </div>
    </div>
    
    <!-- Add new word form -->
    <div class="add-word-form">
      <h4>Add New Word Manually</h4>
      <div class="form-row">
        <input 
          v-model="newWord.english" 
          placeholder="English word" 
          class="form-input"
        />
        <input 
          v-model="newWord.chinese" 
          placeholder="Chinese translation" 
          class="form-input"
        />
      </div>
      <div class="form-row">
        <input 
          v-model="newWord.pronunciation" 
          placeholder="Pronunciation (optional)" 
          class="form-input"
        />
        <input 
          v-model="newWord.example" 
          placeholder="Example sentence (optional)" 
          class="form-input"
        />
      </div>
      <button @click="addWord" :disabled="!canAddWord" class="add-btn">
        Add Word
      </button>
    </div>

    <!-- Word list -->
    <div class="word-list">
      <h4>Your Words ({{ words.length }})</h4>
      <div v-if="words.length === 0" class="empty-state">
        No words yet. Add some words or generate them with AI!
      </div>
      <div v-else class="words-grid">
        <div v-for="(word, index) in words" :key="index" class="word-item">
          <div class="word-content">
            <div class="word-main">
              <strong>{{ word.english }}</strong>
              <span class="translation">{{ word.chinese }}</span>
            </div>
            <div v-if="word.pronunciation" class="pronunciation">{{ word.pronunciation }}</div>
            <div v-if="word.example" class="example">{{ word.example }}</div>
          </div>
          <button @click="removeWord(index)" class="remove-btn">×</button>
        </div>
      </div>
    </div>

    <!-- Import/Export -->
    <div class="import-export">
      <h4>Import/Export</h4>
      <div class="import-export-controls">
        <input 
          type="file" 
          @change="importWords" 
          accept=".json"
          ref="fileInput"
          style="display: none"
        />
        <button @click="$refs.fileInput.click()" class="import-btn">
          Import Words
        </button>
        <button @click="exportWords" class="export-btn">
          Export Words
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { WordLibrary } from '../services/wordLibrary.js'
import { StudyPlanService } from '../services/studyPlanService.js'
import { SubjectLibrary } from '../services/subjectLibrary.js'

const props = defineProps({
  words: Array
})

const emit = defineEmits(['add-word', 'remove-word', 'import-words', 'create-study-plan'])

// Word Generation state
const selectedGrade = ref('')
const wordCount = ref(5)
const selectedSubject = ref('')
const subjectWordCount = ref(5)
const generationError = ref('')
const generationSuccess = ref(0)
const gradeOptions = WordLibrary.getGradeOptions()
const subjectOptions = SubjectLibrary.getSubjectOptions()

// Study Plan state
const selectedPlanType = ref('balanced')
const selectedIntervalType = ref('default')
const planTypes = StudyPlanService.getPlanTypes()
const intervalTypes = StudyPlanService.getIntervalTypes()

// Manual word addition
const newWord = ref({
  english: '',
  chinese: '',
  pronunciation: '',
  example: ''
})

const canAddWord = computed(() => {
  return newWord.value.english.trim() && newWord.value.chinese.trim()
})

// Local word generation
const generateWords = () => {
  if (!selectedGrade.value) return
  
  generationError.value = ''
  generationSuccess.value = 0
  
  try {
    const generatedWords = WordLibrary.generateWordsByGrade(
      selectedGrade.value, 
      wordCount.value || 5
    )
    
    // Add each generated word
    generatedWords.forEach(word => {
      emit('add-word', word)
    })
    
    generationSuccess.value = generatedWords.length
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      generationSuccess.value = 0
    }, 3000)
    
  } catch (error) {
    generationError.value = `Failed to generate words: ${error.message}`
    console.error('Word generation error:', error)
  }
}

// Subject word generation
const generateSubjectWords = () => {
  if (!selectedSubject.value) return
  
  generationError.value = ''
  generationSuccess.value = 0
  
  try {
    const generatedWords = SubjectLibrary.generateWordsBySubject(
      selectedSubject.value, 
      subjectWordCount.value || 5
    )
    
    // Add each generated word
    generatedWords.forEach(word => {
      emit('add-word', word)
    })
    
    generationSuccess.value = generatedWords.length
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      generationSuccess.value = 0
    }, 3000)
    
  } catch (error) {
    generationError.value = `Failed to generate subject words: ${error.message}`
    console.error('Subject word generation error:', error)
  }
}

// Study plan creation with custom intervals
const createStudyPlan = () => {
  if (props.words.length === 0) {
    generationError.value = 'Please add some words before creating a study plan'
    return
  }
  
  try {
    const studyPlan = StudyPlanService.createStudyPlan(
      props.words, 
      selectedPlanType.value, 
      selectedIntervalType.value
    )
    emit('create-study-plan', studyPlan)
    
    generationSuccess.value = `Custom study plan created with ${studyPlan.totalWords} words using ${getSelectedIntervalInfo().label}!`
    setTimeout(() => {
      generationSuccess.value = 0
    }, 3000)
  } catch (error) {
    generationError.value = `Failed to create study plan: ${error.message}`
  }
}

// Get selected interval type information
const getSelectedIntervalInfo = () => {
  return intervalTypes.find(type => type.value === selectedIntervalType.value) || intervalTypes[0]
}

// Manual word management
const addWord = () => {
  if (canAddWord.value) {
    emit('add-word', { ...newWord.value })
    newWord.value = {
      english: '',
      chinese: '',
      pronunciation: '',
      example: ''
    }
  }
}

const removeWord = (index) => {
  emit('remove-word', index)
}

// Import/Export functionality
const importWords = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedWords = JSON.parse(e.target.result)
        emit('import-words', importedWords)
      } catch (error) {
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }
}

const exportWords = () => {
  const dataStr = JSON.stringify(props.words, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'word-cards.json'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.word-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.generation-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.study-plan-section {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.study-plan-section h4 {
  margin: 0 0 15px 0;
  font-size: 1.2em;
}

.plan-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
}

.plan-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.plan-select {
  flex: 1;
  min-width: 250px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
}

.interval-select {
  flex: 1;
  min-width: 200px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
}

.subject-select {
  flex: 1;
  min-width: 200px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
}

.interval-preview {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
}

.interval-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
}

.interval-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: bold;
}

.interval-description {
  font-size: 0.9em;
  font-style: italic;
  margin: 10px 0 0 0;
}

.create-plan-btn {
  padding: 10px 20px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.create-plan-btn:hover:not(:disabled) {
  background: #ff5252;
}

.create-plan-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.plan-info {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
}

.plan-info p {
  margin: 0 0 10px 0;
  font-weight: bold;
}

.plan-info ul {
  margin: 0;
  padding-left: 20px;
}

.plan-info li {
  margin-bottom: 5px;
  font-size: 0.9em;
}

.generation-section h4 {
  margin: 0 0 15px 0;
  font-size: 1.2em;
}

.generation-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.subject-section {
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.subject-section h4 {
  margin: 0 0 15px 0;
  font-size: 1.2em;
}

.grade-select {
  flex: 1;
  min-width: 200px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
}

.count-input {
  width: 80px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
}

.generate-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.generate-btn:hover:not(:disabled) {
  background: #45a049;
}

.generate-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.error-message {
  background: #ff4444;
  color: white;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
}

.success-message {
  background: #4CAF50;
  color: white;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
}

.add-word-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.add-word-form h4 {
  margin: 0 0 15px 0;
  color: #333;
}

.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.form-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-btn {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.add-btn:hover:not(:disabled) {
  background: #5a67d8;
}

.add-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.word-list h4 {
  color: #333;
  margin-bottom: 15px;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 40px;
  font-style: italic;
}

.words-grid {
  display: grid;
  gap: 15px;
}

.word-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: white;
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 15px;
  transition: border-color 0.3s;
}

.word-item:hover {
  border-color: #667eea;
}

.word-content {
  flex: 1;
}

.word-main {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 8px;
}

.word-main strong {
  font-size: 1.1em;
  color: #333;
}

.translation {
  color: #666;
  font-size: 0.95em;
}

.pronunciation {
  font-size: 0.85em;
  color: #888;
  font-style: italic;
  margin-bottom: 5px;
}

.example {
  font-size: 0.9em;
  color: #555;
  font-style: italic;
}

.remove-btn {
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background 0.3s;
}

.remove-btn:hover {
  background: #cc0000;
}

.import-export {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
}

.import-export h4 {
  margin: 0 0 15px 0;
  color: #333;
}

.import-export-controls {
  display: flex;
  gap: 10px;
}

.import-btn, .export-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.import-btn {
  background: #28a745;
  color: white;
}

.import-btn:hover {
  background: #218838;
}

.export-btn {
  background: #17a2b8;
  color: white;
}

.export-btn:hover {
  background: #138496;
}

/* Responsive design */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .generation-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .grade-select, .subject-select, .count-input, .generate-btn {
    width: 100%;
  }
  
  .plan-row {
    flex-direction: column;
  }
  
  .plan-select, .interval-select {
    width: 100%;
    min-width: auto;
  }
  
  .interval-display {
    justify-content: center;
  }
  
  .word-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .import-export-controls {
    flex-direction: column;
  }
}
</style>