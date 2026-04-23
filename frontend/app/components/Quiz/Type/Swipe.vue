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
  <div class="relative h-screen overflow-hidden">
    <div class="flex h-full items-center justify-center">
      <div
        class="relative flex h-screen w-full max-w-[390px] flex-col overflow-hidden bg-[#BA0B2F] px-6 pt-16 pb-8"
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
          {{ question.label }}
        </p>

        <div class="relative z-2 flex flex-1 justify-center pt-12">
          <div class="relative w-full">
            <div
              class="mx-auto flex h-72 w-52 cursor-grab touch-none items-center justify-center rounded-xl border border-white/20 bg-white shadow-lg select-none active:cursor-grabbing"
              :class="isDragging ? '' : 'transition-transform duration-300'"
              :style="cardStyle"
              @pointerdown="startDrag"
            >
              <img :src="'/' + question.options?.[0].image" alt="" />
            </div>
          </div>
        </div>

        <div
          class="absolute bottom-10 left-0 z-10 flex h-14 w-40 items-center justify-end rounded-r-full bg-white pr-1"
        >
          <div
            @click="emit('answer', -1)"
            class="flex size-13 items-center justify-center rounded-full bg-[#BA0B2F]"
          >
            <svg
              width="30"
              height="34"
              viewBox="0 0 39 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.81641 42.5H32.1836C32.4446 42.5 32.6622 42.2993 32.6826 42.0391L35.3359 8.03906C35.3586 7.7485 35.1293 7.50005 34.8379 7.5H4.16211C3.87067 7.50005 3.64138 7.74849 3.66406 8.03906L6.31738 42.0391C6.33776 42.2993 6.5554 42.5 6.81641 42.5Z"
                fill="#BA0B2F"
                stroke="white"
                stroke-width="3"
              />
              <path
                d="M4.8291 1.5H34.1709C34.3959 1.5 34.5936 1.65028 34.6533 1.86719L36.8564 9.86719C36.9441 10.1854 36.705 10.4998 36.375 10.5H2.625C2.29496 10.4998 2.0559 10.1854 2.14355 9.86719L4.34668 1.86719C4.40644 1.65028 4.60411 1.5 4.8291 1.5Z"
                fill="#BA0B2F"
                stroke="white"
                stroke-width="3"
              />
              <path
                d="M13 12L13 30"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
              />
              <path
                d="M20 12L20 33"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
              />
              <path
                d="M27 12L27 30"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>

        <div
          @click="emit('answer', 1)"
          class="absolute right-0 bottom-10 z-10 flex h-14 w-40 items-center justify-start rounded-l-full bg-white pl-1"
        >
          <div
            class="flex size-13 items-center justify-center rounded-full bg-[#BA0B2F]"
          >
            <svg
              width="39"
              height="39"
              viewBox="0 0 45 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_308_499" fill="white">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.4186 3.34942C29.8845 -1.11647 37.1255 -1.11647 41.5914 3.34942C46.0572 7.81527 46.0572 15.0554 41.5914 19.5213L22.5241 38.5877L22.4127 38.7L3.34925 19.6365C-1.11641 15.1707 -1.11642 7.93051 3.34925 3.46466C7.81515 -1.00124 15.0562 -1.00124 19.5221 3.46466L22.4118 6.35528L25.4186 3.34942Z"
                />
              </mask>
              <path
                d="M25.4186 3.34942L27.5396 5.47109L27.5399 5.47074L25.4186 3.34942ZM41.5914 3.34942L43.7128 1.22812L43.7128 1.2281L41.5914 3.34942ZM41.5914 19.5213L43.7127 21.6427L43.7128 21.6426L41.5914 19.5213ZM22.5241 38.5877L20.4028 36.4663L20.3935 36.4757L22.5241 38.5877ZM22.4127 38.7L20.2914 40.8213L22.422 42.9519L24.5433 40.812L22.4127 38.7ZM3.34925 19.6365L1.22789 21.7578L1.22793 21.7579L3.34925 19.6365ZM3.34925 3.46466L1.22793 1.34334L1.22789 1.34338L3.34925 3.46466ZM19.5221 3.46466L21.6438 1.3437L21.6434 1.34334L19.5221 3.46466ZM22.4118 6.35528L20.2901 8.47624L22.411 10.5979L24.5327 8.47695L22.4118 6.35528ZM25.4186 3.34942L27.5399 5.47074C30.8342 2.17642 36.1758 2.17642 39.4701 5.47074L41.5914 3.34942L43.7128 1.2281C38.0753 -4.40937 28.9347 -4.40937 23.2973 1.2281L25.4186 3.34942ZM41.5914 3.34942L39.4701 5.47073C42.7643 8.76498 42.7643 14.1057 39.4701 17.4L41.5914 19.5213L43.7128 21.6426C49.35 16.0051 49.3501 6.86556 43.7128 1.22812L41.5914 3.34942ZM41.5914 19.5213L39.4702 17.3999L20.4028 36.4663L22.5241 38.5877L24.6453 40.7091L43.7127 21.6427L41.5914 19.5213ZM22.5241 38.5877L20.3935 36.4757L20.2822 36.588L22.4127 38.7L24.5433 40.812L24.6546 40.6997L22.5241 38.5877ZM22.4127 38.7L24.534 36.5787L5.47057 17.5152L3.34925 19.6365L1.22793 21.7579L20.2914 40.8213L22.4127 38.7ZM3.34925 19.6365L5.47062 17.5153C2.17646 14.221 2.17646 8.88022 5.47061 5.58594L3.34925 3.46466L1.22789 1.34338C-4.4093 6.9808 -4.40929 16.1204 1.22789 21.7578L3.34925 19.6365ZM3.34925 3.46466L5.47057 5.58598C8.7649 2.29165 14.1065 2.29165 17.4008 5.58598L19.5221 3.46466L21.6434 1.34334C16.006 -4.29413 6.8654 -4.29413 1.22793 1.34334L3.34925 3.46466ZM19.5221 3.46466L17.4004 5.58562L20.2901 8.47624L22.4118 6.35528L24.5334 4.23432L21.6438 1.3437L19.5221 3.46466ZM22.4118 6.35528L24.5327 8.47695L27.5396 5.47109L25.4186 3.34942L23.2976 1.22776L20.2908 4.23362L22.4118 6.35528Z"
                fill="white"
                mask="url(#path-1-inside-1_308_499)"
              />
            </svg>
          </div>
        </div>

        <div class="absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
          Swipe !
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
