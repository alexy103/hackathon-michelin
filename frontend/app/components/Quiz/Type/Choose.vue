<script setup>
import { useQuestion } from "~/composable/useQuestion";

const props = defineProps({
  question: Object,
});

const emit = defineEmits(["answer"]);
const { selectedChoice, isFlipping, selectAndValidate } = useQuestion(emit);
</script>

<template>
  <div>
    <h1 class="mb-8">{{ question.label }}</h1>

    <div class="mb-10 grid grid-cols-2 grid-rows-2 gap-4">
      <div
        v-for="(img, index) in question.images"
        :key="index"
        class="flip-card aspect-square w-full transition-all duration-300"
        :class="{
          'scale-95 opacity-50': selectedChoice && selectedChoice !== index + 1,
        }"
        @click="selectAndValidate(index + 1)"
      >
        <div class="flip-inner" :class="{ flipped: isFlipping }">
          <div
            class="flip-front rounded-xl border-4 transition-all duration-200"
            :class="[
              selectedChoice === index + 1
                ? 'ring-red-bright scale-95 border-transparent shadow-xl ring-4'
                : 'border-transparent hover:scale-105',
            ]"
          >
            <img :src="img" class="h-full w-full rounded-xl object-cover" />
          </div>

          <div
            class="flip-back rounded-xl border-4 transition-all duration-200"
            :class="[
              selectedChoice === index + 1
                ? 'ring-red-bright scale-95 border-transparent shadow-xl ring-4'
                : 'border-transparent hover:scale-105',
            ]"
          >
            <img
              src="/random.jpg"
              class="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  perspective: 1000px;
  width: 100%;
}

.flip-inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  width: 100%;
  height: 100%;
}

.flip-inner.flipped {
  transform: rotateY(180deg);
}

.flip-front,
.flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}

.flip-back {
  transform: rotateY(180deg);
}
</style>
