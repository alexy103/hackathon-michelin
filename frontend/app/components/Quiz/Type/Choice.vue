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
            props.multiple
              ? (selected as number[]).includes(i)
                ? 'bg-white text-[#BA0B2F]'
                : 'border border-white/30 bg-white/15 text-white hover:bg-white/25'
              : selected === i
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
          :disabled="
            props.multiple
              ? (selected as number[]).length === 0
              : selected === null
          "
          class="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all duration-150"
          :class="
            props.multiple
              ? (selected as number[]).length > 0
                ? 'opacity-100 hover:bg-white/90 active:scale-95'
                : 'cursor-not-allowed opacity-40'
              : selected !== null
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
  modelValue?: number[] | number | null;
  multiple?: boolean;
}>();

const selected = ref<number[] | number | null>(
  props.multiple ? (props.modelValue ?? []) : (props.modelValue ?? null),
);

const emit = defineEmits<{
  (e: "update:modelValue", value: number[]): void;
  (e: "next", value: number[]): void;
  (e: "back"): void;
}>();

function toggleOption(i: number) {
  if (props.multiple) {
    const arr = selected.value as number[];

    if (arr.includes(i)) {
      selected.value = arr.filter((x) => x !== i);
    } else {
      selected.value = [...arr, i];
    }

    emit("update:modelValue", selected.value);
  } else {
    selected.value = i;
    emit("update:modelValue", i);
  }
}

function handleNext() {
  if (
    (props.multiple && (selected.value as number[]).length > 0) ||
    (!props.multiple && selected.value !== null)
  ) {
    emit("next", selected.value);
  }
}
</script>
