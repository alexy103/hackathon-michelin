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
  CARDS: {
    label: "Choisissez une carte",
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
  {
    id: 9,
    type: questionTypes.SWIPE,
    label: "Swipe !",
    options: ["Option A", "Option B", "Option C"],
    key: "swipe_choice",
  },
  {
    id: 10,
    type: questionTypes.CARDS,
    label: "Choisissez une carte",
    options: [
      {
        title: "LOCAL",
        subtitle: "****",
        image: "/card-local.jpg",
        value: "LOCAL",
        backTitle: "Assiette locale",
        backSubtitle: "Produit du terroir",
        backImage: "/card-local-back.jpg",
        backValue: "LOCAL_BACK",
      },
      {
        title: "INSOLITE",
        subtitle: "***",
        image: "/card-insolite.jpg",
        value: "INSOLITE",
        backTitle: "Expérience étonnante",
        backSubtitle: "Hors des sentiers battus",
        backImage: "/card-insolite-back.jpg",
        backValue: "INSOLITE_BACK",
      },
      {
        title: "MODERNITÉ",
        subtitle: "**",
        image: "/card-modernite.jpg",
        value: "MODERNITÉ",
        backTitle: "Cuisine créative",
        backSubtitle: "Esprit contemporain",
        backImage: "/card-modernite-back.jpg",
        backValue: "MODERNITE_BACK",
      },
      {
        title: "TRADITION",
        subtitle: "*",
        image: "/card-tradition.jpg",
        value: "TRADITION",
        backTitle: "Cuisine classique",
        backSubtitle: "Authentique et rassurant",
        backImage: "/card-tradition-back.jpg",
        backValue: "TRADITION_BACK",
      },
    ],
    key: "cards_choice",
  },
];

const steps = [
  {
    title: "Ton moment",
    questions: [0, 1, 2],
  },
  {
    title: "Personnalité",
    questions: [3, 4, 5],
  },
  {
    title: "Réflexes",
    questions: [6, 7, 8, 9],
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

  if (currentQuestion.value.type === questionTypes.SWIPE) {
    reponses.value[currentQuestion.value.key] = answer;
    nextQuestion();
    return;
  }

  if (currentQuestion.value.type === questionTypes.CARDS) {
    reponses.value[currentQuestion.value.key] = answer;

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
  swipe_choice: "",
  cards_choice: {
    frontIndex: -1,
    backIndex: -1,
    frontValue: "",
    backValue: "",
  },
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

function prevQuestion() {
  if (showStep.value || isTransitioning.value) return;

  const step = steps[currentStepIndex.value];
  if (!step) return;

  const firstQuestionOfStep = step.questions[0];
  const isFirstQuestionOfStep =
    currentQuestionIndex.value === firstQuestionOfStep;

  if (!isFirstQuestionOfStep) {
    currentQuestionIndex.value--;
    stepChoiceValue.value = null;
    typeValue.value = [];
    sliderValue.value = 0;
    return;
  }

  if (currentStepIndex.value > 0) {
    currentStepIndex.value--;

    const previousStep = steps[currentStepIndex.value];
    currentQuestionIndex.value =
      previousStep.questions[previousStep.questions.length - 1];

    stepChoiceValue.value = null;
    typeValue.value = [];
    sliderValue.value = 0;
  }
}

const showProfil = ref(false);

function handleEnregistrer() {
  showProfil.value = true;
}
</script>
<template>
  <div>
    <Profil v-if="showProfil" />

    <template v-else>
      <div
        v-if="!showStep && !finished"
        class="mb-4 flex items-center gap-4 p-4"
      >
        <div class="z-20 h-2 w-full overflow-hidden rounded bg-gray-200">
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

      <QuizResultats v-else-if="finished" @enregistrer="handleEnregistrer" />

      <Transition name="slide" mode="out-in">
        <div
          v-if="!showStep && !finished && !isTransitioning && currentQuestion"
        >
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
            @back="prevQuestion"
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
            @back="prevQuestion"
          />

          <QuizTypeWords
            v-else-if="currentQuestion.type === questionTypes.WORDS"
            :key="currentQuestion.id"
            :currentStep="currentStepIndex + 1"
            :totalSteps="8"
            @next="verifyTimeout"
            @back="prevQuestion"
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
            @back="prevQuestion"
          />

          <QuizTypeFast
            v-else-if="
              currentQuestion && currentQuestion.type === questionTypes.FAST
            "
            :key="currentQuestion.id"
            :question="currentQuestion"
            :currentStep="currentStepIndex + 1"
            @answer="verifyTimeout"
            @back="prevQuestion"
          />

          <QuizTypeSwipe
            v-else-if="currentQuestion.type === questionTypes.SWIPE"
            :key="currentQuestion.id"
            :question="currentQuestion"
            :currentStep="currentStepIndex + 1"
            @answer="verifyTimeout"
            @back="prevQuestion"
          />

          <QuizTypeChoose
            v-else-if="currentQuestion.type === questionTypes.CHOOSE"
            :key="currentQuestion.id"
            :question="currentQuestion"
            :currentStep="currentStepIndex + 1"
            @answer="verifyTimeout"
            @back="prevQuestion"
          />

          <QuizTypeCards
            v-else-if="currentQuestion.type === questionTypes.CARDS"
            :key="currentQuestion.id"
            :question="currentQuestion"
            :currentStep="currentStepIndex + 1"
            @answer="verifyTimeout"
            @back="prevQuestion"
          />
        </div>
      </Transition>
    </template>
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
