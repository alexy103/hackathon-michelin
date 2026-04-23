<script setup lang="ts">
const config = useRuntimeConfig();

const props = defineProps<{
  question: {
    label?: string;
    assets?: string[];
  };
  currentStep: number;
}>();

const emit = defineEmits<{
  (e: "answer", value: number): void;
  (e: "back"): void;
}>();

const selectedChoice = ref<number | null>(null);

function selectAndValidate(choice: number) {
  if (selectedChoice.value !== null) return;

  selectedChoice.value = choice;

  setTimeout(() => {
    emit("answer", choice);
  }, 600);
}
</script>

<template>
  <div class="relative">
    <div class="flex items-center justify-center">
      <div
        class="relative flex min-h-full w-full max-w-97.5 flex-col bg-[#BA0B2F] px-6 pb-45"
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

        <p
          class="relative z-2 mt-4 mb-10 text-base leading-snug font-medium text-white"
        >
          {{ question.label }}
        </p>

        <div class="relative z-2 flex items-center justify-center gap-8">
          <button
            class="transition-all duration-300"
            :class="{
              'scale-95 opacity-50':
                selectedChoice !== null && selectedChoice !== 0,
            }"
            @click="selectAndValidate(0)"
          >
            <img
              :src="question.assets?.[0]"
              alt="Pilule rouge"
              class="h-48 w-auto object-contain"
            />
          </button>

          <button
            class="transition-all duration-300"
            :class="{
              'scale-95 opacity-50':
                selectedChoice !== null && selectedChoice !== 1,
            }"
            @click="selectAndValidate(1)"
          >
            <img
              :src="question.assets?.[1]"
              alt="Pilule bleue"
              class="h-48 w-auto object-contain"
            />
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
