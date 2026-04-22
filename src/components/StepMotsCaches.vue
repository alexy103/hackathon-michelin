<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <div class="w-full max-w-[390px] min-h-screen bg-[#BA0B2F] flex flex-col px-6 py-10 relative" style="font-family: 'Figtree', sans-serif;">

      <button @click="emit('back')" class="w-8 h-8 flex items-center justify-center text-white mb-8 -ml-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <h1 class="text-white text-2xl font-medium mb-4">Étape</h1>

      <div class="flex items-center gap-3 mb-8">
        <div class="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            class="h-full bg-white rounded-full transition-all duration-500"
            :style="{ width: progressWidth }"
          />
        </div>
        <span class="text-white text-sm font-medium">{{ currentStep }}/{{ totalSteps }}</span>
      </div>

      <div class="flex justify-center mb-6">
        <span class="bg-white text-[#BA0B2F] text-sm font-semibold px-5 py-2 rounded-full">
          Choisissez instinctivement un mot :
        </span>
      </div>

      <div class="bg-white rounded-2xl p-4 mb-8">
        <div class="grid grid-cols-10">
          <span
            v-for="(letter, i) in letters" :key="i"
            @click="handleLetterClick(i)"
            class="text-center font-medium cursor-pointer select-none transition-all duration-200"
            style="font-size: 13px; padding: 4px 2px;"
            :class="getLetterClass(i)"
          >
            {{ letter }}
          </span>
        </div>
      </div>

      <div class="flex justify-end mt-auto">
        <div class="relative w-12 h-12">
          <svg class="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="white" stroke-opacity="0.3" stroke-width="3"/>
            <circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
              style="transition: stroke-dashoffset 1s linear;"
            />
          </svg>
          <span class="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
            {{ timeLeft }}
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  currentStep: number
  totalSteps: number
}>()

const emit = defineEmits<{
  (e: 'next', value: string): void
  (e: 'back'): void
}>()

const DURATION = 7
const timeLeft = ref(DURATION)
let interval: ReturnType<typeof setInterval> | null = null

const circumference = 2 * Math.PI * 20
const dashOffset = computed(() => circumference * (1 - timeLeft.value / DURATION))
const progressWidth = computed(() => `${(props.currentStep / props.totalSteps) * 100}%`)

const letters = [
  'D','É','C','O','U','V','E','R','T','E',  // 0-9
  'J','K','S','D','L','G','F','Q','D','E',  // 10-19
  'Q','U','N','R','A','P','I','D','E','N',  // 20-29
  'K','Y','V','M','W','D','S','M','H','Y',  // 30-39
  'C','O','N','V','I','V','I','A','L','G',  // 40-49
  'Z','V','H','D','U','W','X','Y','T','R',  // 50-59
  'L','R','K','Z','S','Q','Y','U','K','X',  // 60-69
  'C','S','V','O','J','E','P','O','C','M',  // 70-79
  'I','R','A','F','F','I','N','É','L','V',  // 80-89
  'G','W','G','S','N','H','I','K','Y','J',  // 90-99
]

const words = [
  { name: 'DÉCOUVERTE', indexes: [0,1,2,3,4,5,6,7,8,9] },
  { name: 'RAPIDE',     indexes: [23,24,25,26,27,28] },
  { name: 'CONVIVIAL',  indexes: [40,41,42,43,44,45,46,47,48] },
  { name: 'RAFFINÉ',    indexes: [81,82,83,84,85,86,87] },
]

const selectedWord = ref<string | null>(null)

function getWordForIndex(i: number) {
  return words.find(w => w.indexes.includes(i))
}

function getLetterClass(i: number) {
  const word = getWordForIndex(i)
  if (!word) return 'text-[#191919]'
  if (selectedWord.value === word.name) return 'text-white bg-[#BA0B2F] rounded'
  return 'text-[#191919] hover:text-[#BA0B2F]'
}

function handleLetterClick(i: number) {
  const word = getWordForIndex(i)
  if (!word) return
  selectedWord.value = selectedWord.value === word.name ? null : word.name
}

onMounted(() => {
  interval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(interval!)
      emit('next', selectedWord.value ?? '')
    }
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap');
</style>