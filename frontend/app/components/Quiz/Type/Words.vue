<template>
  <div class="flex min-h-screen items-center justify-center">
    <div
      class="relative flex min-h-full w-full max-w-[390px] flex-col bg-[#BA0B2F] px-6 py-10"
      style="font-family: &quot;Figtree&quot;, sans-serif"
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

      <div class="mb-6 flex justify-center">
        <span
          class="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#BA0B2F]"
        >
          Choisissez instinctivement un mot :
        </span>
      </div>

      <div class="mb-8 rounded-2xl bg-white p-4">
        <div class="grid grid-cols-10">
          <span
            v-for="(letter, i) in letters"
            :key="i"
            @click="handleLetterClick(i)"
            class="cursor-pointer text-center font-medium transition-all duration-200 select-none"
            style="font-size: 13px; padding: 4px 2px"
            :class="getLetterClass(i)"
          >
            {{ letter }}
          </span>
        </div>
      </div>

      <div class="mt-auto flex justify-end">
        <div class="relative h-12 w-12">
          <svg class="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="white"
              stroke-opacity="0.3"
              stroke-width="3"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
              style="transition: stroke-dashoffset 1s linear"
            />
          </svg>
          <span
            class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white"
          >
            {{ timeLeft }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  currentStep: number;
  totalSteps: number;
}>();

const emit = defineEmits<{
  (e: "next", value: string): void;
  (e: "back"): void;
}>();

const DURATION = 3;
const timeLeft = ref(DURATION);
let interval: ReturnType<typeof setInterval> | null = null;

const circumference = 2 * Math.PI * 20;
const dashOffset = computed(
  () => circumference * (1 - timeLeft.value / DURATION),
);

const letters = [
  "D",
  "É",
  "C",
  "O",
  "U",
  "V",
  "E",
  "R",
  "T",
  "E", // 0-9
  "J",
  "K",
  "S",
  "D",
  "L",
  "G",
  "F",
  "Q",
  "D",
  "E", // 10-19
  "Q",
  "U",
  "N",
  "R",
  "A",
  "P",
  "I",
  "D",
  "E",
  "N", // 20-29
  "K",
  "Y",
  "V",
  "M",
  "W",
  "D",
  "S",
  "M",
  "H",
  "Y", // 30-39
  "C",
  "O",
  "N",
  "V",
  "I",
  "V",
  "I",
  "A",
  "L",
  "G", // 40-49
  "Z",
  "V",
  "H",
  "D",
  "U",
  "W",
  "X",
  "Y",
  "T",
  "R", // 50-59
  "L",
  "R",
  "K",
  "Z",
  "S",
  "Q",
  "Y",
  "U",
  "K",
  "X", // 60-69
  "C",
  "S",
  "V",
  "O",
  "J",
  "E",
  "P",
  "O",
  "C",
  "M", // 70-79
  "I",
  "R",
  "A",
  "F",
  "F",
  "I",
  "N",
  "É",
  "L",
  "V", // 80-89
  "G",
  "W",
  "G",
  "S",
  "N",
  "H",
  "I",
  "K",
  "Y",
  "J", // 90-99
];

const words = [
  { name: "DÉCOUVERTE", indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { name: "RAPIDE", indexes: [23, 24, 25, 26, 27, 28] },
  { name: "CONVIVIAL", indexes: [40, 41, 42, 43, 44, 45, 46, 47, 48] },
  { name: "RAFFINÉ", indexes: [81, 82, 83, 84, 85, 86, 87] },
];

const selectedWord = ref<string | null>(null);

function getWordForIndex(i: number) {
  return words.find((w) => w.indexes.includes(i));
}

function getLetterClass(i: number) {
  const word = getWordForIndex(i);
  if (!word) return "text-[#191919]";
  if (selectedWord.value === word.name)
    return "text-white bg-[#BA0B2F] rounded";
  return "text-[#191919] hover:text-[#BA0B2F]";
}

function handleLetterClick(i: number) {
  const word = getWordForIndex(i);
  if (!word) return;
  selectedWord.value = selectedWord.value === word.name ? null : word.name;
}

onMounted(() => {
  interval = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      clearInterval(interval!);
      emit("next", selectedWord.value ?? "");
    }
  }, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>
