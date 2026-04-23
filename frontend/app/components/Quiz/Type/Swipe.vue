<script setup>
const config = useRuntimeConfig();

const props = defineProps({
  question: Object,
  currentStep: Number,
});

const emit = defineEmits(["answer", "back"]);
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
  <div class="relative">
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

          <div
            class="relative z-20 mx-auto mb-4 flex w-fit items-center gap-2 text-center"
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
          class="relative z-2 mt-4 mb-10 text-base leading-snug font-medium text-white"
        >
          {{ question.label }}
        </p>

        <div class="relative z-2 flex flex-1 items-center justify-center">
          <div class="relative w-full">
            <div
              class="mx-auto flex h-72 w-52 cursor-grab touch-none items-center justify-center rounded-xl border border-white/20 bg-white shadow-lg select-none active:cursor-grabbing"
              :class="isDragging ? '' : 'transition-transform duration-300'"
              :style="cardStyle"
              @pointerdown="startDrag"
            >
              <span class="px-4 text-center text-base font-semibold text-black">
                {{ question.options?.[0] ?? "card" }}
              </span>
            </div>
          </div>
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
