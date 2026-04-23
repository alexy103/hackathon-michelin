<template>
  <div class="flex items-center justify-center">
    <div
      class="relative flex min-h-full w-full max-w-[390px] flex-col bg-[#BA0B2F] px-6 pb-[180px]"
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

        <div class="mx-auto mb-4 flex w-fit items-center gap-2 text-center">
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

      <div class="mb-16 flex items-start gap-4">
        <p class="mt-4 text-base leading-snug font-medium text-white">
          {{ question }}
        </p>
      </div>

      <div class="relative z-2 mb-16">
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

      <div class="absolute right-6 bottom-[100px]">
        <button
          @click="emit('next', localValue)"
          class="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#191919] transition-all duration-150 hover:bg-white/90 active:scale-95"
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
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

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
