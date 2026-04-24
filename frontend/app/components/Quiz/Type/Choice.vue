<script setup lang="ts">
const config = useRuntimeConfig();

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
  (e: "update:modelValue", value: number[] | number | null): void;
  (e: "next", value: number[] | number | null): void;
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

<template>
  <div class="relative h-screen overflow-hidden">
    <div class="flex h-full items-center justify-center">
      <div
        class="relative flex h-screen w-full max-w-[390px] flex-col overflow-hidden bg-[#BA0B2F] px-6 pt-16 pb-8"
      >
        <div class="relative">
          <button @click="emit('back')" class="absolute h-8 w-8">
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
          {{ question }}
        </p>

        <div class="relative z-2 mt-6 mb-28 flex flex-col gap-4">
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

        <div class="absolute right-6 bottom-15">
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

    <img
      :src="`${config.app.baseURL}RedStar.png`"
      alt=""
      class="absolute top-5 left-15 h-20 w-19"
    />
    <img
      :src="`${config.app.baseURL}RedStar.png`"
      alt=""
      class="absolute top-1/3 -right-5 h-30 w-29"
    />
    <img
      :src="`${config.app.baseURL}RedStar.png`"
      alt=""
      class="absolute top-4/6 -left-10 h-40 w-39"
    />
    <img
      :src="`${config.app.baseURL}RedStar.png`"
      alt=""
      class="absolute -bottom-3 left-1/2 h-20 w-19"
    />
  </div>
</template>
