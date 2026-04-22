<template>
  <div class="flex min-h-screen items-center justify-center">
    <div
      class="relative flex min-h-full w-full max-w-[390px] flex-col bg-[#BA0B2F] px-6 py-10"
    >
      <button
        @click="emit('back')"
        class="mb-8 -ml-1 flex h-8 w-8 items-center justify-center text-white"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <h1 class="mb-4 text-2xl font-medium text-white">Étape</h1>

      <div class="mb-16 flex items-start gap-4">
        <span
          class="shrink-0 font-medium text-white"
          style="font-size: 72px; line-height: 1"
          >{{ currentStep }}</span
        >
        <p class="mt-4 text-base leading-snug font-medium text-white">
          {{ question }}
        </p>
      </div>

      <div class="mb-16">
        <div class="relative mb-4 h-5">
          <span class="absolute left-0 text-sm font-medium text-white">{{
            labels[0]
          }}</span>
          <span
            class="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-white"
            >{{ labels[1] }}</span
          >
          <span class="absolute right-0 text-sm font-medium text-white">{{
            labels[2]
          }}</span>
        </div>

        <div class="relative" style="height: 60px; overflow: visible">
          <div
            class="absolute right-0 left-0 h-0.5 bg-white"
            style="top: 0px"
          ></div>

          <div
            v-for="i in totalCrans"
            :key="'cran-' + i"
            class="absolute h-3 w-0.5 bg-white"
            :style="{
              left: `calc(${((i - 1) / (totalCrans - 1)) * 100}% - 1px)`,
              top: '-6px',
            }"
          ></div>

          <div
            class="absolute transition-all duration-150"
            :style="{
              left: `calc(${(localValue / (totalCrans - 1)) * 100}% - 14px)`,
              top: '4px',
            }"
            style="pointer-events: none"
          >
            <svg
              width="28"
              height="38"
              viewBox="0 0 28 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 0 C14 0 0 16 0 24 C0 31.7 6.27 38 14 38 C21.73 38 28 31.7 28 24 C28 16 14 0 14 0Z"
                fill="white"
              />
              <circle cx="14" cy="26" r="7" fill="#BA0B2F" />
            </svg>
          </div>

          <input
            v-model.number="localValue"
            type="range"
            min="0"
            :max="totalCrans - 1"
            step="1"
            class="absolute inset-0 w-full cursor-pointer opacity-0"
            style="height: 60px; margin: 0"
          />
        </div>
      </div>

      <div class="mt-auto flex justify-end">
        <button
          @click="emit('next', localValue)"
          class="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#191919] transition-all duration-150 hover:bg-white/90 active:scale-95"
        >
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  currentStep: number;
  totalSteps: number;
  question: string;
  labels: string[] | undefined;
  steps?: number;
  modelValue?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "next", value: number): void;
  (e: "back"): void;
}>();

const totalCrans = computed(() => props.steps ?? props.labels?.length);
const localValue = ref(
  props.modelValue ?? Math.floor((totalCrans.value - 1) / 2),
);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap");
</style>
