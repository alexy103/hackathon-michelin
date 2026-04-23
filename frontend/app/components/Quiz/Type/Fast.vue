<script setup>
import { useQuestion } from "~/composables/useQuestion";

const props = defineProps({
  question: Object,
});

const emit = defineEmits(["answer"]);
const { selectedChoice, selectAndValidate } = useQuestion(emit);

const pendingChoice = ref(null);
const isAnimating = ref(false);

function onTransitionEnd(e) {
  if (e.target !== e.currentTarget) return;
  if (!pendingChoice.value) return;

  emit("answer", pendingChoice.value);

  pendingChoice.value = null;
  selectedChoice.value = null;
  isAnimating.value = false;
}
</script>

<template>
  <div>
    <h1 class="mb-8">{{ question.label }}</h1>

    <div class="mb-6 grid grid-cols-2 gap-4">
      <div
        class="transition-all duration-300"
        :class="{
          'opacity-50': selectedChoice && selectedChoice !== 'left',
        }"
      >
        <img
          :src="question.leftImage"
          alt=""
          class="w-full cursor-pointer rounded-xl transition-all duration-300"
          :class="[
            selectedChoice === 'left'
              ? 'ring-red-bright scale-90 shadow-xl ring-4'
              : 'hover:scale-105',
          ]"
          @click="selectAndValidate('left')"
          @transitionend="onTransitionEnd"
        />
      </div>

      <div
        class="transition-all duration-300"
        :class="{
          'opacity-50': selectedChoice && selectedChoice !== 'right',
        }"
      >
        <img
          :src="question.rightImage"
          alt=""
          class="w-full cursor-pointer rounded-xl transition-all duration-300"
          :class="[
            selectedChoice === 'right'
              ? 'ring-red-bright scale-90 shadow-xl ring-4'
              : 'hover:scale-105',
          ]"
          @click="selectAndValidate('right')"
          @transitionend="onTransitionEnd"
        />
      </div>
    </div>
  </div>
</template>
