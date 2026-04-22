<script setup lang="ts">
const props = defineProps({
  question: Object,
});

const emit = defineEmits(["answer"]);

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
  <div class="flex min-h-[70vh] flex-col justify-center">
    <h1 class="mb-10 text-3xl font-bold text-white">
      {{ question.label }}
    </h1>

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
</template>
