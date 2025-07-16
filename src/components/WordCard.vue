<template>
  <div class="word-card-container">
    <div 
      class="word-card" 
      :class="{ flipped: isFlipped }"
      @click="flipCard"
    >
      <div class="card-front">
        <div class="word-content">
          <h2>{{ word.english }}</h2>
          <p class="pronunciation" v-if="word.pronunciation">{{ word.pronunciation }}</p>
          <button 
            @click="pronounceWord" 
            class="pronunciation-btn"
            :class="{ speaking: isSpeaking }"
            :disabled="isSpeaking"
          >
            <span v-if="!isSpeaking">🔊 Pronounce</span>
            <span v-else>🔊 Speaking...</span>
          </button>
          <p class="hint">Click to see translation</p>
        </div>
      </div>
      <div class="card-back">
        <div class="word-content">
          <h2>{{ word.chinese }}</h2>
          <p class="example" v-if="word.example">{{ word.example }}</p>
          <button 
            @click="pronounceWord" 
            class="pronunciation-btn"
            :class="{ speaking: isSpeaking }"
            :disabled="isSpeaking"
          >
            <span v-if="!isSpeaking">🔊 Pronounce</span>
            <span v-else>🔊 Speaking...</span>
          </button>
          <p class="hint">Click to flip back</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  word: {
    type: Object,
    required: true
  }
})

const isFlipped = ref(false)
const isSpeaking = ref(false)

const flipCard = () => {
  isFlipped.value = !isFlipped.value
}

// Pronunciation function using Web Speech API
const pronounceWord = (event) => {
  event.stopPropagation() // Prevent card flip when clicking pronunciation button
  
  if (isSpeaking.value) return // Prevent multiple simultaneous pronunciations
  
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(props.word.english)
    
    // Configure speech settings
    utterance.lang = 'en-US'
    utterance.rate = 0.8 // Slightly slower for learning
    utterance.pitch = 1
    utterance.volume = 1
    
    // Handle speech events
    utterance.onstart = () => {
      isSpeaking.value = true
    }
    
    utterance.onend = () => {
      isSpeaking.value = false
    }
    
    utterance.onerror = () => {
      isSpeaking.value = false
      console.warn('Speech synthesis error')
    }
    
    // Speak the word
    window.speechSynthesis.speak(utterance)
  } else {
    alert('Speech synthesis not supported in this browser')
  }
}

// Auto flip back after showing translation for a while
const autoFlipBack = () => {
  if (isFlipped.value) {
    setTimeout(() => {
      isFlipped.value = false
    }, 3000)
  }
}
</script>

<style scoped>
.word-card-container {
  perspective: 1000px;
  width: 100%;
  max-width: 400px;
  height: 300px;
  margin: 0 auto;
}

.word-card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.word-card.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.card-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-back {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  transform: rotateY(180deg);
}

.word-content {
  text-align: center;
  width: 100%;
}

.word-content h2 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  font-weight: 600;
}

.pronunciation {
  font-size: 1.2rem;
  margin: 10px 0;
  opacity: 0.9;
  font-style: italic;
}

.example {
  font-size: 1.1rem;
  margin: 15px 0;
  opacity: 0.9;
  line-height: 1.4;
}

.hint {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 20px;
}

.pronunciation-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  margin: 15px 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.pronunciation-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.pronunciation-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pronunciation-btn.speaking {
  background: rgba(255, 255, 255, 0.4);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Responsive design */
@media (max-width: 768px) {
  .word-card-container {
    max-width: 350px;
    height: 250px;
  }
  
  .word-content h2 {
    font-size: 2rem;
  }
  
  .pronunciation {
    font-size: 1rem;
  }
  
  .example {
    font-size: 1rem;
  }
  
  .pronunciation-btn {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .word-card-container {
    max-width: 300px;
    height: 220px;
  }
  
  .word-content h2 {
    font-size: 1.8rem;
  }
  
  .card-front,
  .card-back {
    padding: 15px;
  }
  
  .pronunciation-btn {
    font-size: 0.7rem;
    padding: 5px 10px;
    margin: 10px 0;
  }
}
</style>