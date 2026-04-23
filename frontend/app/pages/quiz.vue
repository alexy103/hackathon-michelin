<script setup lang="ts">
const STEP_DURATION = 1000;

const currentQuestionIndex = ref(0);

const showStep = ref(true);
const currentStepIndex = ref(0);
const isTransitioning = ref(false);

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
  PERSONNALITY: {
    label: "Quel budget souhaitez-vous consacrer à cette expérience ?",
  },
  MULTICHOICE: {
    label: "Quel type d'expérience souhaites-tu faire ?",
  },
  UNIQUECHOICE: {
    label: "Question à choix simple",
  },
  WORDS: {
    label: "Choisissez instinctivement un mot",
  },
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
    type: questionTypes.PERSONNALITY,
    label: questionTypes.PERSONNALITY.label,
    labels: ["€", "€€", "€€€"],
    steps: 5,
    modelValue: 2,
    key: "budget",
  },
  {
    id: 2,
    type: questionTypes.PERSONNALITY,
    label: "Quand souhaites-tu vivre cette expérience ?",
    labels: ["Matin", "Midi", "Soir"],
    steps: 3,
    modelValue: 1,
    key: "moment",
  },
  {
    id: 3,
    type: questionTypes.MULTICHOICE,
    label: "Quel type d'expérience souhaitez-vous faire ?",
    options: ["Un restaurant", "Un hôtel", "Une activité"],
    key: "type",
  },
  {
    id: 4,
    type: questionTypes.UNIQUECHOICE,
    label: "Une bonne expérience c’est avant tout :",
    options: ["La précision", "Les émotions", "La surprise", "La régularité"],
    key: "experience",
  },
  {
    id: 5,
    type: questionTypes.UNIQUECHOICE,
    label: "Dans vos choix, vous êtes plutôt :",
    options: ["Prudent", "Curieux", "Spontané", "Exigeant"],
    key: "profil",
  },
  {
    id: 6,
    type: questionTypes.UNIQUECHOICE,
    label: "Vous faites le plus confiance à :",
    options: [
      "Votre instinct",
      "Une recommandation",
      "Vos habitudes",
      "L’avis des autres",
    ],
    key: "confiance",
  },
  {
    id: 7,
    type: questionTypes.WORDS,
    label: "Choisissez instinctivement un mot",
    key: "mot",
  },
  {
    id: 8,
    type: questionTypes.CHOOSE,
    label: "Fais ton choix",
    options: ["Pilule rouge", "Pilule bleue"],
    assets: ["/pill-red.png", "/pill-blue.png"],
    key: "ambiance",
  },
];

const steps = [
  {
    title: "Point de départ",
    description: "Quelques questions pour commencer",
    questions: [0, 1, 2],
  },
  {
    title: "Personnalité",
    description: "On affine votre profil",
    questions: [3, 4, 5],
  },
  {
    title: "Réflexes",
    description: "Vos instincts",
    questions: [6, 7],
  },
];

const currentQuestion = computed(
  () => questions[currentQuestionIndex.value] ?? null,
);
const finished = computed(() => currentQuestionIndex.value >= questions.length);

function verifyTimeout(answer: any) {
  console.log("Réponse :", answer);

  if (currentQuestion.value.type === questionTypes.PERSONNALITY) {
    const value = sliderValue.value;
    const key = currentQuestion.value.key;

    if (key === "budget") {
      reponses.value.budget = labelsBudget[value];
    }

    if (key === "moment") {
      reponses.value.moment = currentQuestion.value.labels[value];
    }

    nextQuestion();
    return;
  }

  if (currentQuestion.value.type === questionTypes.MULTICHOICE) {
    reponses.value.type = answer.map(
      (i: number) => currentQuestion.value.options[i],
    );
    nextQuestion();
    return;
  }

  if (currentQuestion.value.type === questionTypes.WORDS) {
    reponses.value.mot = answer;
    nextQuestion();
    return;
  }

  if (currentQuestion.value.type === questionTypes.UNIQUECHOICE) {
    reponses.value[currentQuestion.value.key] =
      currentQuestion.value.options[answer];

    nextQuestion();
    return;
  }

  if (currentQuestion.value.type === questionTypes.CHOOSE) {
    reponses.value[currentQuestion.value.key] =
      currentQuestion.value.options[answer];

    nextQuestion();
    return;
  }

  const step = steps[currentStepIndex.value];
  if (!step) return;
  const isLastOfStep = currentQuestionIndex.value === step.questions.at(-1);

  const isChoose = currentQuestion.value.type === questionTypes.CHOOSE;
  const isLastQuestion = currentQuestionIndex.value === questions.length - 1;

  let delay = isChoose && !isLastQuestion ? 600 : 0;

  if (isLastOfStep) {
    isTransitioning.value = true;
    currentQuestionIndex.value++;
    sliderValue.value = 0;

    setTimeout(() => {
      isTransitioning.value = false;
      nextQuestion(true);
    }, 500);

    return;
  }

  setTimeout(nextQuestion, delay);
}

function nextQuestion(fromStepEnd = false) {
  const step = steps[currentStepIndex.value];

  stepChoiceValue.value = null;
  typeValue.value = [];
  sliderValue.value = 0;

  if (!fromStepEnd && currentQuestionIndex.value < step.questions.at(-1)) {
    currentQuestionIndex.value++;
  } else {
    if (currentStepIndex.value < steps.length - 1) {
      currentStepIndex.value++;

      currentQuestionIndex.value = steps[currentStepIndex.value].questions[0];

      showNextStep();
    } else {
      currentQuestionIndex.value++;
    }
  }
}

const sliderValue = ref(0);
const labelsBudget = ["€", "€€", "€€€", "€€€€", "€€€€€"];
const typeValue = ref<number[]>([]);

const reponses = ref({
  budget: "€€",
  moment: "",
  type: [] as string[],
  mot: "",
  experience: "",
  profil: "",
  confiance: "",
  ambiance: "",
});

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

  const raw = currentQuestionIndex.value - step.questions[0] + 1;

  return Math.min(raw, step.questions.length);
});

const totalStepQuestions = computed(() => {
  const step = steps[currentStepIndex.value];

  if (!step) return 0;

  return step.questions.length;
});

const stepChoiceValue = ref<number | null>(null);
</script>
<template>
  <div class="p-4">
    <div v-if="!showStep && !finished" class="mb-4 flex items-center gap-4">
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
      <div v-if="!showStep && !finished && !isTransitioning && currentQuestion">
        <QuizTypePersonnality
          v-if="
            currentQuestion &&
            currentQuestion.type === questionTypes.PERSONNALITY
          "
          :key="currentQuestion.id"
          :currentStep="1"
          :totalSteps="8"
          :question="currentQuestion.label"
          :labels="currentQuestion.labels"
          :steps="currentQuestion.steps"
          v-model="sliderValue"
          @next="verifyTimeout"
          @back="() => {}"
        />

        <QuizTypeChoice
          v-else-if="currentQuestion.type === questionTypes.MULTICHOICE"
          :key="currentQuestion.id"
          :currentStep="currentStepIndex + 1"
          :totalSteps="8"
          :question="currentQuestion.label"
          :options="currentQuestion.options"
          :multiple="true"
          v-model="typeValue"
          @next="verifyTimeout"
          @back="() => {}"
        />

        <QuizTypeWords
          v-else-if="currentQuestion.type === questionTypes.WORDS"
          :key="currentQuestion.id"
          :currentStep="currentStepIndex + 1"
          :totalSteps="8"
          @next="verifyTimeout"
          @back="() => {}"
        />

        <QuizTypeChoice
          v-else-if="currentQuestion.type === questionTypes.UNIQUECHOICE"
          :key="currentQuestion.id"
          :currentStep="currentStepIndex + 1"
          :totalSteps="8"
          :question="currentQuestion.label"
          :options="currentQuestion.options"
          :multiple="false"
          v-model="stepChoiceValue"
          @next="verifyTimeout"
          @back="() => {}"
        />

        <QuizTypeFast
          v-else-if="
            currentQuestion && currentQuestion.type === questionTypes.FAST
          "
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
