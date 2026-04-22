<script setup>
const currentQuestionIndex = ref(0);

const questionTypes = {
  FAST: {
    label: "Choisissez sans réfléchir",
  },
  SWIPE: {
    label: "Swipe !",
  },
  CHOOSE: {
    label: "Choisissez l'ambiance qui vous attire",
  },
};

const questions = [
  {
    id: 1,
    type: questionTypes.FAST,
    label: questionTypes.FAST.label,
    leftImage: "/example.avif",
    rightImage: "/example.avif",
  },
  {
    id: 2,
    type: questionTypes.FAST,
    label: questionTypes.FAST.label,
    leftImage: "/random.jpg",
    rightImage: "/random.jpg",
  },
  {
    id: 3,
    type: questionTypes.SWIPE,
    label: questionTypes.SWIPE.label,
    image: "/example.avif",
  },
  {
    id: 4,
    type: questionTypes.CHOOSE,
    label: questionTypes.CHOOSE.label,
    images: ["/example.avif", "/example.avif", "/random.jpg", "/random.jpg"],
  },
  {
    id: 5,
    type: questionTypes.CHOOSE,
    label: questionTypes.CHOOSE.label,
    images: ["/random.jpg", "/random.jpg", "/random.jpg", "/random.jpg"],
  },
];

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
const finished = computed(() => currentQuestionIndex.value >= questions.length);

function verifyTimeout(answer) {
  console.log("Réponse : " + answer);

  const isChoose = currentQuestion.value.type === questionTypes.CHOOSE;
  const isLast = currentQuestionIndex.value === questions.length - 1;

  const delay = isChoose && !isLast ? 600 : 0;

  setTimeout(nextQuestion, delay);
}

function nextQuestion() {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++;
  } else {
    currentQuestionIndex.value++;
    console.log("Fini !");
  }
}

function restart() {
  currentQuestionIndex.value = 0;
}

const progress = computed(() => {
  return (currentQuestionIndex.value / (questions.length - 1)) * 100;
});
</script>

<template>
  <div v-if="!finished" class="mb-4 flex items-center gap-4">
    <div class="h-2 w-full overflow-hidden rounded bg-gray-200">
      <div
        class="h-full bg-black transition-all duration-500 ease-out"
        :style="{ width: progress + '%' }"
      />
    </div>
    <p class="inline w-fit shrink-0">
      {{ currentQuestionIndex + 1 }} / {{ questions.length }}
    </p>
  </div>
  <button
    class="mx-auto mb-5 block rounded bg-black px-4 py-2 text-white disabled:opacity-50"
    @click="restart"
  >
    Recommencer
  </button>
  <Transition name="slide" mode="out-in">
    <QuizTypeFast
      v-if="!finished && currentQuestion.type === questionTypes.FAST"
      :key="currentQuestion.id"
      :question="currentQuestion"
      @answer="verifyTimeout"
    />

    <QuizTypeSwipe
      v-else-if="!finished && currentQuestion.type === questionTypes.SWIPE"
      :key="currentQuestion.id"
      :question="currentQuestion"
      @answer="verifyTimeout"
    />

    <QuizTypeChoose
      v-else-if="!finished && currentQuestion.type === questionTypes.CHOOSE"
      :question="currentQuestion"
      @answer="verifyTimeout"
    />
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
