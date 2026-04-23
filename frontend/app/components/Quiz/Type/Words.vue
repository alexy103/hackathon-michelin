<template>
  <div class="relative h-screen overflow-hidden">
    <div class="flex h-full items-center justify-center">
      <div
        class="relative flex h-screen w-full max-w-[390px] flex-col overflow-hidden bg-[#BA0B2F] px-6 pt-16 pb-8"
      >
        <div class="relative">
          <button @click="emit('back')" class="absolute h-8 w-8 text-white">
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

          <div
            class="relative z-20 mx-auto mb-3 flex w-fit items-center gap-2 text-center"
          >
            <h1 class="text-2xl font-medium">Étape</h1>
            <div class="flex items-center gap-1">
              <img
                v-for="i in currentStep"
                :key="i"
                src="/WhiteStar.png"
                alt=""
                class="h-6 w-5.5"
              />
            </div>
          </div>
        </div>

        <p
          class="relative z-2 mt-12 block text-center text-2xl leading-snug font-semibold text-white"
        >
          Choisissez instinctivement un mot
        </p>

        <div class="relative z-2 mt-auto mb-23 rounded-2xl bg-white p-4">
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

        <div class="absolute right-6 bottom-15">
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

    <img
      :src="`${config.app.baseURL}RedStar.png`"
      alt=""
      class="absolute top-5 left-15 h-20 w-19"
    />
    <img
      :src="`${config.app.baseURL}RedStar.png`"
      alt=""
      class="pointer-events-none absolute top-1/3 -right-5 h-30 w-29"
    />
    <img
      :src="`${config.app.baseURL}RedStar.png`"
      alt=""
      class="pointer-events-none absolute top-4/6 -left-10 h-40 w-39"
    />
    <img
      :src="`${config.app.baseURL}RedStar.png`"
      alt=""
      class="pointer-events-none absolute -bottom-3 left-1/2 h-20 w-19"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const config = useRuntimeConfig();

const props = defineProps<{
  currentStep: number;
  totalSteps: number;
}>();

const emit = defineEmits<{
  (e: "next", value: string): void;
  (e: "back"): void;
}>();

const DURATION = 3000;
const timeLeft = ref(DURATION);
const hasAnswered = ref(false);
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
  "E",
  "J",
  "K",
  "S",
  "D",
  "L",
  "G",
  "F",
  "Q",
  "D",
  "E",
  "Q",
  "U",
  "N",
  "R",
  "A",
  "P",
  "I",
  "D",
  "E",
  "N",
  "K",
  "Y",
  "V",
  "M",
  "W",
  "D",
  "S",
  "M",
  "H",
  "Y",
  "C",
  "O",
  "N",
  "V",
  "I",
  "V",
  "I",
  "A",
  "L",
  "G",
  "Z",
  "V",
  "H",
  "D",
  "U",
  "W",
  "X",
  "Y",
  "T",
  "R",
  "L",
  "R",
  "K",
  "Z",
  "S",
  "Q",
  "Y",
  "U",
  "K",
  "X",
  "C",
  "S",
  "V",
  "O",
  "J",
  "E",
  "P",
  "O",
  "C",
  "M",
  "I",
  "R",
  "A",
  "F",
  "F",
  "I",
  "N",
  "É",
  "L",
  "V",
  "G",
  "W",
  "G",
  "S",
  "N",
  "H",
  "I",
  "K",
  "Y",
  "J",
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
  if (selectedWord.value === word.name) {
    return "rounded bg-[#BA0B2F] text-white";
  }
  return "text-[#191919] hover:text-[#BA0B2F]";
}

function handleLetterClick(i: number) {
  const word = getWordForIndex(i);
  if (!word || hasAnswered.value) return;

  selectedWord.value = word.name;
  hasAnswered.value = true;

  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  setTimeout(() => {
    emit("next", word.name);
  }, 1500);
}

onMounted(() => {
  interval = setInterval(() => {
    if (hasAnswered.value) return;

    timeLeft.value--;

    if (timeLeft.value <= 0) {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }

      hasAnswered.value = true;
      emit("next", selectedWord.value ?? "");
    }
  }, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>
