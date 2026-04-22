<script setup>
const STEP_DURATION = 1000;

const currentQuestionIndex = ref(0);

const showStep = ref(true);
const currentStepIndex = ref(0);

onMounted(() => {
  showNextStep();
});

function showNextStep() {
  showStep.value = true;

  setTimeout(() => {
    showStep.value = false;
  }, STEP_DURATION);
}

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

const steps = [
  {
    title: "Point de départ",
    description: "Quelques questions pour commencer",
    questions: [0, 1],
  },
  {
    title: "Personnalité",
    description: "On affine votre profil",
    questions: [2],
  },
  {
    title: "Réflexes",
    description: "Vos instincts",
    questions: [3, 4],
  },
];

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
const finished = computed(() => currentQuestionIndex.value >= questions.length);

function verifyTimeout(answer) {
  console.log("Réponse :", answer);

  const isChoose = currentQuestion.value.type === questionTypes.CHOOSE;
  const isLast = currentQuestionIndex.value === questions.length - 1;

  const delay = isChoose && !isLast ? 600 : 0;

  setTimeout(nextQuestion, delay);
}

function nextQuestion() {
  const step = steps[currentStepIndex.value];

  if (currentQuestionIndex.value < step.questions.at(-1)) {
    currentQuestionIndex.value++;
  } else {
    // fin de STEP
    if (currentStepIndex.value < steps.length - 1) {
      showStep.value = true;
      currentStepIndex.value++;

      currentQuestionIndex.value = steps[currentStepIndex.value].questions[0];

      showNextStep();
    } else {
      // FIN DU QUIZ
      currentQuestionIndex.value++;
    }
  }
}

const progress = computed(() => {
  const step = steps[currentStepIndex.value];

  if (!step) return 0;

  const firstQuestionIndex = step.questions[0];
  const totalQuestionsInStep = step.questions.length;

  return (
    ((currentQuestionIndex.value - firstQuestionIndex) / totalQuestionsInStep) *
    100
  );
});

const currentStepQuestionNumber = computed(() => {
  const step = steps[currentStepIndex.value];

  if (!step) return 0;

  return currentQuestionIndex.value - step.questions[0] + 1;
});

const totalStepQuestions = computed(() => {
  const step = steps[currentStepIndex.value];

  if (!step) return 0;

  return step.questions.length;
});
</script>
<template>
  <div class="p-4">
    <div v-if="!finished && !showStep" class="mb-4 flex items-center gap-4">
      <div class="h-2 w-full overflow-hidden rounded bg-gray-200">
        <div
          class="h-full bg-black transition-all duration-500 ease-out"
          :style="{ width: progress + '%' }"
        />
      </div>
      <p class="inline w-fit shrink-0">
        {{ currentStepQuestionNumber }} / {{ totalStepQuestions }}
      </p>
    </div>

    <QuizStep
      v-if="showStep && !finished"
      :step="currentStepIndex + 1"
      :label="steps[currentStepIndex]?.title"
    />

    <Transition name="slide" mode="out-in">
      <div v-if="!showStep && !finished">
        <QuizTypeFast
          v-if="currentQuestion.type === questionTypes.FAST"
          :key="currentQuestion.id"
          :question="currentQuestion"
          @answer="verifyTimeout"
        />

        <QuizTypeSwipe
          v-else-if="currentQuestion.type === questionTypes.SWIPE"
          :key="currentQuestion.id"
          :question="currentQuestion"
          @answer="verifyTimeout"
        />

        <QuizTypeChoose
          v-else-if="currentQuestion.type === questionTypes.CHOOSE"
          :key="currentQuestion.id"
          :question="currentQuestion"
          @answer="verifyTimeout"
        />
      </div>
    </Transition>
  </div>
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
