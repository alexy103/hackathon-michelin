<script setup>
const props = defineProps({
  question: Object,
});

const emit = defineEmits(["answer"]);
const direction = ref(0);

const isVisible = ref(true);

const isDragging = ref(false);
const startX = ref(0);
const currentX = ref(0);

const offsetX = ref(0);
const rotation = ref(0);

const THRESHOLD = 100;

const startDrag = (e) => {
  if (!isVisible.value) return;

  isDragging.value = true;
  startX.value = e.clientX;

  window.addEventListener("pointermove", onDrag);
  window.addEventListener("pointerup", endDrag);
};

const onDrag = (e) => {
  if (!isDragging.value) return;

  currentX.value = e.clientX;
  offsetX.value = currentX.value - startX.value;

  // rotation plus naturelle
  rotation.value = offsetX.value * 0.1;
};

const endDrag = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  window.removeEventListener("pointermove", onDrag);
  window.removeEventListener("pointerup", endDrag);

  if (Math.abs(offsetX.value) > THRESHOLD) {
    direction.value = offsetX.value > 0 ? 1 : -1;

    offsetX.value = direction.value * 1000;
    rotation.value = direction.value * 45;

    setTimeout(() => {
      emit("answer", direction.value);
    }, 300);
  } else {
    offsetX.value = 0;
    rotation.value = 0;
  }
};

const cardStyle = computed(() => ({
  transform: `translate3d(${offsetX.value}px, 0, 0) rotate(${rotation.value}deg)`,
}));
</script>

<template>
  <div>
    <h1 class="mb-8">{{ question.label }}</h1>
    <div
      class="flex h-32 w-24 cursor-grab touch-none items-center justify-center rounded-xl border bg-white shadow-lg select-none active:cursor-grabbing"
      :class="isDragging ? '' : 'transition-transform duration-300'"
      :style="cardStyle"
      @pointerdown="startDrag"
    >
      card
    </div>
  </div>
</template>
