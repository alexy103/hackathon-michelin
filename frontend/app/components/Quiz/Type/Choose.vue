<script setup lang="ts">
const props = defineProps<{
  question: {
    label?: string;
    assets?: string[];
  };
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
  <div class="flex items-center justify-center">
    <div
      class="relative flex min-h-full w-full max-w-[390px] flex-col bg-[#BA0B2F] px-6 pb-[180px]"
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
          <img src="/WhiteStar.png" alt="" class="h-6 w-5.5" />
        </div>
      </div>

      <p class="mt-4 mb-10 text-base leading-snug font-medium text-white">
        {{ question.label }}
      </p>

      <div class="flex items-center justify-center gap-8">
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
</template>
