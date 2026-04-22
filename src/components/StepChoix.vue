<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <div class="w-full max-w-[390px] min-h-screen bg-[#BA0B2F] flex flex-col px-6 py-10 relative" style="font-family: 'Figtree', sans-serif;">

      <button @click="emit('back')" class="w-8 h-8 flex items-center justify-center text-white mb-8 -ml-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <h1 class="text-white text-2xl font-medium mb-4">Étape</h1>

      <div class="flex items-center gap-3 mb-12">
        <div class="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            class="h-full bg-white rounded-full transition-all duration-500"
            :style="{ width: progressWidth }"
          />
        </div>
        <span class="text-white text-sm font-medium">{{ currentStep }}/{{ totalSteps }}</span>
      </div>

      <div class="flex items-start gap-4 mb-10">
        <span class="text-white font-medium shrink-0" style="font-size: 72px; line-height: 1;">{{ currentStep }}</span>
        <p class="text-white font-medium text-base leading-snug mt-4">{{ question }}</p>
      </div>

      <div class="flex flex-col gap-4 mb-10">
        <button
          v-for="(option, i) in options" :key="i"
          @click="toggleOption(i)"
          class="w-full py-5 px-6 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-95"
          :class="selectedIndexes.includes(i)
            ? 'bg-white text-[#BA0B2F]'
            : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'"
        >
          {{ option }}
        </button>
      </div>

      <div class="flex justify-end mt-auto">
        <button
          @click="handleNext"
          :disabled="selectedIndexes.length === 0"
          class="bg-white text-[#191919] text-sm font-semibold px-8 py-3 rounded-full transition-all duration-150"
          :class="selectedIndexes.length > 0 ? 'opacity-100 active:scale-95 hover:bg-white/90' : 'opacity-40 cursor-not-allowed'"
        >
          Suivant
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  currentStep: number
  totalSteps: number
  question: string
  options: string[]
  modelValue?: number[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void
  (e: 'next', value: number[]): void
  (e: 'back'): void
}>()

const selectedIndexes = ref<number[]>(props.modelValue ?? [])

const progressWidth = computed(() => `${(props.currentStep / props.totalSteps) * 100}%`)

function toggleOption(i: number) {
  if (selectedIndexes.value.includes(i)) {
    selectedIndexes.value = selectedIndexes.value.filter(x => x !== i)
  } else {
    selectedIndexes.value = [...selectedIndexes.value, i]
  }
  emit('update:modelValue', selectedIndexes.value)
}

function handleNext() {
  if (selectedIndexes.value.length > 0) {
    emit('next', selectedIndexes.value)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap');
</style>