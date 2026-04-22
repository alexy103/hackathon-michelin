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

      <div class="flex items-start gap-4 mb-16">
        <span class="text-white font-medium shrink-0" style="font-size: 72px; line-height: 1;">{{ currentStep }}</span>
        <p class="text-white font-medium text-base leading-snug mt-4">{{ question }}</p>
      </div>

      <div class="mb-16">

        <div class="relative h-5 mb-4">
          <span class="text-white text-sm font-medium absolute left-0">{{ labels[0] }}</span>
          <span class="text-white text-sm font-medium absolute left-1/2 -translate-x-1/2">{{ labels[1] }}</span>
          <span class="text-white text-sm font-medium absolute right-0">{{ labels[2] }}</span>
        </div>

        <div class="relative" style="height: 60px; overflow: visible;">

          <div class="absolute left-0 right-0 h-0.5 bg-white" style="top: 0px;"></div>

          <div
            v-for="i in totalCrans" :key="'cran-' + i"
            class="absolute w-0.5 h-3 bg-white"
            :style="{ left: `calc(${((i - 1) / (totalCrans - 1)) * 100}% - 1px)`, top: '-6px' }"
          ></div>

          <div
            class="absolute transition-all duration-150"
            :style="{ left: `calc(${(localValue / (totalCrans - 1)) * 100}% - 14px)`, top: '4px' }"
            style="pointer-events: none;"
          >
            <svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0 C14 0 0 16 0 24 C0 31.7 6.27 38 14 38 C21.73 38 28 31.7 28 24 C28 16 14 0 14 0Z" fill="white"/>
              <circle cx="14" cy="26" r="7" fill="#BA0B2F"/>
            </svg>
          </div>

          <input
            v-model.number="localValue"
            type="range"
            min="0"
            :max="totalCrans - 1"
            step="1"
            class="absolute inset-0 w-full opacity-0 cursor-pointer"
            style="height: 60px; margin: 0;"
          />
        </div>
      </div>

      <div class="flex justify-end mt-auto">
        <button
          @click="emit('next', localValue)"
          class="bg-white text-[#191919] text-sm font-semibold px-8 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-150"
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
  labels: string[]
  steps?: number
  modelValue?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'next', value: number): void
  (e: 'back'): void
}>()

const totalCrans = computed(() => props.steps ?? props.labels.length)
const localValue = ref(props.modelValue ?? Math.floor((totalCrans.value - 1) / 2))
const progressWidth = computed(() => `${(props.currentStep / props.totalSteps) * 100}%`)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap');
</style>