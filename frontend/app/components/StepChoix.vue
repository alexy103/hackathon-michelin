<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-900">
    <div
      class="relative flex min-h-screen w-full max-w-[390px] flex-col bg-[#BA0B2F] px-6 py-10"
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

      <div class="mb-12 flex items-center gap-3">
        <div class="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
          <div
            class="h-full rounded-full bg-white transition-all duration-500"
            :style="{ width: progressWidth }"
          />
        </div>
        <span class="text-sm font-medium text-white"
          >{{ currentStep }}/{{ totalSteps }}</span
        >
      </div>

      <div class="mb-10 flex items-start gap-4">
        <span
          class="shrink-0 font-medium text-white"
          style="font-size: 72px; line-height: 1"
          >{{ currentStep }}</span
        >
        <p class="mt-4 text-base leading-snug font-medium text-white">
          {{ question }}
        </p>
      </div>

      <div class="mb-10 flex flex-col gap-4">
        <button
          v-for="(option, i) in options"
          :key="i"
          @click="toggleOption(i)"
          class="w-full rounded-lg px-6 py-5 text-sm font-semibold transition-all duration-150 active:scale-95"
          :class="
            selectedIndexes.includes(i)
              ? 'bg-white text-[#BA0B2F]'
              : 'border border-white/30 bg-white/15 text-white hover:bg-white/25'
          "
        >
          {{ option }}
        </button>
      </div>

      <div class="mt-auto flex justify-end">
        <button
          @click="handleNext"
          :disabled="selectedIndexes.length === 0"
          class="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#191919] transition-all duration-150"
          :class="
            selectedIndexes.length > 0
              ? 'opacity-100 hover:bg-white/90 active:scale-95'
              : 'cursor-not-allowed opacity-40'
          "
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
  options: string[];
  modelValue?: number[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number[]): void;
  (e: "next", value: number[]): void;
  (e: "back"): void;
}>();

const selectedIndexes = ref<number[]>(props.modelValue ?? []);

const progressWidth = computed(
  () => `${(props.currentStep / props.totalSteps) * 100}%`,
);

function toggleOption(i: number) {
  if (selectedIndexes.value.includes(i)) {
    selectedIndexes.value = selectedIndexes.value.filter((x) => x !== i);
  } else {
    selectedIndexes.value = [...selectedIndexes.value, i];
  }
  emit("update:modelValue", selectedIndexes.value);
}

function handleNext() {
  if (selectedIndexes.value.length > 0) {
    emit("next", selectedIndexes.value);
  }
}
</script>
