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

const {
  data: questionsData,
  pending: questionsPending,
  error: questionsError,
} = useQuestions();
const {
  data: questionTypesData,
  pending: questionTypesPending,
  error: questionTypesError,
} = useQuestionTypes();
const {
  data: stepsData,
  pending: stepsPending,
  error: stepsError,
} = useSteps();
const {
  data: answersData,
  pending: answersPending,
  error: answersError,
} = useAnswers();

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
  SWIPE: {
    label: "Swipe !",
  },
  CARDS: {
    label: "Choisissez une carte",
  },
};

const isLoading = computed(
  () =>
    questionsPending.value ||
    questionTypesPending.value ||
    stepsPending.value ||
    answersPending.value,
);

const hasError = computed(
  () =>
    questionsError.value ||
    questionTypesError.value ||
    stepsError.value ||
    answersError.value,
);

const questionTypesMap = computed(() => {
  const rawTypes = questionTypesData.value?.data ?? [];

  return rawTypes.reduce((acc: Record<number, string>, type: any) => {
    acc[type.id] = type.label;
    return acc;
  }, {});
});

const answersByQuestionId = computed(() => {
  const rawAnswers = answersData.value?.data ?? [];

  return rawAnswers.reduce((acc: Record<number, any[]>, answer: any) => {
    if (!acc[answer.question_id]) {
      acc[answer.question_id] = [];
    }

    acc[answer.question_id].push(answer);
    return acc;
  }, {});
});

const questions = computed(() => {
  const rawQuestions = questionsData.value?.data ?? [];
  const mappedTypes = questionTypesMap.value;
  const groupedAnswers = answersByQuestionId.value;

  return rawQuestions
    .map((question: any) => {
      const mappedType = mappedTypes[question.question_type_id];
      const questionAnswers = groupedAnswers[question.id] ?? [];

      if (mappedType === "personnality") {
        const labels = questionAnswers.map((answer: any) => answer.label);

        if (question.id === 1) {
          const budgetLabels = labels.map((label: string) => {
            if (label === "0") return "€";
            if (label === "1") return "€€";
            if (label === "2") return "€€€";
            if (label === "3") return "€€€€";
            if (label === "4") return "€€€€€";
            return label;
          });

          return {
            id: question.id,
            type: questionTypes.PERSONNALITY,
            label: question.label,
            labels: budgetLabels,
            steps: budgetLabels.length,
            modelValue: 2,
            key: "budget",
            step_id: question.step_id,
            timer: question.timer,
            image: question.image,
          };
        }

        return {
          id: question.id,
          type: questionTypes.PERSONNALITY,
          label: question.label,
          labels,
          steps: labels.length,
          modelValue: 1,
          key: "moment",
          step_id: question.step_id,
          timer: question.timer,
          image: question.image,
        };
      }

      if (mappedType === "multichoice") {
        return {
          id: question.id,
          type: questionTypes.MULTICHOICE,
          label: question.label,
          options: questionAnswers.map((answer: any) => answer.label),
          key: "type",
          step_id: question.step_id,
          timer: question.timer,
          image: question.image,
        };
      }

      if (mappedType === "uniquechoice") {
        return {
          id: question.id,
          type: questionTypes.UNIQUECHOICE,
          label: question.label,
          options: questionAnswers.map((answer: any) => answer.label),
          key:
            question.id === 4
              ? "experience"
              : question.id === 5
                ? "profil"
                : "confiance",
          step_id: question.step_id,
          timer: question.timer,
          image: question.image,
        };
      }

      if (mappedType === "words") {
        return {
          id: question.id,
          type: questionTypes.WORDS,
          label: question.label,
          options: questionAnswers.map((answer: any) => answer.label),
          key: "mot",
          step_id: question.step_id,
          timer: question.timer,
          image: question.image,
        };
      }

      if (mappedType === "swipe") {
        return {
          id: question.id,
          type: questionTypes.SWIPE,
          label: question.label,
          options: questionAnswers.map((answer: any) => answer),
          key: "swipe_choice",
          step_id: question.step_id,
          timer: question.timer,
          image: question.image,
        };
      }

      if (mappedType === "cards") {
        return {
          id: question.id,
          type: questionTypes.CARDS,
          label: question.label,
          options: [
            {
              title: questionAnswers[0]?.label ?? "",
              subtitle: 4,
              image: "/card-local.jpg",
              value: questionAnswers[0]?.label ?? "",
              backTitle: questionAnswers[4]?.label ?? "",
              backSubtitle: "",
              backImage: questionAnswers[4]?.image ?? "",
              backValue: questionAnswers[4]?.label ?? "",
            },
            {
              title: questionAnswers[1]?.label ?? "",
              subtitle: "***",
              image: "/card-insolite.jpg",
              value: questionAnswers[1]?.label ?? "",
              backTitle: questionAnswers[5]?.label ?? "",
              backSubtitle: "",
              backImage: questionAnswers[5]?.image ?? "",
              backValue: questionAnswers[5]?.label ?? "",
            },
            {
              title: questionAnswers[2]?.label ?? "",
              subtitle: "**",
              image: "/card-modernite.jpg",
              value: questionAnswers[2]?.label ?? "",
              backTitle: questionAnswers[6]?.label ?? "",
              backSubtitle: "",
              backImage: questionAnswers[6]?.image ?? "",
              backValue: questionAnswers[6]?.label ?? "",
            },
            {
              title: questionAnswers[3]?.label ?? "",
              subtitle: "*",
              image: "/card-tradition.jpg",
              value: questionAnswers[3]?.label ?? "",
              backTitle: questionAnswers[7]?.label ?? "",
              backSubtitle: "",
              backImage: questionAnswers[7]?.image ?? "",
              backValue: questionAnswers[7]?.label ?? "",
            },
          ],
          key: "cards_choice",
          step_id: question.step_id,
          timer: question.timer,
          image: question.image,
        };
      }

      return null;
    })
    .filter(Boolean);
});

const steps = computed(() => {
  const rawSteps = stepsData.value?.data ?? [];
  const rawQuestions = questions.value;

  return rawSteps
    .slice()
    .sort((a: any, b: any) => a.number - b.number)
    .map((step: any) => ({
      title: step.label,
      questions: rawQuestions
        .map((question: any, index: number) =>
          question.step_id === step.id ? index : -1,
        )
        .filter((index: number) => index !== -1),
    }))
    .filter((step: any) => step.questions.length > 0);
});

const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value] ?? null,
);
const finished = computed(
  () => currentQuestionIndex.value >= questions.value.length,
);

function verifyTimeout(answer: any) {
  if (!currentQuestion.value) return;

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
}

function nextQuestion(fromStepEnd = false) {
  const step = steps.value[currentStepIndex.value];
  if (!step) return;

  stepChoiceValue.value = null;
  typeValue.value = [];
  sliderValue.value = 0;

  if (!fromStepEnd && currentQuestionIndex.value < step.questions.at(-1)) {
    currentQuestionIndex.value++;
  } else {
    if (currentStepIndex.value < steps.value.length - 1) {
      currentStepIndex.value++;
      currentQuestionIndex.value =
        steps.value[currentStepIndex.value].questions[0];
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
  swipe_choice: "",
  cards_choice: {
    frontIndex: -1,
    backIndex: -1,
    frontValue: "",
    backValue: "",
  },
});

const progress = computed(() => {
  const step = steps.value[currentStepIndex.value];

  if (!step) return 0;

  const firstQuestionIndex = step.questions[0];
  const totalQuestionsInStep = step.questions.length;

  if (!totalQuestionsInStep) return 0;

  return (
    ((currentQuestionIndex.value - firstQuestionIndex) / totalQuestionsInStep) *
    100
  );
});

const currentStepQuestionNumber = computed(() => {
  const step = steps.value[currentStepIndex.value];
  if (!step) return 0;

  const raw = currentQuestionIndex.value - step.questions[0] + 1;

  return Math.min(raw, step.questions.length);
});

const totalStepQuestions = computed(() => {
  const step = steps.value[currentStepIndex.value];

  if (!step) return 0;

  return step.questions.length;
});

const stepChoiceValue = ref<number | null>(null);

function prevQuestion() {
  if (showStep.value || isTransitioning.value) return;

  const step = steps.value[currentStepIndex.value];
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

    const previousStep = steps.value[currentStepIndex.value];
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
  <div class="h-screen overflow-hidden">
    <Profil v-if="showProfil" />

    <template v-else>
      <div
        v-if="isLoading"
        class="flex h-full items-center justify-center p-4 text-center"
      >
        Chargement...
      </div>

      <div
        v-else-if="hasError"
        class="flex h-full items-center justify-center p-4 text-center"
      >
        Une erreur est survenue.
      </div>

      <template v-else>
        <div
          v-if="!showStep && !finished"
          class="absolute top-25 left-0 z-30 flex w-full items-center gap-4 p-4"
        >
          <div class="z-20 h-2 w-full overflow-hidden rounded bg-gray-200">
            <div
              class="bg-red-dark h-full transition-all duration-500 ease-out"
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

            <QuizTypeSwipe
              v-else-if="currentQuestion.type === questionTypes.SWIPE"
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
