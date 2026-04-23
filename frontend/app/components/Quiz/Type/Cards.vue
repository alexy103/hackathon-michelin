<script setup lang="ts">
const config = useRuntimeConfig();

const props = defineProps<{
  question: {
    label?: string;
    options?: {
      title: string;
      subtitle?: string;
      image?: string;
      value?: string;
      backTitle?: string;
      backSubtitle?: string;
      backImage?: string;
      backValue?: string;
    }[];
  };
  currentStep: number;
}>();

const emit = defineEmits<{
  (
    e: "answer",
    value: {
      frontIndex: number;
      backIndex: number;
      frontValue: string;
      backValue: string;
    },
  ): void;
  (e: "back"): void;
}>();

const selectedCard = ref<number | null>(null);
const flippedCard = ref<number | null>(null);

const showBackSide = ref(false);
const selectedBackCard = ref<number | null>(null);

function selectCard(index: number) {
  if (selectedCard.value !== null || showBackSide.value) return;

  selectedCard.value = index;
  flippedCard.value = index;

  setTimeout(() => {
    showBackSide.value = true;
  }, 700);
}

function selectBackCard(index: number) {
  if (!showBackSide.value || selectedBackCard.value !== null) return;

  selectedBackCard.value = index;

  const frontOption = props.question.options?.[selectedCard.value ?? -1];
  const backOption = props.question.options?.[index];

  setTimeout(() => {
    emit("answer", {
      frontIndex: selectedCard.value ?? -1,
      backIndex: index,
      frontValue: frontOption?.value ?? frontOption?.title ?? "",
      backValue:
        backOption?.backValue ??
        backOption?.value ??
        backOption?.backTitle ??
        backOption?.title ??
        "",
    });
  }, 700);
}
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

        <div class="relative z-2 grid flex-1 grid-cols-2 content-end gap-3">
          <button
            v-for="(option, i) in question.options"
            :key="i"
            class="group text-left perspective-distant"
            :class="{
              'opacity-40':
                !showBackSide && selectedCard !== null && selectedCard !== i,
              'opacity-40':
                showBackSide &&
                selectedBackCard !== null &&
                selectedBackCard !== i,
            }"
            @click="showBackSide ? selectBackCard(i) : selectCard(i)"
          >
            <div
              class="relative h-[210px] w-full transition-transform duration-700 [transform-style:preserve-3d]"
              :class="{
                '[transform:rotateY(180deg)]': showBackSide,
              }"
            >
              <div
                class="absolute inset-0 overflow-hidden rounded-[18px] border-[6px] border-white bg-[#B31222] p-4 text-white [backface-visibility:hidden]"
              >
                <img
                  :src="`${config.app.baseURL}DarkRedStar.png`"
                  alt=""
                  class="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain opacity-70"
                />

                <div
                  class="relative z-20 mb-8 text-center text-[8px] font-semibold tracking-wide uppercase"
                >
                  Le Guide
                  <span class="block text-[12px] leading-3"> Michelin </span>
                </div>

                <div class="relative z-20 h-full text-center">
                  <p class="text-xl font-semibold uppercase">
                    {{ option.title }}
                  </p>

                  <div class="flex items-center justify-center gap-1">
                    <img
                      v-for="i in option.subtitle"
                      :key="i"
                      src="/WhiteStar.png"
                      alt=""
                      class="h-5 w-4.5"
                    />
                  </div>
                </div>
              </div>

              <div
                class="absolute inset-0 [transform:rotateY(180deg)] rounded-[18px] bg-white p-4 text-[#B31222] [backface-visibility:hidden]"
              >
                <div
                  class="absolute top-3 left-2 flex flex-col items-center justify-center"
                >
                  <span class="leading-3">{{ i === 0 ? "A" : i }}</span>
                  <img
                    :src="`${config.app.baseURL}DarkRedStar.png`"
                    alt=""
                    class="h-4 w-4"
                  />
                </div>
                <div
                  class="absolute right-2 bottom-2 flex flex-col items-center justify-center"
                >
                  <span class="leading-3">{{ i === 0 ? "A" : i }}</span>
                  <img
                    :src="`${config.app.baseURL}DarkRedStar.png`"
                    alt=""
                    class="h-4 w-4"
                  />
                </div>
                <div
                  class="relative z-20 mb-4 text-center text-[10px] font-semibold tracking-wide uppercase"
                >
                  Le Guide
                  <span class="block text-lg leading-3"> Michelin </span>
                </div>

                <div
                  class="mb-4 h-[100px] overflow-hidden rounded-[10px] bg-[#D9D9D9]"
                >
                  <img
                    v-if="option.backImage || option.image"
                    :src="option.backImage ?? option.image"
                    alt=""
                    class="h-full w-full object-cover"
                  />
                </div>

                <p class="text-center text-[14px] font-medium text-[#B31222]">
                  {{ option.backTitle ?? option.title }}
                </p>

                <p
                  v-if="option.backSubtitle || option.subtitle"
                  class="mt-1 text-center text-[12px] text-[#B31222]"
                >
                  {{ option.backSubtitle ?? option.subtitle }}
                </p>
              </div>
            </div>
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
