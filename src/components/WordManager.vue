<template>
  <div class="word-manager">
    <h3>Manage Your Words</h3>
    
    <!-- Add new word form -->
    <div class="add-word-form">
      <h4>Add New Word</h4>
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
      <button @click="addWord" class="add-btn" :disabled="!canAddWord">
        Add Word
      </button>
    </div>

    <!-- Word list -->
    <div class="word-list">
      <h4>Your Words ({{ words.length }})</h4>
      <div class="word-item" v-for="(word, index) in words" :key="index">
        <div class="word-info">
          <strong>{{ word.english }}</strong> - {{ word.chinese }}
          <div class="word-details" v-if="word.pronunciation || word.example">
            <span v-if="word.pronunciation" class="pronunciation">{{ word.pronunciation }}</span>
            <span v-if="word.example" class="example">{{ word.example }}</span>
          </div>
        </div>
        <button @click="removeWord(index)" class="remove-btn">×</button>
      </div>
      
      <div v-if="words.length === 0" class="empty-state">
        No words added yet. Add some words to start studying!
      </div>
    </div>

    <!-- Import/Export -->
    <div class="import-export">
      <h4>Import/Export</h4>
      <div class="button-group">
        <button @click="exportWords" class="export-btn">Export Words</button>
        <input 
          type="file" 
          ref="fileInput" 
          @change="importWords" 
          accept=".json"
          style="display: none"
        />
        <button @click="$refs.fileInput.click()" class="import-btn">Import Words</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  words: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['add-word', 'remove-word', 'import-words'])

const newWord = ref({
  english: '',
  chinese: '',
  pronunciation: '',
  example: ''
})

const fileInput = ref(null)

const canAddWord = computed(() => {
  return newWord.value.english.trim() && newWord.value.chinese.trim()
})

const addWord = () => {
  if (canAddWord.value) {
    emit('add-word', { ...newWord.value })
    // Reset form
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

const exportWords = () => {
  const dataStr = JSON.stringify(props.words, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'english-words.json'
  link.click()
  URL.revokeObjectURL(url)
}

const importWords = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedWords = JSON.parse(e.target.result)
        if (Array.isArray(importedWords)) {
          emit('import-words', importedWords)
        } else {
          alert('Invalid file format')
        }
      } catch (error) {
        alert('Error reading file')
      }
    }
    reader.readAsText(file)
  }
}
</script>

<style scoped>
.word-manager {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.add-word-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.form-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.add-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.add-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.word-list {
  margin-bottom: 30px;
}

.word-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  background: white;
}

.word-info {
  flex: 1;
}

.word-details {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.pronunciation {
  font-style: italic;
  margin-right: 15px;
}

.example {
  display: block;
  margin-top: 5px;
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 40px;
  font-style: italic;
}

.import-export {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.export-btn,
.import-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.export-btn {
  background: #28a745;
  color: white;
}

.import-btn {
  background: #17a2b8;
  color: white;
}

/* Responsive design */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .word-item {
    flex-direction: column;
    gap: 10px;
  }
  
  .remove-btn {
    align-self: flex-end;
  }
}
</style>